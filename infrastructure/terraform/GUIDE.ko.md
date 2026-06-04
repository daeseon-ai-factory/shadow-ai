# Mimi 백엔드 인프라 — 완전 해설 (한국어)

> 목표: 이 문서를 다 읽으면 *"이 백엔드 어떻게 배포돼요? 구조 설명해보세요"* 에 막힘없이 답할 수 있다.
> 용어는 전부 "뭐냐 / 비유 / 우리는 어떻게 쓰냐" 3단으로 푼다.

---

## 0. 가장 먼저 — IaC(Infrastructure as Code)란?

- **뭐냐**: 서버·DB·네트워크 같은 인프라를 **콘솔에서 클릭으로** 만드는 대신, **코드(.tf 파일)로** 정의하는 것.
- **비유**: 요리를 "감으로 대충" 하는 게 아니라 **레시피로** 적어두는 것. 누가 만들어도 같은 결과, 리뷰 가능, 버전관리 가능, 한 방에 재현·삭제 가능.
- **우리**: `terraform apply` 한 번이면 VPC부터 ECS까지 전부 생김. `terraform destroy` 한 번이면 전부 사라짐(과금 정지).

> **Terraform** = IaC 도구 중 하나(HashiCorp 제품). AWS·GCP·Cloudflare 다 됨.

---

## 1. 큰 그림 — 요청 하나가 응답까지 가는 길

사용자가 모바일 앱에서 로그인 버튼을 누르면:

```
[1] 휴대폰 ──https://api.mimi.daeseon.ai 로 요청──┐
                                                  │
[2] Cloudflare(DNS): "그 도메인? ALB 주소로 가"  ─┘
                                                  ▼
[3] ALB(:443) ── TLS 풀고(복호화) → :8080으로 전달 ──┐
     · "이 요청 받을 건강한 서버 있나?" 헬스체크로 확인  │
                                                       ▼
[4] Fargate 컨테이너(Spring Boot, :8080)            
     · 시작할 때 [5]에서 비번/키를 주입받아 떠 있음   
     · 로그인 처리하려고 DB 조회 ──┐                  
                                   ▼                  
[6] RDS(PostgreSQL) — 사용자 확인 → 토큰 발급 → 응답이 역순으로 휴대폰까지

(녹음 저장 같은 요청이면 [4]가 [7] S3에 파일 저장)
```

**한 문장 요약**: Cloudflare가 도메인을 ALB로 보내고 → ALB가 HTTPS를 풀어서 건강한 컨테이너로 넘기고 → 컨테이너가 (시작 때 Secrets Manager에서 받은 비번으로) 프라이빗한 RDS·S3와 통신해서 응답한다.

**보안 모델 한 문장**: *"각 층은 바로 앞 층만 믿는다."* 인터넷→ALB만, ALB→컨테이너만, 컨테이너→DB만 닿을 수 있다.

---

## 2. 등장인물 — AWS 서비스 용어 사전

| 용어 | 뭐냐 | 비유 | 우리는 |
|---|---|---|---|
| **VPC** | 내 전용 가상 네트워크(사설 IP 대역) | 아파트 단지 전체 부지 | `10.0.0.0/16` 하나 |
| **CIDR** | IP 범위 표기법 (`/16`=6.5만개, `/24`=256개) | 부지 넓이 | VPC `/16`, 서브넷 `/24` |
| **Subnet(서브넷)** | VPC를 쪼갠 구역 | 단지 안의 동(棟) | public 2개 + private 2개 |
| **AZ(가용영역)** | 물리적으로 분리된 데이터센터 | 서로 떨어진 건물 | 2개 AZ에 분산(한쪽 죽어도 생존) |
| **public subnet** | 인터넷과 연결된 구역 | 정문 있는 동 | ALB·컨테이너 |
| **private subnet** | 인터넷 차단된 구역 | 외부출입 없는 금고동 | RDS |
| **IGW(인터넷 게이트웨이)** | VPC ↔ 인터넷 출입문 | 단지 정문 | public 서브넷만 연결 |
| **NAT 게이트웨이** | private에서 인터넷 "나가기만" 시켜주는 비싼 장치($35/월) | 금고동 전용 택배 출구 | **안 씀**(비용↓, 아래 설명) |
| **Route Table(라우팅 테이블)** | "이 IP로 가려면 어디로?" 규칙표 | 단지 내 도로 표지판 | public=정문으로, private=내부만 |
| **Security Group(보안그룹, SG)** | 리소스 앞단 방화벽(누가 어느 포트로 들어올 수 있나) | 각 동의 경비실 | alb→fargate→rds 3개 |
| **ALB(Application Load Balancer)** | HTTP(S) 부하분산기. TLS 종료 + 헬스체크 + 분배 | 정문 안내데스크 | api.mimi.daeseon.ai의 진입점 |
| **Target Group(타겟그룹)** | ALB가 트래픽 보낼 "건강한 서버 목록" | 안내데스크의 "지금 근무중 직원" 명단 | 컨테이너 IP들 |
| **Listener(리스너)** | ALB가 어느 포트를 듣고 뭘 할지 | "443으로 오면 이렇게" 규칙 | 80→443 리다이렉트, 443→컨테이너 |
| **Health Check(헬스체크)** | "이 서버 살아있나?" 주기적 확인 | 직원 출근 체크 | 30초마다 `/api/health` |
| **ECS** | 컨테이너 오케스트레이터(컨테이너 떠있게 관리) | 직원 관리 시스템 | 우리 클러스터 |
| **Fargate** | 서버 관리 없이 컨테이너 실행(서버리스 컨테이너) | 파견직(사무실 신경 안 씀) | EC2 대신 Fargate |
| **Task Definition(태스크 정의)** | 컨테이너 실행 "레시피"(이미지·CPU·환경변수) | 직무기술서 | family=tubeshadow |
| **Task(태스크)** | 그 레시피로 실제 떠 있는 컨테이너 1개 | 실제 출근한 직원 1명 | desired_count=1 |
| **Service(서비스)** | "태스크 N개를 항상 떠있게" 유지 + ALB 등록 | 인사팀(빈자리 나면 채움) | tubeshadow-backend |
| **ECR** | 내 전용 Docker 이미지 저장소 | 사내 창고(Docker Hub의 사설판) | tubeshadow |
| **이미지(image)** | 앱+런타임을 통째로 묶은 실행 패키지 | 밀키트(데우면 바로 실행) | Spring Boot jar 포함 |
| **RDS** | AWS가 운영해주는 관리형 DB(백업·패치 대신해줌) | 관리비 내고 사는 DB | PostgreSQL 16 |
| **S3** | 무제한 파일 저장소(객체 스토리지) | 무한 사물함 | 녹음 파일 |
| **Secrets Manager** | 비밀번호·API키 안전 보관소 | 금고 | DB비번·JWT·Gemini키 |
| **IAM** | 권한 시스템(누가 뭘 할 수 있나) | 출입카드 발급소 | 롤 3개 |
| **Role(롤)** | "이 권한 묶음"을 빌려 쓰는 신분 | 임시 출입카드 | 실행/태스크/배포 롤 |
| **Policy(정책)** | 롤에 붙는 "할 수 있는 일 목록" | 카드에 적힌 출입 가능 구역 | S3접근, 시크릿읽기 등 |
| **OIDC** | 외부(깃허브)가 비밀키 없이 신분증명 → 임시권한 | 지문으로 임시카드 발급 | 깃허브 액션 키리스 배포 |
| **ACM** | AWS 무료 TLS 인증서 발급 | 공인 신분증 발급 | api 도메인 HTTPS |
| **TLS 종료(termination)** | 암호화(HTTPS)를 ALB에서 풀어줌 | 정문에서 봉투 개봉 | 컨테이너는 평문 HTTP만 |
| **CloudWatch Logs** | 로그 모이는 곳 | CCTV 녹화 | 컨테이너 stdout |

> **왜 NAT 게이트웨이 안 쓰나**: 보통 앱은 private 서브넷 + NAT(인터넷 나가기용, $35/월). 우리는 학습/비용 절감으로 **Fargate를 public 서브넷에 두고 공인 IP 부여** → NAT 없이 ECR·Secrets·Gemini에 직접 나감. DB는 여전히 private라 안전. SG가 인바운드를 막으니 공인 IP가 있어도 외부에서 못 들어옴.

---

## 3. 파일 순서대로 — "인프라를 쌓는 순서" = 이해하는 순서

각 `.tf` 파일 = 한 층(layer). 아래 순서가 곧 의존 순서(밑에서 위로 쌓임).

### `versions.tf` — 버전 핀 + state 위치
- **terraform/provider 버전 고정**: 6개월 뒤에도 같은 동작 보장.
- **state**: Terraform이 "내 코드 ↔ 실제 AWS 리소스" 매핑을 적어두는 기억 파일. 기본은 로컬(`terraform.tfstate`), 시크릿 평문 포함 → git 금지. (S3 backend로 옮기는 법은 주석에.)

### `providers.tf` — AWS 연결 + 공통 태그
- **provider**: Terraform이 어느 클라우드의 어느 리전과 통신할지. `region = ca-central-1`.
- **default_tags**: 모든 리소스에 `Project=tubeshadow` 등 자동 태그 → 청구서에서 "이게 뭔 비용?" 추적 + 나중에 싹 찾아 삭제.
- **data source**: 만드는 게 아니라 **읽어오는** 것(계정ID, AZ 목록 등). `resource`=생성, `data`=조회.

### `variables.tf` — 입력값 모음
- **variable**: 코드의 "구멍". 값은 `terraform.tfvars`나 CLI로 채움. `sensitive=true`면 plan 출력에 안 찍힘(시크릿용).

### `network.tf` — VPC·서브넷·라우팅 (네트워크 토대)
- VPC(`10.0.0.0/16`) + public 2 + private 2 서브넷(2개 AZ 분산) + IGW + 라우팅 테이블.
- 핵심: public 라우팅은 `0.0.0.0/0 → IGW`(인터넷 연결), private는 그게 **없음**(인터넷 차단 = DB 보호).

### `security.tf` — 보안그룹 3개 (방화벽 체인)
- `alb-sg`(인터넷→443), `fargate-sg`(ALB→8080), `rds-sg`(Fargate→5432).
- **핵심 개념**: 인바운드 출처를 IP가 아니라 **앞 SG**로 지정. DB는 "10.0.x.x에서 5432"가 아니라 "**fargate-sg에 속한 것**에서 5432"만 허용 → VPC 안 다른 머신도 앱이 아니면 DB 못 만짐.

### `rds.tf` — 데이터베이스
- **random_password**로 마스터 비번 자동 생성(사람이 안 침) → Secrets Manager로 전달.
- **db_subnet_group**: RDS가 살 서브넷(=private). **multi_az=false**(비용↓, 운영이면 true=2배 비용 HA).
- 학습용이라 `deletion_protection=false` + `skip_final_snapshot=true`(destroy 쉽게). 운영이면 반대로.

### `s3.tf` — 녹음 버킷
- **public access 4종 전부 차단** + 암호화(SSE) + 버전관리 + 오래된 버전 30일 후 삭제(비용↓).
- 사용자 사생활(녹음)이라 무조건 private, 앱이 IAM 권한으로만 접근.

### `secrets.tf` — Secrets Manager
- **왜 task definition에 env로 안 박고 여기?**: task definition은 ECS 읽을 수 있는 사람 다 보임 + state/깃에 남음. Secrets Manager는 값을 거기서 빼고, 태스크는 **ARN만 참조** → ECS가 실행 순간 값 주입.
- DB비번·JWT는 **자동 생성**, Gemini키는 `terraform.tfvars`(깃 제외)에서. anthropic/billing은 값 줄 때만 생성(`count`).

### `ecr.tf` — 이미지 저장소
- 깃허브 액션이 빌드한 이미지를 여기 push, ECS가 pull. 최근 10개만 보관(`lifecycle_policy`).

### `iam.tf` — 권한 (가장 헷갈리는 곳, 천천히)
세 신분:
1. **실행 롤(execution role)** — ECS가 **태스크를 띄울 때** 씀: 이미지 pull, 시크릿 읽기, 로그 쓰기. (셋업용 권한)
2. **태스크 롤(task role)** — **돌아가는 앱 코드**가 씀: S3 녹음 읽고/쓰기. (런타임 권한, 앱의 AWS SDK가 자동 사용)
   - → 둘을 나누는 이유 = **최소권한**. 앱은 S3는 되지만 "모든 시크릿 읽기"는 안 됨.
3. **GitHubActionsDeploy** — 깃허브 액션이 **OIDC로** 빌려 씀: ECR push + ECS 업데이트. AWS 비밀키를 깃허브에 저장 안 함(키리스).
- **trust policy(신뢰 정책)**: "누가 이 롤을 빌릴 수 있나". 깃허브 롤은 "repo:Daeseon-AI-Factory/shadow-ai의 main 브랜치 워크플로만".
- **assume role**: 롤을 "빌리는" 행위.
- **PassRole**: 태스크 정의가 실행/태스크 롤을 참조하므로, 배포자가 그 롤을 ECS에 "넘길" 권한 필요 → 그 두 롤로만 좁게 허용.

### `alb.tf` — 로드밸런서 + HTTPS
- ALB(public 서브넷) + target group(헬스체크 `/api/health`) + 리스너(80→443 리다이렉트, 443→컨테이너).
- **ACM 인증서**: api 도메인용 무료 TLS. DNS 검증 방식인데 **DNS가 Cloudflare**라 Terraform이 검증 레코드를 못 넣음 → `outputs`로 뽑아서 너가 Cloudflare에 수동 추가.

### `ecs.tf` — 클러스터·태스크정의·서비스 (심장)
- **로그그룹** + **클러스터** + **태스크 정의**(이미지·env·시크릿·로그) + **서비스**(태스크 유지 + ALB 등록).
- **핵심 패턴 — "TF는 1번만, 배포는 CI가 소유"**: `lifecycle { ignore_changes = [task_definition, desired_count] }`. Terraform이 서비스를 **처음 한 번** 만들고, 이후 새 이미지 배포는 **깃허브 액션이 담당**. 안 그러면 `terraform apply` 할 때마다 CI가 올린 최신 이미지를 옛날 걸로 되돌려버림.

### `outputs.tf` — 적용 후 필요한 값
- ALB 주소(Cloudflare에 넣을 것), ACM 검증 레코드, 계정ID(깃허브 시크릿), ECR 주소 등. `terraform output`으로 언제든 다시 봄.

---

## 4. 전체 배포 순서 (apply 한 방 ≠ 라이브)

```
0. aws configure (자격증명) + terraform.tfvars (Gemini키)
1. terraform init → plan(뭘 만들지 미리보기) → apply  → 인프라 생성(~15분)
2. 첫 Docker 이미지 빌드 → ECR push        → 그래야 ECS가 돌릴 게 생김 (이전엔 태스크 실패 = 정상)
3. ECS 태스크 헬시 → ALB 타겟그룹 등록
4. Cloudflare: 인증서 검증 CNAME + (api → ALB) CNAME 추가 → 인증서 발급, HTTPS 라이브
5. curl https://api.mimi.daeseon.ai/api/health → {"status":"ok"}
```

---

## 5. 면접 답변 템플릿 — "이 시스템 설명해보세요"

> "Spring Boot 백엔드를 AWS ECS Fargate에 올렸습니다. 트래픽은 Cloudflare DNS → ALB(여기서 TLS 종료 + 헬스체크) → Fargate 태스크로 흐르고, 태스크는 private 서브넷의 RDS PostgreSQL과 S3에 접근합니다. 비밀값은 Secrets Manager에서 컨테이너 시작 시 주입하고요. 네트워크는 보안그룹을 체인으로 묶어 ALB만 태스크에, 태스크만 DB에 닿게 했습니다. 비용 때문에 NAT 게이트웨이 대신 public 서브넷 + 공인 IP로 ECR을 당겨오고요. 배포는 GitHub Actions가 OIDC로 키 없이 ECR에 push하고 ECS를 롤링 업데이트합니다. 인프라 전체는 Terraform으로 코드화했고, 서비스는 Terraform이 한 번 만들되 이미지 배포는 CI가 소유하도록 lifecycle로 분리했습니다."

이 한 단락이 막힘없이 나오면 "데브옵스 할 줄 안다"는 거다.

---

## 6. 비용 & 정리
- ALB ~$16 + RDS ~$13 + Fargate ~$10 ≈ **~$40/월**.
- 학습 전략: **apply → 구조 뜯어보기 → `terraform destroy`(과금 정지)**. 다시 올리는 건 한 명령.
- `destroy`가 막히면: RDS `deletion_protection`/`skip_final_snapshot` 확인(이 코드는 destroy 쉽게 세팅됨).

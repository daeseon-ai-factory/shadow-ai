# Mimi 백엔드 인프라 — 라인별 완전 해설 (한국어)

> 이건 `GUIDE.ko.md`(큰 그림·용어사전·면접 템플릿)의 **짝 문서**다. 여기서는 13개 `.tf` 파일을
> **한 줄 한 줄 / 블록 블록** 깊게 푼다. 파일 순서 = 인프라를 쌓는 순서 = 이해하는 순서.
>
> 읽는 법: GUIDE.ko.md로 큰 그림을 먼저 잡고 → 이 문서로 각 파일을 정독 → 실제 `.tf`를 열어 대조.

## 목차
1. versions.tf
2. providers.tf
3. variables.tf
4. network.tf
5. security.tf
6. rds.tf
7. s3.tf
8. secrets.tf
9. ecr.tf
10. iam.tf
11. alb.tf
12. ecs.tf
13. outputs.tf

---

## 1. versions.tf

이 파일은 Terraform 프로젝트에서 **가장 먼저 읽어야 할 "헌법"** 같은 파일입니다. 실제 인프라(서버, DB 같은 것)를 하나도 만들지 않지만, "어떤 도구의 어떤 버전으로 이 인프라를 만들 것인가" 그리고 "내가 만든 인프라의 설계도면(상태)을 어디에 보관할 것인가"라는 두 가지 메타(meta=상위/관리) 규칙을 정합니다.

먼저 큰 그림부터. **Terraform(=테라폼)** 은 "코드로 클라우드 인프라를 만드는 도구"입니다. AWS 콘솔(웹 화면)에서 마우스로 서버를 클릭클릭 만드는 대신, `.tf` 파일에 "EC2 서버 1대, RDS DB 1개 줘"라고 글로 써놓으면 Terraform이 AWS API를 호출해서 실제로 만들어 줍니다. 이걸 **IaC(=Infrastructure as Code, 코드형 인프라)** 라고 부릅니다. 백엔드 개발자에게 비유하자면, AWS 콘솔에서 손으로 만드는 건 "운영 DB에 직접 SQL 날려서 데이터 고치기"고, Terraform은 "마이그레이션 파일로 스키마를 버전 관리하기"입니다. 후자가 재현 가능하고 추적 가능합니다.

---

### 파일 상단 주석 (1~5번 줄)

```
# versions.tf — pins Terraform + provider versions, and declares where state lives.
```

이 파일의 정체성을 한 줄로 요약한 주석입니다. **pin(=핀, 고정)** 은 "버전을 못 박는다"는 뜻입니다. 옷에 핀을 꽂아 고정하듯, 도구 버전이 멋대로 바뀌지 않게 고정한다는 의미죠.

```
# WHY THIS FILE: reproducibility.
```

**reproducibility(=재현성)**, 즉 "같은 코드를 돌리면 같은 결과가 나온다"가 이 파일의 존재 이유입니다. 주석이 직접 설명하듯, 버전을 고정하지 않으면 "두 사람이(또는 6개월 뒤의 나 자신이) 서로 다른 provider 동작을 얻을 수 있다(can get different provider behavior)". 이게 왜 무서우냐면 — A 개발자 컴퓨터에선 잘 만들어지던 인프라가, B 개발자 컴퓨터에선 provider 버전이 달라서 에러나거나 미묘하게 다르게 만들어질 수 있기 때문입니다. npm의 `package-lock.json`이나 Gradle의 의존성 버전 고정과 정확히 같은 철학입니다.

마지막 두 줄에서 두 종류의 버전을 구분합니다:
- `required_version`은 **Terraform CLI(=명령줄 도구) 자체**의 버전을 지킨다(guards the Terraform CLI itself)
- `required_providers`는 **각 provider 플러그인**의 버전을 지킨다(guards each provider plugin)

여기서 **provider(=프로바이더)** 라는 핵심 용어가 나옵니다. provider는 "Terraform이 특정 클라우드/서비스와 대화하기 위한 번역기 플러그인"입니다. Terraform 본체는 AWS가 뭔지 모릅니다. `hashicorp/aws` provider를 깔아야 비로소 "EC2를 만들어라"라는 Terraform 명령을 실제 AWS API 호출로 번역해 줍니다. JDBC 드라이버가 있어야 Java가 PostgreSQL과 대화하는 것과 똑같은 구조입니다 — Terraform이 JVM이면, provider는 DB 드라이버입니다.

---

### `terraform { ... }` 블록 (7~39번 줄)

```hcl
terraform {
  required_version = ">= 1.6"
  ...
}
```

(a) **이게 뭘 만드나**: 아무것도 안 만듭니다. 이건 "리소스 블록"이 아니라 **설정 블록(settings block)** 입니다. 실제 AWS 자원을 만드는 `resource "aws_instance" ...` 같은 게 아니라, Terraform 자신에게 "너 자신을 이렇게 설정해라"라고 지시하는 특수 블록입니다. 한 프로젝트(폴더)에 보통 이 `terraform` 블록은 딱 하나만 둡니다.

(b) **핵심 인자 한 줄씩**:

```hcl
required_version = ">= 1.6"
```
"Terraform CLI는 1.6 버전 **이상**이어야 한다"는 제약입니다. `>=`는 수학 그대로 "크거나 같다". 만약 사용자가 1.5 버전 CLI로 이 코드를 돌리면, Terraform이 즉시 멈추면서 "1.6 이상 깔아라"라고 에러를 냅니다. 코드를 한 줄도 실행하기 전에 막아주는 안전장치죠.

(c) **왜 `>= 1.6`인가 (하한만, 상한 없음)**: Terraform CLI는 비교적 호환성을 잘 지키는 도구라, "이 코드가 쓰는 신기능이 1.6부터 생겼으니 그 이상이면 OK"라는 의도입니다. 상한(예: `< 2.0`)을 안 건 건, 미래 버전도 대체로 동작하리라 믿는 느슨한 정책입니다. 반대로 provider는 (아래에서 보듯) 상한을 거는데, provider는 버전 간 동작이 더 자주 바뀌기 때문입니다.

(d) **흔한 함정**: `required_version`은 **Terraform CLI 버전**이지 provider 버전이 아닙니다. 초보자가 자주 헷갈립니다 — "AWS provider 5.60을 쓰는데 왜 여기엔 1.6이라고 써있지?" 하는 혼동. 1.6은 `terraform` 명령어 프로그램 자체의 버전이고, 5.60은 그 프로그램이 불러오는 AWS 플러그인의 버전입니다. 둘은 완전히 별개의 숫자 체계입니다.

---

### `required_providers { ... }` 블록 (10~19번 줄)

```hcl
required_providers {
  aws = {
    source  = "hashicorp/aws"
    version = "~> 5.60" # 5.x line; ~> means ">=5.60.0, <6.0.0"
  }
  random = {
    source  = "hashicorp/random"
    version = "~> 3.6" # used to generate the DB password + JWT secret
  }
}
```

(a) **이게 뭘 만드나**: 이 프로젝트가 의존하는 provider 플러그인들의 "장바구니 목록"입니다. `terraform init`(초기화 명령)을 실행하면, Terraform이 이 목록을 읽고 인터넷의 **Terraform Registry(=레지스트리, provider 공식 저장소, registry.terraform.io)** 에서 해당 플러그인을 다운로드합니다. npm이 `package.json`을 읽고 `node_modules`를 채우는 것과 동일합니다.

(b) **핵심 인자 한 줄씩**:

**`aws` 블록**:
- `source = "hashicorp/aws"` — 이 provider를 어디서 받아올지. `hashicorp/aws`는 `registry.terraform.io/hashicorp/aws`의 축약형으로, "hashicorp라는 조직(namespace)이 만든 aws라는 이름의 provider"를 뜻합니다. HashiCorp는 Terraform을 만든 회사라 AWS 공식 provider도 직접 관리합니다.
- `version = "~> 5.60"` — 버전 제약. 옆 주석이 친절히 풀어놨듯 **`~>`(=틸드-화살표, "pessimistic constraint" 비관적 제약 연산자)** 는 `">= 5.60.0, < 6.0.0"`을 뜻합니다. 즉 "5.60.0 이상, 6.0.0 미만"입니다. 5.61, 5.99는 OK, 6.0은 거부.

**`random` 블록**:
- `source = "hashicorp/random"` — `random` provider. 이건 클라우드와 대화하는 게 아니라 "랜덤 값(난수, 문자열)을 생성"하는 유틸리티 provider입니다.
- `version = "~> 3.6"` — `">= 3.6.0, < 4.0.0"`.
- 주석 `used to generate the DB password + JWT secret`이 결정적입니다. 이 random provider로 **DB 비밀번호와 JWT 시크릿(=토큰 서명용 비밀키)** 을 코드에서 자동 생성한다는 뜻. 즉 비밀번호를 사람이 손으로 정해 코드에 박는 게 아니라, `random_password` 같은 리소스로 매번 강력한 난수를 뽑아내겠다는 설계입니다. (이건 CLAUDE.md의 "API 키/시크릿 하드코딩 금지" 원칙과도 맞닿아 있습니다.)

(c) **왜 `~> 5.60`처럼 상한을 걸었나**: provider는 **major 버전(=맨 앞 숫자, 5.x의 5)** 이 바뀌면 호환성이 깨지는 변경(breaking change)이 들어옵니다. 5.x 안에서는(5.60→5.99) 보통 기능 추가/버그 수정만 있어 안전하지만, 6.0으로 넘어가면 인자 이름이 바뀌거나 리소스가 사라질 수 있습니다. 그래서 `~> 5.60`으로 "5점대 안에서는 자유롭게 최신을 받되, 6.0은 사람이 의식적으로 검토한 뒤 올리겠다"는 안전벨트를 채운 겁니다. 이게 **SemVer(=Semantic Versioning, 의미론적 버전 표기법, MAJOR.MINOR.PATCH)** 사고방식입니다.

(d) **흔한 함정/오해**:
- **함정 1**: `~> 5.60`이 "5.60만"이라고 오해하기. 아닙니다. 마지막에 명시된 자리(`.60`)는 올라갈 수 있고, 그 앞자리(`5`)는 고정입니다. `~> 5.60` = 5.60 이상 6.0 미만. 반면 `~> 5.0`이라고 쓰면 5.0 이상 6.0 미만으로 범위가 더 넓어집니다. 미묘하니 주의.
- **함정 2**: `version` 제약과 실제 설치 버전은 다릅니다. 제약은 "범위"고, 실제로 뭘 깔았는지는 `.terraform.lock.hcl`(락 파일)에 정확한 버전이 박힙니다. npm의 `package.json`(범위) vs `package-lock.json`(정확한 버전) 관계와 똑같습니다. 그래서 팀 작업 시엔 이 락 파일을 git에 커밋해야 모두 같은 provider를 씁니다.
- **함정 3**: `source`를 생략하면 안 됩니다. Terraform 0.13 이전엔 provider 이름만으로 추론했지만, 지금은 `source`를 명시하지 않으면 의도치 않은 provider를 받을 수 있습니다.

---

### STATE BACKEND 영역 (21~38번 줄) — 이 파일에서 가장 중요한 개념

```hcl
# --- STATE BACKEND ---
# State is the file Terraform uses to map your .tf code to real AWS resources.
```

여기서 **state(=상태, 상태 파일)** 라는, Terraform 초보가 반드시 넘어야 할 산이 나옵니다.

**state란 무엇인가**: 주석이 정의하듯 "당신의 `.tf` 코드를 실제 AWS 리소스에 **매핑(연결)** 하는 파일"입니다. 무슨 말이냐면 — 당신이 `.tf`에 "EC2 서버 줘"라고 쓰면 AWS가 `i-0abc123...` 같은 고유 ID로 서버를 만듭니다. Terraform은 "내 코드의 이 서버 = AWS의 i-0abc123 서버"라는 대응표를 어딘가 적어둬야, 다음에 코드를 고쳤을 때 "아, 이미 만든 그 서버를 수정하면 되는구나"를 압니다. 그 대응표가 바로 state 파일(`terraform.tfstate`, JSON 형식)입니다.

비유하자면, **state는 ORM의 "1차 캐시 / 영속성 컨텍스트"** 같은 존재입니다. 코드(엔티티)와 DB(실제 AWS)를 이어주는 중간 장부. 이게 없거나 깨지면 Terraform은 "어? 내가 만든 서버가 어디 있더라?" 하고 길을 잃어, 멀쩡한 서버를 또 만들거나(중복) 못 찾습니다.

```
# By default it's a LOCAL file (terraform.tfstate) in this directory.
```

기본값은 **로컬 백엔드(local backend)** — state 파일이 그냥 이 폴더 안에 `terraform.tfstate`로 저장됩니다. **backend(=백엔드, 여기선 "state를 어디에 저장하는가"라는 의미)** 라는 단어가 백엔드 개발의 "서버 백엔드"와 헷갈리는데, Terraform 맥락에선 **"상태 파일 저장소"** 를 뜻합니다.

주석은 로컬 방식의 두 가지 치명적 한계를 짚습니다:
1. `it contains SECRETS in plaintext` — state엔 **DB 비밀번호, JWT 시크릿이 평문(=암호화 안 된 날 것)으로** 들어있습니다. 위에서 random provider로 생성한 비밀번호가 결국 여기 그대로 기록되기 때문. 그래서 `never commit it (see .gitignore)` — 절대 git에 올리면 안 되고, `.gitignore`로 막아둡니다. 이게 옆 파일과의 연결 고리입니다: **`.gitignore`에 `*.tfstate`가 등록돼 있어야** 이 경고가 실제로 지켜집니다.
2. `it can't be shared / locked across a team` — 로컬 파일이라 팀원과 **공유**가 안 되고, 동시에 두 사람이 `terraform apply`(인프라 적용 명령)를 돌릴 때 **lock(=잠금, 동시 수정 방지)** 도 안 됩니다. 두 사람이 동시에 같은 state를 고치면 장부가 꼬여 인프라가 망가질 수 있습니다.

```hcl
# backend "s3" {
#   bucket         = "tubeshadow-tfstate-<ACCOUNT_ID>"
#   key            = "backend/terraform.tfstate"
#   region         = "ca-central-1"
#   dynamodb_table = "tubeshadow-tflock"
#   encrypt        = true
# }
```

(a) **이게 뭘 만드나**: (지금은 `#`로 **주석 처리(commented out)** 되어 비활성 상태지만) 활성화하면 state를 로컬 파일이 아니라 **AWS S3(=Simple Storage Service, 클라우드 파일 저장소, "무한대 용량 폴더")** 에 저장하는 설정입니다. 이게 실무 표준인 **S3 백엔드**입니다.

(b) **핵심 인자 한 줄씩**:
- `bucket = "tubeshadow-tfstate-<ACCOUNT_ID>"` — state를 담을 **S3 버킷(=bucket, S3의 최상위 폴더/저장 공간)** 이름. 버킷 이름은 전 세계에서 유일해야 해서, 끝에 `<ACCOUNT_ID>`(AWS 계정 고유 번호)를 붙여 충돌을 피하는 관례입니다.
- `key = "backend/terraform.tfstate"` — 버킷 **안에서**의 파일 경로(=객체 키). 버킷이 드라이브라면 key는 그 안의 파일 경로입니다.
- `region = "ca-central-1"` — AWS **리전(=region, 데이터센터가 위치한 지리적 지역)**. `ca-central-1`은 캐나다 중부(몬트리올)입니다. 버킷이 이 리전에 있다는 뜻.
- `dynamodb_table = "tubeshadow-tflock"` — **lock 전용 DynamoDB(=AWS의 NoSQL 키-값 DB) 테이블**. 위에서 말한 "동시 수정 방지 잠금"을 이 테이블로 구현합니다. 누가 `apply` 중이면 이 테이블에 "사용 중" 표식을 박아, 다른 사람의 동시 실행을 막습니다. (참고: 최신 Terraform은 S3 자체 lock도 지원하지만, 전통적으로 이 DynamoDB 방식이 표준이었습니다.)
- `encrypt = true` — state 파일을 S3에 저장할 때 **암호화**하라. 평문 비밀번호 문제를 (S3 저장 단계에서) 막는 장치.

(c) **왜 지금은 주석 처리해 뒀나**: 주석이 솔직하게 이유를 댑니다 — `it's a chicken-and-egg`(=닭이 먼저냐 달걀이 먼저냐 문제). state를 S3에 두려면 그 S3 버킷이 **먼저 존재**해야 하는데, 그 버킷도 보통 Terraform으로 만들고 싶습니다. 하지만 버킷이 없으면 backend 초기화가 실패하니, "버킷을 만들 Terraform이 돌려면 버킷이 이미 있어야 하는" 순환 모순이 생깁니다. 그래서 학습/초기 단계엔 로컬로 시작하고, `To adopt it later: create the bucket+table ..., uncomment, run terraform init -migrate-state` — 나중에 버킷·테이블을 먼저 만든 뒤, 이 블록의 주석을 풀고 `terraform init -migrate-state`(=기존 로컬 state를 S3로 이사시키는 명령)를 돌려 전환하라고 안내합니다.

(d) **흔한 함정/오해**:
- **함정 1**: backend 블록 안에서는 **변수(`var.xxx`)를 못 씁니다**. `bucket = var.bucket_name` 같은 걸 쓰고 싶어도 안 됩니다(Terraform이 backend를 변수 평가보다 먼저 처리하기 때문). 그래서 `<ACCOUNT_ID>` 자리를 변수 대신 하드코딩하거나 `-backend-config` 옵션으로 주입합니다. 처음 보면 "왜 변수가 안 되지?" 하고 당황합니다.
- **함정 2**: backend를 바꾸거나 켜면 반드시 `terraform init`(또는 `-migrate-state`)을 다시 돌려야 합니다. 안 그러면 "backend가 바뀌었다"는 에러가 납니다.
- **함정 3**: "S3에 두면 안전하다"고 방심하기. 버킷의 **퍼블릭 접근 차단**과 **암호화**, **버저닝(버전 관리, 실수로 덮어써도 복구)** 을 켜지 않으면 비밀번호가 든 state가 노출될 수 있습니다. `encrypt = true`는 그 시작일 뿐입니다.

---

### 옆 파일과의 연결

- **`.gitignore`**: 24번 줄 주석이 직접 가리킵니다 — `*.tfstate`가 무시 목록에 있어야 평문 비밀번호가 든 state가 실수로 커밋되지 않습니다. 이 파일의 경고는 `.gitignore` 설정과 한 쌍입니다.
- **`provider "aws" { region = ... }`가 있는 파일**(보통 `main.tf` 또는 `providers.tf`): 여기 `required_providers`에서 "어떤 버전의 aws provider를 쓸지"만 정하고, "그 provider를 실제로 어떤 리전·자격증명으로 설정할지"는 별도의 `provider "aws"` 블록에서 합니다. 둘은 짝입니다 — `required_providers`는 "어떤 부품을 살지", `provider` 블록은 "그 부품을 어떻게 끼울지".
- **random provider를 쓰는 파일**(아마 RDS/시크릿 정의 파일): 17번 줄 주석대로, 거기서 `random_password` 리소스로 DB 비밀번호와 JWT 시크릿을 생성하고, 그 결과가 다시 이 파일이 걱정하는 state에 평문으로 기록됩니다.

---

### 면접 포인트

**Q1. Terraform state란 무엇이며, 왜 로컬이 아니라 원격(S3 등)에 둬야 하나요?**
→ state는 `.tf` 코드와 실제 클라우드 리소스를 잇는 매핑 장부(JSON)입니다. 원격 백엔드를 쓰는 이유는 (1) 팀 간 **공유**, (2) 동시 실행을 막는 **잠금(lock)**, (3) 평문 비밀번호의 **암호화 저장** 때문입니다. 로컬은 혼자 학습용으론 괜찮지만 협업에선 state 충돌·유출 위험이 큽니다.

**Q2. `~> 5.60`은 정확히 어떤 버전 범위이며, `>= 1.6`과 정책이 다른 이유는?**
→ `~> 5.60`은 `>= 5.60.0, < 6.0.0`으로 "5점대 안에서만 최신 허용"입니다. provider는 major 버전이 오르면 호환성이 깨지므로 상한을 겁니다. 반면 Terraform CLI(`>= 1.6`)는 하위 호환이 좋아 하한만 두고 상한을 비워, 미래 버전도 받아들이는 느슨한 정책을 씁니다.

---

## 2. providers.tf

이 파일은 단 27줄이지만 Terraform 프로젝트 전체의 "콘센트와 접지선" 역할을 한다. 두 가지를 한다: (1) **AWS provider를 설정**(어느 리전에, 어떤 공통 태그를 붙일지)하고, (2) **data source 두 개를 선언**해서 다른 `.tf` 파일들이 두고두고 참조한다. 백엔드 개발자 비유로 말하면, provider는 `DataSource` 빈(=DB 커넥션 풀)을 등록하는 `@Configuration` 클래스이고, data source는 "남이 이미 만들어 놓은 값을 읽어오는 read-only 쿼리"다.

먼저 용어 정리부터. **Terraform** = 인프라(서버, DB, 네트워크)를 클릭이 아니라 코드(`.tf` 파일)로 선언하는 도구. "이런 상태였으면 좋겠다"를 적으면 Terraform이 AWS와 비교해서 차이만큼만 만들거나 지운다(=선언형, declarative). **provider** = Terraform이 특정 클라우드(AWS, GCP 등)와 대화하기 위한 플러그인 겸 설정 블록. 이 파일의 `provider "aws"`가 바로 "이제부터 AWS와 이렇게 통신하겠다"는 선언이다.

---

### 블록 1 — `provider "aws"` (7~17행)

```hcl
provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project   = var.project
      ManagedBy = "terraform"
      Repo      = var.github_repo
    }
  }
}
```

**(a) 이게 뭘 만드나** — 사실 이 블록은 "리소스를 만들지 않는다." AWS API와 통신할 때 쓸 **설정(configuration)**을 정의할 뿐이다. 여기서 정한 리전·태그가 이 디렉터리 안 모든 `aws_*` 리소스에 자동 적용된다.

**(b) 핵심 인자 한 줄씩**

- `region = var.aws_region` — 이 인프라를 어느 **리전(region = AWS의 지리적 데이터센터 묶음. 예: `ca-central-1`은 캐나다 중부)**에 만들지 지정. `var.aws_region`은 `variables.tf`에 정의된 변수를 끌어다 쓴다는 뜻이고(`var.`는 변수 참조 문법), 실제 기본값은 `variables.tf`에서 `ca-central-1`("Canada Central, 토론토 사용자에 가깝다"는 주석까지 붙어 있다)로 잡혀 있다. **하드코딩 대신 변수로 빼둔 이유**: 리전을 바꾸려면 이 한 줄이 아니라 변수 기본값 하나만 고치면 되고, 같은 코드를 다른 리전에 재배포하기 쉬워진다.
- `default_tags { tags = { ... } }` — **태그(tag = AWS 리소스에 붙이는 `키=값` 라벨)**를 한 번만 정의하면 provider가 **모든 리소스에 자동으로 도장 찍어준다**. 인자 자체를 풀면:
  - `Project = var.project` → 실제값 `tubeshadow`. "이 리소스는 어느 프로젝트 것인가"를 표시.
  - `ManagedBy = "terraform"` → "이건 사람이 콘솔에서 손으로 만든 게 아니라 Terraform이 관리한다"는 표식. 나중에 누가 콘솔에서 막 만든 리소스와 구분하는 데 결정적이다.
  - `Repo = var.github_repo` → 실제값 `Daeseon-AI-Factory/shadow-ai`. "이 인프라의 소스 코드가 어느 깃 저장소에 있나"를 박아둔다.

**(c) 왜 이렇게 했나** — 파일 맨 위 주석이 의도를 정확히 말한다: *"이건 청구서를 읽을 수 있게(`what is this $4 charge?`) 만들고, 나중에 전부 찾아서 정리(clean up)하는 방법이다."* AWS 청구서나 리소스 목록은 수백 개로 늘어나기 쉬운데, 태그가 없으면 "이 RDS는 누구 거지? 지워도 되나?"를 알 수 없다. `default_tags`는 이 라벨링을 **사람의 기억력에 의존하지 않게** 자동화한다. 리소스마다 손으로 `tags`를 쓰면 빠뜨리는 게 생기지만, provider 레벨에서 한 번 박으면 누락이 원천 봉쇄된다.

**(d) 흔한 함정/오해**
- **`default_tags`는 "기본값"이라 리소스별 `tags`로 덮어쓸 수 있다.** 같은 키를 리소스에서 또 쓰면 리소스 쪽이 이긴다. 실제로 다른 파일들(`s3.tf`, `network.tf` 등)이 `tags = { Name = "${var.project}-vpc" }` 같은 식으로 `Name`만 추가하는데, 이건 `default_tags`의 세 개(Project/ManagedBy/Repo)에 **더해지는** 것이지 충돌이 아니다. 즉 최종 태그는 "공통 3개 + 리소스별 Name" = 4개가 된다.
- **`provider`는 리소스가 아니라서 `terraform state`에 안 들어간다.** "이거 지우면 뭐가 삭제되나?" 걱정할 필요 없다. 순수 설정이다.
- **default_tags를 나중에 추가하면 기존 리소스 전체가 "변경됨(update)"으로 잡힌다.** 처음부터 넣어두는 게 깔끔한 이유.

> **옆 파일 연결**: 이 provider의 리전·태그는 같은 디렉터리의 모든 `aws_*` 리소스에 적용된다. 그리고 `var.aws_region`은 여기뿐 아니라 `ecs.tf`(컨테이너 환경변수 `AWS_REGION`, 로그 설정 `awslogs-region`)에서도 그대로 재사용된다 — "한 곳에서 정의, 여러 곳에서 참조"의 전형.

---

### 블록 2 — `data "aws_caller_identity" "current"` (22행)

```hcl
data "aws_caller_identity" "current" {}
```

여기서부터가 **resource vs data source**의 핵심 대비다. 먼저 이 차이부터 못 박자:

- **`resource` 블록** = "이걸 **만들어라/관리해라**." Terraform이 소유권을 갖고 생성·수정·삭제한다. (이 파일엔 resource가 하나도 없다.)
- **`data` 블록(=data source)** = "이미 존재하는 무언가를 **읽기만 해라**." Terraform이 만들지도, 지우지도 않는다. 일종의 read-only SELECT 쿼리다. `terraform apply`를 해도 data source는 "조회"만 일어나지 인프라가 바뀌지 않는다.

**(a) 이게 뭘 만드나** — 아무것도 안 만든다. **현재 Terraform이 어떤 AWS 자격증명으로 실행 중인지**를 AWS에 물어본다. 백엔드 개발자식으로는 `SELECT current_user` 같은 거다.

**(b) 핵심 인자** — 인자가 `{}`로 비어 있다(빈 중괄호). "물어볼 게 없다, 그냥 지금 나 누구냐만 알려줘"라는 뜻. 돌려받는 대표 속성이 `account_id`(=12자리 AWS 계정 번호)다.

**(c) 왜 이렇게 했나** — 주석이 말한다: *"globally-unique S3 bucket name + ARN을 만드는 데 account ID가 필요하다."* 실제 사용처를 보면:
- `s3.tf` 7행: `bucket = "${var.project}-recordings-${data.aws_caller_identity.current.account_id}"` — **S3 버킷 이름은 전 세계에서 유일해야 한다(globally unique).** `tubeshadow-recordings`만으론 남이 이미 썼을 수 있으니, 절대 안 겹치는 내 계정번호를 뒤에 붙여 충돌을 피한다.
- `outputs.tf` 47·58행: 계정 ID를 출력해서, GitHub Actions 시크릿(`AWS_ACCOUNT_ID`)에 넣으라고 안내까지 한다.

**(d) 흔한 함정/오해**
- **계정 ID를 코드에 하드코딩하지 말 것.** data source로 "현재 누구로 실행 중이냐"를 동적으로 받으면, 다른 계정(예: 회사 계정 → 개인 계정)에서 그대로 돌려도 코드 수정이 필요 없다.
- **account_id는 비밀이 아니다.** 패스워드처럼 가릴 필요는 없다(다만 굳이 공개 자랑할 것도 아님). ARN에 어차피 들어간다.

> **용어**: **ARN(Amazon Resource Name)** = AWS 리소스를 가리키는 전역 고유 식별자. 형식이 `arn:aws:서비스:리전:계정ID:리소스`라서, 계정 ID 없이는 ARN을 만들 수 없다. 그래서 이 data source가 필요하다.

---

### 블록 3 — `data "aws_availability_zones" "available"` (24~26행)

```hcl
data "aws_availability_zones" "available" {
  state = "available"
}
```

**(a) 이게 뭘 만드나** — 역시 읽기 전용. **현재 리전 안에서 쓸 수 있는 AZ 목록**을 받아온다.

> **용어**: **AZ(Availability Zone, 가용 영역)** = 한 리전 안의 물리적으로 분리된 데이터센터(또는 데이터센터 묶음). 같은 리전이라도 AZ가 여러 개라서, 한 AZ가 정전/화재로 죽어도 다른 AZ가 살아 있으면 서비스는 안 죽는다. 이게 **HA(High Availability, 고가용성 = 한 곳이 고장 나도 전체가 안 멈추게 하는 설계)**의 기본 단위다.

**(b) 핵심 인자**
- `state = "available"` — AZ 중에서도 **지금 실제로 쓸 수 있는("available") 것만** 필터링. AWS는 가끔 점검 중(`impaired`)이거나 신규 계정엔 막힌(`unavailable`) AZ를 보여주기도 하는데, 그런 걸 빼고 멀쩡한 것만 받는다.

**(c) 왜 이렇게 했나** — 주석: *"subnet을 두 AZ에 나눠 깔아서 HA를 확보한다."* 실제 사용처는 `network.tf`다:
- 40행: `availability_zone = data.aws_availability_zones.available.names[count.index]` (public subnet)
- 52행: 같은 패턴 (private subnet)

여기서 `.names`는 AZ 이름 배열(`["ca-central-1a", "ca-central-1b", ...]`)이고, `[count.index]`는 그 배열의 0번, 1번을 꺼낸다는 뜻(`count`로 리소스를 여러 개 찍어낼 때 쓰는 인덱스). 즉 **subnet을 서로 다른 AZ에 하나씩 깔아서**, 한 AZ가 죽어도 서비스가 살아남게 한다. **AZ 이름을 `ca-central-1a`처럼 하드코딩하지 않은 이유**가 핵심이다 — 리전을 바꾸면 AZ 이름도 통째로 바뀌는데, data source로 받으면 코드가 리전에 독립적이 된다.

> **용어**: **subnet(서브넷)** = VPC(=내 전용 가상 네트워크)를 잘게 나눈 IP 구획. **public subnet**은 인터넷에서 접근 가능, **private subnet**은 외부 직접 접근 차단(DB 같은 걸 둠).

**(d) 흔한 함정/오해**
- **`names`가 정렬 순서를 보장한다고 100% 믿지 말 것.** 보통은 알파벳 순이지만, 계정마다 AZ ID 매핑이 다를 수 있어 "내 1a가 남의 1a와 같은 물리 위치"는 아니다. HA 목적(서로 다른 AZ에 분산)엔 문제없지만, 두 계정 간 AZ를 일치시켜야 하는 특수 상황에선 `aws_availability_zone`(단수, ID 기반)을 따로 봐야 한다.
- **data source라 apply 때 인프라를 안 바꾸지만, AWS가 AZ를 추가/제거하면 결과가 달라질 수 있다.** 그래서 보통 `count`를 명시적 숫자(2)로 고정하지, AZ 개수에 그대로 의존하진 않는다.

---

### 이 파일이 전체에서 차지하는 위치

`versions.tf`가 "어떤 provider 플러그인을, 어떤 버전으로 쓸지"(`hashicorp/aws ~> 5.60`, 즉 `>=5.60.0, <6.0.0`)를 **선언**한다면, 이 `providers.tf`는 그 provider를 실제로 **설정**한다(리전·태그). 둘은 짝이다 — 전자는 "어떤 부품을 살까", 후자는 "그 부품을 어떻게 끼울까". 그리고 이 파일의 data source 두 개(`current` 계정 ID, `available` AZ)는 `s3.tf`·`network.tf`·`outputs.tf`가 두고두고 빨아먹는 **공용 우물**이다. 그래서 보통 이런 전역 data source를 provider 파일에 같이 두는 관례가 있다.

---

### 면접 포인트

**Q1. Terraform에서 `resource`와 `data` source의 차이는?**
A. `resource`는 Terraform이 **생성·수정·삭제까지 소유·관리**하는 인프라이고, `data` source는 **이미 존재하는 것을 읽기만** 하는 read-only 조회다. data source는 apply 때 인프라를 바꾸지 않는다. 이 파일의 `aws_caller_identity`·`aws_availability_zones`가 전형적인 예 — 계정 ID나 AZ 목록은 AWS가 이미 갖고 있는 사실이니 "만드는" 게 아니라 "물어보는" 것이다.

**Q2. `default_tags`를 왜 쓰고, 리소스별 `tags`와 충돌하면 누가 이기나?**
A. provider 레벨에서 모든 리소스에 공통 태그(Project/ManagedBy/Repo)를 자동으로 박아 **비용 추적과 정리(cleanup)를 사람 기억력에 의존하지 않게** 하려고 쓴다. 같은 키가 겹치면 **리소스 레벨 `tags`가 default_tags를 덮어쓴다**(리소스가 더 구체적이므로 우선). 보통은 키가 안 겹치게(공통 3개 + 리소스별 `Name`) 설계해서 합쳐진다.

---

## 3. variables.tf

### 0. 이 파일이 하는 일 한 줄 요약

`variables.tf`는 **이 Terraform 설정이 받는 "입력 매개변수(input variable)" 목록**이다. 함수의 파라미터 선언부라고 생각하면 정확하다. 다른 `.tf` 파일(`network.tf`, `ecs.tf`, `rds.tf` 등)이 실제 자원을 만들 때, 하드코딩하는 대신 `var.이름`으로 여기 선언한 값을 끌어다 쓴다. 값을 실제로 채워 넣는 곳은 `terraform.tfvars` 파일이나 CLI 인자다.

> 용어 정리
> - **Terraform** = HashiCorp의 IaC(Infrastructure as Code, 인프라를 코드로 정의) 도구. `.tf` 파일에 "원하는 최종 상태"를 적으면 Terraform이 AWS API를 호출해 그 상태를 만든다.
> - **variable 블록** = 설정의 입력 슬롯. Java로 치면 메서드 시그니처의 파라미터, 혹은 `application.yml`의 `${...}` 자리 표시자에 가깝다.
> - **`var.이름`** = 다른 파일에서 이 변수를 읽는 문법. 예: `var.vpc_cidr`.

파일 맨 위 주석(1~3행)이 이 설계 의도를 그대로 말해준다.

```hcl
# variables.tf — every input the configuration accepts. Values come from terraform.tfvars
# (see terraform.tfvars.example) or the CLI. Secrets are marked `sensitive = true` so Terraform
# won't print them in plan/apply output.
```

즉 "값은 `terraform.tfvars`나 CLI에서 온다, 비밀값은 `sensitive = true`로 표시해 출력에 안 찍히게 한다"가 핵심 두 줄이다.

---

### 1. variable 블록의 4가지 인자 — 문법 골격부터

이 파일의 모든 블록은 아래 네 인자의 조합이다. 하나씩 무슨 뜻인지 보자.

```hcl
variable "project" {
  description = "Name prefix for all resources. Keep it short + DNS-safe."
  type        = string
  default     = "tubeshadow"
}
```

- **`description`** = 사람용 설명. `terraform plan` 시 보이고, 문서 자동 생성 도구가 읽는다. 동작에는 영향 없지만 인프라 코드에서는 "이 매개변수가 왜 존재하나"의 유일한 단서라 매우 중요.
- **`type`** = 값의 자료형. 여기선 `string`(문자열), `number`(숫자), `list(string)`(문자열 리스트) 세 종류가 등장한다. 타입을 적으면 Terraform이 잘못된 값을 넣었을 때 `apply` 전에 잡아준다(타입 검증).
- **`default`** = 기본값. **이게 있으면 그 변수는 "선택(optional)"**, 없으면 "필수(required)"가 된다. 필수 변수에 값을 안 주면 Terraform이 실행 시 대화형으로 물어본다(자동화 파이프라인에선 이게 멈춤의 원인이 됨 — 함정).
- **`sensitive`** = (뒤에서 자세히) `true`면 비밀값으로 간주해 출력 로그에서 가린다.

> 비유: `variable`은 "콘센트 구멍"이고 `default`는 "공장 출하 시 꽂혀 있던 플러그"다. `terraform.tfvars`에서 새 플러그를 꽂으면(=값을 주면) 기본 플러그를 밀어낸다.

`project`(5~9행) 변수 자체를 보면: 모든 자원 이름의 **접두사(prefix)**로 쓸 `"tubeshadow"`를 담는다. description의 "DNS-safe"는 이 값이 도메인/버킷 이름 등에 들어가므로 소문자·하이픈만 쓰라는 뜻(DNS = 도메인 이름 체계, 대문자·언더스코어를 못 받는 자리가 많다).

---

### 2. `aws_region` (11~15행) — 어느 지역에 띄울까

```hcl
variable "aws_region" {
  description = "AWS region. ca-central-1 = Canada (Central), close to a Toronto user."
  type        = string
  default     = "ca-central-1"
}
```

- **(a) 뭘 정하나**: AWS **리전(region)** = 물리적으로 떨어진 데이터센터 묶음. 모든 자원이 어느 나라에 만들어질지를 결정한다.
- **(b) 핵심**: `ca-central-1`은 캐나다 중부(몬트리올). description이 "토론토 사용자와 가깝다"고 적어둔 게 선택 이유 그 자체다.
- **(c) 왜**: 사용자와 리전이 가까울수록 네트워크 지연(latency)이 줄어든다. 쉐도잉처럼 영상·음성을 주고받는 앱에서 체감 차이가 난다.
- **(d) 함정**: 리전을 나중에 바꾸면 사실상 전부 재생성이다(자원은 리전에 묶여 있음). "일단 만들고 나중에 옮기지" 같은 생각은 위험. 또 `providers.tf`의 provider가 이 값을 받아 SDK 엔드포인트를 정하므로, 여기 한 줄이 전체 배포 위치를 좌우한다.

---

### 3. 네트워킹 3종 (17~34행) — VPC와 서브넷 CIDR

```hcl
variable "vpc_cidr" {
  description = "The private IP range for the whole VPC. /16 = 65k addresses, plenty."
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  type    = list(string)
  default = ["10.0.0.0/24", "10.0.1.0/24"]
}

variable "private_subnet_cidrs" {
  type    = list(string)
  default = ["10.0.10.0/24", "10.0.11.0/24"]
}
```

> 용어 폭탄 해체:
> - **VPC(Virtual Private Cloud)** = 내 전용 가상 사설망. AWS 안에 친 "내 회사 전용 사내망" 한 칸이라고 보면 된다. 모든 서버·DB가 이 안에 들어간다.
> - **CIDR(Classless Inter-Domain Routing 표기법)** = IP 주소 범위를 `주소/비트수`로 적는 법. 뒤 숫자가 "고정된 앞부분 비트 수"다. **`/16`이면 뒤 16비트가 자유 → 2^16 ≈ 65,536개 주소**. **`/24`면 2^8 = 256개 주소.**
> - **서브넷(subnet)** = VPC라는 큰 IP 덩어리를 잘게 쪼갠 조각. VPC가 `/16`(6.5만), 서브넷은 그 안의 `/24`(256개) 조각들이다.
> - **AZ(Availability Zone, 가용 영역)** = 한 리전 안의 물리적으로 분리된 데이터센터. 한 AZ가 죽어도 다른 AZ가 살아 있게 분산하려고 둘로 나눈다.
> - **public/private 서브넷** = 인터넷으로 나가는 길이 있으면 public, 없으면 private.

- **(a) 뭘 정하나**: `vpc_cidr`은 전체 사내망의 IP 영역(`10.0.0.0/16`). 나머지 둘은 그 안을 쪼갠 4개 서브넷의 영역.
- **(b) 핵심 한 줄씩**:
  - `vpc_cidr = "10.0.0.0/16"` → `10.0.x.x` 전부, 6.5만 주소. `10.x`는 사설 IP(인터넷에 안 보이는 내부용) 대역.
  - `public_subnet_cidrs = ["10.0.0.0/24", "10.0.1.0/24"]` → 공개망 2개. **`list(string)`이라 [ ] 리스트**다. 각 256개. 여기에 ALB와 Fargate 태스크가 들어간다.
  - `private_subnet_cidrs = ["10.0.10.0/24", "10.0.11.0/24"]` → 비공개망 2개. RDS(DB)가 여기 들어가고 "인터넷으로 나가는 경로 없음(No route to the internet)"이 description에 명시. DB를 외부에서 못 건드리게 격리하는 보안 핵심.
- **(c) 왜 2개씩인가**: 고가용성(HA, High Availability). 두 AZ에 하나씩 깔아야 한 데이터센터가 죽어도 서비스가 산다. RDS Multi-AZ나 ALB는 "서로 다른 AZ의 서브넷 2개 이상"을 요구하기도 한다.
- **(c) 왜 10/11로 띄웠나**: public은 `.0/.1`, private은 `.10/.11`. 중간을 비워 나중에 서브넷을 더 추가할 여지를 남긴 의도다(겹치면 안 되므로 미리 간격 확보).
- **(d) 흔한 함정**: ① 서브넷 CIDR이 서로 겹치면 안 됨(겹치면 라우팅 충돌). ② 서브넷은 VPC CIDR **안에** 완전히 포함돼야 함(`10.0.x`가 `10.0.0.0/16`의 부분집합). ③ `/24`라고 256개를 다 못 쓴다 — AWS가 각 서브넷에서 5개(네트워크/브로드캐스트/게이트웨이 등)를 예약한다.
- **연결**: 이 세 변수는 `network.tf`가 직접 받는다. 실제 코드에서 `aws_vpc`가 `cidr_block = var.vpc_cidr`, 서브넷은 `count = length(var.public_subnet_cidrs)`로 리스트 길이만큼 반복 생성하고 `cidr_block = var.public_subnet_cidrs[count.index]`로 하나씩 꺼내 쓴다. **즉 리스트에 항목을 하나 더 넣으면 서브넷이 하나 더 생긴다** — `count`와 리스트 변수의 연동이 여기 설계의 핵심.

---

### 4. 데이터베이스 4종 (36~59행) — RDS 파라미터

```hcl
variable "db_name"              { ... default = "tubeshadow" }
variable "db_username"          { ... default = "tubeshadow_admin" }
variable "db_instance_class"    { ... default = "db.t4g.micro" }   # type = string
variable "db_allocated_storage" { ... default = 20 }               # type = number
```

> - **RDS(Relational Database Service)** = AWS가 운영을 대신해주는 관리형 관계형 DB(여기선 PostgreSQL). 백업·패치를 AWS가 해준다.
> - **인스턴스 클래스(instance class)** = DB 서버의 하드웨어 사양 등급명.

- `db_name = "tubeshadow"` → RDS 안에 처음 만들어둘 데이터베이스 이름.
- `db_username = "tubeshadow_admin"` → **마스터 계정(master)** 이름. 비밀번호는 여기 없다는 점에 주목 — 비번은 보통 `random_password`로 생성하거나 Secrets Manager에서 관리한다(이 파일에 평문 비번을 안 둔 게 올바른 설계).
- `db_instance_class = "db.t4g.micro"` → description이 친절히 풀어줌: **`t4g` = ARM(Graviton, AWS 자체 ARM 칩, 같은 값이면 더 쌈)**, **`micro` = 가장 작은 등급(약 2 vCPU 버스트 / 1GB RAM)**. "the cheapest sensible option"(합리적인 최저가). `t` 계열은 **버스트(burst)** = 평소엔 적게 쓰다 잠깐 몰릴 때 잠깐 빨라지는 방식.
- `db_allocated_storage = 20` → **숫자 타입**. 디스크 20GB, `gp3`(범용 SSD 3세대) 타입. 따옴표 없는 `20`인 점이 위 string들과의 차이.
- **(c) 왜**: 1인/초기 서비스라 비용 최소화가 목표. 그래서 가장 싼 ARM micro + 최소 20GB.
- **(d) 함정**: `db_username`을 `admin`, `root`, `postgres` 같은 **예약어로 두면 RDS가 거부**한다. 그래서 `tubeshadow_admin`처럼 비켜갔다. 또 RDS 스토리지는 **늘릴 순 있어도 줄일 순 없다**.
- **연결**: `db_instance_class`는 `rds.tf`에서 `instance_class = var.db_instance_class`로 소비된다.

---

### 5. 컨테이너 / ECS 5종 (61~90행) — Fargate 태스크 스펙

```hcl
variable "container_cpu"    { type = number; default = 512 }    # 512 = 0.5 vCPU
variable "container_memory" { type = number; default = 1024 }   # MB
variable "container_port"   { type = number; default = 8080 }
variable "desired_count"    { type = number; default = 1 }
variable "image_tag"        { type = string; default = "latest" }
```

> - **ECS(Elastic Container Service)** = AWS의 컨테이너 오케스트레이터(컨테이너 실행·관리 도구).
> - **Fargate** = 서버(EC2)를 내가 안 띄우고, 컨테이너만 올리면 AWS가 알아서 굴려주는 서버리스 실행 방식.
> - **vCPU** = 가상 CPU 코어. ECS는 CPU를 "유닛"으로 세는데 **1024 유닛 = 1 vCPU**. 그래서 `512 = 0.5 vCPU`.
> - **ECR(Elastic Container Registry)** = AWS의 도커 이미지 저장소(Docker Hub의 AWS 사내판).
> - **태스크 정의(task definition)** = "이 이미지를 CPU/메모리 얼마로 어느 포트로 띄워라"라는 컨테이너 실행 명세서.

- `container_cpu = 512` → 0.5 vCPU.
- `container_memory = 1024` → 1024MB(=1GB). description의 "Must be a valid pairing with CPU (512 CPU -> 1024-4096 MB)"가 **함정 경고**다: **Fargate는 CPU/메모리 조합이 정해진 표 안에서만 허용**한다. 512 CPU면 메모리는 1024~4096 사이만 가능. 아무 숫자나 넣으면 `apply` 시 거부.
- `container_port = 8080` → 컨테이너 안 Spring Boot 앱이 듣는 포트. description에 그대로 "Spring Boot app listens on"이라 적혀 백엔드가 Java/Spring임을 알 수 있다.
- `desired_count = 1` → 태스크(앱 복제본)를 몇 개 띄울지. description: "1 for cost; 2+ for real HA"(1개는 비용용, 진짜 고가용성은 2개+). 지금은 비용 우선이라 1.
- `image_tag = "latest"` → ECR에서 어떤 이미지 태그를 띄울지. description: "CI/CD pushes :latest (and a SHA tag)". CI가 `latest`와 커밋 SHA 태그를 같이 푸시한다는 뜻.
- **(d) 함정**: `image_tag = "latest"`는 편하지만 **재현성의 적**이다. `latest`는 가리키는 실제 이미지가 계속 바뀌어서, 같은 `terraform apply`가 어제와 다른 코드를 띄울 수 있다. 그래서 운영에선 SHA 태그(불변 태그)로 고정하는 게 정석 — 여기선 둘 다 푸시해두고 기본은 `latest`로 편의를 택한 트레이드오프.
- **연결**: `ecs.tf`가 전부 받는다 — `cpu = var.container_cpu`, `desired_count = var.desired_count` 등. `container_port`는 컨테이너 정의 + ALB 헬스체크 양쪽이 같이 알아야 해서 변수로 빼둔 것.

---

### 6. 앱 설정(비밀 아님) 3종 (92~109행)

```hcl
variable "api_domain"           { default = "api.mimi.daeseon.ai" }
variable "cors_allowed_origins" { default = "https://mimi.daeseon.ai,https://*.vercel.app" }
variable "ai_provider"          { default = "gemini" }
```

- `api_domain` → 백엔드 API의 공개 호스트명. description: "DNS for this lives in Cloudflare"(이 도메인의 DNS는 Cloudflare에서 관리). 즉 AWS가 도메인을 만드는 게 아니라, 사람이 Cloudflare에서 이 이름을 ALB 주소로 연결한다.
- `cors_allowed_origins` → **CORS(Cross-Origin Resource Sharing, 브라우저가 다른 출처의 API 호출을 허용할지 정하는 규칙)** 화이트리스트. 콤마로 구분한 문자열 하나(리스트가 아니라 string인 점 주의 — 백엔드가 콤마를 직접 split해서 쓴다). `https://*.vercel.app`은 Vercel 프리뷰 배포까지 허용한다는 뜻.
- `ai_provider = "gemini"` → 분석 파이프라인이 쓸 LLM 선택. `'gemini'`(무료 등급) 또는 `'claude'`. 기본을 무료인 Gemini로 둔 것도 비용 절감 기조.
- **(d) 함정**: `cors_allowed_origins`가 `list(string)`이 아니라 `string`이라는 점. 백엔드 환경변수로 콤마 문자열을 통째로 넘기는 계약이라, 리스트로 바꾸면 백엔드 파싱이 깨진다.
- **연결**: `api_domain`은 `alb.tf`에서 ACM 인증서(`domain_name = var.api_domain`)와 `outputs.tf`(배포 후 "이 도메인을 ALB로 CNAME 연결하라"는 안내문)에 쓰인다. `cors_allowed_origins`와 `vpc_cidr`는 `ecs.tf`에서 컨테이너 **환경변수**로 주입된다(`{ name = "CORS_ALLOWED_ORIGINS", value = var.cors_allowed_origins }`). 즉 인프라 변수가 앱 런타임 설정으로 흘러 들어간다.

---

### 7. CI/CD (GitHub OIDC) 2종 (111~122행)

```hcl
variable "github_repo"   { default = "Daeseon-AI-Factory/shadow-ai" }
variable "github_branch" { default = "main" }
```

> - **CI/CD** = 자동 빌드·배포 파이프라인(여기선 GitHub Actions).
> - **OIDC(OpenID Connect)** = "정적 키 없이" 신원을 증명하는 표준. GitHub Actions가 AWS에 "나는 이 repo의 이 워크플로우다"를 토큰으로 증명하면, AWS가 잠깐 쓸 임시 권한을 내준다.
> - **IAM 역할(role)** = AWS에서 "이 일을 할 수 있는 권한 묶음". 사람이 아니라 워크플로우가 잠깐 빌려 쓴다.

- `github_repo` → 배포를 허용할 repo. "no static AWS keys"(AWS 비밀키를 GitHub에 저장하지 않는다)가 핵심 이득.
- `github_branch = "main"` → 오직 이 브랜치만 배포 역할을 가질 수 있음.
- **(c) 왜**: 액세스 키를 Secrets에 박아두면 유출 시 영구 위험. OIDC는 매번 짧게 만료되는 토큰이라 유출돼도 금방 무효. 보안 모범 사례.
- **연결**: `iam.tf`에서 신뢰 정책(trust policy)의 조건으로 직결된다 — `values = ["repo:${var.github_repo}:ref:refs/heads/${var.github_branch}"]`. 즉 "정확히 이 repo + 이 브랜치"의 토큰만 역할을 빌릴 수 있게 못 박는다. 이 한 줄이 보안의 자물쇠다.

---

### 8. 비밀값(Secrets) 3종 (124~143행) — `sensitive`의 진짜 의미

```hcl
variable "gemini_api_key" {
  description = "Google Gemini API key (the default, free AI provider)."
  type        = string
  sensitive   = true
}                                  # default 없음 → 필수!

variable "anthropic_api_key" {
  type      = string
  sensitive = true
  default   = ""                   # 있음 → 선택
}

variable "billing_webhook_secret" {
  type      = string
  sensitive = true
  default   = ""                   # 있음 → 선택, 빈 값이면 기능 비활성
}
```

- **`sensitive = true`가 정확히 뭘 하나**: Terraform이 `plan`/`apply`/`output` 로그에 이 값을 찍을 때 `(sensitive value)`로 가린다. CI 로그나 어깨너머로 키가 새는 걸 막는다.
- **`sensitive`가 하지 않는 것 (가장 큰 오해)**: **상태 파일(`terraform.tfstate`)에는 여전히 평문으로 저장된다.** `sensitive`는 "화면 출력만" 가린다. 그래서 `.gitignore`에 `*.tfstate`가 들어가 있는 것이고(확인함), DB 비번/JWT 시크릿이 상태에 평문으로 남는다는 주석이 `.gitignore`에 있다. 진짜 보호는 상태 파일을 암호화된 원격 백엔드(S3+KMS 등)에 두는 것.
- **`gemini_api_key`에 default가 없는 이유 (의도적)**: 이 값을 안 주면 Terraform이 멈추고 물어본다 → "키 없이 배포되는 사고"를 막는 안전장치. ai_provider 기본이 gemini라 이 키는 사실상 필수.
- **`anthropic_api_key`/`billing_webhook_secret`이 `default = ""`인 이유**: description대로 옵션이다. anthropic은 `ai_provider = "claude"`일 때만 필요, billing 시크릿은 빈 값이면 description대로 "webhook disabled (503)" — 즉 빈 문자열을 "기능 끔" 신호로 쓴다. 영리한 패턴.
- **(d) 함정**: 이 세 변수의 실제 값을 절대 `variables.tf`에 `default`로 적으면 안 된다(=Git에 평문 커밋). 124행 주석이 그대로 경고: "NEVER commit real values; put them in terraform.tfvars, which is gitignored".
- **연결**: `gemini_api_key`는 `secrets.tf`에서 AWS Secrets Manager로 들어간다(`secret_string = var.gemini_api_key`). 즉 Terraform 변수 → AWS Secrets Manager → ECS 태스크가 런타임에 꺼내 씀, 이렇게 비밀이 흐른다.

---

### 9. 값은 어디서 채워지나 — `terraform.tfvars`와의 연결

`variables.tf`는 "구멍"만 뚫는다. 실제 값은 **`terraform.tfvars`**(자동 로드되는 값 파일)에서 온다. 옆의 `terraform.tfvars.example`(읽어서 확인함)이 템플릿이고, 사용자는 이걸 복사해 `terraform.tfvars`로 만들어 채운다:

```hcl
# terraform.tfvars.example 발췌
gemini_api_key = "AIza...your-google-gemini-key..."
# anthropic_api_key = "sk-ant-..."        # claude로 바꿀 때만
# db_instance_class = "db.t4g.micro"      # 주석 = 기본값 그대로 쓴다는 뜻
```

- 비밀(gemini 키)만 거의 필수로 적고, 나머지는 주석 처리 → "기본값 그대로"라는 뜻. variables.tf에 default를 잘 깔아둔 덕에 tfvars가 짧아지는 좋은 설계.
- **값 우선순위**(낮음→높음): `variables.tf`의 default → `terraform.tfvars` → `-var`/`-var-file` CLI 인자 → `TF_VAR_이름` 환경변수. 뒤가 앞을 이긴다.
- **보안 마무리**: `.gitignore`에 `terraform.tfvars`가 들어가 있어(확인함) 실제 비밀이 담긴 파일은 Git에 안 올라간다. `*.example`만 올라간다. 이 분리가 "비밀과 템플릿"을 가르는 표준 패턴.

---

### 10. 한눈 정리 (멘탈 모델)

```
variables.tf  (구멍/계약: 이름 + 타입 + 기본값 + 비밀여부)
      │  var.이름
      ▼
network.tf / rds.tf / ecs.tf / alb.tf / iam.tf / secrets.tf  (실제 자원 생성)
      ▲
      │  실제 값 주입
terraform.tfvars  (← terraform.tfvars.example 복사, gitignored, 비밀 포함)
```

---

### 11. 면접 포인트

- **Q. Terraform variable에서 `sensitive = true`가 보안적으로 보장하는 것과 보장하지 않는 것은?**
  A. CLI의 plan/apply/output **출력 로그**에서만 값을 가린다. **상태 파일(tfstate)에는 평문으로 남으므로**, 실제 보호는 상태를 암호화된 원격 백엔드(예: S3+KMS)에 두고 tfstate/tfvars를 gitignore하는 것까지 해야 완성된다.

- **Q. variable에 `default`가 있고 없고의 차이는?**
  A. `default`가 있으면 **선택(optional)** — 값을 안 줘도 기본값으로 진행. 없으면 **필수(required)** — 값을 안 주면 Terraform이 실행을 멈추고 대화형으로 묻는다(자동화에선 파이프라인이 hang). 그래서 `gemini_api_key`는 일부러 default를 빼서 "키 누락 배포"를 원천 차단했다.

- **(보너스) Q. CIDR `/16`과 `/24`의 차이를 한 줄로?**
  A. 뒤 숫자는 고정 비트 수라, `/16`은 가변 16비트 → 약 65,536개, `/24`는 가변 8비트 → 256개 주소. 이 repo는 VPC를 `/16`(6.5만)으로 잡고 그 안을 `/24`(256개) 서브넷들로 쪼갰다.

---

## 4. network.tf

이 파일은 **"네트워크 골조"**다. AWS에서 뭐든 띄우려면 먼저 "어디에 띄울 사설 네트워크"가 있어야 하는데, 그 땅(VPC)과 도로(subnet, route table), 정문(IGW)을 여기서 다 만든다. 백엔드 개발자 비유로는 `application.yml`의 네트워크 레이아웃에 해당한다 — 코드가 아니라 "코드가 살 환경의 지도"다.

먼저 전체 그림부터 잡고 가자. 파일 맨 위 주석(1~20행)이 이 인프라의 모양을 ASCII로 그려놨는데, 이게 핵심이라 그대로 읽고 간다.

```
        Internet
           │
        [ IGW ]                         ← Internet Gateway: the VPC's door to the internet
           │
   ┌───────┴────────────────────────────────────┐  VPC 10.0.0.0/16
   │  PUBLIC subnets (AZ-a, AZ-b)                │  ← ALB + Fargate tasks live here.
   │   route: 0.0.0.0/0 → IGW                    │
   │  PRIVATE subnets (AZ-a, AZ-b)               │
   │   route: local only (no internet)           │  ← RDS lives here.
   └─────────────────────────────────────────────┘
```

이 파일에서 가장 중요한 **설계 결정**은 18~20행 주석에 적혀 있다: "원래는 앱 서버를 private subnet에 두고 NAT gateway로 외부 통신을 시키는 게 정석인데, **돈 아끼려고 NAT를 생략**하고 Fargate를 public subnet에 public IP를 달아서 띄운다"는 거다. 이 한 줄이 파일 전체의 논리를 지배하므로 먼저 용어부터 깔고 가자.

### 핵심 용어 깔기 (모른다고 가정하고)

- **VPC (Virtual Private Cloud)** = 당신만 쓰는 가상 사설 네트워크. AWS 안에 울타리 친 "내 땅". 이 안의 리소스끼리는 사설 IP로 통신한다.
- **CIDR (Classless Inter-Domain Routing)** = IP 범위를 `주소/비트수`로 쓰는 표기법. `/16`은 IP 32비트 중 앞 16비트가 고정 → 뒤 16비트가 자유 → 2^16 = **약 65,536개 주소**. `/24`는 앞 24비트 고정 → 뒤 8비트 자유 → 2^8 = **256개 주소**. 숫자가 클수록(`/24 > /16`) 범위가 **좁아진다**(고정 비트가 많아서). 헷갈리기 쉬우니 외워두자: **슬래시 숫자가 클수록 작은 동네**.
- **Subnet (서브넷)** = VPC라는 큰 땅을 잘게 쪼갠 구획. 각 구획은 VPC CIDR의 부분집합 CIDR을 갖는다.
- **AZ (Availability Zone, 가용 영역)** = 한 리전(예: 캐나다 중부) 안의 물리적으로 분리된 데이터센터. AZ-a가 정전돼도 AZ-b는 살아있게 하는 게 다중 AZ의 목적.
- **IGW (Internet Gateway, 인터넷 게이트웨이)** = VPC와 인터넷을 잇는 "정문". 이게 없으면 VPC는 외부와 단절된 섬.
- **Route table (라우팅 테이블)** = "이 목적지 IP로 가는 트래픽은 어느 출구로 보내라"는 규칙표. subnet마다 하나가 붙는다.
- **NAT Gateway** = private subnet(공인 IP 없는 곳)의 리소스가 **바깥으로 나갈 때만** 쓰는 단방향 출구. 시간당 과금 + 데이터 처리 과금이라 월 ~$32부터 시작 → **이 프로젝트는 안 만든다.**

---

### 블록 1 — `aws_vpc.main` (22~28행): 땅 만들기

```hcl
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = { Name = "${var.project}-vpc" }
}
```

**(a) 뭘 만드나** — 이 인프라가 살 VPC 한 개. 모든 subnet/route table이 이 VPC의 `id`를 참조하므로 모든 것의 부모다.

**(b) 인자 한 줄씩**
- `cidr_block = var.vpc_cidr` — VPC가 쓸 전체 IP 범위. `variables.tf`를 확인하니 기본값이 `10.0.0.0/16`(약 65k개 주소)이다. `10.x.x.x`는 RFC 1918 **사설 IP 대역**(인터넷에 안 보이는, 내부망 전용 주소)이라 VPC에 쓰기 좋다.
- `enable_dns_support = true` — VPC 안에서 DNS 이름을 IP로 풀 수 있게 한다(주석: "RDS endpoint hostname을 resolve"). 이게 꺼져 있으면 앱이 `xxx.rds.amazonaws.com` 같은 주소를 못 찾는다.
- `enable_dns_hostnames = true` — VPC 내 리소스가 IP뿐 아니라 **DNS 이름**을 부여받게 한다. RDS가 IP가 아닌 안정적인 호스트네임을 갖는 이유. **RDS를 쓰려면 이 둘은 사실상 필수다.**
- `tags = { Name = "${var.project}-vpc" }` — 콘솔에서 알아볼 이름표. `var.project` 기본값이 `tubeshadow`라 실제 이름은 `tubeshadow-vpc`. `${...}`는 Terraform의 문자열 보간(=변수를 문자열에 끼워넣기).

**(c) 왜 이렇게** — `/16`은 "넉넉하게". subnet들을 `/24`로 잘라 쓸 거라 `/16` 안에 256개의 `/24`가 들어간다. 처음부터 크게 잡아두면 나중에 subnet 추가할 때 IP가 모자랄 일이 없다.

**(d) 함정** — VPC의 CIDR은 **생성 후 사실상 못 바꾼다**(범위를 줄이는 변경은 불가, 추가 CIDR 붙이는 것만 가능). 그래서 처음에 넉넉히 잡는 게 정석. 그리고 `enable_dns_hostnames`를 깜빡 끄고 RDS를 붙이면 "분명 엔드포인트는 맞는데 연결이 안 됨" 같은 디버깅 지옥에 빠진다.

---

### 블록 2 — `aws_internet_gateway.main` (30~33행): 정문 달기

```hcl
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  tags   = { Name = "${var.project}-igw" }
}
```

**(a) 뭘 만드나** — VPC를 인터넷에 연결하는 게이트웨이 한 개.

**(b) 인자** — `vpc_id = aws_vpc.main.id` 한 줄뿐이다. 위에서 만든 VPC에 이 게이트웨이를 **붙인다**(attach). `aws_vpc.main.id`처럼 다른 리소스의 속성을 참조하면 Terraform이 자동으로 "VPC 먼저, 그다음 IGW" 순서를 잡는다(=암묵적 의존성).

**(c) 왜** — public subnet의 트래픽이 인터넷으로 나가려면 출구가 필요하다. IGW가 그 출구. 단, **IGW를 만들기만 하면 인터넷이 열리는 게 아니다** — 아래 route table에서 "0.0.0.0/0 → 이 IGW"라고 길을 깔아줘야 비로소 통한다. IGW는 문이고, route table은 그 문으로 가는 도로 표지판이다.

**(d) 함정** — IGW는 양방향이고 **무료**다(NAT와 헷갈리지 말 것 — NAT는 단방향 아웃바운드 전용에 유료). "IGW만 있으면 보안 위험?" 아니다. 실제 외부 접근 차단은 Security Group(`security.tf`)이 한다. IGW는 단지 길일 뿐.

---

### 블록 3 — `aws_subnet.public` (36~44행): 공개 구획 두 개

```hcl
resource "aws_subnet" "public" {
  count                   = length(var.public_subnet_cidrs)
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet_cidrs[count.index]
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true
  tags = { Name = "${var.project}-public-${count.index}" }
}
```

**(a) 뭘 만드나** — public subnet **두 개**(AZ-a, AZ-b 각 하나씩). 여기에 ALB와 Fargate 태스크가 산다.

**(b) 인자 한 줄씩**
- `count = length(var.public_subnet_cidrs)` — `count`는 "이 블록을 N번 복제"하는 Terraform 메타 인자. `variables.tf`의 `public_subnet_cidrs` 기본값이 `["10.0.0.0/24", "10.0.1.0/24"]`로 원소 2개라 `length(...)=2` → subnet 2개가 만들어진다. 결과는 `aws_subnet.public[0]`, `aws_subnet.public[1]` 배열.
- `cidr_block = var.public_subnet_cidrs[count.index]` — `count.index`는 0,1,... 반복 인덱스. 0번 subnet은 `10.0.0.0/24`(256개), 1번은 `10.0.1.0/24`(256개)를 받는다. 둘 다 VPC `/16` 안의 작은 동네.
- `availability_zone = data.aws_availability_zones.available.names[count.index]` — **다른 파일과의 연결점.** `providers.tf`에 `data "aws_availability_zones" "available" { state = "available" }`가 있어서 "지금 리전에서 쓸 수 있는 AZ 목록"을 런타임에 조회한다(`data`=만드는 게 아니라 기존 정보를 읽는 소스). `[0]`=첫째 AZ, `[1]`=둘째 AZ → 두 subnet이 **서로 다른 AZ**에 흩어진다.
- `map_public_ip_on_launch = true` — **이 파일의 핵심 한 줄.** 이 subnet에서 띄우는 모든 것에 **자동으로 public IP**(인터넷에서 보이는 공인 주소)를 부여한다. 주석: "anything launched here gets a public IP by default". 이게 NAT 없이도 Fargate가 인터넷(ECR, Secrets Manager)에 닿는 비결.

**(c) 왜 둘로 나누나** — **고가용성**. ALB(Application Load Balancer, L7 로드밸런서)는 규칙상 **최소 2개 AZ의 subnet**을 요구한다. AZ 하나가 죽어도 다른 AZ로 트래픽이 가게 하려는 것. 그래서 일부러 두 AZ에 흩뿌린다.

**(d) 함정** — "public subnet = 자동으로 인터넷 됨"이 아니다. **세 박자**가 다 맞아야 한다: ① `map_public_ip_on_launch=true`(공인 IP) + ② route table에 `0.0.0.0/0 → IGW`(길) + ③ Security Group이 트래픽 허용. 하나라도 빠지면 "분명 public인데 왜 안 되지?"가 된다. 또 `count` 기반 리소스는 **리스트 중간 원소를 지우면 인덱스가 밀려서** 뒤 리소스들이 재생성될 수 있다 — 주의.

---

### 블록 4 — `aws_subnet.private` (48~55행): 비공개 구획 두 개

```hcl
resource "aws_subnet" "private" {
  count             = length(var.private_subnet_cidrs)
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet_cidrs[count.index]
  availability_zone = data.aws_availability_zones.available.names[count.index]
  tags = { Name = "${var.project}-private-${count.index}" }
}
```

**(a) 뭘 만드나** — private subnet **두 개**. 여기엔 RDS(관리형 PostgreSQL)가 산다.

**(b) public과 딱 한 가지 차이** — `map_public_ip_on_launch`가 **없다**(즉 기본값 false → 공인 IP 안 줌). 나머지(count, vpc_id, availability_zone)는 같은 패턴. CIDR은 `private_subnet_cidrs` 기본값 `["10.0.10.0/24", "10.0.11.0/24"]` — public(`.0`, `.1`)과 안 겹치게 `.10`, `.11` 대역으로 떨어뜨려 놨다. **같은 VPC 안에서 subnet CIDR끼리 겹치면 안 되기 때문.**

**(c) 왜 두 개인가 (RDS도 단일 AZ인데?)** — 47행 주석이 정확히 답한다: "RDS requires a subnet group spanning at least two AZs even if you run single-AZ." 즉 실제로는 RDS를 한 AZ에만 띄워도, RDS의 **subnet group(=RDS가 들어갈 후보 subnet 묶음)**은 규칙상 **2개 이상 AZ**를 포함해야 한다. 그래서 어쩔 수 없이 두 개를 만든다. 이 두 subnet은 `rds.tf`의 `aws_db_subnet_group.main`에서 `subnet_ids = aws_subnet.private[*].id`로 묶여 RDS에 전달된다(`[*]`=splat, 배열 전체의 id를 뽑는 문법).

**(d) 함정** — private subnet이라고 자동으로 "안전"은 아니다. 진짜 보호막은 `security.tf`의 `aws_security_group.rds`다 — 거기서 "Fargate의 SG에서 오는 5432 포트만 허용"한다(`security_groups = [aws_security_group.fargate.id]`). 즉 **DB는 공인 IP가 없어서 인터넷에서 안 보이고, 같은 VPC 안에서도 Fargate만** 접근 가능. 이중 방어다.

---

### 블록 5~6 — Public 라우팅 (59~74행): 인터넷으로 가는 길 깔기

```hcl
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }
  tags = { Name = "${var.project}-public-rt" }
}

resource "aws_route_table_association" "public" {
  count          = length(aws_subnet.public)
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}
```

**(a) 뭘 만드나** — ① 인터넷행 길이 있는 route table 하나 + ② 그 table을 두 public subnet에 **연결**하는 association 두 개.

**(b) 인자**
- `route { cidr_block = "0.0.0.0/0" gateway_id = ... }` — **이 파일에서 인터넷을 여는 결정적 한 줄.** `0.0.0.0/0`은 "**모든** IP"를 뜻하는 와일드카드(= "그 외 전부"). 즉 "VPC 내부(local)가 아닌 모든 목적지는 IGW로 보내라". 이게 public subnet을 진짜 public으로 만드는 길.
- `route_table_association` — route table은 만들어 두기만 하면 아무 subnet에도 안 붙는다(VPC 기본 table이 붙어 있을 뿐). 명시적으로 "이 subnet엔 이 table을 써라"고 **연결**해줘야 효력 발생. `count = length(aws_subnet.public)`로 두 subnet에 각각 붙인다.

**(c) 왜** — `local` 라우트(VPC 내부 통신)는 AWS가 **자동으로** 모든 route table에 넣어주므로 따로 안 쓴다. 우리가 추가할 건 "그 외 전부 → IGW"뿐. 그래서 route 블록이 딱 하나다.

**(d) 함정** — route table을 만들고 association을 **깜빡하면** subnet은 VPC의 main route table(인터넷 길 없음)을 그대로 써서 "인터넷이 안 됨"이 된다. 초보가 제일 많이 빠지는 함정. route table 자체와 association은 **별개 리소스**라는 걸 기억할 것.

---

### 블록 7~8 — Private 라우팅 (78~87행): 일부러 길을 안 까는 라우팅

```hcl
resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id
  tags   = { Name = "${var.project}-private-rt" }
}

resource "aws_route_table_association" "private" {
  count          = length(aws_subnet.private)
  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private.id
}
```

**(a) 뭘 만드나** — `route { }` 블록이 **하나도 없는** route table + 그걸 두 private subnet에 붙이는 association.

**(b) 핵심** — 76~77행 주석이 설명한다: "NO internet route. The default `local` route (intra-VPC) is implicit." 즉 이 table엔 우리가 추가한 길이 없고, AWS가 자동으로 넣는 `local`(VPC 내부) 라우트만 존재한다. 그래서 RDS는 **인터넷에 절대 못 나가고, 못 들어온다.** 오직 같은 VPC 안에서만 통신.

**(c) 왜 굳이 빈 route table을 따로 만드나** — 그냥 VPC 기본 table을 쓰면 안 되나? 안전 때문이다. 명시적으로 "private 전용 빈 table"을 만들어 붙여두면, 나중에 public table에 실수로 뭔가 추가해도 private는 영향을 안 받는다. **격리를 코드로 못 박는 것.**

**(d) 함정 / 오해** — "라우트가 없으면 DB가 앱이랑 통신도 못 하는 거 아냐?" 아니다. `local` 라우트가 자동으로 있어서 **VPC 내부(앱↔DB)는 잘 통한다.** 막히는 건 오직 **인터넷 방향**뿐. 또 한 가지 — 이 구조에서 RDS는 OS 패치/외부 다운로드가 필요 없는 **관리형 서비스**라 NAT 없이도 멀쩡하다. 만약 private subnet에 직접 EC2를 띄워 `apt update` 같은 걸 하려 했다면 NAT가 없어서 막혔을 거다. 즉 **"NAT 생략"은 RDS만 private에 두기 때문에 성립하는 트릭**이다.

---

### 다른 파일과의 연결 정리 (이 파일이 내보내는 것)

- `aws_subnet.public[*].id` → **`alb.tf`**(`subnets = aws_subnet.public[*].id`, 11~12행)와 **`ecs.tf`**(Fargate의 `subnets = aws_subnet.public[*].id`, 90행)가 가져다 쓴다. ALB와 앱이 둘 다 public subnet에 산다.
- `aws_subnet.private[*].id` → **`rds.tf`**의 `aws_db_subnet_group.main`(20행)이 묶어 RDS에 넘긴다.
- `aws_vpc.main.id` → **`security.tf`**의 모든 Security Group(alb/fargate/rds)이 "이 VPC 소속"이라고 참조한다.
- 거꾸로 이 파일은 **`providers.tf`의 `data.aws_availability_zones`**와 **`variables.tf`의 CIDR 변수들**을 입력으로 받는다.

한 문장 요약: **network.tf는 "땅(VPC) + 구획(subnet) + 정문(IGW) + 도로(route table)"를 깔고, 그 위에 alb/ecs/rds/security가 건물을 올린다.**

---

### 면접 포인트

**Q1. "Public subnet과 private subnet의 진짜 차이가 뭐냐?"**
A. 한 줄 답: **"연결된 route table에 `0.0.0.0/0 → IGW` 라우트가 있느냐 없느냐"**다. subnet 리소스 자체엔 public/private 플래그가 없다 — 이 파일에서도 public은 `aws_route_table.public`(IGW 라우트 있음)에 붙고, private은 빈 route table에 붙는 차이뿐. (보조: public엔 보통 `map_public_ip_on_launch=true`도 같이 켠다.)

**Q2. "NAT gateway 없이 어떻게 컨테이너가 ECR에서 이미지를 당겨오나? 위험하지 않나?"**
A. 한 줄 답: **Fargate를 public subnet에 두고 public IP(`map_public_ip_on_launch=true`)를 줘서 IGW를 통해 직접 아웃바운드한다 — NAT(~$32/mo)를 아끼는 트레이드오프.** 보안은 Security Group이 인바운드를 ALB SG에서 오는 트래픽만 허용해 막는다(`security.tf`). 다만 프로덕션 정석은 private subnet + NAT(또는 VPC endpoint)로, 태스크에 공인 IP를 노출하지 않는 것 — 이건 "학습 비용 절감용 의도적 단순화"임을 명확히 말하면 가산점.

---

## 5. security.tf

이 파일은 인프라의 **방화벽 3개**를 정의한다. 백엔드 개발자에게 익숙한 비유로 말하면, 각 서버 앞에 세워둔 "경비원 3명"이다. 경비원마다 "누가 어떤 문(포트)으로 들어올 수 있는가"를 적은 명단을 들고 있다. 핵심은 이 명단에 **IP 주소가 아니라 "옆 경비원의 이름"을 적었다**는 점인데, 이게 이 파일 전체의 주제다. 천천히 풀어보자.

### 0. 먼저 용어부터 (모른다고 가정하고 전부 정의)

- **Security Group(SG, 보안 그룹)** = AWS의 **stateful(상태 기억) 가상 방화벽**. EC2/Fargate/RDS 같은 리소스에 "붙여서" 그 리소스로 들어오고(인바운드) 나가는(아웃바운드) 트래픽을 제어한다.
- **stateful(상태 기억)** = "들어온 요청에 대한 응답은 자동으로 허용"한다는 뜻. 예를 들어 인바운드로 들어온 요청에 서버가 답장(응답 패킷)을 보낼 때, 그 답장을 위한 아웃바운드 규칙을 따로 안 써도 된다. SG가 "아, 아까 들어온 그 연결의 답이구나" 하고 기억(state)해서 자동으로 통과시킨다. 반대 개념은 **stateless(NACL, 네트워크 ACL)** — 거긴 들어오고 나가는 규칙을 둘 다 명시해야 한다. SG에서 초보자가 가장 많이 헷갈리는 지점이다.
- **ingress(인바운드)** = 들어오는 트래픽 규칙. **egress(아웃바운드)** = 나가는 트래픽 규칙.
- **포트(port)** = 한 서버 안에서 어떤 프로그램이 듣고 있는지 구분하는 번호. 443=HTTPS, 80=HTTP, 8080=앱 서버, 5432=PostgreSQL의 기본 포트.
- **CIDR(=Classless Inter-Domain Routing, IP 범위 표기법)** = `0.0.0.0/0`처럼 IP 묶음을 표현. `/뒤 숫자`가 작을수록 범위가 넓다. `/0`은 **전 세계 모든 IP**, `/32`는 IP 딱 1개, `/24`는 256개. 그래서 `0.0.0.0/0`은 "인터넷 전체, 누구나"라는 뜻이다.
- **VPC(=Virtual Private Cloud)** = AWS 안에 내가 가진 격리된 사설 네트워크. SG는 반드시 어떤 VPC에 속해야 한다.
- **ALB(=Application Load Balancer)** = 들어오는 HTTP/HTTPS 요청을 받아 뒤의 여러 컨테이너로 분배하는 L7(애플리케이션 계층) 로드밸런서.
- **Fargate** = 서버(EC2)를 직접 관리하지 않고 컨테이너만 던지면 AWS가 알아서 굴려주는 서버리스 컨테이너 실행 환경.
- **RDS(=Relational Database Service)** = AWS가 관리해주는 관계형 DB(여기선 PostgreSQL).

### 0.5 파일 맨 위 주석이 그린 그림 (가장 중요)

파일 1~10번 줄의 주석이 설계 전체를 한 그림으로 요약한다:

```
internet ──443──▶ [alb-sg]  ──8080──▶ [fargate-sg] ──5432──▶ [rds-sg]
(anyone)          the ALB              the app tasks          the database
```

요청이 흘러가는 길(request path)을 그대로 따라 방화벽을 줄세웠고, **각 층은 바로 앞 층만 신뢰**한다. 주석 8~10번 줄이 이 파일의 핵심 사상을 못박는다:

> "the DB doesn't accept '5432 from 10.0.x.x', it accepts '5432 from whatever is in fargate-sg'."

즉 DB는 "10.0.x.x 대역에서 오는 5432 연결"을 받는 게 아니라, **"fargate-sg에 속한 무언가가 보내는 5432 연결"**만 받는다. 그래서 같은 VPC 안의 다른 머신이라도, 그게 앱(fargate-sg)이 아니면 DB에 절대 못 닿는다. 이걸 **SG 체이닝(chaining, 사슬 참조)** 이라 부른다.

왜 IP가 아니라 SG를 출처로 쓰는 게 더 안전한가? IP는 컨테이너가 죽었다 살아나면 바뀐다(Fargate는 태스크마다 IP가 매번 다르다). IP로 화이트리스트를 만들면 오토스케일링 때마다 규칙을 고쳐야 하고, 누군가 그 IP 대역을 탈취하면 뚫린다. 반면 SG 참조는 "신원(identity)"으로 묶는 것이라, IP가 어떻게 바뀌든 "fargate-sg 멤버냐 아니냐"만 본다. **주소가 아니라 신분증으로 검문**하는 것이다.

---

### 블록 1 — `aws_security_group.alb` (인터넷에 열린 경비원)

```hcl
resource "aws_security_group" "alb" {
  name        = "${var.project}-alb-sg"
  description = "Public-facing load balancer"
  vpc_id      = aws_vpc.main.id
  ...
}
```

**(a) 뭘 만드나** — ALB(로드밸런서) 앞에 세울 방화벽. 인터넷에서 들어오는 첫 관문이다.

**(b) 핵심 인자 한 줄씩**
- `name = "${var.project}-alb-sg"` — SG 이름. `${var.project}`는 변수 보간(variable interpolation, 변수 값을 문자열에 끼워넣기)으로 `variables.tf`의 `project` 값(예: `tubeshadow`)이 들어가 `tubeshadow-alb-sg`가 된다. 프로젝트 이름을 접두사로 붙여 리소스를 한눈에 구분.
- `vpc_id = aws_vpc.main.id` — 이 SG가 속할 VPC. `network.tf`(또는 그쪽 파일)에 정의된 `aws_vpc.main`의 `id`를 참조한다. **리소스 간 참조(reference)** — Terraform이 이 의존성을 보고 "VPC를 먼저 만들고 SG를 만들어라" 순서를 자동 계산한다(이게 Terraform의 의존성 그래프).

**인바운드 규칙 2개:**
```hcl
ingress {
  from_port   = 443
  to_port     = 443
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
}
ingress {  # 80번 포트도 동일하게 전 세계 개방 }
```
- `from_port`/`to_port`가 둘 다 443 — 이건 **포트 범위**의 시작과 끝이다. 같으면 "443 단일 포트"라는 뜻. (만약 8000~9000을 열고 싶으면 from=8000, to=9000.)
- `protocol = "tcp"` — TCP만. HTTPS/HTTP는 TCP 위에서 돈다.
- `cidr_blocks = ["0.0.0.0/0"]` — **전 세계 모든 IP 허용**. 로드밸런서는 일반 사용자가 접속해야 하니 당연히 열려 있다.
- 80번도 똑같이 여는 이유: 사용자가 `http://`로 들어와도 끊지 않고 받아서 **443(HTTPS)으로 리다이렉트**하려고(주석 "redirected to HTTPS"). 이 리다이렉트 자체는 `alb.tf`의 리스너가 처리하고, SG는 단지 "80 트래픽이 들어오는 것 자체를 허용"만 한다.

**아웃바운드 규칙:**
```hcl
egress {
  from_port   = 0
  to_port     = 0
  protocol    = "-1"
  cidr_blocks = ["0.0.0.0/0"]
}
```
- `protocol = "-1"` — **모든 프로토콜**을 의미하는 특수값(TCP/UDP/ICMP 전부). `-1`일 땐 포트가 의미 없어서 `from/to_port = 0`으로 둔다.
- 의미: "어디로든 다 나가도 됨". ALB가 뒤의 Fargate 태스크로 트래픽을 보낼 수 있어야 하니까(주석 "so the ALB can reach the tasks").

**(c) 왜 이렇게?** ALB는 공개 진입점이라 인바운드는 443/80만 좁게, 아웃바운드는 뒤로 자유롭게 전달해야 하니 전체 개방. 외부엔 좁게, 내부 전달엔 넓게 — 전형적 패턴.

**(d) 흔한 함정**
1. **stateful 착각으로 egress를 잠그려는 시도.** "443으로 들어온 응답을 돌려보내려면 egress 443을 열어야 하지 않나?" → 아니다. SG는 stateful이라 들어온 연결의 응답은 egress 규칙과 무관하게 자동 통과. 여기 egress 전체개방은 응답용이 아니라 **ALB가 새로 시작하는 연결(→Fargate)**을 위한 것.
2. `from_port=0, to_port=0`을 "0번 포트만"으로 오해. protocol이 `-1`이면 포트는 무시되고 전체를 뜻한다.

> **옆 파일 연결:** 이 `aws_security_group.alb.id`를 `alb.tf` 11번 줄(`security_groups = [aws_security_group.alb.id]`)에서 ALB 본체에 붙인다. SG는 정의만 하고, 실제로 어떤 리소스에 입히는지는 그쪽에서 결정된다.

---

### 블록 2 — `aws_security_group.fargate` (앱 컨테이너 경비원, 체이닝 등장)

```hcl
resource "aws_security_group" "fargate" {
  name        = "${var.project}-fargate-sg"
  description = "App containers; only the ALB may reach them"
  vpc_id      = aws_vpc.main.id
  ...
}
```

**(a) 뭘 만드나** — 앱이 도는 Fargate 컨테이너 앞 방화벽. **여기서 SG 체이닝이 처음 나온다.**

**인바운드 규칙 (이 파일의 하이라이트):**
```hcl
ingress {
  description     = "App port from the ALB only"
  from_port       = var.container_port
  to_port         = var.container_port
  protocol        = "tcp"
  security_groups = [aws_security_group.alb.id]   # <-- 출처가 CIDR이 아니라 ALB의 SG
}
```
- `from_port = var.container_port` — 앱 포트를 변수로 받는다(맨 위 그림 기준 8080). 코드에 숫자를 박지 않고 `variables.tf`에서 한 곳만 고치면 되게 한 것.
- **`security_groups = [aws_security_group.alb.id]`** — 이게 핵심. `cidr_blocks` 자리에 IP 대역을 쓰는 대신 **`security_groups`에 ALB의 SG id를 넣었다.** 해석: "출처(source)가 `alb-sg`에 속한 트래픽만 이 포트로 들여보내라." 즉 **ALB를 거친 트래픽만** 앱에 도달한다. 인터넷에서 8080으로 직접 두드려도, 그 출처는 alb-sg가 아니므로 차단된다.

**왜 이게 강력한가:** ALB 뒤에 컨테이너가 100개로 오토스케일되든, IP가 매번 바뀌든 상관없다. "alb-sg냐?"만 보면 되니 규칙을 한 번도 안 고쳐도 된다. 신분증(SG) 검문의 위력.

**아웃바운드:**
```hcl
egress {  # protocol "-1", 0.0.0.0/0 전체 개방
  description = "All outbound (pull image from ECR, read Secrets, call DB + Gemini)"
}
```
- 전체 개방인 이유가 주석에 박혀 있다: 앱이 (1) **ECR**(=Elastic Container Registry, AWS 도커 이미지 저장소)에서 이미지를 받고 (2) **Secrets**(비밀값, `secrets.tf` 참조)를 읽고 (3) **DB**(5432)에 붙고 (4) **Gemini**(외부 LLM API) 같은 외부 서비스를 호출해야 한다. 나가는 목적지가 다양해서 일일이 열기 번거로워 전체 개방.

**(c) 왜?** 앱은 "들어오는 건 ALB만, 나가는 건 자유"가 자연스럽다. 사용자 요청은 반드시 ALB를 통하지 직접 안 오니까.

**(d) 흔한 함정**
1. **`security_groups`와 `cidr_blocks`를 한 ingress 블록에 섞기.** 둘 다 쓸 순 있지만 "OR(둘 중 하나라도 맞으면 허용)"이라 의도와 달리 구멍이 생길 수 있다. 여기선 깔끔하게 SG 하나만 썼다.
2. **체인 방향 헷갈림.** "ALB의 egress에 fargate를 적어야 하나?" 아니다. egress는 전체 개방(`0.0.0.0/0`)이라 ALB는 어디로든 나갈 수 있고, **막는 쪽은 받는 쪽(fargate의 ingress)**이다. 보안은 "받는 문"에서 거는 게 기본.
3. **stateful 덕에 egress 좁혀도 응답은 가지만**, 여기선 외부 호출이 많아 굳이 안 좁힘. 보안 강화하려면 egress를 443/5432로 좁힐 수도 있다(트레이드오프: 깨지기 쉬움).

> **옆 파일 연결:** `aws_security_group.fargate.id`는 `ecs.tf` 91번 줄(`security_groups = [aws_security_group.fargate.id]`)에서 ECS 서비스의 네트워크 설정에 붙는다. 즉 여기서 만든 규칙이 실제 도는 컨테이너에 입혀진다.

---

### 블록 3 — `aws_security_group.rds` (DB 경비원, 체인의 끝)

```hcl
resource "aws_security_group" "rds" {
  name        = "${var.project}-rds-sg"
  description = "Database; only the app tasks may reach it"
  vpc_id      = aws_vpc.main.id
  ...
}
```

**(a) 뭘 만드나** — PostgreSQL DB 앞 방화벽. 체인의 마지막이자 가장 민감한 층.

**인바운드:**
```hcl
ingress {
  description     = "Postgres from the Fargate tasks only"
  from_port       = 5432
  to_port         = 5432
  protocol        = "tcp"
  security_groups = [aws_security_group.fargate.id]
}
```
- 다시 **체이닝**: 5432(Postgres)를 `fargate-sg`에서 오는 것만 허용. 앱만 DB에 붙을 수 있다. 운영자 노트북도, VPC 안 다른 서버도 못 붙는다(앱이 아니므로).
- 5432를 시작/끝 같은 값으로 단일 포트 지정.

**아웃바운드 (주석을 꼭 읽어야 함):**
```hcl
# No egress rules needed (the DB never initiates connections), but a default-deny egress would
# block RDS internals; leave egress open which is the AWS default behavior for clarity.
egress {  # protocol "-1", 0.0.0.0/0 }
```
- 주석 해석: DB는 **먼저 연결을 거는 쪽이 아니다**(요청을 받고 응답만 함). 그래서 이론상 egress 규칙이 필요 없다. 하지만 SG에서 egress를 **하나도 안 쓰면 AWS가 "전부 차단(default-deny)"으로 해석**해서 RDS 내부 동작(백업, 패치, 로그 전송 등 AWS가 관리하는 통신)이 막힐 수 있다. 그래서 **명시적으로 전체 개방을 적어 혼란을 없앴다**(주석 "for clarity").
- **중요한 사실 하나:** 새 SG의 egress 디폴트는 "전체 허용"이다. 그런데 Terraform으로 SG를 만들 때 egress 블록을 아예 안 쓰면 Terraform이 디폴트 규칙까지 지워버리는 동작이 있어(전부 차단이 됨), 이 코드는 그 함정을 피하려고 egress를 일부러 명시한 것이다.

**(c) 왜?** DB는 인프라에서 가장 보호해야 할 자산. "앱만 들어온다"로 인바운드를 극도로 좁히고, egress는 RDS가 깨지지 않게 안전하게 열어둔다.

**(d) 흔한 함정**
1. **egress를 비워두면 안전할 거란 오해.** 위에서 봤듯 Terraform에선 비우면 default-deny가 되어 RDS 내부가 막힌다. 주석이 바로 그 경고다.
2. **"DB를 인터넷에서 직접 접근하게 5432를 `0.0.0.0/0`으로 열기"** — 절대 금지. 실제 보안 사고의 단골. 이 파일은 정반대로 fargate-sg만 허용해 모범을 보인다.
3. **퍼블릭 서브넷 배치 착각.** SG로 막아도 DB가 퍼블릭 서브넷에 공인 IP로 떠 있으면 표면이 넓어진다. 보통 DB는 프라이빗 서브넷(`network.tf`)에 둔다 — SG는 한 겹일 뿐 망 분리와 함께 써야 한다.

> **옆 파일 연결:** `aws_security_group.rds.id`는 `rds.tf` 40번 줄(`vpc_security_group_ids = [aws_security_group.rds.id]`)에서 DB 인스턴스에 붙는다. (RDS는 인자 이름이 `security_groups`가 아니라 `vpc_security_group_ids`인 점도 알아두면 좋다 — 리소스마다 인자명이 다르다.)

---

### 전체를 한 문장으로

세 SG가 **요청 경로 순서대로 사슬**을 이루고, 각 층의 인바운드 출처를 **바로 앞 SG의 id**로 지정해(`security_groups = [...]`) "신분(IP가 아닌 SG 멤버십)"으로 검문한다. 그 결과 인터넷→ALB→앱→DB라는 단 하나의 합법 경로만 남고, 옆길은 전부 막힌다. 이것이 **defense in depth(다층 방어)**의 네트워크 버전이다.

---

### 면접 포인트

**Q1. Security Group이 stateful이라는 게 무슨 뜻이고, NACL과 뭐가 다른가?**
A. SG는 stateful이라 인바운드로 허용된 연결의 응답(return traffic)은 egress 규칙 없이도 자동 통과한다. 그래서 보통 인바운드만 신경 쓰면 된다. 반면 NACL(서브넷 단위, stateless)은 인바운드/아웃바운드를 모두 명시해야 하고 규칙에 순서(번호)와 명시적 deny가 있다.

**Q2. 인바운드 출처를 CIDR이 아니라 다른 SG로 지정하면 뭐가 좋은가?**
A. IP가 바뀌어도(오토스케일링·재배포로 Fargate 태스크 IP가 매번 달라짐) 규칙을 안 고쳐도 된다. "주소"가 아니라 "신원(해당 SG 소속인가)"으로 허용하므로, 같은 VPC 안 다른 머신이라도 그 SG에 속하지 않으면 차단된다. 이 파일에선 fargate-sg→rds-sg, alb-sg→fargate-sg 두 군데서 이 체이닝을 쓴다.

---

## 6. rds.tf

이 파일은 우리 서비스의 **데이터베이스(PostgreSQL)를 AWS가 대신 운영하는 형태(RDS)로 한 대 띄우는** 설계도다. 백엔드 개발자에게 가장 친숙한 주제(DB)지만, 클라우드에서는 "DB 서버를 어디에 두고, 누가 접근하게 하고, 비밀번호는 어떻게 다루고, 망가지면 어떻게 복구하나"가 전부 코드로 박혀 있다. 한 줄씩 풀어보자.

먼저 용어 정리부터.
- **RDS(Relational Database Service)** = AWS가 관리해주는 관계형 DB 서비스. 패치(보안 업데이트), 백업, 장애 시 자동 교체(failover)를 AWS가 대신 해준다. 파일 맨 위 주석(3~4행)이 정확히 이 말을 한다: "You pay for 'managed' so you don't babysit a database server"(관리비를 내는 대신 DB 서버를 직접 돌보지 않아도 된다). 우리가 EC2(가상 서버)에 직접 Postgres를 깔면 백업·패치·복구를 전부 손으로 해야 하는데, RDS는 그걸 떠넘기는 것.
- **Terraform(TF)** = 인프라를 코드로 선언하는 도구. 이 `.tf` 파일에 "이런 DB가 있었으면 좋겠다"고 쓰면 Terraform이 실제 AWS에 만들어준다.
- **resource 블록** = `resource "타입" "이름" { ... }` 형태. "타입"은 AWS 리소스 종류(예: `aws_db_instance`), "이름"은 Terraform 내부에서 부르는 별명. 다른 파일에서 `aws_db_instance.main.address`처럼 `타입.이름.속성`으로 참조한다.

---

### 블록 1 — `random_password "db"` (9~14행): 사람이 안 보는 비밀번호 생성

```hcl
resource "random_password" "db" {
  length  = 32
  special = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}
```

**(a) 뭘 만드나** — DB 마스터(관리자) 계정의 비밀번호를 **랜덤하게 생성**한다. 핵심은 주석(6~8행)에 있다: "generated here, never typed by a human"(여기서 생성되고, 사람이 절대 타이핑하지 않는다). 즉 개발자가 "p@ssw0rd123" 같은 걸 직접 정하지 않고, 32자짜리 무작위 문자열을 기계가 만든다.

**(b) 인자 한 줄씩**
- `length = 32` → 비밀번호 길이 32자. 길수록 무차별 대입(brute-force) 공격에 강하다.
- `special = true` → 특수문자(`!`, `#` 등)를 포함하라.
- `override_special = "..."` → 특수문자 후보를 **이 목록으로 제한**한다. 12행 주석 "RDS rejects a few characters in the master password"(RDS는 마스터 비밀번호에 일부 문자를 거부한다)가 이유다. 예를 들어 `/`, `@`, `"`, 공백 등은 RDS가 마스터 비밀번호에 못 쓰게 막아둔 문자라, 미리 빼고 안전한 것들만 후보로 준 것.

**(c) 왜 이렇게?** 사람이 비밀번호를 정하면 (1) 약하거나 (2) 깃 커밋·슬랙에 새거나 (3) 돌려쓰게 된다. 기계가 매번 32자 무작위로 만들고 → 뒤에서 Secrets Manager에 넣어 앱이 런타임에 꺼내 쓰면, **사람 눈에는 한 번도 안 보이는** 비밀번호가 된다.

**(d) 흔한 함정** — 6~8행 주석이 경고하듯, `random_password`의 결과는 **Terraform state 파일(상태 파일)에 평문으로 저장된다**. state란 Terraform이 "지금 실제로 뭐가 떠 있는지" 기록해두는 파일인데, 여기에 이 비밀번호가 그대로 들어간다. 그래서 "state는 비밀처럼 취급해야 한다"(state must be treated as secret)는 것 — state 파일을 깃에 올리거나 공개 S3에 두면 비밀번호가 통째로 유출된다. 반드시 암호화된 원격 백엔드(예: 잠긴 S3 버킷)에 둬야 한다.

**옆 파일 연결** — `random_password.db.result`(생성된 실제 값)는 두 군데서 쓰인다. ① 같은 파일 36행 `password = random_password.db.result`로 DB에 설정되고, ② `secrets.tf` 35행 `secret_string = random_password.db.result`로 Secrets Manager(비밀 저장소)에 올라가 앱이 읽는다. **즉 DB에 심는 값과 앱이 읽는 값이 같은 출처라 절대 어긋나지 않는다** — 이게 "사람이 안 만지는" 설계의 핵심 이점이다.

---

### 블록 2 — `aws_db_subnet_group "main"` (18~22행): DB를 어느 네트워크 칸에 둘지

```hcl
resource "aws_db_subnet_group" "main" {
  name       = "${var.project}-db-subnets"
  subnet_ids = aws_subnet.private[*].id
  tags       = { Name = "${var.project}-db-subnets" }
}
```

**(a) 뭘 만드나** — RDS에게 "너는 이 서브넷들 중에서 살 수 있어"라고 알려주는 **서브넷 그룹**이다.
- **서브넷(subnet)** = VPC(가상 사설 네트워크) 안을 잘게 나눈 IP 구역. 보통 "퍼블릭 서브넷"(인터넷과 통하는 칸)과 "프라이빗 서브넷"(인터넷에서 직접 못 닿는 칸)으로 나눈다.
- **AZ(Availability Zone, 가용 영역)** = 한 리전(예: 서울) 안의 물리적으로 분리된 데이터센터. 하나가 정전돼도 다른 AZ는 살아 있다.

**(b) 인자**
- `name` → 그룹 이름. `${var.project}`는 변수 치환(string interpolation)으로, 예컨대 프로젝트명이 `tubeshadow`면 `tubeshadow-db-subnets`가 된다.
- `subnet_ids = aws_subnet.private[*].id` → 핵심. `aws_subnet.private`는 `network.tf` 48행에서 여러 개 만든 프라이빗 서브넷이고, `[*].id`는 **그 전부의 id를 리스트로** 뽑는 splat 표현식(=배열 전체를 한 번에 가리키는 `[*]` 문법)이다. 즉 "프라이빗 서브넷 전부를 후보로 등록".

**(c) 왜?** 16~17행 주석 두 가지가 이유다.
1. "It must span >= 2 AZs even if the instance itself is single-AZ" — **서브넷 그룹은 최소 2개 AZ에 걸쳐야 한다**(인스턴스가 단일 AZ여도). 이건 AWS의 강제 규칙이다. 지금 당장 DB는 한 군데만 있어도, 나중에 Multi-AZ로 바꾸거나 장애 시 다른 AZ로 옮기려면 "옮겨갈 칸"이 미리 등록돼 있어야 하기 때문.
2. "We use the PRIVATE subnets so the DB has no path to the internet" — **프라이빗 서브넷을 써서 DB가 인터넷으로 나가는 길 자체를 없앤다.** DB가 인터넷에서 보이지 않으면 공격 표면이 통째로 사라진다.

**(d) 함정** — 프라이빗 서브넷을 한 AZ에서만 만들었다면 이 블록은 "2개 이상 AZ 필요" 에러로 실패한다. 그래서 `network.tf`에서 프라이빗 서브넷을 여러 AZ에 깔아둔 것. 초보가 자주 만나는 `DBSubnetGroupDoesNotCoverEnoughAZs` 에러가 이것.

---

### 블록 3 — `aws_db_instance "main"` (24~58행): 실제 DB 한 대

이게 파일의 본체다. 부분별로 끊어 보자.

#### 3-1. 엔진과 스펙 (25~31행)
```hcl
identifier     = "${var.project}-db"
engine         = "postgres"
engine_version = "16"
instance_class = var.db_instance_class
allocated_storage = var.db_allocated_storage
storage_type      = "gp3"
```
- `identifier` → AWS 콘솔에 보이는 이 DB의 고유 식별자(이름표).
- `engine = "postgres"` / `engine_version = "16"` → PostgreSQL 16을 쓴다. (MySQL, MariaDB 등 다른 엔진도 가능하지만 우리는 Postgres.)
- `instance_class = var.db_instance_class` → DB 서버의 **하드웨어 크기**(CPU/메모리). 변수로 빼서 환경마다 다르게(예: `db.t3.micro`는 작고 싸다) 줄 수 있다. **instance_class = 머신 등급(스펙)**.
- `allocated_storage` → 디스크 용량(GB). 이것도 변수.
- `storage_type = "gp3"` → 디스크 종류. **gp3 = 범용 SSD 최신 세대**로, 같은 돈에 gp2보다 기본 성능이 좋다.

**왜 변수(`var....`)로?** 크기·용량은 dev/prod마다 바뀌니까 코드를 안 고치고 변수값만 바꾸려고. 변수 정의는 `variables.tf` 49·55행에 있다.

#### 3-2. 암호화 (32행)
```hcl
storage_encrypted = true # encryption at rest, free, always on
```
- **encryption at rest(저장 데이터 암호화)** = 디스크에 쓰인 데이터를 암호화. 누가 물리 디스크를 빼가도 못 읽는다.
- 주석대로 "free, always on" — **공짜이고 성능 손해도 거의 없으니 그냥 항상 켜라.** 끄는 게 오히려 이상한 선택.
- **함정**: 암호화는 **생성 시점에만** 켤 수 있다. 평문으로 만든 DB를 나중에 "암호화 켜기" 토글로 바꿀 수 없고, 스냅샷 복사로 새 DB를 만들어야 한다. 그래서 처음부터 `true`.

#### 3-3. 접속 정보 (34~37행)
```hcl
db_name  = var.db_name
username = var.db_username
password = random_password.db.result
port     = 5432
```
- `db_name` → 처음 만들어둘 데이터베이스(스키마) 이름.
- `username` → 마스터 계정 이름.
- `password = random_password.db.result` → **블록 1에서 만든 랜덤 비번을 여기 꽂는다.** 사람이 안 보는 그 값.
- `port = 5432` → Postgres 표준 포트(=서비스가 듣는 문 번호). 뒤의 보안 그룹도 이 번호를 연다.

**옆 파일 연결** — `username`은 `ecs.tf` 26행에서 `DATABASE_USERNAME` 환경변수로 앱 컨테이너에 전달되고, 접속 URL은 `secrets.tf` 18행에서 `jdbc:postgresql://${aws_db_instance.main.address}:${...port}/${var.db_name}` 형태로 조립된다. **즉 여기 정의가 앱의 DB 접속 문자열의 원천이다.**

#### 3-4. 네트워크/보안 — 가장 중요한 4줄 (39~42행)
```hcl
db_subnet_group_name   = aws_db_subnet_group.main.name
vpc_security_group_ids = [aws_security_group.rds.id]
publicly_accessible    = false # NEVER expose a database to the internet
multi_az               = false # single-AZ for cost; flip to true for production HA (~2x cost)
```
- `db_subnet_group_name` → 블록 2에서 만든 서브넷 그룹을 연결. "이 DB는 그 프라이빗 칸들 안에 살아라."
- `vpc_security_group_ids = [aws_security_group.rds.id]` → **방화벽(보안 그룹) 연결.** **보안 그룹(Security Group)** = 인스턴스 단위 방화벽 규칙. 이건 `security.tf` 71행의 `rds` 보안 그룹을 가리키는데, 그 규칙(76~82행)을 보면 "5432 포트는 **오직 Fargate 앱 태스크의 보안 그룹**에서 오는 트래픽만 허용"으로 잠가뒀다. 즉 IP 대역이 아니라 "앱만" 들어오게 한 것 — 가장 단단한 패턴.
- `publicly_accessible = false` → **퍼블릭 IP를 안 준다.** 주석 "NEVER expose a database to the internet"가 전부다. DB는 인터넷에서 직접 접근 불가.
- `multi_az = false` → **Multi-AZ 비활성.**
  - **Multi-AZ** = 다른 AZ에 똑같은 대기(standby) DB를 하나 더 두고, 주 DB가 죽으면 자동으로 그쪽으로 넘기는 고가용성(HA, High Availability) 구성.
  - 여기선 `false`. 주석대로 "single-AZ for cost"(비용 때문에 단일 AZ), "flip to true for production HA (~2x cost)"(운영 환경 HA가 필요하면 true로, 대신 비용 약 2배). 대기 DB를 한 대 더 돌리니 돈이 두 배인 게 당연.

**(d) 함정 모음**
- `publicly_accessible = false`인데 로컬 노트북에서 직접 `psql`로 붙으려 하면 안 된다 — 프라이빗이라 못 닿는다. 접근하려면 bastion(중계 서버)이나 SSM 터널이 필요. "왜 접속이 안 되지?"의 90%가 이거.
- `multi_az = false`는 **백업과 다른 개념**이다. Multi-AZ는 "자동 장애 복구(다운타임 최소화)", 백업은 "데이터 시점 복원". 둘은 별개이고 아래 백업 설정이 따로 있다.

#### 3-5. 백업/유지보수 (44~46행)
```hcl
backup_retention_period = 7 # daily automated backups kept 7 days
backup_window           = "08:00-09:00"
maintenance_window      = "Mon:09:00-Mon:10:00"
```
- `backup_retention_period = 7` → 자동 일일 백업을 **7일** 보관. 0으로 두면 자동 백업이 꺼진다(=PITR 불가).
  - 이 값이 1 이상이어야 **PITR(Point-In-Time Recovery, 특정 시점 복구)** 가 켜진다 — "어제 오후 3시 17분 상태로 돌려줘"가 가능해진다.
- `backup_window = "08:00-09:00"` → 백업을 돌릴 시간대(UTC). **UTC라 한국시간 +9시간**(=한국 17~18시)이라는 점에 주의.
- `maintenance_window` → AWS가 패치 등 유지보수를 하는 시간대. 트래픽 적은 시간으로 잡는 게 정석.

**함정**: 시간이 전부 **UTC**다. "왜 새벽도 아닌 낮에 백업 부하가 뜨지?"는 보통 UTC를 로컬로 착각한 것. 또 backup_window와 maintenance_window가 겹치면 안 된다.

#### 3-6. 학습용 teardown 설정 (48~52행) — 여기를 가장 주의해서 읽어라
```hcl
deletion_protection = false
skip_final_snapshot = true
```
- `deletion_protection = false` → **삭제 방지 끔.**
  - **deletion_protection** = true면 `terraform destroy`나 콘솔에서 **DB를 지우려 해도 막아주는** 안전장치. "실수로 운영 DB를 지웠다"를 원천 차단.
- `skip_final_snapshot = true` → DB를 지울 때 **마지막 스냅샷(백업)을 안 만들고** 바로 삭제.
  - **final snapshot** = 삭제 직전에 자동으로 찍는 백업. true면 이걸 건너뛴다 → 지우면 데이터가 정말 영영 사라진다.

**(c) 왜 이렇게?** 48~50행 주석이 솔직하게 말한다: "Teardown ergonomics (so you can `terraform destroy` cleanly while learning)". 즉 **학습용**이라 "띄우고 → 공부하고 → 깔끔히 지워서 과금 멈추기"(spin up, study, tear down to stop billing)에 최적화했다. 운영이면 정반대로 두라고 명시: "set these the other way: deletion_protection = true, skip_final_snapshot = false".

**(d) 함정 — 면접·실무에서 제일 자주 데는 곳** — 이 두 값을 **운영 환경에 그대로 복붙하면 재앙**이다. `destroy` 한 번에 운영 DB가 백업도 없이 증발한다. 학습용 디폴트와 운영 디폴트가 정반대라는 걸 반드시 기억할 것.

#### 3-7. 로그 (54~55행)
```hcl
enabled_cloudwatch_logs_exports = ["postgresql"]
```
- Postgres 로그(느린 쿼리, 에러)를 **CloudWatch(=AWS 모니터링/로그 수집 서비스)** 로 내보낸다.
- 주석대로 "cheap, very useful when something misbehaves" — 싸고, 문제 생겼을 때 원인 추적에 매우 유용. DB가 느리거나 에러 날 때 들여다볼 첫 번째 장소.

---

### 옆 파일과의 연결 요약 (이 DB가 생태계에서 어떻게 쓰이나)
- **앞단**: `network.tf`(프라이빗 서브넷) → 블록 2가 참조 → 블록 3이 그 위에 DB를 올림.
- **보안**: `security.tf`의 `rds` 보안 그룹 → 블록 3이 참조 → "앱 태스크만 5432로 접속" 강제.
- **비밀**: 블록 1 비번 → `secrets.tf`(Secrets Manager)로 흘러가 앱이 읽음. 접속 URL도 `secrets.tf` 18행에서 `aws_db_instance.main.address`(=DB 엔드포인트 호스트명)로 조립.
- **앱**: `ecs.tf`가 username 등 환경변수를 컨테이너에 주입.
- **출력**: `outputs.tf` 27행이 `aws_db_instance.main.address`를 외부로 노출(접속 확인용).

---

### 면접 포인트
1. **"RDS Multi-AZ와 Read Replica(읽기 복제본)의 차이는?"**
   답: Multi-AZ는 **고가용성용** 동기 대기본으로, 평소엔 트래픽을 안 받고 장애 시 자동 승격되는 "보험"이다(읽기 성능 향상 X). Read Replica는 **읽기 부하 분산용** 비동기 복제본으로 읽기 쿼리를 받을 수 있지만 자동 failover 보장은 아니다. 이 파일은 `multi_az = false`라 둘 다 아님(단일 인스턴스).
2. **"`skip_final_snapshot = true`와 `deletion_protection = false`가 운영에서 위험한 이유는?"**
   답: 전자는 삭제 시 마지막 백업을 건너뛰어 데이터가 영구 소실되고, 후자는 그 삭제 자체를 막아줄 안전장치를 꺼버린다. 둘이 겹치면 `terraform destroy` 한 줄로 운영 DB가 복구 불가능하게 사라진다 — 운영에선 각각 false/true로 뒤집어야 한다(파일 50행 주석이 명시).

---

## 7. s3.tf

이 파일은 **사용자가 녹음한 오디오 파일을 저장하는 비공개 버킷 하나**를 만든다. 단 하나의 버킷이지만, 그 버킷을 "안전하게" 만들기 위한 부속 설정이 4개 더 붙어 있다. 백엔드 개발자 비유로 말하면, S3 버킷 하나가 곧 "파일 저장용 디스크/폴더"이고, 나머지 리소스들은 그 폴더에 거는 권한·암호화·백업 정책이다.

먼저 용어부터 깔고 가자.

- **S3(=Simple Storage Service)**: AWS의 객체 저장소(object storage). 파일 시스템처럼 "디렉터리"가 진짜 있는 게 아니라, **버킷(bucket)이라는 큰 통** 안에 **객체(object = 파일 1개 + 메타데이터)**를 키(key, 사실상 파일 경로 문자열)로 넣고 빼는 구조다. `recordings/user123/clip.webm` 같은 키는 "폴더처럼 보이는 문자열"일 뿐 실제 폴더가 아니다.
- **at rest(=저장된 상태)**: 디스크에 가만히 누워 있는 데이터. 반대말은 in transit(=전송 중, 네트워크를 타는 데이터).
- **IAM(=Identity and Access Management)**: AWS의 권한 시스템. "누가 무엇을 할 수 있는가"를 정의한다.

---

### 파일 상단 주석 (1~4행)

```hcl
# s3.tf — the private bucket that stores user audio recordings.
# The app writes/reads recordings here via its IAM task role (see iam.tf) — never via public URLs.
# Bucket names are GLOBALLY unique across all of AWS, so we suffix with the account ID.
```

세 줄짜리지만 설계 의도가 다 들어 있다.
1. 이 버킷은 **private(비공개)**다 — 인터넷에서 직접 못 본다.
2. 앱은 이 버킷에 **public URL이 아니라 IAM task role을 통해** 접근한다. 즉 "주소만 알면 누구나 받는 공개 파일 링크" 방식이 절대 아니고, 앱 컨테이너가 자신의 권한(역할)으로 인증해서 읽고 쓴다. 이 역할이 바로 옆 파일 `iam.tf`에 정의돼 있다 (확인함: `iam.tf` 7행 "TASK role ... read/write the S3 recordings bucket").
3. **버킷 이름은 AWS 전체에서 전역적으로 유일**해야 한다. 이게 초보자가 가장 자주 데이는 함정이다. RDS 인스턴스 이름이나 EC2 이름은 "내 계정 안에서만" 유일하면 되지만, S3 버킷 이름은 **지구상의 모든 AWS 계정을 통틀어** 유일해야 한다(S3 주소가 글로벌 네임스페이스라서). 그래서 뒤에 account ID를 붙여 충돌을 회피한다.

---

### resource 1 — `aws_s3_bucket.recordings` (6~9행): 버킷 자체

```hcl
resource "aws_s3_bucket" "recordings" {
  bucket = "${var.project}-recordings-${data.aws_caller_identity.current.account_id}"
  tags   = { Name = "${var.project}-recordings" }
}
```

**(a) 뭘 만드나**: 실제 저장 통, 즉 S3 버킷 하나. 이 리소스만 있으면 파일을 넣을 수 있는 통은 생긴다(보안 설정은 아직 디폴트 상태).

**(b) 인자 한 줄씩**:
- `bucket = "${var.project}-recordings-${...account_id}"` — 버킷의 실제 이름. `${...}`는 Terraform의 **문자열 보간(interpolation, =변수 값을 문자열 안에 끼워 넣기)** 문법이다.
  - `var.project`: `variables.tf`에 정의된 프로젝트 이름 변수(확인함: `variables.tf` 5행 `variable "project"`). 예를 들어 `tubeshadow`라면 결과는 `tubeshadow-recordings-123456789012`처럼 된다.
  - `data.aws_caller_identity.current.account_id`: **data source(=AWS에 "지금 누구냐"고 물어서 받아오는 읽기 전용 조회)**. `providers.tf` 22행에 `data "aws_caller_identity" "current" {}`로 선언돼 있다(확인함). `.account_id`는 현재 자격증명의 12자리 AWS 계정 번호다. 이걸 붙여서 전역 유일성을 확보한다.
- `tags = { Name = "..." }` — **태그(tag, =리소스에 붙이는 key-value 라벨)**. 비용 추적·검색·필터링용 메모지라고 보면 된다. 동작에는 영향이 없지만, 콘솔에서 리소스 수십 개 중 이걸 알아보게 해준다.

**(c) 왜 이렇게**: account ID 접미사는 위에서 말한 전역 유일성 때문. 변수로 이름을 조립하는 건 dev/staging/prod 환경마다 `var.project` 값만 바꿔 같은 코드를 재사용하기 위함이다(하드코딩 회피).

**(d) 함정/오해**:
- 버킷 이름 규칙이 까다롭다 — 소문자/숫자/하이픈만, 3~63자, **대문자·언더스코어(`_`) 불가**. `var.project`에 대문자가 들어 있으면 apply가 실패한다.
- "이 리소스 하나만 만들면 비공개겠지?"라는 오해 — **아니다**. 최신 AWS는 신규 버킷에 public access block을 기본으로 켜주지만, 보안을 코드로 명시(explicit)하지 않으면 신뢰할 수 없다. 그래서 아래 리소스 2가 따로 존재한다.
- 한 가지 더: 예전엔 `aws_s3_bucket` 하나에 acl·versioning·encryption을 다 때려넣었지만, AWS provider v4부터 **전부 별도 리소스로 분리**됐다. 그래서 이 파일이 리소스 5개로 쪼개진 것이다(낡은 튜토리얼과 다르게 보이는 이유).

---

### resource 2 — `aws_s3_bucket_public_access_block.recordings` (13~19행): 공개 차단

```hcl
resource "aws_s3_bucket_public_access_block" "recordings" {
  bucket                  = aws_s3_bucket.recordings.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
```

**(a) 뭘 만드나**: 버킷의 "공개 접근 완전 차단" 스위치 묶음. 네 개의 독립 스위치를 전부 켠다.

**(b) 인자 한 줄씩** (먼저 **ACL(=Access Control List, 객체/버킷별 옛날식 권한 목록)**과 **bucket policy(=버킷 전체에 거는 JSON 권한 규칙)**라는 두 가지 공개 통로가 있다는 걸 알아야 한다):
- `bucket = aws_s3_bucket.recordings.id` — 어느 버킷에 적용할지. `aws_s3_bucket.recordings.id`는 리소스 1을 **참조(reference)**한 것. 이 참조 덕분에 Terraform이 "버킷부터 만들고 그 다음에 이 차단 설정을 건다"는 **의존성 순서(dependency graph)**를 자동으로 안다. 문자열로 이름을 다시 적지 않는 이유다.
- `block_public_acls = true` — 앞으로 들어오는 **공개 ACL 설정 요청을 차단**(새로 공개로 만들려는 시도 막기).
- `block_public_policy = true` — 버킷을 공개로 만드는 **공개 bucket policy 적용을 차단**.
- `ignore_public_acls = true` — 이미 붙어 있는 **공개 ACL을 무시**(=효력 없게).
- `restrict_public_buckets = true` — 공개 정책이 어쩌다 걸려 있어도 **인증된 요청만 허용**(공개 노출의 최후 방어선).

**(c) 왜 이렇게**: 녹음 파일은 개인 음성 데이터다. "주소만 알면 누구나 들을 수 있는 상태"는 곧 데이터 유출 사고다. 그래서 **새로 공개로 만드는 것(block 계열)과 이미 공개인 것(ignore/restrict 계열)을 둘 다** 막는다. 4개가 짝을 이루는 이유: block 2개는 "미래의 공개 시도", ignore/restrict 2개는 "현재의 공개 상태"를 각각 커버한다.

**(d) 함정/오해**: 뉴스에 나오는 "S3 데이터 유출" 사고의 거의 전부가 이 네 스위치를 안 켜서 생긴다. 4개 중 하나라도 빼면 구멍이 남을 수 있으니 보통 **all true가 정석**이다. 또 흔한 착각 — 이걸 켜면 내 앱도 못 읽는 거 아니냐? 아니다. 공개(인증 없는 익명) 접근만 막는다. `iam.tf`의 task role처럼 **인증된 IAM 주체**의 접근은 정상 동작한다.

---

### resource 3 — `aws_s3_bucket_server_side_encryption_configuration.recordings` (22~29행): 저장 시 암호화

```hcl
resource "aws_s3_bucket_server_side_encryption_configuration" "recordings" {
  bucket = aws_s3_bucket.recordings.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}
```

**(a) 뭘 만드나**: 버킷에 올라오는 모든 객체를 **자동으로 암호화해서 저장**하는 정책.

**(b) 인자/블록 한 줄씩**:
- `bucket = ...recordings.id` — 대상 버킷(리소스 1 참조).
- `rule { ... }` — 암호화 규칙 블록.
- `apply_server_side_encryption_by_default { ... }` — "기본으로 서버 측 암호화를 적용"이라는 뜻. **SSE(=Server-Side Encryption, 서버 측 암호화 = S3가 디스크에 쓰기 직전 암호화하고, 읽을 때 복호화)**. 앱 코드는 평문처럼 다루면 되고 암복호화는 S3가 알아서 한다.
- `sse_algorithm = "AES256"` — 암호화 방식. **AES-256(=대칭키 256비트 암호화)**, AWS 용어로는 **SSE-S3**. 키를 AWS가 관리하고 **추가 비용이 없다**(주석의 "free").

**(c) 왜 이렇게**: at rest 암호화는 사실상 모든 컴플라이언스 체크리스트의 기본 항목이다. 디스크가 물리적으로 탈취되거나 백업이 새도 내용이 평문이 아니게 한다. `AES256`(SSE-S3)을 고른 이유는 **무료 + 키 관리 부담 0**이라서다. 더 강한 통제가 필요하면 **SSE-KMS(=KMS 키로 암호화, 누가 언제 복호화했는지 감사 로그가 남지만 KMS 호출 비용 발생)**로 올릴 수 있는데, 이 프로젝트는 개인 학습 도구라 거기까지 갈 필요가 없다는 판단이다.

**(d) 함정/오해**: "암호화 켰으니 전송 구간도 안전"이라는 오해 — 아니다. 이건 **at rest(저장)만** 다룬다. in transit(전송) 보안은 HTTPS/TLS의 몫이고 별개다. 또 최근 S3는 기본적으로 SSE-S3를 자동 적용하지만, 코드로 명시해 두면 의도가 드러나고 설정이 바뀌어도 보장된다.

---

### resource 4 — `aws_s3_bucket_versioning.recordings` (32~37행): 버전 관리

```hcl
resource "aws_s3_bucket_versioning" "recordings" {
  bucket = aws_s3_bucket.recordings.id
  versioning_configuration {
    status = "Enabled"
  }
}
```

**(a) 뭘 만드나**: 버킷의 **버전 관리(versioning)** 활성화. 같은 키에 파일을 다시 쓰거나 지워도 **예전 버전이 사라지지 않고 보관**된다.

**(b) 인자**:
- `bucket = ...recordings.id` — 대상 버킷.
- `versioning_configuration { status = "Enabled" }` — 상태를 켬. 값은 `Enabled`(켜짐) / `Suspended`(일시중지) / 미설정(꺼짐) 셋 중 하나다.

**(c) 왜 이렇게**: 주석 그대로 **싸구려 보험("cheap insurance")**이다. 같은 키로 덮어쓰면 옛 버전은 "noncurrent version(=현재가 아닌 과거 버전)"으로 밀려나 살아 있고, 삭제하면 실제 데이터 대신 **delete marker(삭제 표식)**만 얹혀서 복구가 가능하다. 실수로 사용자 녹음을 날려도 되돌릴 수 있다.

**(d) 함정/오해**:
- 한 번 Enabled 한 버킷은 **완전히 끌 수 없고 Suspended까지만** 된다(과거 버전은 남는다). 비가역에 가깝다는 점을 알아둘 것.
- **돈 함정**: 버전마다 따로 과금된다. 매일 덮어쓰는 워크로드에서 버저닝을 켜고 방치하면 과거 버전이 무한정 쌓여 스토리지 비용이 눈덩이처럼 분다. **그래서 반드시 리소스 5의 lifecycle과 짝으로 가야 한다.** 버저닝만 켜고 정리 정책이 없으면 비용 폭탄이다.

---

### resource 5 — `aws_s3_bucket_lifecycle_configuration.recordings` (40~50행): 수명 주기 정책

```hcl
resource "aws_s3_bucket_lifecycle_configuration" "recordings" {
  bucket = aws_s3_bucket.recordings.id
  rule {
    id     = "expire-noncurrent"
    status = "Enabled"
    filter {} # apply to the whole bucket
    noncurrent_version_expiration {
      noncurrent_days = 30
    }
  }
}
```

**(a) 뭘 만드나**: **lifecycle(수명 주기) 규칙** — S3가 객체를 시간 경과에 따라 자동으로 정리(만료/삭제)하게 하는 정책. 리소스 4가 만들어내는 과거 버전 누적 문제를 자동 청소로 막는다.

**(b) 인자/블록 한 줄씩**:
- `bucket = ...recordings.id` — 대상 버킷.
- `rule { ... }` — 규칙 하나.
- `id = "expire-noncurrent"` — 규칙의 이름표(사람이 알아보기 위한 식별자, 아무 문자열).
- `status = "Enabled"` — 이 규칙 켬.
- `filter {}` — **어떤 객체에 적용할지 거르는 필터인데, 비어 있다**(`{}`). 주석대로 "버킷 전체에 적용"한다는 뜻이다. 예컨대 `filter { prefix = "temp/" }`라고 쓰면 `temp/`로 시작하는 키에만 적용되지만, 여기선 전체가 대상이다. (참고: lifecycle 규칙에 `filter`는 빈 것이라도 명시하는 게 안전한 관례다.)
- `noncurrent_version_expiration { noncurrent_days = 30 }` — **noncurrent version(=현재가 아닌, 덮어써져서 밀려난 과거 버전)을 noncurrent 상태가 된 지 30일 뒤 영구 삭제**. 핵심: **현재 버전(current version)은 절대 건드리지 않는다.** 사라지는 건 오직 옛 버전뿐이다.

**(c) 왜 이렇게**: 리소스 4(버저닝)는 안전망을 주지만 과거 버전이 영원히 쌓이면 비용이 샌다. 그래서 "**되돌릴 수 있는 유예 기간 30일**"이라는 합리적 절충을 둔다. 30일이면 실수를 알아차리고 복구하기 충분하고, 그 뒤엔 자동 삭제로 비용을 통제한다. 버저닝과 lifecycle은 **세트로 설계된 한 쌍**이다 — 하나는 안전, 하나는 비용 통제.

**(d) 함정/오해**:
- `noncurrent_version_expiration`(과거 버전 만료)과 `expiration`(현재 버전까지 만료)을 헷갈리면 큰일 난다. 후자를 잘못 쓰면 **살아있는 사용자 녹음이 30일 만에 통째로 삭제**된다. 이 코드는 `noncurrent_`라서 현재 파일은 안전하다.
- lifecycle 동작은 **즉각적이지 않다**. S3가 하루 한 번 비동기로 도는 배치라 "정확히 30일 0시 0분"이 아니라 그 이후 몇 시간 내에 처리된다. 테스트할 때 "왜 안 지워지지?" 하고 당황하지 말 것.

---

### 옆 파일과의 연결 (한 줄씩)

- **`iam.tf`**: 이 버킷의 ARN을 task role 정책이 참조한다 — 확인함: `iam.tf` 76행 `resources = ["${aws_s3_bucket.recordings.arn}/*"]`(객체 단위 read/write/delete)와 81행 `resources = [aws_s3_bucket.recordings.arn]`(버킷 단위 list). 즉 **공개를 다 막은 대신, 앱은 오직 이 IAM 역할로만** 이 버킷에 접근한다. s3.tf가 "문을 잠그고", iam.tf가 "내 앱에게만 열쇠를 준다." (**ARN(=Amazon Resource Name)**: AWS 리소스의 전역 고유 주소. `arn:aws:s3:::버킷이름` 형태.)
- **`providers.tf`**: `data.aws_caller_identity.current`(22행)가 여기 버킷 이름의 account ID 접미사를 공급한다.
- **`variables.tf`**: `var.project`(5행)가 버킷 이름과 태그의 접두사를 공급한다 — 환경별 재사용의 근거.
- **`outputs.tf`**: 같은 account ID를 GitHub Actions 시크릿 설정 안내(58행)에 재사용한다 — 같은 data source가 인프라와 CI 양쪽에 쓰인다.

---

### 면접 포인트

1. **"S3 버킷을 비공개로 만드는 데 public access block 4개 외에 왜 IAM도 필요한가?"**
   → public access block은 **익명(인증 없는) 공개 접근만** 차단할 뿐, "누가 접근할 수 있는가"는 정의하지 않는다. 실제 read/write 권한 부여는 IAM 정책(또는 bucket policy)의 몫이다. 이 둘은 보완 관계다 — block은 공개 유출을 막고, IAM은 정당한 접근자(앱의 task role)에게만 열쇠를 준다.

2. **"버저닝을 켰다. 비용 측면에서 반드시 같이 해야 할 것은?"**
   → lifecycle 규칙으로 **noncurrent version expiration**을 걸어 과거 버전을 일정 기간(여기선 30일) 뒤 자동 삭제해야 한다. 버저닝만 켜면 덮어쓸 때마다 옛 버전이 무한 누적돼 스토리지 비용이 계속 증가하기 때문이다. 안전망(versioning)과 비용 통제(lifecycle)는 한 세트로 설계한다.

3. (보너스) **"S3 버킷 이름은 왜 account ID를 붙이나?"**
   → S3 버킷 이름은 내 계정이 아니라 **전 세계 AWS를 통틀어 전역 유일**해야 하기 때문. account ID 접미사로 충돌을 사실상 0으로 만든다.

---

## 8. secrets.tf

이 파일은 **앱이 시작할 때 읽어야 하는 비밀값들**(DB 비밀번호, JWT 서명키, 외부 API 키 등)을 AWS **Secrets Manager**에 등록하는 파일이다. Secrets Manager(=AWS의 "비밀 금고" 서비스. 값을 암호화해서 저장하고, 권한 있는 주체만 ARN으로 꺼내 읽게 해줌)에 비밀을 넣어두고, 컨테이너가 뜰 때 ECS가 그 값을 주입한다.

### 0. 맨 위 주석 — 왜 Secrets Manager인가 (가장 중요한 설계 결정)

파일 1~8행 주석이 이 파일의 존재 이유 전체를 설명한다. 핵심 논리:

> "the task definition is visible to anyone with read access to ECS, and it ends up in TF state / git history."

번역하면 — **task definition**(=ECS에서 "이 컨테이너를 이런 이미지/환경변수/리소스로 띄워라"라고 적은 명세서. 도커 컴포즈의 YAML 한 칸이라고 보면 됨)에 비밀번호를 평문 환경변수로 그냥 박으면 두 군데로 샌다:
1. ECS 읽기 권한 있는 사람이면 콘솔에서 그대로 봄.
2. **TF state**(=Terraform이 "지금 실제 클라우드가 어떤 상태인지" 기록해두는 파일. 여기에 적용한 값이 평문으로 들어감) 와 git 히스토리에 박제됨.

그래서 패턴을 분리한다: **값(value)** 은 Secrets Manager에만 두고, task definition에는 **ARN**(=Amazon Resource Name. AWS 모든 자원의 전세계 유일 주소. `arn:aws:secretsmanager:...:secret:shadow-ai/jwt-secret` 같은 문자열)만 적는다. 그러면 ECS가 컨테이너 띄우는 순간 ARN을 따라가 실제 값을 컨테이너 안으로 넣어준다. 명세서에는 "주소"만 있고 "내용물"은 없는 셈.

> 함정: "Secrets Manager에 넣으면 TF state에서도 안전하다"는 **반만 맞다**. 아래에서 보겠지만 `secret_string`에 들어가는 값(예: `random_password`, `var.gemini_api_key`)은 **여전히 TF state에 평문으로 저장된다.** Secrets Manager가 막아주는 건 "task definition 노출" 경로지, state 파일 자체가 아니다. 그래서 state 파일(S3 backend + 암호화 + 접근통제)을 별도로 보호하는 게 전제다.

8행: **"Each secret here is two resources: the secret (a named container) + a version (the actual value)."** — 이 파일을 관통하는 핵심 개념. 아래서 자세히.

### 1. `random_password "jwt"` — 사람이 절대 안 보는 비밀 생성

```hcl
resource "random_password" "jwt" {
  length  = 64
  special = false
}
```

(a) **무엇**: `random_password`(=Terraform `random` 프로바이더가 제공하는 리소스. apply 시점에 무작위 문자열을 한 번 생성해 state에 저장하고, 이후엔 그 값을 고정으로 유지)로 64자 랜덤 문자열을 만든다. JWT(=JSON Web Token. 로그인 후 사용자에게 발급하는 서명된 토큰) 서명키로 쓴다.

(b) 인자:
- `length = 64` — 64글자. HS256(=HMAC-SHA256. 대칭키 서명 알고리즘. 키 하나로 서명/검증 둘 다 함)에는 차고 넘침(주석 그대로 "64 chars is plenty").
- `special = false` — 특수문자 제외, **영숫자만**. 주석 이유: "safe in any header/env context" — 키가 HTTP 헤더나 환경변수로 떠돌 때 `$`, `"`, `\` 같은 게 끼면 셸/파싱에서 깨질 수 있으니 회피.

(c) **왜**: 사람이 손으로 비밀번호를 정하면 약하고, 깃에 커밋될 위험도 있다. 코드로 생성하면 "아무도 본 적 없는 64자"가 보장된다(주석: "Generated, never seen by a human").

(d) 함정: `random_password`의 결과도 **state에 평문 저장**된다. 그리고 한 번 만들면 state에 박혀 고정되는데, 이 리소스를 destroy/재생성하면 **JWT 키가 바뀌어 기존 발급 토큰이 전부 무효**가 된다(사용자 전원 로그아웃). 운영 중엔 함부로 건드리면 안 되는 리소스다.

> DB 비밀번호용 `random_password "db"`는 여기 없고 옆 파일 `rds.tf:9`에 있다(확인함). 이 파일은 그걸 `random_password.db.result`로 끌어다 쓴다(35행).

### 2. `locals { database_url }` — 값 조립 블록

```hcl
locals {
  database_url = "jdbc:postgresql://${aws_db_instance.main.address}:${aws_db_instance.main.port}/${var.db_name}"
}
```

(a) **무엇**: `locals`(=로컬 값. 그 모듈 안에서만 쓰는 이름 붙인 계산식. 변수와 달리 외부 입력이 아니라 "파생값"을 담는 용도)로 JDBC URL(=Java가 DB에 접속할 때 쓰는 연결 문자열. `jdbc:postgresql://호스트:포트/DB이름` 형식) 하나를 조립한다.

(b) 구성요소(보간 `${}` 안):
- `aws_db_instance.main.address` — RDS(=AWS 관리형 관계형 DB 서비스) 인스턴스의 **실제 호스트네임**. RDS를 만들기 전엔 이 주소를 모르기 때문에 하드코딩 못 함 → Terraform이 RDS 생성 후 채워줌.
- `aws_db_instance.main.port` — DB 포트(보통 5432).
- `var.db_name` — DB 이름. `variables.tf:37`에 정의된 입력 변수.

(c) **왜 locals로 뺐나**: RDS 주소는 apply 전엔 알 수 없는 동적 값이라 직접 못 적는다. 또 이 URL을 여러 곳에서 쓸 수 있으니 한 군데서 조립해두면 재사용·수정이 쉽다. 비유하면 "주소를 매번 손으로 쓰지 말고 변수 하나에 합쳐두기".

(d) 함정: `${...}` 보간(=문자열 안에 `${표현식}`을 넣어 값으로 치환하는 문법)을 빠뜨리고 그냥 `aws_db_instance.main.address`라고 쓰면 리터럴 문자열이 돼버린다. 반드시 따옴표 문자열 안에서 `${}`로 감싸야 한다.

### 3. 필수 비밀들 — "secret + version" 2종 세트 패턴 (22~52행)

여기가 이 파일의 핵심 패턴이다. 비밀 하나마다 **항상 리소스 두 개**가 짝으로 나온다. `database_url`을 예로:

```hcl
resource "aws_secretsmanager_secret" "database_url" {
  name = "${var.project}/database-url"
}
resource "aws_secretsmanager_secret_version" "database_url" {
  secret_id     = aws_secretsmanager_secret.database_url.id
  secret_string = local.database_url
}
```

**왜 두 개로 나누나? (secret vs version)**
- `aws_secretsmanager_secret` = **금고 칸 자체**. 이름표(`name`)만 가진 빈 컨테이너. 값은 없음.
- `aws_secretsmanager_secret_version` = **그 칸에 넣는 실제 종이쪽지(값)**. `secret_string`이 진짜 내용.

이렇게 분리한 이유: Secrets Manager는 같은 칸(secret) 안에서 값을 **버전 관리**한다. 비밀번호를 바꾸면(rotation, =주기적으로 키를 갈아끼우는 것) 새 version이 쌓이고 옛 version은 보존된다. 금고 칸(이름·ARN)은 그대로 두고 내용물만 갱신할 수 있게 구조가 갈린 것. 비유: "사서함(번호 고정) vs 그 안에 든 편지(매번 새것)".

인자별:
- `name = "${var.project}/database-url"` — 비밀의 이름. `var.project`(예: `shadow-ai`)를 접두사로 붙여 `shadow-ai/database-url`처럼 만든다. 슬래시는 단지 네이밍 컨벤션(폴더처럼 그룹핑해 보이게)일 뿐 실제 디렉터리는 아님. **왜**: 프로젝트별로 비밀 이름이 안 겹치게 네임스페이스를 줌.
- `secret_id = aws_secretsmanager_secret.database_url.id` — "이 version을 어느 칸에 넣을지" 가리키는 참조. version이 secret을 가리키므로 **secret이 먼저 생성**돼야 한다(Terraform이 이 참조를 보고 의존 순서를 자동 계산함 — 명시적 `depends_on` 불필요).
- `secret_string = local.database_url` — 실제 값. 위에서 조립한 locals.

나머지 셋도 똑같은 패턴, 값만 다름:
- `database_password` → `secret_string = random_password.db.result` (rds.tf가 만든 DB 비번)
- `jwt_secret` → `secret_string = random_password.jwt.result` (1번에서 만든 JWT 키)
- `gemini_api_key` → `secret_string = var.gemini_api_key` (사용자가 tfvars로 넣는 외부 API 키)

(d) 함정 모음:
- **version 없이 secret만 만들면** 금고 칸은 생기는데 값이 비어, ECS가 읽을 때 에러. 항상 짝으로.
- `secret_string`에 직접 변수 보간을 넣으면 그 값이 state에 평문으로 남는다(앞서 말한 한계).
- 같은 `name`의 secret을 삭제 후 즉시 같은 이름으로 재생성하면 충돌난다. Secrets Manager는 삭제 시 기본 **복구 대기 기간(7~30일)** 을 둬서 이름이 한동안 점유된다. (테스트 환경에서 자주 만나는 함정.)

### 4. 선택적 비밀 — `count`로 "있을 때만 생성" (54~75행)

```hcl
resource "aws_secretsmanager_secret" "anthropic_api_key" {
  count = var.anthropic_api_key != "" ? 1 : 0
  name  = "${var.project}/anthropic-api-key"
}
resource "aws_secretsmanager_secret_version" "anthropic_api_key" {
  count         = var.anthropic_api_key != "" ? 1 : 0
  secret_id     = aws_secretsmanager_secret.anthropic_api_key[0].id
  secret_string = var.anthropic_api_key
}
```

(a) **무엇**: `count`(=그 리소스를 **몇 개** 만들지 정하는 메타인자. `count = 0`이면 아예 안 만듦, `1`이면 하나)을 이용해 **변수에 값이 있을 때만** 비밀을 만든다.

(b) 핵심 표현식:
- `count = var.anthropic_api_key != "" ? 1 : 0` — **삼항 연산자**(=`조건 ? 참일때값 : 거짓일때값`). "Anthropic 키 변수가 빈 문자열이 아니면 1개 만들고, 비었으면 0개(=만들지 마)". 즉 사용자가 키를 안 줬으면 이 비밀 자체가 인프라에 존재하지 않는다.
- `secret_id = aws_secretsmanager_secret.anthropic_api_key[0].id` — `count`를 쓰면 그 리소스는 **리스트**가 된다(0개 또는 1개짜리). 그래서 단일 참조라도 반드시 인덱스 `[0]`을 붙여야 함. 주석(54~56행)이 이걸 "Terraform idiom for make this resource 0 or 1 times"라고 정확히 설명.

(c) **왜**: gemini 키는 필수라 항상 만들지만, anthropic/billing 웹훅은 **옵션**이다. 안 쓰는 기능 때문에 빈 비밀 칸을 만들어 둘 이유가 없다. "쓰면 생기고 안 쓰면 안 생긴다"가 깔끔. 그리고 옆 파일 `ecs.tf`도 이에 맞춰, 존재하는 비밀만 컨테이너에 연결한다(아래 연결 참고).

(d) 함정:
- `count`가 0인데 `[0]`을 참조하는 다른 코드가 있으면 "index out of range" 에러. 그래서 ecs.tf는 `[0]`으로 직접 안 쓰고 `for s in aws_secretsmanager_secret.anthropic_api_key`처럼 **리스트 순회**로 안전하게 처리한다(확인함, ecs.tf:42).
- 변수를 `""`(빈 문자열)이 아니라 `null`이나 공백 `" "`로 주면 `!= ""` 판정이 어긋난다. 정확히 빈 문자열일 때만 0이 된다.

`billing_webhook_secret`도 완전히 동일한 구조(67~75행), 값만 결제 웹훅 시크릿으로 다름.

### 옆 파일과의 연결 (확인된 사실)

- **이 파일 → ecs.tf**: ecs.tf의 `local.base_secrets`(36~39행)가 여기 만든 secret들의 `.arn`을 `valueFrom`으로 참조해 컨테이너 환경에 주입한다. 예: `{ name = "DATABASE_URL", valueFrom = aws_secretsmanager_secret.database_url.arn }`. 즉 **여기서 만든 ARN을 ecs.tf의 task definition `secrets` 블록이 읽어간다.** 선택적 비밀은 `local.optional_secrets`에서 `for` 순회로 붙인다(42~43행).
- **rds.tf → 이 파일**: `random_password.db`(rds.tf:9)와 `aws_db_instance.main`(주소/포트)을 이 파일이 끌어다 씀.
- **variables.tf → 이 파일**: `var.project`, `var.db_name`, `var.gemini_api_key`, `var.anthropic_api_key`, `var.billing_webhook_secret` 입력값을 받음.
- **iam.tf**: ECS 실행 역할(`ecs_execution`)에 "이 비밀들을 읽을 권한"이 있어야 주입이 실제로 동작한다(ecs.tf:55 주석 "reads secrets").

### 면접 포인트

1. **"Secrets Manager에서 secret과 secret version을 왜 나누나요?"**
   → secret은 이름·ARN을 가진 고정 컨테이너이고, version이 실제 값이다. 이렇게 분리해야 ARN(주소)은 그대로 둔 채 값만 교체(rotation)하고 과거 값을 버전으로 보존할 수 있다. Terraform에서도 `aws_secretsmanager_secret` + `aws_secretsmanager_secret_version` 두 리소스로 표현된다.

2. **"task definition에 비밀번호를 평문 env로 넣으면 뭐가 문제죠?"**
   → ECS 읽기 권한자에게 그대로 노출되고 TF state·git 히스토리에 평문으로 박힌다. 그래서 task definition에는 ARN만 두고(`valueFrom`) ECS가 런타임에 주입하게 한다. 단, `secret_string`에 들어가는 값은 여전히 TF state에 평문 저장되므로 state 파일 자체(원격 backend 암호화·접근통제)도 별도로 보호해야 한다는 점까지 말하면 가점.

3. (보너스) **"`count = 조건 ? 1 : 0` 패턴의 주의점?"** → count를 쓰면 리소스가 리스트가 돼서 참조 시 `[0]`이 필요하고, count가 0일 때 `[0]` 참조하면 인덱스 에러가 난다. 그래서 옵션 리소스는 `for` 순회로 안전하게 다룬다.

---

## 9. ecr.tf

### 이 파일이 하는 일 (큰 그림)

이 파일은 **ECR(Elastic Container Registry = AWS가 운영하는 비공개 Docker 이미지 저장소)** 하나와 그 저장소의 **수명 정책(lifecycle policy)** 하나를 만든다. 파일 맨 위 주석이 정확히 그 비유를 준다.

```
# Think of ECR as "Docker Hub, but private and inside your AWS".
```

여기서 용어부터 정리하자.

- **Docker 이미지(image)**: 백엔드 앱(Spring Boot 빌드 결과 jar + JVM + OS 라이브러리)을 통째로 봉인한 "실행 가능한 스냅샷". 이걸 어딘가에 보관했다가 서버에서 꺼내 실행한다.
- **레지스트리(registry)**: 그 이미지를 보관하는 창고. Docker Hub가 공개 창고라면, ECR은 **내 AWS 계정 안의 비공개 창고**다.
- **CI/CD(=Continuous Integration / Continuous Delivery, 자동 빌드·배포 파이프라인)**: 여기서는 GitHub Actions의 deploy 워크플로우. 코드를 push하면 자동으로 이미지를 빌드한다.

흐름은 주석 3~4번 줄에 적혀 있다.

```
# CI/CD ... builds the Spring Boot image and pushes it here;
# ECS then pulls it to run the task.
```

즉 **GitHub Actions가 이미지를 빌드 → ECR에 push(업로드) → ECS(컨테이너 실행 서비스)가 pull(다운로드)해서 실행**. ECR은 이 사이의 "중간 보관소" 역할을 한다. 백엔드 개발자 비유로는 **Maven Central / Nexus 같은 아티팩트 저장소의 도커 버전**이라고 보면 정확하다. jar 대신 컨테이너 이미지를 보관할 뿐이다.

---

### 블록 1: `aws_ecr_repository.backend` — 저장소 자체

```hcl
resource "aws_ecr_repository" "backend" {
  name                 = var.project
  image_tag_mutability = "MUTABLE" # allows re-pushing :latest

  image_scanning_configuration {
    scan_on_push = true # free vulnerability scan on each push
  }

  force_delete = true

  tags = { Name = "${var.project}-ecr" }
}
```

**(a) 이게 뭘 만드나**: ECR 저장소 1개. 이름은 `tubeshadow`다 (`var.project`의 기본값이 `variables.tf`에서 `"tubeshadow"`로 정의돼 있음). 비유하자면 GitHub에 `tubeshadow`라는 빈 리포지토리를 하나 판 것 — 아직 이미지(=커밋)는 없고, 앞으로 들어올 자리만 마련한 상태다.

**(b) 핵심 인자 한 줄씩**

- `name = var.project`
  저장소 이름. `var.project`는 Terraform **변수(variable)** — 외부에서 주입하는 값으로, 여기선 `"tubeshadow"`. 모든 리소스 이름의 접두어를 한 변수로 통일해서, 나중에 프로젝트명을 바꾸면 한 곳만 고치면 되게 했다.

- `image_tag_mutability = "MUTABLE"`
  **태그(tag = 이미지에 붙이는 버전 라벨, 예: `:latest`, `:v1.2`)를 덮어쓸 수 있는가**를 정하는 스위치. 값은 두 가지뿐이다.
  - `MUTABLE`(가변): 같은 태그로 다시 push하면 **덮어쓰기 허용**. 그래서 `:latest`를 계속 새 이미지로 갱신할 수 있다 (주석 `allows re-pushing :latest`가 바로 이 뜻).
  - `IMMUTABLE`(불변): 한 번 쓴 태그는 못 덮어씀. `:v1.2`가 항상 똑같은 이미지를 가리키도록 고정 — 프로덕션에서 "어제의 v1.2와 오늘의 v1.2가 다른" 사고를 막는 안전장치.

- `image_scanning_configuration { scan_on_push = true }`
  **이미지를 push할 때마다 자동으로 취약점 스캔(vulnerability scan)을 돌려라**는 설정. 스캔이란 이미지 안의 OS 패키지·라이브러리에 **알려진 보안 결함(CVE = Common Vulnerabilities and Exposures, 공개된 보안 취약점 번호)**이 있는지 대조 검사하는 것. ECR의 기본(basic) 스캔은 **무료**라서 주석에 `free`라고 적었다. 켜두면 손해 볼 게 없다.

- `force_delete = true`
  `terraform destroy`(인프라 전체 삭제)를 할 때, **저장소 안에 이미지가 남아 있어도 강제로 같이 지운다**는 뜻. 주석 14번 줄이 이유를 정확히 말한다: 이게 없으면 "비어 있지 않은 저장소는 못 지운다"는 AWS 규칙 때문에 `destroy`가 에러로 멈춘다. 학습/실험용 인프라라 **깔끔하게 통째로 내릴 수 있게** 켜둔 것.

- `tags = { Name = "${var.project}-ecr" }`
  AWS **태그(tag)** — 리소스에 붙이는 메모지 라벨. (주의: 위의 *이미지 태그*와는 전혀 다른 개념이다. 이건 AWS 콘솔에서 리소스를 분류·검색·과금 추적하는 용도.) `"${...}"`는 **문자열 보간(interpolation)**으로, `var.project`가 `tubeshadow`니까 결과는 `tubeshadow-ecr`.

**(c) 왜 이렇게 했나**
개인/소규모 프로젝트에서 `:latest`로 계속 덮어쓰며 배포하는 단순한 운영을 택했기에 `MUTABLE`. 보안 스캔은 공짜니 기본 ON. `force_delete`는 실험 인프라를 비용 걱정 없이 올렸다 내렸다 하려는 의도.

**(d) 흔한 함정/오해**
- "스캔을 켰으니 취약점이 있으면 push가 막히겠지?" → **아니다.** `scan_on_push`는 push를 막지 않는다. 그냥 스캔하고 **리포트만** 남긴다. 결과를 보고 차단하려면 별도 정책/자동화가 필요하다.
- "`MUTABLE`이면 롤백이 쉽겠네" → 오히려 반대다. `:latest`를 덮어쓰면 **이전 이미지가 그 태그에서 사라진다**. 진짜 롤백을 원하면 커밋 해시 같은 고유 태그를 같이 붙여 두는 게 안전하다.
- `force_delete = true`는 편하지만 **프로덕션에선 위험**하다. `destroy` 한 번에 모든 이미지가 날아가므로, 실서비스에선 끄거나 신중히 다뤄야 한다.

---

### 블록 2: `aws_ecr_lifecycle_policy.backend` — 오래된 이미지 자동 청소

```hcl
resource "aws_ecr_lifecycle_policy" "backend" {
  repository = aws_ecr_repository.backend.name
  policy = jsonencode({
    rules = [{
      rulePriority = 1
      description  = "Keep last 10 images"
      selection = {
        tagStatus   = "any"
        countType   = "imageCountMoreThan"
        countNumber = 10
      }
      action = { type = "expire" }
    }]
  })
}
```

**(a) 이게 뭘 만드나**: 위 저장소에 붙는 **수명 정책(lifecycle policy)** — "이미지가 일정 개수/기간을 넘으면 자동으로 삭제하라"는 청소 규칙. 가장 최근 10개만 남기고 나머지는 자동 만료시킨다.

**(b) 핵심 인자 한 줄씩**

- `repository = aws_ecr_repository.backend.name`
  이 정책을 **어느 저장소에 붙일지** 지정. 문자열 `"tubeshadow"`를 직접 안 쓰고 위 블록의 `.name`을 참조했다. 이게 Terraform의 핵심 습관인 **암묵적 의존성(implicit dependency)**: 이렇게 참조하면 Terraform이 "저장소부터 먼저 만들고, 그다음 정책을 붙여야 한다"는 순서를 **스스로 안다**. 문자열을 하드코딩하면 이 순서 보장이 깨진다.

- `policy = jsonencode({ ... })`
  ECR 수명 정책은 **JSON 문서**로 기술하게 돼 있다. `jsonencode(...)`는 Terraform 내장 함수로, **HCL(=HashiCorp Configuration Language, Terraform 문법)로 쓴 객체를 JSON 문자열로 변환**해 준다. 따옴표·중괄호 escape 지옥을 피하려고 객체로 쓰고 함수로 변환하는 관용구다.

- `rules = [{ ... }]`
  규칙 배열. 여기선 규칙 1개.
  - `rulePriority = 1`: 규칙 **우선순위**. 여러 규칙이 있으면 숫자가 **작을수록 먼저** 평가된다. 각 규칙은 서로 다른 priority를 가져야 한다.
  - `description = "Keep last 10 images"`: 사람이 읽을 설명. 동작엔 영향 없음.
  - `selection`: **어떤 이미지를 대상으로 삼을지**의 조건.
    - `tagStatus = "any"`: 태그가 있든(`tagged`) 없든(`untagged`) **전부** 대상. (`untagged`만 노리거나, 특정 접두어 태그만 노리는 옵션도 있다.)
    - `countType = "imageCountMoreThan"`: 기준을 **"개수 초과"**로 잡는다. (대안: `sinceImagePushed` = "push된 지 N일 지난 것".)
    - `countNumber = 10`: 그 임계값. → 합치면 **"이미지가 10개를 넘으면"**.
  - `action = { type = "expire" }`: 조건에 걸린 이미지에 할 동작. `expire`는 **삭제**를 뜻한다 (ECR 수명 정책에서 action 타입은 사실상 `expire` 하나뿐).

  종합하면: **태그 종류 무관, 최신 10개를 넘는 오래된 이미지는 자동 삭제.**

**(c) 왜 이렇게 했나**
주석 20번 줄에 명시: `keep only the last 10 images so old layers don't pile up storage cost`. ECR은 **저장 용량(GB)당 과금**한다. CI/CD가 push할 때마다 이미지가 쌓이는데, 며칠만 지나도 수십~수백 개가 되고 **layer(이미지를 구성하는 파일시스템 조각들)**가 누적돼 돈이 샌다. "최근 10개면 롤백에도 충분하고 비용도 통제된다"는 균형점을 잡은 것.

**(d) 흔한 함정/오해**
- **즉시 삭제가 아니다.** ECR 수명 정책은 **비동기로, 보통 하루 주기**로 평가·정리된다. "11번째 push하자마자 1번이 사라지진" 않는다. 잠깐 11개 이상 보일 수 있다.
- `tagStatus = "any"` + `imageCountMoreThan 10`이라 **태그 붙은 중요한 이미지도 10개 밖으로 밀리면 삭제된다.** 보존하고 싶은 릴리스가 있으면 별도 규칙(더 높은 우선순위, 특정 태그 보호)이 필요하다.
- 정책 JSON 문법 오류는 `terraform plan`이 아니라 **`apply` 단계에서 AWS가 거절**하며 터진다. `jsonencode`로 구조를 만들면 최소한 JSON 문법 깨짐은 막을 수 있는 게 이 관용구의 부수 효과다.

---

### 옆 파일과의 연결 (이 파일이 어디에 쓰이나)

- **`ecs.tf` (가장 중요한 연결)**: 61번 줄에서 `image = "${aws_ecr_repository.backend.repository_url}:${var.image_tag}"`로 이 저장소를 참조한다. 즉 **이 파일이 만든 ECR 주소가 곧 ECS 컨테이너가 실행할 이미지의 출처**다. ECR이 창고, ECS가 그 창고에서 꺼내 돌리는 실행 엔진.
- **`iam.tf`**: 140~143번 줄에서 `ecr:PutImage`, `ecr:UploadLayerPart` 등의 권한을 `aws_ecr_repository.backend.arn`(이 저장소)에 한정해 부여한다. **CI/CD가 "이 저장소에만" 이미지를 push할 수 있게** 하는 최소권한 설정이고, 134번 줄 `ecr:GetAuthorizationToken`은 Docker 로그인 토큰 발급용.
- **`outputs.tf`**: 30~32번 줄에서 `aws_ecr_repository.backend.repository_url`을 출력값으로 내보낸다. `terraform apply` 후 화면에 ECR 주소가 찍혀, GitHub Actions나 사람이 push 대상 주소를 바로 알 수 있게 한다.
- **`security.tf`**: 60번 줄 outbound 규칙 주석이 `pull image from ECR`을 명시 — ECS 태스크가 ECR에서 이미지를 당겨오려면 아웃바운드 통신이 열려 있어야 함을 보여준다.

---

### 면접 포인트

**Q1. ECR에서 `image_tag_mutability`의 MUTABLE vs IMMUTABLE 차이는? 프로덕션엔 뭘 쓰나?**
A. MUTABLE은 같은 태그(`:latest` 등) 덮어쓰기 허용, IMMUTABLE은 태그 고정으로 한 번 쓴 태그는 못 바꿈. 프로덕션에선 **IMMUTABLE + 커밋 해시/버전 태그**가 정석이다 — "v1.2가 항상 같은 이미지"를 보장해 추적성과 롤백 안정성을 확보하기 때문. (이 파일은 학습용이라 단순함을 택해 MUTABLE.)

**Q2. ECR lifecycle policy는 왜 쓰며, 즉시 삭제되나?**
A. push가 누적되면 저장 용량 과금이 늘어나므로 오래된 이미지를 자동 만료시켜 비용을 통제한다. 단 **실시간이 아니라 약 하루 주기로 비동기 평가**되므로 임계값 초과 즉시 삭제되진 않는다. 또 `tagStatus`/`countType`(`imageCountMoreThan` vs `sinceImagePushed`) 조합으로 "개수 기준"인지 "기간 기준"인지를 고를 수 있다는 점이 핵심.

---

## 10. iam.tf

### 0. 들어가기 전에 — IAM이 뭔데?

**IAM(=Identity and Access Management)**은 AWS의 "출입증/권한 관리 시스템"이다. AWS에서 "누가(who) 무엇을(what) 할 수 있는가"를 전부 IAM이 결정한다. 백엔드로 비유하면, Spring Security의 `@PreAuthorize`가 AWS 전체에 깔려 있다고 보면 된다. 모든 API 호출(S3에 파일 올리기, 비밀번호 읽기, 컨테이너 띄우기)은 호출 직전에 IAM이 "너 이거 할 권한 있어?"를 검사한다.

IAM의 핵심 부품 두 가지:

- **Role(역할)** = "임시로 빌려 쓰는 신분증". 사람 계정(IAM User)과 달리 비밀번호가 없고, 특정 주체가 잠깐 "이 역할인 척(assume)" 할 수 있다. 컨테이너·CI 같은 무인 주체가 쓴다.
- **Policy(정책)** = 그 신분증에 적힌 "허용 목록". JSON 문서이며 `actions`(무슨 동작), `resources`(어떤 대상)로 구성된다.

그리고 Role에는 두 종류의 정책이 붙는다. 이걸 헷갈리면 IAM이 영원히 안 풀린다.

1. **Trust policy(신뢰 정책 = `assume_role_policy`)** — "**누가** 이 역할을 빌릴 수 있나". 출입증을 빌리러 온 사람의 신원을 검사하는 정책. (문 앞 경비)
2. **Permission policy(권한 정책)** — "이 역할을 빌린 사람이 **무엇을** 할 수 있나". (건물 안에서 들어갈 수 있는 방 목록)

이 파일은 이 둘의 조합으로 **3개의 신분증**을 만든다. 파일 맨 위 주석(1~12행)이 그 셋을 정확히 요약한다.

| # | 역할 이름 | 누가 빌리나 | 뭘 하나 |
|---|---|---|---|
| 1 | **Execution role(실행롤)** | ECS 에이전트 | 태스크 *시작* 준비: 이미지 pull, 시크릿 fetch, 로그 쓰기 |
| 2 | **Task role(태스크롤)** | 실행 중인 내 앱 코드 | *런타임*: S3 녹음 버킷 읽고/쓰기 |
| 3 | **GitHubActionsDeploy** | GitHub Actions(CI) | 이미지 push + 배포 |

---

### 1. `locals.secret_arns` — 시크릿 ARN 목록 모으기 (15~26행)

```hcl
locals {
  secret_arns = concat(
    [
      aws_secretsmanager_secret.database_url.arn,
      ...
    ],
    aws_secretsmanager_secret.anthropic_api_key[*].arn,
    aws_secretsmanager_secret.billing_webhook_secret[*].arn,
  )
}
```

**(a) 뭘 만드나** — 진짜 리소스를 만드는 게 아니라, **로컬 변수(=Terraform 안에서만 쓰는 이름표)** 다. `locals` 블록은 "계산해서 이름 붙여 둔 값"이다. 백엔드의 `final var secretArns = ...` 같은 거다.

**(b) 핵심 인자**
- **`ARN`(=Amazon Resource Name)** = AWS 모든 리소스의 전역 고유 주소. 형태는 `arn:aws:서비스:리전:계정ID:리소스`. 예: `arn:aws:secretsmanager:ap-northeast-2:123456789012:secret:tubeshadow-jwt-abc`. 권한 정책에서 "어떤 자원"을 가리킬 때 항상 ARN을 쓴다.
- **`concat(...)`** = 여러 리스트를 하나로 이어붙이는 함수. 자바의 `List.addAll` 연속 호출.
- **`aws_secretsmanager_secret.anthropic_api_key[*].arn`** — 여기 `[*]`가 핵심이다. **`[*]`(=splat 연산자)** 는 "이 리소스가 0개일 수도, 1개일 수도 있다"는 뜻. anthropic/billing 시크릿은 `count`로 조건부 생성되는(옵션) 리소스라서, 0개면 빈 리스트, 1개면 그 ARN을 담는다. 그냥 `.arn`이라고 쓰면 "리소스가 0개일 때"는 에러가 난다.

**(c) 왜** — 아래 Execution role이 "이 시크릿들만 읽어라"고 화이트리스트를 줄 때 쓰려고, 한 곳에 모아 둔 것이다. 옵션 시크릿이 있든 없든 목록이 자동으로 맞춰진다.

**(d) 함정** — 옵션 리소스에 `[*]` 안 붙이고 그냥 `.arn` 쓰면 `count=0`일 때 "index out of range"로 plan이 깨진다. 옵션 리소스의 ARN은 거의 항상 splat이다.

> 옆 파일 연결: 이 ARN들은 `secrets.tf`(또는 그 비슷한 곳)에서 만든 `aws_secretsmanager_secret` 리소스들을 가리킨다. 즉 "시크릿은 저기서 만들고, 읽을 권한은 여기서 준다".

---

### 2. `data.aws_iam_policy_document.ecs_assume` — ECS용 신뢰 정책 (29~37행)

```hcl
data "aws_iam_policy_document" "ecs_assume" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}
```

**(a) 뭘 만드나** — `data` 블록이므로 리소스를 *생성*하는 게 아니라, **IAM 정책 JSON을 조립해 주는 헬퍼**다. 결과물은 `.json` 속성으로 꺼내 쓴다. 손으로 JSON 쓰는 대신 HCL 문법으로 안전하게 쓰는 방식.

이건 **Trust policy(신뢰 정책)** 다. 즉 "이 역할을 *누가* 빌릴 수 있나"를 정의한다.

**(b) 핵심 인자**
- **`actions = ["sts:AssumeRole"]`** — **STS(=Security Token Service)** 는 임시 자격증명을 발급하는 AWS 서비스. `AssumeRole`은 "역할을 빌려서 임시 토큰을 받는" 그 동작. 신뢰 정책에는 항상 이 `sts:AssumeRole` 류가 들어간다.
- **`principals.type = "Service"`** — 역할을 빌리는 주체가 *사람*이 아니라 *AWS 서비스*라는 뜻. **Principal(=주체)** 은 "행위를 하는 신원".
- **`identifiers = ["ecs-tasks.amazonaws.com"]`** — 그 서비스가 정확히 **ECS 태스크 서비스 프린시펄**이라는 것. `ecs-tasks.amazonaws.com`은 AWS가 정해 둔 고정 문자열로, "ECS가 컨테이너를 띄울 때 쓰는 내부 신원"이다.

**(c) 왜** — Execution role과 Task role *둘 다* ECS가 빌려야 하므로, 같은 신뢰 정책을 공유한다(42행, 68행에서 둘 다 이 `.json`을 참조). DRY(중복 제거).

**(d) 함정** — `ecs-tasks.amazonaws.com`(ECS)와 `ec2.amazonaws.com`(EC2), `lambda.amazonaws.com`(Lambda)을 헷갈려 잘못 쓰면, 역할이 멀쩡히 만들어져도 ECS가 못 빌려서 태스크가 안 뜬다. 에러 메시지가 불친절해서 시간을 많이 잡아먹는다(주석 1행의 "IAM is where most time goes"가 이 얘기).

---

### 3. Execution role(실행롤) — 태스크를 *시작*시키는 신분증 (40~63행)

```hcl
resource "aws_iam_role" "ecs_execution" {
  name               = "${var.project}-ecs-execution"
  assume_role_policy = data.aws_iam_policy_document.ecs_assume.json
}
```

**(a) 뭘 만드나** — 실제 IAM Role을 생성한다.

**(b) 핵심 인자**
- **`name = "${var.project}-ecs-execution"`** — `var.project`(예: `tubeshadow`)를 끼워 `tubeshadow-ecs-execution` 같은 이름. **`${...}`(=string interpolation, 문자열 보간)** 로 변수를 박는다.
- **`assume_role_policy`** = 위에서 만든 신뢰 정책의 `.json`. 즉 "ECS만 이 역할을 빌릴 수 있다".

**(c) 왜 — 이게 "실행롤"이라는 개념의 핵심**
실행롤은 **ECS 에이전트(컨테이너 호스트의 관리 프로세스)** 가 쓰는 신분증이다. 컨테이너 안의 *내 앱*이 아니라, 컨테이너를 *띄우기 직전 준비 작업*을 하는 쪽이다. 준비 작업이란: ① ECR에서 도커 이미지 pull, ② Secrets Manager에서 환경변수용 시크릿 fetch, ③ CloudWatch에 로그 스트림 생성. 비유하면 "공연(앱) 시작 전, 무대 세팅하는 스태프"의 출입증이다.

**권한 정책 1 — AWS 관리형 정책 부착 (46~49행)**
```hcl
resource "aws_iam_role_policy_attachment" "ecs_execution_managed" {
  role       = aws_iam_role.ecs_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
```
- **`aws_iam_role_policy_attachment`** = "이미 존재하는 정책을 역할에 *붙이는*" 리소스.
- **`AmazonECSTaskExecutionRolePolicy`** = AWS가 미리 만들어 둔 **관리형 정책(managed policy)**. ECR pull + CloudWatch Logs 쓰기 권한이 들어 있다. ARN의 `:aws:` 계정 부분이 비어 있는 건 "AWS 소유"라는 표식.
- **왜**: 이건 모든 ECS 실행롤이 공통으로 필요한 부분이라, 바퀴를 다시 발명하지 않고 AWS 표준 정책을 그대로 붙인다.

**권한 정책 2 — 시크릿 읽기 인라인 정책 (52~63행)**
```hcl
data "aws_iam_policy_document" "ecs_execution_secrets" {
  statement {
    sid       = "ReadAppSecrets"
    actions   = ["secretsmanager:GetSecretValue"]
    resources = local.secret_arns
  }
}
resource "aws_iam_role_policy" "ecs_execution_secrets" { ... }
```
- **`sid`(=Statement ID)** = 정책 문 하나하나에 붙이는 사람이 읽기 좋은 라벨. 동작엔 영향 없고, 콘솔에서 구분용.
- **`actions = ["secretsmanager:GetSecretValue"]`** = "시크릿 값을 읽는다"는 딱 그 한 동작만.
- **`resources = local.secret_arns`** = 위 1번에서 모아 둔 *우리 시크릿들만*. 계정 전체 시크릿이 아니라.
- **`aws_iam_role_policy`** (vs 위의 `_attachment`) = 이건 역할에 직접 박아 넣는 **인라인 정책(inline policy)**. 이 역할 전용으로 손수 쓴 권한.

**(c) 왜 시크릿 읽기를 실행롤에 줬나** — ECS가 컨테이너를 띄우면서 "시크릿을 환경변수로 주입"하려면, *시작 시점에* 시크릿을 읽어야 한다. 그래서 (런타임 앱이 아니라) 실행롤에 이 권한이 있다.

**(d) 함정 / 51행 주석의 의도** — `resources`에 `["*"]`(전부)를 박는 사람이 많다. 그러면 이 컨테이너가 *계정의 모든 시크릿*을 읽을 수 있어, 컨테이너가 털리면 전부 샌다. 여기처럼 우리 ARN 목록으로 좁히는 게 **최소 권한 원칙(least privilege)**. 또 흔한 실수: `secretsmanager`인데 `secrets-manager`로 오타.

---

### 4. Task role(태스크롤) — *실행 중인 앱*의 신분증 (66~88행)

```hcl
resource "aws_iam_role" "task" {
  name               = "${var.project}-task"
  assume_role_policy = data.aws_iam_policy_document.ecs_assume.json
}
```

**(a) 뭘 만드나** — 두 번째 IAM Role. 신뢰 정책은 실행롤과 *똑같이* `ecs_assume`를 쓴다(둘 다 ECS가 빌리니까).

**(c) 실행롤 vs 태스크롤 — 이 파일에서 제일 중요한 구분**
- **실행롤** = ECS 인프라가 쓴다(이미지 pull, 시크릿 fetch). 내 코드는 이걸 절대 안 본다.
- **태스크롤** = **내 앱 코드의 AWS SDK가 자동으로 쓴다.** 자바에서 `S3Client.builder().build()`만 하면, AWS SDK가 컨테이너 내부의 자격증명 엔드포인트에서 *태스크롤*의 임시 토큰을 알아서 가져다 쓴다. 별도 키 설정이 필요 없다. 즉 "내 앱이 AWS에 대고 할 수 있는 일 = 태스크롤 권한".

비유: 실행롤은 "공연 세팅 스태프 출입증", 태스크롤은 "무대 위 배우(=앱)가 들고 다니는 출입증". 배우가 들어갈 수 있는 방이 곧 앱이 쓸 수 있는 AWS 자원.

**권한 정책 — S3 녹음 버킷 접근 (72~88행)**
```hcl
data "aws_iam_policy_document" "task_s3" {
  statement {
    sid       = "ObjectAccess"
    actions   = ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"]
    resources = ["${aws_s3_bucket.recordings.arn}/*"]
  }
  statement {
    sid       = "ListBucket"
    actions   = ["s3:ListBucket"]
    resources = [aws_s3_bucket.recordings.arn]
  }
}
```
두 문(statement)으로 나뉜 게 핵심 포인트다. **S3는 "버킷 자체"와 "버킷 안 객체"가 다른 자원으로 취급된다.**
- **객체 동작**(`GetObject`/`PutObject`/`DeleteObject` = 파일 하나 읽기/쓰기/삭제) → 자원은 **`버킷ARN/*`** (버킷 *안의 모든 객체*). 끝에 `/*`가 붙어야 한다.
- **버킷 동작**(`ListBucket` = 버킷 안 파일 *목록* 조회) → 자원은 **버킷ARN 그 자체**(`/*` 없음).

**(d) 가장 흔한 S3 IAM 함정** — `ListBucket`을 `버킷ARN/*`에 주거나, 객체 동작을 `버킷ARN`(슬래시-스타 없이)에 주면 **둘 다 권한이 안 먹는다.** "AccessDenied인데 정책엔 분명 s3:GetObject 있는데?" 하는 사고의 90%가 이 `/*` 유무다. 여기처럼 문을 두 개로 정확히 쪼개야 맞다.

**(c) 왜 앱에 이것만?** — 앱은 녹음 파일만 다루면 되니까 S3 이 버킷만. 시크릿 읽기는 *주지 않았다* — 시크릿은 시작 시 실행롤이 환경변수로 넣어 주므로, 런타임 앱이 직접 Secrets Manager를 때릴 필요가 없다. 이게 11~12행 주석이 말한 "least privilege": 앱이 털려도 S3 한 버킷이 한계, 모든 시크릿을 못 읽는다.

> 옆 파일 연결: `aws_s3_bucket.recordings`는 `s3.tf`에서 만든 버킷. 그 ARN을 여기서 참조한다. 그리고 이 `aws_iam_role.task`는 `ecs.tf`의 태스크 정의에서 `task_role_arn`으로 꽂힌다.

---

### 5. GitHub OIDC Provider — CI를 위한 "키 없는 신뢰" 설정 (93~99행)

```hcl
resource "aws_iam_openid_connect_provider" "github" {
  url            = "https://token.actions.githubusercontent.com"
  client_id_list = ["sts.amazonaws.com"]
  thumbprint_list = ["6938fd4d...", "1c58a3a8..."]
}
```

**먼저 OIDC가 뭔지.** **OIDC(=OpenID Connect)** 는 "신뢰할 수 있는 제3자가 발급한 서명된 토큰으로 신원을 증명"하는 표준이다. 핵심 아이디어: GitHub Actions가 워크플로를 돌릴 때, GitHub이 "이건 *이 레포의 이 브랜치*에서 돌아가는 워크플로다"라고 **서명된 JWT 토큰**을 발급한다. AWS는 그 토큰을 보고 "아 GitHub이 보증하는 신원이군" 하고 역할을 빌려준다.

**왜 이게 혁명인가 (92행 주석 "keyless")** — 예전 방식은 AWS Access Key/Secret Key를 GitHub Secrets에 저장해 뒀다. 이건 *장기 자격증명(long-lived credential)* 이라, 유출되면 누군가 영구히 우리 AWS를 쓸 수 있다. OIDC는 **저장되는 키가 0개**다. 매 실행마다 GitHub이 즉석에서 단기 토큰을 만들고, AWS가 그걸 단기 세션으로 교환한다. 키 회전·유출 걱정이 사라진다.

**(b) 핵심 인자**
- **`url`** = GitHub의 OIDC 토큰 발급자(issuer) 주소. 고정값.
- **`client_id_list = ["sts.amazonaws.com"]`** — 이 토큰이 향하는 **audience(=수신 대상, `aud`)**. "이 토큰은 AWS STS한테 보여주려고 만든 것"이라는 표식.
- **`thumbprint_list`** = GitHub TLS 인증서의 지문(해시). **97~98행 주석이 솔직하게 적어 둔 대로**, 이 유명 공급자에 대해 AWS는 사실상 이 값을 무시하지만, 인자 자체는 필수라서 채워 둔다.

**(d) 함정** — OIDC provider는 **AWS 계정당 issuer URL 하나만** 만들 수 있다. 이미 콘솔이나 다른 스택에서 만들어 뒀다면 Terraform이 "EntityAlreadyExists"로 깨진다. 그 땐 `import` 해야 한다.

---

### 6. GitHub 신뢰 정책 — "누가 이 배포롤을 빌릴 수 있나" (102~121행)

```hcl
data "aws_iam_policy_document" "github_assume" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]
    effect  = "Allow"
    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }
    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }
    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:${var.github_repo}:ref:refs/heads/${var.github_branch}"]
    }
  }
}
```

이건 ECS의 신뢰 정책과 **구조는 같지만 종류가 다르다.** 비교하면 OIDC가 명확해진다.

- **`actions = ["sts:AssumeRoleWithWebIdentity"]`** — ECS는 `AssumeRole`이었는데 여기는 `AssumeRoleWithWebIdentity`. "외부 OIDC 토큰을 들고 와서(With Web Identity) 역할을 빌린다"는 별도 동작이다. OIDC 페더레이션 전용.
- **`principals.type = "Federated"`** — ECS는 `Service`였다. **Federated(=연합 신원)** 는 "AWS 바깥의 신원 공급자가 보증하는 주체"라는 뜻. identifiers엔 위에서 만든 OIDC provider의 ARN을 넣는다.

**condition 두 개가 보안의 핵심이다.** 이게 없으면 *세상 모든 GitHub 레포*가 우리 역할을 빌릴 수 있다(끔찍).
- **`...:aud` StringEquals `sts.amazonaws.com`** — 토큰의 audience가 AWS STS 맞는지. (토큰 오용 방지)
- **`...:sub` StringLike `repo:{레포}:ref:refs/heads/{브랜치}`** — **이게 진짜 자물쇠다.** `sub`(=subject, 토큰 소유자)가 정확히 *우리 레포의 우리 브랜치*에서 나온 워크플로일 때만 허용. 예: `repo:myorg/shadow-ai:ref:refs/heads/main`. 다른 레포, 다른 브랜치, 포크는 전부 거부된다.

**(d) 함정 — OIDC 보안 사고 1순위**: `sub` condition을 빠뜨리거나 `repo:myorg/*`처럼 너무 느슨하게 두는 것. 그러면 같은 조직 아무 레포나, 심하면 누구나 우리 배포롤을 탈취한다. 또 흔한 실수: `StringEquals`로 `sub`를 박았는데 실제 토큰엔 환경/태그가 더 붙어 안 맞는 경우 → 여기선 `StringLike`(=와일드카드 허용 비교)를 쓰되 브랜치까지 못 박아 균형을 맞췄다.

---

### 7. GitHubActionsDeploy 역할 + 그 권한 (125~168행)

```hcl
resource "aws_iam_role" "github_deploy" {
  name               = "GitHubActionsDeploy"
  assume_role_policy = data.aws_iam_policy_document.github_assume.json
}
```

**(a)(b)** 세 번째 역할. 신뢰 정책은 방금 만든 `github_assume`(= "우리 레포/브랜치 워크플로만").

**(c)(d) 123~124행 주석이 못 박은 함정** — `name = "GitHubActionsDeploy"`는 **글자 그대로 고정**이다. `.github/workflows/deploy.yml`이 이 이름을 ARN으로 하드코딩해서 역할을 빌린다. 여기서 이름 바꾸면 배포가 "역할 못 찾음"으로 깨진다. Terraform과 워크플로 YAML 사이의 **숨은 결합(hidden coupling)**.

**권한 정책 — 배포에 필요한 딱 그만큼 (130~168행)**, 네 묶음으로 읽으면 된다.

**(가) ECR 인증 토큰 (132~136행)**
```hcl
actions   = ["ecr:GetAuthorizationToken"]
resources = ["*"]
```
- **ECR(=Elastic Container Registry)** = AWS의 도커 이미지 저장소(도커 허브의 사내 버전).
- `GetAuthorizationToken`은 `docker login`용 토큰을 받는 동작. **135행 주석대로 이 동작은 특정 레포로 좁힐 수 없어** `"*"`가 *불가피*하다. (스스로 코멘트로 변명을 남겨 둔 점이 좋다 — 리뷰어가 "왜 와일드카드냐" 묻기 전에 답해 둠.)

**(나) ECR 이미지 push (137~144행)** — `PutImage`, `UploadLayerPart` 등 레이어 업로드 동작들. 여기 `resources`는 **`aws_ecr_repository.backend.arn`** 하나로 좁혔다. 즉 우리 백엔드 레포에만 push 가능.

**(다) ECS 배포 (146~150행)**
```hcl
actions   = ["ecs:RegisterTaskDefinition", "ecs:DescribeTaskDefinition", "ecs:DescribeServices", "ecs:UpdateService"]
resources = ["*"]
```
- **`RegisterTaskDefinition`** = 새 태스크 정의 리비전(=컨테이너 실행 설계도의 새 버전) 등록. 새 이미지 태그를 가리키게.
- **`UpdateService`** = 서비스를 새 리비전으로 굴려서 롤링 배포.
- **149행 주석대로** `RegisterTaskDefinition`은 리소스 단위 제한을 지원 안 해서 또 `"*"`.

**(라) PassRole — 가장 미묘하고 면접 단골 (153~162행)**
```hcl
actions   = ["iam:PassRole"]
resources = [aws_iam_role.ecs_execution.arn, aws_iam_role.task.arn]
condition {
  test     = "StringEquals"
  variable = "iam:PassedToService"
  values   = ["ecs-tasks.amazonaws.com"]
}
```
**`iam:PassRole`이 뭐고 왜 필요한가** — 태스크 정의를 등록할 때, 그 안에 "이 컨테이너는 실행롤 X, 태스크롤 Y로 돌려라"고 *역할을 지정*한다. 즉 배포 주체(CI)가 다른 역할을 ECS에게 **건네주는(pass)** 행위다. AWS는 이걸 따로 권한으로 막는다. 안 그러면 "낮은 권한 CI가, 자기보다 센 역할을 ECS에 붙여서 권한 상승(privilege escalation)"하는 공격이 가능하기 때문이다.

- `resources`를 **딱 두 ARN(실행롤·태스크롤)으로** 좁혔다 → CI는 *이 두 역할만* 넘길 수 있고, 계정의 관리자 역할 같은 걸 못 붙인다.
- **`condition: iam:PassedToService = ecs-tasks.amazonaws.com`** → 넘기는 대상이 *ECS일 때만* 허용. 다른 서비스로 빼돌리기 방지.

**(d) 함정** — 배포 파이프라인에서 흔한 에러 `User is not authorized to perform: iam:PassRole`. 십중팔구 이 문을 빠뜨렸거나, 새 역할을 만들어 놓고 여기 `resources` 목록에 추가 안 한 경우다. "역할은 만들었는데 PassRole에 안 넣음" → 배포가 막판에 깨진다.

> 옆 파일 연결: `aws_ecr_repository.backend`는 `ecr.tf`, ECS 서비스/태스크 정의는 `ecs.tf`. 이 PassRole의 두 ARN은 위 1번·2번 역할로 다시 이어진다(파일 안에서 셀프 참조). `.github/workflows/deploy.yml`이 이 역할 전체를 소비한다.

---

### 8. 면접 포인트

**Q1. ECS의 "실행롤(execution role)"과 "태스크롤(task role)"의 차이는?**
A. 실행롤은 ECS 에이전트가 *컨테이너를 띄우기 위해* 쓴다(ECR 이미지 pull, Secrets Manager에서 시크릿 fetch, CloudWatch 로그 생성 — 시작 시점 권한). 태스크롤은 *실행 중인 앱 코드의 AWS SDK가* 쓴다(이 파일에선 S3 녹음 버킷 접근 — 런타임 권한). 둘을 나누는 이유는 최소 권한: 앱이 털려도 시크릿 전체를 못 읽게.

**Q2. GitHub Actions가 AWS 키를 저장하지 않고 어떻게 배포하나(OIDC)? `iam:PassRole`은 왜 필요한가?**
A. GitHub이 OIDC로 "이 레포/브랜치 워크플로다"를 증명하는 단기 JWT를 발급하고, AWS는 신뢰 정책의 `sub`/`aud` 조건으로 검증한 뒤 `AssumeRoleWithWebIdentity`로 단기 세션을 내준다 — 저장되는 장기 키가 0개. `PassRole`은 배포 시 태스크 정의에 실행롤·태스크롤을 *지정해 ECS에 넘기는* 행위라, 그 자체로 권한이 필요하다(권한 상승 방지). 그래서 넘길 수 있는 역할 ARN과 대상 서비스(`ecs-tasks.amazonaws.com`)를 condition으로 좁혀 둔다.

---

## 11. alb.tf

이 파일은 우리 API의 **공개 정문(public front door)** 하나를 통째로 만든다. 백엔드 개발자에게 익숙한 말로 바꾸면, 스프링 부트 앞에 두는 **nginx 리버스 프록시 + HTTPS 인증서 + 헬스체크 로드밸런서**를 AWS 매니지드 서비스로 한 방에 세우는 코드다. 파일 맨 위 주석에 그림이 잘 그려져 있다.

```
client ──https://api.mimi.daeseon.ai──▶ [ALB :443] ──http :8080──▶ [Fargate task]
```

핵심 한 문장: **바깥세상과는 HTTPS(443)로 암호화해서 말하고, 안쪽 컨테이너와는 평문 HTTP(8080)로 말한다.** 암호화를 푸는 지점이 ALB라서 이걸 "TLS 종료(TLS termination)"라고 부른다. 용어부터 깔고 가자.

- **ALB(Application Load Balancer)** = AWS의 L7(애플리케이션 계층, HTTP/HTTPS를 이해하는) 로드밸런서. URL 경로/호스트를 보고 트래픽을 나눌 수 있다. nginx 같은 역할.
- **TLS(Transport Layer Security)** = HTTPS의 암호화 부분. 옛날 이름이 SSL. "TLS 종료"는 클라이언트와의 암호화 연결을 ALB에서 풀어버린다(=복호화한다)는 뜻.
- **ACM(AWS Certificate Manager)** = AWS가 무료로 TLS 인증서를 발급/자동갱신해 주는 서비스. Let's Encrypt의 AWS 버전이라고 보면 된다.
- **Fargate task** = 서버(EC2)를 직접 안 띄우고 컨테이너만 돌려주는 AWS 서비스(서버리스 컨테이너) 위에서 도는 우리 백엔드 컨테이너 1개.

---

### 블록 1 — `aws_lb.main` (로드밸런서 본체)

```hcl
resource "aws_lb" "main" {
  name               = "${var.project}-alb"
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = aws_subnet.public[*].id
  tags               = { Name = "${var.project}-alb" }
}
```

**(a) 뭘 만드나** — ALB 인스턴스 자체. 이게 생기면 AWS가 `xxx.elb.amazonaws.com` 같은 **고정 DNS 이름**을 하나 준다. 이 안정적인 이름이 중요한 이유는, 뒤의 Fargate task들은 배포할 때마다 죽고 새로 뜨면서 IP가 계속 바뀌는데, ALB의 이름은 안 변하기 때문이다. 그래서 사용자는 항상 ALB 주소만 보면 된다(주석 6번 줄: "stable hostname while tasks come and go").

**(b) 인자 한 줄씩**
- `name` — 콘솔에 뜨는 이름. `${var.project}-alb`는 Terraform의 **문자열 보간(interpolation, = 변수를 문자열 안에 끼워넣기)**. `var.project`가 `"mimi"`면 `"mimi-alb"`가 된다.
- `load_balancer_type = "application"` — ALB로 만들겠다는 선언. 다른 값으로 `"network"`(NLB, L4/TCP 레벨)가 있는데, 우리는 HTTP를 이해하고 HTTPS를 종료해야 하니 `application`이 맞다.
- `security_groups` — 이 ALB에 붙일 **보안 그룹(Security Group, = 인스턴스 단위 방화벽 규칙)**. `aws_security_group.alb.id`로 옆 파일(`security.tf`)에 정의된 ALB용 SG를 참조한다. 거기서 443/80을 인터넷에 열어준다.
- `subnets = aws_subnet.public[*].id` — ALB를 어느 네트워크 칸에 놓을지. **서브넷(subnet, = VPC를 잘게 나눈 IP 구획)** 중 **퍼블릭(public, = 인터넷 게이트웨이로 바로 나가는)** 서브넷들에 배치. `[*]`는 **스플랫(splat) 표현식**으로, `aws_subnet.public`이라는 리스트의 **모든 원소의 `.id`만 뽑아 리스트로** 만든다(= `[public[0].id, public[1].id, ...]`).

**(c) 왜 이렇게 했나** — 12번 줄 주석이 정답을 준다: "ALB needs >= 2 public subnets across AZs". **AZ(Availability Zone, = 같은 리전 안의 물리적으로 분리된 데이터센터)**. ALB는 고가용성 보장을 위해 **최소 2개 AZ에 걸친 서브넷**을 요구한다. AZ 하나가 통째로 죽어도 다른 AZ의 ALB 노드가 트래픽을 받게 하려는 것. 그래서 `network.tf`에서 퍼블릭 서브넷을 2개 이상 만들어 둔 것이고, 여기서 그걸 전부 넘긴다.

**(d) 흔한 함정**
- 서브넷을 1개만 주면 `apply`가 에러로 거부된다. "왜 2개 필요하지?"를 모르면 여기서 막힌다.
- ALB를 **프라이빗 서브넷**에 두면 인터넷에서 접근 불가. 정문은 반드시 퍼블릭에.
- `name`은 32자 제한 + 영숫자/하이픈만. `var.project`가 길면 잘려서 충돌난다.

---

### 블록 2 — `aws_lb_target_group.backend` (트래픽을 받을 대상 풀 + 헬스체크)

```hcl
resource "aws_lb_target_group" "backend" {
  name        = "${var.project}-tg"
  port        = var.container_port
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_vpc.main.id

  health_check {
    path                = "/api/health"
    matcher             = "200"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 3
  }

  deregistration_delay = 30
}
```

**(a) 뭘 만드나** — **타깃 그룹(target group)** = "ALB가 실제로 트래픽을 흘려보낼 백엔드들의 명단(풀)". ALB 본체는 "문"이고, 타깃 그룹은 "그 문 뒤에 줄 서 있는 서버 목록"이다. 16번 줄 주석 그대로 "the pool of task IPs the ALB forwards to".

**(b) 인자 한 줄씩**
- `port = var.container_port` — 컨테이너가 실제로 리슨하는 포트(이 프로젝트는 8080). ALB는 이 포트로 task에 요청을 꽂는다.
- `protocol = "HTTP"` — **ALB → task 구간은 평문 HTTP**. 여기가 핵심: 바깥은 HTTPS인데 안쪽은 HTTP다. 둘은 다른 구간이다.
- `target_type = "ip"` — 타깃을 **IP 주소로 등록**하겠다는 설정. 17번 줄 주석이 이유를 못박는다: "required for Fargate (awsvpc networking — each task gets its own ENI/IP)". **awsvpc 네트워킹 모드** = Fargate task마다 **ENI(Elastic Network Interface, = 가상 랜카드)**가 하나씩 붙어 **고유 사설 IP**를 갖는 방식. EC2 기반이면 `"instance"`(인스턴스 ID로 등록)를 쓸 수도 있지만, Fargate는 등록할 인스턴스가 없으니 무조건 `"ip"`.
- `vpc_id` — 이 타깃 그룹이 속한 **VPC(Virtual Private Cloud, = 내 전용 가상 네트워크)**. 타깃 IP들이 이 VPC 안에 있어야 한다.

**health_check 서브블록** — 25번 줄 주석: "ALB calls this every 30s; a task must answer 200 here to receive traffic."
- `path = "/api/health"` — ALB가 주기적으로 GET 때릴 경로. 이게 200을 안 주면 "이 task 죽었네" 판정.
- `matcher = "200"` — "성공"으로 칠 HTTP 상태코드. 201이나 204를 주면 실패로 본다(오해 포인트).
- `interval = 30` — 30초마다 한 번씩 찌른다.
- `timeout = 5` — 5초 안에 응답 없으면 그 회차는 실패.
- `healthy_threshold = 2` — **연속 2번** 성공하면 "건강함"으로 전환 → 트래픽 투입.
- `unhealthy_threshold = 3` — **연속 3번** 실패하면 "아픔"으로 전환 → 트래픽 차단.

**deregistration_delay = 30** — 36번 줄 주석: 배포로 task를 내릴 때 **이미 처리 중이던 요청(in-flight)을 마저 빼주는(draining) 시간**을 30초로. 기본값은 300초(5분)인데, 30초로 줄여서 배포를 빠르게 했다("Short = faster deploys"). 트레이드오프: 너무 짧으면 처리 중이던 긴 요청이 잘릴 수 있다.

**(c) 왜 이렇게 했나** — 헬스체크의 진짜 의의는 **"무중단 배포의 안전장치"**다. 새 버전 task가 떠도 `/api/health`가 2번 연속 200을 줄 때까지는 트래픽을 안 보낸다. 즉 "앱이 완전히 부팅돼 DB 커넥션까지 잡았는지" 확인되기 전엔 사용자 요청이 안 들어간다. 또 26번 줄 주석이 중요한 연결을 짚는다: 이 `/api/health`는 **앱의 SecurityConfig가 인증 없이 공개 허용(permit-list)한 바로 그 엔드포인트**다. 헬스체크는 JWT 토큰을 안 들고 오니까, 그 경로가 인증에 막히면 ALB는 401을 받고 영원히 "이 task 아픔" 판정 → 트래픽이 0 → 사이트 전체 다운. 인프라와 앱 코드가 한 줄로 묶여 있는 대표 사례.

**(d) 흔한 함정**
- 헬스체크 경로에 인증을 걸어두면 **전 서비스가 죽는다**(위 설명). 신규 입사자가 "왜 배포했는데 503만 나오지?" 하면 십중팔구 이거.
- `matcher`를 200으로 고정해 놓고 앱이 헬스에서 204를 주면 계속 unhealthy.
- `interval`(30) < task 부팅 시간이면, 부팅 중 실패 카운트가 쌓여 새 task가 못 뜬다. 무거운 앱은 `health_check_grace_period`(ecs.tf 쪽)로 유예가 필요.

---

### 블록 3 — `aws_acm_certificate.api` (TLS 인증서, DNS 검증)

```hcl
resource "aws_acm_certificate" "api" {
  domain_name       = var.api_domain
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}
```

**(a) 뭘 만드나** — `api.mimi.daeseon.ai`에 대한 **무료 TLS 인증서**를 ACM에 발급 요청한다. 이게 있어야 브라우저 주소창에 자물쇠가 뜨고 "이 사이트는 진짜 그 도메인이 맞다"가 증명된다.

**(b) 인자 한 줄씩**
- `domain_name = var.api_domain` — 인증서가 보증할 도메인(`api.mimi.daeseon.ai`).
- `validation_method = "DNS"` — **도메인 소유 증명 방식**을 DNS로. ACM이 "이 도메인 네가 진짜 주인 맞아? 그럼 이 특정 CNAME 레코드를 너희 DNS에 넣어봐"라고 시키고, 그게 보이면 발급해 준다. 다른 방식으로 `"EMAIL"`이 있지만 자동화가 어려워 DNS가 표준.
- `lifecycle { create_before_destroy = true }` — Terraform 메타 인자. **새 인증서를 먼저 만들고 나서** 옛것을 지운다는 순서 지정. 인증서 교체 중에 listener가 참조할 인증서가 잠깐 사라지는 공백을 막는다(다운타임 방지).

**(c) 왜 이렇게 했나 — 여기가 이 파일에서 가장 헷갈리는 지점**. 40~44번 줄 주석이 핵심을 말한다. **우리 DNS는 Route53이 아니라 Cloudflare에 있다.** 그래서 Terraform이 "검증용 CNAME 레코드"를 자동으로 만들어 줄 수가 없다(권한이 Cloudflare 쪽에 있으니까). 그 대신 Terraform은 **필요한 레코드 값을 출력(output)만** 해준다 — `outputs.tf`의 `acm_validation_records`(실제 확인해 보니 복수형 `acm_validation_records`로, `aws_acm_certificate.api.domain_validation_options`를 순회해 뽑아낸다). 운영자가 그 값을 직접 Cloudflare 대시보드에 CNAME으로 붙여넣으면, ACM이 몇 분 안에 자동 발급하고, 그때부터 아래 443 listener가 유효한 인증서를 서빙하기 시작한다.

만약 DNS가 Route53이었다면 보통 `aws_acm_certificate_validation` + `aws_route53_record` 리소스를 추가해 **검증까지 전자동**으로 끝낸다. 이 파일에 그게 **없다는 사실 자체**가 "이 인프라는 DNS를 외부(Cloudflare)에 둔다"는 설계 결정의 증거다.

**(d) 흔한 함정**
- `apply` 직후 인증서는 `PENDING_VALIDATION` 상태로 멈춰 있다. **사람이 Cloudflare에 CNAME을 안 넣으면 영원히 발급 안 됨** → 443 listener도 못 뜬다. "terraform apply는 성공했는데 왜 HTTPS가 안 되지?"의 단골 원인.
- 검증 CNAME을 Cloudflare에서 **프록시(주황 구름) 켜진 상태**로 넣으면 ACM이 못 읽는다. **DNS-only(회색 구름)**로 넣어야 한다(outputs.tf 57번 줄도 "grey cloud"라고 명시).
- 리전 주의: ALB용 인증서는 **ALB와 같은 리전**의 ACM에 있어야 한다(CloudFront용은 us-east-1 고정이라는 규칙과 헷갈리면 안 됨).

---

### 블록 4 — `aws_lb_listener.http` (80번 → 443 강제 리다이렉트)

```hcl
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.main.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"
    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}
```

**(a) 뭘 만드나** — **리스너(listener)** = "ALB가 특정 포트에서 귀를 열고 들어오는 연결을 어떻게 처리할지 정하는 규칙". 이 리스너는 80번 포트(평문 HTTP)로 들어온 모든 요청을 **즉시 HTTPS로 돌려보낸다**.

**(b) 인자 한 줄씩**
- `load_balancer_arn = aws_lb.main.arn` — 이 리스너를 어느 ALB에 붙일지. **ARN(Amazon Resource Name, = AWS 리소스의 전역 고유 식별자)**.
- `port = 80`, `protocol = "HTTP"` — 평문 HTTP 80번을 듣는다.
- `default_action { type = "redirect" ... }` — 매칭되는 규칙이 따로 없을 때의 기본 동작. 여기선 무조건 리다이렉트.
- `redirect { port = "443", protocol = "HTTPS", status_code = "HTTP_301" }` — 443/HTTPS로 보내되 **301(영구 이동)** 상태코드로. 301이라 브라우저가 다음부터는 알아서 HTTPS로 먼저 시도(캐싱)한다.

**(c) 왜 이렇게 했나** — 55번 줄 주석: "so http:// links still work". 사용자가 `http://`로 들어오거나 옛 링크를 클릭해도 끊기지 않고 안전한 HTTPS로 자동 승격시키기 위함. 실무 보안 기본기.

**(d) 흔한 함정** — 80번 리스너가 아예 없으면 `http://` 접속은 그냥 **연결 거부**로 끝난다(에러 화면). 리다이렉트가 없는 것과 80을 안 여는 것은 다르다. 또 `aws_security_group.alb`에서 80이 인터넷에 열려 있어야 이 리다이렉트가 의미를 갖는다.

---

### 블록 5 — `aws_lb_listener.https` (443번 → TLS 종료 후 타깃 그룹으로 포워딩)

```hcl
resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.main.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"
  certificate_arn   = aws_acm_certificate.api.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backend.arn
  }
}
```

**(a) 뭘 만드나** — 이 파일의 클라이맥스. 443(HTTPS)으로 들어온 암호화 트래픽을 받아 **여기서 복호화(TLS 종료)**하고, 평문이 된 요청을 블록 2의 타깃 그룹(=Fargate task들)으로 흘려보낸다.

**(b) 인자 한 줄씩**
- `port = 443`, `protocol = "HTTPS"` — HTTPS 443을 듣는다.
- `ssl_policy = "ELBSecurityPolicy-TLS13-1-2-2021-06"` — **허용할 TLS 버전과 암호 스위트(cipher suite, = 암호화 알고리즘 묶음) 조합**을 정한 AWS 사전정의 정책. 이름 그대로 **TLS 1.2와 1.3만** 허용하는 현대적 정책. 1.0/1.1 같은 구식·취약 프로토콜을 차단해 보안 등급을 올린다.
- `certificate_arn = aws_acm_certificate.api.arn` — **블록 3에서 만든 그 인증서**를 여기 꽂는다. 이 한 줄이 블록 3과 5를 잇는 다리. 인증서가 아직 검증 안 돼 발급 전이면 이 리스너가 정상 동작하지 않는다.
- `default_action { type = "forward", target_group_arn = ... }` — 복호화한 요청을 블록 2의 타깃 그룹으로 **그대로 전달(forward)**.

**(c) 왜 이렇게 했나** — "TLS 종료를 ALB에서" 하는 이유: ① 인증서 관리를 ACM이 자동갱신해 줘서 앱은 인증서를 신경 안 써도 된다. ② 컨테이너는 평문 HTTP만 다루면 되니 앱 코드가 단순해진다(스프링에 SSL 설정 불필요). ③ 암복호화 CPU 부담을 매니지드 ALB가 떠안는다. 대가로 ALB→task 구간은 평문이지만, 그 구간은 우리 VPC 내부 + 보안 그룹으로 격리돼 있어 실무에서 허용 가능한 트레이드오프다.

**(d) 흔한 함정**
- `certificate_arn`이 가리키는 인증서가 `PENDING_VALIDATION`이면 HTTPS가 안 뜬다(블록 3 함정과 직결).
- 오래된 `ssl_policy`를 쓰면 보안 스캐너에서 TLS 1.0 취약점으로 잡힌다 — 그래서 굳이 최신 정책명을 박아둔 것.
- `forward` 대상 타깃 그룹이 비어 있거나(=등록된 task 0개) 전부 unhealthy면, 리스너는 멀쩡한데 사용자는 **503 Service Unavailable**을 본다. "ALB는 떴는데 503"이면 listener가 아니라 **타깃 그룹 헬스**를 봐야 한다.

---

### 옆 파일과의 연결 (한 줄씩)
- `security_groups = [aws_security_group.alb.id]` → 이 ALB의 방화벽은 **`security.tf`**에 정의. 거기서 fargate-sg가 "소스 = ALB의 SG"로 8080을 열어준다(CIDR가 아니라 SG를 소스로 지정 — security.tf 56번 줄).
- `subnets = aws_subnet.public[*].id` → 퍼블릭 서브넷은 **`network.tf`**에서 생성(AZ 2개 이상).
- `target_group_arn = aws_lb_target_group.backend.arn` → 이 타깃 그룹에 **task를 등록하는 쪽은 `ecs.tf`** (ecs.tf 96번 줄에서 ECS 서비스가 `load_balancer` 블록으로 자기 task를 이 그룹에 자동 등록).
- `aws_acm_certificate.api` 검증 레코드 → **`outputs.tf`의 `acm_validation_records`**로 출력돼, 운영자가 Cloudflare에 수동 입력.

---

### 면접 포인트

1. **"ALB에서 TLS 종료(termination)하면 ALB→백엔드 구간이 평문인데 괜찮나요?"**
   → 그 구간은 VPC 내부이고 보안 그룹으로 ALB의 SG에서 오는 트래픽만 허용해 격리돼 있어 일반적으로 허용한다. 더 엄격히 가려면 타깃 그룹 프로토콜을 HTTPS로 바꿔 **end-to-end 암호화(re-encryption)**를 한다 — 비용은 백엔드도 인증서를 들고 복호화 부담을 져야 한다는 점.

2. **"왜 타깃 그룹 `target_type`이 `ip`인가요? `instance`와 뭐가 다른가요?"**
   → Fargate는 awsvpc 모드라 task마다 ENI로 고유 IP를 받고 등록할 EC2 인스턴스가 없으므로 `ip`가 필수다. `instance`는 EC2 인스턴스 ID로 등록하는 방식으로, Fargate에선 쓸 수 없다.

(보너스) **"DNS 검증인데 왜 Terraform이 인증서 검증까지 자동으로 안 끝내나요?"** → DNS가 Route53이 아니라 Cloudflare라 Terraform이 검증 CNAME을 만들 권한이 없어, 레코드 값만 output으로 내보내고 사람이 Cloudflare에 회색 구름(DNS-only)으로 넣어야 발급이 완료된다.

---

## 12. ecs.tf

이 파일은 "컨테이너를 실제로 굴리는 곳"이다. 앞 파일들(VPC, 서브넷, 보안그룹, ALB)이 "땅과 배관"을 깔았다면, 여기서는 그 위에 **앱 컨테이너를 띄우고, 자동으로 N개 유지하고, 로드밸런서에 연결**한다. AWS의 컨테이너 오케스트레이터인 **ECS(Elastic Container Service = AWS가 컨테이너를 실행/관리해주는 서비스)** 위에서, 서버 관리가 필요 없는 **Fargate(=서버리스 컨테이너 실행 모드. EC2 가상머신을 직접 안 띄우고 컨테이너만 던지면 AWS가 알아서 굴려줌)** 를 쓴다.

ECS의 3대 개념을 음식점에 비유하면 이렇다:
- **Cluster(클러스터)**: 주방 전체. 컨테이너들이 도는 논리적 공간.
- **Task Definition(태스크 정의)**: 레시피. "이 이미지를, 이만큼의 CPU/메모리로, 이런 환경변수와 함께 띄워라"는 설계도. 그 자체로는 안 돌아간다.
- **Service(서비스)**: 매니저. "이 레시피로 만든 요리를 항상 N접시 유지하라"고 시키는 주체. 하나 죽으면 다시 띄운다.

파일 맨 위 주석(1~2번 줄)이 이 셋을 정확히 요약한다: `the cluster, the task definition (the "recipe" for a container), and the service (which keeps N copies of that recipe running and registered with the ALB)`.

---

### (1) `aws_cloudwatch_log_group "backend"` — 로그가 흘러가는 곳 (6~9번 줄)

```hcl
resource "aws_cloudwatch_log_group" "backend" {
  name              = "/ecs/${var.project}"
  retention_in_days = 14
}
```

**(a) 뭘 만드나**: **CloudWatch(=AWS의 모니터링/로그 수집 서비스)** 안에 **로그 그룹(Log Group = 로그를 담는 폴더 같은 단위)** 을 하나 만든다. 컨테이너가 표준출력(stdout)/표준에러(stderr)로 뱉는 모든 글자가 여기로 흘러든다.

**(b) 인자**:
- `name = "/ecs/${var.project}"` — 로그 그룹 이름. `${var.project}`는 **변수 보간(interpolation = 변수 값을 문자열에 끼워넣기)**. `/ecs/`로 시작하는 건 단지 관례적 네이밍이다(슬래시로 계층 흉내). 아래 task definition의 `awslogs-group`이 **바로 이 name을 참조**한다(71번 줄).
- `retention_in_days = 14` — 로그를 14일만 보관하고 자동 삭제. **이걸 안 적으면 기본값이 "절대 만료 안 함(never expire)"** 이라 로그가 무한정 쌓이고 요금이 슬금슬금 오른다. 학습/소규모 운영에서 14일은 합리적인 절약.

**(c) 왜**: 주석대로 `this is how you read what the app printed when it misbehaves` — 컨테이너는 SSH로 못 들어가는 게 기본이라(Fargate는 호스트 접근이 없음), 앱이 죽으면 **로그가 거의 유일한 단서**다. 로그 그룹을 미리 만들어 두는 이유는 아래 컨테이너의 `awslogs` 드라이버가 출력을 쏠 **목적지가 있어야** 하기 때문.

**(d) 함정**: `awslogs` 드라이버는 로그 그룹이 없으면 보통 컨테이너 기동 자체가 실패한다(권한에 자동생성이 없으면). 그래서 Terraform으로 명시 생성하는 게 안전하다. 또 흔한 오해 — `retention_in_days`를 줄여도 **이미 쌓인 로그는 다음 만료 사이클까지 안 줄어든다**.

---

### (2) `aws_ecs_cluster "main"` — 주방 (11~17번 줄)

```hcl
resource "aws_ecs_cluster" "main" {
  name = "${var.project}-cluster"
  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}
```

**(a) 뭘 만드나**: ECS 클러스터. 컨테이너(태스크)들이 소속될 논리적 그룹. Fargate에서는 클러스터가 거의 "이름표 + 설정 묶음"에 가깝다(EC2 모드와 달리 우리가 관리할 물리 노드가 없음).

**(b) 인자**:
- `name = "${var.project}-cluster"` — 클러스터 이름.
- `setting { name = "containerInsights" value = "enabled" }` — **Container Insights(=ECS 태스크의 CPU/메모리/네트워크 등 세부 지표를 자동 수집해 CloudWatch 대시보드로 보여주는 기능)** 켜기. `setting`이 **중첩 블록(nested block = 리소스 안에 또 다른 설정 묶음)** 인 점에 주목 — `=`로 바로 대입하는 인자가 아니라 블록 형태다.

**(c) 왜**: 주석이 솔직하다 — `extra CPU/memory metrics; small cost, worth it while learning`. 배우는 단계에선 "내 컨테이너가 메모리를 얼마나 먹나, CPU가 터졌나"를 눈으로 보는 게 디버깅에 큰 도움이라, 약간의 추가 비용을 감수하고 켰다.

**(d) 함정**: Container Insights는 **공짜가 아니다**(지표 수집/저장에 과금). 트래픽이 커지면 비용이 무시 못 할 수 있으니, 비용 민감해지면 끄는 걸 고려. 또 클러스터에는 보통 비용이 거의 없지만, "클러스터를 만들면 뭔가 항상 돌아서 돈이 나간다"는 오해는 틀리다 — **돈은 그 안에서 도는 Fargate 태스크가 먹는다**.

---

### (3) `locals` 블록 — 환경변수와 시크릿을 미리 조립 (19~46번 줄)

`locals`는 **로컬 변수(=이 모듈 안에서만 쓰는 계산된 값. 입력 변수 var와 달리 외부에서 못 바꿈)** 를 정의한다. 여기서 컨테이너에 넣을 환경변수/시크릿 리스트를 미리 만들어 두는 이유는 주석대로 `so the jsonencode below stays readable` — 아래 task definition의 JSON이 너무 길어지지 않게 분리한 것이다.

**환경변수 (`container_environment`, 21~32번 줄)** — 민감하지 않은 평문 설정:
- `{ name = "SPRING_PROFILES_ACTIVE", value = "prod" }` — Spring Boot에게 "prod 프로필로 떠라"고 지시. 백엔드가 Spring이라는 강한 단서.
- `RECORDING_STORAGE = "s3"`, `RECORDING_S3_BUCKET = aws_s3_bucket.recordings.bucket` — 녹음 파일을 로컬 디스크가 아니라 **S3(=AWS의 객체 저장소)** 에 저장. 버킷 이름을 **다른 리소스에서 참조**(`aws_s3_bucket.recordings.bucket`)해서, 버킷 이름이 바뀌어도 자동 연결된다. → 이 값이 s3.tf와 연결되는 지점.
- `AWS_REGION = var.aws_region` — 앱이 SDK로 AWS를 호출할 때 쓸 리전.
- `DATABASE_USERNAME = var.db_username` — DB 사용자명(비밀번호는 아래 시크릿으로 분리).
- `AI_PROVIDER = var.ai_provider` — 어떤 AI 제공자를 쓸지 토글.
- `RATE_LIMIT_TRUSTED_PROXIES = var.vpc_cidr` — **여기가 보안상 핵심.** 주석: `Trust X-Forwarded-For only from inside the VPC (the ALB)`. **X-Forwarded-For(=프록시/로드밸런서가 "원래 클라이언트 IP는 이거였다"고 덧붙이는 HTTP 헤더)** 는 클라이언트가 직접 위조할 수 있다. ALB를 거치면 ALB가 진짜 IP를 이 헤더에 채워주는데, **VPC 내부(=ALB) IP 범위에서 온 헤더만 신뢰**하도록 `var.vpc_cidr`(**CIDR = IP 범위 표기법, 예: 10.0.0.0/16은 약 6.5만 개 IP**)를 넘긴다. 이렇게 안 하면 외부인이 헤더를 위조해 **IP별 rate limit(요청 횟수 제한)을 우회**할 수 있다.
- `CORS_ALLOWED_ORIGINS = var.cors_allowed_origins` — **CORS(=다른 도메인에서 오는 브라우저 요청을 허용할지 결정하는 정책)** 에서 허용할 출처 목록.

**시크릿 (`base_secrets`, 35~40번 줄)** — 절대 평문으로 두면 안 되는 값:
```hcl
{ name = "DATABASE_URL", valueFrom = aws_secretsmanager_secret.database_url.arn },
{ name = "DATABASE_PASSWORD", valueFrom = aws_secretsmanager_secret.database_password.arn },
{ name = "JWT_SECRET", valueFrom = aws_secretsmanager_secret.jwt_secret.arn },
{ name = "GEMINI_API_KEY", valueFrom = aws_secretsmanager_secret.gemini_api_key.arn },
```
환경변수는 `value`(평문)인데, 시크릿은 `valueFrom`(=값 자체가 아니라 **그 값이 들어있는 Secrets Manager 항목의 ARN**)인 게 결정적 차이. **ARN(=Amazon Resource Name, AWS 리소스의 전역 고유 주소)** 만 정의에 적히고, 주석대로 `value is fetched by the execution role at launch` — **실제 비밀값은 task definition에 안 박히고, 컨테이너 뜰 때 실행 역할이 가져온다**. 그래서 Terraform state나 task definition을 봐도 비밀번호 평문이 노출되지 않는다. **AWS Secrets Manager(=비밀번호/키를 암호화 저장하고 접근을 IAM으로 통제하는 서비스)**.

**선택적 시크릿 (`optional_secrets`, 41~44번 줄)** — 조건부로 켜지는 것:
```hcl
optional_secrets = concat(
  [for s in aws_secretsmanager_secret.anthropic_api_key : { name = "ANTHROPIC_API_KEY", valueFrom = s.arn }],
  [for s in aws_secretsmanager_secret.billing_webhook_secret : { name = "BILLING_WEBHOOK_SECRET", valueFrom = s.arn }],
)
```
- `[for s in ... : {...}]` 는 **for 표현식(=리스트를 순회해 새 리스트를 만드는 Terraform 문법)**. 여기서 핵심 트릭은 `aws_secretsmanager_secret.anthropic_api_key`가 아마 **`count` 또는 `for_each`로 0개 혹은 1개 생성**되는 리소스라는 점이다. 그 시크릿이 **안 만들어졌으면 빈 리스트라 환경에 안 들어가고**, 만들어졌으면 1개짜리 리스트가 되어 들어간다. 즉 "Anthropic 키를 설정한 사람만 그 시크릿이 컨테이너에 주입"되는 **선택적 기능 토글**이다.
- `concat(...)` 은 여러 리스트를 이어붙이는 함수.
- 45번 줄 `container_secrets = concat(local.base_secrets, local.optional_secrets)` — 필수 + 선택을 합쳐 최종 시크릿 리스트 완성.

**(c) 왜 locals로 뺐나**: jsonencode 안에 다 인라인하면 한 화면을 넘기는 거대한 JSON이 되어 읽기 힘들다. 의미 단위(평문 환경변수 / 필수 시크릿 / 선택 시크릿)로 쪼개 가독성을 확보.

**(d) 함정**: 환경변수에 비밀번호를 넣는 건 흔한 실수다 — `aws ecs describe-task-definition` 한 방이면 평문이 노출된다. 그래서 비밀은 반드시 `secrets`(valueFrom) 경로로. 또 `optional_secrets`의 for 표현식은 **참조하는 리소스가 count/for_each 기반이 아니면 문법이 깨진다** — 단일 리소스는 리스트가 아니라서 `for s in` 으로 못 돈다.

---

### (4) `aws_ecs_task_definition "backend"` — 레시피 (48~78번 줄)

**(a) 뭘 만드나**: 컨테이너 실행 설계도. 어떤 이미지를, 얼마의 자원으로, 어떤 네트워크/역할/로그 설정으로 띄울지 전부 여기 적는다. **이 리소스 자체는 컨테이너를 실행하지 않는다** — 아래 Service가 이 레시피를 보고 실제로 띄운다.

**상단 인자 (49~56번 줄)**:
- `family = var.project` — 태스크 정의의 **패밀리(=같은 정의의 버전 묶음 이름)**. 같은 family에 새 정의를 등록하면 revision 번호가 1, 2, 3... 올라간다. 나중에 CI가 새 이미지로 revision을 계속 찍는 게 이 family다.
- `requires_compatibilities = ["FARGATE"]` — 이 정의는 Fargate에서 돌 수 있어야 한다고 선언.
- `network_mode = "awsvpc"` — 주석: `each task gets its own ENI/IP — required for Fargate`. **awsvpc(=각 태스크에 전용 네트워크 인터페이스를 붙여 VPC 안의 독립된 IP를 주는 네트워크 모드)**. **ENI(=Elastic Network Interface, EC2/태스크에 붙는 가상 랜카드)**. Fargate는 이 모드만 쓴다 — 그래서 각 컨테이너가 마치 작은 가상머신처럼 자기 IP와 자기 보안그룹을 갖는다. → 이 덕분에 아래 service에서 보안그룹(`fargate-sg`)을 태스크에 직접 붙일 수 있다.
- `cpu = var.container_cpu`, `memory = var.container_memory` — 태스크 단위 자원. Fargate는 **CPU/메모리 조합이 정해진 표에서만 고를 수 있다**(예: 256 CPU=0.25 vCPU엔 512/1024/2048 MB만). 변수로 빼서 환경별 조정 가능.
- `execution_role_arn = aws_iam_role.ecs_execution.arn` — 주석: `pulls image + reads secrets + writes logs`. **실행 역할(execution role = ECS 인프라가 "컨테이너를 띄우기 위해" 쓰는 권한)**. ECR에서 이미지 당기기, Secrets Manager에서 비밀 읽기, CloudWatch에 로그 쓰기. **앱 코드가 아니라 ECS 자체가 쓰는 권한**.
- `task_role_arn = aws_iam_role.task.arn` — 주석: `the app's own AWS permissions (S3)`. **태스크 역할(task role = 컨테이너 안의 앱 코드가 AWS SDK로 호출할 때 쓰는 권한)**. 여기선 S3 녹음 업로드용. → 이 둘의 분리가 IAM 설계의 정석이다(iam.tf와 연결).

**`container_definitions` (58~77번 줄)** — `jsonencode([...])`로 컨테이너 배열을 JSON 문자열로 만든다. ECS API가 이 필드를 JSON 문자열로 받기 때문에 HCL 객체를 `jsonencode`로 직렬화한다.
- `name = "backend"` — 주석: `must match the load_balancer.container_name in the service + deploy.yml`. **이 이름은 세 군데(여기, 아래 service의 `container_name`, CI의 deploy.yml)가 정확히 일치해야** 트래픽이 흐른다. 안 맞으면 "어느 컨테이너로 보내야 할지 모름" 에러.
- `image = "${aws_ecr_repository.backend.repository_url}:${var.image_tag}"` — **ECR(=AWS의 도커 이미지 저장소) 리포지토리 URL + 태그**. `:${var.image_tag}`가 버전 태그. → ecr.tf와 연결.
- `essential = true` — **필수 컨테이너(=이게 죽으면 태스크 전체를 죽임)**. 단일 컨테이너 태스크라 당연히 true.
- `portMappings = [{ containerPort = var.container_port, protocol = "tcp" }]` — 컨테이너가 **리슨하는 포트**(예: 8080). awsvpc 모드라 호스트 포트 매핑이 없고 컨테이너 포트가 곧 태스크 IP의 포트가 된다. ALB 타겟그룹이 이 포트로 헬스체크/트래픽을 보낸다.
- `environment = local.container_environment`, `secrets = local.container_secrets` — 위 locals에서 조립한 것을 주입.
- `logConfiguration` — `logDriver = "awslogs"`로 stdout/stderr를 CloudWatch로. `awslogs-group`이 (1)에서 만든 로그 그룹을 참조(`aws_cloudwatch_log_group.backend.name`), `awslogs-stream-prefix = "backend"`는 로그 스트림 이름 앞에 붙는 접두사.

**(c) 왜**: 모든 런타임 설정(자원/네트워크/권한/로그/시크릿)을 한 곳에 선언해, 컨테이너가 **재현 가능하고 불변(immutable)** 하게 뜨도록. 새 배포는 "이 정의의 새 revision"으로 표현된다.

**(d) 함정**:
- `cpu`/`memory`를 표에 없는 조합으로 넣으면 등록이 거부된다.
- `container_definitions`는 HCL 맵이 아니라 **JSON 문자열**이라 `jsonencode`가 필수. 빼먹으면 타입 에러.
- 가장 흔한 운영 함정: `container_name` 불일치로 ALB 등록 실패 → 헬스체크 끝없이 실패.

---

### (5) `aws_ecs_service "backend"` — 매니저 (80~115번 줄)

**(a) 뭘 만드나**: 레시피(task definition)를 받아 **항상 `desired_count`개의 태스크를 살아있게 유지**하고, 각 태스크를 ALB 타겟그룹에 자동 등록/해제하는 컨트롤러.

**상단 인자 (81~85번 줄)**:
- `cluster = aws_ecs_cluster.main.id` — (2)에서 만든 클러스터에 소속.
- `task_definition = aws_ecs_task_definition.backend.arn` — **최초엔** (4)의 정의로 시작(단, 아래 lifecycle 때문에 이후엔 Terraform이 관여 안 함).
- `desired_count = var.desired_count` — 유지할 태스크 수. 하나 죽으면 새로 띄워 이 수를 맞춘다.
- `launch_type = "FARGATE"` — EC2 안 쓰고 Fargate로.

**`network_configuration` (89~93번 줄)**:
```hcl
subnets          = aws_subnet.public[*].id
security_groups  = [aws_security_group.fargate.id]
assign_public_ip = true
```
- 주석이 중요한 트레이드오프를 설명한다: `Run in PUBLIC subnets with a public IP so the task can pull from ECR + read Secrets without a NAT gateway`. **퍼블릭 서브넷(=인터넷 게이트웨이로 바로 나갈 수 있는 서브넷)** 에 두고 공인 IP를 줘서, ECR 이미지 당기기와 Secrets Manager 읽기가 인터넷으로 나간다. 이렇게 한 이유는 **NAT 게이트웨이(=프라이빗 서브넷의 자원이 인터넷으로 나가게 해주는 유료 장비, 시간당+데이터당 과금)** 를 안 쓰려고 — NAT는 꽤 비싸다.
- `aws_subnet.public[*].id` — `[*]`는 **splat 표현식(=리스트형 리소스의 모든 원소에서 특정 속성을 뽑아 리스트로)**. 즉 모든 퍼블릭 서브넷 ID 리스트. → vpc.tf의 서브넷과 연결.
- `security_groups = [aws_security_group.fargate.id]` — 태스크에 붙는 보안그룹. 주석: `the fargate-sg still blocks all inbound except 8080-from-ALB, so it's not exposed`. **공인 IP가 있어도 인바운드는 ALB에서 오는 8080만 허용**하므로 외부에 노출되지 않는다. "공인 IP = 위험"이 아니라, **인바운드 차단이 진짜 방어선**임을 보여주는 좋은 예. → security_groups.tf와 연결.
- `assign_public_ip = true` — 공인 IP 부여(인터넷 나가기용).

**`load_balancer` (95~99번 줄)**:
```hcl
target_group_arn = aws_lb_target_group.backend.arn
container_name   = "backend"
container_port   = var.container_port
```
- 서비스가 띄우는 태스크들을 **ALB 타겟그룹(=ALB가 트래픽을 분배할 대상 묶음)** 에 자동 등록. `container_name = "backend"`는 (4)의 컨테이너 이름과 **정확히 일치**해야 한다. → alb.tf의 타겟그룹과 연결.

**`health_check_grace_period_seconds = 120` (101~102번 줄)**: 주석: `Spring Boot takes ~30-60s to boot; don't let the ALB kill the task as "unhealthy" before then`. **헬스체크 유예 기간(=태스크가 막 떴을 때 헬스체크 실패를 봐주는 시간)**. Spring 부팅이 느려서 이 유예가 없으면 ALB가 "안 떴네" 하고 죽이고, 또 띄우고, 또 죽이는 **크래시 루프(crash loop)** 에 빠진다. 120초로 충분히 줬다.

**`depends_on = [aws_lb_listener.https]` (104~105번 줄)**: 주석: `Don't create the service until the HTTPS listener exists`. **명시적 의존성(=Terraform에게 "이게 먼저 만들어진 뒤에 나를 만들어라"고 강제)**. 보통 Terraform은 참조 관계로 순서를 알아서 잡지만, 리스너처럼 직접 참조가 없는 경우 `depends_on`으로 못 박는다. 리스너가 없으면 서비스가 태스크를 타겟그룹에 등록할 준비가 안 된 상태일 수 있다.

**`lifecycle { ignore_changes = [task_definition, desired_count] }` (107~114번 줄)** — 이 파일의 하이라이트:
주석이 전부 설명한다 — `Terraform creates the service ONCE. After that, the GitHub Actions workflow registers new task-definition revisions and updates the service on each push. If Terraform also managed task_definition, every terraform apply would fight CI and roll the service back to the old image.`

- **누가 배포를 소유하는가의 문제**다. Terraform은 인프라(클러스터/네트워크/역할/ALB)를 소유하고, **실제로 도는 이미지와 스케일은 CI(GitHub Actions)가 소유**한다.
- `ignore_changes = [task_definition, desired_count]` — **드리프트 무시 설정(=실제 값이 코드와 달라져도 Terraform이 되돌리지 않게 함)**. CI가 새 이미지로 task_definition revision을 바꾸고 desired_count로 스케일을 바꿔도, 다음 `terraform apply`가 그걸 **옛날 값으로 롤백하지 않는다**.
- 이게 없으면: CI가 v2 이미지로 배포 → 누군가 `terraform apply` → Terraform이 "내 코드엔 v1인데?" 하며 **v1으로 되돌림** → 방금 한 배포가 날아감. 이 충돌(Terraform vs CI 줄다리기)을 막는 게 핵심.

**(c) 왜 Service가 따로 필요한가**: task definition만으론 "한 번 띄움"도 안 된다. Service가 있어야 "지속적으로 N개 유지 + ALB 등록 + 죽으면 부활 + 무중단 롤링 배포"가 된다.

**(d) 함정**:
- `ignore_changes`를 안 걸면 위에서 말한 CI-Terraform 롤백 충돌이 실제로 자주 터진다. GitOps/CI 배포 패턴의 **필수 관용구**.
- 퍼블릭 서브넷 + 공인 IP를 보고 "보안 구멍"이라 오해하기 쉽지만, 진짜 방어는 보안그룹 인바운드 규칙이다. 다만 더 엄격한 환경이라면 프라이빗 서브넷 + NAT 또는 **VPC 엔드포인트(=인터넷 안 거치고 ECR/Secrets에 사설로 접근하는 통로)** 를 쓰는 게 정석. 여기선 비용 때문에 의도적으로 타협했고, 그걸 주석에 명시한 게 모범적이다.
- `desired_count`를 0으로 두고 비용 아끼려다 lifecycle ignore에 걸려 헷갈리는 경우 — 이제 그 값은 CI/콘솔에서 바꿔야지 Terraform으로는 안 바뀐다.

---

### 옆 파일과의 연결 요약
- **vpc.tf**: `aws_subnet.public[*].id`로 서브넷을 가져옴.
- **security_groups.tf**: `aws_security_group.fargate.id`를 태스크에 붙임("8080-from-ALB만 허용").
- **alb.tf**: `aws_lb_target_group.backend`에 태스크 등록, `aws_lb_listener.https`에 depends_on.
- **iam.tf**: `ecs_execution`(인프라용) / `task`(앱용) 두 역할을 참조.
- **secrets.tf**: `aws_secretsmanager_secret.*`의 ARN을 시크릿으로 주입.
- **s3.tf / ecr.tf**: 녹음 버킷 이름, 컨테이너 이미지 URL 참조.

---

### 면접 포인트

**Q1. ECS Task Definition의 execution role과 task role의 차이는?**
A. execution role은 **ECS 인프라가 컨테이너를 띄우기 위해** 쓰는 권한(ECR 이미지 pull, Secrets Manager 읽기, CloudWatch 로그 쓰기)이고, task role은 **컨테이너 안의 앱 코드가 런타임에 AWS SDK로** 쓰는 권한(예: S3 업로드)이다. 이 파일에서도 `execution_role_arn`(이미지+시크릿+로그)과 `task_role_arn`(S3)으로 명확히 분리돼 있다.

**Q2. ECS Service에 `lifecycle { ignore_changes = [task_definition] }`를 거는 이유는?**
A. 배포 소유권을 분리하기 위해서다. Terraform은 서비스를 **최초 1회만** 만들고, 이후 실제 이미지 배포는 CI(GitHub Actions)가 새 task-definition revision으로 한다. 이걸 ignore 안 하면 `terraform apply`가 CI가 올린 새 이미지를 Terraform 코드의 옛 이미지로 **롤백**해버려 Terraform과 CI가 충돌한다. "Terraform은 인프라를, CI는 굴러가는 이미지/스케일을 소유"하는 경계를 코드로 표현한 것.

**Q3 (보너스). Fargate에서 network_mode가 awsvpc로 고정인 이유는?**
A. Fargate는 각 태스크에 전용 ENI와 VPC 내 독립 IP를 부여하는데, 이를 가능케 하는 모드가 awsvpc뿐이라서다. 덕분에 태스크 단위로 보안그룹을 붙일 수 있고(여기선 fargate-sg), 호스트 포트 매핑 없이 컨테이너 포트가 곧 태스크 IP의 포트가 된다.

---

## 13. outputs.tf

### 0. 이 파일이 통째로 무슨 역할인가

먼저 큰 그림. Terraform(=인프라를 코드로 정의하는 도구. AWS 콘솔에서 클릭 대신 `.tf` 파일에 "이런 자원 만들어줘"라고 적으면 그대로 생성됨)에는 파일 종류가 세 가지 역할로 나뉜다고 보면 쉽다.

- **입력(`variables.tf`)**: 내가 Terraform에게 넘기는 값 (도메인 이름, 인스턴스 크기 등).
- **본체(`alb.tf`, `rds.tf`, `ecs.tf`...)**: 실제로 만들 자원 정의.
- **출력(`outputs.tf` ← 지금 이 파일)**: 다 만들고 나서 Terraform이 나에게 돌려주는 값.

즉 `outputs.tf`는 **자원을 만들지 않는다.** 식당으로 비유하면, 주방(다른 `.tf` 파일들)이 요리를 다 했고, 이 파일은 "영수증"이다. 손님이 가져가야 할 정보 — "당신 테이블 번호는 7번, 주차권은 이거, 다음에 오면 이 쿠폰 쓰세요" — 를 정리해서 출력해 준다. 파일 맨 위 주석이 정확히 그 의도를 말한다.

```hcl
# outputs.tf — the values you need AFTER `terraform apply`, printed to the terminal.
# Re-print anytime with `terraform output` (or `terraform output -raw <name>` for one value).
```

용어 정리부터.
- **`terraform apply`** = `.tf`에 적힌 대로 실제 AWS 자원을 생성/변경하는 명령. 이게 끝나면 터미널에 `outputs.tf`의 값들이 쭉 찍힌다.
- **`terraform output`** = apply 이후 언제든 그 값들을 **다시** 보여주는 명령. apply 로그를 스크롤백 안 해도 됨. 값은 `terraform.tfstate`(=Terraform이 "지금 실제로 뭐가 만들어져 있는지" 기록해 둔 상태 파일)에 저장돼 있어서 꺼내 보는 것.
- **`terraform output -raw <name>`** = 값 하나만, 따옴표/줄바꿈 없이 날것(raw)으로 출력. 스크립트에서 `URL=$(terraform output -raw rds_endpoint)` 처럼 변수에 바로 담을 때 쓴다. `-raw` 없으면 `"..."` 따옴표가 붙어서 그대로 쓰면 깨진다 — 이게 초보가 자주 밟는 함정.

**output 블록의 문법**은 단순하다. 매 블록이 똑같은 모양이다.

```hcl
output "<이름>" {
  description = "사람용 설명"
  value       = <어떤 자원의 어떤 속성>
}
```

- `output "이름"` : 이 출력값의 키. `terraform output 이름`으로 호출.
- `description` : 사람이 읽는 메모. 동작에는 영향 0. 하지만 이 파일은 description을 "다음에 뭘 해야 하는지" 매뉴얼로 활용한다 — 아주 좋은 습관.
- `value` : 진짜 알맹이. **다른 `.tf` 파일에서 만든 자원의 속성을 참조**한다. 이게 핵심이다. output은 새 값을 만드는 게 아니라 이미 만들어진 자원에서 값을 **꺼내 오는** 것뿐이다.

---

### 1. `alb_dns_name` — 우리 API 서버의 진짜 주소

```hcl
output "alb_dns_name" {
  description = "Point your API domain at this. In Cloudflare add a CNAME: api -> this value (DNS-only / grey cloud, NOT proxied — an ALB already does TLS)."
  value       = aws_lb.main.dns_name
}
```

- **(a) 뭘 출력하나**: ALB의 자동 생성 주소. ALB(=Application Load Balancer, AWS의 로드밸런서. 외부 요청을 받아 뒤쪽 여러 서버로 분산해 주는 입구)는 만들면 AWS가 `xxx-123456.ap-northeast-2.elb.amazonaws.com` 같은 긴 DNS 이름을 준다. 그 이름이 여기 담긴다.
- **(b) `value = aws_lb.main.dns_name`**: `alb.tf`의 8번째 줄 `resource "aws_lb" "main"`이 만든 로드밸런서의 `dns_name` 속성을 읽는다. 문법은 항상 `<리소스타입>.<이름>.<속성>` — 여기선 `aws_lb`(타입) `.main`(이름) `.dns_name`(속성).
- **(c) 왜**: ALB 주소는 매번 바뀔 수 있고 사람이 외우기 흉하다. 그래서 내 도메인(`api.tubeshadow.com`)을 이 주소로 **가리키게(CNAME)** 만들어야 한다. CNAME(=Canonical Name 레코드, "이 도메인은 사실 저 도메인의 별명이다"라고 DNS에 적는 것)을 Cloudflare에 추가하라는 안내가 description이다.
- **(d) 함정**: description의 "**DNS-only / grey cloud, NOT proxied**"가 핵심 경고다. Cloudflare(=DNS + CDN/프록시 서비스)에서 레코드를 추가할 때 주황색 구름(proxied) 아이콘이 기본인데, 그러면 Cloudflare가 트래픽을 자기 서버로 한 번 받아 우리 ALB로 넘긴다. 그런데 **ALB가 이미 TLS(=HTTPS 암호화. 자물쇠)를 처리**하므로(아래 `acm_validation_records`로 받은 인증서로) 프록시를 켜면 TLS가 이중으로 꼬여 에러가 난다. 그래서 회색 구름(DNS-only, 그냥 주소만 알려주고 빠지는 모드)으로 두라는 것.

옆 파일 연결: `value`가 `alb.tf`의 `aws_lb.main`을 직접 참조한다. ALB를 못 만들면 이 output도 못 나온다.

---

### 2. `acm_validation_records` — TLS 인증서를 발급받기 위한 "본인 확인" 레코드

```hcl
output "acm_validation_records" {
  description = "Add THESE CNAME records in Cloudflare so ACM can validate + issue the TLS cert. After they propagate, the cert auto-issues in a few minutes."
  value = [
    for o in aws_acm_certificate.api.domain_validation_options : {
      name  = o.resource_record_name
      type  = o.resource_record_type
      value = o.resource_record_value
    }
  ]
}
```

이 블록은 지금까지와 달리 `value`가 단순 한 줄이 아니라 **반복문**이다. 천천히 풀자.

- **(a) 뭘 출력하나**: ACM(=AWS Certificate Manager, 무료로 TLS 인증서를 발급/갱신해 주는 서비스)이 "정말 이 도메인 주인 맞아?"를 확인하기 위해 요구하는 DNS 레코드 목록. 이걸 Cloudflare에 넣어 줘야 인증서가 발급된다.
- **(b) 반복문 해부**:
  - `aws_acm_certificate.api.domain_validation_options` : `alb.tf` 45번째 줄 `resource "aws_acm_certificate" "api"`가 만든 인증서 요청. 그 안의 `domain_validation_options`는 "이 도메인 검증하려면 이런 레코드를 넣어라" 정보가 들어 있는 **목록(set/list)**이다.
  - `for o in ... : { ... }` : Terraform의 **for 표현식**(=리스트를 돌면서 새 리스트를 만드는 문법, 파이썬 리스트 컴프리헨션과 똑같음). 각 항목 `o`에서 필요한 세 필드만 뽑아 깔끔한 객체로 재구성한다.
  - `name = o.resource_record_name` : 검증용 CNAME 레코드의 **이름**(어디에 넣을지).
  - `type = o.resource_record_type` : 레코드 **타입** (보통 `CNAME`).
  - `value = o.resource_record_value` : 레코드가 **가리킬 값** (AWS가 준 검증 토큰).
- **(c) 왜 for로 가공하나**: `domain_validation_options` 원본에는 우리가 안 쓰는 필드가 더 붙어 있어 그대로 출력하면 지저분하다. for로 "이름·타입·값" 세 개만 추려서 사람이 그대로 복붙하기 좋은 표로 만든 것. 또 도메인이 여러 개면 검증 레코드도 여러 개라서 **리스트**로 받는 게 맞다(그래서 `[ ]`로 감쌌다).
- **(d) 함정**: ACM의 DNS 검증은 "레코드를 넣고 → DNS가 전 세계에 퍼지길(propagate) 기다리고 → ACM이 주기적으로 확인"하는 비동기 과정이다. description의 "**After they propagate ... in a few minutes**"가 그 뜻. 레코드를 넣자마자 인증서가 안 나온다고 당황하지 말 것. 또 이 검증 CNAME은 인증서가 살아 있는 동안 **지우면 안 된다** — ACM이 자동 갱신할 때 다시 확인하기 때문. 흔히 "발급 끝났으니 정리"하다 갱신이 깨진다.

옆 파일 연결: `alb.tf`의 `aws_acm_certificate.api`가 발급한 인증서를 ALB의 HTTPS 리스너가 사용한다. 즉 이 output → Cloudflare 입력 → 인증서 발급 → ALB가 그 인증서로 TLS 처리, 라는 사슬.

---

### 3. `api_domain` — 인증서/앱이 기대하는 공개 호스트명

```hcl
output "api_domain" {
  description = "The public hostname the cert is for / the app expects."
  value       = var.api_domain
}
```

- **(a)(b)**: `var.api_domain`을 그대로 되돌려준다. `var.X`는 `variables.tf`에 정의된 **입력 변수**를 읽는 것. 즉 내가 `terraform.tfvars`에 `api_domain = "api.tubeshadow.com"`이라고 넣은 그 값.
- **(c) 왜 입력을 다시 출력하나?**: 좀 이상해 보인다. 이미 내가 넣은 값인데 왜 돌려줄까? 이유는 **편의/일관성**이다. apply가 끝나고 `terraform output`만 봐도 "이 인프라가 어떤 도메인용으로 깔렸는지" 한눈에 확인할 수 있고, 다른 output들(아래 `next_steps`)이 이 값을 문장에 끼워 쓴다.
- **(d) 함정**: output에서 `aws_...`(자원 속성)와 `var.`(입력 변수)를 헷갈리지 말 것. 전자는 "AWS가 만들어 준 실제 값", 후자는 "내가 처음에 적어 넣은 값". 이건 후자라 apply 안 해도 이미 정해진 값이다.

---

### 4. `rds_endpoint` — DB 접속 주소 (디버깅용)

```hcl
output "rds_endpoint" {
  description = "The database hostname (private — only reachable from the app). Useful for debugging."
  value       = aws_db_instance.main.address
}
```

- **(a) 뭘**: RDS(=Relational Database Service, AWS가 관리해 주는 관계형 DB. 여기선 PostgreSQL) 인스턴스의 호스트명.
- **(b) `aws_db_instance.main.address`**: `rds.tf` 24번째 줄 `resource "aws_db_instance" "main"`의 `address` 속성. `address`는 순수 호스트명(`xxx.rds.amazonaws.com`)이고, 참고로 `endpoint`라는 속성을 쓰면 `호스트:포트`까지 붙어 나온다 — 여기선 호스트만 필요해 `address`를 골랐다.
- **(c) 왜 출력하나**: 평소엔 앱이 환경변수로 알아서 접속하니 사람이 볼 일이 없다. 하지만 "DB가 이상한데?" 싶을 때 접속 주소를 빠르게 확인하려는 **디버깅 편의**. description이 "Useful for debugging"이라고 명시.
- **(d) 함정**: description의 "**private — only reachable from the app**"이 중요하다. 이 RDS는 프라이빗 서브넷(=인터넷에서 직접 못 들어오는 내부 네트워크 구역)에 있어서, 이 주소를 알아도 **내 노트북에서 바로 `psql`로 접속이 안 된다.** ECS(앱) 컨테이너 안에서만 닿는다. 주소가 보인다고 "공개된" 게 아니다 — 주소를 아는 것과 네트워크가 뚫려 있는 건 별개. 보안그룹(SG)이 막고 있다(`security.tf`).

옆 파일 연결: `rds.tf`의 `aws_db_instance.main`을 참조. 실제 접속은 `ecs.tf`의 앱 컨테이너가 `secrets.tf`로 주입된 자격증명을 들고 이 주소로 붙는다.

---

### 5. `ecr_repository_url` — Docker 이미지 보관 창고 주소

```hcl
output "ecr_repository_url" {
  description = "Where CI pushes the image (and where ECS pulls it)."
  value       = aws_ecr_repository.backend.repository_url
}
```

- **(a) 뭘**: ECR(=Elastic Container Registry, AWS의 Docker 이미지 저장소. Docker Hub의 AWS 버전)의 저장소 URL.
- **(b) `aws_ecr_repository.backend.repository_url`**: `ecr.tf` 6번째 줄 `resource "aws_ecr_repository" "backend"`의 URL 속성. `1234567890.dkr.ecr.ap-northeast-2.amazonaws.com/tubeshadow-backend` 같은 모양.
- **(c) 왜**: 배포 파이프라인의 양쪽이 이 주소를 알아야 한다. description대로 "**CI가 이미지를 push**하고(=빌드한 도커 이미지를 여기 올림), **ECS가 그걸 pull**한다(=올라온 이미지를 내려받아 실행)". CI(=Continuous Integration, 여기선 GitHub Actions)가 `docker push <이 URL>:태그`를 할 때 필요.
- **(d) 함정**: `repository_url`에는 태그(`:latest` 등)가 안 붙어 있다. push할 땐 `<url>:<tag>` 형태로 태그를 직접 붙여야 한다. 또 push 전에 ECR 로그인(`aws ecr get-login-password | docker login ...`)이 필요 — 그냥 push하면 권한 거부된다.

옆 파일 연결: `ecr.tf`가 저장소를, `ecs.tf`가 이 이미지를 가져다 컨테이너로 띄운다. GitHub Actions 배포 워크플로(`deploy.yml`)가 이 URL로 push.

---

### 6. `recordings_bucket` — 사용자 녹음 파일 버킷

```hcl
output "recordings_bucket" {
  description = "The S3 bucket holding user recordings."
  value       = aws_s3_bucket.recordings.bucket
}
```

- **(a) 뭘**: S3(=Simple Storage Service, AWS의 파일 저장소. 무한 용량 클라우드 디스크) 버킷 이름. 이 앱은 쉐도잉 학습 도구라 사용자가 자기 발음을 녹음하는데, 그 음성 파일을 여기 보관.
- **(b) `aws_s3_bucket.recordings.bucket`**: `s3.tf` 6번째 줄 `resource "aws_s3_bucket" "recordings"`의 `.bucket` 속성 = 버킷의 **이름**. (참고: `.arn`이나 `.id`도 있는데, 앱은 보통 이름 문자열을 환경변수로 받아 SDK에 넘기므로 `.bucket`을 출력.)
- **(c) 왜**: 앱 코드가 "어느 버킷에 올릴지" 알아야 한다. 버킷 이름은 전 세계에서 유일해야 해서(S3 규칙) 보통 랜덤 접미사를 붙여 생성되므로, 만들어진 **실제 이름**을 output으로 확인해 환경변수에 넣는다.
- **(d) 함정**: `bucket`(이름)과 `arn`(=Amazon Resource Name, `arn:aws:s3:::이름` 형태의 전역 고유 식별자)을 혼동하기 쉽다. IAM 정책에는 ARN을, SDK 코드에는 보통 이름을 쓴다. 용도에 맞는 걸 골라야 함.

옆 파일 연결: `s3.tf`가 버킷을 만들고, `iam.tf`의 ECS 태스크 역할이 이 버킷에 쓰기 권한을 갖는다.

---

### 7. `github_deploy_role_arn` — GitHub Actions가 빌려 입는 역할

```hcl
output "github_deploy_role_arn" {
  description = "The role GitHub Actions assumes. The deploy workflow builds the ARN from AWS_ACCOUNT_ID; this is the full ARN for reference."
  value       = aws_iam_role.github_deploy.arn
}
```

- **(a) 뭘**: IAM 역할(=Identity and Access Management role, "특정 권한 묶음을 일시적으로 빌려 입는 신분")의 ARN. GitHub Actions가 배포할 때 이 역할을 **assume**(=잠깐 그 역할이 되어 권한을 빌림)한다.
- **(b) `aws_iam_role.github_deploy.arn`**: `iam.tf` 125번째 줄 `resource "aws_iam_role" "github_deploy"`의 ARN. `arn:aws:iam::123456789012:role/github-deploy` 모양.
- **(c) 왜 역할을 빌리는 구조인가**: 예전 방식은 AWS 액세스 키(=영구 비밀번호 같은 자격증명)를 GitHub 시크릿에 박아 뒀는데, 유출되면 위험하고 회전(교체)도 귀찮다. 대신 **OIDC(=OpenID Connect, GitHub가 "이 워크플로 진짜 우리 거 맞아"라고 서명한 임시 토큰을 발급)**로 이 역할을 잠깐 빌리면 영구 키가 아예 없다 — 훨씬 안전. 그 역할의 ARN이 이 output.
- **(d) 함정**: description이 "deploy workflow builds the ARN **from AWS_ACCOUNT_ID**; this is the full ARN **for reference**"라고 한다. 즉 워크플로는 실제론 아래 8번 `aws_account_id`만 시크릿으로 받아 ARN을 **조립**한다. 이 전체 ARN 출력은 사람이 눈으로 맞는지 대조하는 **참고용**이지, 이걸 시크릿에 넣으라는 게 아니다. 둘을 헷갈려 ARN 전체를 `AWS_ACCOUNT_ID`에 넣으면 깨진다.

옆 파일 연결: `iam.tf`의 OIDC 역할 정의 ↔ 리포의 `.github/workflows/deploy.yml`.

---

### 8. `aws_account_id` — GitHub 시크릿에 넣을 단 하나의 값

```hcl
output "aws_account_id" {
  description = "Set this as the GitHub Actions repo secret AWS_ACCOUNT_ID (deploy.yml uses it to build the role ARN)."
  value       = data.aws_caller_identity.current.account_id
}
```

- **(a) 뭘**: 내 AWS 계정의 12자리 숫자 ID.
- **(b) `data.aws_caller_identity.current.account_id`**: 여기서 `data.`로 시작하는 게 포인트. **data source**(=자원을 새로 만드는 게 아니라, 이미 존재하는 정보를 **조회**만 하는 블록)다. `providers.tf` 22번째 줄 `data "aws_caller_identity" "current" {}`가 "지금 Terraform을 실행 중인 이 자격증명은 누구인가?"를 AWS에 물어보고, 그 응답에서 `account_id`를 꺼낸다.
- **(c) 왜**: 7번에서 봤듯 배포 워크플로가 역할 ARN을 `arn:aws:iam::<여기에 계정ID>:role/...`로 조립한다. 그 조각이 계정 ID. 이걸 GitHub 리포 시크릿 `AWS_ACCOUNT_ID`에 넣으라는 게 description.
- **(d) 함정**: `resource`와 `data`의 차이를 꼭 이해할 것. `resource`는 만들고/지운다(destroy 대상). `data`는 읽기 전용이라 apply해도 아무것도 생성/삭제 안 된다. 계정 ID는 민감정보까진 아니지만(공개돼도 그 자체로 침입은 못 함), 그래도 시크릿으로 두는 게 관행.

옆 파일 연결: `providers.tf`의 data source ↔ `deploy.yml`의 `AWS_ACCOUNT_ID` 시크릿.

---

### 9. `next_steps` — apply 직후 손에 쥐는 체크리스트 (heredoc)

```hcl
output "next_steps" {
  description = "What to do after apply."
  value       = <<-EOT

    DONE provisioning. Now:
    1. Cloudflare DNS:
       - add the CNAME(s) in `acm_validation_records` (cert validation)
       - add CNAME: ${var.api_domain} -> ${aws_lb.main.dns_name}  (DNS-only / grey cloud)
    2. GitHub repo → Settings → Secrets → Actions: add AWS_ACCOUNT_ID = ${data.aws_caller_identity.current.account_id}
    3. Trigger the deploy workflow (push to ${var.github_branch}, or run it manually) to build + push
       the first image. The ECS service will go healthy once the image lands.
    4. Smoke test: curl https://${var.api_domain}/api/health   ->  {"data":{"status":"ok"}}
  EOT
}
```

이 블록이 가장 똑똑하다. 위 8개 output을 사람용 안내문 하나로 엮었다.

- **`<<-EOT ... EOT`**: heredoc(=여러 줄 문자열을 통째로 적는 문법). `EOT`는 시작/끝을 표시하는 임의의 단어(End Of Text의 약자, 아무 단어나 가능). `<<-`의 **하이픈(-)**이 중요한데, 들여쓰기된 본문의 **앞쪽 공백을 자동으로 떼어 준다**. 그래서 코드에선 보기 좋게 들여썼지만 실제 출력은 깔끔하게 정렬된다.
- **`${ ... }` 보간(interpolation)**: 문자열 안에 `${변수}`를 넣으면 그 값이 실제로 치환된다. 여기선 세 군데:
  - `${var.api_domain}` → 내 도메인.
  - `${aws_lb.main.dns_name}` → 1번에서 본 ALB 주소.
  - `${data.aws_caller_identity.current.account_id}` → 8번 계정 ID.
  - `${var.github_branch}` → `variables.tf`에 정의된 배포 트리거 브랜치.
  덕분에 apply가 끝나면 "add CNAME: **api.tubeshadow.com** -> **xxx.elb.amazonaws.com**"처럼 **실제 값이 박힌** 완성된 지시문이 출력된다. 복붙만 하면 됨.
- **(c) 왜**: 인프라를 깔아도 "그래서 이제 뭐 하지?"가 항상 문제다. 특히 DNS/시크릿 설정은 Terraform 밖(Cloudflare, GitHub)에서 사람이 손으로 해야 하는 일이라 자동화가 안 된다. 이걸 잊으면 ALB는 떴는데 도메인이 안 붙고, 배포는 권한 없어 실패한다. 그래서 **남은 수작업을 순서대로** 적어 마찰을 없앤 것 — 이 프로젝트의 NORTH STAR("기능 개수가 아니라 마찰 제거")와 정확히 맞는 설계다.
- **(d) 함정**: `${ }` 안에 들어간 자원(`aws_lb.main` 등)은 apply가 끝나야 값이 정해지므로, 이 텍스트도 **apply 완료 후에만** 완성된 형태로 보인다. plan 단계에선 `(known after apply)`로 뜬다 — 버그 아님.

---

### 면접 포인트

**Q1. Terraform output은 왜 쓰나? 그냥 콘솔에서 보면 안 되나?**
한 줄 답: output은 apply 결과 중 "사람이나 다른 시스템이 이어서 써야 하는 값"을 한 곳에 모아 재현 가능하게 노출하는 장치다. `terraform output -raw`로 CI 스크립트가 값을 받아 자동화하거나, 다른 Terraform이 `remote state`로 참조할 수 있어 콘솔 수동 확인보다 안전·자동화에 유리하다.

**Q2. `resource`, `data`, `var`, `output`의 차이는?**
한 줄 답: `var`는 내가 넣는 입력, `resource`는 새로 만들고 관리(생성·삭제)하는 자원, `data`는 이미 존재하는 정보를 읽기만 하는 조회(생성 안 함), `output`은 apply 후 밖으로 내보내는 결과값이다. 이 파일에서 `aws_lb.main`(resource), `data.aws_caller_identity`(data), `var.api_domain`(var)이 모두 `output`의 `value`로 흘러 들어가는 게 좋은 대조 예시다.

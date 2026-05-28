# HANDBOOK — 처음부터 끝까지 (한+영)

> **목표**: 끝까지 따라하면 "**실제 서비스를 클라우드로 운영해봤다 (run a real service in the cloud)**" 라고 자신 있게 말할 수 있게 됨.
>
> **방식**: 챕터 1개 = 한 행동 + 한 결과. 본문 안에 영어 표현이 같이 박혀있으니 읽기만 해도 면접 영어 표현 익혀짐.

---

## 전체 길

```
📦 Part A — 로컬 (4시간)
   1. 도구 확인 (verify your toolchain)              10분
   2. Docker 개념 + Hello World                       20분
   3. Postgres 컨테이너 띄우기 (spin up a container) 20분
   4. 백엔드 직접 실행 (run the backend locally)     20분
   5. Cursor 디버거 + 첫 breakpoint                   30분
   6. 로그인 흐름 한 줄씩 (step through the flow)    30분
   7. DB 직접 보기 (DBeaver)                          15분
   8. 풀스택 Docker 한 줄로 띄우기                    30분

☁️ Part B — AWS (4시간)        9~19 챕터
📊 Part C — 운영 (1시간)        20~22 챕터
```

매 챕터: 🎯 / 🤔 / 🛠 / ✅ / 🚨 / 📖(한) / 🗣️(영)

---

## 🔑 자주 쓰는 영어 표현 사전

면접·회사에서 한국어 X. 한국 IT 회사도 영어 그대로 씀.

### 명사 (개념)
| 한국어 | English | 의미 |
|---|---|---|
| 이미지 | **image** | Docker가 띄울 설계도 (immutable build artifact) |
| 컨테이너 | **container** | 이미지로 만든 running instance |
| 볼륨 | **volume** | 컨테이너 죽어도 살아남는 data layer |
| 포트 매핑 | **port mapping / port forwarding** | host port → container port 통로 |
| 환경변수 | **environment variable** (env var) | 외부에서 주입하는 config |
| 헬스체크 | **health check / health probe** | 살아있나 주기적 확인 |
| 마이그레이션 | **(database) migration** | DB schema 변경 자동 적용 |
| breakpoint | **breakpoint** | 디버거가 코드 멈추는 지점 |
| 핫 리로드 | **hot reload / HMR** | 코드 저장 시 자동 반영 |
| 디펜던시 | **dependency** | 외부 library / package |
| 배포 | **deploy / deployment** | prod에 코드 올림 |
| 롤링 업데이트 | **rolling update** | 새 버전을 점진적으로 교체 (zero-downtime) |
| 시크릿 | **secret** | API key·password 같은 민감 정보 |
| 오케스트레이션 | **container orchestration** | 여러 컨테이너 자동 관리 (ECS / K8s) |
| 로드 밸런서 | **load balancer** (ALB / NLB) | traffic을 여러 instance에 분산 |
| 무중단 배포 | **zero-downtime deployment** | downtime 없이 새 버전 교체 |
| 옵저버빌리티 | **observability** | logs / metrics / traces로 system 상태 파악 |

### 동사 (행동) — 면접에서 매번 쓰는 동사
| 한국어 | English | 사용 예 |
|---|---|---|
| 이미지 받기 | **pull (an image)** | "I pulled the postgres image from Docker Hub." |
| 컨테이너 띄우기 | **spin up / run / start (a container)** | "Spin up a Postgres container with `docker compose up`." |
| 컨테이너 죽이기 | **tear down / kill / stop (a container)** | "Tear down the stack with `docker compose down`." |
| 컨테이너 들어가기 | **exec into (a container)** | "I exec'd into the container to inspect the filesystem." |
| 로그 보기 | **tail the logs / stream logs** | "Tail the backend logs with `docker logs -f`." |
| 디버거 연결 | **attach (the debugger / a profiler)** | "Attach the debugger to the running JVM on port 5005." |
| 빌드하기 | **build (an image / artifact)** | "Build the Docker image with `docker build -t app .`" |
| 배포하기 | **deploy / ship / roll out** | "Roll out the new version with a blue-green deployment." |
| 롤백하기 | **roll back / revert** | "Roll back to the previous task definition revision." |
| 트래픽 보내기 | **route traffic to** | "The ALB routes traffic to healthy targets only." |
| 인증 받기 | **authenticate / sign in / assume a role** | "GitHub Actions assumes an IAM role via OIDC." |
| 권한 주기 | **grant permission / attach a policy** | "I granted the task role S3 read/write on that bucket." |
| 시크릿 주입 | **inject secrets** | "ECS injects secrets from Secrets Manager at container start." |
| 마이그레이션 실행 | **run migrations / apply migrations** | "Flyway runs migrations on application startup." |
| 헬스체크 통과 | **pass the health check** | "Wait for the container to pass its health check before routing traffic." |

> 💡 본문 진행하면서 이 표현들이 자연스럽게 박힘. 외우려 하지 말고 본문 따라가면 자동.

---

# Part A — 로컬

## Chapter 1: 도구 확인 (verify your toolchain)

### 🎯 끝나면 할 수 있는 것
본인 맥에 4개 도구 (Docker, Java 21, Node 20+, Homebrew)가 모두 깔려있고 PATH에 잡혀있는지 확인 (verify they're installed and on PATH).

### 🤔 왜 이거 하나
도구 없으면 다음 챕터 0% 진도. 5분 투자로 평생 안 헤맴 (no more rabbit holes later).

### 🛠 단계
본인 터미널 (your terminal / shell) 열어서 4개 명령:

```bash
docker --version    # 1) Docker
java -version       # 2) Java 21
node --version      # 3) Node 20+
brew --version      # 4) Homebrew
```

**기대 결과 (expected output)**:
| 명령 | 기대 출력 |
|---|---|
| `docker --version` | `Docker version 24.x` 이상 |
| `java -version` | `openjdk version "21..."` |
| `node --version` | `v20.x` 이상 |
| `brew --version` | `Homebrew 4.x` |

### ✅ 검증 (verify)
4개 명령 모두 버전 숫자가 나옴 (all four commands print a version).

### 🚨 막힐 만한 곳 (gotchas)
- **`command not found: docker`** → Docker Desktop이 안 깔려있음 (not installed). https://docker.com/products/docker-desktop 받기
- **`Cannot connect to the Docker daemon`** → Docker Desktop 앱이 실행 안 됨 (daemon not running). 상단 메뉴바에 🐳 떠야 함
- **`java -version` → 11 또는 17** → wrong Java version. `brew install openjdk@21` 후 `~/.zshrc`에:
  ```bash
  export JAVA_HOME=/opt/homebrew/Cellar/openjdk@21/21.0.11/libexec/openjdk.jdk/Contents/Home
  export PATH=$JAVA_HOME/bin:$PATH
  ```
  그 후 `source ~/.zshrc`
- **`node`가 16 이하** → outdated. `brew install node@20`

### 📖 한 줄 정리
> "내 노트북에 Docker, Java 21, Node 20, Homebrew 다 깔려 있고 PATH에 잡혀 있어요."

### 🗣️ In English
> "My machine has Docker, Java 21, Node 20, and Homebrew installed and on my PATH."

---

## Chapter 2: Docker 개념 + Hello World

### 🎯 끝나면 할 수 있는 것
이미지 (image) / 컨테이너 (container) / Dockerfile 차이를 영어 비유 (analogy)로 설명 가능. 컨테이너 1개 spin up 해봄.

### 🤔 왜 이거 하나
Docker는 토론토 모든 회사가 씀 (every Toronto shop uses Docker). 모르면 채용 X.

### 🛠 단계

**먼저 비유 (analogy)로 이해 (1분)**:
```
image       (이미지)     = blueprint  (설계도, immutable — never changes)
container   (컨테이너)   = running instance built from a blueprint (가변, 여러 개 가능)
Dockerfile               = the blueprint written as text (the recipe in plain text)
```

**실습 — Hello World 컨테이너 spin up (5분)**:
```bash
# 1) Pull the image from Docker Hub (the public registry)
docker pull hello-world

# 2) List local images (내 맥에 있는 이미지 목록)
docker images

# 3) Run a container from the image (이미지로 컨테이너 만들어 실행)
docker run hello-world

# 4) List all containers including stopped ones (-a = all)
docker ps -a
```

**각 명령이 한 일**:
- `pull` → Docker Hub (the public image registry)에서 image를 본인 맥으로 download
- `images` → 본인 맥에 있는 모든 local images 나열 (list)
- `run` → image로 container 만들어서 실행 (instantiate and start)
- `ps -a` → 모든 컨테이너 목록 (running + stopped). `ps` 만 치면 running만 보임

**run 했을 때 영어 메시지 (output)**:
```
Hello from Docker!
This message shows that your installation appears to be working correctly.
...
```

이게 컨테이너 안 작은 프로그램이 본인한테 인사한 것. 종료 후 컨테이너는 **"Exited"** 상태로 남아있음 (메모리는 해제됐지만 metadata는 남음 — `docker ps -a` 로 보임).

**청소 (clean up, 1분)**:
```bash
# Remove all stopped containers (종료된 컨테이너 다 지움)
docker container prune -f

# Remove unused images (안 쓰는 이미지 정리)
docker image prune -f
```

### ✅ 검증
`docker run hello-world` 실행 시 영어 인사 메시지가 보였다 (the welcome output was printed).

### 🚨 막힐 만한 곳
- **`permission denied`** → Docker Desktop이 권한을 못 받음 (no permission). 시스템 설정 → 보안 → Docker 허용
- **인터넷 안 됨 → pull 실패** → 회사 망/VPN 차단일 수도. 끄고 시도

### 📖 한 줄 정리
> "Docker 이미지는 설계도, 컨테이너는 설계도로 만든 실제 인스턴스예요."

### 🗣️ In English
> "A Docker image is an immutable build artifact; a container is a running instance of that image. I pulled an image from Docker Hub, ran a container from it, and cleaned up the stopped container with `docker container prune`."

---

## Chapter 3: Postgres 컨테이너 띄우기 (spin up a Postgres container)

### 🎯 끝나면 할 수 있는 것
본인 프로젝트의 `docker-compose.yml`을 한 줄씩 (line by line) 설명 가능 + Postgres 컨테이너 spin up.

### 🤔 왜 이거 하나
- 본인 맥에 Postgres 직접 install 안 함 → keeps the host clean
- 다른 프로젝트와 충돌 없음 (no version conflicts)
- 띄우고 (spin up) / 내리고 (tear down) / 날리기 (wipe) 가 1초

### 🛠 단계

**먼저 파일 한 줄씩 읽기 (5분)**:

```bash
cat docker-compose.yml
```

내용 보면:
```yaml
services:                                  # 띄울 컨테이너들 목록 (the services to spin up)
  db:                                      # 첫 컨테이너 이름 (service name — internal)
    image: postgres:16-alpine              # 어떤 이미지 쓸지 (which image to pull)
    container_name: tubeshadow-db          # docker ps에서 보이는 이름 (visible name)
    restart: unless-stopped                # 죽으면 자동 재시작 (restart policy)
    environment:                           # 컨테이너 안의 env vars
      POSTGRES_DB: tubeshadow              # DB 이름 (database to create)
      POSTGRES_USER: tubeshadow            # 관리자 계정 (admin user)
      POSTGRES_PASSWORD: tubeshadow        # 비번 (dev only — never use in prod)
    ports:
      - "5434:5432"                        # host 5434 → container 5432 (port mapping)
    volumes:
      - tubeshadow-pgdata:/var/lib/postgresql/data   # data persistence via named volume
    healthcheck:                           # 살아있는지 5초마다 확인 (health probe)
      ...
volumes:
  tubeshadow-pgdata:                       # named volume declaration
```

**핵심 3개 (the three things to understand)**:
- `image` = which image to pull
- `ports: 5434:5432` = host port 5434 maps to container port 5432. 왜? 본인 맥에 이미 5432에 다른 Postgres 있을 수 있어서 충돌 (port conflict) 회피
- `volumes` = 컨테이너 죽어도 데이터 안 사라짐 (data survives container restarts) — Docker가 디스크에 별도로 저장

**띄우기 (spin up the stack, 1분)**:
```bash
# -d = detached (run in the background / detached mode)
docker compose up -d

# 컨테이너 떴나 확인 (verify the container is running)
docker ps
```

`tubeshadow-db` 라는 컨테이너가 `Up (healthy)` 상태로 보이면 성공.

**로그 보기 (tail the logs, 1분)**:
```bash
docker logs tubeshadow-db | tail -10
```
"database system is ready to accept connections" 같은 메시지 보이면 정상 (the DB is up and accepting connections).

**컨테이너 안에 들어가서 SQL 쳐보기 (exec into the container, 3분)**:
```bash
docker exec -it tubeshadow-db psql -U tubeshadow -d tubeshadow
```
- `exec` = run a command inside a running container
- `-it` = interactive + TTY (대화형, 입력 가능)
- `psql` = Postgres CLI client

들어가면 `tubeshadow=#` 프롬프트:
```sql
\dt              -- list tables (테이블 목록, 아직 비어있음)
SELECT NOW();    -- current time
\q               -- quit / exit
```

**내릴 때 (tear down)**:
```bash
docker compose down          # 컨테이너만 지움, volume은 남음 (containers gone, data survives)
docker compose down -v       # volume도 같이 지움 (wipe everything — fresh start)
```

### ✅ 검증
- `docker ps` 에서 `tubeshadow-db` 가 `Up` 상태
- `psql` 들어가서 `SELECT NOW();` 결과 봄 (got a timestamp back)

### 🚨 막힐 만한 곳
- **`port 5434 already in use`** → port already in use. `lsof -ti:5434 | xargs kill -9`
- **`docker compose` 안 됨, `docker-compose` 만 됨** → Docker Desktop 구버전. update, 또는 `docker-compose` 그대로 사용

### 📖 한 줄 정리
> "Postgres를 컨테이너로 띄워서 호스트 5434에 노출하고, named volume으로 데이터 영속화했어요."

### 🗣️ In English
> "I spin up Postgres in a container with host port 5434 mapped to container 5432, and a named volume so data survives container restarts. I `exec` into it with `psql` to run queries directly."

---

## Chapter 4: 백엔드 직접 실행 (run the backend locally)

### 🎯 끝나면 할 수 있는 것
백엔드를 본인 맥에서 직접 실행 (run natively, without Docker) → 브라우저로 health check 응답 받음.

### 🤔 왜 이거 하나
- Docker는 prod용. 개발 중 (during development)에는 IDE에서 native 실행이 더 빠름 (faster feedback loop)
- 다음 챕터 (디버거)의 전제조건 (prerequisite)

### 🛠 단계

**환경변수 (env vars) 준비 (3분)**:
```bash
cd /Users/daeseonyoo/Documents/GitHub/ai-product/shadow-ai
cp .env.example .env
```
열어서 `JWT_SECRET` 채우기 (generate a random secret):
```bash
openssl rand -base64 48
# 위 출력을 .env의 JWT_SECRET= 뒤에 붙임
```
나머지는 default 그대로 OK.

**백엔드 띄우기 (start the backend, 3분)**:
```bash
cd backend
./gradlew bootRun
```

처음 실행 (first run)은 1~2분 (dependency 다운로드 중 — resolving and downloading dependencies). 정상 시작 시 마지막에:
```
Started TubeshadowApplication in 5.123 seconds (process running for 5.555)
```

**브라우저에서 hit하기 (3분)**:
- http://localhost:8080/api/health → `{"data":{"status":"ok"},...}`
- http://localhost:8080/swagger-ui.html → API 문서 (auto-generated OpenAPI docs)

**Signup + Login curl로 test (5분)**:
새 터미널 열어서:
```bash
# 1) Sign up
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"me@example.com","password":"testpass1234","displayName":"Me"}'

# 2) Log in → accessToken 받기
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"me@example.com","password":"testpass1234"}'
```

응답 (response)에 `"accessToken":"eyJ..."` 같은 JWT (JSON Web Token)가 보이면 성공.

### ✅ 검증
- Health endpoint returns 200 OK
- Signup + login flow returns a JWT

### 🚨 막힐 만한 곳
- **`./gradlew` 시작 후 멈춤** → Gradle이 dependencies 다운로드 중 (resolving). 5분까지 wait
- **`UnknownHostException: db`** → Postgres 컨테이너 안 떠있음. Chapter 3 다시
- **`relation users does not exist`** → Flyway migration이 안 돈 것 (migrations didn't apply). 백엔드 재시작하면 자동
- **`port 8080 already in use`** → `lsof -ti:8080 | xargs kill -9`

### 📖 한 줄 정리
> "Spring Boot를 로컬에서 띄우고 curl로 인증 API 동작 확인했어요. Flyway가 자동으로 schema 만들고 JWT로 토큰 발급해요."

### 🗣️ In English
> "I run the Spring Boot backend locally with `./gradlew bootRun`. Flyway applies database migrations on application startup, and `POST /api/auth/login` returns a JWT signed with HS256."

---

## Chapter 5: Cursor 디버거 + 첫 breakpoint (attach a debugger and hit your first breakpoint)

### 🎯 끝나면 할 수 있는 것
Cursor에서 backend에 디버거 attach 해서 breakpoint 작동시킴 (set a breakpoint and have execution pause on it).

### 🤔 왜 이거 하나
**이 챕터가 핸드북 전체의 핵심**. 코드를 본인 것으로 만드는 유일한 방법 (the only way to truly own the codebase).

면접에서 "Walk me through this code" 물어볼 때 답할 수 있느냐가 여기서 결정됨.

### 🛠 단계

**Cursor extensions 설치 (5분)**:
1. Cursor → 프로젝트 (`shadow-ai`) 열기
2. 우측 하단 노란 알림 "Do you want to install the recommended extensions?" → **Install**
3. 알림 없으면: ⌘⇧P → `Extensions: Show Recommended Extensions` → 다 Install
4. **무조건 필요한 2개**: `Extension Pack for Java`, `Spring Boot Extension Pack`

**Cursor 재시작 (Java 인식)** — ⌘Q 후 다시 열기.

**Backend를 debug mode로 띄움 (run with the debug agent enabled, 2분)**:
이전 챕터에서 backend 떠있으면 `Ctrl+C` 로 죽이기 (kill the previous instance). 그 후:
```bash
cd backend
./gradlew bootRun --debug-jvm
```
`--debug-jvm` 한 줄이 핵심. JVM이 **JDWP (Java Debug Wire Protocol)** 를 **port 5005**에서 열고 디버거 connection 기다림 (waits for a debugger to attach).

터미널에 이게 보임:
```
Listening for transport dt_socket at address: 5005
```

이 상태에서 백엔드는 잠시 정지 — 디버거가 attach될 때까지 wait (it pauses until a debugger attaches).

**Cursor에서 debugger attach (1분)**:
1. 좌측 사이드바 **Run and Debug** 아이콘 (▶+벌레)
2. 상단 드롭다운 → `Attach to Backend (port 5005)`
3. 녹색 ▶ 클릭

성공하면 (on successful attach):
- 터미널의 backend가 다시 진행 → Spring 띄움 (`Started TubeshadowApplication`)
- Cursor 하단 상태바가 **주황색** (debug mode active)

**첫 breakpoint 찍기 (set your first breakpoint, 5분)**:
Cursor에서 이 파일 열기:
```
backend/src/main/java/com/tubeshadow/auth/api/AuthController.java
```

`login` 메서드 찾아서 **첫 줄 옆 여백 클릭** → 🔴 빨간 점 (red dot) 생김. 그게 breakpoint.

**Breakpoint 발동 (trigger the breakpoint, 3분)**:
새 터미널:
```bash
cd frontend && npm run dev
```
http://localhost:3000/en/login → 가입한 계정으로 로그인 클릭.

**Cursor가 자동으로 앞에 튀어나옴 (the IDE comes to the foreground).** 빨간 점이 있던 줄이 **노란 highlight** (highlighted in yellow).

좌측 panel:
- **VARIABLES**: `email`, `password` 값 그대로 (the values you typed)
- **CALL STACK**: 어디서 어디 거쳐 왔는지 (the stack frames)

### ✅ 검증
브라우저에서 로그인 클릭 시 Cursor가 멈춤 + 변수창 (variable panel)에 email/password 보임.

### 🚨 막힐 만한 곳
- **`port 5005 already in use`** → previous debug instance 살아있음. `lsof -ti:5005 | xargs kill -9`
- **`Attach to Backend` 옵션 없음** → `.vscode/launch.json` 파일이 workspace root에 있는지 확인
- **연결됐는데 breakpoint hit 안 됨** → 빨간 점이 노란 ⭕ (hollow) 면 source mapping이 안 됨. Cursor 재시작 또는 `Java: Clean Java Language Server Workspace`
- **Java extension이 영원히 loading** → 5~10분 wait. 첫 indexing이 오래 걸림 (initial language server indexing is slow)

### 📖 한 줄 정리
> "Spring Boot를 `--debug-jvm`으로 띄우고 Cursor에서 JDWP 5005에 attach해서 breakpoint 작동시켜요."

### 🗣️ In English
> "I run Spring Boot with `--debug-jvm` which opens a JDWP socket on port 5005, then attach my IDE to it so I can set breakpoints in the source and step through execution."

---

## Chapter 6: 로그인 흐름 한 줄씩 (step through the login flow line by line)

### 🎯 끝나면 할 수 있는 것
로그인 클릭 → JWT 받기까지 코드 흐름 (the request flow)을 본인이 친구한테 설명 가능 (you can walk a friend through it).

### 🤔 왜 이거 하나
면접 단골 질문: **"Walk me through how your authentication works."**

### 🛠 단계

**Breakpoint 5개 찍기 (set five breakpoints, 5분)**:
이전 챕터에 이미 1개 있음. 4개 더 추가:

1. `AuthController.login()` 첫 줄 (이미 있음)
2. `AuthService.login()` 안에 user 조회 (DB lookup)
3. `AuthService.login()` 안에 비번 검증 (`passwordEncoder.matches`)
4. `AuthService.login()` 안에 JWT generation
5. `AuthController.login()` 의 return

(파일 안에서 `passwordEncoder`, `tokenProvider` 등 검색하면 위치 빠름)

**디버거 단축키 (debugger shortcuts, 1분)**:
| Key | English | 의미 |
|---|---|---|
| `F5` | **Continue / Resume** | 다음 breakpoint까지 진행 |
| `F10` | **Step Over** | 다음 줄로 (함수 안 들어감) |
| `F11` | **Step Into** | 호출하는 함수 안으로 들어감 |
| `Shift+F11` | **Step Out** | 현재 함수 빠져나옴 |

**로그인 클릭 → 5개 breakpoint hit (20분)**:

**Breakpoint 1 — Controller 진입 (request enters the controller)**:
- VARIABLES에 `request.email`, `request.password` 보임 — 본인이 입력한 그대로
- F11 (Step Into) → AuthService.login() 안으로 진입

**Breakpoint 2 — DB에서 user 찾기 (user lookup)**:
- F10 한 번 → `user` 변수에 본인 user 객체 (the user entity)
- `passwordHash` 필드는 `$2a$10$...` 같은 bcrypt hash
- **여기서 배움**: plaintext password는 DB에 없음 (passwords are never stored in plaintext)

**Breakpoint 3 — bcrypt 검증 (password verification)**:
- `passwordEncoder.matches(plain, hashed)` → returns true/false
- F10 → `result` 변수가 `true` (verification passed)
- 비번 틀렸으면 `false` → exception throw → 401 응답 (HTTP 401 Unauthorized)

**Breakpoint 4 — JWT 생성 (token generation)**:
- `tokenProvider.generate(user)` → JWT string
- F10 후 token 변수: `eyJhbGciOiJIUzI1NiJ9.eyJzdWI...`
- 이 토큰을 https://jwt.io 에 붙여넣으면 decode됨 (HEADER + PAYLOAD + SIGNATURE)

**Breakpoint 5 — Response 반환 (response sent)**:
- 클라이언트로 돌려보낼 response 객체 (the response payload)
- F5 (Continue) → 브라우저에 response 도착 → /library로 자동 redirect

### ✅ 검증
본인 입으로 친구한테 30초 안에 설명 가능:
> "로그인 request 오면 controller가 받고, service에서 DB에서 user 찾고, bcrypt로 password verify하고, 통과하면 JWT 생성해서 response로 보내요."

### 🚨 막힐 만한 곳
- **F10 누르면 다른 클래스로 점프** → Spring AOP interceptor를 거치는 중. F5로 계속
- **변수창 (variable panel) 비어있음** → 다른 곳 클릭했다가 다시 → 갱신
- **breakpoint 위치 못 찾음** → `⌘P` 로 파일 검색, `⌘F` 로 텍스트 검색

### 📖 한 줄 정리
> "JWT 인증 흐름: Controller → Service → bcrypt 검증 → 토큰 생성 → 응답. HS256으로 서명하고 24시간 TTL이에요."

### 🗣️ In English
> "The login flow goes controller → service → bcrypt password verification → JWT generation → response. The token is signed with HS256 and has a 24-hour TTL. I stepped through it with the debugger to confirm passwords are never stored in plaintext."

---

## Chapter 7: DB 직접 보기 (inspect the database with DBeaver)

### 🎯 끝나면 할 수 있는 것
GUI client (DBeaver)로 본인 DB에 connect 해서 row 직접 보고 ad-hoc SQL 실행 (run ad-hoc queries).

### 🤔 왜 이거 하나
prod에서 "왜 이 클립이 안 보이지?" 같은 data issue → DB 직접 inspect 해야 함 (you need to query the live data).

### 🛠 단계

**Install (3분)**:
```bash
brew install --cask dbeaver-community
```
또는 https://dbeaver.io/download/ 에서 직접.

**Connection 만들기 (create a connection, 3분)**:
1. DBeaver 실행 → `Database → New Database Connection` (또는 좌상단 콘센트 아이콘)
2. PostgreSQL 선택 → Next
3. 입력:
   - Host: `localhost`
   - Port: `5434`
   - Database: `tubeshadow`
   - Username: `tubeshadow`
   - Password: `tubeshadow`
4. **Test Connection** → 드라이버 다운 → 성공 메시지
5. Finish

**테이블 보기 (browse the schema, 3분)**:
좌측 panel → tubeshadow → Schemas → public → Tables → **users** 더블클릭 → Data 탭 → Chapter 4에서 만든 본인 row 보임.

**Password 컬럼 확인 (security check)**:
- `password_hash` 컬럼 = `$2a$10$...` (bcrypt hash)
- plaintext password 없음. 즉 DB가 leak돼도 비밀번호 자체는 안전 (even if the DB leaks, passwords aren't readable)

**SQL 직접 (run ad-hoc queries, 3분)**:
좌측 connection 우클릭 → SQL Editor:
```sql
-- User count (사용자 수)
SELECT COUNT(*) FROM users;

-- 본인 user 정보 (find my own row)
SELECT id, email, display_name, created_at FROM users WHERE email = 'me@example.com';

-- 본인 clips (my clips, if any)
SELECT name, start_ms, end_ms, created_at
FROM clips
WHERE user_id = (SELECT id FROM users WHERE email = 'me@example.com')
ORDER BY created_at DESC;
```

⌘Enter (run selected query) 또는 Alt+X (run script).

### ✅ 검증
users 테이블에서 본인 row 보임 + password_hash가 bcrypt hash format.

### 🚨 막힐 만한 곳
- **`Connection refused`** → Postgres 컨테이너 안 떠있음. `docker ps`
- **`password authentication failed`** → password is `tubeshadow` (case-sensitive)
- **port 5432인 줄 알았는데** → host port는 **5434**! (5432는 container port)

### 📖 한 줄 정리
> "DBeaver로 localhost:5434 Postgres에 연결해서 SQL 직접 돌릴 수 있어요. password는 bcrypt로 저장돼서 평문 노출 없어요."

### 🗣️ In English
> "I connect DBeaver to Postgres on `localhost:5434` to inspect rows and run ad-hoc queries. Passwords are stored as bcrypt hashes — plaintext is never persisted."

---

## Chapter 8: 풀스택 Docker 한 줄로 띄우기 (spin up the whole stack with one command)

### 🎯 끝나면 할 수 있는 것
신규 환경 (a fresh machine)에서 한 줄 명령 (a single command)으로 DB + backend + frontend 모두 spin up.

### 🤔 왜 이거 하나
- 새 노트북에서 "5-minute setup" 가능 → fast onboarding
- 토론토 회사 첫 출근날 동료가 "어떻게 띄워요?" 물으면 "Just `docker compose up`" 답 가능
- 면접에서 "How do you reduce onboarding time?" 답 가능

### 🛠 단계

**docker-compose.dev.yml 한 줄씩 읽기 (10분)**:
```bash
cat docker-compose.dev.yml
```

3개 services 구조 (three services defined):
```yaml
services:
  db:          # Chapter 3에서 본 Postgres
  backend:     # Spring Boot — built from Dockerfile.dev
  frontend:    # Next.js — node:20-alpine 이미지 그대로 (use the image as-is)
```

**핵심 새 개념 (new concepts here)**:
```yaml
backend:
  depends_on:
    db:
      condition: service_healthy    # wait until DB passes its health check
  volumes:
    - ./backend/src:/workspace/src  # bind mount: host code → container (live sync)
  ports:
    - "8080:8080"
    - "5005:5005"                   # JVM debug port exposed
```

→ 코드 저장하면 컨테이너 안 Spring DevTools가 변화 감지 (detects file change) + 자동 재시작 (auto-restart).

**기존 거 다 정리 (clean up first, 1분)**:
```bash
# Kill processes on those ports
lsof -ti:8080 | xargs kill -9 2>/dev/null
lsof -ti:3000 | xargs kill -9 2>/dev/null

# Tear down existing compose stack
docker compose down
```

**풀스택 띄우기 (bring up the full stack, 5분)**:
```bash
docker compose -f docker-compose.dev.yml up
```

처음에는 5~10분 (image pull + gradle dependencies + npm install). 끝나면 (once everything is ready):
```
tubeshadow-db        | database system is ready
tubeshadow-backend   | Started TubeshadowApplication in 8.xxx seconds
tubeshadow-frontend  | ▲ Next.js 16.x.x  - http://localhost:3000
```

**확인 (verify, 3분)**:
- http://localhost:3000 → frontend
- http://localhost:8080/api/health → backend
- `docker ps` → 3개 컨테이너 모두 Up
- 코드 저장 시: backend 자동 재시작, frontend HMR (hot module replacement) 즉시 반영

**Tear down**:
```bash
docker compose -f docker-compose.dev.yml down

# Wipe data too (volume까지 다 지우기)
docker compose -f docker-compose.dev.yml down -v
```

### ✅ 검증
- `docker ps` 에 3개 컨테이너 모두 Up
- 브라우저에서 sign up → 영상 import까지 정상 동작 (end-to-end works)

### 🚨 막힐 만한 곳
- **Backend 떴는데 DB connection 실패** → `depends_on`의 `service_healthy` 조건 작동 중. `docker logs tubeshadow-db`로 확인
- **Frontend가 영원히 npm install** → 첫 install만 길고 그 후 cached. 너무 길면 (10분+) `docker volume rm` 후 재시작
- **메모리 부족 (out of memory)** → Docker Desktop → Settings → Resources → Memory 4GB+

### 📖 한 줄 정리
> "Docker Compose 한 파일에 DB + 백엔드 + 프론트 정의해서 `docker compose up` 한 줄로 풀스택 띄워요. 디버거 포트도 노출돼서 IDE에서 attach 가능해요."

### 🗣️ In English
> "Docker Compose defines the database, backend (with the JVM debug port exposed), and frontend in a single file. `docker compose up` brings the whole stack up locally with one command, and Spring DevTools hot-reloads on file save. A teammate can clone the repo and be running end-to-end in five minutes."

---

🎉 **Part A 끝.** 여기까지 됐으면 본인은 "**a full-stack engineer who runs Docker locally and debugs by attaching to the JVM**" 입니다.

다음은 Part B (AWS) — 별도 챕터 추가 예정. Part A 완료 후 알려주세요.

---

# Part B — AWS 배포 (cloud deployment)

> Part B는 Part A 완료 후 추가됩니다. 9~19 챕터 = 약 4시간 분량.
>
> 미리 보기 (each chapter follows the same 🎯/🤔/🛠/✅/🚨/📖/🗣️ format):
> - **9.** AWS 계정 보안 (account hardening — root MFA, IAM admin user, AWS CLI)
> - **10.** VPC + 네트워크 (public/private subnets, security groups)
> - **11.** RDS Postgres (managed relational database)
> - **12.** S3 bucket (object storage for recordings)
> - **13.** Secrets Manager (centralized secrets)
> - **14.** IAM roles (task role, execution role, GitHub OIDC role)
> - **15.** ECR + Docker image push (container registry)
> - **16.** ECS cluster + Task Definition + Service (the orchestrator)
> - **17.** ALB + ACM + Route 53 (HTTPS termination + DNS)
> - **18.** GitHub Actions 자동 배포 (CI/CD pipeline with OIDC)
> - **19.** Vercel 프론트 + 도메인 연결 (serverless frontend hosting)

# Part C — 운영 (observability, 선택)

> - **20.** CloudWatch 로그 (structured logs, filters, log insights)
> - **21.** Sentry 에러 트래킹 (error tracking with stack traces and breadcrumbs)
> - **22.** 알람 (CloudWatch alarms + SNS email notifications)

---

# 🏆 끝 — 인터뷰용 한 문장 (interview-ready paragraph)

### 🇰🇷 한국어 버전
> *"Spring Boot + Next.js 풀스택을 만들었고, Docker Compose로 로컬은 한 줄로 띄워요. GitHub Actions가 main push마다 ECR에 이미지 push 후 ECS Fargate에서 rolling update 합니다. 시크릿은 Secrets Manager + IAM role로 주입, 녹음 파일은 S3, DB는 RDS Postgres 7일 자동 백업, HTTPS는 ACM + ALB로 종단, 로그는 JSON으로 CloudWatch에서 보고, 에러는 Sentry. OIDC라 GitHub와 AWS 사이에 정적 키 0개. 디버깅은 Cursor에서 JDWP attach로 breakpoint 찍어요."*

### 🇨🇦 English version — 토론토 면접 그대로 외워 쓰기
> *"I built a full-stack Spring Boot and Next.js app. Locally, Docker Compose brings up the whole stack — database, backend, and frontend — with a single command, and I debug the JVM through my IDE attaching to JDWP on port 5005. On every push to `main`, GitHub Actions builds the Docker image, pushes it to ECR, and triggers a rolling update on ECS Fargate. Secrets live in AWS Secrets Manager and are injected into the task definition via an IAM task role — there are no static credentials anywhere. Recording files go to S3, the database is RDS Postgres with 7-day automated backups, HTTPS is terminated at an Application Load Balancer with an ACM certificate, and Route 53 hosts the DNS. Application logs ship to CloudWatch as structured JSON, and runtime errors go to Sentry. GitHub authenticates to AWS via OIDC, so there are zero long-lived access keys in the pipeline."*

### 🎯 면접에서 이걸 쪼개서 답하기 — 후속 질문 6개 영어 답
| 질문 | English 답 (한 문장) |
|---|---|
| "How do you deploy?" | "Every push to `main` triggers GitHub Actions, which builds the image, pushes to ECR, and rolls it out on ECS Fargate via blue-green-style task replacement." |
| "How do you handle secrets?" | "Secrets live in AWS Secrets Manager. The ECS task definition references them by ARN, and the task execution role pulls them at container start. No secrets ever touch git or env files in production." |
| "How does the frontend talk to the backend?" | "The Next.js frontend on Vercel calls our API at `api.<domain>.com`, which is an ALB in front of ECS Fargate. CORS is restricted to our two known origins." |
| "How do you debug production issues?" | "I tail CloudWatch logs filtered by request ID, reproduce the scenario locally with Docker Compose, and attach the debugger via JDWP to step through the failure path." |
| "Why ECS Fargate over EC2?" | "I don't want to manage host OS patching or capacity planning. Fargate gives me per-task billing and isolation without running my own cluster nodes." |
| "How do you handle database migrations?" | "Flyway runs migrations on application startup. Versioned SQL files live in `src/main/resources/db/migration`, so a deploy applies schema changes atomically with the new app version." |

이 한 단락 + 6가지 후속 질문 답이 토론토 시니어 면접에서 **"Have you actually run a service in production?"** 통과 자격.

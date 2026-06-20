#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_DIR="$(cd "$ROOT_DIR/.." && pwd)"
ASC_KEY="/Users/daeseonyoo/.secrets/asc-api-key.p8"
API_URL="https://api.mimi.daeseon.ai"
PRIVACY_URL="https://mimi.daeseon.ai/en/privacy"
TERMS_URL="https://mimi.daeseon.ai/en/terms"
DRY_RUN=0

export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
if ! command -v npx >/dev/null 2>&1 && [[ -d "$HOME/.nvm/versions/node" ]]; then
  NODE_BIN="$(find "$HOME/.nvm/versions/node" -maxdepth 2 -type d -name bin | sort | tail -n 1)"
  if [[ -n "$NODE_BIN" ]]; then
    export PATH="$NODE_BIN:$PATH"
  fi
fi

if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=1
fi

cd "$ROOT_DIR"

say_step() {
  printf "\n==> %s\n" "$1"
}

need_file() {
  if [[ ! -f "$1" ]]; then
    printf "Missing required file: %s\n" "$1" >&2
    exit 1
  fi
}

need_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    printf "Missing required command: %s\n" "$1" >&2
    exit 1
  fi
}

say_step "Checking local prerequisites"
need_command curl
need_command grep
need_command npx
need_file "$ASC_KEY"
need_file "$ROOT_DIR/eas.json"
need_file "$ROOT_DIR/app.json"

say_step "Checking production backend and legal URLs"
curl -fsS "$API_URL/actuator/health" | grep -q '"status":"UP"'
curl -fsSI "$PRIVACY_URL" >/dev/null
curl -fsSI "$TERMS_URL" >/dev/null

say_step "Checking App Store review-risk config"
if grep -En "NSFaceIDUsageDescription|NSPhotoLibraryUsageDescription|UIBackgroundModes|FOREGROUND_SERVICE_MEDIA_PLAYBACK" app.json >/dev/null; then
  printf "Risky unused permission config is still present in app.json.\n" >&2
  exit 1
fi

say_step "Type-checking mobile app"
npx tsc --noEmit

say_step "Export-checking iOS bundle"
npx expo export --platform ios

say_step "Building legal site locally"
(cd "$REPO_DIR/frontend" && npm run build)

say_step "Validating EAS auth"
if ! npx eas-cli@latest whoami >/dev/null; then
  printf "EAS is not authenticated. Run this once, then rerun the release button:\n" >&2
  printf "  cd %s && npx eas-cli@latest login\n" "$ROOT_DIR" >&2
  exit 1
fi

if [[ "$DRY_RUN" == "1" ]]; then
  say_step "Dry run complete"
  printf "Would run: npx eas-cli@latest build --platform ios --profile production --auto-submit-with-profile production --non-interactive\n"
  exit 0
fi

say_step "Queueing production iOS build and automatic TestFlight upload"
npx eas-cli@latest build \
  --platform ios \
  --profile production \
  --auto-submit-with-profile production \
  --non-interactive

cat <<'EOF'

Queued successfully.

This builds the production iOS app and uploads it to App Store Connect/TestFlight through EAS.
Expo's official iOS flow still requires manually promoting the processed build to App Store Review
inside App Store Connect after metadata, screenshots, and privacy labels are complete:

https://appstoreconnect.apple.com/apps/6780742714/appstore/ios/version/deliverable
EOF

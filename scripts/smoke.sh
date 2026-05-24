#!/usr/bin/env bash
# Comprehensive API smoke test. Requires backend already running at $API.
# Exits non-zero on the first unexpected response.
set -euo pipefail

API="${API:-http://localhost:8080}"
EMAIL="smoke-$(date +%s)@example.com"
PASSWORD="supersecret123"

say()  { printf '\n\033[1;34m== %s ==\033[0m\n' "$*"; }
ok()   { printf '  \033[32m✓\033[0m %s\n' "$*"; }
fail() { printf '  \033[31m✗\033[0m %s\n' "$*"; exit 1; }

curlj() {
  curl -sS -w "\n%{http_code}" "$@"
}

# 1. Health
say "Health"
HEALTH=$(curlj "$API/api/health")
HSTATUS=$(echo "$HEALTH" | tail -1)
[[ "$HSTATUS" == "200" ]] && ok "health 200" || fail "health $HSTATUS"

# 2. Signup
say "Signup"
SIGNUP=$(curlj -X POST "$API/api/auth/signup" -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\",\"displayName\":\"Smoke User\"}")
SSTATUS=$(echo "$SIGNUP" | tail -1)
SBODY=$(echo "$SIGNUP" | sed '$d')
[[ "$SSTATUS" == "201" ]] && ok "signup 201" || fail "signup $SSTATUS"
TOKEN=$(echo "$SBODY" | python3 -c "import sys,json;print(json.load(sys.stdin)['data']['accessToken'])")
USER_ID=$(echo "$SBODY" | python3 -c "import sys,json;print(json.load(sys.stdin)['data']['user']['id'])")
ok "got token len=${#TOKEN}, userId=$USER_ID"

# 3. /me
say "GET /api/auth/me"
ME=$(curlj -H "Authorization: Bearer $TOKEN" "$API/api/auth/me")
[[ "$(echo "$ME" | tail -1)" == "200" ]] && ok "me 200" || fail "me"
echo "$ME" | sed '$d' | python3 -c "import sys,json;j=json.load(sys.stdin)['data'];assert j['email']=='$EMAIL', j" && ok "email matches"

# 4. PATCH profile
say "PATCH /api/auth/me"
PATCH=$(curlj -X PATCH -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"displayName":"Renamed Smoke"}' "$API/api/auth/me")
[[ "$(echo "$PATCH" | tail -1)" == "200" ]] && ok "profile update 200" || fail "profile update"

# 5. Change password (and back)
say "Change password"
PWD1=$(curlj -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d "{\"currentPassword\":\"$PASSWORD\",\"newPassword\":\"newpassword456\"}" "$API/api/auth/me/password")
[[ "$(echo "$PWD1" | tail -1)" == "204" ]] && ok "password change 204" || fail "password change"
PWD2=$(curlj -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d "{\"currentPassword\":\"newpassword456\",\"newPassword\":\"$PASSWORD\"}" "$API/api/auth/me/password")
[[ "$(echo "$PWD2" | tail -1)" == "204" ]] && ok "password reverted 204" || fail "password revert"

# 6. Collections
say "Collections"
COLL=$(curlj -H "Authorization: Bearer $TOKEN" "$API/api/collections")
[[ "$(echo "$COLL" | tail -1)" == "200" ]] && ok "collections 200" || fail "collections"
NUM_COLL=$(echo "$COLL" | sed '$d' | python3 -c "import sys,json;print(len(json.load(sys.stdin)['data']))")
ok "found $NUM_COLL collection(s)"

# Get the developer-picks collection if it exists, find a video
if [[ "$NUM_COLL" -gt 0 ]]; then
  DETAIL=$(curlj -H "Authorization: Bearer $TOKEN" "$API/api/collections/developer-picks" 2>/dev/null || true)
  if [[ "$(echo "$DETAIL" | tail -1)" == "200" ]]; then
    NUM_VIDS=$(echo "$DETAIL" | sed '$d' | python3 -c "import sys,json;print(len(json.load(sys.stdin)['data']['videos']))")
    ok "developer-picks has $NUM_VIDS videos"
    VIDEO_ID=$(echo "$DETAIL" | sed '$d' | python3 -c "import sys,json;d=json.load(sys.stdin)['data']['videos'];print(d[0]['video']['id'] if d else '')")
  fi
fi

# 7. Clips (empty list, then sort/filter/tag/export)
say "Clips empty list (newest + sorts)"
for s in newest oldest name duration; do
  R=$(curlj -H "Authorization: Bearer $TOKEN" "$API/api/clips?sort=$s")
  [[ "$(echo "$R" | tail -1)" == "200" ]] && ok "list sort=$s 200" || fail "list sort=$s"
done

# 8. Tags (empty initially)
say "Tags"
TAGS=$(curlj -H "Authorization: Bearer $TOKEN" "$API/api/clips/tags")
[[ "$(echo "$TAGS" | tail -1)" == "200" ]] && ok "tags 200" || fail "tags"

# 9. Create + Update + Delete clip (only if we have a seeded video)
if [[ -n "${VIDEO_ID:-}" ]]; then
  say "Create / update / delete clip"
  CR=$(curlj -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
    -d "{\"videoId\":\"$VIDEO_ID\",\"startMs\":0,\"endMs\":5000,\"name\":\"Smoke clip\",\"tags\":[\"smoke\",\"e2e\"]}" \
    "$API/api/clips")
  CRS=$(echo "$CR" | tail -1)
  [[ "$CRS" == "201" ]] && ok "clip created 201" || fail "create $CRS"
  CLIP_ID=$(echo "$CR" | sed '$d' | python3 -c "import sys,json;print(json.load(sys.stdin)['data']['id'])")
  ok "clipId=$CLIP_ID"

  UP=$(curlj -X PATCH -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
    -d '{"name":"Smoke clip v2","tags":["smoke","edited"]}' \
    "$API/api/clips/$CLIP_ID")
  [[ "$(echo "$UP" | tail -1)" == "200" ]] && ok "clip updated 200" || fail "update"

  # Tag filter should find the clip
  TF=$(curlj -H "Authorization: Bearer $TOKEN" "$API/api/clips?tag=edited")
  COUNT=$(echo "$TF" | sed '$d' | python3 -c "import sys,json;print(json.load(sys.stdin)['data']['total'])")
  [[ "$COUNT" == "1" ]] && ok "tag filter returns 1" || fail "tag filter returned $COUNT"

  # Export
  say "Export"
  EX=$(curlj -H "Authorization: Bearer $TOKEN" "$API/api/clips/export")
  [[ "$(echo "$EX" | tail -1)" == "200" ]] && ok "export 200" || fail "export"

  # Review queue should contain this clip (auto-created via event)
  say "Review queue"
  Q=$(curlj -H "Authorization: Bearer $TOKEN" "$API/api/review/queue")
  QC=$(echo "$Q" | sed '$d' | python3 -c "import sys,json;print(len(json.load(sys.stdin)['data']))")
  [[ "$QC" -ge "1" ]] && ok "queue has $QC items" || fail "queue empty"

  REVIEW_ID=$(echo "$Q" | sed '$d' | python3 -c "import sys,json;print(json.load(sys.stdin)['data'][0]['id'])")
  RESP=$(curlj -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
    -d '{"quality":4}' "$API/api/review/items/$REVIEW_ID/respond")
  [[ "$(echo "$RESP" | tail -1)" == "200" ]] && ok "review respond 200" || fail "respond"

  # Clean up clip
  DEL=$(curlj -X DELETE -H "Authorization: Bearer $TOKEN" "$API/api/clips/$CLIP_ID")
  DEL_STATUS=$(echo "$DEL" | tail -1)
  DEL_BODY=$(echo "$DEL" | sed '$d')
  if [[ "$DEL_STATUS" == "204" ]]; then
    ok "clip deleted 204"
  else
    fail "delete status=$DEL_STATUS body=$DEL_BODY"
  fi
else
  say "Skip clip lifecycle (no seeded video)"
fi

# 10. Streak
say "Streak"
ST=$(curlj -H "Authorization: Bearer $TOKEN" "$API/api/review/streak")
[[ "$(echo "$ST" | tail -1)" == "200" ]] && ok "streak 200" || fail "streak"
echo "  $(echo "$ST" | sed '$d' | python3 -m json.tool)"

# 11. Swagger UI
say "Swagger"
SW=$(curl -s -o /dev/null -w "%{http_code}" "$API/swagger-ui/index.html")
[[ "$SW" == "200" ]] && ok "swagger 200" || fail "swagger $SW"

say "ALL CHECKS PASSED"

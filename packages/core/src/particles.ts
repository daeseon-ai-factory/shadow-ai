// AUTO-GENERATED particle overlay for the verb pack — DO NOT EDIT BY HAND.
// Regenerate: python3 scripts/build-particles.py
// Source: scripts/data/particle-classifications.json + phrasal-verbs.ts.
// Keyed by the SAME card key as phrasal-verbs.ts (verbKey: `pv:<id>#<index>`), so it
// overlays the content without touching it. Powers the 'feel' hook (mode A) and the
// particle-family drill / feel-map (mode C).
//
// 1956 entries tagged: adverb(spatial feel) 842 / prep 695 / none 419; transparent 1439.
// 25 adverb-particle families (up, out, off, down, over, through, back, away, into, on, around...).
// NOTE: per-entry `sense` labels are not yet globally canonicalized; particle + transparent
// + family membership ARE reliable. Canonicalize senses before shipping the feel-map (mode C).

export type ParticleType = "adverb" | "prep" | "none";

export interface ParticleInfo {
  particle: string; // up/off/out/... (adverb) or the governing preposition (prep), "" if none
  particleType: ParticleType;
  sense: string; // short feel tag for this particle here (not yet globally normalized)
  transparent: boolean; // true = particle logic explains the meaning; false = idiomatic
}

// cardKey (pv:<id>#<index>) -> particle classification
export const PARTICLE_INFO: Record<string, ParticleInfo> = {
  "pv:be#0": {
    "particle": "in",
    "particleType": "prep",
    "sense": "위치/안",
    "transparent": true
  },
  "pv:be#1": {
    "particle": "at",
    "particleType": "prep",
    "sense": "지점/위치",
    "transparent": true
  },
  "pv:be#2": {
    "particle": "on",
    "particleType": "prep",
    "sense": "작동/활성화",
    "transparent": true
  },
  "pv:be#3": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출처/기원",
    "transparent": true
  },
  "pv:be#4": {
    "particle": "with",
    "particleType": "prep",
    "sense": "동반",
    "transparent": true
  },
  "pv:be#5": {
    "particle": "into",
    "particleType": "prep",
    "sense": "몰입/관심",
    "transparent": false
  },
  "pv:be#6": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "소진/고갈",
    "transparent": true
  },
  "pv:be#7": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "달려있음/책임",
    "transparent": false
  },
  "pv:be#8": {
    "particle": "about",
    "particleType": "prep",
    "sense": "임박",
    "transparent": false
  },
  "pv:be#9": {
    "particle": "to",
    "particleType": "none",
    "sense": "의무·예정",
    "transparent": false
  },
  "pv:be#10": {
    "particle": "to",
    "particleType": "prep",
    "sense": "익숙/적응",
    "transparent": false
  },
  "pv:be#11": {
    "particle": "for",
    "particleType": "prep",
    "sense": "책임 대상",
    "transparent": false
  },
  "pv:be#12": {
    "particle": "with",
    "particleType": "prep",
    "sense": "친숙/관계 대상",
    "transparent": true
  },
  "pv:be#13": {
    "particle": "at",
    "particleType": "prep",
    "sense": "능숙(잘함)",
    "transparent": false
  },
  "pv:be#14": {
    "particle": "in",
    "particleType": "prep",
    "sense": "관심/감정 대상",
    "transparent": false
  },
  "pv:be#15": {
    "particle": "of",
    "particleType": "prep",
    "sense": "인지 대상",
    "transparent": true
  },
  "pv:be#16": {
    "particle": "with",
    "particleType": "prep",
    "sense": "완료/관계종료",
    "transparent": true
  },
  "pv:be#17": {
    "particle": "in",
    "particleType": "prep",
    "sense": "상태(in+명사)",
    "transparent": false
  },
  "pv:be#18": {
    "particle": "to",
    "particleType": "none",
    "sense": "의향·의지",
    "transparent": true
  },
  "pv:be#19": {
    "particle": "for",
    "particleType": "prep",
    "sense": "지지/찬성",
    "transparent": true
  },
  "pv:be#20": {
    "particle": "against",
    "particleType": "prep",
    "sense": "반대/대항",
    "transparent": true
  },
  "pv:be#21": {
    "particle": "on",
    "particleType": "prep",
    "sense": "장악/통제",
    "transparent": true
  },
  "pv:be#22": {
    "particle": "behind",
    "particleType": "adverb",
    "sense": "뒤처짐",
    "transparent": true
  },
  "pv:be#23": {
    "particle": "on",
    "particleType": "prep",
    "sense": "부족 대상",
    "transparent": false
  },
  "pv:be#24": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "가동/작동",
    "transparent": true
  },
  "pv:be#25": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "정지/멈춤",
    "transparent": true
  },
  "pv:be#26": {
    "particle": "due",
    "particleType": "none",
    "sense": "기한·마감",
    "transparent": false
  },
  "pv:be#27": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "꺼짐/정지",
    "transparent": true
  },
  "pv:be#28": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "종료/끝남",
    "transparent": true
  },
  "pv:be#29": {
    "particle": "on",
    "particleType": "prep",
    "sense": "대기 상태",
    "transparent": false
  },
  "pv:be#30": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "의향",
    "transparent": false
  },
  "pv:be#31": {
    "particle": "on",
    "particleType": "prep",
    "sense": "동참/합류",
    "transparent": false
  },
  "pv:be#32": {
    "particle": "on",
    "particleType": "prep",
    "sense": "대상/관련",
    "transparent": true
  },
  "pv:be#33": {
    "particle": "to",
    "particleType": "prep",
    "sense": "대상",
    "transparent": false
  },
  "pv:be#34": {
    "particle": "of",
    "particleType": "prep",
    "sense": "대상",
    "transparent": false
  },
  "pv:have#0": {
    "particle": "to",
    "particleType": "none",
    "sense": "의무·예정",
    "transparent": false
  },
  "pv:have#1": {
    "particle": "to",
    "particleType": "prep",
    "sense": "접근/도달",
    "transparent": true
  },
  "pv:have#2": {
    "particle": "with",
    "particleType": "prep",
    "sense": "관련/상대 대상",
    "transparent": true
  },
  "pv:have#3": {
    "particle": "with",
    "particleType": "prep",
    "sense": "씨름 대상",
    "transparent": true
  },
  "pv:have#4": {
    "particle": "with",
    "particleType": "prep",
    "sense": "상대/대상",
    "transparent": true
  },
  "pv:have#5": {
    "particle": "with",
    "particleType": "prep",
    "sense": "관련/상대 대상",
    "transparent": true
  },
  "pv:have#6": {
    "particle": "with",
    "particleType": "prep",
    "sense": "관련/상대 대상",
    "transparent": true
  },
  "pv:have#7": {
    "particle": "in",
    "particleType": "prep",
    "sense": "염두/마음속",
    "transparent": true
  },
  "pv:have#8": {
    "particle": "about",
    "particleType": "prep",
    "sense": "주제/관련",
    "transparent": true
  },
  "pv:have#9": {
    "particle": "a hard time",
    "particleType": "none",
    "sense": "어려움·고생",
    "transparent": false
  },
  "pv:have#10": {
    "particle": "on",
    "particleType": "prep",
    "sense": "영향 대상",
    "transparent": true
  },
  "pv:have#11": {
    "particle": "left",
    "particleType": "none",
    "sense": "남다·잔여",
    "transparent": false
  },
  "pv:have#12": {
    "particle": "under",
    "particleType": "prep",
    "sense": "통제/장악 하",
    "transparent": true
  },
  "pv:have#13": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "방문/들름",
    "transparent": true
  },
  "pv:have#14": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "착용/작동",
    "transparent": true
  },
  "pv:have#15": {
    "particle": "against",
    "particleType": "prep",
    "sense": "적대/반감",
    "transparent": true
  },
  "pv:have#16": {
    "particle": "do(원형/사역)",
    "particleType": "none",
    "sense": "사역·시키다",
    "transparent": false
  },
  "pv:have#17": {
    "particle": "done(p.p./사역)",
    "particleType": "none",
    "sense": "사역·완수",
    "transparent": false
  },
  "pv:have#18": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "지속/계속",
    "transparent": true
  },
  "pv:have#19": {
    "particle": "in",
    "particleType": "prep",
    "sense": "분야/영역",
    "transparent": true
  },
  "pv:have#20": {
    "particle": "on",
    "particleType": "prep",
    "sense": "영향 대상",
    "transparent": true
  },
  "pv:have#21": {
    "particle": "over",
    "particleType": "prep",
    "sense": "지배/통제",
    "transparent": true
  },
  "pv:have#22": {
    "particle": "with",
    "particleType": "prep",
    "sense": "상대/대상",
    "transparent": true
  },
  "pv:have#23": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "가동/작동",
    "transparent": true
  },
  "pv:have#24": {
    "particle": "in",
    "particleType": "prep",
    "sense": "영역",
    "transparent": true
  },
  "pv:have#25": {
    "particle": "back",
    "particleType": "none",
    "sense": "지지·보호",
    "transparent": false
  },
  "pv:have#26": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "완성/끝까지",
    "transparent": false
  },
  "pv:do#0": {
    "particle": "—(타동사)",
    "particleType": "none",
    "sense": "수행·하다",
    "transparent": true
  },
  "pv:do#1": {
    "particle": "about",
    "particleType": "prep",
    "sense": "주제/관련",
    "transparent": true
  },
  "pv:do#2": {
    "particle": "in",
    "particleType": "prep",
    "sense": "영역",
    "transparent": true
  },
  "pv:do#3": {
    "particle": "on",
    "particleType": "prep",
    "sense": "주제/관하여",
    "transparent": true
  },
  "pv:do#4": {
    "particle": "a favor",
    "particleType": "none",
    "sense": "호의·도움",
    "transparent": false
  },
  "pv:do#5": {
    "particle": "in",
    "particleType": "prep",
    "sense": "영역",
    "transparent": true
  },
  "pv:do#6": {
    "particle": "on",
    "particleType": "prep",
    "sense": "대상",
    "transparent": true
  },
  "pv:do#7": {
    "particle": "with",
    "particleType": "prep",
    "sense": "관련/상대 대상",
    "transparent": true
  },
  "pv:do#8": {
    "particle": "without",
    "particleType": "prep",
    "sense": "결여/부재",
    "transparent": true
  },
  "pv:do#9": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "처음부터 다시",
    "transparent": true
  },
  "pv:do#10": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "제거/소멸",
    "transparent": true
  },
  "pv:do#11": {
    "particle": "with",
    "particleType": "prep",
    "sense": "관련/상대 대상",
    "transparent": true
  },
  "pv:do#12": {
    "particle": "the trick",
    "particleType": "none",
    "sense": "효과·해결",
    "transparent": false
  },
  "pv:do#13": {
    "particle": "by",
    "particleType": "prep",
    "sense": "수단/방법",
    "transparent": true
  },
  "pv:do#14": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "완성/끝까지",
    "transparent": true
  },
  "pv:do#15": {
    "particle": "with",
    "particleType": "prep",
    "sense": "필요/아쉬움",
    "transparent": false
  },
  "pv:do#16": {
    "particle": "by",
    "particleType": "prep",
    "sense": "도리/공정",
    "transparent": false
  },
  "pv:make#0": {
    "particle": "—(타동사)",
    "particleType": "none",
    "sense": "생산·만들다",
    "transparent": true
  },
  "pv:make#1": {
    "particle": "do(원형/사역)",
    "particleType": "none",
    "sense": "사역·시키다",
    "transparent": false
  },
  "pv:make#2": {
    "particle": "sure",
    "particleType": "none",
    "sense": "확실히·보장",
    "transparent": true
  },
  "pv:make#3": {
    "particle": "sense",
    "particleType": "none",
    "sense": "이치·말이 되다",
    "transparent": false
  },
  "pv:make#4": {
    "particle": "of",
    "particleType": "prep",
    "sense": "이해 대상",
    "transparent": false
  },
  "pv:make#5": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "지어냄/창작",
    "transparent": false
  },
  "pv:make#6": {
    "particle": "to",
    "particleType": "prep",
    "sense": "도달",
    "transparent": true
  },
  "pv:make#7": {
    "particle": "a difference",
    "particleType": "none",
    "sense": "변화·차이",
    "transparent": true
  },
  "pv:make#8": {
    "particle": "on",
    "particleType": "prep",
    "sense": "대상",
    "transparent": false
  },
  "pv:make#9": {
    "particle": "happen",
    "particleType": "none",
    "sense": "실현·성사",
    "transparent": true
  },
  "pv:make#10": {
    "particle": "work",
    "particleType": "none",
    "sense": "작동·되게 하다",
    "transparent": true
  },
  "pv:make#11": {
    "particle": "a decision",
    "particleType": "none",
    "sense": "결정·판단",
    "transparent": true
  },
  "pv:make#12": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "보충/벌충",
    "transparent": false
  },
  "pv:make#13": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "드러남/식별",
    "transparent": true
  },
  "pv:make#14": {
    "particle": "into",
    "particleType": "prep",
    "sense": "변화/전환",
    "transparent": true
  },
  "pv:make#15": {
    "particle": "of",
    "particleType": "prep",
    "sense": "활용 대상",
    "transparent": false
  },
  "pv:make#16": {
    "particle": "for",
    "particleType": "prep",
    "sense": "대상/목적",
    "transparent": true
  },
  "pv:make#17": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "극복/버텨내기",
    "transparent": true
  },
  "pv:make#18": {
    "particle": "with",
    "particleType": "prep",
    "sense": "수단/도구",
    "transparent": false
  },
  "pv:make#19": {
    "particle": "of",
    "particleType": "prep",
    "sense": "재료/구성",
    "transparent": true
  },
  "pv:make#20": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출처/기원",
    "transparent": true
  },
  "pv:make#21": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "재료/구성",
    "transparent": true
  },
  "pv:make#22": {
    "particle": "a call",
    "particleType": "none",
    "sense": "결정·판단",
    "transparent": false
  },
  "pv:make#23": {
    "particle": "of",
    "particleType": "prep",
    "sense": "활용 대상",
    "transparent": false
  },
  "pv:make#24": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "화해",
    "transparent": false
  },
  "pv:make#25": {
    "particle": "for",
    "particleType": "prep",
    "sense": "방향/행선지",
    "transparent": false
  },
  "pv:make#26": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "들고 떠남",
    "transparent": true
  },
  "pv:get#0": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "상승/기립",
    "transparent": true
  },
  "pv:get#1": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "진입/도착",
    "transparent": true
  },
  "pv:get#2": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "몰입/관심",
    "transparent": true
  },
  "pv:get#3": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "벗어남/이탈",
    "transparent": true
  },
  "pv:get#4": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "벗어남/이탈",
    "transparent": true
  },
  "pv:get#5": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "탑승",
    "transparent": true
  },
  "pv:get#6": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "하차/이탈",
    "transparent": true
  },
  "pv:get#7": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "극복",
    "transparent": false
  },
  "pv:get#8": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "완수/끝까지",
    "transparent": true
  },
  "pv:get#9": {
    "particle": "by",
    "particleType": "adverb",
    "sense": "그럭저럭/간신히",
    "transparent": false
  },
  "pv:get#10": {
    "particle": "along",
    "particleType": "adverb",
    "sense": "잘 지냄",
    "transparent": false
  },
  "pv:get#11": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "복귀",
    "transparent": true
  },
  "pv:get#12": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "회신/응답",
    "transparent": true
  },
  "pv:get#13": {
    "particle": "to",
    "particleType": "prep",
    "sense": "익숙/적응",
    "transparent": false
  },
  "pv:get#14": {
    "particle": "of",
    "particleType": "prep",
    "sense": "제거/박탈",
    "transparent": false
  },
  "pv:get#15": {
    "particle": "started",
    "particleType": "none",
    "sense": "시작·착수",
    "transparent": true
  },
  "pv:get#16": {
    "particle": "stuck",
    "particleType": "none",
    "sense": "막힘·정체",
    "transparent": true
  },
  "pv:get#17": {
    "particle": "done",
    "particleType": "none",
    "sense": "완료·끝냄",
    "transparent": true
  },
  "pv:get#18": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "접촉/연락",
    "transparent": true
  },
  "pv:get#19": {
    "particle": "together",
    "particleType": "adverb",
    "sense": "결집/모음",
    "transparent": true
  },
  "pv:get#20": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "우회/회피",
    "transparent": true
  },
  "pv:get#21": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "결국 착수",
    "transparent": false
  },
  "pv:get#22": {
    "particle": "across",
    "particleType": "adverb",
    "sense": "전달/이해시킴",
    "transparent": true
  },
  "pv:get#23": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "떠남/탈출",
    "transparent": true
  },
  "pv:get#24": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "처벌 회피",
    "transparent": false
  },
  "pv:get#25": {
    "particle": "ahead",
    "particleType": "adverb",
    "sense": "전진/진행",
    "transparent": true
  },
  "pv:get#26": {
    "particle": "behind",
    "particleType": "adverb",
    "sense": "뒤처짐",
    "transparent": true
  },
  "pv:get#27": {
    "particle": "behind",
    "particleType": "adverb",
    "sense": "뒤처짐",
    "transparent": true
  },
  "pv:get#28": {
    "particle": "to",
    "particleType": "prep",
    "sense": "도달",
    "transparent": true
  },
  "pv:get#29": {
    "particle": "at",
    "particleType": "prep",
    "sense": "의도/속뜻",
    "transparent": false
  },
  "pv:get#30": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "계속/지속",
    "transparent": true
  },
  "pv:get#31": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "착수/전념",
    "transparent": false
  },
  "pv:get#32": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "종료/끝남",
    "transparent": true
  },
  "pv:get#33": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "기준 도달",
    "transparent": true
  },
  "pv:get#34": {
    "particle": "of",
    "particleType": "prep",
    "sense": "요령 터득",
    "transparent": false
  },
  "pv:get#35": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "전달/이해시킴",
    "transparent": true
  },
  "pv:get#36": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "보복",
    "transparent": false
  },
  "pv:get#37": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "장악/통제",
    "transparent": true
  },
  "pv:get#38": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "복귀/되돌림",
    "transparent": true
  },
  "pv:get#39": {
    "particle": "of",
    "particleType": "prep",
    "sense": "입수/연락",
    "transparent": false
  },
  "pv:get#40": {
    "particle": "going",
    "particleType": "none",
    "sense": "시작·착수",
    "transparent": true
  },
  "pv:get#41": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "참여/합류",
    "transparent": true
  },
  "pv:go#0": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "밖으로/외출",
    "transparent": true
  },
  "pv:go#1": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "안으로(이동)",
    "transparent": true
  },
  "pv:go#2": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "깊이 파고듦",
    "transparent": true
  },
  "pv:go#3": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "계속/지속",
    "transparent": true
  },
  "pv:go#4": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "검토(전체)",
    "transparent": true
  },
  "pv:go#5": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "겪음/거침",
    "transparent": true
  },
  "pv:go#6": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "복귀",
    "transparent": true
  },
  "pv:go#7": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "복귀",
    "transparent": true
  },
  "pv:go#8": {
    "particle": "ahead",
    "particleType": "adverb",
    "sense": "전진/진행",
    "transparent": true
  },
  "pv:go#9": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "소멸/사라짐",
    "transparent": true
  },
  "pv:go#10": {
    "particle": "with",
    "particleType": "prep",
    "sense": "동반",
    "transparent": false
  },
  "pv:go#11": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "증가",
    "transparent": true
  },
  "pv:go#12": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "감소/하락",
    "transparent": true
  },
  "pv:go#13": {
    "particle": "wrong",
    "particleType": "none",
    "sense": "틀어짐·잘못됨",
    "transparent": true
  },
  "pv:go#14": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "순환/돌아다님",
    "transparent": true
  },
  "pv:go#15": {
    "particle": "by",
    "particleType": "adverb",
    "sense": "지나감/통과",
    "transparent": true
  },
  "pv:go#16": {
    "particle": "for",
    "particleType": "prep",
    "sense": "목적/추구",
    "transparent": true
  },
  "pv:go#17": {
    "particle": "against",
    "particleType": "prep",
    "sense": "반대/대항",
    "transparent": true
  },
  "pv:go#18": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "발동/촉발",
    "transparent": false
  },
  "pv:go#19": {
    "particle": "without",
    "particleType": "prep",
    "sense": "결여/부재",
    "transparent": true
  },
  "pv:go#20": {
    "particle": "after",
    "particleType": "prep",
    "sense": "추격/추구",
    "transparent": true
  },
  "pv:go#21": {
    "particle": "along",
    "particleType": "adverb",
    "sense": "동조/맞춰줌",
    "transparent": true
  },
  "pv:go#22": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "일부러 애씀",
    "transparent": false
  },
  "pv:go#23": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "완수/끝까지",
    "transparent": true
  },
  "pv:go#24": {
    "particle": "ahead",
    "particleType": "adverb",
    "sense": "전진/진행",
    "transparent": true
  },
  "pv:go#25": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "번복/철회",
    "transparent": true
  },
  "pv:go#26": {
    "particle": "about",
    "particleType": "prep",
    "sense": "착수/시작",
    "transparent": false
  },
  "pv:go#27": {
    "particle": "live",
    "particleType": "none",
    "sense": "가동·출시",
    "transparent": false
  },
  "pv:go#28": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "사귐/외출",
    "transparent": true
  },
  "pv:go#29": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "맞섬/대결",
    "transparent": false
  },
  "pv:go#30": {
    "particle": "on",
    "particleType": "prep",
    "sense": "대상",
    "transparent": false
  },
  "pv:go#31": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "계속/지속",
    "transparent": true
  },
  "pv:go#32": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "왕복/주고받기",
    "transparent": true
  },
  "pv:come#0": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "안으로(이동)",
    "transparent": true
  },
  "pv:come#1": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "표출/공개",
    "transparent": true
  },
  "pv:come#2": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "발생/표면화",
    "transparent": true
  },
  "pv:come#3": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "생성/구축",
    "transparent": false
  },
  "pv:come#4": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "복귀",
    "transparent": true
  },
  "pv:come#5": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "건너옴/방문",
    "transparent": true
  },
  "pv:come#6": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출처/기원",
    "transparent": true
  },
  "pv:come#7": {
    "particle": "across",
    "particleType": "adverb",
    "sense": "우연히 마주침",
    "transparent": false
  },
  "pv:come#8": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "성공/전달",
    "transparent": false
  },
  "pv:come#9": {
    "particle": "to",
    "particleType": "prep",
    "sense": "도달",
    "transparent": true
  },
  "pv:come#10": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "귀결/요약",
    "transparent": false
  },
  "pv:come#11": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "벗어남/이탈",
    "transparent": true
  },
  "pv:come#12": {
    "particle": "into",
    "particleType": "prep",
    "sense": "취득/상속",
    "transparent": false
  },
  "pv:come#13": {
    "particle": "along",
    "particleType": "adverb",
    "sense": "동반/함께",
    "transparent": true
  },
  "pv:come#14": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "설득/마음 돌림",
    "transparent": false
  },
  "pv:come#15": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "발병/쓰러짐",
    "transparent": false
  },
  "pv:come#16": {
    "particle": "with",
    "particleType": "prep",
    "sense": "동반",
    "transparent": true
  },
  "pv:come#17": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "인상",
    "transparent": false
  },
  "pv:come#18": {
    "particle": "about",
    "particleType": "adverb",
    "sense": "발생/초래",
    "transparent": false
  },
  "pv:come#19": {
    "particle": "before",
    "particleType": "prep",
    "sense": "선행/우선",
    "transparent": true
  },
  "pv:come#20": {
    "particle": "after",
    "particleType": "prep",
    "sense": "추격/추구",
    "transparent": true
  },
  "pv:come#21": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "맞닥뜨림",
    "transparent": false
  },
  "pv:come#22": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "표출/공개",
    "transparent": true
  },
  "pv:come#23": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "질책/꾸짖음",
    "transparent": false
  },
  "pv:come#24": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "결과적 부족",
    "transparent": false
  },
  "pv:take#0": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "밖으로 꺼냄",
    "transparent": true
  },
  "pv:take#1": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "떠안음/착수",
    "transparent": false
  },
  "pv:take#2": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "제거",
    "transparent": true
  },
  "pv:take#3": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "이전/인계",
    "transparent": true
  },
  "pv:take#4": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "제거/분리",
    "transparent": true
  },
  "pv:take#5": {
    "particle": "of",
    "particleType": "prep",
    "sense": "대상",
    "transparent": false
  },
  "pv:take#6": {
    "particle": "into",
    "particleType": "prep",
    "sense": "고려/참작",
    "transparent": false
  },
  "pv:take#7": {
    "particle": "for",
    "particleType": "prep",
    "sense": "대상/목적",
    "transparent": true
  },
  "pv:take#8": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "휴식/비번",
    "transparent": true
  },
  "pv:take#9": {
    "particle": "notes",
    "particleType": "none",
    "sense": "기록·메모",
    "transparent": true
  },
  "pv:take#10": {
    "particle": "at",
    "particleType": "prep",
    "sense": "대상/지점",
    "transparent": true
  },
  "pv:take#11": {
    "particle": "a while",
    "particleType": "none",
    "sense": "시간 소요",
    "transparent": true
  },
  "pv:take#12": {
    "particle": "place",
    "particleType": "none",
    "sense": "발생·개최",
    "transparent": false
  },
  "pv:take#13": {
    "particle": "of",
    "particleType": "prep",
    "sense": "대상",
    "transparent": false
  },
  "pv:take#14": {
    "particle": "in",
    "particleType": "prep",
    "sense": "참여/합류",
    "transparent": true
  },
  "pv:take#15": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "흡수/수용",
    "transparent": true
  },
  "pv:take#16": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "차지/시작",
    "transparent": false
  },
  "pv:take#17": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "기록",
    "transparent": true
  },
  "pv:take#18": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "반환",
    "transparent": true
  },
  "pv:take#19": {
    "particle": "after",
    "particleType": "prep",
    "sense": "닮음",
    "transparent": false
  },
  "pv:take#20": {
    "particle": "apart",
    "particleType": "adverb",
    "sense": "분해/해체",
    "transparent": true
  },
  "pv:take#21": {
    "particle": "through",
    "particleType": "prep",
    "sense": "안내/설명",
    "transparent": true
  },
  "pv:take#22": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출처/기원",
    "transparent": true
  },
  "pv:take#23": {
    "particle": "to",
    "particleType": "prep",
    "sense": "방향/도착",
    "transparent": true
  },
  "pv:take#24": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "수락/받아들임",
    "transparent": false
  },
  "pv:take#25": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "제기/표면화",
    "transparent": true
  },
  "pv:take#26": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "분출/화풀이",
    "transparent": false
  },
  "pv:take#27": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "이전/인계",
    "transparent": false
  },
  "pv:take#28": {
    "particle": "for",
    "particleType": "prep",
    "sense": "속아 넘어감",
    "transparent": false
  },
  "pv:take#29": {
    "particle": "of",
    "particleType": "prep",
    "sense": "대상",
    "transparent": false
  },
  "pv:take#30": {
    "particle": "in",
    "particleType": "prep",
    "sense": "관심/감정 대상",
    "transparent": false
  },
  "pv:give#0": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "포기/단념",
    "transparent": false
  },
  "pv:give#1": {
    "particle": "up",
    "particleType": "none",
    "sense": "완성/끝까지",
    "transparent": false
  },
  "pv:give#2": {
    "particle": "on",
    "particleType": "prep",
    "sense": "주제/관하여",
    "transparent": true
  },
  "pv:give#3": {
    "particle": "on",
    "particleType": "none",
    "sense": "대상/주제",
    "transparent": true
  },
  "pv:give#4": {
    "particle": "on",
    "particleType": "prep",
    "sense": "주제/관하여",
    "transparent": true
  },
  "pv:give#5": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "단념",
    "transparent": false
  },
  "pv:give#6": {
    "particle": "up",
    "particleType": "none",
    "sense": "완성/끝까지",
    "transparent": false
  },
  "pv:give#7": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "굴복",
    "transparent": false
  },
  "pv:give#8": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "배포/발송",
    "transparent": true
  },
  "pv:give#9": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "내줌/누설",
    "transparent": true
  },
  "pv:give#10": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "반환",
    "transparent": true
  },
  "pv:give#11": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "방출/발산",
    "transparent": true
  },
  "pv:give#12": {
    "particle": "on",
    "particleType": "prep",
    "sense": "주제/관하여",
    "transparent": true
  },
  "pv:give#13": {
    "particle": "to",
    "particleType": "prep",
    "sense": "수신/수령 대상",
    "transparent": true
  },
  "pv:give#14": {
    "particle": "for",
    "particleType": "prep",
    "sense": "이유/원인",
    "transparent": true
  },
  "pv:give#15": {
    "particle": "to",
    "particleType": "prep",
    "sense": "부정사",
    "transparent": true
  },
  "pv:give#16": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "굴복",
    "transparent": false
  },
  "pv:give#17": {
    "particle": "in",
    "particleType": "none",
    "sense": "굴복/양보",
    "transparent": false
  },
  "pv:give#18": {
    "particle": "",
    "particleType": "none",
    "sense": "무입자(관용)",
    "transparent": false
  },
  "pv:give#19": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "복귀/되돌림",
    "transparent": true
  },
  "pv:give#20": {
    "particle": "back",
    "particleType": "none",
    "sense": "되돌림/반환",
    "transparent": true
  },
  "pv:give#21": {
    "particle": "to",
    "particleType": "prep",
    "sense": "초래/결과",
    "transparent": true
  },
  "pv:give#22": {
    "particle": "to",
    "particleType": "prep",
    "sense": "양보/굴복",
    "transparent": false
  },
  "pv:put#0": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "착용/작동",
    "transparent": true
  },
  "pv:put#1": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "연기/보류",
    "transparent": false
  },
  "pv:put#2": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "인내/견딤",
    "transparent": false
  },
  "pv:put#3": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "아래로/기록",
    "transparent": true
  },
  "pv:put#4": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "복귀",
    "transparent": true
  },
  "pv:put#5": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "치움/보관",
    "transparent": true
  },
  "pv:put#6": {
    "particle": "together",
    "particleType": "adverb",
    "sense": "결합/조립",
    "transparent": true
  },
  "pv:put#7": {
    "particle": "into",
    "particleType": "prep",
    "sense": "안으로(이동/투입)",
    "transparent": true
  },
  "pv:put#8": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "제거/소멸",
    "transparent": true
  },
  "pv:put#9": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "위로/방향",
    "transparent": true
  },
  "pv:put#10": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "투입/제출",
    "transparent": true
  },
  "pv:put#11": {
    "particle": "forward",
    "particleType": "adverb",
    "sense": "제시/내놓음",
    "transparent": true
  },
  "pv:put#12": {
    "particle": "aside",
    "particleType": "adverb",
    "sense": "제쳐둠/보류",
    "transparent": true
  },
  "pv:put#13": {
    "particle": "through",
    "particleType": "prep",
    "sense": "겪음/거침",
    "transparent": true
  },
  "pv:put#14": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "연결",
    "transparent": true
  },
  "pv:put#15": {
    "particle": "behind",
    "particleType": "adverb",
    "sense": "과거로 보냄",
    "transparent": true
  },
  "pv:put#16": {
    "particle": "on",
    "particleType": "prep",
    "sense": "보류/유보",
    "transparent": false
  },
  "pv:put#17": {
    "particle": "in",
    "particleType": "prep",
    "sense": "제자리 고정",
    "transparent": true
  },
  "pv:put#18": {
    "particle": "on",
    "particleType": "prep",
    "sense": "대상",
    "transparent": true
  },
  "pv:put#19": {
    "particle": "to",
    "particleType": "prep",
    "sense": "대상",
    "transparent": true
  },
  "pv:put#20": {
    "particle": "in",
    "particleType": "prep",
    "sense": "관점/틀",
    "transparent": false
  },
  "pv:put#21": {
    "particle": "in",
    "particleType": "none",
    "sense": "상태/틀(관용)",
    "transparent": false
  },
  "pv:put#22": {
    "particle": "across",
    "particleType": "adverb",
    "sense": "전달/이해시킴",
    "transparent": true
  },
  "pv:put#23": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "제출/신청",
    "transparent": true
  },
  "pv:put#24": {
    "particle": "on",
    "particleType": "prep",
    "sense": "지목 대상",
    "transparent": false
  },
  "pv:set#0": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "생성/구축",
    "transparent": true
  },
  "pv:set#1": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "펼침/제시",
    "transparent": true
  },
  "pv:set#2": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "촉발/유발",
    "transparent": false
  },
  "pv:set#3": {
    "particle": "aside",
    "particleType": "adverb",
    "sense": "따로 떼어둠",
    "transparent": true
  },
  "pv:set#4": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "지연/연기",
    "transparent": true
  },
  "pv:set#5": {
    "particle": "to",
    "particleType": "prep",
    "sense": "도달",
    "transparent": true
  },
  "pv:set#6": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "주선/마련",
    "transparent": true
  },
  "pv:set#7": {
    "particle": "for",
    "particleType": "prep",
    "sense": "지정/~로",
    "transparent": true
  },
  "pv:set#8": {
    "particle": "on",
    "particleType": "prep",
    "sense": "~위에",
    "transparent": true
  },
  "pv:set#9": {
    "particle": "on",
    "particleType": "none",
    "sense": "접촉/표면",
    "transparent": true
  },
  "pv:set#10": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "착수/시작",
    "transparent": true
  },
  "pv:set#11": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "생성/구축",
    "transparent": false
  },
  "pv:set#12": {
    "particle": "up",
    "particleType": "none",
    "sense": "준비/가동",
    "transparent": true
  },
  "pv:set#13": {
    "particle": "in",
    "particleType": "prep",
    "sense": "상태(in+명사)",
    "transparent": true
  },
  "pv:set#14": {
    "particle": "for",
    "particleType": "prep",
    "sense": "대상/목적",
    "transparent": true
  },
  "pv:set#15": {
    "particle": "for",
    "particleType": "none",
    "sense": "목적/대비",
    "transparent": false
  },
  "pv:set#16": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "아래로/기록",
    "transparent": true
  },
  "pv:set#17": {
    "particle": "about",
    "particleType": "prep",
    "sense": "착수/시작",
    "transparent": false
  },
  "pv:set#18": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "시작/자리잡음",
    "transparent": false
  },
  "pv:set#19": {
    "particle": "apart",
    "particleType": "adverb",
    "sense": "구별/분리",
    "transparent": true
  },
  "pv:set#20": {
    "particle": "against",
    "particleType": "prep",
    "sense": "반대/대항",
    "transparent": true
  },
  "pv:keep#0": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "유지/지속",
    "transparent": true
  },
  "pv:keep#1": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "따라잡음/유지",
    "transparent": true
  },
  "pv:keep#2": {
    "particle": "of",
    "particleType": "prep",
    "sense": "대상",
    "transparent": false
  },
  "pv:keep#3": {
    "particle": "in",
    "particleType": "prep",
    "sense": "상태/안에 있음",
    "transparent": true
  },
  "pv:keep#4": {
    "particle": "on",
    "particleType": "prep",
    "sense": "주시 대상",
    "transparent": true
  },
  "pv:keep#5": {
    "particle": "on",
    "particleType": "none",
    "sense": "대상/주제",
    "transparent": false
  },
  "pv:keep#6": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "지속/계속",
    "transparent": true
  },
  "pv:keep#7": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "배제",
    "transparent": true
  },
  "pv:keep#8": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "회피/외면",
    "transparent": true
  },
  "pv:keep#9": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "억제/자제",
    "transparent": true
  },
  "pv:keep#10": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "억제/낮게 유지",
    "transparent": true
  },
  "pv:keep#11": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "차단/회피",
    "transparent": true
  },
  "pv:keep#12": {
    "particle": "from",
    "particleType": "prep",
    "sense": "방지/차단",
    "transparent": true
  },
  "pv:keep#13": {
    "particle": "to",
    "particleType": "prep",
    "sense": "고수/밀착",
    "transparent": true
  },
  "pv:keep#14": {
    "particle": "under",
    "particleType": "prep",
    "sense": "통제/장악 하",
    "transparent": true
  },
  "pv:keep#15": {
    "particle": "under",
    "particleType": "none",
    "sense": "지배/통제",
    "transparent": true
  },
  "pv:keep#16": {
    "particle": "in",
    "particleType": "prep",
    "sense": "상태/안에 있음",
    "transparent": true
  },
  "pv:keep#17": {
    "particle": "in",
    "particleType": "prep",
    "sense": "포함/합류",
    "transparent": false
  },
  "pv:keep#18": {
    "particle": "on",
    "particleType": "prep",
    "sense": "장악/통제",
    "transparent": false
  },
  "pv:keep#19": {
    "particle": "at",
    "particleType": "prep",
    "sense": "지속/매달림",
    "transparent": true
  },
  "pv:keep#20": {
    "particle": "to",
    "particleType": "prep",
    "sense": "자신에게/비밀",
    "transparent": true
  },
  "pv:keep#21": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "최신 상태",
    "transparent": false
  },
  "pv:keep#22": {
    "particle": "on",
    "particleType": "prep",
    "sense": "주시 대상",
    "transparent": false
  },
  "pv:let#0": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "안으로(이동)",
    "transparent": true
  },
  "pv:let#1": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "밖으로/이동",
    "transparent": true
  },
  "pv:let#2": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "실망/낙담",
    "transparent": false
  },
  "pv:let#3": {
    "particle": "of",
    "particleType": "prep",
    "sense": "분리",
    "transparent": false
  },
  "pv:let#4": {
    "particle": "go",
    "particleType": "none",
    "sense": "놓아줌/풀어줌",
    "transparent": true
  },
  "pv:let#5": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "완화/약해짐",
    "transparent": false
  },
  "pv:let#6": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "면제/방면",
    "transparent": false
  },
  "pv:let#7": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "안으로(이동/투입)",
    "transparent": true
  },
  "pv:let#8": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "통과",
    "transparent": true
  },
  "pv:let#9": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "포함/합류",
    "transparent": true
  },
  "pv:let#10": {
    "particle": "in",
    "particleType": "none",
    "sense": "안으로/포함",
    "transparent": true
  },
  "pv:let#11": {
    "particle": "go",
    "particleType": "none",
    "sense": "놓아줌/풀어줌",
    "transparent": true
  },
  "pv:let#12": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "누설/내색",
    "transparent": false
  },
  "pv:let#13": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "면제/방면",
    "transparent": false
  },
  "pv:leave#0": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "제외/배제",
    "transparent": true
  },
  "pv:leave#1": {
    "particle": "behind",
    "particleType": "adverb",
    "sense": "뒤에 남김",
    "transparent": true
  },
  "pv:leave#2": {
    "particle": "for",
    "particleType": "prep",
    "sense": "방향/행선지",
    "transparent": false
  },
  "pv:leave#3": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "제외/배제",
    "transparent": true
  },
  "pv:leave#4": {
    "particle": "out",
    "particleType": "none",
    "sense": "제외/배제",
    "transparent": true
  },
  "pv:leave#5": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "중단/취소",
    "transparent": true
  },
  "pv:leave#6": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출발점",
    "transparent": true
  },
  "pv:leave#7": {
    "particle": "in",
    "particleType": "prep",
    "sense": "위치/안",
    "transparent": true
  },
  "pv:leave#8": {
    "particle": "with",
    "particleType": "prep",
    "sense": "위탁",
    "transparent": false
  },
  "pv:leave#9": {
    "particle": "to",
    "particleType": "prep",
    "sense": "위임/이관 대상",
    "transparent": true
  },
  "pv:leave#10": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "맡김/달려있음",
    "transparent": false
  },
  "pv:leave#11": {
    "particle": "aside",
    "particleType": "adverb",
    "sense": "제쳐둠/보류",
    "transparent": true
  },
  "pv:leave#12": {
    "particle": "aside",
    "particleType": "none",
    "sense": "제쳐둠/한쪽",
    "transparent": true
  },
  "pv:leave#13": {
    "particle": "with",
    "particleType": "prep",
    "sense": "위탁/맡김",
    "transparent": false
  },
  "pv:leave#14": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "제외/배제",
    "transparent": true
  },
  "pv:bring#0": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "제기/표면화",
    "transparent": true
  },
  "pv:bring#1": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "진입/안으로",
    "transparent": true
  },
  "pv:bring#2": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "복귀",
    "transparent": true
  },
  "pv:bring#3": {
    "particle": "to",
    "particleType": "prep",
    "sense": "방향/지향",
    "transparent": true
  },
  "pv:bring#4": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "드러냄/표출",
    "transparent": true
  },
  "pv:bring#5": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "이동/건너감",
    "transparent": true
  },
  "pv:bring#6": {
    "particle": "along",
    "particleType": "adverb",
    "sense": "동반/함께",
    "transparent": true
  },
  "pv:bring#7": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "감소/하락",
    "transparent": true
  },
  "pv:bring#8": {
    "particle": "together",
    "particleType": "adverb",
    "sense": "결합/조립",
    "transparent": true
  },
  "pv:bring#9": {
    "particle": "about",
    "particleType": "adverb",
    "sense": "발생/초래",
    "transparent": false
  },
  "pv:bring#10": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "참여/끌어들임",
    "transparent": true
  },
  "pv:bring#11": {
    "particle": "with",
    "particleType": "prep",
    "sense": "동반",
    "transparent": true
  },
  "pv:bring#12": {
    "particle": "forward",
    "particleType": "adverb",
    "sense": "제시/내놓음",
    "transparent": true
  },
  "pv:bring#13": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "제기/표면화",
    "transparent": true
  },
  "pv:bring#14": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "최신화/따라잡음",
    "transparent": false
  },
  "pv:bring#15": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "설득/마음 돌림",
    "transparent": false
  },
  "pv:turn#0": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "작동/활성화",
    "transparent": true
  },
  "pv:turn#1": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "중단/단절",
    "transparent": true
  },
  "pv:turn#2": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "증가",
    "transparent": true
  },
  "pv:turn#3": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "감소/하락",
    "transparent": true
  },
  "pv:turn#4": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "드러남/판명",
    "transparent": true
  },
  "pv:turn#5": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "드러남/판명",
    "transparent": true
  },
  "pv:turn#6": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "변화/전환",
    "transparent": true
  },
  "pv:turn#7": {
    "particle": "to",
    "particleType": "prep",
    "sense": "의지/의탁",
    "transparent": true
  },
  "pv:turn#8": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "제출/투입",
    "transparent": true
  },
  "pv:turn#9": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "방향전환/반전",
    "transparent": true
  },
  "pv:turn#10": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "뒤집기",
    "transparent": true
  },
  "pv:turn#11": {
    "particle": "against",
    "particleType": "prep",
    "sense": "적대/반감",
    "transparent": true
  },
  "pv:turn#12": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "쫓아냄/거부",
    "transparent": true
  },
  "pv:turn#13": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "복귀",
    "transparent": true
  },
  "pv:turn#14": {
    "particle": "from",
    "particleType": "prep",
    "sense": "기점/시작점",
    "transparent": true
  },
  "pv:turn#15": {
    "particle": "toward",
    "particleType": "prep",
    "sense": "방향/지향",
    "transparent": true
  },
  "pv:turn#16": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "이전/인계",
    "transparent": true
  },
  "pv:turn#17": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "처리/회송",
    "transparent": false
  },
  "pv:run#0": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "마주침/충돌",
    "transparent": true
  },
  "pv:run#1": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "소진/고갈",
    "transparent": true
  },
  "pv:run#2": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "처음부터 끝까지",
    "transparent": true
  },
  "pv:run#3": {
    "particle": "by",
    "particleType": "prep",
    "sense": "검토 의뢰(run by)",
    "transparent": false
  },
  "pv:run#4": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "떠남/탈출",
    "transparent": true
  },
  "pv:run#5": {
    "particle": "away",
    "particleType": "none",
    "sense": "떠남/이탈",
    "transparent": true
  },
  "pv:run#6": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "초과/위로",
    "transparent": true
  },
  "pv:run#7": {
    "particle": "on",
    "particleType": "prep",
    "sense": "동력원/기반",
    "transparent": false
  },
  "pv:run#8": {
    "particle": "from",
    "particleType": "prep",
    "sense": "이탈/도피",
    "transparent": true
  },
  "pv:run#9": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "여기저기/곳곳",
    "transparent": true
  },
  "pv:run#10": {
    "particle": "across",
    "particleType": "adverb",
    "sense": "우연히 마주침",
    "transparent": false
  },
  "pv:run#11": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "감소/하락",
    "transparent": true
  },
  "pv:run#12": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "직면/부딪힘",
    "transparent": true
  },
  "pv:run#13": {
    "particle": "after",
    "particleType": "prep",
    "sense": "추격/추구",
    "transparent": true
  },
  "pv:run#14": {
    "particle": "for",
    "particleType": "prep",
    "sense": "목표/추구",
    "transparent": false
  },
  "pv:run#15": {
    "particle": "to",
    "particleType": "prep",
    "sense": "방향/지향",
    "transparent": true
  },
  "pv:run#16": {
    "particle": "with",
    "particleType": "prep",
    "sense": "추진/진행 대상",
    "transparent": false
  },
  "pv:run#17": {
    "particle": "past",
    "particleType": "prep",
    "sense": "~에게 확인",
    "transparent": false
  },
  "pv:run#18": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "가동/작동",
    "transparent": true
  },
  "pv:run#19": {
    "particle": "in",
    "particleType": "prep",
    "sense": "분야/영역 안",
    "transparent": false
  },
  "pv:work#0": {
    "particle": "on",
    "particleType": "prep",
    "sense": "대상",
    "transparent": true
  },
  "pv:work#1": {
    "particle": "with",
    "particleType": "prep",
    "sense": "함께/동반",
    "transparent": true
  },
  "pv:work#2": {
    "particle": "for",
    "particleType": "prep",
    "sense": "대상/목적",
    "transparent": true
  },
  "pv:work#3": {
    "particle": "in",
    "particleType": "prep",
    "sense": "분야/영역 안",
    "transparent": true
  },
  "pv:work#4": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "해결/완료",
    "transparent": true
  },
  "pv:work#5": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "해결/완료",
    "transparent": true
  },
  "pv:work#6": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "우회/회피",
    "transparent": true
  },
  "pv:work#7": {
    "particle": "toward",
    "particleType": "prep",
    "sense": "방향/지향",
    "transparent": true
  },
  "pv:work#8": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출처/기원",
    "transparent": true
  },
  "pv:work#9": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "완수/끝까지",
    "transparent": true
  },
  "pv:work#10": {
    "particle": "against",
    "particleType": "prep",
    "sense": "불리하게",
    "transparent": true
  },
  "pv:work#11": {
    "particle": "under",
    "particleType": "adverb",
    "sense": "종속/예하",
    "transparent": true
  },
  "pv:work#12": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "해소/소모",
    "transparent": true
  },
  "pv:work#13": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "접근/도달",
    "transparent": true
  },
  "pv:work#14": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "산출/결과",
    "transparent": true
  },
  "pv:work#15": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "처음부터 끝까지",
    "transparent": true
  },
  "pv:work#16": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "해결/완료",
    "transparent": true
  },
  "pv:work#17": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "생성/구축",
    "transparent": true
  },
  "pv:work#18": {
    "particle": "alongside",
    "particleType": "prep",
    "sense": "나란히/함께",
    "transparent": true
  },
  "pv:work#19": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "편입/삽입",
    "transparent": true
  },
  "pv:look#0": {
    "particle": "at",
    "particleType": "prep",
    "sense": "대상/지점",
    "transparent": true
  },
  "pv:look#1": {
    "particle": "for",
    "particleType": "prep",
    "sense": "목적/추구",
    "transparent": true
  },
  "pv:look#2": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "깊이 파고듦",
    "transparent": true
  },
  "pv:look#3": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "조회/찾기",
    "transparent": false
  },
  "pv:look#4": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "경계/주시",
    "transparent": false
  },
  "pv:look#5": {
    "particle": "forward",
    "particleType": "adverb",
    "sense": "미래/기대",
    "transparent": true
  },
  "pv:look#6": {
    "particle": "forward",
    "particleType": "none",
    "sense": "앞/미래",
    "transparent": true
  },
  "pv:look#7": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "검토(전체)",
    "transparent": true
  },
  "pv:look#8": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "처음부터 끝까지",
    "transparent": true
  },
  "pv:look#9": {
    "particle": "after",
    "particleType": "prep",
    "sense": "돌봄/보살핌",
    "transparent": false
  },
  "pv:look#10": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "과거 회상",
    "transparent": true
  },
  "pv:look#11": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "경멸/낮춰봄",
    "transparent": true
  },
  "pv:look#12": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "존경/높여봄",
    "transparent": true
  },
  "pv:look#13": {
    "particle": "up",
    "particleType": "none",
    "sense": "위로/상승",
    "transparent": true
  },
  "pv:look#14": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "여기저기/이리저리",
    "transparent": true
  },
  "pv:look#15": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "회피/외면",
    "transparent": true
  },
  "pv:look#16": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "경계/주시",
    "transparent": false
  },
  "pv:look#17": {
    "particle": "to",
    "particleType": "prep",
    "sense": "의지/의탁",
    "transparent": true
  },
  "pv:look#18": {
    "particle": "ahead",
    "particleType": "adverb",
    "sense": "미래/앞날",
    "transparent": true
  },
  "pv:look#19": {
    "particle": "ahead",
    "particleType": "none",
    "sense": "앞/미래",
    "transparent": true
  },
  "pv:look#20": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "방문/들름",
    "transparent": true
  },
  "pv:use#0": {
    "particle": "for",
    "particleType": "prep",
    "sense": "목적/용도",
    "transparent": true
  },
  "pv:use#1": {
    "particle": "to",
    "particleType": "prep",
    "sense": "부정사",
    "transparent": true
  },
  "pv:use#2": {
    "particle": "to",
    "particleType": "none",
    "sense": "목적(~하려고)",
    "transparent": true
  },
  "pv:use#3": {
    "particle": "to",
    "particleType": "prep",
    "sense": "익숙/적응",
    "transparent": false
  },
  "pv:use#4": {
    "particle": "to",
    "particleType": "prep",
    "sense": "과거 습관",
    "transparent": false
  },
  "pv:use#5": {
    "particle": "with",
    "particleType": "prep",
    "sense": "함께/동반",
    "transparent": true
  },
  "pv:use#6": {
    "particle": "on",
    "particleType": "prep",
    "sense": "적용 대상",
    "transparent": true
  },
  "pv:use#7": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "완성/끝까지",
    "transparent": true
  },
  "pv:use#8": {
    "particle": "of",
    "particleType": "prep",
    "sense": "대상",
    "transparent": false
  },
  "pv:use#9": {
    "particle": "to",
    "particleType": "prep",
    "sense": "용도/활용",
    "transparent": true
  },
  "pv:use#10": {
    "particle": "against",
    "particleType": "prep",
    "sense": "불리하게",
    "transparent": true
  },
  "pv:use#11": {
    "particle": "in",
    "particleType": "prep",
    "sense": "분야/영역",
    "transparent": true
  },
  "pv:use#12": {
    "particle": "in",
    "particleType": "none",
    "sense": "안/범위",
    "transparent": true
  },
  "pv:use#13": {
    "particle": "for",
    "particleType": "prep",
    "sense": "목적/용도",
    "transparent": true
  },
  "pv:use#14": {
    "particle": "for",
    "particleType": "none",
    "sense": "필요/쓸모",
    "transparent": false
  },
  "pv:use#15": {
    "particle": "to",
    "particleType": "prep",
    "sense": "수혜 대상",
    "transparent": true
  },
  "pv:move#0": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "계속/지속",
    "transparent": true
  },
  "pv:move#1": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "전진/넘어감",
    "transparent": true
  },
  "pv:move#2": {
    "particle": "forward",
    "particleType": "adverb",
    "sense": "전진/추진",
    "transparent": true
  },
  "pv:move#3": {
    "particle": "forward",
    "particleType": "adverb",
    "sense": "전진/추진",
    "transparent": true
  },
  "pv:move#4": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "안으로(이동)",
    "transparent": true
  },
  "pv:move#5": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "퇴거/퇴실",
    "transparent": true
  },
  "pv:move#6": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "이동/건너감",
    "transparent": true
  },
  "pv:move#7": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "상승/승진",
    "transparent": true
  },
  "pv:move#8": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "하강/내려감",
    "transparent": true
  },
  "pv:move#9": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "여기저기/곳곳",
    "transparent": true
  },
  "pv:move#10": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "멀어짐/이동",
    "transparent": true
  },
  "pv:move#11": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "복귀",
    "transparent": true
  },
  "pv:move#12": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "분야 진출/진입",
    "transparent": true
  },
  "pv:move#13": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "벗어남/이탈",
    "transparent": true
  },
  "pv:move#14": {
    "particle": "toward",
    "particleType": "prep",
    "sense": "방향/지향",
    "transparent": true
  },
  "pv:move#15": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "통과/관통",
    "transparent": true
  },
  "pv:move#16": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출발점",
    "transparent": true
  },
  "pv:move#17": {
    "particle": "from/to",
    "particleType": "none",
    "sense": "이동(출발→도착)",
    "transparent": true
  },
  "pv:move#18": {
    "particle": "ahead",
    "particleType": "adverb",
    "sense": "전진/진행",
    "transparent": true
  },
  "pv:move#19": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "상승/승진",
    "transparent": true
  },
  "pv:move#20": {
    "particle": "up",
    "particleType": "none",
    "sense": "위로/상승",
    "transparent": true
  },
  "pv:hold#0": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "지속/계속",
    "transparent": true
  },
  "pv:hold#1": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "지탱/지연",
    "transparent": false
  },
  "pv:hold#2": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "연기/보류",
    "transparent": true
  },
  "pv:hold#3": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "억제/자제",
    "transparent": true
  },
  "pv:hold#4": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "억제/낮게 유지",
    "transparent": true
  },
  "pv:hold#5": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "완성/끝까지",
    "transparent": true
  },
  "pv:hold#6": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "버팀/지속",
    "transparent": true
  },
  "pv:hold#7": {
    "particle": "onto",
    "particleType": "prep",
    "sense": "붙듦/유지",
    "transparent": true
  },
  "pv:hold#8": {
    "particle": "to",
    "particleType": "prep",
    "sense": "고수/밀착",
    "transparent": true
  },
  "pv:hold#9": {
    "particle": "to",
    "particleType": "prep",
    "sense": "준수/고수",
    "transparent": true
  },
  "pv:hold#10": {
    "particle": "together",
    "particleType": "adverb",
    "sense": "결속",
    "transparent": true
  },
  "pv:hold#11": {
    "particle": "against",
    "particleType": "prep",
    "sense": "원망/앙심",
    "transparent": false
  },
  "pv:hold#12": {
    "particle": "for",
    "particleType": "prep",
    "sense": "책임 대상",
    "transparent": false
  },
  "pv:hold#13": {
    "particle": "in",
    "particleType": "prep",
    "sense": "제자리 고정",
    "transparent": true
  },
  "pv:hold#14": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "연기/보류",
    "transparent": true
  },
  "pv:hold#15": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "억제/자제",
    "transparent": true
  },
  "pv:hold#16": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "이월",
    "transparent": true
  },
  "pv:hold#17": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "지탱/버팀",
    "transparent": true
  },
  "pv:carry#0": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "완수/실행",
    "transparent": true
  },
  "pv:carry#1": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "지속/계속",
    "transparent": true
  },
  "pv:carry#2": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "지속/계속",
    "transparent": true
  },
  "pv:carry#3": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "이월",
    "transparent": true
  },
  "pv:carry#4": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "여기저기/곳곳",
    "transparent": true
  },
  "pv:carry#5": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "제거/분리",
    "transparent": true
  },
  "pv:carry#6": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "안으로(이동/투입)",
    "transparent": true
  },
  "pv:carry#7": {
    "particle": "with",
    "particleType": "prep",
    "sense": "동반",
    "transparent": true
  },
  "pv:carry#8": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "휩쓸림",
    "transparent": false
  },
  "pv:carry#9": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "지속/계속",
    "transparent": true
  },
  "pv:carry#10": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "복귀/되돌아옴",
    "transparent": true
  },
  "pv:carry#11": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "성공/해냄",
    "transparent": false
  },
  "pv:carry#12": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "완수/끝까지",
    "transparent": true
  },
  "pv:carry#13": {
    "particle": "forward",
    "particleType": "adverb",
    "sense": "이월",
    "transparent": true
  },
  "pv:carry#14": {
    "particle": "with",
    "particleType": "prep",
    "sense": "영향 상대",
    "transparent": false
  },
  "pv:pull#0": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "벗어남/이탈",
    "transparent": true
  },
  "pv:pull#1": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "길가로",
    "transparent": false
  },
  "pv:pull#2": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "끌어올림/멈춤",
    "transparent": true
  },
  "pv:pull#3": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "아래로/철거",
    "transparent": true
  },
  "pv:pull#4": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "끌어들임",
    "transparent": true
  },
  "pv:pull#5": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "성공/해냄",
    "transparent": false
  },
  "pv:pull#6": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "극복/버텨내기",
    "transparent": true
  },
  "pv:pull#7": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "멀어짐/이동",
    "transparent": true
  },
  "pv:pull#8": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "후퇴/물러남",
    "transparent": true
  },
  "pv:pull#9": {
    "particle": "apart",
    "particleType": "adverb",
    "sense": "분해/해체",
    "transparent": true
  },
  "pv:pull#10": {
    "particle": "together",
    "particleType": "adverb",
    "sense": "결집/모음",
    "transparent": true
  },
  "pv:pull#11": {
    "particle": "for",
    "particleType": "prep",
    "sense": "지지/찬성",
    "transparent": true
  },
  "pv:pull#12": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "참여/끌어들임",
    "transparent": true
  },
  "pv:pull#13": {
    "particle": "aside",
    "particleType": "adverb",
    "sense": "옆으로(비켜남)",
    "transparent": true
  },
  "pv:pull#14": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "벗어남/이탈",
    "transparent": true
  },
  "pv:pull#15": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "축소/감축",
    "transparent": true
  },
  "pv:pull#16": {
    "particle": "ahead",
    "particleType": "adverb",
    "sense": "앞섬/우위",
    "transparent": true
  },
  "pv:pull#17": {
    "particle": "on",
    "particleType": "prep",
    "sense": "중단 대상",
    "transparent": false
  },
  "pv:pull#18": {
    "particle": "on",
    "particleType": "none",
    "sense": "대상/주제",
    "transparent": false
  },
  "pv:pull#19": {
    "particle": "against",
    "particleType": "prep",
    "sense": "반대/대항",
    "transparent": true
  },
  "pv:push#0": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "저항/반격",
    "transparent": true
  },
  "pv:push#1": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "저항/반격",
    "transparent": true
  },
  "pv:push#2": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "완수/끝까지",
    "transparent": true
  },
  "pv:push#3": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "나눠줌/배포",
    "transparent": true
  },
  "pv:push#4": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "증가",
    "transparent": true
  },
  "pv:push#5": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "감소/하락",
    "transparent": true
  },
  "pv:push#6": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "제거/분리",
    "transparent": true
  },
  "pv:push#7": {
    "particle": "ahead",
    "particleType": "adverb",
    "sense": "전진/진행",
    "transparent": true
  },
  "pv:push#8": {
    "particle": "for",
    "particleType": "prep",
    "sense": "요청/요구",
    "transparent": true
  },
  "pv:push#9": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "몰아넣음/강요",
    "transparent": true
  },
  "pv:push#10": {
    "particle": "to",
    "particleType": "prep",
    "sense": "도달",
    "transparent": true
  },
  "pv:push#11": {
    "particle": "forward",
    "particleType": "adverb",
    "sense": "전진/추진",
    "transparent": true
  },
  "pv:push#12": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "진입/도착",
    "transparent": true
  },
  "pv:push#13": {
    "particle": "against",
    "particleType": "prep",
    "sense": "반대/대항",
    "transparent": true
  },
  "pv:push#14": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "전복/넘어짐",
    "transparent": true
  },
  "pv:push#15": {
    "particle": "past",
    "particleType": "prep",
    "sense": "지나침/넘어섬",
    "transparent": true
  },
  "pv:pick#0": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "집어올림/습득",
    "transparent": true
  },
  "pv:pick#1": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "선별/골라냄",
    "transparent": true
  },
  "pv:pick#2": {
    "particle": "on",
    "particleType": "prep",
    "sense": "대상",
    "transparent": false
  },
  "pv:pick#3": {
    "particle": "apart",
    "particleType": "adverb",
    "sense": "분해/해체",
    "transparent": true
  },
  "pv:pick#4": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출처/기원",
    "transparent": true
  },
  "pv:pick#5": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "포착/알아챔",
    "transparent": false
  },
  "pv:pick#6": {
    "particle": "between",
    "particleType": "prep",
    "sense": "선택/양자택일",
    "transparent": true
  },
  "pv:pick#7": {
    "particle": "over",
    "particleType": "prep",
    "sense": "~보다 선호",
    "transparent": true
  },
  "pv:pick#8": {
    "particle": "for",
    "particleType": "prep",
    "sense": "목적/용도",
    "transparent": true
  },
  "pv:pick#9": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "떠맡음",
    "transparent": false
  },
  "pv:pick#10": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "샅샅이(뒤지기)",
    "transparent": true
  },
  "pv:pick#11": {
    "particle": "at",
    "particleType": "prep",
    "sense": "찔끔/조금씩",
    "transparent": false
  },
  "pv:pick#12": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "재개/이어받음",
    "transparent": false
  },
  "pv:drop#0": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "내려놓음",
    "transparent": true
  },
  "pv:drop#1": {
    "particle": "by",
    "particleType": "prep",
    "sense": "잠깐 들름",
    "transparent": true
  },
  "pv:drop#2": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "잠깐 들름",
    "transparent": false
  },
  "pv:drop#3": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "이탈/탈퇴",
    "transparent": true
  },
  "pv:drop#4": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "이탈/탈퇴",
    "transparent": true
  },
  "pv:drop#5": {
    "particle": "from",
    "particleType": "prep",
    "sense": "기점/시작점",
    "transparent": true
  },
  "pv:drop#6": {
    "particle": "from",
    "particleType": "prep",
    "sense": "제거/감소",
    "transparent": true
  },
  "pv:drop#7": {
    "particle": "from",
    "particleType": "none",
    "sense": "출처/제거",
    "transparent": true
  },
  "pv:drop#8": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "뒤로 물러남",
    "transparent": true
  },
  "pv:drop#9": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "소멸/사라짐",
    "transparent": true
  },
  "pv:drop#10": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "하강/내려감",
    "transparent": true
  },
  "pv:drop#11": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "안으로(이동/투입)",
    "transparent": true
  },
  "pv:drop#12": {
    "particle": "to",
    "particleType": "prep",
    "sense": "수신/수령 대상",
    "transparent": true
  },
  "pv:drop#13": {
    "particle": "to",
    "particleType": "none",
    "sense": "도착/수신",
    "transparent": true
  },
  "pv:drop#14": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "방문/들름",
    "transparent": false
  },
  "pv:pass#0": {
    "particle": "to",
    "particleType": "prep",
    "sense": "수신/수령 대상",
    "transparent": true
  },
  "pv:pass#1": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "전진/넘어감",
    "transparent": true
  },
  "pv:pass#2": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "의식 소멸",
    "transparent": false
  },
  "pv:pass#3": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "소멸/사라짐",
    "transparent": false
  },
  "pv:pass#4": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "여기저기/곳곳",
    "transparent": true
  },
  "pv:pass#5": {
    "particle": "by",
    "particleType": "adverb",
    "sense": "지나감",
    "transparent": true
  },
  "pv:pass#6": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "통과/관통",
    "transparent": true
  },
  "pv:pass#7": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "건너뜀/생략",
    "transparent": true
  },
  "pv:pass#8": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "전수/물려줌",
    "transparent": true
  },
  "pv:pass#9": {
    "particle": "along",
    "particleType": "adverb",
    "sense": "전달/넘김",
    "transparent": true
  },
  "pv:pass#10": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "거절/포기",
    "transparent": false
  },
  "pv:pass#11": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "전달/넘김",
    "transparent": true
  },
  "pv:pass#12": {
    "particle": "along",
    "particleType": "adverb",
    "sense": "전달/넘김",
    "transparent": true
  },
  "pv:pass#13": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "위장/사칭",
    "transparent": false
  },
  "pv:pass#14": {
    "particle": "for",
    "particleType": "prep",
    "sense": "~로 간주됨",
    "transparent": false
  },
  "pv:hand#0": {
    "particle": "to",
    "particleType": "prep",
    "sense": "수신/수령 대상",
    "transparent": true
  },
  "pv:hand#1": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "제출/투입",
    "transparent": true
  },
  "pv:hand#2": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "분배",
    "transparent": true
  },
  "pv:hand#3": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "이전/인계",
    "transparent": true
  },
  "pv:hand#4": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "되돌려줌",
    "transparent": true
  },
  "pv:hand#5": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "전수/물려줌",
    "transparent": true
  },
  "pv:hand#6": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "인계/넘김",
    "transparent": true
  },
  "pv:hand#7": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "이전/인계",
    "transparent": true
  },
  "pv:hand#8": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "제출/투입",
    "transparent": true
  },
  "pv:hand#9": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "인계/넘김",
    "transparent": true
  },
  "pv:hand#10": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "여기저기/곳곳",
    "transparent": true
  },
  "pv:fill#0": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "기입/채워넣음",
    "transparent": true
  },
  "pv:fill#1": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "완성/철저",
    "transparent": true
  },
  "pv:fill#2": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "완성/끝까지",
    "transparent": true
  },
  "pv:fill#3": {
    "particle": "with",
    "particleType": "prep",
    "sense": "충만/내용물",
    "transparent": true
  },
  "pv:fill#4": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "대체/대타",
    "transparent": true
  },
  "pv:fill#5": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "정보 채움",
    "transparent": true
  },
  "pv:fill#6": {
    "particle": "with",
    "particleType": "prep",
    "sense": "재료/내용",
    "transparent": true
  },
  "pv:fill#7": {
    "particle": "with",
    "particleType": "prep",
    "sense": "충만/내용물",
    "transparent": true
  },
  "pv:fill#8": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "기입/채워넣음",
    "transparent": true
  },
  "pv:clear#0": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "해소/해결",
    "transparent": true
  },
  "pv:clear#1": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "제거/소멸",
    "transparent": true
  },
  "pv:clear#2": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "치움/보관",
    "transparent": true
  },
  "pv:clear#3": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "제거",
    "transparent": true
  },
  "pv:clear#4": {
    "particle": "with",
    "particleType": "prep",
    "sense": "상호작용 대상",
    "transparent": true
  },
  "pv:clear#5": {
    "particle": "from",
    "particleType": "prep",
    "sense": "분리/제거",
    "transparent": true
  },
  "pv:clear#6": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "명확화/해소",
    "transparent": true
  },
  "pv:clear#7": {
    "particle": "for",
    "particleType": "prep",
    "sense": "대상/목적",
    "transparent": true
  },
  "pv:clear#8": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "해소/해결",
    "transparent": true
  },
  "pv:clear#9": {
    "particle": "for",
    "particleType": "prep",
    "sense": "대상/목적",
    "transparent": true
  },
  "pv:clear#10": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "통과/관통",
    "transparent": true
  },
  "pv:clear#11": {
    "particle": "of",
    "particleType": "prep",
    "sense": "제거/박탈",
    "transparent": false
  },
  "pv:clear#12": {
    "particle": "of",
    "particleType": "prep",
    "sense": "제거/박탈",
    "transparent": false
  },
  "pv:clean#0": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "완성/끝까지",
    "transparent": true
  },
  "pv:clean#1": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "제거/소멸",
    "transparent": true
  },
  "pv:clean#2": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "제거",
    "transparent": true
  },
  "pv:clean#3": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "치움/보관",
    "transparent": true
  },
  "pv:clean#4": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "완성/끝까지",
    "transparent": true
  },
  "pv:clean#5": {
    "particle": "with",
    "particleType": "prep",
    "sense": "수단/도구",
    "transparent": true
  },
  "pv:clean#6": {
    "particle": "from",
    "particleType": "prep",
    "sense": "분리/제거",
    "transparent": true
  },
  "pv:clean#7": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "제거/소멸",
    "transparent": true
  },
  "pv:clean#8": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "완성/끝까지",
    "transparent": true
  },
  "pv:cut#0": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "중단/단절",
    "transparent": true
  },
  "pv:cut#1": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "감소/하락",
    "transparent": true
  },
  "pv:cut#2": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "제거/삭제",
    "transparent": true
  },
  "pv:cut#3": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "감축/억제",
    "transparent": true
  },
  "pv:cut#4": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "개입/끼어듦",
    "transparent": true
  },
  "pv:cut#5": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "돌파/극복",
    "transparent": true
  },
  "pv:cut#6": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "잠식/침식",
    "transparent": true
  },
  "pv:cut#7": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "완성/끝까지",
    "transparent": true
  },
  "pv:cut#8": {
    "particle": "from",
    "particleType": "prep",
    "sense": "분리/제거",
    "transparent": true
  },
  "pv:cut#9": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "중단/단절",
    "transparent": true
  },
  "pv:cut#10": {
    "particle": "across",
    "particleType": "adverb",
    "sense": "가로질러/횡단",
    "transparent": true
  },
  "pv:cut#11": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "제거/소멸",
    "transparent": true
  },
  "pv:cut#12": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "전환",
    "transparent": true
  },
  "pv:cut#13": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "적합/소질",
    "transparent": false
  },
  "pv:cut#14": {
    "particle": "out",
    "particleType": "none",
    "sense": "적합/소질(관용)",
    "transparent": false
  },
  "pv:cut#15": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "개입/끼어듦",
    "transparent": true
  },
  "pv:break#0": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "붕괴/고장",
    "transparent": true
  },
  "pv:break#1": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "분해/세분화",
    "transparent": true
  },
  "pv:break#2": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "해체/분리",
    "transparent": false
  },
  "pv:break#3": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "관계 종료/분리",
    "transparent": false
  },
  "pv:break#4": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "안으로(이동)",
    "transparent": true
  },
  "pv:break#5": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "침입/무단 진입",
    "transparent": true
  },
  "pv:break#6": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "표출/공개",
    "transparent": true
  },
  "pv:break#7": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "탈출/벗어남",
    "transparent": true
  },
  "pv:break#8": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "중단/단절",
    "transparent": true
  },
  "pv:break#9": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "돌파/극복",
    "transparent": true
  },
  "pv:break#10": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "제거/분리",
    "transparent": true
  },
  "pv:break#11": {
    "particle": "apart",
    "particleType": "adverb",
    "sense": "분해/산산이",
    "transparent": true
  },
  "pv:break#12": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "분할/분류",
    "transparent": true
  },
  "pv:break#13": {
    "particle": "to",
    "particleType": "prep",
    "sense": "대상/수령",
    "transparent": true
  },
  "pv:break#14": {
    "particle": "even",
    "particleType": "none",
    "sense": "손익균형(본전)",
    "transparent": false
  },
  "pv:break#15": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "분해/세분화",
    "transparent": true
  },
  "pv:break#16": {
    "particle": "with",
    "particleType": "prep",
    "sense": "결별/이별 상대",
    "transparent": false
  },
  "pv:break#17": {
    "particle": "the ice",
    "particleType": "none",
    "sense": "긴장 해소(어색함 깨기)",
    "transparent": false
  },
  "pv:fix#0": {
    "particle": "—",
    "particleType": "none",
    "sense": "수리·해결",
    "transparent": true
  },
  "pv:fix#1": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "완성/끝까지",
    "transparent": true
  },
  "pv:fix#2": {
    "particle": "in",
    "particleType": "prep",
    "sense": "위치/안",
    "transparent": true
  },
  "pv:fix#3": {
    "particle": "to",
    "particleType": "prep",
    "sense": "부착/접촉",
    "transparent": true
  },
  "pv:fix#4": {
    "particle": "with",
    "particleType": "prep",
    "sense": "수단/도구",
    "transparent": true
  },
  "pv:fix#5": {
    "particle": "for",
    "particleType": "prep",
    "sense": "수혜/대상",
    "transparent": true
  },
  "pv:fix#6": {
    "particle": "on",
    "particleType": "prep",
    "sense": "대상/초점",
    "transparent": true
  },
  "pv:fix#7": {
    "particle": "for",
    "particleType": "prep",
    "sense": "대상/목적",
    "transparent": true
  },
  "pv:fix#8": {
    "particle": "on",
    "particleType": "prep",
    "sense": "대상/관련",
    "transparent": true
  },
  "pv:fix#9": {
    "particle": "on",
    "particleType": "prep",
    "sense": "대상",
    "transparent": false
  },
  "pv:build#0": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "증가",
    "transparent": true
  },
  "pv:build#1": {
    "particle": "on",
    "particleType": "prep",
    "sense": "기반/토대",
    "transparent": true
  },
  "pv:build#2": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "편입/삽입",
    "transparent": true
  },
  "pv:build#3": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출발점",
    "transparent": true
  },
  "pv:build#4": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "펼침/확장",
    "transparent": true
  },
  "pv:build#5": {
    "particle": "for",
    "particleType": "prep",
    "sense": "대상/목적",
    "transparent": true
  },
  "pv:build#6": {
    "particle": "with",
    "particleType": "prep",
    "sense": "재료/내용",
    "transparent": true
  },
  "pv:build#7": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "둘러쌈/중심",
    "transparent": true
  },
  "pv:build#8": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "변화/전환",
    "transparent": true
  },
  "pv:build#9": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출발점",
    "transparent": true
  },
  "pv:build#10": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "기간에 걸쳐",
    "transparent": true
  },
  "pv:build#11": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "증가",
    "transparent": true
  },
  "pv:build#12": {
    "particle": "on",
    "particleType": "prep",
    "sense": "토대/근거",
    "transparent": true
  },
  "pv:build#13": {
    "particle": "for",
    "particleType": "prep",
    "sense": "지지/찬성",
    "transparent": true
  },
  "pv:build#14": {
    "particle": "upon",
    "particleType": "prep",
    "sense": "기반(~위에)",
    "transparent": true
  },
  "pv:open#0": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "완성/끝까지",
    "transparent": true
  },
  "pv:open#1": {
    "particle": "to",
    "particleType": "prep",
    "sense": "대상/수령",
    "transparent": true
  },
  "pv:open#2": {
    "particle": "for",
    "particleType": "prep",
    "sense": "목적/용도",
    "transparent": true
  },
  "pv:open#3": {
    "particle": "with",
    "particleType": "prep",
    "sense": "시작 소재",
    "transparent": true
  },
  "pv:open#4": {
    "particle": "in",
    "particleType": "prep",
    "sense": "장소/내부",
    "transparent": true
  },
  "pv:open#5": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "털어놓음/공개",
    "transparent": true
  },
  "pv:open#6": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "마음 열기",
    "transparent": true
  },
  "pv:open#7": {
    "particle": "with",
    "particleType": "prep",
    "sense": "수단/도구",
    "transparent": true
  },
  "pv:open#8": {
    "particle": "to",
    "particleType": "prep",
    "sense": "수용/열림",
    "transparent": true
  },
  "pv:open#9": {
    "particle": "about",
    "particleType": "prep",
    "sense": "주제/관련",
    "transparent": true
  },
  "pv:open#10": {
    "particle": "with",
    "particleType": "prep",
    "sense": "상대/대상",
    "transparent": true
  },
  "pv:open#11": {
    "particle": "into",
    "particleType": "prep",
    "sense": "연결/이어짐",
    "transparent": true
  },
  "pv:open#12": {
    "particle": "onto",
    "particleType": "prep",
    "sense": "방향/이동",
    "transparent": true
  },
  "pv:open#13": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "펼침/확장",
    "transparent": true
  },
  "pv:close#0": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "정지/폐쇄",
    "transparent": true
  },
  "pv:close#1": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "차단/분리",
    "transparent": true
  },
  "pv:close#2": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "접근/포위",
    "transparent": true
  },
  "pv:close#3": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "완성/끝까지",
    "transparent": true
  },
  "pv:close#4": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "완성/끝까지",
    "transparent": true
  },
  "pv:close#5": {
    "particle": "with",
    "particleType": "prep",
    "sense": "마무리 수단",
    "transparent": true
  },
  "pv:close#6": {
    "particle": "to",
    "particleType": "prep",
    "sense": "대상",
    "transparent": true
  },
  "pv:close#7": {
    "particle": "with",
    "particleType": "prep",
    "sense": "상대/대상",
    "transparent": true
  },
  "pv:close#8": {
    "particle": "to",
    "particleType": "prep",
    "sense": "근접",
    "transparent": true
  },
  "pv:close#9": {
    "particle": "to",
    "particleType": "prep",
    "sense": "근접",
    "transparent": true
  },
  "pv:close#10": {
    "particle": "with",
    "particleType": "prep",
    "sense": "친숙/관계 대상",
    "transparent": true
  },
  "pv:close#11": {
    "particle": "from",
    "particleType": "prep",
    "sense": "기점/시작점",
    "transparent": true
  },
  "pv:start#0": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "처음부터 다시",
    "transparent": true
  },
  "pv:start#1": {
    "particle": "with",
    "particleType": "prep",
    "sense": "시작 소재",
    "transparent": true
  },
  "pv:start#2": {
    "particle": "to",
    "particleType": "none",
    "sense": "to부정사(대상 행위)",
    "transparent": true
  },
  "pv:start#3": {
    "particle": "-ing",
    "particleType": "none",
    "sense": "동명사(행위 대상)",
    "transparent": true
  },
  "pv:start#4": {
    "particle": "on",
    "particleType": "prep",
    "sense": "대상/초점",
    "transparent": true
  },
  "pv:start#5": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "가동/작동",
    "transparent": true
  },
  "pv:start#6": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "출발/시작",
    "transparent": true
  },
  "pv:start#7": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "출발/시작",
    "transparent": true
  },
  "pv:start#8": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "착수/시작",
    "transparent": true
  },
  "pv:start#9": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "착수/시작",
    "transparent": true
  },
  "pv:start#10": {
    "particle": "on",
    "particleType": "prep",
    "sense": "대상/초점",
    "transparent": true
  },
  "pv:start#11": {
    "particle": "from",
    "particleType": "prep",
    "sense": "기점/시작점",
    "transparent": true
  },
  "pv:start#12": {
    "particle": "by",
    "particleType": "prep",
    "sense": "수단/방법",
    "transparent": true
  },
  "pv:start#13": {
    "particle": "in",
    "particleType": "prep",
    "sense": "분야/영역",
    "transparent": true
  },
  "pv:start#14": {
    "particle": "as",
    "particleType": "prep",
    "sense": "역할/자격",
    "transparent": true
  },
  "pv:start#15": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "출발/시작",
    "transparent": true
  },
  "pv:start#16": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "재개/재가동",
    "transparent": true
  },
  "pv:stop#0": {
    "particle": "by",
    "particleType": "adverb",
    "sense": "잠깐 들름",
    "transparent": true
  },
  "pv:stop#1": {
    "particle": "from",
    "particleType": "prep",
    "sense": "방지/차단",
    "transparent": true
  },
  "pv:stop#2": {
    "particle": "at",
    "particleType": "prep",
    "sense": "지점/위치",
    "transparent": true
  },
  "pv:stop#3": {
    "particle": "-ing",
    "particleType": "none",
    "sense": "동명사(행위 대상)",
    "transparent": true
  },
  "pv:stop#4": {
    "particle": "to",
    "particleType": "none",
    "sense": "to부정사(목적)",
    "transparent": true
  },
  "pv:stop#5": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "잠깐 들름",
    "transparent": true
  },
  "pv:stop#6": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "도중 들름",
    "transparent": false
  },
  "pv:stop#7": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "경유/체류",
    "transparent": false
  },
  "pv:stop#8": {
    "particle": "for",
    "particleType": "prep",
    "sense": "대상/목적",
    "transparent": true
  },
  "pv:stop#9": {
    "particle": "to",
    "particleType": "prep",
    "sense": "도달",
    "transparent": true
  },
  "pv:stop#10": {
    "particle": "to",
    "particleType": "prep",
    "sense": "대상",
    "transparent": true
  },
  "pv:stop#11": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "완성/끝까지",
    "transparent": true
  },
  "pv:stop#12": {
    "particle": "of",
    "particleType": "prep",
    "sense": "직전/미달",
    "transparent": false
  },
  "pv:say#0": {
    "particle": "to",
    "particleType": "prep",
    "sense": "대상",
    "transparent": true
  },
  "pv:say#1": {
    "particle": "about",
    "particleType": "prep",
    "sense": "주제/관련",
    "transparent": true
  },
  "pv:say#2": {
    "particle": "to",
    "particleType": "prep",
    "sense": "대상",
    "transparent": true
  },
  "pv:say#3": {
    "particle": "in",
    "particleType": "prep",
    "sense": "수단/방식",
    "transparent": true
  },
  "pv:say#4": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "표출/공개",
    "transparent": true
  },
  "pv:say#5": {
    "particle": "that",
    "particleType": "none",
    "sense": "that절(전달·인용)",
    "transparent": true
  },
  "pv:say#6": {
    "particle": "without",
    "particleType": "prep",
    "sense": "결여/부재",
    "transparent": true
  },
  "pv:say#7": {
    "particle": "about",
    "particleType": "prep",
    "sense": "주제/관련",
    "transparent": true
  },
  "pv:say#8": {
    "particle": "for",
    "particleType": "prep",
    "sense": "확실성",
    "transparent": false
  },
  "pv:say#9": {
    "particle": "to",
    "particleType": "prep",
    "sense": "대상",
    "transparent": true
  },
  "pv:say#10": {
    "particle": "that",
    "particleType": "none",
    "sense": "추측 완충(아마)",
    "transparent": false
  },
  "pv:say#11": {
    "particle": "—",
    "particleType": "none",
    "sense": "당연히(담화표지)",
    "transparent": false
  },
  "pv:say#12": {
    "particle": "—",
    "particleType": "none",
    "sense": "절제 표현(담화표지)",
    "transparent": false
  },
  "pv:say#13": {
    "particle": "under",
    "particleType": "prep",
    "sense": "은밀/잠행",
    "transparent": false
  },
  "pv:tell#0": {
    "particle": "about",
    "particleType": "prep",
    "sense": "주제/관련",
    "transparent": true
  },
  "pv:tell#1": {
    "particle": "to",
    "particleType": "none",
    "sense": "to부정사(대상 행위)",
    "transparent": true
  },
  "pv:tell#2": {
    "particle": "between",
    "particleType": "prep",
    "sense": "구별/구분",
    "transparent": true
  },
  "pv:tell#3": {
    "particle": "—",
    "particleType": "none",
    "sense": "이중목적어(전달)",
    "transparent": true
  },
  "pv:tell#4": {
    "particle": "that",
    "particleType": "none",
    "sense": "that절(전달·인용)",
    "transparent": true
  },
  "pv:tell#5": {
    "particle": "that",
    "particleType": "none",
    "sense": "감지·분별(보면 안다)",
    "transparent": false
  },
  "pv:tell#6": {
    "particle": "apart",
    "particleType": "adverb",
    "sense": "구별/분리",
    "transparent": true
  },
  "pv:tell#7": {
    "particle": "from",
    "particleType": "prep",
    "sense": "분리/구별",
    "transparent": true
  },
  "pv:tell#8": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "질책/혼냄",
    "transparent": false
  },
  "pv:tell#9": {
    "particle": "on",
    "particleType": "prep",
    "sense": "고자질/밀고",
    "transparent": false
  },
  "pv:tell#10": {
    "particle": "by",
    "particleType": "prep",
    "sense": "수단/방법",
    "transparent": true
  },
  "pv:tell#11": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출처/기원",
    "transparent": true
  },
  "pv:tell#12": {
    "particle": "—",
    "particleType": "none",
    "sense": "솔직히(담화표지)",
    "transparent": false
  },
  "pv:tell#13": {
    "particle": "—",
    "particleType": "none",
    "sense": "예측 불가",
    "transparent": false
  },
  "pv:tell#14": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "질책/혼냄",
    "transparent": false
  },
  "pv:tell#15": {
    "particle": "of",
    "particleType": "prep",
    "sense": "관하여",
    "transparent": true
  },
  "pv:tell#16": {
    "particle": "against",
    "particleType": "prep",
    "sense": "불리하게",
    "transparent": true
  },
  "pv:tell#17": {
    "particle": "straight",
    "particleType": "none",
    "sense": "직설(방식)",
    "transparent": true
  },
  "pv:ask#0": {
    "particle": "for",
    "particleType": "prep",
    "sense": "요청/요구",
    "transparent": true
  },
  "pv:ask#1": {
    "particle": "about",
    "particleType": "prep",
    "sense": "주제/관련",
    "transparent": true
  },
  "pv:ask#2": {
    "particle": "to",
    "particleType": "none",
    "sense": "to부정사(대상 행위)",
    "transparent": true
  },
  "pv:ask#3": {
    "particle": "about",
    "particleType": "prep",
    "sense": "주제/관련",
    "transparent": true
  },
  "pv:ask#4": {
    "particle": "for",
    "particleType": "prep",
    "sense": "요청/요구",
    "transparent": true
  },
  "pv:ask#5": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "여기저기/곳곳",
    "transparent": true
  },
  "pv:ask#6": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "데이트 신청",
    "transparent": false
  },
  "pv:ask#7": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "끌어들임",
    "transparent": true
  },
  "pv:ask#8": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "이동/건너감",
    "transparent": true
  },
  "pv:ask#9": {
    "particle": "of",
    "particleType": "prep",
    "sense": "요구(출처)",
    "transparent": false
  },
  "pv:ask#10": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "여기저기/곳곳",
    "transparent": true
  },
  "pv:ask#11": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "지속/계속",
    "transparent": false
  },
  "pv:ask#12": {
    "particle": "after",
    "particleType": "prep",
    "sense": "안부",
    "transparent": false
  },
  "pv:talk#0": {
    "particle": "to",
    "particleType": "prep",
    "sense": "대상",
    "transparent": true
  },
  "pv:talk#1": {
    "particle": "with",
    "particleType": "prep",
    "sense": "함께/동반",
    "transparent": true
  },
  "pv:talk#2": {
    "particle": "about",
    "particleType": "prep",
    "sense": "주제/관련",
    "transparent": true
  },
  "pv:talk#3": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "검토(전체)",
    "transparent": true
  },
  "pv:talk#4": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "처음부터 끝까지",
    "transparent": true
  },
  "pv:talk#5": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "안내/설명",
    "transparent": true
  },
  "pv:talk#6": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "경멸/낮춰봄",
    "transparent": true
  },
  "pv:talk#7": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "설득/유도(행동 진입)",
    "transparent": true
  },
  "pv:talk#8": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "설득/단념",
    "transparent": true
  },
  "pv:talk#9": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "되받아침/말대꾸",
    "transparent": true
  },
  "pv:talk#10": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "치켜세움/띄움",
    "transparent": true
  },
  "pv:talk#11": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "우회/회피",
    "transparent": true
  },
  "pv:talk#12": {
    "particle": "shop",
    "particleType": "none",
    "sense": "일 얘기",
    "transparent": false
  },
  "pv:talk#13": {
    "particle": "in",
    "particleType": "prep",
    "sense": "관점/틀",
    "transparent": false
  },
  "pv:talk#14": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "진정/완화",
    "transparent": true
  },
  "pv:talk#15": {
    "particle": "past",
    "particleType": "adverb",
    "sense": "어긋남/빗나감",
    "transparent": true
  },
  "pv:call#0": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "답신/응답",
    "transparent": true
  },
  "pv:call#1": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "중단/취소",
    "transparent": true
  },
  "pv:call#2": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "드러냄/공개",
    "transparent": true
  },
  "pv:call#3": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "드러냄/공개",
    "transparent": true
  },
  "pv:call#4": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "진입/안으로",
    "transparent": true
  },
  "pv:call#5": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "확인/등록",
    "transparent": false
  },
  "pv:call#6": {
    "particle": "on",
    "particleType": "prep",
    "sense": "지명/요청 대상",
    "transparent": false
  },
  "pv:call#7": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "호출/불러옴",
    "transparent": true
  },
  "pv:call#8": {
    "particle": "for",
    "particleType": "prep",
    "sense": "요청/요구",
    "transparent": false
  },
  "pv:call#9": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "여기저기/곳곳",
    "transparent": true
  },
  "pv:call#10": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "이동/건너감",
    "transparent": true
  },
  "pv:call#11": {
    "particle": "about",
    "particleType": "prep",
    "sense": "주제/관련",
    "transparent": true
  },
  "pv:call#12": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "의문 제기(상태 유발)",
    "transparent": true
  },
  "pv:call#13": {
    "particle": "to",
    "particleType": "prep",
    "sense": "주의 대상",
    "transparent": true
  },
  "pv:call#14": {
    "particle": "by",
    "particleType": "prep",
    "sense": "식별",
    "transparent": false
  },
  "pv:call#15": {
    "particle": "ahead",
    "particleType": "adverb",
    "sense": "미리/앞일",
    "transparent": true
  },
  "pv:call#16": {
    "particle": "a day",
    "particleType": "none",
    "sense": "일과 종료",
    "transparent": false
  },
  "pv:check#0": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "확인/등록",
    "transparent": false
  },
  "pv:check#1": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "안부확인",
    "transparent": false
  },
  "pv:check#2": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "살펴봄/검토",
    "transparent": false
  },
  "pv:check#3": {
    "particle": "on",
    "particleType": "prep",
    "sense": "대상",
    "transparent": true
  },
  "pv:check#4": {
    "particle": "with",
    "particleType": "prep",
    "sense": "협의/상대",
    "transparent": true
  },
  "pv:check#5": {
    "particle": "for",
    "particleType": "prep",
    "sense": "탐색/확인",
    "transparent": true
  },
  "pv:check#6": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "검토",
    "transparent": true
  },
  "pv:check#7": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "처음부터 끝까지",
    "transparent": true
  },
  "pv:check#8": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "완료/목록에서 지움",
    "transparent": true
  },
  "pv:check#9": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "확인/점검",
    "transparent": false
  },
  "pv:check#10": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "조사/탐구",
    "transparent": true
  },
  "pv:check#11": {
    "particle": "against",
    "particleType": "prep",
    "sense": "대조/비교",
    "transparent": true
  },
  "pv:check#12": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "퇴거/퇴실",
    "transparent": true
  },
  "pv:check#13": {
    "particle": "with",
    "particleType": "prep",
    "sense": "협의/상대",
    "transparent": true
  },
  "pv:check#14": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "복귀/되돌아옴",
    "transparent": true
  },
  "pv:check#15": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "안부확인",
    "transparent": false
  },
  "pv:check#16": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출처/기원",
    "transparent": true
  },
  "pv:find#0": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "드러남/알아냄",
    "transparent": true
  },
  "pv:find#1": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "드러남/알아냄",
    "transparent": true
  },
  "pv:find#2": {
    "particle": "in",
    "particleType": "prep",
    "sense": "위치/안",
    "transparent": true
  },
  "pv:find#3": {
    "particle": "for",
    "particleType": "prep",
    "sense": "수혜/대상",
    "transparent": true
  },
  "pv:find#4": {
    "particle": "to",
    "particleType": "none",
    "sense": "to부정사(대상 행위)",
    "transparent": true
  },
  "pv:find#5": {
    "particle": "to",
    "particleType": "none",
    "sense": "to부정사(대상 행위)",
    "transparent": true
  },
  "pv:find#6": {
    "particle": "in",
    "particleType": "prep",
    "sense": "상태/안에 있음",
    "transparent": true
  },
  "pv:find#7": {
    "particle": "with",
    "particleType": "prep",
    "sense": "상대/대상",
    "transparent": true
  },
  "pv:find#8": {
    "particle": "with",
    "particleType": "prep",
    "sense": "관련/상대 대상",
    "transparent": true
  },
  "pv:find#9": {
    "particle": "by",
    "particleType": "prep",
    "sense": "수단/방법",
    "transparent": true
  },
  "pv:find#10": {
    "particle": "through",
    "particleType": "prep",
    "sense": "경유/수단",
    "transparent": true
  },
  "pv:find#11": {
    "particle": "to",
    "particleType": "none",
    "sense": "to부정사(대상 행위)",
    "transparent": true
  },
  "pv:find#12": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "여기저기/곳곳",
    "transparent": true
  },
  "pv:find#13": {
    "particle": "for",
    "particleType": "prep",
    "sense": "유리/불리 판결",
    "transparent": false
  },
  "pv:think#0": {
    "particle": "about",
    "particleType": "prep",
    "sense": "주제/관련",
    "transparent": true
  },
  "pv:think#1": {
    "particle": "of",
    "particleType": "prep",
    "sense": "관하여",
    "transparent": true
  },
  "pv:think#2": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "검토(전체)",
    "transparent": true
  },
  "pv:think#3": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "끝까지/완수",
    "transparent": true
  },
  "pv:think#4": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "만들어냄/생성",
    "transparent": true
  },
  "pv:think#5": {
    "particle": "ahead",
    "particleType": "adverb",
    "sense": "미리/앞일",
    "transparent": true
  },
  "pv:think#6": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "과거 회상",
    "transparent": true
  },
  "pv:think#7": {
    "particle": "of",
    "particleType": "prep",
    "sense": "관하여",
    "transparent": true
  },
  "pv:think#8": {
    "particle": "to",
    "particleType": "prep",
    "sense": "자신에게(to oneself)",
    "transparent": true
  },
  "pv:think#9": {
    "particle": "aloud",
    "particleType": "none",
    "sense": "소리 내어(방식)",
    "transparent": true
  },
  "pv:think#10": {
    "particle": "in",
    "particleType": "prep",
    "sense": "관점/틀",
    "transparent": false
  },
  "pv:think#11": {
    "particle": "of",
    "particleType": "prep",
    "sense": "평가 대상",
    "transparent": true
  },
  "pv:think#12": {
    "particle": "about",
    "particleType": "prep",
    "sense": "주제/관련",
    "transparent": true
  },
  "pv:think#13": {
    "particle": "of",
    "particleType": "prep",
    "sense": "관하여",
    "transparent": false
  },
  "pv:think#14": {
    "particle": "of",
    "particleType": "prep",
    "sense": "관하여",
    "transparent": false
  },
  "pv:think#15": {
    "particle": "on",
    "particleType": "prep",
    "sense": "즉석/임기응변",
    "transparent": false
  },
  "pv:know#0": {
    "particle": "about",
    "particleType": "prep",
    "sense": "주제/관련",
    "transparent": true
  },
  "pv:know#1": {
    "particle": "to",
    "particleType": "none",
    "sense": "to부정사(대상 행위)",
    "transparent": true
  },
  "pv:know#2": {
    "particle": "to",
    "particleType": "none",
    "sense": "to부정사(대상 행위)",
    "transparent": true
  },
  "pv:know#3": {
    "particle": "about",
    "particleType": "prep",
    "sense": "주제/관련",
    "transparent": true
  },
  "pv:know#4": {
    "particle": "of",
    "particleType": "prep",
    "sense": "인지 대상",
    "transparent": true
  },
  "pv:know#5": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출처/기원",
    "transparent": true
  },
  "pv:know#6": {
    "particle": "by",
    "particleType": "prep",
    "sense": "식별",
    "transparent": true
  },
  "pv:know#7": {
    "particle": "for",
    "particleType": "prep",
    "sense": "이유/원인",
    "transparent": true
  },
  "pv:know#8": {
    "particle": "as",
    "particleType": "prep",
    "sense": "분류/명칭",
    "transparent": true
  },
  "pv:know#9": {
    "particle": "to",
    "particleType": "prep",
    "sense": "대상",
    "transparent": true
  },
  "pv:know#10": {
    "particle": "than to",
    "particleType": "none",
    "sense": "분별(~안 할 만큼)",
    "transparent": false
  },
  "pv:know#11": {
    "particle": "inside out",
    "particleType": "adverb",
    "sense": "철저/완전",
    "transparent": false
  },
  "pv:know#12": {
    "particle": "for",
    "particleType": "prep",
    "sense": "확실성",
    "transparent": false
  },
  "pv:know#13": {
    "particle": "—",
    "particleType": "none",
    "sense": "아는 한(완충)",
    "transparent": false
  },
  "pv:know#14": {
    "particle": "off",
    "particleType": "prep",
    "sense": "즉석/암기",
    "transparent": false
  },
  "pv:know#15": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "여기저기/곳곳",
    "transparent": true
  },
  "pv:know#16": {
    "particle": "of",
    "particleType": "prep",
    "sense": "인지 대상",
    "transparent": true
  },
  "pv:know#17": {
    "particle": "by",
    "particleType": "prep",
    "sense": "식별",
    "transparent": true
  },
  "pv:learn#0": {
    "particle": "about",
    "particleType": "prep",
    "sense": "주제/관련",
    "transparent": true
  },
  "pv:learn#1": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출처/기원",
    "transparent": true
  },
  "pv:learn#2": {
    "particle": "to",
    "particleType": "none",
    "sense": "to부정사(대상 행위)",
    "transparent": true
  },
  "pv:learn#3": {
    "particle": "how",
    "particleType": "none",
    "sense": "방법(how)",
    "transparent": true
  },
  "pv:learn#4": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출처/기원",
    "transparent": true
  },
  "pv:learn#5": {
    "particle": "by",
    "particleType": "prep",
    "sense": "수단/방법",
    "transparent": true
  },
  "pv:learn#6": {
    "particle": "of",
    "particleType": "prep",
    "sense": "관하여",
    "transparent": true
  },
  "pv:learn#7": {
    "particle": "through",
    "particleType": "prep",
    "sense": "매개/경유",
    "transparent": true
  },
  "pv:learn#8": {
    "particle": "over",
    "particleType": "prep",
    "sense": "기간에 걸쳐",
    "transparent": true
  },
  "pv:learn#9": {
    "particle": "the hard way",
    "particleType": "none",
    "sense": "관용구(시행착오)",
    "transparent": false
  },
  "pv:learn#10": {
    "particle": "by",
    "particleType": "prep",
    "sense": "암기(by heart)",
    "transparent": false
  },
  "pv:learn#11": {
    "particle": "from",
    "particleType": "prep",
    "sense": "기점/시작점",
    "transparent": true
  },
  "pv:learn#12": {
    "particle": "the ropes",
    "particleType": "none",
    "sense": "관용구(요령 익힘)",
    "transparent": false
  },
  "pv:learn#13": {
    "particle": "on",
    "particleType": "prep",
    "sense": "계속/지속",
    "transparent": true
  },
  "pv:learn#14": {
    "particle": "one's lesson",
    "particleType": "none",
    "sense": "관용구(교훈)",
    "transparent": false
  },
  "pv:explain#0": {
    "particle": "to",
    "particleType": "prep",
    "sense": "대상",
    "transparent": true
  },
  "pv:explain#1": {
    "particle": "why",
    "particleType": "none",
    "sense": "이유(why)",
    "transparent": true
  },
  "pv:explain#2": {
    "particle": "how",
    "particleType": "none",
    "sense": "방법(how)",
    "transparent": true
  },
  "pv:explain#3": {
    "particle": "in",
    "particleType": "prep",
    "sense": "관점/틀",
    "transparent": false
  },
  "pv:explain#4": {
    "particle": "by",
    "particleType": "prep",
    "sense": "수단/방법",
    "transparent": true
  },
  "pv:explain#5": {
    "particle": "with",
    "particleType": "prep",
    "sense": "수단/도구",
    "transparent": true
  },
  "pv:explain#6": {
    "particle": "in",
    "particleType": "prep",
    "sense": "방식/정도",
    "transparent": true
  },
  "pv:explain#7": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "제거/소멸",
    "transparent": true
  },
  "pv:explain#8": {
    "particle": "through",
    "particleType": "prep",
    "sense": "매개/경유",
    "transparent": true
  },
  "pv:explain#9": {
    "particle": "as",
    "particleType": "prep",
    "sense": "역할/자격",
    "transparent": true
  },
  "pv:explain#10": {
    "particle": "to",
    "particleType": "prep",
    "sense": "대상",
    "transparent": true
  },
  "pv:show#0": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "출현",
    "transparent": true
  },
  "pv:show#1": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "과시",
    "transparent": false
  },
  "pv:show#2": {
    "particle": "to",
    "particleType": "prep",
    "sense": "대상",
    "transparent": true
  },
  "pv:show#3": {
    "particle": "how",
    "particleType": "none",
    "sense": "방법(how)",
    "transparent": true
  },
  "pv:show#4": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "출현",
    "transparent": true
  },
  "pv:show#5": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "여기저기/곳곳",
    "transparent": true
  },
  "pv:show#6": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "안으로(이동)",
    "transparent": true
  },
  "pv:show#7": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "밖으로/이동",
    "transparent": true
  },
  "pv:show#8": {
    "particle": "on",
    "particleType": "prep",
    "sense": "접촉/표면",
    "transparent": true
  },
  "pv:show#9": {
    "particle": "as",
    "particleType": "none",
    "sense": "자격/형태(as)",
    "transparent": true
  },
  "pv:show#10": {
    "particle": "in",
    "particleType": "prep",
    "sense": "진입/안으로",
    "transparent": true
  },
  "pv:show#11": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "안으로 안내",
    "transparent": true
  },
  "pv:show#12": {
    "particle": "of",
    "particleType": "prep",
    "sense": "징후 대상",
    "transparent": true
  },
  "pv:show#13": {
    "particle": "for",
    "particleType": "prep",
    "sense": "교환/대가",
    "transparent": true
  },
  "pv:show#14": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "스며듦/배어남",
    "transparent": true
  },
  "pv:try#0": {
    "particle": "to",
    "particleType": "none",
    "sense": "목표 행위(to부정사)",
    "transparent": true
  },
  "pv:try#1": {
    "particle": "-ing",
    "particleType": "none",
    "sense": "동명사(시험삼아)",
    "transparent": true
  },
  "pv:try#2": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "착용/작동",
    "transparent": true
  },
  "pv:try#3": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "탐색/시험",
    "transparent": true
  },
  "pv:try#4": {
    "particle": "again",
    "particleType": "none",
    "sense": "반복(again)",
    "transparent": true
  },
  "pv:try#5": {
    "particle": "a try",
    "particleType": "none",
    "sense": "경동사(한번 시도)",
    "transparent": true
  },
  "pv:try#6": {
    "particle": "and",
    "particleType": "none",
    "sense": "구어(=try to)",
    "transparent": false
  },
  "pv:try#7": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "시험/시도",
    "transparent": true
  },
  "pv:try#8": {
    "particle": "for",
    "particleType": "prep",
    "sense": "목표/추구",
    "transparent": true
  },
  "pv:try#9": {
    "particle": "with",
    "particleType": "prep",
    "sense": "수단/도구",
    "transparent": true
  },
  "pv:try#10": {
    "particle": "on",
    "particleType": "prep",
    "sense": "대상/관련",
    "transparent": true
  },
  "pv:try#11": {
    "particle": "for",
    "particleType": "prep",
    "sense": "이유/원인",
    "transparent": true
  },
  "pv:try#12": {
    "particle": "one's best",
    "particleType": "none",
    "sense": "최선(노력)",
    "transparent": true
  },
  "pv:try#13": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "시험/시도",
    "transparent": true
  },
  "pv:help#0": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "조력/거들기",
    "transparent": false
  },
  "pv:help#1": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "조력/거들기",
    "transparent": false
  },
  "pv:help#2": {
    "particle": "with",
    "particleType": "prep",
    "sense": "관련/상대 대상",
    "transparent": true
  },
  "pv:help#3": {
    "particle": "원형부정사",
    "particleType": "none",
    "sense": "원형부정사(보충)",
    "transparent": true
  },
  "pv:help#4": {
    "particle": "to",
    "particleType": "none",
    "sense": "목표 행위(to부정사)",
    "transparent": true
  },
  "pv:help#5": {
    "particle": "-ing",
    "particleType": "none",
    "sense": "관용구(억제 불가)",
    "transparent": false
  },
  "pv:help#6": {
    "particle": "by",
    "particleType": "none",
    "sense": "수단(by)",
    "transparent": true
  },
  "pv:help#7": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "돌파/극복",
    "transparent": true
  },
  "pv:help#8": {
    "particle": "to",
    "particleType": "prep",
    "sense": "대상",
    "transparent": false
  },
  "pv:help#9": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "벗어남/이탈",
    "transparent": true
  },
  "pv:help#10": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "안으로(이동/투입)",
    "transparent": true
  },
  "pv:help#11": {
    "particle": "along",
    "particleType": "adverb",
    "sense": "진전/진행",
    "transparent": true
  },
  "pv:need#0": {
    "particle": "to",
    "particleType": "none",
    "sense": "목표 행위(to부정사)",
    "transparent": true
  },
  "pv:need#1": {
    "particle": "for",
    "particleType": "prep",
    "sense": "목적/용도",
    "transparent": true
  },
  "pv:need#2": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출처/기원",
    "transparent": true
  },
  "pv:need#3": {
    "particle": "with",
    "particleType": "prep",
    "sense": "관련/상대 대상",
    "transparent": true
  },
  "pv:need#4": {
    "particle": "to",
    "particleType": "none",
    "sense": "목표 행위(to부정사)",
    "transparent": true
  },
  "pv:need#5": {
    "particle": "by",
    "particleType": "prep",
    "sense": "기한/마감",
    "transparent": true
  },
  "pv:need#6": {
    "particle": "to",
    "particleType": "none",
    "sense": "목표 행위(to부정사)",
    "transparent": true
  },
  "pv:need#7": {
    "particle": "in",
    "particleType": "prep",
    "sense": "상태(in+명사)",
    "transparent": true
  },
  "pv:need#8": {
    "particle": "for",
    "particleType": "prep",
    "sense": "대상/목적",
    "transparent": true
  },
  "pv:need#9": {
    "particle": "in",
    "particleType": "prep",
    "sense": "상태/안에 있음",
    "transparent": true
  },
  "pv:need#10": {
    "particle": "on",
    "particleType": "prep",
    "sense": "~에(프로젝트/작업)",
    "transparent": true
  },
  "pv:need#11": {
    "particle": "than",
    "particleType": "none",
    "sense": "비교(than)",
    "transparent": true
  },
  "pv:need#12": {
    "particle": "if need be",
    "particleType": "none",
    "sense": "관용구(필요시)",
    "transparent": false
  },
  "pv:want#0": {
    "particle": "to",
    "particleType": "none",
    "sense": "목표 행위(to부정사)",
    "transparent": true
  },
  "pv:want#1": {
    "particle": "to",
    "particleType": "none",
    "sense": "목표 행위(to부정사)",
    "transparent": true
  },
  "pv:want#2": {
    "particle": "for",
    "particleType": "prep",
    "sense": "목적/용도",
    "transparent": true
  },
  "pv:want#3": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출처/기원",
    "transparent": true
  },
  "pv:want#4": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "반환",
    "transparent": true
  },
  "pv:want#5": {
    "particle": "about",
    "particleType": "prep",
    "sense": "주제/관련",
    "transparent": true
  },
  "pv:want#6": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "참여/합류",
    "transparent": true
  },
  "pv:want#7": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "이탈/탈퇴",
    "transparent": true
  },
  "pv:want#8": {
    "particle": "for",
    "particleType": "prep",
    "sense": "이유/원인",
    "transparent": true
  },
  "pv:want#9": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출처/기원",
    "transparent": true
  },
  "pv:want#10": {
    "particle": "done(과거분사)",
    "particleType": "none",
    "sense": "과거분사(피동 결과)",
    "transparent": true
  },
  "pv:want#11": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "참여/합류",
    "transparent": true
  },
  "pv:want#12": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "이탈/탈퇴",
    "transparent": true
  },
  "pv:want#13": {
    "particle": "for",
    "particleType": "prep",
    "sense": "결핍/부족",
    "transparent": false
  },
  "pv:handle#0": {
    "particle": "∅",
    "particleType": "none",
    "sense": "직접목적어(타동사)",
    "transparent": true
  },
  "pv:handle#1": {
    "particle": "∅",
    "particleType": "none",
    "sense": "직접목적어(타동사)",
    "transparent": true
  },
  "pv:handle#2": {
    "particle": "with",
    "particleType": "prep",
    "sense": "방식/상태",
    "transparent": true
  },
  "pv:handle#3": {
    "particle": "by",
    "particleType": "prep",
    "sense": "수단/방법",
    "transparent": true
  },
  "pv:handle#4": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출처/기원",
    "transparent": true
  },
  "pv:handle#5": {
    "particle": "for",
    "particleType": "prep",
    "sense": "~를 대신해/위해",
    "transparent": true
  },
  "pv:handle#6": {
    "particle": "under",
    "particleType": "adverb",
    "sense": "압박 하/짓눌림",
    "transparent": true
  },
  "pv:handle#7": {
    "particle": "on",
    "particleType": "prep",
    "sense": "~에 대해(사안)",
    "transparent": true
  },
  "pv:handle#8": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "경유/수단",
    "transparent": true
  },
  "pv:handle#9": {
    "particle": "in",
    "particleType": "prep",
    "sense": "방식/정도",
    "transparent": true
  },
  "pv:handle#10": {
    "particle": "without",
    "particleType": "none",
    "sense": "없이(without)",
    "transparent": true
  },
  "pv:manage#0": {
    "particle": "to",
    "particleType": "prep",
    "sense": "성취/해냄",
    "transparent": false
  },
  "pv:manage#1": {
    "particle": "∅",
    "particleType": "none",
    "sense": "직접목적어(타동사)",
    "transparent": true
  },
  "pv:manage#2": {
    "particle": "without",
    "particleType": "prep",
    "sense": "결여/부재",
    "transparent": true
  },
  "pv:manage#3": {
    "particle": "with",
    "particleType": "prep",
    "sense": "수단/도구",
    "transparent": true
  },
  "pv:manage#4": {
    "particle": "by",
    "particleType": "prep",
    "sense": "수단/방법",
    "transparent": true
  },
  "pv:manage#5": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "돌파/극복",
    "transparent": true
  },
  "pv:manage#6": {
    "particle": "in",
    "particleType": "prep",
    "sense": "장소/내부",
    "transparent": true
  },
  "pv:manage#7": {
    "particle": "of",
    "particleType": "prep",
    "sense": "구성",
    "transparent": true
  },
  "pv:manage#8": {
    "particle": "for",
    "particleType": "prep",
    "sense": "수혜/대상",
    "transparent": true
  },
  "pv:manage#9": {
    "particle": "under",
    "particleType": "adverb",
    "sense": "제약/구속 하",
    "transparent": true
  },
  "pv:manage#10": {
    "particle": "∅",
    "particleType": "none",
    "sense": "조절/관리",
    "transparent": true
  },
  "pv:manage#11": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "증가",
    "transparent": true
  },
  "pv:change#0": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "변화/전환",
    "transparent": true
  },
  "pv:change#1": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출처/기원",
    "transparent": true
  },
  "pv:change#2": {
    "particle": "to",
    "particleType": "prep",
    "sense": "도달/귀결",
    "transparent": true
  },
  "pv:change#3": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "벗어남/이탈",
    "transparent": true
  },
  "pv:change#4": {
    "particle": "∅",
    "particleType": "none",
    "sense": "변경/전환",
    "transparent": true
  },
  "pv:change#5": {
    "particle": "for",
    "particleType": "prep",
    "sense": "이유/원인",
    "transparent": true
  },
  "pv:change#6": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "전환",
    "transparent": true
  },
  "pv:change#7": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "복귀",
    "transparent": true
  },
  "pv:change#8": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "뒤섞음/혼합",
    "transparent": false
  },
  "pv:change#9": {
    "particle": "with",
    "particleType": "prep",
    "sense": "연동/동반",
    "transparent": true
  },
  "pv:change#10": {
    "particle": "in",
    "particleType": "prep",
    "sense": "장소/내부",
    "transparent": true
  },
  "pv:change#11": {
    "particle": "on",
    "particleType": "prep",
    "sense": "접촉/표면",
    "transparent": true
  },
  "pv:change#12": {
    "particle": "for",
    "particleType": "prep",
    "sense": "결과/방향",
    "transparent": true
  },
  "pv:change#13": {
    "particle": "for",
    "particleType": "prep",
    "sense": "결과/방향",
    "transparent": true
  },
  "pv:change#14": {
    "particle": "for",
    "particleType": "prep",
    "sense": "기분전환/변화",
    "transparent": false
  },
  "pv:update#0": {
    "particle": "on",
    "particleType": "prep",
    "sense": "주제/관하여",
    "transparent": true
  },
  "pv:update#1": {
    "particle": "on",
    "particleType": "prep",
    "sense": "주제/관하여",
    "transparent": true
  },
  "pv:update#2": {
    "particle": "to",
    "particleType": "prep",
    "sense": "도달",
    "transparent": true
  },
  "pv:update#3": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출처/기원",
    "transparent": true
  },
  "pv:update#4": {
    "particle": "with",
    "particleType": "prep",
    "sense": "재료/내용",
    "transparent": true
  },
  "pv:update#5": {
    "particle": "for",
    "particleType": "prep",
    "sense": "수혜/대상",
    "transparent": true
  },
  "pv:update#6": {
    "particle": "with",
    "particleType": "prep",
    "sense": "재료/내용",
    "transparent": true
  },
  "pv:update#7": {
    "particle": "in",
    "particleType": "prep",
    "sense": "장소/내부",
    "transparent": true
  },
  "pv:update#8": {
    "particle": "on",
    "particleType": "prep",
    "sense": "접촉/표면",
    "transparent": true
  },
  "pv:update#9": {
    "particle": "before",
    "particleType": "none",
    "sense": "시간/이전",
    "transparent": true
  },
  "pv:update#10": {
    "particle": "after",
    "particleType": "prep",
    "sense": "시간/이후",
    "transparent": true
  },
  "pv:feel#0": {
    "particle": "∅",
    "particleType": "none",
    "sense": "상태/감정",
    "transparent": true
  },
  "pv:feel#1": {
    "particle": "like",
    "particleType": "none",
    "sense": "욕구/하고 싶음",
    "transparent": false
  },
  "pv:feel#2": {
    "particle": "∅",
    "particleType": "none",
    "sense": "허락/권유",
    "transparent": true
  },
  "pv:feel#3": {
    "particle": "about",
    "particleType": "prep",
    "sense": "주제/관련",
    "transparent": true
  },
  "pv:feel#4": {
    "particle": "for",
    "particleType": "prep",
    "sense": "공감/동정 대상",
    "transparent": true
  },
  "pv:feel#5": {
    "particle": "for",
    "particleType": "prep",
    "sense": "공감/동정 대상",
    "transparent": true
  },
  "pv:feel#6": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "감당/능력",
    "transparent": false
  },
  "pv:feel#7": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "탐색/시험",
    "transparent": false
  },
  "pv:feel#8": {
    "particle": "about",
    "particleType": "prep",
    "sense": "주제/관련",
    "transparent": true
  },
  "pv:feel#9": {
    "particle": "∅",
    "particleType": "none",
    "sense": "필요/충동",
    "transparent": true
  },
  "pv:feel#10": {
    "particle": "for",
    "particleType": "prep",
    "sense": "공감/동정 대상",
    "transparent": true
  },
  "pv:feel#11": {
    "particle": "at",
    "particleType": "prep",
    "sense": "상태",
    "transparent": true
  },
  "pv:feel#12": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "배제/제외",
    "transparent": true
  },
  "pv:feel#13": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "어긋남/안 맞음",
    "transparent": true
  },
  "pv:feel#14": {
    "particle": "∅",
    "particleType": "none",
    "sense": "지각/감지",
    "transparent": true
  },
  "pv:feel#15": {
    "particle": "∅",
    "particleType": "none",
    "sense": "생각/의견",
    "transparent": true
  },
  "pv:feel#16": {
    "particle": "∅",
    "particleType": "none",
    "sense": "상태/감정",
    "transparent": true
  },
  "pv:feel#17": {
    "particle": "under",
    "particleType": "prep",
    "sense": "저조/미달",
    "transparent": false
  },
  "pv:feel#18": {
    "particle": "∅",
    "particleType": "none",
    "sense": "탐색/모색",
    "transparent": false
  },
  "pv:feel#19": {
    "particle": "∅",
    "particleType": "none",
    "sense": "압박/부담",
    "transparent": false
  },
  "pv:feel#20": {
    "particle": "∅",
    "particleType": "none",
    "sense": "압박/부담",
    "transparent": false
  },
  "pv:feel#21": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "더듬음/접촉",
    "transparent": false
  },
  "pv:send#0": {
    "particle": "to",
    "particleType": "prep",
    "sense": "방향/도착",
    "transparent": true
  },
  "pv:send#1": {
    "particle": "∅",
    "particleType": "none",
    "sense": "전달/발송",
    "transparent": true
  },
  "pv:send#2": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "배포/발송",
    "transparent": true
  },
  "pv:send#3": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "이동/건너감",
    "transparent": true
  },
  "pv:send#4": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "반환",
    "transparent": true
  },
  "pv:send#5": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "제출/투입",
    "transparent": true
  },
  "pv:send#6": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "발송/떠나보냄",
    "transparent": true
  },
  "pv:send#7": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "연결/성사",
    "transparent": true
  },
  "pv:send#8": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "회람/돌리기",
    "transparent": true
  },
  "pv:send#9": {
    "particle": "for",
    "particleType": "prep",
    "sense": "호출/가져옴",
    "transparent": true
  },
  "pv:send#10": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "내쫓음/추방",
    "transparent": true
  },
  "pv:send#11": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "위로/상부로",
    "transparent": true
  },
  "pv:send#12": {
    "particle": "to",
    "particleType": "prep",
    "sense": "수신/수령 대상",
    "transparent": true
  },
  "pv:send#13": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "전달/넘김",
    "transparent": true
  },
  "pv:send#14": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "발송/주문",
    "transparent": true
  },
  "pv:send#15": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "외부 주문",
    "transparent": true
  },
  "pv:send#16": {
    "particle": "∅",
    "particleType": "none",
    "sense": "내쫓음/해고",
    "transparent": false
  },
  "pv:send#17": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "하강/내려감",
    "transparent": true
  },
  "pv:send#18": {
    "particle": "to",
    "particleType": "prep",
    "sense": "수신/수령 대상",
    "transparent": true
  },
  "pv:spend#0": {
    "particle": "on",
    "particleType": "prep",
    "sense": "용도/대상",
    "transparent": true
  },
  "pv:spend#1": {
    "particle": "∅",
    "particleType": "none",
    "sense": "소비/소모",
    "transparent": true
  },
  "pv:spend#2": {
    "particle": "with",
    "particleType": "prep",
    "sense": "동반",
    "transparent": true
  },
  "pv:spend#3": {
    "particle": "in",
    "particleType": "prep",
    "sense": "장소/내부",
    "transparent": true
  },
  "pv:spend#4": {
    "particle": "at",
    "particleType": "prep",
    "sense": "지점/위치",
    "transparent": true
  },
  "pv:spend#5": {
    "particle": "∅",
    "particleType": "none",
    "sense": "소비/소모",
    "transparent": true
  },
  "pv:spend#6": {
    "particle": "on",
    "particleType": "prep",
    "sense": "용도/대상",
    "transparent": true
  },
  "pv:spend#7": {
    "particle": "∅",
    "particleType": "none",
    "sense": "소비/소모",
    "transparent": true
  },
  "pv:spend#8": {
    "particle": "∅",
    "particleType": "none",
    "sense": "소비/소모",
    "transparent": true
  },
  "pv:spend#9": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "초과",
    "transparent": true
  },
  "pv:spend#10": {
    "particle": "∅",
    "particleType": "none",
    "sense": "소비/소모",
    "transparent": true
  },
  "pv:spend#11": {
    "particle": "∅",
    "particleType": "none",
    "sense": "소비/소모",
    "transparent": true
  },
  "pv:spend#12": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "감소/하락",
    "transparent": true
  },
  "pv:pay#0": {
    "particle": "for",
    "particleType": "prep",
    "sense": "교환/대가",
    "transparent": true
  },
  "pv:pay#1": {
    "particle": "to",
    "particleType": "prep",
    "sense": "대상",
    "transparent": true
  },
  "pv:pay#2": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "청산/결실",
    "transparent": false
  },
  "pv:pay#3": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "반환",
    "transparent": true
  },
  "pv:pay#4": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "감소/하락",
    "transparent": true
  },
  "pv:pay#5": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "지급/분배",
    "transparent": true
  },
  "pv:pay#6": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "완성/끝까지",
    "transparent": true
  },
  "pv:pay#7": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "안으로(이동/투입)",
    "transparent": true
  },
  "pv:pay#8": {
    "particle": "∅",
    "particleType": "none",
    "sense": "생계/충당",
    "transparent": false
  },
  "pv:pay#9": {
    "particle": "∅",
    "particleType": "none",
    "sense": "대가/응보",
    "transparent": false
  },
  "pv:pay#10": {
    "particle": "∅",
    "particleType": "none",
    "sense": "임금 변동",
    "transparent": true
  },
  "pv:pay#11": {
    "particle": "by",
    "particleType": "prep",
    "sense": "수단/방법",
    "transparent": true
  },
  "pv:pay#12": {
    "particle": "∅",
    "particleType": "none",
    "sense": "방문",
    "transparent": false
  },
  "pv:pay#13": {
    "particle": "above",
    "particleType": "none",
    "sense": "권한 밖/직급 초과",
    "transparent": false
  },
  "pv:pay#14": {
    "particle": "∅",
    "particleType": "none",
    "sense": "고생/노고",
    "transparent": false
  },
  "pv:pay#15": {
    "particle": "forward",
    "particleType": "adverb",
    "sense": "전달/넘김",
    "transparent": true
  },
  "pv:pay#16": {
    "particle": "to",
    "particleType": "prep",
    "sense": "대상",
    "transparent": true
  },
  "pv:pay#17": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "과도하게",
    "transparent": false
  },
  "pv:pay#18": {
    "particle": "to",
    "particleType": "prep",
    "sense": "대상",
    "transparent": true
  },
  "pv:pay#19": {
    "particle": "∅",
    "particleType": "none",
    "sense": "칭찬",
    "transparent": false
  },
  "pv:pay#20": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "처리/청산",
    "transparent": false
  },
  "pv:follow#0": {
    "particle": "∅",
    "particleType": "none",
    "sense": "준수/따름",
    "transparent": true
  },
  "pv:follow#1": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "후속",
    "transparent": false
  },
  "pv:follow#2": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "후속",
    "transparent": false
  },
  "pv:follow#3": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "후속",
    "transparent": false
  },
  "pv:follow#4": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "끝까지/완수",
    "transparent": true
  },
  "pv:follow#5": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "끝까지/완수",
    "transparent": true
  },
  "pv:follow#6": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "끝까지/완수",
    "transparent": true
  },
  "pv:follow#7": {
    "particle": "along",
    "particleType": "adverb",
    "sense": "동반/함께",
    "transparent": true
  },
  "pv:follow#8": {
    "particle": "along",
    "particleType": "adverb",
    "sense": "따라하기",
    "transparent": true
  },
  "pv:follow#9": {
    "particle": "∅",
    "particleType": "none",
    "sense": "이해/파악",
    "transparent": false
  },
  "pv:follow#10": {
    "particle": "∅",
    "particleType": "none",
    "sense": "이해/파악",
    "transparent": false
  },
  "pv:follow#11": {
    "particle": "—",
    "particleType": "none",
    "sense": "준수",
    "transparent": true
  },
  "pv:follow#12": {
    "particle": "—",
    "particleType": "none",
    "sense": "모방/선례",
    "transparent": false
  },
  "pv:follow#13": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "되받음/응답",
    "transparent": true
  },
  "pv:follow#14": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "여기저기/곳곳",
    "transparent": true
  },
  "pv:follow#15": {
    "particle": "—",
    "particleType": "none",
    "sense": "직감따름",
    "transparent": false
  },
  "pv:follow#16": {
    "particle": "as",
    "particleType": "none",
    "sense": "열거도입",
    "transparent": false
  },
  "pv:follow#17": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "후속",
    "transparent": false
  },
  "pv:follow#18": {
    "particle": "by",
    "particleType": "prep",
    "sense": "순차(X by X)",
    "transparent": true
  },
  "pv:follow#19": {
    "particle": "—",
    "particleType": "none",
    "sense": "모방/선례",
    "transparent": false
  },
  "pv:follow#20": {
    "particle": "—",
    "particleType": "none",
    "sense": "추적",
    "transparent": false
  },
  "pv:mean#0": {
    "particle": "—",
    "particleType": "none",
    "sense": "의미",
    "transparent": true
  },
  "pv:mean#1": {
    "particle": "—",
    "particleType": "none",
    "sense": "부연/정정",
    "transparent": false
  },
  "pv:mean#2": {
    "particle": "to",
    "particleType": "none",
    "sense": "의도",
    "transparent": true
  },
  "pv:mean#3": {
    "particle": "by",
    "particleType": "prep",
    "sense": "뜻/의미",
    "transparent": true
  },
  "pv:mean#4": {
    "particle": "to",
    "particleType": "none",
    "sense": "예정/당위",
    "transparent": false
  },
  "pv:mean#5": {
    "particle": "to",
    "particleType": "prep",
    "sense": "대상",
    "transparent": true
  },
  "pv:mean#6": {
    "particle": "—",
    "particleType": "none",
    "sense": "수반/초래",
    "transparent": true
  },
  "pv:mean#7": {
    "particle": "for",
    "particleType": "prep",
    "sense": "목적/용도",
    "transparent": true
  },
  "pv:mean#8": {
    "particle": "—",
    "particleType": "none",
    "sense": "선의",
    "transparent": true
  },
  "pv:mean#9": {
    "particle": "—",
    "particleType": "none",
    "sense": "진심",
    "transparent": true
  },
  "pv:mean#10": {
    "particle": "for",
    "particleType": "prep",
    "sense": "대상/목적",
    "transparent": true
  },
  "pv:mean#11": {
    "particle": "—",
    "particleType": "none",
    "sense": "수반/초래",
    "transparent": true
  },
  "pv:mean#12": {
    "particle": "—",
    "particleType": "none",
    "sense": "확인/재진술",
    "transparent": false
  },
  "pv:mean#13": {
    "particle": "—",
    "particleType": "none",
    "sense": "이해확인",
    "transparent": false
  },
  "pv:mean#14": {
    "particle": "—",
    "particleType": "none",
    "sense": "작정/진지",
    "transparent": false
  },
  "pv:mean#15": {
    "particle": "to",
    "particleType": "none",
    "sense": "운명/필연",
    "transparent": false
  },
  "pv:seem#0": {
    "particle": "—",
    "particleType": "none",
    "sense": "추측/인상",
    "transparent": true
  },
  "pv:seem#1": {
    "particle": "to",
    "particleType": "none",
    "sense": "추측/인상",
    "transparent": true
  },
  "pv:seem#2": {
    "particle": "like",
    "particleType": "none",
    "sense": "추측/인상",
    "transparent": true
  },
  "pv:seem#3": {
    "particle": "that",
    "particleType": "none",
    "sense": "추측/인상",
    "transparent": true
  },
  "pv:seem#4": {
    "particle": "to",
    "particleType": "none",
    "sense": "추측/인상",
    "transparent": true
  },
  "pv:seem#5": {
    "particle": "to",
    "particleType": "none",
    "sense": "추측/인상",
    "transparent": true
  },
  "pv:seem#6": {
    "particle": "to",
    "particleType": "none",
    "sense": "추측/인상",
    "transparent": true
  },
  "pv:seem#7": {
    "particle": "to",
    "particleType": "none",
    "sense": "추측/인상",
    "transparent": true
  },
  "pv:seem#8": {
    "particle": "like",
    "particleType": "none",
    "sense": "추측/인상",
    "transparent": true
  },
  "pv:seem#9": {
    "particle": "as if",
    "particleType": "none",
    "sense": "추측/인상",
    "transparent": true
  },
  "pv:seem#10": {
    "particle": "that",
    "particleType": "none",
    "sense": "추측/인상",
    "transparent": true
  },
  "pv:seem#11": {
    "particle": "to",
    "particleType": "none",
    "sense": "추측/인상",
    "transparent": true
  },
  "pv:seem#12": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "벗어남/어긋남",
    "transparent": true
  },
  "pv:seem#13": {
    "particle": "to",
    "particleType": "prep",
    "sense": "관점/체감",
    "transparent": true
  },
  "pv:seem#14": {
    "particle": "to",
    "particleType": "prep",
    "sense": "관점/체감",
    "transparent": true
  },
  "pv:seem#15": {
    "particle": "기타",
    "particleType": "none",
    "sense": "겉보기/추정",
    "transparent": true
  },
  "pv:miss#0": {
    "particle": "기타",
    "particleType": "none",
    "sense": "놓침(못 잡음)",
    "transparent": true
  },
  "pv:miss#1": {
    "particle": "기타",
    "particleType": "none",
    "sense": "못 알아챔(인지·이해)",
    "transparent": true
  },
  "pv:miss#2": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "배제/제외",
    "transparent": true
  },
  "pv:miss#3": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "배제/제외",
    "transparent": true
  },
  "pv:miss#4": {
    "particle": "기타",
    "particleType": "none",
    "sense": "못 알아챔(인지·이해)",
    "transparent": true
  },
  "pv:miss#5": {
    "particle": "기타",
    "particleType": "none",
    "sense": "놓침(못 잡음)",
    "transparent": true
  },
  "pv:miss#6": {
    "particle": "기타",
    "particleType": "none",
    "sense": "빗나감(목표·기준)",
    "transparent": true
  },
  "pv:miss#7": {
    "particle": "기타",
    "particleType": "none",
    "sense": "부재·누락",
    "transparent": true
  },
  "pv:miss#8": {
    "particle": "기타",
    "particleType": "none",
    "sense": "부재·누락",
    "transparent": true
  },
  "pv:miss#9": {
    "particle": "기타",
    "particleType": "none",
    "sense": "못 알아챔(인지·이해)",
    "transparent": true
  },
  "pv:miss#10": {
    "particle": "기타",
    "particleType": "none",
    "sense": "놓침(못 잡음)",
    "transparent": true
  },
  "pv:miss#11": {
    "particle": "기타",
    "particleType": "none",
    "sense": "부재·누락",
    "transparent": true
  },
  "pv:miss#12": {
    "particle": "기타",
    "particleType": "none",
    "sense": "놓침(못 잡음)",
    "transparent": true
  },
  "pv:miss#13": {
    "particle": "기타",
    "particleType": "none",
    "sense": "놓침(못 잡음)",
    "transparent": false
  },
  "pv:miss#14": {
    "particle": "기타",
    "particleType": "none",
    "sense": "흔들림 없이",
    "transparent": false
  },
  "pv:miss#15": {
    "particle": "기타",
    "particleType": "none",
    "sense": "일관성 없음",
    "transparent": true
  },
  "pv:miss#16": {
    "particle": "기타",
    "particleType": "none",
    "sense": "꼭 함(강한 의향)",
    "transparent": true
  },
  "pv:miss#17": {
    "particle": "기타",
    "particleType": "none",
    "sense": "아슬아슬 모면",
    "transparent": false
  },
  "pv:end#0": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "결말/귀착",
    "transparent": true
  },
  "pv:end#1": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "결말/귀착",
    "transparent": true
  },
  "pv:end#2": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "결말/귀착",
    "transparent": true
  },
  "pv:end#3": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "결말/귀착",
    "transparent": true
  },
  "pv:end#4": {
    "particle": "in",
    "particleType": "prep",
    "sense": "결국/시점",
    "transparent": true
  },
  "pv:end#5": {
    "particle": "기타",
    "particleType": "none",
    "sense": "끝내다/종료",
    "transparent": true
  },
  "pv:end#6": {
    "particle": "by",
    "particleType": "none",
    "sense": "기한(마감)",
    "transparent": true
  },
  "pv:end#7": {
    "particle": "at",
    "particleType": "prep",
    "sense": "끝(지점/시점)",
    "transparent": true
  },
  "pv:end#8": {
    "particle": "in",
    "particleType": "prep",
    "sense": "결과/귀결",
    "transparent": true
  },
  "pv:end#9": {
    "particle": "with",
    "particleType": "prep",
    "sense": "마무리 수단",
    "transparent": true
  },
  "pv:end#10": {
    "particle": "at",
    "particleType": "prep",
    "sense": "결국/요점",
    "transparent": false
  },
  "pv:end#11": {
    "particle": "to",
    "particleType": "prep",
    "sense": "도달/귀결",
    "transparent": true
  },
  "pv:end#12": {
    "particle": "to",
    "particleType": "prep",
    "sense": "종결/마무리",
    "transparent": true
  },
  "pv:end#13": {
    "particle": "to",
    "particleType": "prep",
    "sense": "대상/수령",
    "transparent": true
  },
  "pv:end#14": {
    "particle": "기타",
    "particleType": "none",
    "sense": "막다름/진전 없음",
    "transparent": true
  },
  "pv:end#15": {
    "particle": "to",
    "particleType": "none",
    "sense": "전 구간/종단",
    "transparent": true
  },
  "pv:end#16": {
    "particle": "기타",
    "particleType": "none",
    "sense": "최종/마지막(수식)",
    "transparent": true
  },
  "pv:end#17": {
    "particle": "기타",
    "particleType": "none",
    "sense": "최종/마지막(수식)",
    "transparent": true
  },
  "pv:end#18": {
    "particle": "기타",
    "particleType": "none",
    "sense": "최종/마지막(수식)",
    "transparent": true
  },
  "pv:end#19": {
    "particle": "기타",
    "particleType": "none",
    "sense": "쪽·영역(끝부분)",
    "transparent": true
  },
  "pv:end#20": {
    "particle": "기타",
    "particleType": "none",
    "sense": "생계 유지(관용)",
    "transparent": false
  },
  "pv:end#21": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "완성/완료",
    "transparent": true
  },
  "pv:end#22": {
    "particle": "on",
    "particleType": "prep",
    "sense": "끝맺음(기준점)",
    "transparent": true
  },
  "pv:end#23": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "계속/지속",
    "transparent": false
  },
  "pv:stand#0": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "상승/기립",
    "transparent": true
  },
  "pv:stand#1": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "두드러짐/돌출",
    "transparent": true
  },
  "pv:stand#2": {
    "particle": "for",
    "particleType": "prep",
    "sense": "대표/의미",
    "transparent": false
  },
  "pv:stand#3": {
    "particle": "기타",
    "particleType": "none",
    "sense": "견딤/참음",
    "transparent": false
  },
  "pv:stand#4": {
    "particle": "by",
    "particleType": "adverb",
    "sense": "대기/곁",
    "transparent": false
  },
  "pv:stand#5": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "나서서 옹호",
    "transparent": true
  },
  "pv:stand#6": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "맞섬/대결",
    "transparent": true
  },
  "pv:stand#7": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "대체/대타",
    "transparent": true
  },
  "pv:stand#8": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "뒤로 물러남",
    "transparent": true
  },
  "pv:stand#9": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "해제/철수",
    "transparent": false
  },
  "pv:stand#10": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "빈둥/하릴없이",
    "transparent": true
  },
  "pv:stand#11": {
    "particle": "기타",
    "particleType": "none",
    "sense": "가능성",
    "transparent": false
  },
  "pv:stand#12": {
    "particle": "기타",
    "particleType": "none",
    "sense": "현 상태/상황",
    "transparent": false
  },
  "pv:stand#13": {
    "particle": "at",
    "particleType": "prep",
    "sense": "수치(지점)",
    "transparent": true
  },
  "pv:stand#14": {
    "particle": "on",
    "particleType": "prep",
    "sense": "~에 대해(사안)",
    "transparent": true
  },
  "pv:stand#15": {
    "particle": "to",
    "particleType": "prep",
    "sense": "가능성/처지",
    "transparent": false
  },
  "pv:stand#16": {
    "particle": "기타",
    "particleType": "none",
    "sense": "입장 고수",
    "transparent": false
  },
  "pv:stand#17": {
    "particle": "on",
    "particleType": "prep",
    "sense": "~에 대해(사안)",
    "transparent": true
  },
  "pv:stand#18": {
    "particle": "기타",
    "particleType": "none",
    "sense": "견딤/참음",
    "transparent": false
  },
  "pv:stand#19": {
    "particle": "기타",
    "particleType": "none",
    "sense": "잘못 인정",
    "transparent": false
  },
  "pv:stand#20": {
    "particle": "to",
    "particleType": "prep",
    "sense": "타당/이치",
    "transparent": false
  },
  "pv:fall#0": {
    "particle": "∅",
    "particleType": "none",
    "sense": "상태로 빠짐",
    "transparent": true
  },
  "pv:fall#1": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "빠짐/연애",
    "transparent": false
  },
  "pv:fall#2": {
    "particle": "apart",
    "particleType": "adverb",
    "sense": "분해/산산이",
    "transparent": true
  },
  "pv:fall#3": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "무산/실패",
    "transparent": false
  },
  "pv:fall#4": {
    "particle": "behind",
    "particleType": "adverb",
    "sense": "뒤처짐",
    "transparent": true
  },
  "pv:fall#5": {
    "particle": "behind",
    "particleType": "adverb",
    "sense": "뒤처짐",
    "transparent": true
  },
  "pv:fall#6": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "대비책에 의지",
    "transparent": true
  },
  "pv:fall#7": {
    "particle": "for",
    "particleType": "prep",
    "sense": "현혹/속음",
    "transparent": false
  },
  "pv:fall#8": {
    "particle": "∅",
    "particleType": "none",
    "sense": "미달/못 미침",
    "transparent": true
  },
  "pv:fall#9": {
    "particle": "under",
    "particleType": "adverb",
    "sense": "소관/범주 하",
    "transparent": true
  },
  "pv:fall#10": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "감소",
    "transparent": true
  },
  "pv:fall#11": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "(상태에) 빠짐",
    "transparent": true
  },
  "pv:fall#12": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "벗어남/이탈",
    "transparent": true
  },
  "pv:fall#13": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "후퇴/물러남",
    "transparent": true
  },
  "pv:fall#14": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "하강/내림",
    "transparent": true
  },
  "pv:fall#15": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "전복/넘어짐",
    "transparent": true
  },
  "pv:fall#16": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "틈새로 누락",
    "transparent": true
  },
  "pv:fall#17": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "제자리에 맞음",
    "transparent": true
  },
  "pv:fall#18": {
    "particle": "∅",
    "particleType": "none",
    "sense": "반응 실패(flop)",
    "transparent": false
  },
  "pv:fall#19": {
    "particle": "on",
    "particleType": "prep",
    "sense": "~에 해당/책임",
    "transparent": true
  },
  "pv:fall#20": {
    "particle": "∅",
    "particleType": "none",
    "sense": "상태로 빠짐",
    "transparent": true
  },
  "pv:fall#21": {
    "particle": "to",
    "particleType": "prep",
    "sense": "피해/당함",
    "transparent": false
  },
  "pv:fall#22": {
    "particle": "by",
    "particleType": "none",
    "sense": "도중 중단/방치",
    "transparent": false
  },
  "pv:fall#23": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "밀려남/제외",
    "transparent": true
  },
  "pv:catch#0": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "따라잡음/근황",
    "transparent": true
  },
  "pv:catch#1": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "만회/따라잡기",
    "transparent": true
  },
  "pv:catch#2": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "따라잡음/근황",
    "transparent": true
  },
  "pv:catch#3": {
    "particle": "∅",
    "particleType": "none",
    "sense": "알아들음/이해",
    "transparent": false
  },
  "pv:catch#4": {
    "particle": "∅",
    "particleType": "none",
    "sense": "감염(걸림)",
    "transparent": false
  },
  "pv:catch#5": {
    "particle": "∅",
    "particleType": "none",
    "sense": "시간 맞춰 탑승",
    "transparent": true
  },
  "pv:catch#6": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "만회/따라잡기",
    "transparent": true
  },
  "pv:catch#7": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "자리잡음/이해",
    "transparent": false
  },
  "pv:catch#8": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "간파/알아챔",
    "transparent": false
  },
  "pv:catch#9": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "방심",
    "transparent": true
  },
  "pv:catch#10": {
    "particle": "∅",
    "particleType": "none",
    "sense": "현장 적발",
    "transparent": false
  },
  "pv:catch#11": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "최신화/따라잡음",
    "transparent": false
  },
  "pv:catch#12": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "휘말림/몰두",
    "transparent": false
  },
  "pv:catch#13": {
    "particle": "∅",
    "particleType": "none",
    "sense": "이목 끌기",
    "transparent": false
  },
  "pv:catch#14": {
    "particle": "∅",
    "particleType": "none",
    "sense": "이목 끌기",
    "transparent": true
  },
  "pv:catch#15": {
    "particle": "∅",
    "particleType": "none",
    "sense": "포착/흘끗 봄",
    "transparent": true
  },
  "pv:catch#16": {
    "particle": "∅",
    "particleType": "none",
    "sense": "발화/점화",
    "transparent": false
  },
  "pv:catch#17": {
    "particle": "∅",
    "particleType": "none",
    "sense": "숨 고르기",
    "transparent": false
  },
  "pv:catch#18": {
    "particle": "∅",
    "particleType": "none",
    "sense": "작별 인사",
    "transparent": false
  },
  "pv:catch#19": {
    "particle": "∅",
    "particleType": "none",
    "sense": "소문 입수",
    "transparent": false
  },
  "pv:catch#20": {
    "particle": "∅",
    "particleType": "none",
    "sense": "행운 트임",
    "transparent": false
  },
  "pv:catch#21": {
    "particle": "∅",
    "particleType": "none",
    "sense": "현장 적발",
    "transparent": false
  },
  "pv:watch#0": {
    "particle": "∅",
    "particleType": "none",
    "sense": "관찰/지켜봄",
    "transparent": true
  },
  "pv:watch#1": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "경계/주시",
    "transparent": false
  },
  "pv:watch#2": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "경계/주시",
    "transparent": false
  },
  "pv:watch#3": {
    "particle": "∅",
    "particleType": "none",
    "sense": "관찰/지켜봄",
    "transparent": true
  },
  "pv:watch#4": {
    "particle": "for",
    "particleType": "prep",
    "sense": "탐색/대상",
    "transparent": true
  },
  "pv:watch#5": {
    "particle": "over",
    "particleType": "prep",
    "sense": "돌봄/감독",
    "transparent": true
  },
  "pv:watch#6": {
    "particle": "∅",
    "particleType": "none",
    "sense": "조심 경고",
    "transparent": false
  },
  "pv:watch#7": {
    "particle": "∅",
    "particleType": "none",
    "sense": "조심 경고",
    "transparent": false
  },
  "pv:watch#8": {
    "particle": "∅",
    "particleType": "none",
    "sense": "조심 경고",
    "transparent": false
  },
  "pv:watch#9": {
    "particle": "∅",
    "particleType": "none",
    "sense": "조심 경고",
    "transparent": false
  },
  "pv:watch#10": {
    "particle": "∅",
    "particleType": "none",
    "sense": "조심 경고",
    "transparent": false
  },
  "pv:watch#11": {
    "particle": "∅",
    "particleType": "none",
    "sense": "주시/모니터링",
    "transparent": true
  },
  "pv:watch#12": {
    "particle": "∅",
    "particleType": "none",
    "sense": "주시/모니터링",
    "transparent": true
  },
  "pv:watch#13": {
    "particle": "on",
    "particleType": "prep",
    "sense": "담당/책임",
    "transparent": false
  },
  "pv:watch#14": {
    "particle": "∅",
    "particleType": "none",
    "sense": "경계/망보기",
    "transparent": false
  },
  "pv:watch#15": {
    "particle": "∅",
    "particleType": "none",
    "sense": "관망(두고 보기)",
    "transparent": true
  },
  "pv:watch#16": {
    "particle": "∅",
    "particleType": "none",
    "sense": "보고 배우기",
    "transparent": true
  },
  "pv:back#0": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "백업/축적",
    "transparent": false
  },
  "pv:back#1": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "지지/강화",
    "transparent": false
  },
  "pv:back#2": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "분리/물러남",
    "transparent": true
  },
  "pv:back#3": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "양보/굴복",
    "transparent": true
  },
  "pv:back#4": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "벗어남/이탈",
    "transparent": true
  },
  "pv:back#5": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "벗어남/이탈",
    "transparent": true
  },
  "pv:back#6": {
    "particle": "—",
    "particleType": "none",
    "sense": "지지/후원",
    "transparent": false
  },
  "pv:back#7": {
    "particle": "by",
    "particleType": "prep",
    "sense": "지지/후원",
    "transparent": false
  },
  "pv:back#8": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "연속/맞닿음",
    "transparent": true
  },
  "pv:back#9": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "왕복/주고받기",
    "transparent": true
  },
  "pv:back#10": {
    "particle": "—",
    "particleType": "none",
    "sense": "지지/후원",
    "transparent": false
  },
  "pv:back#11": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "제거/분리",
    "transparent": true
  },
  "pv:back#12": {
    "particle": "into",
    "particleType": "prep",
    "sense": "안으로(이동/투입)",
    "transparent": true
  },
  "pv:back#13": {
    "particle": "into",
    "particleType": "prep",
    "sense": "몰아넣음/강요",
    "transparent": true
  },
  "pv:back#14": {
    "particle": "on",
    "particleType": "prep",
    "sense": "보류/유보",
    "transparent": false
  },
  "pv:back#15": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "번복/철회",
    "transparent": true
  },
  "pv:back#16": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "되돌림/복구",
    "transparent": true
  },
  "pv:back#17": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "차선책/대비",
    "transparent": true
  },
  "pv:back#18": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "축소/감축",
    "transparent": true
  },
  "pv:back#19": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "회복/반등",
    "transparent": true
  },
  "pv:back#20": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "대략/어림(뒷면)",
    "transparent": false
  },
  "pv:write#0": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "기록",
    "transparent": true
  },
  "pv:write#1": {
    "particle": "—",
    "particleType": "none",
    "sense": "작성/쓰기",
    "transparent": true
  },
  "pv:write#2": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "완성/끝까지",
    "transparent": true
  },
  "pv:write#3": {
    "particle": "in",
    "particleType": "prep",
    "sense": "수단/방식",
    "transparent": true
  },
  "pv:write#4": {
    "particle": "to",
    "particleType": "prep",
    "sense": "수신/수령 대상",
    "transparent": true
  },
  "pv:write#5": {
    "particle": "—",
    "particleType": "none",
    "sense": "작성/쓰기",
    "transparent": true
  },
  "pv:write#6": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "탕감/제거",
    "transparent": true
  },
  "pv:write#7": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "회신/응답",
    "transparent": true
  },
  "pv:write#8": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "완성/철저",
    "transparent": true
  },
  "pv:write#9": {
    "particle": "about",
    "particleType": "prep",
    "sense": "주제/관련",
    "transparent": true
  },
  "pv:write#10": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "치부/단념",
    "transparent": false
  },
  "pv:write#11": {
    "particle": "for",
    "particleType": "prep",
    "sense": "대상/목적",
    "transparent": true
  },
  "pv:write#12": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "제출/신청",
    "transparent": true
  },
  "pv:write#13": {
    "particle": "into",
    "particleType": "prep",
    "sense": "편입/삽입",
    "transparent": true
  },
  "pv:write#14": {
    "particle": "—",
    "particleType": "none",
    "sense": "작성/쓰기",
    "transparent": true
  },
  "pv:write#15": {
    "particle": "in",
    "particleType": "prep",
    "sense": "수단/방식",
    "transparent": true
  },
  "pv:write#16": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "기입/써넣기",
    "transparent": true
  },
  "pv:write#17": {
    "particle": "about",
    "particleType": "prep",
    "sense": "별것 아님(내세울 것 없음)",
    "transparent": false
  },
  "pv:write#18": {
    "particle": "—",
    "particleType": "none",
    "sense": "관용: 원하는 조건 차지",
    "transparent": false
  },
  "pv:read#0": {
    "particle": "—",
    "particleType": "none",
    "sense": "읽기",
    "transparent": true
  },
  "pv:read#1": {
    "particle": "about",
    "particleType": "prep",
    "sense": "주제/관련",
    "transparent": true
  },
  "pv:read#2": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "완성/끝까지",
    "transparent": true
  },
  "pv:read#3": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "처음부터 끝까지",
    "transparent": true
  },
  "pv:read#4": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "검토(전체)",
    "transparent": true
  },
  "pv:read#5": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "확대해석",
    "transparent": false
  },
  "pv:read#6": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "소리내어",
    "transparent": true
  },
  "pv:read#7": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "표면에서 읽어냄",
    "transparent": true
  },
  "pv:read#8": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "되받음/응답",
    "transparent": true
  },
  "pv:read#9": {
    "particle": "as",
    "particleType": "none",
    "sense": "간주/해석 (as)",
    "transparent": true
  },
  "pv:read#10": {
    "particle": "—",
    "particleType": "none",
    "sense": "쓰여 있음/표기",
    "transparent": false
  },
  "pv:read#11": {
    "particle": "—",
    "particleType": "none",
    "sense": "간파/속내 파악",
    "transparent": false
  },
  "pv:read#12": {
    "particle": "between",
    "particleType": "prep",
    "sense": "행간/사이",
    "transparent": false
  },
  "pv:read#13": {
    "particle": "—",
    "particleType": "none",
    "sense": "간파/속내 파악",
    "transparent": false
  },
  "pv:read#14": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "소리내어",
    "transparent": true
  },
  "pv:read#15": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "계속/지속",
    "transparent": true
  },
  "pv:read#16": {
    "particle": "like",
    "particleType": "none",
    "sense": "간파/속내 파악",
    "transparent": false
  },
  "pv:read#17": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "입력/읽어들임",
    "transparent": true
  },
  "pv:read#18": {
    "particle": "along",
    "particleType": "adverb",
    "sense": "따라하기",
    "transparent": true
  },
  "pv:read#19": {
    "particle": "—",
    "particleType": "none",
    "sense": "수신/들림 (radio)",
    "transparent": false
  },
  "pv:read#20": {
    "particle": "—",
    "particleType": "none",
    "sense": "질책 (idiom)",
    "transparent": false
  },
  "pv:hear#0": {
    "particle": "—",
    "particleType": "none",
    "sense": "전해 듣다/알게 됨",
    "transparent": true
  },
  "pv:hear#1": {
    "particle": "about",
    "particleType": "prep",
    "sense": "주제/관련",
    "transparent": true
  },
  "pv:hear#2": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출처/기원",
    "transparent": true
  },
  "pv:hear#3": {
    "particle": "—",
    "particleType": "none",
    "sense": "지각 (perception)",
    "transparent": true
  },
  "pv:hear#4": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "회신/응답",
    "transparent": true
  },
  "pv:hear#5": {
    "particle": "of",
    "particleType": "prep",
    "sense": "인지 대상",
    "transparent": true
  },
  "pv:hear#6": {
    "particle": "—",
    "particleType": "none",
    "sense": "이해/공감",
    "transparent": false
  },
  "pv:hear#7": {
    "particle": "—",
    "particleType": "none",
    "sense": "들림 (audibility)",
    "transparent": true
  },
  "pv:hear#8": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "완성/끝까지",
    "transparent": true
  },
  "pv:hear#9": {
    "particle": "about",
    "particleType": "prep",
    "sense": "주제/관련",
    "transparent": true
  },
  "pv:hear#10": {
    "particle": "—",
    "particleType": "none",
    "sense": "반복 거부 (다 들음)",
    "transparent": false
  },
  "pv:hear#11": {
    "particle": "—",
    "particleType": "none",
    "sense": "이해/공감",
    "transparent": false
  },
  "pv:hear#12": {
    "particle": "—",
    "particleType": "none",
    "sense": "또렷이 들림",
    "transparent": false
  },
  "pv:hear#13": {
    "particle": "—",
    "particleType": "none",
    "sense": "경청 (입장 들어줌)",
    "transparent": false
  },
  "pv:hear#14": {
    "particle": "of",
    "particleType": "prep",
    "sense": "관하여",
    "transparent": false
  },
  "pv:hear#15": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "매개/경유",
    "transparent": true
  },
  "pv:hear#16": {
    "particle": "of",
    "particleType": "prep",
    "sense": "수량/부분",
    "transparent": false
  },
  "pv:see#0": {
    "particle": "—",
    "particleType": "none",
    "sense": "보다/이해",
    "transparent": true
  },
  "pv:see#1": {
    "particle": "—",
    "particleType": "none",
    "sense": "확인/알아봄",
    "transparent": true
  },
  "pv:see#2": {
    "particle": "—",
    "particleType": "none",
    "sense": "생각 표시 (filler)",
    "transparent": false
  },
  "pv:see#3": {
    "particle": "—",
    "particleType": "none",
    "sense": "작별 인사",
    "transparent": false
  },
  "pv:see#4": {
    "particle": "—",
    "particleType": "none",
    "sense": "지각 (perception)",
    "transparent": true
  },
  "pv:see#5": {
    "particle": "as",
    "particleType": "none",
    "sense": "간주/해석 (as)",
    "transparent": true
  },
  "pv:see#6": {
    "particle": "to",
    "particleType": "prep",
    "sense": "처리/챙김",
    "transparent": false
  },
  "pv:see#7": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "간파/꿰뚫음",
    "transparent": true
  },
  "pv:see#8": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "끝까지/완수",
    "transparent": true
  },
  "pv:see#9": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "출발/떠남",
    "transparent": true
  },
  "pv:see#10": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "문까지 배웅",
    "transparent": true
  },
  "pv:see#11": {
    "particle": "about",
    "particleType": "prep",
    "sense": "주제/관련",
    "transparent": true
  },
  "pv:see#12": {
    "particle": "—",
    "particleType": "none",
    "sense": "두고 봄/지켜봄",
    "transparent": false
  },
  "pv:see#13": {
    "particle": "for",
    "particleType": "prep",
    "sense": "직접/스스로",
    "transparent": false
  },
  "pv:see#14": {
    "particle": "—",
    "particleType": "none",
    "sense": "예견/예상",
    "transparent": false
  },
  "pv:see#15": {
    "particle": "none",
    "particleType": "none",
    "sense": "동의·합치",
    "transparent": false
  },
  "pv:see#16": {
    "particle": "none",
    "particleType": "none",
    "sense": "이해·납득",
    "transparent": false
  },
  "pv:see#17": {
    "particle": "none",
    "particleType": "none",
    "sense": "소견·판단",
    "transparent": false
  },
  "pv:see#18": {
    "particle": "none",
    "particleType": "none",
    "sense": "이유 접속(because)",
    "transparent": false
  },
  "pv:see#19": {
    "particle": "about",
    "particleType": "prep",
    "sense": "주제/관련",
    "transparent": true
  },
  "pv:see#20": {
    "particle": "none",
    "particleType": "none",
    "sense": "노력 약속(완곡)",
    "transparent": false
  },
  "pv:see#21": {
    "particle": "none",
    "particleType": "none",
    "sense": "인사말",
    "transparent": false
  },
  "pv:see#22": {
    "particle": "none",
    "particleType": "none",
    "sense": "재량 판단",
    "transparent": false
  },
  "pv:see#23": {
    "particle": "none",
    "particleType": "none",
    "sense": "깨달음",
    "transparent": false
  },
  "pv:see#24": {
    "particle": "none",
    "particleType": "none",
    "sense": "분노·격분",
    "transparent": false
  },
  "pv:live#0": {
    "particle": "in",
    "particleType": "prep",
    "sense": "위치/안",
    "transparent": true
  },
  "pv:live#1": {
    "particle": "together",
    "particleType": "adverb",
    "sense": "함께/동거",
    "transparent": true
  },
  "pv:live#2": {
    "particle": "none",
    "particleType": "none",
    "sense": "삶을 살다(직설)",
    "transparent": true
  },
  "pv:live#3": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "기준에 도달/부응",
    "transparent": true
  },
  "pv:live#4": {
    "particle": "with",
    "particleType": "prep",
    "sense": "감수/수용",
    "transparent": false
  },
  "pv:live#5": {
    "particle": "on",
    "particleType": "prep",
    "sense": "~으로 생계/의존",
    "transparent": true
  },
  "pv:live#6": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "원천/의존",
    "transparent": true
  },
  "pv:live#7": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "겪음/거침",
    "transparent": true
  },
  "pv:live#8": {
    "particle": "by",
    "particleType": "prep",
    "sense": "기준/근거",
    "transparent": false
  },
  "pv:live#9": {
    "particle": "for",
    "particleType": "prep",
    "sense": "대상/목적",
    "transparent": true
  },
  "pv:live#10": {
    "particle": "none",
    "particleType": "none",
    "sense": "빠듯한 생계",
    "transparent": false
  },
  "pv:live#11": {
    "particle": "apart",
    "particleType": "adverb",
    "sense": "멀어짐/별거",
    "transparent": true
  },
  "pv:live#12": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "잊혀짐/수그러듦",
    "transparent": false
  },
  "pv:live#13": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "완성/끝까지",
    "transparent": true
  },
  "pv:live#14": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "신나게/최고조",
    "transparent": false
  },
  "pv:live#15": {
    "particle": "none",
    "particleType": "none",
    "sense": "몰두·심취",
    "transparent": false
  },
  "pv:live#16": {
    "particle": "none",
    "particleType": "none",
    "sense": "이상·호화로운 삶",
    "transparent": false
  },
  "pv:live#17": {
    "particle": "none",
    "particleType": "none",
    "sense": "이상·호화로운 삶",
    "transparent": false
  },
  "pv:live#18": {
    "particle": "none",
    "particleType": "none",
    "sense": "축원·만세",
    "transparent": false
  },
  "pv:live#19": {
    "particle": "none",
    "particleType": "none",
    "sense": "인생 격언",
    "transparent": false
  },
  "pv:live#20": {
    "particle": "to",
    "particleType": "none",
    "sense": "결국 ~하게 됨",
    "transparent": false
  },
  "pv:live#21": {
    "particle": "none",
    "particleType": "none",
    "sense": "인생 격언",
    "transparent": false
  },
  "pv:grow#0": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "성장/성숙",
    "transparent": true
  },
  "pv:grow#1": {
    "particle": "none",
    "particleType": "none",
    "sense": "성장시키다(타동)",
    "transparent": true
  },
  "pv:grow#2": {
    "particle": "",
    "particleType": "none",
    "sense": "점점 ~해짐",
    "transparent": true
  },
  "pv:grow#3": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "성장/적응",
    "transparent": true
  },
  "pv:grow#4": {
    "particle": "by",
    "particleType": "prep",
    "sense": "증감 폭(~만큼)",
    "transparent": true
  },
  "pv:grow#5": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "벗어남/이탈",
    "transparent": true
  },
  "pv:grow#6": {
    "particle": "on",
    "particleType": "prep",
    "sense": "점점 좋아짐",
    "transparent": false
  },
  "pv:grow#7": {
    "particle": "apart",
    "particleType": "adverb",
    "sense": "멀어짐/별거",
    "transparent": true
  },
  "pv:grow#8": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "재생/재현",
    "transparent": true
  },
  "pv:grow#9": {
    "particle": "in",
    "particleType": "prep",
    "sense": "차원/측면",
    "transparent": true
  },
  "pv:grow#10": {
    "particle": "of",
    "particleType": "prep",
    "sense": "대상",
    "transparent": false
  },
  "pv:grow#11": {
    "particle": "to",
    "particleType": "prep",
    "sense": "익숙/적응",
    "transparent": false
  },
  "pv:grow#12": {
    "particle": "of",
    "particleType": "prep",
    "sense": "대상",
    "transparent": false
  },
  "pv:grow#13": {
    "particle": "none",
    "particleType": "none",
    "sense": "~해지다(상태변화)",
    "transparent": true
  },
  "pv:grow#14": {
    "particle": "from",
    "particleType": "prep",
    "sense": "기점/시작점",
    "transparent": true
  },
  "pv:grow#15": {
    "particle": "",
    "particleType": "none",
    "sense": "재배",
    "transparent": true
  },
  "pv:sign#0": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "등록/신청",
    "transparent": false
  },
  "pv:sign#1": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "등록/신청",
    "transparent": false
  },
  "pv:sign#2": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "접속/로그인",
    "transparent": true
  },
  "pv:sign#3": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "접속/로그인",
    "transparent": true
  },
  "pv:sign#4": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "로그아웃/퇴장",
    "transparent": true
  },
  "pv:sign#5": {
    "particle": "none",
    "particleType": "none",
    "sense": "서명하다(직설)",
    "transparent": true
  },
  "pv:sign#6": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "로그아웃/퇴장",
    "transparent": true
  },
  "pv:sign#7": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "종료/마무리",
    "transparent": true
  },
  "pv:sign#8": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "최종 승인/결재",
    "transparent": false
  },
  "pv:sign#9": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "합류/계약",
    "transparent": true
  },
  "pv:sign#10": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "합류/계약",
    "transparent": true
  },
  "pv:sign#11": {
    "particle": "with",
    "particleType": "prep",
    "sense": "관련/상대 대상",
    "transparent": true
  },
  "pv:sign#12": {
    "particle": "for",
    "particleType": "prep",
    "sense": "수령 서명",
    "transparent": false
  },
  "pv:sign#13": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "이전/인계",
    "transparent": true
  },
  "pv:sign#14": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "양도/내줌",
    "transparent": true
  },
  "pv:sign#15": {
    "particle": "on",
    "particleType": "prep",
    "sense": "서명/가입",
    "transparent": false
  },
  "pv:sign#16": {
    "particle": "none",
    "particleType": "none",
    "sense": "연대보증·지지",
    "transparent": false
  },
  "pv:walk#0": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "처음부터 끝까지",
    "transparent": true
  },
  "pv:walk#1": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "처음부터 끝까지",
    "transparent": true
  },
  "pv:walk#2": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "이탈/포기",
    "transparent": true
  },
  "pv:walk#3": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "떠남/탈출",
    "transparent": true
  },
  "pv:walk#4": {
    "particle": "none",
    "particleType": "none",
    "sense": "데리고 걷다(사역)",
    "transparent": true
  },
  "pv:walk#5": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "퇴장/이탈",
    "transparent": true
  },
  "pv:walk#6": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "철회/번복",
    "transparent": true
  },
  "pv:walk#7": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "상태·함정에 빠짐",
    "transparent": true
  },
  "pv:walk#8": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "접근/도달",
    "transparent": true
  },
  "pv:walk#9": {
    "particle": "by",
    "particleType": "prep",
    "sense": "지나감/통과",
    "transparent": true
  },
  "pv:walk#10": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "떠남/저버림",
    "transparent": true
  },
  "pv:walk#11": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "진입/안으로",
    "transparent": true
  },
  "pv:walk#12": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "이탈/떠남",
    "transparent": true
  },
  "pv:walk#13": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "차지/획득",
    "transparent": true
  },
  "pv:walk#14": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "짓밟음",
    "transparent": true
  },
  "pv:walk#15": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "들고 떠남",
    "transparent": true
  },
  "pv:walk#16": {
    "particle": "on",
    "particleType": "prep",
    "sense": "조심/눈치",
    "transparent": false
  },
  "pv:walk#17": {
    "particle": "none",
    "particleType": "none",
    "sense": "위태로운 균형",
    "transparent": false
  },
  "pv:walk#18": {
    "particle": "in",
    "particleType": "prep",
    "sense": "쉬운 일(관용)",
    "transparent": false
  },
  "pv:walk#19": {
    "particle": "none",
    "particleType": "none",
    "sense": "언행일치·실천",
    "transparent": false
  },
  "pv:walk#20": {
    "particle": "none",
    "particleType": "none",
    "sense": "무죄 석방",
    "transparent": true
  },
  "pv:throw#0": {
    "particle": "at",
    "particleType": "prep",
    "sense": "겨냥/대상",
    "transparent": true
  },
  "pv:throw#1": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "제거/분리",
    "transparent": true
  },
  "pv:throw#2": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "내쫓음/버림",
    "transparent": true
  },
  "pv:throw#3": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "위로 배출",
    "transparent": false
  },
  "pv:throw#4": {
    "particle": "none",
    "particleType": "none",
    "sense": "예외 발생(코딩)",
    "transparent": false
  },
  "pv:throw#5": {
    "particle": "none",
    "particleType": "none",
    "sense": "행사 열기(기능동사)",
    "transparent": false
  },
  "pv:throw#6": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "추가/덤",
    "transparent": true
  },
  "pv:throw#7": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "벗어남/어긋남",
    "transparent": true
  },
  "pv:throw#8": {
    "particle": "together",
    "particleType": "adverb",
    "sense": "결합/조립",
    "transparent": true
  },
  "pv:throw#9": {
    "particle": "under",
    "particleType": "prep",
    "sense": "희생양/떠넘김",
    "transparent": false
  },
  "pv:throw#10": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "몰입/관심",
    "transparent": true
  },
  "pv:throw#11": {
    "particle": "none",
    "particleType": "none",
    "sense": "분노·격분",
    "transparent": false
  },
  "pv:throw#12": {
    "particle": "to",
    "particleType": "prep",
    "sense": "전달/방향",
    "transparent": true
  },
  "pv:throw#13": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "착용/접촉",
    "transparent": true
  },
  "pv:throw#14": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "진입/안으로",
    "transparent": true
  },
  "pv:throw#15": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "방해/훼방",
    "transparent": false
  },
  "pv:throw#16": {
    "particle": "none",
    "particleType": "none",
    "sense": "허 찌르기·변수",
    "transparent": false
  },
  "pv:throw#17": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "위세/과시",
    "transparent": false
  },
  "pv:throw#18": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "포함/합류",
    "transparent": false
  },
  "pv:throw#19": {
    "particle": "to",
    "particleType": "prep",
    "sense": "~로 내침(버림)",
    "transparent": false
  },
  "pv:throw#20": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "내던짐",
    "transparent": false
  },
  "pv:throw#21": {
    "particle": "none",
    "particleType": "none",
    "sense": "비방·디스",
    "transparent": false
  },
  "pv:throw#22": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "여기저기/곳곳",
    "transparent": true
  },
  "pv:draw#0": {
    "particle": "draw",
    "particleType": "none",
    "sense": "그리다/묘사",
    "transparent": true
  },
  "pv:draw#1": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "완성/끝까지",
    "transparent": true
  },
  "pv:draw#2": {
    "particle": "on",
    "particleType": "prep",
    "sense": "의지/활용",
    "transparent": false
  },
  "pv:draw#3": {
    "particle": "to",
    "particleType": "prep",
    "sense": "방향/지향",
    "transparent": true
  },
  "pv:draw#4": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출처/기원",
    "transparent": true
  },
  "pv:draw#5": {
    "particle": "at",
    "particleType": "prep",
    "sense": "지점/위치",
    "transparent": true
  },
  "pv:draw#6": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "늘임/확장",
    "transparent": true
  },
  "pv:draw#7": {
    "particle": "between",
    "particleType": "prep",
    "sense": "구별/구분",
    "transparent": true
  },
  "pv:draw#8": {
    "particle": "between",
    "particleType": "prep",
    "sense": "비교",
    "transparent": true
  },
  "pv:draw#9": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "뒤로 물러남",
    "transparent": true
  },
  "pv:draw#10": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "감소/하락",
    "transparent": true
  },
  "pv:draw#11": {
    "particle": "draw",
    "particleType": "none",
    "sense": "허탕/기억 안 남",
    "transparent": false
  },
  "pv:draw#12": {
    "particle": "draw",
    "particleType": "none",
    "sense": "끌어당김/유치",
    "transparent": true
  },
  "pv:draw#13": {
    "particle": "draw",
    "particleType": "none",
    "sense": "끌어당김/유치",
    "transparent": true
  },
  "pv:draw#14": {
    "particle": "draw",
    "particleType": "none",
    "sense": "수령/인출",
    "transparent": true
  },
  "pv:draw#15": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출처/기원",
    "transparent": true
  },
  "pv:draw#16": {
    "particle": "to",
    "particleType": "prep",
    "sense": "종결/마무리",
    "transparent": true
  },
  "pv:draw#17": {
    "particle": "draw",
    "particleType": "none",
    "sense": "추첨/제비뽑기",
    "transparent": false
  },
  "pv:draw#18": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "멀어짐/이동",
    "transparent": true
  },
  "pv:draw#19": {
    "particle": "together",
    "particleType": "adverb",
    "sense": "결집/모음",
    "transparent": true
  },
  "pv:draw#20": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "끌어들임/몰입",
    "transparent": true
  },
  "pv:point#0": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "드러냄/공개",
    "transparent": true
  },
  "pv:point#1": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "드러냄/공개",
    "transparent": true
  },
  "pv:point#2": {
    "particle": "to",
    "particleType": "prep",
    "sense": "도달",
    "transparent": true
  },
  "pv:point#3": {
    "particle": "in",
    "particleType": "prep",
    "sense": "무의미/소용없음(관용)",
    "transparent": false
  },
  "pv:point#4": {
    "particle": "of",
    "particleType": "prep",
    "sense": "속성/관계",
    "transparent": true
  },
  "pv:point#5": {
    "particle": "point",
    "particleType": "none",
    "sense": "논점/의견",
    "transparent": true
  },
  "pv:point#6": {
    "particle": "point",
    "particleType": "none",
    "sense": "핵심/요점",
    "transparent": true
  },
  "pv:point#7": {
    "particle": "at",
    "particleType": "prep",
    "sense": "시점",
    "transparent": true
  },
  "pv:point#8": {
    "particle": "to",
    "particleType": "prep",
    "sense": "지시/시사",
    "transparent": true
  },
  "pv:point#9": {
    "particle": "at",
    "particleType": "prep",
    "sense": "겨냥/대상",
    "transparent": true
  },
  "pv:point#10": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "드러냄/공개",
    "transparent": true
  },
  "pv:point#11": {
    "particle": "to",
    "particleType": "prep",
    "sense": "방향/도착",
    "transparent": true
  },
  "pv:point#12": {
    "particle": "of",
    "particleType": "prep",
    "sense": "대상",
    "transparent": false
  },
  "pv:point#13": {
    "particle": "point",
    "particleType": "none",
    "sense": "핵심/요점",
    "transparent": true
  },
  "pv:point#14": {
    "particle": "point",
    "particleType": "none",
    "sense": "논점/의견",
    "transparent": false
  },
  "pv:point#15": {
    "particle": "point",
    "particleType": "none",
    "sense": "특정 지점/측면",
    "transparent": true
  },
  "pv:point#16": {
    "particle": "of",
    "particleType": "prep",
    "sense": "속성/관계",
    "transparent": true
  },
  "pv:point#17": {
    "particle": "of",
    "particleType": "prep",
    "sense": "속성/관계",
    "transparent": true
  },
  "pv:point#18": {
    "particle": "point",
    "particleType": "none",
    "sense": "논점/의견",
    "transparent": true
  },
  "pv:point#19": {
    "particle": "to",
    "particleType": "prep",
    "sense": "핵심 지향",
    "transparent": true
  },
  "pv:point#20": {
    "particle": "point",
    "particleType": "none",
    "sense": "항목",
    "transparent": true
  },
  "pv:point#21": {
    "particle": "point",
    "particleType": "none",
    "sense": "특정 지점/측면",
    "transparent": true
  },
  "pv:point#22": {
    "particle": "point",
    "particleType": "none",
    "sense": "특정 지점/측면",
    "transparent": true
  },
  "pv:point#23": {
    "particle": "point",
    "particleType": "none",
    "sense": "핵심/요점",
    "transparent": false
  },
  "pv:point#24": {
    "particle": "at",
    "particleType": "prep",
    "sense": "지목/탓",
    "transparent": false
  },
  "pv:point#25": {
    "particle": "in",
    "particleType": "prep",
    "sense": "딱 맞는 예(관용)",
    "transparent": false
  },
  "pv:point#26": {
    "particle": "point",
    "particleType": "none",
    "sense": "특정 지점/측면",
    "transparent": true
  },
  "pv:settle#0": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "진정/완화",
    "transparent": true
  },
  "pv:settle#1": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "자리잡음/적응",
    "transparent": true
  },
  "pv:settle#2": {
    "particle": "for",
    "particleType": "prep",
    "sense": "차선 수용",
    "transparent": false
  },
  "pv:settle#3": {
    "particle": "on",
    "particleType": "prep",
    "sense": "결정/선택",
    "transparent": true
  },
  "pv:settle#4": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "적응/자리잡기",
    "transparent": true
  },
  "pv:settle#5": {
    "particle": "settle",
    "particleType": "none",
    "sense": "해결/결판",
    "transparent": true
  },
  "pv:settle#6": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "완성/끝까지",
    "transparent": true
  },
  "pv:settle#7": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "밖/외부",
    "transparent": true
  },
  "pv:settle#8": {
    "particle": "settle",
    "particleType": "none",
    "sense": "해결/결판",
    "transparent": true
  },
  "pv:settle#9": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "착수/전념",
    "transparent": true
  },
  "pv:settle#10": {
    "particle": "settle",
    "particleType": "none",
    "sense": "진정/가라앉힘",
    "transparent": false
  },
  "pv:settle#11": {
    "particle": "settle",
    "particleType": "none",
    "sense": "진정/가라앉힘",
    "transparent": true
  },
  "pv:settle#12": {
    "particle": "settle",
    "particleType": "none",
    "sense": "앙갚음/보복",
    "transparent": false
  },
  "pv:settle#13": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "뒤로 기댐",
    "transparent": true
  },
  "pv:settle#14": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "자리잡음/적응",
    "transparent": true
  },
  "pv:count#0": {
    "particle": "on",
    "particleType": "prep",
    "sense": "의존/토대",
    "transparent": true
  },
  "pv:count#1": {
    "particle": "count",
    "particleType": "none",
    "sense": "세다/헤아리다",
    "transparent": true
  },
  "pv:count#2": {
    "particle": "count",
    "particleType": "none",
    "sense": "중요하다/유효하다",
    "transparent": true
  },
  "pv:count#3": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "포함/합류",
    "transparent": true
  },
  "pv:count#4": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "제외/배제",
    "transparent": true
  },
  "pv:count#5": {
    "particle": "toward",
    "particleType": "prep",
    "sense": "기여/누적",
    "transparent": true
  },
  "pv:count#6": {
    "particle": "against",
    "particleType": "prep",
    "sense": "불리하게",
    "transparent": true
  },
  "pv:count#7": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "합산/총합",
    "transparent": true
  },
  "pv:count#8": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "감소/하락",
    "transparent": true
  },
  "pv:count#9": {
    "particle": "for",
    "particleType": "prep",
    "sense": "가치/값어치",
    "transparent": false
  },
  "pv:count#10": {
    "particle": "as",
    "particleType": "prep",
    "sense": "~로 간주/취급",
    "transparent": true
  },
  "pv:count#11": {
    "particle": "of",
    "particleType": "prep",
    "sense": "대상",
    "transparent": false
  },
  "pv:count#12": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "카운트다운",
    "transparent": true
  },
  "pv:count#13": {
    "particle": "among",
    "particleType": "prep",
    "sense": "~중 포함",
    "transparent": true
  },
  "pv:count#14": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "배분/분배",
    "transparent": true
  },
  "pv:count#15": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "차례로 외침",
    "transparent": false
  },
  "pv:count#16": {
    "particle": "count",
    "particleType": "none",
    "sense": "감사하기",
    "transparent": false
  },
  "pv:count#17": {
    "particle": "count",
    "particleType": "none",
    "sense": "섣부른 기대 금물",
    "transparent": false
  },
  "pv:count#18": {
    "particle": "count",
    "particleType": "none",
    "sense": "세다/헤아리다",
    "transparent": true
  },
  "pv:count#19": {
    "particle": "count",
    "particleType": "none",
    "sense": "잠 청하기",
    "transparent": false
  },
  "pv:plan#0": {
    "particle": "to",
    "particleType": "prep",
    "sense": "의도/예정",
    "transparent": true
  },
  "pv:plan#1": {
    "particle": "on",
    "particleType": "prep",
    "sense": "작정/예정",
    "transparent": false
  },
  "pv:plan#2": {
    "particle": "for",
    "particleType": "prep",
    "sense": "대비/목적",
    "transparent": true
  },
  "pv:plan#3": {
    "particle": "ahead",
    "particleType": "adverb",
    "sense": "미리/앞일",
    "transparent": true
  },
  "pv:plan#4": {
    "particle": "plan",
    "particleType": "none",
    "sense": "계획하다",
    "transparent": true
  },
  "pv:plan#5": {
    "particle": "plan",
    "particleType": "none",
    "sense": "계획하다",
    "transparent": true
  },
  "pv:plan#6": {
    "particle": "none",
    "particleType": "none",
    "sense": "동사연어(collocation)",
    "transparent": true
  },
  "pv:plan#7": {
    "particle": "as",
    "particleType": "none",
    "sense": "~대로(일치)",
    "transparent": true
  },
  "pv:plan#8": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "완성/철저",
    "transparent": true
  },
  "pv:plan#9": {
    "particle": "around",
    "particleType": "prep",
    "sense": "우회/회피",
    "transparent": true
  },
  "pv:plan#10": {
    "particle": "according to",
    "particleType": "none",
    "sense": "~에 따라(일치)",
    "transparent": true
  },
  "pv:plan#11": {
    "particle": "of",
    "particleType": "none",
    "sense": "~의(관계)",
    "transparent": true
  },
  "pv:plan#12": {
    "particle": "none",
    "particleType": "none",
    "sense": "관용표현(idiom)",
    "transparent": false
  },
  "pv:plan#13": {
    "particle": "none",
    "particleType": "none",
    "sense": "관용표현(idiom)",
    "transparent": false
  },
  "pv:plan#14": {
    "particle": "of",
    "particleType": "none",
    "sense": "~의(관계)",
    "transparent": true
  },
  "pv:plan#15": {
    "particle": "none",
    "particleType": "none",
    "sense": "명사연어(compound)",
    "transparent": true
  },
  "pv:plan#16": {
    "particle": "none",
    "particleType": "none",
    "sense": "명사연어(compound)",
    "transparent": true
  },
  "pv:plan#17": {
    "particle": "none",
    "particleType": "none",
    "sense": "명사연어(compound)",
    "transparent": true
  },
  "pv:plan#18": {
    "particle": "none",
    "particleType": "none",
    "sense": "명사연어(compound)",
    "transparent": true
  },
  "pv:plan#19": {
    "particle": "to",
    "particleType": "prep",
    "sense": "고수/밀착",
    "transparent": true
  },
  "pv:plan#20": {
    "particle": "to",
    "particleType": "prep",
    "sense": "의도/예정",
    "transparent": true
  },
  "pv:plan#21": {
    "particle": "none",
    "particleType": "none",
    "sense": "관용표현(idiom)",
    "transparent": false
  },
  "pv:figure#0": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "해결/완료",
    "transparent": true
  },
  "pv:figure#1": {
    "particle": "none",
    "particleType": "none",
    "sense": "동사+that절(추측)",
    "transparent": true
  },
  "pv:figure#2": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "이해/파악",
    "transparent": true
  },
  "pv:figure#3": {
    "particle": "into",
    "particleType": "prep",
    "sense": "요소로 작용",
    "transparent": true
  },
  "pv:figure#4": {
    "particle": "on",
    "particleType": "prep",
    "sense": "예상/기대",
    "transparent": false
  },
  "pv:figure#5": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "포함/합류",
    "transparent": true
  },
  "pv:figure#6": {
    "particle": "none",
    "particleType": "none",
    "sense": "관용표현(idiom)",
    "transparent": false
  },
  "pv:figure#7": {
    "particle": "none",
    "particleType": "none",
    "sense": "관용표현(idiom)",
    "transparent": false
  },
  "pv:figure#8": {
    "particle": "none",
    "particleType": "none",
    "sense": "관용표현(idiom)",
    "transparent": false
  },
  "pv:figure#9": {
    "particle": "none",
    "particleType": "none",
    "sense": "관용표현(idiom)",
    "transparent": false
  },
  "pv:sort#0": {
    "particle": "of",
    "particleType": "none",
    "sense": "일종/종류",
    "transparent": false
  },
  "pv:sort#1": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "해결/완료",
    "transparent": true
  },
  "pv:sort#2": {
    "particle": "none",
    "particleType": "none",
    "sense": "기본 타동사(정렬)",
    "transparent": true
  },
  "pv:sort#3": {
    "particle": "by",
    "particleType": "prep",
    "sense": "기준/근거",
    "transparent": true
  },
  "pv:sort#4": {
    "particle": "through",
    "particleType": "prep",
    "sense": "샅샅이(뒤지기)",
    "transparent": true
  },
  "pv:sort#5": {
    "particle": "into",
    "particleType": "prep",
    "sense": "분류",
    "transparent": true
  },
  "pv:sort#6": {
    "particle": "in",
    "particleType": "prep",
    "sense": "순서/방향",
    "transparent": true
  },
  "pv:sort#7": {
    "particle": "of",
    "particleType": "none",
    "sense": "일종/종류",
    "transparent": true
  },
  "pv:sort#8": {
    "particle": "of",
    "particleType": "none",
    "sense": "일종/종류",
    "transparent": true
  },
  "pv:sort#9": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "해결/완료",
    "transparent": true
  },
  "pv:sort#10": {
    "particle": "none",
    "particleType": "none",
    "sense": "명사연어(compound)",
    "transparent": true
  },
  "pv:sort#11": {
    "particle": "from",
    "particleType": "prep",
    "sense": "분리/구별",
    "transparent": true
  },
  "pv:sort#12": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "해결/정리",
    "transparent": true
  },
  "pv:sort#13": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "불쾌/언짢음",
    "transparent": false
  },
  "pv:sort#14": {
    "particle": "of",
    "particleType": "none",
    "sense": "일종/종류",
    "transparent": false
  },
  "pv:step#0": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "증가",
    "transparent": true
  },
  "pv:step#1": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "물러남/사임",
    "transparent": true
  },
  "pv:step#2": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "개입/끼어듦",
    "transparent": true
  },
  "pv:step#3": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "뒤로 물러남",
    "transparent": true
  },
  "pv:step#4": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "벗어남/이탈",
    "transparent": true
  },
  "pv:step#5": {
    "particle": "aside",
    "particleType": "adverb",
    "sense": "옆으로(비켜남)",
    "transparent": true
  },
  "pv:step#6": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "제거/분리",
    "transparent": true
  },
  "pv:step#7": {
    "particle": "through",
    "particleType": "adverb",
    "sense": "처음부터 끝까지",
    "transparent": true
  },
  "pv:step#8": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "대체/대타",
    "transparent": true
  },
  "pv:step#9": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "역할 맡음/진입",
    "transparent": true
  },
  "pv:step#10": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "증가",
    "transparent": true
  },
  "pv:step#11": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "나섬/책임짐",
    "transparent": false
  },
  "pv:step#12": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "밟음/침범",
    "transparent": true
  },
  "pv:step#13": {
    "particle": "none",
    "particleType": "none",
    "sense": "동사연어(collocation)",
    "transparent": true
  },
  "pv:step#14": {
    "particle": "by",
    "particleType": "none",
    "sense": "하나씩(점진)",
    "transparent": true
  },
  "pv:step#15": {
    "particle": "forward",
    "particleType": "adverb",
    "sense": "전진/나섬",
    "transparent": true
  },
  "pv:step#16": {
    "particle": "none",
    "particleType": "none",
    "sense": "관용표현(idiom)",
    "transparent": false
  },
  "pv:step#17": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "벗어남/이탈",
    "transparent": true
  },
  "pv:step#18": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "벗어남/이탈",
    "transparent": true
  },
  "pv:step#19": {
    "particle": "ahead",
    "particleType": "adverb",
    "sense": "앞섬/우위",
    "transparent": true
  },
  "pv:step#20": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "이동/건너감",
    "transparent": true
  },
  "pv:step#21": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "밟음/가속",
    "transparent": false
  },
  "pv:step#22": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "참여/합류",
    "transparent": true
  },
  "pv:lay#0": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "중단/단절",
    "transparent": true
  },
  "pv:lay#1": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "펼침/제시",
    "transparent": true
  },
  "pv:lay#2": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "확정/명문화",
    "transparent": true
  },
  "pv:lay#3": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "하강/내림",
    "transparent": true
  },
  "pv:lay#4": {
    "particle": "for",
    "particleType": "prep",
    "sense": "목적/대상",
    "transparent": true
  },
  "pv:lay#5": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "경유/체류",
    "transparent": false
  },
  "pv:lay#6": {
    "particle": "of",
    "particleType": "none",
    "sense": "~의(관계)",
    "transparent": false
  },
  "pv:lay#7": {
    "particle": "on",
    "particleType": "prep",
    "sense": "전가 대상",
    "transparent": false
  },
  "pv:lay#8": {
    "particle": "low",
    "particleType": "none",
    "sense": "은신(낮게)",
    "transparent": false
  },
  "pv:lay#9": {
    "particle": "for",
    "particleType": "prep",
    "sense": "목적/대상",
    "transparent": true
  },
  "pv:lay#10": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "공격/맹비난",
    "transparent": false
  },
  "pv:lay#11": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "몸져누움/정지",
    "transparent": false
  },
  "pv:lay#12": {
    "particle": "aside",
    "particleType": "adverb",
    "sense": "따로 떼어둠",
    "transparent": true
  },
  "pv:lay#13": {
    "particle": "to",
    "particleType": "prep",
    "sense": "소속/소유",
    "transparent": false
  },
  "pv:lay#14": {
    "particle": "to",
    "particleType": "prep",
    "sense": "종식/상태로",
    "transparent": false
  },
  "pv:lay#15": {
    "particle": "on",
    "particleType": "prep",
    "sense": "대상",
    "transparent": false
  },
  "pv:lay#16": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "덧바름/과장",
    "transparent": false
  },
  "pv:lay#17": {
    "particle": "on",
    "particleType": "prep",
    "sense": "내기/걺",
    "transparent": false
  },
  "pv:lay#18": {
    "particle": "bare",
    "particleType": "none",
    "sense": "드러냄(폭로)",
    "transparent": true
  },
  "pv:lay#19": {
    "particle": "to",
    "particleType": "prep",
    "sense": "대상",
    "transparent": false
  },
  "pv:lay#20": {
    "particle": "on",
    "particleType": "prep",
    "sense": "공개/제시",
    "transparent": false
  },
  "pv:roll#0": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "출시/배포",
    "transparent": true
  },
  "pv:roll#1": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "복귀/되돌아옴",
    "transparent": true
  },
  "pv:roll#2": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "이월",
    "transparent": true
  },
  "pv:roll#3": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "합산/총합",
    "transparent": true
  },
  "pv:roll#4": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "유입",
    "transparent": true
  },
  "pv:roll#5": {
    "particle": "none",
    "particleType": "none",
    "sense": "관용표현(idiom)",
    "transparent": false
  },
  "pv:roll#6": {
    "particle": "on",
    "particleType": "prep",
    "sense": "지속/계속",
    "transparent": false
  },
  "pv:roll#7": {
    "particle": "with",
    "particleType": "prep",
    "sense": "수용/감수",
    "transparent": false
  },
  "pv:roll#8": {
    "particle": "on",
    "particleType": "prep",
    "sense": "방식/상시",
    "transparent": false
  },
  "pv:roll#9": {
    "particle": "",
    "particleType": "none",
    "sense": "모험·한판 걸기",
    "transparent": false
  },
  "pv:roll#10": {
    "particle": "",
    "particleType": "none",
    "sense": "출발·시작",
    "transparent": false
  },
  "pv:roll#11": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "통합/합침",
    "transparent": true
  },
  "pv:roll#12": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "하강/내림",
    "transparent": true
  },
  "pv:roll#13": {
    "particle": "forward",
    "particleType": "adverb",
    "sense": "이월",
    "transparent": true
  },
  "pv:roll#14": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "분리/이탈",
    "transparent": true
  },
  "pv:roll#15": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "환대/대접",
    "transparent": false
  },
  "pv:roll#16": {
    "particle": "",
    "particleType": "none",
    "sense": "문책·처벌",
    "transparent": false
  },
  "pv:roll#17": {
    "particle": "",
    "particleType": "none",
    "sense": "직접 구현·자작",
    "transparent": false
  },
  "pv:kick#0": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "시작/착수",
    "transparent": true
  },
  "pv:kick#1": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "작동 개시/발효",
    "transparent": true
  },
  "pv:kick#2": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "내쫓음/버림",
    "transparent": true
  },
  "pv:kick#3": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "이리저리/검토",
    "transparent": true
  },
  "pv:kick#4": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "느긋이 쉼",
    "transparent": false
  },
  "pv:kick#5": {
    "particle": "out",
    "particleType": "prep",
    "sense": "원천/출처",
    "transparent": false
  },
  "pv:kick#6": {
    "particle": "",
    "particleType": "none",
    "sense": "(습관을) 끊다",
    "transparent": false
  },
  "pv:kick#7": {
    "particle": "",
    "particleType": "none",
    "sense": "시동 걸기·촉발",
    "transparent": false
  },
  "pv:kick#8": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "미래로 미룸",
    "transparent": false
  },
  "pv:kick#9": {
    "particle": "",
    "particleType": "none",
    "sense": "사전 점검·시험",
    "transparent": false
  },
  "pv:kick#10": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "유발/생성",
    "transparent": true
  },
  "pv:kick#11": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "증가",
    "transparent": true
  },
  "pv:kick#12": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "작동/관여 시작",
    "transparent": true
  },
  "pv:kick#13": {
    "particle": "",
    "particleType": "none",
    "sense": "자책·후회",
    "transparent": false
  },
  "pv:kick#14": {
    "particle": "in",
    "particleType": "prep",
    "sense": "안에(공간)",
    "transparent": false
  },
  "pv:kick#15": {
    "particle": "to",
    "particleType": "prep",
    "sense": "~로 내침(버림)",
    "transparent": false
  },
  "pv:kick#16": {
    "particle": "",
    "particleType": "none",
    "sense": "마지못해·저항하며",
    "transparent": false
  },
  "pv:kick#17": {
    "particle": "for",
    "particleType": "prep",
    "sense": "목적/추구",
    "transparent": true
  },
  "pv:kick#18": {
    "particle": "",
    "particleType": "none",
    "sense": "건재·여전히 활동",
    "transparent": false
  },
  "pv:kick#19": {
    "particle": "",
    "particleType": "none",
    "sense": "죽다",
    "transparent": false
  },
  "pv:wrap#0": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "완성/끝까지",
    "transparent": true
  },
  "pv:wrap#1": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "둘러쌈/감쌈",
    "transparent": true
  },
  "pv:wrap#2": {
    "particle": "in",
    "particleType": "prep",
    "sense": "안에(공간)",
    "transparent": true
  },
  "pv:wrap#3": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "둘러쌈/감쌈",
    "transparent": true
  },
  "pv:wrap#4": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "둘러쌈/감쌈",
    "transparent": true
  },
  "pv:wrap#5": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "몰두/열중",
    "transparent": false
  },
  "pv:wrap#6": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "완성/완료",
    "transparent": true
  },
  "pv:wrap#7": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "둘러쌈/감쌈",
    "transparent": true
  },
  "pv:wrap#8": {
    "particle": "",
    "particleType": "none",
    "sense": "포장: 선물 포장",
    "transparent": true
  },
  "pv:wrap#9": {
    "particle": "",
    "particleType": "none",
    "sense": "포장: 완충재(뽁뽁이)",
    "transparent": true
  },
  "pv:wrap#10": {
    "particle": "",
    "particleType": "none",
    "sense": "완료·종료",
    "transparent": false
  },
  "pv:wrap#11": {
    "particle": "under",
    "particleType": "prep",
    "sense": "은폐/숨김",
    "transparent": true
  },
  "pv:wrap#12": {
    "particle": "",
    "particleType": "none",
    "sense": "포장: 수축 비닐",
    "transparent": true
  },
  "pv:wrap#13": {
    "particle": "",
    "particleType": "none",
    "sense": "줄바꿈(텍스트)",
    "transparent": true
  },
  "pv:reach#0": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "내밂/뻗음",
    "transparent": true
  },
  "pv:reach#1": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "내밂/뻗음",
    "transparent": true
  },
  "pv:reach#2": {
    "particle": "",
    "particleType": "none",
    "sense": "도달: 장소 도착",
    "transparent": true
  },
  "pv:reach#3": {
    "particle": "",
    "particleType": "none",
    "sense": "도달: 연락 닿음",
    "transparent": true
  },
  "pv:reach#4": {
    "particle": "for",
    "particleType": "prep",
    "sense": "목표/추구",
    "transparent": true
  },
  "pv:reach#5": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "답신/응답",
    "transparent": true
  },
  "pv:reach#6": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "내밂/뻗음",
    "transparent": true
  },
  "pv:reach#7": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "안으로(이동/투입)",
    "transparent": true
  },
  "pv:reach#8": {
    "particle": "out",
    "particleType": "prep",
    "sense": "닿지 않음(밖)",
    "transparent": true
  },
  "pv:reach#9": {
    "particle": "",
    "particleType": "none",
    "sense": "도달: 단계에 이름",
    "transparent": true
  },
  "pv:reach#10": {
    "particle": "",
    "particleType": "none",
    "sense": "도달: 끝에 다다름",
    "transparent": true
  },
  "pv:reach#11": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "위로/방향",
    "transparent": true
  },
  "pv:reach#12": {
    "particle": "",
    "particleType": "none",
    "sense": "도달: 한계·정원",
    "transparent": true
  },
  "pv:reach#13": {
    "particle": "across",
    "particleType": "adverb",
    "sense": "가로질러/횡단",
    "transparent": true
  },
  "pv:deal#0": {
    "particle": "with",
    "particleType": "prep",
    "sense": "처리/관여 대상",
    "transparent": false
  },
  "pv:deal#1": {
    "particle": "",
    "particleType": "none",
    "sense": "중요성: 대수(반어 빈출)",
    "transparent": false
  },
  "pv:deal#2": {
    "particle": "of",
    "particleType": "prep",
    "sense": "수량/부분",
    "transparent": true
  },
  "pv:deal#3": {
    "particle": "with",
    "particleType": "prep",
    "sense": "상대/대상",
    "transparent": false
  },
  "pv:deal#4": {
    "particle": "",
    "particleType": "none",
    "sense": "거래: 결정적 결격사유",
    "transparent": false
  },
  "pv:deal#5": {
    "particle": "",
    "particleType": "none",
    "sense": "거래: 성사·매듭",
    "transparent": false
  },
  "pv:deal#6": {
    "particle": "in",
    "particleType": "prep",
    "sense": "취급 분야",
    "transparent": false
  },
  "pv:deal#7": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "나눠줌/배포",
    "transparent": true
  },
  "pv:deal#8": {
    "particle": "",
    "particleType": "none",
    "sense": "거래: 마약 판매",
    "transparent": true
  },
  "pv:deal#9": {
    "particle": "with",
    "particleType": "prep",
    "sense": "수용/감수",
    "transparent": false
  },
  "pv:deal#10": {
    "particle": "",
    "particleType": "none",
    "sense": "확정·기정사실",
    "transparent": false
  },
  "pv:deal#11": {
    "particle": "",
    "particleType": "none",
    "sense": "진위: 진짜배기",
    "transparent": false
  },
  "pv:deal#12": {
    "particle": "",
    "particleType": "none",
    "sense": "거래: 결렬·불가",
    "transparent": true
  },
  "pv:deal#13": {
    "particle": "",
    "particleType": "none",
    "sense": "담화: 상황 설명 도입",
    "transparent": false
  },
  "pv:deal#14": {
    "particle": "with",
    "particleType": "prep",
    "sense": "처리/관여 대상",
    "transparent": false
  },
  "pv:deal#15": {
    "particle": "",
    "particleType": "none",
    "sense": "거래: 합의 수락",
    "transparent": true
  },
  "pv:deal#16": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "분배",
    "transparent": true
  },
  "pv:deal#17": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "포함/합류",
    "transparent": true
  },
  "pv:deal#18": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "제외/배제",
    "transparent": true
  },
  "pv:deal#19": {
    "particle": "",
    "particleType": "none",
    "sense": "카드 돌리기(분배)",
    "transparent": true
  },
  "pv:deal#20": {
    "particle": "",
    "particleType": "none",
    "sense": "부당한 대우",
    "transparent": false
  },
  "pv:shut#0": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "정지/폐쇄",
    "transparent": true
  },
  "pv:shut#1": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "차단/분리",
    "transparent": true
  },
  "pv:shut#2": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "완성/끝까지",
    "transparent": true
  },
  "pv:shut#3": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "배제/제외",
    "transparent": true
  },
  "pv:shut#4": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "정지/폐쇄",
    "transparent": true
  },
  "pv:shut#5": {
    "particle": "",
    "particleType": "none",
    "sense": "입 다물기(비밀 유지)",
    "transparent": false
  },
  "pv:shut#6": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "안에(공간)",
    "transparent": true
  },
  "pv:shut#7": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "격리/보관",
    "transparent": true
  },
  "pv:shut#8": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "차단/분리",
    "transparent": true
  },
  "pv:shut#9": {
    "particle": "on",
    "particleType": "prep",
    "sense": "대상",
    "transparent": false
  },
  "pv:shut#10": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "가둠/갇힘",
    "transparent": true
  },
  "pv:shut#11": {
    "particle": "",
    "particleType": "none",
    "sense": "명백한 사건",
    "transparent": false
  },
  "pv:shut#12": {
    "particle": "with",
    "particleType": "prep",
    "sense": "방식/상태",
    "transparent": false
  },
  "pv:play#0": {
    "particle": "",
    "particleType": "none",
    "sense": "게임/스포츠 하기",
    "transparent": true
  },
  "pv:play#1": {
    "particle": "in",
    "particleType": "prep",
    "sense": "분야/영역",
    "transparent": false
  },
  "pv:play#2": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "축소/낮춤",
    "transparent": true
  },
  "pv:play#3": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "증가",
    "transparent": true
  },
  "pv:play#4": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "전개/펼침",
    "transparent": true
  },
  "pv:play#5": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "여기저기/이리저리",
    "transparent": true
  },
  "pv:play#6": {
    "particle": "along",
    "particleType": "adverb",
    "sense": "동조/맞춰줌",
    "transparent": false
  },
  "pv:play#7": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "되돌려 재생",
    "transparent": true
  },
  "pv:play#8": {
    "particle": "with",
    "particleType": "prep",
    "sense": "처리/관여 대상",
    "transparent": false
  },
  "pv:play#9": {
    "particle": "by",
    "particleType": "prep",
    "sense": "기준/근거",
    "transparent": false
  },
  "pv:play#10": {
    "particle": "",
    "particleType": "none",
    "sense": "안전하게 가기",
    "transparent": false
  },
  "pv:play#11": {
    "particle": "",
    "particleType": "none",
    "sense": "일부러 반대 입장 취하기",
    "transparent": false
  },
  "pv:play#12": {
    "particle": "to",
    "particleType": "prep",
    "sense": "성향/끌림",
    "transparent": false
  },
  "pv:play#13": {
    "particle": "",
    "particleType": "none",
    "sense": "강경하게 밀어붙이기",
    "transparent": false
  },
  "pv:play#14": {
    "particle": "",
    "particleType": "none",
    "sense": "편애하기",
    "transparent": false
  },
  "pv:play#15": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "조장/일조",
    "transparent": false
  },
  "pv:play#16": {
    "particle": "",
    "particleType": "none",
    "sense": "모르는 척하기",
    "transparent": false
  },
  "pv:play#17": {
    "particle": "up",
    "particleType": "none",
    "sense": "따라잡음(도달)",
    "transparent": false
  },
  "pv:play#18": {
    "particle": "with",
    "particleType": "prep",
    "sense": "상대/대상",
    "transparent": false
  },
  "pv:play#19": {
    "particle": "",
    "particleType": "none",
    "sense": "사이좋게 굴기(협조)",
    "transparent": false
  },
  "pv:play#20": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "작동/관여 시작",
    "transparent": false
  },
  "pv:play#21": {
    "particle": "",
    "particleType": "none",
    "sense": "태연한 척하기",
    "transparent": false
  },
  "pv:play#22": {
    "particle": "",
    "particleType": "none",
    "sense": "장기전 펼치기",
    "transparent": false
  },
  "pv:play#23": {
    "particle": "off",
    "particleType": "adverb",
    "sense": "대립/대비",
    "transparent": false
  },
  "pv:hang#0": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "종료/끊음",
    "transparent": false
  },
  "pv:hang#1": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "어울림/시간보내기",
    "transparent": false
  },
  "pv:hang#2": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "붙듦/유지",
    "transparent": true
  },
  "pv:hang#3": {
    "particle": "on",
    "particleType": "prep",
    "sense": "접촉/표면",
    "transparent": true
  },
  "pv:hang#4": {
    "particle": "of",
    "particleType": "prep",
    "sense": "대상",
    "transparent": false
  },
  "pv:hang#5": {
    "particle": "around",
    "particleType": "adverb",
    "sense": "근처/주변에 있음",
    "transparent": true
  },
  "pv:hang#6": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "견딤/버팀",
    "transparent": false
  },
  "pv:hang#7": {
    "particle": "",
    "particleType": "none",
    "sense": "(프로그램) 멈춤/먹통",
    "transparent": false
  },
  "pv:hang#8": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "종료/끊음",
    "transparent": false
  },
  "pv:hang#9": {
    "particle": "on",
    "particleType": "adverb",
    "sense": "붙듦/유지",
    "transparent": true
  },
  "pv:hang#10": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "숙취",
    "transparent": false
  },
  "pv:hang#11": {
    "particle": "",
    "particleType": "none",
    "sense": "기다리게 내버려두기",
    "transparent": false
  },
  "pv:hang#12": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "집착/얽매임",
    "transparent": false
  },
  "pv:hang#13": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "뒤로 물러남",
    "transparent": true
  },
  "pv:hang#14": {
    "particle": "over",
    "particleType": "adverb",
    "sense": "드리움/덮침",
    "transparent": true
  },
  "pv:hang#15": {
    "particle": "in",
    "particleType": "prep",
    "sense": "상태/안에 있음",
    "transparent": false
  },
  "pv:hang#16": {
    "particle": "by",
    "particleType": "prep",
    "sense": "위태로움",
    "transparent": false
  },
  "pv:hang#17": {
    "particle": "together",
    "particleType": "adverb",
    "sense": "일관/결속",
    "transparent": true
  },
  "pv:hang#18": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "아래로 늘어짐",
    "transparent": true
  },
  "pv:hang#19": {
    "particle": "",
    "particleType": "none",
    "sense": "좌/우회전하기",
    "transparent": false
  },
  "pv:weigh#0": {
    "particle": "",
    "particleType": "none",
    "sense": "무게가 나가다",
    "transparent": true
  },
  "pv:weigh#1": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "참여/의견 보탬",
    "transparent": false
  },
  "pv:weigh#2": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "참여/의견 보탬",
    "transparent": false
  },
  "pv:weigh#3": {
    "particle": "on",
    "particleType": "prep",
    "sense": "압박/부담",
    "transparent": true
  },
  "pv:weigh#4": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "능가/초과",
    "transparent": true
  },
  "pv:weigh#5": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "아래로 짓누름",
    "transparent": true
  },
  "pv:weigh#6": {
    "particle": "against",
    "particleType": "prep",
    "sense": "대조/비교",
    "transparent": true
  },
  "pv:weigh#7": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "참여/의견 보탬",
    "transparent": false
  },
  "pv:weigh#8": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "무게/측정",
    "transparent": false
  },
  "pv:weigh#9": {
    "particle": "against",
    "particleType": "prep",
    "sense": "불리하게",
    "transparent": true
  },
  "pv:weigh#10": {
    "particle": "",
    "particleType": "none",
    "sense": "말을 신중히 고르기",
    "transparent": false
  },
  "pv:scale#0": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "증가",
    "transparent": true
  },
  "pv:scale#1": {
    "particle": "",
    "particleType": "none",
    "sense": "확장성 있다",
    "transparent": false
  },
  "pv:scale#2": {
    "particle": "down",
    "particleType": "adverb",
    "sense": "감소/하락",
    "transparent": true
  },
  "pv:scale#3": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "축소/감축",
    "transparent": true
  },
  "pv:scale#4": {
    "particle": "at",
    "particleType": "prep",
    "sense": "의도/속뜻",
    "transparent": false
  },
  "pv:scale#5": {
    "particle": "to",
    "particleType": "prep",
    "sense": "~까지(도달)",
    "transparent": true
  },
  "pv:scale#6": {
    "particle": "back",
    "particleType": "adverb",
    "sense": "축소/감축",
    "transparent": true
  },
  "pv:scale#7": {
    "particle": "of",
    "particleType": "prep",
    "sense": "속성/관계",
    "transparent": true
  },
  "pv:scale#8": {
    "particle": "on",
    "particleType": "prep",
    "sense": "척도/정도",
    "transparent": false
  },
  "pv:scale#9": {
    "particle": "out",
    "particleType": "adverb",
    "sense": "늘임/확장",
    "transparent": true
  },
  "pv:scale#10": {
    "particle": "with",
    "particleType": "prep",
    "sense": "연동/동반",
    "transparent": true
  },
  "pv:scale#11": {
    "particle": "of",
    "particleType": "prep",
    "sense": "속성/관계",
    "transparent": false
  },
  "pv:scale#12": {
    "particle": "",
    "particleType": "none",
    "sense": "(벽/산) 오르기·등반",
    "transparent": true
  },
  "pv:scale#13": {
    "particle": "to",
    "particleType": "prep",
    "sense": "기준/비율대로",
    "transparent": false
  },
  "pv:scale#14": {
    "particle": "",
    "particleType": "none",
    "sense": "차등제",
    "transparent": false
  },
  "pv:scale#15": {
    "particle": "",
    "particleType": "none",
    "sense": "판세를 좌우함(결정적 영향)",
    "transparent": false
  },
  "pv:extra#0": {
    "particle": "with",
    "particleType": "prep",
    "sense": "상대/대상",
    "transparent": true
  },
  "pv:extra#1": {
    "particle": "on",
    "particleType": "prep",
    "sense": "의존/토대",
    "transparent": true
  },
  "pv:extra#2": {
    "particle": "on",
    "particleType": "prep",
    "sense": "의존/토대",
    "transparent": true
  },
  "pv:extra#3": {
    "particle": "on",
    "particleType": "prep",
    "sense": "대상/초점",
    "transparent": true
  },
  "pv:extra#4": {
    "particle": "to",
    "particleType": "prep",
    "sense": "방향/도착",
    "transparent": true
  },
  "pv:extra#5": {
    "particle": "from",
    "particleType": "prep",
    "sense": "방지/차단",
    "transparent": true
  },
  "pv:extra#6": {
    "particle": "against",
    "particleType": "prep",
    "sense": "반대/대항",
    "transparent": true
  },
  "pv:extra#7": {
    "particle": "for",
    "particleType": "prep",
    "sense": "목표/추구",
    "transparent": true
  },
  "pv:extra#8": {
    "particle": "to",
    "particleType": "prep",
    "sense": "적용 대상",
    "transparent": true
  },
  "pv:extra#9": {
    "particle": "to",
    "particleType": "prep",
    "sense": "지시/언급",
    "transparent": true
  },
  "pv:extra#10": {
    "particle": "to",
    "particleType": "prep",
    "sense": "응답/반응 대상",
    "transparent": true
  },
  "pv:extra#11": {
    "particle": "to",
    "particleType": "prep",
    "sense": "관련",
    "transparent": true
  },
  "pv:extra#12": {
    "particle": "with",
    "particleType": "prep",
    "sense": "비교",
    "transparent": true
  },
  "pv:extra#13": {
    "particle": "to",
    "particleType": "prep",
    "sense": "비교/비유 대상",
    "transparent": true
  },
  "pv:extra#14": {
    "particle": "on",
    "particleType": "prep",
    "sense": "기반/토대",
    "transparent": true
  },
  "pv:extra#15": {
    "particle": "to",
    "particleType": "prep",
    "sense": "소속/소유",
    "transparent": true
  },
  "pv:extra#16": {
    "particle": "with",
    "particleType": "prep",
    "sense": "상대/대상",
    "transparent": true
  },
  "pv:extra#17": {
    "particle": "with",
    "particleType": "prep",
    "sense": "상대/대상",
    "transparent": true
  },
  "pv:extra#18": {
    "particle": "about",
    "particleType": "prep",
    "sense": "주제/관련",
    "transparent": true
  },
  "pv:extra#19": {
    "particle": "for",
    "particleType": "prep",
    "sense": "기다림 대상",
    "transparent": true
  },
  "pv:extra#20": {
    "particle": "to",
    "particleType": "prep",
    "sense": "대상",
    "transparent": true
  },
  "pv:extra#21": {
    "particle": "to",
    "particleType": "prep",
    "sense": "주의 대상",
    "transparent": true
  },
  "pv:extra#22": {
    "particle": "up",
    "particleType": "adverb",
    "sense": "완성/끝까지",
    "transparent": true
  },
  "pv:extra#23": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "조사/탐구",
    "transparent": true
  },
  "pv:extra#24": {
    "particle": "in",
    "particleType": "prep",
    "sense": "결과/귀결",
    "transparent": true
  },
  "pv:extra#25": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출처/기원",
    "transparent": true
  },
  "pv:extra#26": {
    "particle": "to",
    "particleType": "prep",
    "sense": "방향/지향",
    "transparent": true
  },
  "pv:extra#27": {
    "particle": "for",
    "particleType": "prep",
    "sense": "설명/차지",
    "transparent": false
  },
  "pv:extra#28": {
    "particle": "on",
    "particleType": "prep",
    "sense": "토대/근거",
    "transparent": true
  },
  "pv:extra#29": {
    "particle": "of",
    "particleType": "prep",
    "sense": "구성",
    "transparent": true
  },
  "pv:extra#30": {
    "particle": "for",
    "particleType": "prep",
    "sense": "대상/목적",
    "transparent": true
  },
  "pv:extra#31": {
    "particle": "with",
    "particleType": "prep",
    "sense": "부합/일치",
    "transparent": true
  },
  "pv:extra#32": {
    "particle": "to",
    "particleType": "prep",
    "sense": "고수/밀착",
    "transparent": true
  },
  "pv:extra#33": {
    "particle": "to",
    "particleType": "prep",
    "sense": "부합/부응",
    "transparent": true
  },
  "pv:extra#34": {
    "particle": "with",
    "particleType": "prep",
    "sense": "부합/일치",
    "transparent": true
  },
  "pv:extra#35": {
    "particle": "to",
    "particleType": "prep",
    "sense": "부합/부응",
    "transparent": true
  },
  "pv:extra#36": {
    "particle": "to",
    "particleType": "prep",
    "sense": "양보/굴복",
    "transparent": true
  },
  "pv:extra#37": {
    "particle": "to",
    "particleType": "prep",
    "sense": "의지/의탁",
    "transparent": true
  },
  "pv:extra#38": {
    "particle": "to",
    "particleType": "prep",
    "sense": "총합/합계",
    "transparent": true
  },
  "pv:extra#39": {
    "particle": "to",
    "particleType": "prep",
    "sense": "지지/신봉",
    "transparent": false
  },
  "pv:extra#40": {
    "particle": "to",
    "particleType": "prep",
    "sense": "응답/반응 대상",
    "transparent": true
  },
  "pv:extra#41": {
    "particle": "to",
    "particleType": "prep",
    "sense": "대상",
    "transparent": true
  },
  "pv:extra#42": {
    "particle": "to",
    "particleType": "prep",
    "sense": "귀인/원인",
    "transparent": true
  },
  "pv:extra#43": {
    "particle": "to",
    "particleType": "prep",
    "sense": "익숙/적응",
    "transparent": true
  },
  "pv:extra#44": {
    "particle": "to",
    "particleType": "prep",
    "sense": "지향/열망",
    "transparent": true
  },
  "pv:extra#45": {
    "particle": "to",
    "particleType": "prep",
    "sense": "전념/헌신",
    "transparent": true
  },
  "pv:extra#46": {
    "particle": "toward",
    "particleType": "prep",
    "sense": "끌림/성향",
    "transparent": true
  },
  "pv:extra#47": {
    "particle": "to",
    "particleType": "prep",
    "sense": "굴복",
    "transparent": true
  },
  "pv:extra#48": {
    "particle": "from",
    "particleType": "prep",
    "sense": "구별/차이",
    "transparent": true
  },
  "pv:extra#49": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출처/기원",
    "transparent": true
  },
  "pv:extra#50": {
    "particle": "from",
    "particleType": "prep",
    "sense": "자제/기권",
    "transparent": true
  },
  "pv:extra#51": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출처/기원",
    "transparent": true
  },
  "pv:extra#52": {
    "particle": "from",
    "particleType": "prep",
    "sense": "출처/기원",
    "transparent": true
  },
  "pv:extra#53": {
    "particle": "from",
    "particleType": "prep",
    "sense": "이탈/도피",
    "transparent": true
  },
  "pv:extra#54": {
    "particle": "from",
    "particleType": "prep",
    "sense": "제거/감소",
    "transparent": true
  },
  "pv:extra#55": {
    "particle": "from",
    "particleType": "prep",
    "sense": "분리/구별",
    "transparent": true
  },
  "pv:extra#56": {
    "particle": "from",
    "particleType": "prep",
    "sense": "면제/제외",
    "transparent": true
  },
  "pv:extra#57": {
    "particle": "with",
    "particleType": "prep",
    "sense": "상대/대상",
    "transparent": true
  },
  "pv:extra#58": {
    "particle": "with",
    "particleType": "prep",
    "sense": "씨름 대상",
    "transparent": true
  },
  "pv:extra#59": {
    "particle": "with",
    "particleType": "prep",
    "sense": "상대/대상",
    "transparent": true
  },
  "pv:extra#60": {
    "particle": "with",
    "particleType": "prep",
    "sense": "상대/대상",
    "transparent": true
  },
  "pv:extra#61": {
    "particle": "with",
    "particleType": "prep",
    "sense": "상호작용 대상",
    "transparent": true
  },
  "pv:extra#62": {
    "particle": "with",
    "particleType": "prep",
    "sense": "조화/대조",
    "transparent": true
  },
  "pv:extra#63": {
    "particle": "with",
    "particleType": "prep",
    "sense": "상대/대상",
    "transparent": true
  },
  "pv:extra#64": {
    "particle": "with",
    "particleType": "prep",
    "sense": "함부로 손댐",
    "transparent": true
  },
  "pv:extra#65": {
    "particle": "in",
    "particleType": "prep",
    "sense": "분야/영역",
    "transparent": true
  },
  "pv:extra#66": {
    "particle": "at",
    "particleType": "prep",
    "sense": "분야/영역",
    "transparent": true
  },
  "pv:extra#67": {
    "particle": "in",
    "particleType": "prep",
    "sense": "참여/합류",
    "transparent": true
  },
  "pv:extra#68": {
    "particle": "in",
    "particleType": "prep",
    "sense": "개입/끼어듦",
    "transparent": true
  },
  "pv:extra#69": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "고려에 넣음",
    "transparent": true
  },
  "pv:extra#70": {
    "particle": "on",
    "particleType": "prep",
    "sense": "결정/선택",
    "transparent": true
  },
  "pv:extra#71": {
    "particle": "on",
    "particleType": "prep",
    "sense": "토대/근거",
    "transparent": true
  },
  "pv:extra#72": {
    "particle": "on",
    "particleType": "prep",
    "sense": "대상/관련",
    "transparent": true
  },
  "pv:extra#73": {
    "particle": "on",
    "particleType": "prep",
    "sense": "대상/초점",
    "transparent": true
  },
  "pv:extra#74": {
    "particle": "on",
    "particleType": "prep",
    "sense": "탑승",
    "transparent": true
  },
  "pv:extra#75": {
    "particle": "on",
    "particleType": "prep",
    "sense": "토대/근거",
    "transparent": true
  },
  "pv:extra#76": {
    "particle": "on",
    "particleType": "prep",
    "sense": "대상/관련",
    "transparent": true
  },
  "pv:extra#77": {
    "particle": "on",
    "particleType": "prep",
    "sense": "대상/관련",
    "transparent": true
  },
  "pv:extra#78": {
    "particle": "on",
    "particleType": "prep",
    "sense": "좌우/축",
    "transparent": true
  },
  "pv:extra#79": {
    "particle": "in",
    "particleType": "adverb",
    "sense": "참여/의견 보탬",
    "transparent": false
  },
  "pv:extra#80": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "깊이 파고듦",
    "transparent": true
  },
  "pv:extra#81": {
    "particle": "into",
    "particleType": "adverb",
    "sense": "활용/끌어다 씀",
    "transparent": true
  },
  "pv:extra#82": {
    "particle": "for",
    "particleType": "prep",
    "sense": "보완/상쇄",
    "transparent": true
  },
  "pv:extra#83": {
    "particle": "for",
    "particleType": "prep",
    "sense": "지지/옹호",
    "transparent": true
  },
  "pv:extra#84": {
    "particle": "for",
    "particleType": "prep",
    "sense": "선택",
    "transparent": true
  },
  "pv:extra#85": {
    "particle": "for",
    "particleType": "prep",
    "sense": "감안/여지",
    "transparent": false
  },
  "pv:extra#86": {
    "particle": "for",
    "particleType": "prep",
    "sense": "보증",
    "transparent": true
  },
  "pv:extra#87": {
    "particle": "for",
    "particleType": "prep",
    "sense": "대비/목적",
    "transparent": true
  },
  "pv:extra#88": {
    "particle": "for",
    "particleType": "prep",
    "sense": "대체/교환",
    "transparent": true
  },
  "pv:extra#89": {
    "particle": "for",
    "particleType": "prep",
    "sense": "요청/요구",
    "transparent": true
  },
  "pv:extra#90": {
    "particle": "to",
    "particleType": "prep",
    "sense": "보고/지휘 대상",
    "transparent": true
  },
  "pv:extra#91": {
    "particle": "to",
    "particleType": "prep",
    "sense": "위임/이관 대상",
    "transparent": true
  },
  "pv:extra#92": {
    "particle": "to",
    "particleType": "prep",
    "sense": "위임/이관 대상",
    "transparent": true
  },
  "pv:extra#93": {
    "particle": "with",
    "particleType": "prep",
    "sense": "상관/동시",
    "transparent": true
  },
  "pv:extra#94": {
    "particle": "with",
    "particleType": "prep",
    "sense": "상관/동시",
    "transparent": true
  },
  "pv:extra#95": {
    "particle": "to",
    "particleType": "prep",
    "sense": "일치/해당",
    "transparent": true
  },
  "pv:extra#96": {
    "particle": "with",
    "particleType": "prep",
    "sense": "동일시",
    "transparent": true
  },
  "pv:extra#97": {
    "particle": "away",
    "particleType": "adverb",
    "sense": "회피/멀어짐",
    "transparent": true
  },
  "pv:extra#98": {
    "particle": "from",
    "particleType": "prep",
    "sense": "분리/제거",
    "transparent": true
  },
  "pv:extra#99": {
    "particle": "by",
    "particleType": "prep",
    "sense": "기준/근거",
    "transparent": true
  },
  "pv:extra#100": {
    "particle": "to",
    "particleType": "prep",
    "sense": "귀인/원인",
    "transparent": true
  },
  "pv:extra#101": {
    "particle": "to",
    "particleType": "prep",
    "sense": "입증 대상",
    "transparent": true
  },
  "pv:extra#102": {
    "particle": "to",
    "particleType": "prep",
    "sense": "지시/언급",
    "transparent": true
  },
  "pv:extra#103": {
    "particle": "to",
    "particleType": "prep",
    "sense": "관련",
    "transparent": true
  },
  "pv:extra#104": {
    "particle": "from",
    "particleType": "prep",
    "sense": "자제/기권",
    "transparent": true
  },
  "pv:extra#105": {
    "particle": "from",
    "particleType": "prep",
    "sense": "방지/차단",
    "transparent": true
  },
  "pv:extra#106": {
    "particle": "with",
    "particleType": "prep",
    "sense": "상호작용 대상",
    "transparent": true
  },
  "pv:extra#107": {
    "particle": "with",
    "particleType": "prep",
    "sense": "분리/제거",
    "transparent": false
  },
  "pv:extra#108": {
    "particle": "in",
    "particleType": "prep",
    "sense": "정점/귀결",
    "transparent": true
  },
  "pv:extra#109": {
    "particle": "on",
    "particleType": "prep",
    "sense": "전제/토대",
    "transparent": true
  }
};

// adverb particle -> cardKeys sharing that particle (the 'feel' families, biggest first).
// Use for the sibling hook ("UP family: wrap up, use up, fill up...") and the particle drill.
export const PARTICLE_FAMILIES: Record<string, string[]> = {
  "out": [
    "pv:be#6",
    "pv:have#26",
    "pv:make#13",
    "pv:make#21",
    "pv:get#3",
    "pv:get#4",
    "pv:go#0",
    "pv:go#22",
    "pv:go#28",
    "pv:come#1",
    "pv:come#11",
    "pv:come#22",
    "pv:take#0",
    "pv:take#26",
    "pv:give#8",
    "pv:put#8",
    "pv:set#1",
    "pv:set#10",
    "pv:keep#7",
    "pv:let#1",
    "pv:leave#0",
    "pv:leave#3",
    "pv:leave#14",
    "pv:bring#4",
    "pv:turn#4",
    "pv:turn#5",
    "pv:run#1",
    "pv:work#4",
    "pv:work#5",
    "pv:work#14",
    "pv:work#16",
    "pv:look#4",
    "pv:look#16",
    "pv:move#5",
    "pv:move#13",
    "pv:hold#5",
    "pv:hold#6",
    "pv:carry#0",
    "pv:pull#0",
    "pv:pull#14",
    "pv:push#3",
    "pv:pick#1",
    "pv:drop#3",
    "pv:drop#4",
    "pv:pass#2",
    "pv:hand#2",
    "pv:fill#1",
    "pv:clear#1",
    "pv:clean#1",
    "pv:clean#7",
    "pv:cut#2",
    "pv:cut#13",
    "pv:break#6",
    "pv:break#7",
    "pv:build#4",
    "pv:open#13",
    "pv:close#4",
    "pv:start#8",
    "pv:start#9",
    "pv:say#4",
    "pv:ask#6",
    "pv:talk#8",
    "pv:call#2",
    "pv:call#3",
    "pv:check#2",
    "pv:check#12",
    "pv:find#0",
    "pv:find#1",
    "pv:show#7",
    "pv:try#3",
    "pv:try#7",
    "pv:try#13",
    "pv:help#0",
    "pv:help#1",
    "pv:help#9",
    "pv:want#7",
    "pv:want#12",
    "pv:change#3",
    "pv:feel#7",
    "pv:feel#12",
    "pv:feel#13",
    "pv:send#2",
    "pv:send#15",
    "pv:pay#5",
    "pv:miss#2",
    "pv:miss#3",
    "pv:stand#1",
    "pv:fall#12",
    "pv:fall#23",
    "pv:watch#1",
    "pv:watch#2",
    "pv:back#4",
    "pv:back#5",
    "pv:write#8",
    "pv:read#6",
    "pv:read#14",
    "pv:hear#8",
    "pv:see#10",
    "pv:live#13",
    "pv:grow#5",
    "pv:sign#4",
    "pv:sign#6",
    "pv:walk#5",
    "pv:walk#10",
    "pv:throw#2",
    "pv:draw#6",
    "pv:point#0",
    "pv:point#1",
    "pv:point#10",
    "pv:settle#7",
    "pv:count#4",
    "pv:count#14",
    "pv:plan#8",
    "pv:figure#0",
    "pv:figure#2",
    "pv:sort#1",
    "pv:sort#9",
    "pv:sort#12",
    "pv:sort#13",
    "pv:step#4",
    "pv:step#17",
    "pv:step#18",
    "pv:lay#1",
    "pv:roll#0",
    "pv:roll#15",
    "pv:kick#2",
    "pv:reach#0",
    "pv:reach#1",
    "pv:reach#6",
    "pv:deal#7",
    "pv:deal#16",
    "pv:deal#18",
    "pv:shut#3",
    "pv:play#4",
    "pv:hang#1",
    "pv:weigh#4",
    "pv:scale#9"
  ],
  "up": [
    "pv:be#7",
    "pv:be#24",
    "pv:be#30",
    "pv:have#23",
    "pv:do#14",
    "pv:make#5",
    "pv:make#12",
    "pv:make#24",
    "pv:get#0",
    "pv:get#33",
    "pv:go#11",
    "pv:go#29",
    "pv:come#2",
    "pv:come#3",
    "pv:come#21",
    "pv:come#24",
    "pv:take#16",
    "pv:take#24",
    "pv:take#25",
    "pv:give#0",
    "pv:give#5",
    "pv:put#2",
    "pv:put#9",
    "pv:set#0",
    "pv:set#6",
    "pv:set#11",
    "pv:keep#0",
    "pv:keep#1",
    "pv:keep#21",
    "pv:let#5",
    "pv:leave#10",
    "pv:bring#0",
    "pv:bring#13",
    "pv:bring#14",
    "pv:turn#2",
    "pv:run#12",
    "pv:run#18",
    "pv:work#13",
    "pv:work#17",
    "pv:look#3",
    "pv:look#12",
    "pv:use#7",
    "pv:move#7",
    "pv:move#19",
    "pv:hold#1",
    "pv:hold#17",
    "pv:pull#2",
    "pv:push#4",
    "pv:pick#0",
    "pv:pick#5",
    "pv:pick#9",
    "pv:pick#12",
    "pv:pass#10",
    "pv:fill#2",
    "pv:clear#0",
    "pv:clear#6",
    "pv:clear#8",
    "pv:clean#0",
    "pv:clean#4",
    "pv:clean#8",
    "pv:cut#7",
    "pv:break#2",
    "pv:break#3",
    "pv:fix#1",
    "pv:build#0",
    "pv:build#11",
    "pv:open#0",
    "pv:open#5",
    "pv:open#6",
    "pv:close#3",
    "pv:start#5",
    "pv:stop#11",
    "pv:talk#10",
    "pv:call#7",
    "pv:check#9",
    "pv:think#4",
    "pv:show#0",
    "pv:show#4",
    "pv:manage#11",
    "pv:change#8",
    "pv:feel#6",
    "pv:feel#21",
    "pv:send#11",
    "pv:pay#6",
    "pv:follow#1",
    "pv:follow#2",
    "pv:follow#3",
    "pv:follow#17",
    "pv:end#0",
    "pv:end#1",
    "pv:end#2",
    "pv:end#3",
    "pv:end#21",
    "pv:stand#0",
    "pv:stand#5",
    "pv:stand#6",
    "pv:catch#0",
    "pv:catch#1",
    "pv:catch#2",
    "pv:catch#6",
    "pv:catch#11",
    "pv:catch#12",
    "pv:back#0",
    "pv:back#1",
    "pv:write#2",
    "pv:read#2",
    "pv:live#3",
    "pv:live#14",
    "pv:grow#0",
    "pv:sign#0",
    "pv:sign#1",
    "pv:walk#8",
    "pv:throw#3",
    "pv:draw#1",
    "pv:settle#6",
    "pv:count#7",
    "pv:step#0",
    "pv:step#10",
    "pv:step#11",
    "pv:lay#11",
    "pv:roll#3",
    "pv:kick#10",
    "pv:kick#11",
    "pv:wrap#0",
    "pv:wrap#5",
    "pv:wrap#6",
    "pv:reach#11",
    "pv:shut#2",
    "pv:play#3",
    "pv:hang#0",
    "pv:hang#8",
    "pv:hang#12",
    "pv:scale#0",
    "pv:extra#22"
  ],
  "in": [
    "pv:get#1",
    "pv:get#18",
    "pv:get#41",
    "pv:go#1",
    "pv:come#0",
    "pv:take#15",
    "pv:give#7",
    "pv:give#16",
    "pv:put#10",
    "pv:put#23",
    "pv:set#18",
    "pv:let#0",
    "pv:let#9",
    "pv:bring#1",
    "pv:turn#8",
    "pv:look#20",
    "pv:move#4",
    "pv:pull#4",
    "pv:push#12",
    "pv:drop#2",
    "pv:drop#14",
    "pv:hand#1",
    "pv:hand#8",
    "pv:fill#0",
    "pv:fill#4",
    "pv:fill#5",
    "pv:fill#8",
    "pv:cut#4",
    "pv:cut#15",
    "pv:break#4",
    "pv:close#2",
    "pv:stop#5",
    "pv:ask#7",
    "pv:call#4",
    "pv:call#5",
    "pv:check#0",
    "pv:check#1",
    "pv:check#15",
    "pv:show#6",
    "pv:want#6",
    "pv:want#11",
    "pv:send#5",
    "pv:stand#7",
    "pv:fall#1",
    "pv:write#12",
    "pv:write#16",
    "pv:read#17",
    "pv:sign#2",
    "pv:sign#3",
    "pv:walk#11",
    "pv:throw#6",
    "pv:throw#14",
    "pv:throw#18",
    "pv:draw#20",
    "pv:settle#1",
    "pv:settle#14",
    "pv:count#3",
    "pv:figure#5",
    "pv:step#2",
    "pv:step#8",
    "pv:step#22",
    "pv:roll#4",
    "pv:kick#1",
    "pv:deal#17",
    "pv:shut#6",
    "pv:shut#10",
    "pv:hang#6",
    "pv:weigh#1",
    "pv:weigh#2",
    "pv:weigh#7",
    "pv:weigh#8",
    "pv:extra#69",
    "pv:extra#79"
  ],
  "back": [
    "pv:get#11",
    "pv:get#12",
    "pv:get#36",
    "pv:get#38",
    "pv:go#6",
    "pv:go#7",
    "pv:go#25",
    "pv:go#32",
    "pv:come#4",
    "pv:take#18",
    "pv:give#10",
    "pv:give#19",
    "pv:put#4",
    "pv:set#4",
    "pv:keep#9",
    "pv:bring#2",
    "pv:turn#13",
    "pv:look#10",
    "pv:move#11",
    "pv:hold#3",
    "pv:hold#15",
    "pv:carry#10",
    "pv:pull#8",
    "pv:pull#15",
    "pv:push#0",
    "pv:push#1",
    "pv:drop#8",
    "pv:hand#4",
    "pv:cut#3",
    "pv:start#16",
    "pv:talk#9",
    "pv:call#0",
    "pv:check#14",
    "pv:think#6",
    "pv:want#4",
    "pv:change#7",
    "pv:send#4",
    "pv:pay#3",
    "pv:follow#13",
    "pv:stand#8",
    "pv:fall#6",
    "pv:fall#13",
    "pv:back#8",
    "pv:back#9",
    "pv:back#15",
    "pv:back#16",
    "pv:back#17",
    "pv:back#18",
    "pv:back#19",
    "pv:back#20",
    "pv:write#7",
    "pv:read#8",
    "pv:hear#4",
    "pv:grow#8",
    "pv:walk#6",
    "pv:draw#9",
    "pv:settle#13",
    "pv:step#3",
    "pv:roll#1",
    "pv:kick#4",
    "pv:reach#5",
    "pv:play#7",
    "pv:hang#13",
    "pv:scale#3",
    "pv:scale#6"
  ],
  "off": [
    "pv:be#27",
    "pv:make#26",
    "pv:get#6",
    "pv:go#18",
    "pv:come#17",
    "pv:take#2",
    "pv:take#8",
    "pv:give#11",
    "pv:put#1",
    "pv:set#2",
    "pv:keep#11",
    "pv:let#6",
    "pv:let#13",
    "pv:leave#5",
    "pv:turn#1",
    "pv:work#12",
    "pv:hold#2",
    "pv:hold#14",
    "pv:carry#11",
    "pv:pull#5",
    "pv:drop#0",
    "pv:pass#13",
    "pv:hand#6",
    "pv:hand#9",
    "pv:clear#3",
    "pv:clean#2",
    "pv:cut#0",
    "pv:cut#9",
    "pv:break#8",
    "pv:close#1",
    "pv:start#6",
    "pv:start#7",
    "pv:start#15",
    "pv:stop#6",
    "pv:tell#8",
    "pv:tell#14",
    "pv:call#1",
    "pv:check#8",
    "pv:show#1",
    "pv:send#6",
    "pv:pay#2",
    "pv:pay#20",
    "pv:seem#12",
    "pv:fall#10",
    "pv:catch#9",
    "pv:back#2",
    "pv:write#6",
    "pv:write#10",
    "pv:read#7",
    "pv:see#9",
    "pv:live#6",
    "pv:sign#7",
    "pv:sign#8",
    "pv:walk#12",
    "pv:walk#15",
    "pv:throw#7",
    "pv:count#15",
    "pv:lay#0",
    "pv:roll#14",
    "pv:kick#0",
    "pv:shut#1",
    "pv:shut#8",
    "pv:play#23"
  ],
  "down": [
    "pv:be#25",
    "pv:get#31",
    "pv:go#12",
    "pv:come#10",
    "pv:come#15",
    "pv:come#23",
    "pv:take#17",
    "pv:put#3",
    "pv:set#16",
    "pv:keep#10",
    "pv:let#2",
    "pv:bring#7",
    "pv:turn#3",
    "pv:run#11",
    "pv:look#11",
    "pv:move#8",
    "pv:hold#4",
    "pv:pull#3",
    "pv:push#5",
    "pv:drop#10",
    "pv:pass#8",
    "pv:hand#5",
    "pv:cut#1",
    "pv:break#0",
    "pv:break#1",
    "pv:break#15",
    "pv:close#0",
    "pv:talk#6",
    "pv:talk#14",
    "pv:send#17",
    "pv:spend#12",
    "pv:pay#4",
    "pv:stand#9",
    "pv:fall#14",
    "pv:back#3",
    "pv:write#0",
    "pv:live#12",
    "pv:throw#20",
    "pv:draw#10",
    "pv:settle#0",
    "pv:settle#9",
    "pv:count#8",
    "pv:count#12",
    "pv:step#1",
    "pv:lay#2",
    "pv:lay#3",
    "pv:roll#12",
    "pv:kick#8",
    "pv:shut#0",
    "pv:shut#4",
    "pv:play#2",
    "pv:hang#18",
    "pv:weigh#5",
    "pv:scale#2"
  ],
  "through": [
    "pv:make#17",
    "pv:get#8",
    "pv:get#35",
    "pv:go#5",
    "pv:go#23",
    "pv:come#8",
    "pv:put#14",
    "pv:let#8",
    "pv:run#2",
    "pv:work#9",
    "pv:work#15",
    "pv:look#8",
    "pv:move#15",
    "pv:carry#12",
    "pv:pull#6",
    "pv:push#2",
    "pv:pick#10",
    "pv:pass#6",
    "pv:clear#10",
    "pv:cut#5",
    "pv:break#9",
    "pv:talk#4",
    "pv:talk#5",
    "pv:check#7",
    "pv:think#3",
    "pv:show#14",
    "pv:help#7",
    "pv:handle#8",
    "pv:manage#5",
    "pv:send#7",
    "pv:pay#17",
    "pv:follow#4",
    "pv:follow#5",
    "pv:follow#6",
    "pv:fall#3",
    "pv:fall#16",
    "pv:read#3",
    "pv:hear#15",
    "pv:see#7",
    "pv:see#8",
    "pv:live#7",
    "pv:walk#0",
    "pv:walk#1",
    "pv:step#7"
  ],
  "over": [
    "pv:be#28",
    "pv:have#13",
    "pv:do#9",
    "pv:get#7",
    "pv:get#32",
    "pv:go#4",
    "pv:come#5",
    "pv:take#3",
    "pv:take#27",
    "pv:bring#5",
    "pv:turn#10",
    "pv:turn#16",
    "pv:run#6",
    "pv:look#7",
    "pv:move#6",
    "pv:hold#16",
    "pv:carry#3",
    "pv:pull#1",
    "pv:push#14",
    "pv:pass#7",
    "pv:hand#3",
    "pv:hand#7",
    "pv:cut#12",
    "pv:build#10",
    "pv:start#0",
    "pv:stop#7",
    "pv:ask#8",
    "pv:talk#3",
    "pv:call#10",
    "pv:check#6",
    "pv:think#2",
    "pv:change#6",
    "pv:send#3",
    "pv:spend#9",
    "pv:fall#15",
    "pv:read#4",
    "pv:sign#13",
    "pv:walk#14",
    "pv:step#20",
    "pv:lay#5",
    "pv:roll#2",
    "pv:hang#10",
    "pv:hang#14"
  ],
  "into": [
    "pv:get#2",
    "pv:go#2",
    "pv:let#7",
    "pv:bring#10",
    "pv:turn#6",
    "pv:run#0",
    "pv:work#19",
    "pv:look#2",
    "pv:move#12",
    "pv:carry#6",
    "pv:pull#12",
    "pv:push#9",
    "pv:drop#11",
    "pv:cut#6",
    "pv:break#5",
    "pv:break#12",
    "pv:build#2",
    "pv:build#8",
    "pv:talk#7",
    "pv:call#12",
    "pv:check#10",
    "pv:show#11",
    "pv:help#10",
    "pv:change#0",
    "pv:pay#7",
    "pv:fall#11",
    "pv:fall#17",
    "pv:read#5",
    "pv:grow#3",
    "pv:walk#7",
    "pv:throw#10",
    "pv:throw#15",
    "pv:settle#4",
    "pv:step#9",
    "pv:lay#10",
    "pv:roll#11",
    "pv:kick#12",
    "pv:reach#7",
    "pv:play#15",
    "pv:play#20",
    "pv:extra#23",
    "pv:extra#80",
    "pv:extra#81"
  ],
  "away": [
    "pv:do#10",
    "pv:get#23",
    "pv:get#24",
    "pv:go#9",
    "pv:take#4",
    "pv:give#9",
    "pv:put#5",
    "pv:keep#8",
    "pv:turn#12",
    "pv:run#4",
    "pv:look#15",
    "pv:move#10",
    "pv:carry#5",
    "pv:carry#8",
    "pv:pull#7",
    "pv:push#6",
    "pv:drop#9",
    "pv:pass#3",
    "pv:clear#2",
    "pv:clean#3",
    "pv:cut#11",
    "pv:break#10",
    "pv:ask#11",
    "pv:explain#7",
    "pv:send#10",
    "pv:send#14",
    "pv:back#11",
    "pv:sign#14",
    "pv:walk#2",
    "pv:walk#3",
    "pv:walk#13",
    "pv:throw#1",
    "pv:draw#18",
    "pv:step#6",
    "pv:shut#7",
    "pv:extra#97"
  ],
  "on": [
    "pv:have#14",
    "pv:have#18",
    "pv:get#5",
    "pv:get#30",
    "pv:get#37",
    "pv:go#3",
    "pv:go#31",
    "pv:take#1",
    "pv:put#0",
    "pv:keep#6",
    "pv:let#12",
    "pv:turn#0",
    "pv:move#0",
    "pv:move#1",
    "pv:hold#0",
    "pv:carry#1",
    "pv:carry#2",
    "pv:carry#9",
    "pv:pass#1",
    "pv:pass#11",
    "pv:try#2",
    "pv:send#13",
    "pv:end#23",
    "pv:catch#7",
    "pv:catch#8",
    "pv:read#15",
    "pv:sign#9",
    "pv:sign#10",
    "pv:throw#13",
    "pv:step#12",
    "pv:step#21",
    "pv:lay#16",
    "pv:hang#2",
    "pv:hang#9"
  ],
  "around": [
    "pv:get#20",
    "pv:get#21",
    "pv:go#14",
    "pv:come#14",
    "pv:bring#15",
    "pv:turn#9",
    "pv:turn#17",
    "pv:run#9",
    "pv:work#6",
    "pv:look#14",
    "pv:move#9",
    "pv:carry#4",
    "pv:pass#4",
    "pv:hand#10",
    "pv:build#7",
    "pv:ask#5",
    "pv:ask#10",
    "pv:talk#11",
    "pv:call#9",
    "pv:find#12",
    "pv:know#15",
    "pv:show#5",
    "pv:send#8",
    "pv:follow#14",
    "pv:stand#10",
    "pv:throw#17",
    "pv:throw#22",
    "pv:kick#3",
    "pv:wrap#1",
    "pv:wrap#3",
    "pv:wrap#4",
    "pv:wrap#7",
    "pv:play#5",
    "pv:hang#5"
  ],
  "along": [
    "pv:get#10",
    "pv:go#21",
    "pv:come#13",
    "pv:bring#6",
    "pv:pass#9",
    "pv:pass#12",
    "pv:help#11",
    "pv:follow#7",
    "pv:follow#8",
    "pv:read#18",
    "pv:play#6"
  ],
  "ahead": [
    "pv:get#25",
    "pv:go#8",
    "pv:go#24",
    "pv:look#18",
    "pv:move#18",
    "pv:pull#16",
    "pv:push#7",
    "pv:call#15",
    "pv:think#5",
    "pv:plan#3",
    "pv:step#19"
  ],
  "forward": [
    "pv:put#11",
    "pv:bring#12",
    "pv:look#5",
    "pv:move#2",
    "pv:move#3",
    "pv:carry#13",
    "pv:push#11",
    "pv:pay#15",
    "pv:step#15",
    "pv:roll#13"
  ],
  "together": [
    "pv:get#19",
    "pv:put#6",
    "pv:bring#8",
    "pv:hold#10",
    "pv:pull#10",
    "pv:live#1",
    "pv:throw#8",
    "pv:draw#19",
    "pv:hang#17"
  ],
  "apart": [
    "pv:take#20",
    "pv:set#19",
    "pv:pull#9",
    "pv:pick#3",
    "pv:break#11",
    "pv:tell#6",
    "pv:fall#2",
    "pv:live#11",
    "pv:grow#7"
  ],
  "behind": [
    "pv:be#22",
    "pv:get#26",
    "pv:get#27",
    "pv:put#15",
    "pv:leave#1",
    "pv:fall#4",
    "pv:fall#5"
  ],
  "across": [
    "pv:get#22",
    "pv:come#7",
    "pv:put#22",
    "pv:run#10",
    "pv:cut#10",
    "pv:reach#13"
  ],
  "aside": [
    "pv:put#12",
    "pv:set#3",
    "pv:leave#11",
    "pv:pull#13",
    "pv:step#5",
    "pv:lay#12"
  ],
  "by": [
    "pv:get#9",
    "pv:go#15",
    "pv:pass#5",
    "pv:stop#0",
    "pv:stand#4"
  ],
  "under": [
    "pv:work#11",
    "pv:handle#6",
    "pv:manage#9",
    "pv:fall#9"
  ],
  "about": [
    "pv:come#18",
    "pv:bring#9"
  ],
  "past": [
    "pv:talk#15"
  ],
  "inside out": [
    "pv:know#11"
  ]
};

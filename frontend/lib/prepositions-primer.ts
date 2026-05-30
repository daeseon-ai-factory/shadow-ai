// Curated core-preposition primer for the study page. Image-based (the spatial/relational
// picture), not dictionary glosses — the goal is intuition. Korean for a Korean learner.
// `key` is the normalized form used to join against the user's mined preposition notes.

export interface PrimerExample {
  en: string;
  ko: string;
}

export interface PrimerPreposition {
  key: string; // lowercase match key
  prep: string; // display form
  image: string; // the core spatial/relational picture (Korean)
  sense: string; // short gloss
  examples: PrimerExample[];
}

export const PREPOSITION_PRIMER: PrimerPreposition[] = [
  {
    key: "in",
    prep: "in",
    image: "둘러싸인 공간·영역의 '안'. 3차원 안쪽.",
    sense: "~안에 / (시간) ~후에·~동안",
    examples: [
      { en: "in the room", ko: "방 안에" },
      { en: "in two hours", ko: "두 시간 후에" },
    ],
  },
  {
    key: "on",
    prep: "on",
    image: "표면에 '접촉'해 붙어 있음. 면 위.",
    sense: "~위에·접하여 / (요일) ~에",
    examples: [
      { en: "on the table", ko: "테이블 위에" },
      { en: "on Monday", ko: "월요일에" },
    ],
  },
  {
    key: "at",
    prep: "at",
    image: "콕 집은 '한 점'. 위치/시각의 정확한 지점.",
    sense: "~의 (한) 지점에 / (시각) ~에",
    examples: [
      { en: "at the door", ko: "문 앞(그 지점)에" },
      { en: "at 3 p.m.", ko: "3시 정각에" },
    ],
  },
  {
    key: "to",
    prep: "to",
    image: "'목적지'를 향해 가서 도달. 방향 + 닿음.",
    sense: "~로·~에게 (도달)",
    examples: [
      { en: "go to work", ko: "직장으로 가다" },
      { en: "give it to me", ko: "그걸 나에게 줘" },
    ],
  },
  {
    key: "into",
    prep: "into",
    image: "밖에서 '안으로' 들어감. 종종 형태가 '바뀜'까지.",
    sense: "~안으로 / ~로 (변하여)",
    examples: [
      { en: "walk into the room", ko: "방 안으로 걸어 들어가다" },
      { en: "refactor it into modules", ko: "그것을 모듈로 (바꿔) 나누다" },
    ],
  },
  {
    key: "through",
    prep: "through",
    image: "내부를 '관통'해 한쪽에서 반대쪽으로 지나감.",
    sense: "~을 통과하여 / 처음부터 끝까지",
    examples: [
      { en: "walk through the door", ko: "문을 통과해 걸어가다" },
      { en: "go through the code", ko: "코드를 처음부터 끝까지 훑다" },
    ],
  },
  {
    key: "over",
    prep: "over",
    image: "'위를 덮거나 넘어'감 (보통 접촉 없이). 아치 모양.",
    sense: "~위로·너머 / ~하는 동안",
    examples: [
      { en: "jump over the wall", ko: "벽을 (뛰어)넘다" },
      { en: "talk over coffee", ko: "커피 마시며 이야기하다" },
    ],
  },
  {
    key: "off",
    prep: "off",
    image: "표면에서 '떨어져 나옴'. 분리·이탈.",
    sense: "~에서 떨어져 / ~을 기반으로 (먹고살다)",
    examples: [
      { en: "take it off the table", ko: "테이블에서 그것을 떼어내다" },
      { en: "live off savings", ko: "저축으로 먹고살다" },
    ],
  },
  {
    key: "up",
    prep: "up",
    image: "'위로' 이동 / 증가 / '완전히' 끝냄.",
    sense: "위로 / 끝까지·완전히",
    examples: [
      { en: "spin up a server", ko: "서버를 (없던 걸) 띄우다" },
      { en: "eat it up", ko: "그것을 다 먹어 치우다" },
    ],
  },
  {
    key: "down",
    prep: "down",
    image: "'아래로' 이동 / 감소 / 기록으로 '고정'.",
    sense: "아래로 / 적어 두다",
    examples: [
      { en: "write it down", ko: "그것을 적어 두다" },
      { en: "calm down", ko: "(흥분을) 가라앉히다" },
    ],
  },
  {
    key: "out of",
    prep: "out of",
    image: "'안에서 밖으로' 빠져나옴. 기원·재료에도.",
    sense: "~밖으로 / ~에서 (만들어진)",
    examples: [
      { en: "get out of the car", ko: "차에서 (밖으로) 내리다" },
      { en: "made out of wood", ko: "나무로 만들어진" },
    ],
  },
  {
    key: "for",
    prep: "for",
    image: "'대상·목적·교환·기간'을 향함. ~을 위해 뻗는 화살.",
    sense: "~을 위해·~동안·~에 대해",
    examples: [
      { en: "a gift for you", ko: "너를 위한 선물" },
      { en: "for three days", ko: "사흘 동안" },
    ],
  },
  {
    key: "with",
    prep: "with",
    image: "'동반·수단'. 함께 있거나, 도구로 '가지고'.",
    sense: "~와 함께 / ~로 (가지고)",
    examples: [
      { en: "come with me", ko: "나와 함께 와" },
      { en: "cut it with a knife", ko: "칼로 그것을 자르다" },
    ],
  },
  {
    key: "from",
    prep: "from",
    image: "'출발점·기원'에서 떨어져 나옴.",
    sense: "~로부터·~에서",
    examples: [
      { en: "from Seoul", ko: "서울로부터" },
      { en: "learn from mistakes", ko: "실수로부터 배우다" },
    ],
  },
  {
    key: "by",
    prep: "by",
    image: "'바로 옆' / 수단·행위자 / 기한.",
    sense: "~에 의해·~옆에·~까지(기한)",
    examples: [
      { en: "by car", ko: "차로 (수단)" },
      { en: "done by Friday", ko: "금요일까지 끝낸" },
    ],
  },
  {
    key: "about",
    prep: "about",
    image: "어떤 주제의 '주위'를 맴돎. ~에 관하여.",
    sense: "~에 관하여 / 대략",
    examples: [
      { en: "talk about it", ko: "그것에 관해 이야기하다" },
      { en: "about ten people", ko: "대략 열 명" },
    ],
  },
];

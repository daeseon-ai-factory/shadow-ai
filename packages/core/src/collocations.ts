// Curated preposition-COLLOCATION chunks for daily drilling. The premise (see the
// Collocations page): a preposition inside a collocation is not chosen by logic — you learn
// the whole "word + preposition" as ONE fixed chunk and produce it automatically. So each
// entry is an anchor chunk (e.g. "depend on", "good at", "deploy to") + a short gloss, tagged
// general | dev, with example items pairing a Korean cue (English word order, " · "-chunked)
// to one idiomatic English model. Authored one-agent-per-preposition in parallel, then each
// item strictly audited for accuracy (correct preposition, idiomatic model, faithful cue).

export type CollocationDomain = "general" | "dev";

export interface CollocationItem {
  cue: string; // Korean meaning, English word order, chunked with " · "
  model: string; // one idiomatic English model using the anchor
}

export interface Collocation {
  id: string;
  prep: string; // the preposition this group hangs on
  anchor: string; // the chunk to memorize as one unit (incl. the preposition)
  gloss: string; // short English meaning
  domain: CollocationDomain;
  items: CollocationItem[];
}

export const COLLOCATION_DOMAINS = ["general", "dev"] as const;

export const COLLOCATIONS: Collocation[] = [
  {
    "id": "with-agree-with",
    "prep": "with",
    "anchor": "agree with",
    "gloss": "have the same opinion as",
    "domain": "general",
    "items": [
      {
        "model": "I agree with you on that.",
        "cue": "나는 동의해 · 너에게 · 그 점에서"
      },
      {
        "model": "Nobody agreed with his plan.",
        "cue": "아무도 동의하지 않았어 · 그의 계획에"
      }
    ]
  },
  {
    "id": "with-be-satisfied-with",
    "prep": "with",
    "anchor": "be satisfied with",
    "gloss": "be content / happy with",
    "domain": "general",
    "items": [
      {
        "model": "I'm satisfied with the result.",
        "cue": "나는 만족해 · 그 결과에"
      },
      {
        "model": "Customers are satisfied with the service.",
        "cue": "고객들은 만족해 · 그 서비스에"
      }
    ]
  },
  {
    "id": "with-cope-with",
    "prep": "with",
    "anchor": "cope with",
    "gloss": "manage / endure (something hard)",
    "domain": "general",
    "items": [
      {
        "model": "He's coping with the stress well.",
        "cue": "그는 잘 견디고 있어 · 그 스트레스를"
      },
      {
        "model": "How do you cope with the pressure?",
        "cue": "너는 어떻게 견뎌 · 그 압박을?"
      }
    ]
  },
  {
    "id": "with-deal-with",
    "prep": "with",
    "anchor": "deal with",
    "gloss": "handle / take care of",
    "domain": "general",
    "items": [
      {
        "model": "I'll deal with it tomorrow.",
        "cue": "내가 처리할게 · 그걸 · 내일"
      },
      {
        "model": "She dealt with the complaint calmly.",
        "cue": "그녀가 처리했어 · 그 불만을 · 차분하게"
      }
    ]
  },
  {
    "id": "with-help-with",
    "prep": "with",
    "anchor": "help with",
    "gloss": "give assistance on",
    "domain": "general",
    "items": [
      {
        "model": "Can you help with the dishes?",
        "cue": "도와줄 수 있어 · 설거지를"
      },
      {
        "model": "She helped me with my homework.",
        "cue": "그녀가 도와줬어 · 나를 · 내 숙제를"
      }
    ]
  },
  {
    "id": "with-struggle-with",
    "prep": "with",
    "anchor": "struggle with",
    "gloss": "find difficult / battle",
    "domain": "general",
    "items": [
      {
        "model": "I'm struggling with this decision.",
        "cue": "나는 힘들어하고 있어 · 이 결정을"
      },
      {
        "model": "He struggles with public speaking.",
        "cue": "그는 어려워해 · 사람들 앞에서 말하는 걸"
      }
    ]
  },
  {
    "id": "on-agree-on",
    "prep": "on",
    "anchor": "agree on",
    "gloss": "reach consensus about",
    "domain": "general",
    "items": [
      {
        "model": "We agreed on the deadline.",
        "cue": "우리는 합의했어 · 마감일에"
      },
      {
        "model": "Let's agree on the API contract.",
        "cue": "합의하자 · API 계약에"
      }
    ]
  },
  {
    "id": "on-count-on",
    "prep": "on",
    "anchor": "count on",
    "gloss": "depend on / trust",
    "domain": "general",
    "items": [
      {
        "model": "You can count on me.",
        "cue": "너는 믿어도 돼 · 나를"
      },
      {
        "model": "Don't count on the deploy tonight.",
        "cue": "기대하지 마 · 배포를 · 오늘 밤"
      }
    ]
  },
  {
    "id": "on-depend-on",
    "prep": "on",
    "anchor": "depend on",
    "gloss": "rely on / be determined by",
    "domain": "general",
    "items": [
      {
        "model": "It depends on the traffic.",
        "cue": "그건 달려 있어 · 트래픽에"
      },
      {
        "model": "We depend on you for this.",
        "cue": "우리는 의지해 · 너에게 · 이걸 위해"
      }
    ]
  },
  {
    "id": "on-focus-on",
    "prep": "on",
    "anchor": "focus on",
    "gloss": "concentrate attention on",
    "domain": "general",
    "items": [
      {
        "model": "Let's focus on the bug first.",
        "cue": "집중하자 · 그 버그에 · 먼저"
      },
      {
        "model": "Focus on what matters.",
        "cue": "집중해 · 중요한 것에"
      }
    ]
  },
  {
    "id": "on-insist-on",
    "prep": "on",
    "anchor": "insist on",
    "gloss": "firmly demand",
    "domain": "general",
    "items": [
      {
        "model": "He insisted on doing it himself.",
        "cue": "그는 고집했어 · 직접 하기를"
      },
      {
        "model": "They insist on a code review.",
        "cue": "그들은 고집해 · 코드 리뷰를"
      }
    ]
  },
  {
    "id": "for-apply-for",
    "prep": "for",
    "anchor": "apply for",
    "gloss": "make a formal request (job, visa)",
    "domain": "general",
    "items": [
      {
        "model": "I applied for the backend role.",
        "cue": "나는 지원했어 · 백엔드 직무에"
      },
      {
        "model": "She's applying for a new visa.",
        "cue": "그녀는 신청하고 있어 · 새 비자를"
      }
    ]
  },
  {
    "id": "for-blame-for",
    "prep": "for",
    "anchor": "blame for",
    "gloss": "hold responsible for something bad",
    "domain": "general",
    "items": [
      {
        "model": "Don't blame me for the outage.",
        "cue": "탓하지 마 · 나를 · 그 장애에 대해"
      },
      {
        "model": "They blamed the bug for the delay.",
        "cue": "그들은 탓했어 · 그 버그를 · 지연에 대해"
      }
    ]
  },
  {
    "id": "for-look-for",
    "prep": "for",
    "anchor": "look for",
    "gloss": "try to find / seek",
    "domain": "general",
    "items": [
      {
        "model": "I'm looking for my keys.",
        "cue": "나는 찾고 있어 · 내 열쇠를"
      },
      {
        "model": "We're looking for a senior engineer.",
        "cue": "우리는 찾고 있어 · 시니어 엔지니어를"
      }
    ]
  },
  {
    "id": "for-pay-for",
    "prep": "for",
    "anchor": "pay for",
    "gloss": "give money in exchange for",
    "domain": "general",
    "items": [
      {
        "model": "I'll pay for lunch today.",
        "cue": "내가 낼게 · 점심값을 · 오늘"
      },
      {
        "model": "The company pays for our cloud servers.",
        "cue": "회사가 내 · 비용을 · 우리 클라우드 서버의"
      }
    ]
  },
  {
    "id": "for-prepare-for",
    "prep": "for",
    "anchor": "prepare for",
    "gloss": "get ready in advance",
    "domain": "general",
    "items": [
      {
        "model": "I'm preparing for the interview.",
        "cue": "나는 준비하고 있어 · 면접을"
      },
      {
        "model": "We prepared for the traffic spike.",
        "cue": "우리는 대비했어 · 트래픽 급증에"
      }
    ]
  },
  {
    "id": "from-benefit-from",
    "prep": "from",
    "anchor": "benefit from",
    "gloss": "gain advantage from",
    "domain": "general",
    "items": [
      {
        "model": "We all benefit from regular exercise.",
        "cue": "우리 모두 덕을 봐 · 규칙적인 운동에서"
      },
      {
        "model": "You'd benefit from a short break.",
        "cue": "너는 덕을 볼 거야 · 짧은 휴식에서"
      }
    ]
  },
  {
    "id": "from-differ-from",
    "prep": "from",
    "anchor": "differ from",
    "gloss": "be different from",
    "domain": "general",
    "items": [
      {
        "model": "My view differs from yours.",
        "cue": "내 생각은 달라 · 너의 것과"
      },
      {
        "model": "This model differs from the old one.",
        "cue": "이 모델은 달라 · 예전 것과"
      }
    ]
  },
  {
    "id": "from-recover-from",
    "prep": "from",
    "anchor": "recover from",
    "gloss": "get back to normal after",
    "domain": "general",
    "items": [
      {
        "model": "It took weeks to recover from surgery.",
        "cue": "걸렸어 몇 주가 · 회복하는 데 · 수술에서"
      },
      {
        "model": "He's still recovering from the flu.",
        "cue": "그는 여전히 회복 중이야 · 독감에서"
      }
    ]
  },
  {
    "id": "from-refrain-from",
    "prep": "from",
    "anchor": "refrain from",
    "gloss": "hold back / avoid doing",
    "domain": "general",
    "items": [
      {
        "model": "Please refrain from smoking here.",
        "cue": "삼가 주세요 · 흡연을 · 여기서"
      },
      {
        "model": "I refrained from saying anything.",
        "cue": "나는 삼갔어 · 말하는 것을 · 아무것도"
      }
    ]
  },
  {
    "id": "from-result-from",
    "prep": "from",
    "anchor": "result from",
    "gloss": "be caused by",
    "domain": "general",
    "items": [
      {
        "model": "The crash resulted from bad weather.",
        "cue": "그 사고는 비롯됐어 · 나쁜 날씨에서"
      },
      {
        "model": "Most errors result from carelessness.",
        "cue": "대부분의 실수는 비롯돼 · 부주의에서"
      }
    ]
  },
  {
    "id": "from-suffer-from",
    "prep": "from",
    "anchor": "suffer from",
    "gloss": "be affected by (something bad)",
    "domain": "general",
    "items": [
      {
        "model": "I suffer from chronic back pain.",
        "cue": "나는 시달려 · 만성 허리 통증에"
      },
      {
        "model": "She suffers from bad allergies.",
        "cue": "그녀는 시달려 · 심한 알레르기에"
      }
    ]
  },
  {
    "id": "into-get-into",
    "prep": "into",
    "anchor": "get into",
    "gloss": "enter / get involved in",
    "domain": "general",
    "items": [
      {
        "model": "I got into running this year.",
        "cue": "나는 빠져들었어 · 달리기에 · 올해"
      },
      {
        "model": "Don't get into that argument.",
        "cue": "끼어들지 마 · 그 논쟁에"
      }
    ]
  },
  {
    "id": "into-tap-into",
    "prep": "into",
    "anchor": "tap into",
    "gloss": "make use of (a resource/market)",
    "domain": "general",
    "items": [
      {
        "model": "We want to tap into that market.",
        "cue": "우리는 활용하고 싶어 · 그 시장을"
      },
      {
        "model": "Tap into your team's experience.",
        "cue": "활용해 · 너희 팀의 경험을"
      }
    ]
  },
  {
    "id": "into-translate-into",
    "prep": "into",
    "anchor": "translate into",
    "gloss": "translate / convert into another form",
    "domain": "general",
    "items": [
      {
        "model": "Translate the doc into Korean.",
        "cue": "번역해 · 그 문서를 · 한국어로"
      },
      {
        "model": "Break the task into steps.",
        "cue": "나눠 · 그 작업을 · 단계들로"
      }
    ]
  },
  {
    "id": "into-turn-into",
    "prep": "into",
    "anchor": "turn into",
    "gloss": "become / transform into",
    "domain": "general",
    "items": [
      {
        "model": "A small bug turned into an outage.",
        "cue": "작은 버그가 변했어 · 장애로"
      },
      {
        "model": "The meeting turned into a debate.",
        "cue": "그 회의가 변했어 · 논쟁으로"
      }
    ]
  },
  {
    "id": "at-arrive-at",
    "prep": "at",
    "anchor": "arrive at",
    "gloss": "reach a place or conclusion",
    "domain": "general",
    "items": [
      {
        "model": "We arrived at the office late",
        "cue": "우리는 도착했어 · 사무실에 · 늦게"
      },
      {
        "model": "How did you arrive at this number?",
        "cue": "어떻게 도달했어 · 이 숫자에?"
      }
    ]
  },
  {
    "id": "at-bad-at",
    "prep": "at",
    "anchor": "bad at",
    "gloss": "not skilled at something",
    "domain": "general",
    "items": [
      {
        "model": "I'm really bad at directions",
        "cue": "나는 정말 못해 · 길 찾는 걸"
      },
      {
        "model": "He's bad at remembering names",
        "cue": "그는 못해 · 이름 외우는 걸"
      }
    ]
  },
  {
    "id": "at-be-surprised-at",
    "prep": "at",
    "anchor": "be surprised at",
    "gloss": "feel surprise about something",
    "domain": "general",
    "items": [
      {
        "model": "I was surprised at the result",
        "cue": "나는 놀랐어 · 그 결과에"
      },
      {
        "model": "Don't be surprised at the bill",
        "cue": "놀라지 마 · 그 청구서에"
      }
    ]
  },
  {
    "id": "at-good-at",
    "prep": "at",
    "anchor": "good at",
    "gloss": "skilled at something",
    "domain": "general",
    "items": [
      {
        "model": "She's good at solving problems",
        "cue": "그녀는 잘해 · 문제 푸는 걸"
      },
      {
        "model": "I'm not good at small talk",
        "cue": "나는 잘 못해 · 가벼운 대화를"
      }
    ]
  },
  {
    "id": "at-laugh-at",
    "prep": "at",
    "anchor": "laugh at",
    "gloss": "mock or find funny",
    "domain": "general",
    "items": [
      {
        "model": "Don't laugh at my code",
        "cue": "비웃지 마 · 내 코드를"
      },
      {
        "model": "Everyone laughed at the joke",
        "cue": "모두가 웃었어 · 그 농담에"
      }
    ]
  },
  {
    "id": "at-work-at",
    "prep": "at",
    "anchor": "work at",
    "gloss": "be employed at a place",
    "domain": "general",
    "items": [
      {
        "model": "I work at a small startup",
        "cue": "나는 일해 · 작은 스타트업에서"
      },
      {
        "model": "She works at a bank now",
        "cue": "그녀는 일해 · 은행에서 · 지금"
      }
    ]
  },
  {
    "id": "in-believe-in",
    "prep": "in",
    "anchor": "believe in",
    "gloss": "trust the value or existence of",
    "domain": "general",
    "items": [
      {
        "model": "I believe in you.",
        "cue": "나는 믿어 · 너를"
      },
      {
        "model": "They believe in working hard.",
        "cue": "그들은 믿어 · 열심히 일하는 것을"
      }
    ]
  },
  {
    "id": "in-confident-in",
    "prep": "in",
    "anchor": "confident in",
    "gloss": "sure about / trusting",
    "domain": "general",
    "items": [
      {
        "model": "I'm confident in this plan.",
        "cue": "나는 확신해 · 이 계획에"
      },
      {
        "model": "She's confident in her skills.",
        "cue": "그녀는 확신해 · 자기 실력에"
      }
    ]
  },
  {
    "id": "in-interested-in",
    "prep": "in",
    "anchor": "interested in",
    "gloss": "curious about / wanting to know more",
    "domain": "general",
    "items": [
      {
        "model": "I'm interested in learning Spanish.",
        "cue": "나는 관심 있어 · 배우는 데 · 스페인어를"
      },
      {
        "model": "Are you interested in this job?",
        "cue": "너는 관심 있어? · 이 일에"
      }
    ]
  },
  {
    "id": "in-invest-in",
    "prep": "in",
    "anchor": "invest in",
    "gloss": "put money or effort into",
    "domain": "general",
    "items": [
      {
        "model": "We should invest in testing.",
        "cue": "우리는 투자해야 해 · 테스트에"
      },
      {
        "model": "She invested in good tools.",
        "cue": "그녀는 투자했어 · 좋은 도구에"
      }
    ]
  },
  {
    "id": "in-participate-in",
    "prep": "in",
    "anchor": "participate in",
    "gloss": "take part in an activity",
    "domain": "general",
    "items": [
      {
        "model": "Everyone participated in the meeting.",
        "cue": "모두가 참여했어 · 그 회의에"
      },
      {
        "model": "I want to participate in the project.",
        "cue": "나는 참여하고 싶어 · 그 프로젝트에"
      }
    ]
  },
  {
    "id": "in-succeed-in",
    "prep": "in",
    "anchor": "succeed in",
    "gloss": "achieve / manage to do",
    "domain": "general",
    "items": [
      {
        "model": "She succeeded in passing the exam.",
        "cue": "그녀는 성공했어 · 통과하는 데 · 시험을"
      },
      {
        "model": "We succeeded in fixing it.",
        "cue": "우리는 성공했어 · 고치는 데 · 그것을"
      }
    ]
  },
  {
    "id": "of-afraid-of",
    "prep": "of",
    "anchor": "afraid of",
    "gloss": "scared of / fearful of",
    "domain": "general",
    "items": [
      {
        "model": "I'm afraid of spiders.",
        "cue": "나는 무서워 · 거미를"
      },
      {
        "model": "Don't be afraid of mistakes.",
        "cue": "두려워하지 마 · 실수를"
      }
    ]
  },
  {
    "id": "of-consist-of",
    "prep": "of",
    "anchor": "consist of",
    "gloss": "be made up of",
    "domain": "general",
    "items": [
      {
        "model": "The team consists of five people.",
        "cue": "그 팀은 구성돼 있어 · 다섯 명으로"
      },
      {
        "model": "Water consists of hydrogen and oxygen.",
        "cue": "물은 구성돼 있어 · 수소와 산소로"
      }
    ]
  },
  {
    "id": "of-remind-of",
    "prep": "of",
    "anchor": "remind of",
    "gloss": "make someone recall",
    "domain": "general",
    "items": [
      {
        "model": "This reminds me of home.",
        "cue": "이건 떠오르게 해 · 나에게 · 집을"
      },
      {
        "model": "Remind me of the deadline tomorrow.",
        "cue": "상기시켜줘 · 나에게 · 마감일을 · 내일"
      }
    ]
  },
  {
    "id": "of-take-advantage-of",
    "prep": "of",
    "anchor": "take advantage of",
    "gloss": "make good use of",
    "domain": "general",
    "items": [
      {
        "model": "Take advantage of the free trial.",
        "cue": "활용해 · 무료 체험을"
      },
      {
        "model": "Let's take advantage of caching.",
        "cue": "활용하자 · 캐싱을"
      }
    ]
  },
  {
    "id": "of-think-of",
    "prep": "of",
    "anchor": "think of",
    "gloss": "come up with / have in mind",
    "domain": "general",
    "items": [
      {
        "model": "I can't think of his name.",
        "cue": "나는 떠올릴 수 없어 · 그의 이름을"
      },
      {
        "model": "Think of a better solution.",
        "cue": "생각해봐 · 더 나은 해결책을"
      }
    ]
  },
  {
    "id": "to-be-used-to",
    "prep": "to",
    "anchor": "be used to",
    "gloss": "be accustomed to",
    "domain": "general",
    "items": [
      {
        "model": "I'm used to remote work now.",
        "cue": "나는 익숙해 · 원격 근무에 · 이제"
      },
      {
        "model": "She's used to long deploys.",
        "cue": "그녀는 익숙해 · 긴 배포에"
      }
    ]
  },
  {
    "id": "to-belong-to",
    "prep": "to",
    "anchor": "belong to",
    "gloss": "be owned by / be a member of",
    "domain": "general",
    "items": [
      {
        "model": "This account belongs to her.",
        "cue": "이 계정은 속해 · 그녀에게"
      },
      {
        "model": "These files belong to the old project.",
        "cue": "이 파일들은 속해 · 옛 프로젝트에"
      }
    ]
  },
  {
    "id": "to-listen-to",
    "prep": "to",
    "anchor": "listen to",
    "gloss": "pay attention to a sound/person",
    "domain": "general",
    "items": [
      {
        "model": "I listen to podcasts every morning.",
        "cue": "나는 들어 · 팟캐스트를 · 매일 아침"
      },
      {
        "model": "You should listen to your users.",
        "cue": "너는 들어야 해 · 너의 사용자들의 말을"
      }
    ]
  },
  {
    "id": "to-look-forward-to",
    "prep": "to",
    "anchor": "look forward to",
    "gloss": "anticipate with pleasure",
    "domain": "general",
    "items": [
      {
        "model": "I look forward to the weekend.",
        "cue": "나는 기대해 · 주말을"
      },
      {
        "model": "We look forward to working with you.",
        "cue": "우리는 기대해 · 함께 일하기를 · 당신과"
      }
    ]
  },
  {
    "id": "about-ask-about",
    "prep": "about",
    "anchor": "ask about",
    "gloss": "request information on something",
    "domain": "general",
    "items": [
      {
        "model": "He asked about the deadline.",
        "cue": "그는 물어봤어 · 마감일에 대해"
      },
      {
        "model": "Customers keep asking about the new feature.",
        "cue": "고객들이 계속 물어봐 · 새 기능에 대해"
      }
    ]
  },
  {
    "id": "about-be-confused-about",
    "prep": "about",
    "anchor": "be confused about",
    "gloss": "not understand something clearly",
    "domain": "general",
    "items": [
      {
        "model": "I'm confused about the instructions.",
        "cue": "나는 헷갈려 · 그 설명에 대해"
      },
      {
        "model": "She's confused about the schedule.",
        "cue": "그녀는 헷갈려 · 일정에 대해"
      }
    ]
  },
  {
    "id": "about-be-excited-about",
    "prep": "about",
    "anchor": "be excited about",
    "gloss": "feel enthusiastic about something",
    "domain": "general",
    "items": [
      {
        "model": "I'm excited about the new release.",
        "cue": "나는 설레 · 새 릴리스가"
      },
      {
        "model": "They're excited about the trip.",
        "cue": "그들은 설레 · 그 여행이"
      }
    ]
  },
  {
    "id": "about-care-about",
    "prep": "about",
    "anchor": "care about",
    "gloss": "feel that something matters to you",
    "domain": "general",
    "items": [
      {
        "model": "I really care about your opinion.",
        "cue": "나는 정말 신경 써 · 너의 의견을"
      },
      {
        "model": "She cares about doing it right.",
        "cue": "그녀는 신경 써 · 제대로 하는 것을"
      }
    ]
  },
  {
    "id": "about-forget-about",
    "prep": "about",
    "anchor": "forget about",
    "gloss": "stop thinking about / dismiss something",
    "domain": "general",
    "items": [
      {
        "model": "Just forget about it for now.",
        "cue": "그냥 잊어버려 · 그것에 대해 · 지금은"
      },
      {
        "model": "I forgot about the meeting.",
        "cue": "나는 잊어버렸어 · 그 회의에 대해"
      }
    ]
  },
  {
    "id": "with-be-familiar-with",
    "prep": "with",
    "anchor": "be familiar with",
    "gloss": "know well / be used to",
    "domain": "dev",
    "items": [
      {
        "model": "Are you familiar with this codebase?",
        "cue": "너는 익숙해 · 이 코드베이스에?"
      },
      {
        "model": "I'm familiar with the deploy process.",
        "cue": "나는 익숙해 · 그 배포 과정에"
      }
    ]
  },
  {
    "id": "with-comply-with",
    "prep": "with",
    "anchor": "comply with",
    "gloss": "follow / conform to (rules)",
    "domain": "dev",
    "items": [
      {
        "model": "The code must comply with the spec.",
        "cue": "그 코드는 따라야 해 · 그 명세를"
      },
      {
        "model": "We comply with GDPR.",
        "cue": "우리는 준수해 · GDPR를"
      }
    ]
  },
  {
    "id": "with-integrate-with",
    "prep": "with",
    "anchor": "integrate with",
    "gloss": "connect / work together with",
    "domain": "dev",
    "items": [
      {
        "model": "It integrates with the payment API.",
        "cue": "그건 연동돼 · 결제 API와"
      },
      {
        "model": "We need to integrate with their service.",
        "cue": "우리는 연동해야 해 · 그들의 서비스와"
      }
    ]
  },
  {
    "id": "on-base-it-on",
    "prep": "on",
    "anchor": "base it on",
    "gloss": "build / found something upon",
    "domain": "dev",
    "items": [
      {
        "model": "We based it on the old schema.",
        "cue": "우리는 그것을 기반으로 했어 · 기존 스키마를"
      },
      {
        "model": "Base the estimate on real data.",
        "cue": "그 추정치를 기반으로 해 · 실제 데이터를"
      }
    ]
  },
  {
    "id": "on-comment-on",
    "prep": "on",
    "anchor": "comment on",
    "gloss": "give remarks about",
    "domain": "dev",
    "items": [
      {
        "model": "Can you comment on my PR?",
        "cue": "코멘트해 줄래 · 내 PR에"
      },
      {
        "model": "She commented on the design doc.",
        "cue": "그녀는 코멘트했어 · 디자인 문서에"
      }
    ]
  },
  {
    "id": "on-keep-an-eye-on",
    "prep": "on",
    "anchor": "keep an eye on",
    "gloss": "watch / monitor closely",
    "domain": "dev",
    "items": [
      {
        "model": "Keep an eye on the metrics.",
        "cue": "주시해 · 지표를"
      },
      {
        "model": "Keep an eye on the error logs.",
        "cue": "주시해 · 에러 로그를"
      }
    ]
  },
  {
    "id": "on-rely-on",
    "prep": "on",
    "anchor": "rely on",
    "gloss": "trust / count on",
    "domain": "dev",
    "items": [
      {
        "model": "Don't rely on that cache.",
        "cue": "의존하지 마 · 그 캐시에"
      },
      {
        "model": "We rely on the CI to catch this.",
        "cue": "우리는 의존해 · CI에 · 이걸 잡아내도록"
      }
    ]
  },
  {
    "id": "on-run-on",
    "prep": "on",
    "anchor": "run on",
    "gloss": "execute on (a server/platform)",
    "domain": "dev",
    "items": [
      {
        "model": "It runs on a single server.",
        "cue": "그건 돌아가 · 서버 한 대에서"
      },
      {
        "model": "The app runs on Node 20.",
        "cue": "그 앱은 돌아가 · 노드 20에서"
      }
    ]
  },
  {
    "id": "on-work-on",
    "prep": "on",
    "anchor": "work on",
    "gloss": "spend effort improving / building",
    "domain": "dev",
    "items": [
      {
        "model": "I'm working on the login ticket.",
        "cue": "나는 작업 중이야 · 로그인 티켓을"
      },
      {
        "model": "Who's working on this PR?",
        "cue": "누가 작업하고 있어 · 이 PR을"
      }
    ]
  },
  {
    "id": "for-a-fix-for",
    "prep": "for",
    "anchor": "a fix for",
    "gloss": "a solution to a problem",
    "domain": "dev",
    "items": [
      {
        "model": "I pushed a fix for the login issue.",
        "cue": "나는 푸시했어 · 수정을 · 로그인 문제에 대한"
      },
      {
        "model": "Do we have a fix for this crash?",
        "cue": "우리한테 있어 · 수정이 · 이 크래시에 대한?"
      }
    ]
  },
  {
    "id": "for-ask-for",
    "prep": "for",
    "anchor": "ask for",
    "gloss": "request something",
    "domain": "dev",
    "items": [
      {
        "model": "I asked for a review on my PR.",
        "cue": "나는 요청했어 · 리뷰를 · 내 PR에"
      },
      {
        "model": "Ask for more time if you need it.",
        "cue": "요청해 · 더 많은 시간을 · 필요하면"
      }
    ]
  },
  {
    "id": "for-responsible-for",
    "prep": "for",
    "anchor": "responsible for",
    "gloss": "in charge of / accountable for",
    "domain": "dev",
    "items": [
      {
        "model": "Our team is responsible for this service.",
        "cue": "우리 팀이 책임지고 있어 · 이 서비스를"
      },
      {
        "model": "Who's responsible for the payment API?",
        "cue": "누가 책임지고 있어 · 결제 API를"
      }
    ]
  },
  {
    "id": "for-search-for",
    "prep": "for",
    "anchor": "search for",
    "gloss": "look hard to find something",
    "domain": "dev",
    "items": [
      {
        "model": "I've been searching for this bug all day.",
        "cue": "나는 찾고 있었어 · 이 버그를 · 하루 종일"
      },
      {
        "model": "Search for the error in the logs.",
        "cue": "찾아봐 · 그 에러를 · 로그에서"
      }
    ]
  },
  {
    "id": "for-wait-for",
    "prep": "for",
    "anchor": "wait for",
    "gloss": "stay until something happens",
    "domain": "dev",
    "items": [
      {
        "model": "I'm waiting for the build to finish.",
        "cue": "나는 기다리고 있어 · 빌드가 · 끝나기를"
      },
      {
        "model": "Let's wait for CI to pass.",
        "cue": "기다리자 · CI가 · 통과하기를"
      }
    ]
  },
  {
    "id": "from-import-from",
    "prep": "from",
    "anchor": "import from",
    "gloss": "bring code in from a module",
    "domain": "dev",
    "items": [
      {
        "model": "We import this from the utils module.",
        "cue": "우리는 가져와 이걸 · utils 모듈에서"
      },
      {
        "model": "Import the hook from React.",
        "cue": "그 훅을 가져와 · React에서"
      }
    ]
  },
  {
    "id": "from-inherit-from",
    "prep": "from",
    "anchor": "inherit from",
    "gloss": "extend a base class",
    "domain": "dev",
    "items": [
      {
        "model": "This class inherits from BaseService.",
        "cue": "이 클래스는 상속받아 · BaseService로부터"
      },
      {
        "model": "Both inherit from the same parent.",
        "cue": "둘 다 상속받아 · 같은 부모로부터"
      }
    ]
  },
  {
    "id": "from-prevent-from",
    "prep": "from",
    "anchor": "prevent from",
    "gloss": "stop something from happening",
    "domain": "dev",
    "items": [
      {
        "model": "This check prevents it from crashing.",
        "cue": "이 검사가 막아 그게 · 죽는 것을"
      },
      {
        "model": "A guard prevents the build from failing.",
        "cue": "가드가 막아 그 빌드가 · 실패하는 것을"
      }
    ]
  },
  {
    "id": "from-pull-from",
    "prep": "from",
    "anchor": "pull from",
    "gloss": "fetch changes from a branch/remote",
    "domain": "dev",
    "items": [
      {
        "model": "Pull from main before you push.",
        "cue": "받아 · main에서 · 푸시하기 전에"
      },
      {
        "model": "I pulled the latest from origin.",
        "cue": "나는 받았어 최신 것을 · origin에서"
      }
    ]
  },
  {
    "id": "into-dig-into",
    "prep": "into",
    "anchor": "dig into",
    "gloss": "investigate deeply / start eating",
    "domain": "dev",
    "items": [
      {
        "model": "Let me dig into the logs.",
        "cue": "내가 파고들게 · 그 로그를"
      },
      {
        "model": "Let's dig into the data.",
        "cue": "파고들어 보자 · 그 데이터를"
      }
    ]
  },
  {
    "id": "into-hook-into",
    "prep": "into",
    "anchor": "hook into",
    "gloss": "connect / tap into a system",
    "domain": "dev",
    "items": [
      {
        "model": "We hook into the payment API.",
        "cue": "우리는 연결해 · 결제 API에"
      },
      {
        "model": "This hooks into the build pipeline.",
        "cue": "이건 연결돼 · 빌드 파이프라인에"
      }
    ]
  },
  {
    "id": "into-look-into",
    "prep": "into",
    "anchor": "look into",
    "gloss": "investigate / examine",
    "domain": "dev",
    "items": [
      {
        "model": "I'll look into that bug now.",
        "cue": "내가 들여다볼게 · 그 버그를 · 지금"
      },
      {
        "model": "Can you look into the timeout?",
        "cue": "들여다봐 줄래 · 그 타임아웃을"
      }
    ]
  },
  {
    "id": "into-merge-into",
    "prep": "into",
    "anchor": "merge into",
    "gloss": "combine code/changes into a branch",
    "domain": "dev",
    "items": [
      {
        "model": "Merge this branch into main.",
        "cue": "병합해 · 이 브랜치를 · main에"
      },
      {
        "model": "We merged the fix into staging.",
        "cue": "우리는 병합했어 · 그 수정을 · 스테이징에"
      }
    ]
  },
  {
    "id": "into-opt-into",
    "prep": "into",
    "anchor": "opt into",
    "gloss": "choose to join / enable something",
    "domain": "dev",
    "items": [
      {
        "model": "Users can opt into the beta.",
        "cue": "사용자들은 선택해 참여할 수 있어 · 베타에"
      },
      {
        "model": "Opt into strict mode for safety.",
        "cue": "선택해 켜 · 엄격 모드를 · 안전을 위해"
      }
    ]
  },
  {
    "id": "into-run-into",
    "prep": "into",
    "anchor": "run into",
    "gloss": "encounter (a problem) / bump into someone",
    "domain": "dev",
    "items": [
      {
        "model": "We ran into a memory leak.",
        "cue": "우리는 마주쳤어 · 메모리 누수를"
      },
      {
        "model": "I ran into an old friend.",
        "cue": "나는 우연히 마주쳤어 · 옛 친구를"
      }
    ]
  },
  {
    "id": "at-fail-at",
    "prep": "at",
    "anchor": "fail at",
    "gloss": "fail at a particular point or step",
    "domain": "dev",
    "items": [
      {
        "model": "The build failed at the test step",
        "cue": "빌드가 실패했어 · 테스트 단계에서"
      },
      {
        "model": "The deploy failed at the last stage",
        "cue": "배포가 실패했어 · 마지막 단계에서"
      }
    ]
  },
  {
    "id": "at-look-at",
    "prep": "at",
    "anchor": "look at",
    "gloss": "direct your eyes to / examine",
    "domain": "dev",
    "items": [
      {
        "model": "Let's look at the logs first",
        "cue": "보자 · 로그를 · 먼저"
      },
      {
        "model": "Can you look at my PR?",
        "cue": "봐 줄래 · 내 PR을?"
      }
    ]
  },
  {
    "id": "at-point-at",
    "prep": "at",
    "anchor": "point at",
    "gloss": "aim or direct at something",
    "domain": "dev",
    "items": [
      {
        "model": "The arrow points at the failing line",
        "cue": "그 화살표가 가리켜 · 실패한 줄을"
      },
      {
        "model": "Don't point at the screen",
        "cue": "가리키지 마 · 화면을"
      }
    ]
  },
  {
    "id": "at-stare-at",
    "prep": "at",
    "anchor": "stare at",
    "gloss": "look fixedly at",
    "domain": "dev",
    "items": [
      {
        "model": "I stared at the stack trace forever",
        "cue": "나는 봤어 · 스택 트레이스를 · 계속"
      },
      {
        "model": "Stop staring at the screen",
        "cue": "그만 봐 · 화면을"
      }
    ]
  },
  {
    "id": "in-be-involved-in",
    "prep": "in",
    "anchor": "be involved in",
    "gloss": "take part in / be connected to",
    "domain": "dev",
    "items": [
      {
        "model": "I was involved in the migration.",
        "cue": "나는 참여했어 · 그 마이그레이션에"
      },
      {
        "model": "He's involved in too many projects.",
        "cue": "그는 관여하고 있어 · 너무 많은 프로젝트에"
      }
    ]
  },
  {
    "id": "in-be-written-in",
    "prep": "in",
    "anchor": "be written in",
    "gloss": "implemented using a language",
    "domain": "dev",
    "items": [
      {
        "model": "The service is written in Python.",
        "cue": "그 서비스는 작성되어 있어 · 파이썬으로"
      },
      {
        "model": "This was written in Go.",
        "cue": "이건 작성되어 있어 · 고로"
      }
    ]
  },
  {
    "id": "in-result-in",
    "prep": "in",
    "anchor": "result in",
    "gloss": "lead to / cause as an outcome",
    "domain": "dev",
    "items": [
      {
        "model": "That change resulted in an error.",
        "cue": "그 변경이 초래했어 · 에러를"
      },
      {
        "model": "The bug results in data loss.",
        "cue": "그 버그는 초래해 · 데이터 손실을"
      }
    ]
  },
  {
    "id": "in-specialize-in",
    "prep": "in",
    "anchor": "specialize in",
    "gloss": "focus on one area of expertise",
    "domain": "dev",
    "items": [
      {
        "model": "I specialize in backend systems.",
        "cue": "나는 전문이야 · 백엔드 시스템에"
      },
      {
        "model": "Our team specializes in security.",
        "cue": "우리 팀은 전문이야 · 보안에"
      }
    ]
  },
  {
    "id": "of-be-aware-of",
    "prep": "of",
    "anchor": "be aware of",
    "gloss": "know about / be conscious of",
    "domain": "dev",
    "items": [
      {
        "model": "Be aware of the side effect.",
        "cue": "알고 있어 · 그 부작용을"
      },
      {
        "model": "We're aware of the outage.",
        "cue": "우리는 알고 있어 · 그 장애를"
      }
    ]
  },
  {
    "id": "of-be-capable-of",
    "prep": "of",
    "anchor": "be capable of",
    "gloss": "be able to do",
    "domain": "dev",
    "items": [
      {
        "model": "This service is capable of scaling.",
        "cue": "이 서비스는 할 수 있어 · 확장을"
      },
      {
        "model": "The model is capable of reasoning.",
        "cue": "그 모델은 할 수 있어 · 추론을"
      }
    ]
  },
  {
    "id": "of-be-composed-of",
    "prep": "of",
    "anchor": "be composed of",
    "gloss": "be built from / made up of",
    "domain": "dev",
    "items": [
      {
        "model": "The system is composed of microservices.",
        "cue": "그 시스템은 구성돼 있어 · 마이크로서비스로"
      },
      {
        "model": "The PR is composed of small commits.",
        "cue": "그 PR은 구성돼 있어 · 작은 커밋들로"
      }
    ]
  },
  {
    "id": "of-get-rid-of",
    "prep": "of",
    "anchor": "get rid of",
    "gloss": "remove / eliminate",
    "domain": "dev",
    "items": [
      {
        "model": "Let's get rid of this bug.",
        "cue": "없애자 · 이 버그를"
      },
      {
        "model": "Get rid of the dead code.",
        "cue": "제거해 · 죽은 코드를"
      }
    ]
  },
  {
    "id": "of-take-care-of",
    "prep": "of",
    "anchor": "take care of",
    "gloss": "handle / look after",
    "domain": "dev",
    "items": [
      {
        "model": "I'll take care of the deploy.",
        "cue": "내가 처리할게 · 그 배포를"
      },
      {
        "model": "The framework takes care of routing.",
        "cue": "그 프레임워크가 처리해 · 라우팅을"
      }
    ]
  },
  {
    "id": "to-according-to",
    "prep": "to",
    "anchor": "according to",
    "gloss": "as stated by / based on",
    "domain": "dev",
    "items": [
      {
        "model": "According to the logs, it crashed at noon.",
        "cue": "로그에 따르면 · 그게 죽었어 · 정오에"
      },
      {
        "model": "Sort the list according to date.",
        "cue": "정렬해 · 리스트를 · 날짜에 따라"
      }
    ]
  },
  {
    "id": "to-connect-to",
    "prep": "to",
    "anchor": "connect to",
    "gloss": "establish a link to a system",
    "domain": "dev",
    "items": [
      {
        "model": "The app can't connect to the DB.",
        "cue": "앱이 연결할 수 없어 · DB에"
      },
      {
        "model": "Connect to the VPN first.",
        "cue": "연결해 · VPN에 · 먼저"
      }
    ]
  },
  {
    "id": "to-deploy-to",
    "prep": "to",
    "anchor": "deploy to",
    "gloss": "release code to an environment",
    "domain": "dev",
    "items": [
      {
        "model": "Deploy it to staging first.",
        "cue": "그걸 배포해 · 스테이징에 · 먼저"
      },
      {
        "model": "We deploy to production on Fridays.",
        "cue": "우리는 배포해 · 프로덕션에 · 금요일마다"
      }
    ]
  },
  {
    "id": "to-lead-to",
    "prep": "to",
    "anchor": "lead to",
    "gloss": "cause / result in",
    "domain": "dev",
    "items": [
      {
        "model": "That change led to a memory leak.",
        "cue": "그 변경이 이어졌어 · 메모리 누수로"
      },
      {
        "model": "Skipping tests leads to bugs.",
        "cue": "테스트를 건너뛰면 이어져 · 버그로"
      }
    ]
  },
  {
    "id": "to-push-to",
    "prep": "to",
    "anchor": "push to",
    "gloss": "send commits to a branch/remote",
    "domain": "dev",
    "items": [
      {
        "model": "Don't push to main directly.",
        "cue": "푸시하지 마 · 메인에 · 직접"
      },
      {
        "model": "I pushed to my feature branch.",
        "cue": "나는 푸시했어 · 내 기능 브랜치에"
      }
    ]
  },
  {
    "id": "to-refer-to",
    "prep": "to",
    "anchor": "refer to",
    "gloss": "mention / point at something",
    "domain": "dev",
    "items": [
      {
        "model": "Refer to the docs for the config.",
        "cue": "참고해 · 문서를 · 설정은"
      },
      {
        "model": "This variable refers to the cache.",
        "cue": "이 변수는 가리켜 · 캐시를"
      }
    ]
  },
  {
    "id": "to-respond-to",
    "prep": "to",
    "anchor": "respond to",
    "gloss": "reply / react to",
    "domain": "dev",
    "items": [
      {
        "model": "The server responds to every request.",
        "cue": "서버는 응답해 · 모든 요청에"
      },
      {
        "model": "Please respond to my PR comments.",
        "cue": "응답해 줘 · 내 PR 코멘트에"
      }
    ]
  },
  {
    "id": "about-be-sure-about",
    "prep": "about",
    "anchor": "be sure about",
    "gloss": "feel certain about something",
    "domain": "dev",
    "items": [
      {
        "model": "Are you sure about this fix?",
        "cue": "너 확신해 · 이 수정에 대해?"
      },
      {
        "model": "I'm not sure about the rollback.",
        "cue": "나는 확신 못 해 · 롤백에 대해"
      }
    ]
  },
  {
    "id": "about-complain-about",
    "prep": "about",
    "anchor": "complain about",
    "gloss": "express dissatisfaction with something",
    "domain": "dev",
    "items": [
      {
        "model": "Users are complaining about slow loading.",
        "cue": "사용자들이 불평하고 있어 · 느린 로딩에 대해"
      },
      {
        "model": "The linter complains about this line.",
        "cue": "린터가 불평해 · 이 줄에 대해"
      }
    ]
  },
  {
    "id": "about-talk-about",
    "prep": "about",
    "anchor": "talk about",
    "gloss": "discuss something",
    "domain": "dev",
    "items": [
      {
        "model": "Let's talk about the design first.",
        "cue": "얘기하자 · 설계에 대해 · 먼저"
      },
      {
        "model": "We talked about it in standup.",
        "cue": "우리는 얘기했어 · 그것에 대해 · 스탠드업에서"
      }
    ]
  },
  {
    "id": "about-think-about",
    "prep": "about",
    "anchor": "think about",
    "gloss": "consider or reflect on something",
    "domain": "dev",
    "items": [
      {
        "model": "Did you think about the edge cases?",
        "cue": "너 생각해 봤어 · 엣지 케이스를?"
      },
      {
        "model": "Let me think about it tonight.",
        "cue": "내가 생각해 볼게 · 그것을 · 오늘 밤"
      }
    ]
  },
  {
    "id": "about-worry-about",
    "prep": "about",
    "anchor": "worry about",
    "gloss": "feel anxious about something",
    "domain": "dev",
    "items": [
      {
        "model": "Don't worry about performance yet.",
        "cue": "걱정하지 마 · 성능은 · 아직"
      },
      {
        "model": "I'm worried about this memory leak.",
        "cue": "나는 걱정돼 · 이 메모리 누수가"
      }
    ]
  }
];

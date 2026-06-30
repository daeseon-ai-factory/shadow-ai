// AUTO-GENERATED from docs/default_verb_v3.md — DO NOT EDIT BY HAND.
// Regenerate: python3 scripts/build-verb-pack.py
//
// 102 base verbs + their phrasal verbs / patterns, frequency-tiered (T1 daily core,
// T2 common, T3 idiom/low-freq) with easy-English glosses for idioms. The premise:
// master the base verbs + the chunks that hang off them and you can describe almost
// any action; learn new words by re-expressing them through these patterns.
// 103 groups, 1956 entries (T1 453 / T2 1184 / T3 319).
// Pairs with verbKey() in practice-cards.ts for SRS (card_key = `pv:<id>#<index>`).

export interface VerbItem {
  cue: string; // Korean gloss (the prompt: recall the English from this)
  model: string; // the English phrasal verb / pattern (the answer)
  tier: 1 | 2 | 3; // 1 = daily core, 2 = common, 3 = idiom / low-frequency
  star?: boolean; // author's within-verb priority (separate axis from tier)
  easyEn?: string; // plain-English meaning for idioms / opaque entries
}

export interface VerbGroup {
  id: string; // stable slug, e.g. "cut" ("extra" for the appendix group)
  verb: string; // base verb in caps, e.g. "CUT"
  gloss: string; // one-line Korean description of the verb's role
  items: VerbItem[];
}

export const VERB_PACK: VerbGroup[] = [
  {
    "id": "be",
    "verb": "BE",
    "gloss": "be는 상태 설명의 뼈대다.",
    "items": [
      {
        "cue": "~안에 있다 / ~상황에 있다",
        "model": "be in [place/situation]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 있다 / ~수준이다",
        "model": "be at [place/level]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 켜져 있다 / ~에 관여 중이다",
        "model": "be on [topic/system]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~출신이다 / ~에서 왔다",
        "model": "be from [place/source]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~와 함께 있다 / ~팀 소속이다",
        "model": "be with [person/team]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 관심이 많다",
        "model": "be into [topic]",
        "tier": 1,
        "star": true,
        "easyEn": "to like or be very interested in something"
      },
      {
        "cue": "~이 다 떨어졌다",
        "model": "be out of [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "to have none of something left"
      },
      {
        "cue": "~에게 달려 있다",
        "model": "be up to [person]",
        "tier": 1,
        "star": true,
        "easyEn": "to be someone's decision or responsibility"
      },
      {
        "cue": "막 ~하려고 하다",
        "model": "be about to [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~하기로 되어 있다",
        "model": "be supposed to [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 익숙하다",
        "model": "be used to [-ing/noun]",
        "tier": 1,
        "star": true,
        "easyEn": "to be familiar with something through experience"
      },
      {
        "cue": "~을 책임지다",
        "model": "be responsible for [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 익숙하다 / 잘 안다",
        "model": "be familiar with [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 잘하다",
        "model": "be good at [-ing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 관심 있다",
        "model": "be interested in [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 알고 있다",
        "model": "be aware of [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 끝내다 / ~에 질리다",
        "model": "be done with [thing]",
        "tier": 1
      },
      {
        "cue": "~을 담당하다",
        "model": "be in charge of [thing]",
        "tier": 1
      },
      {
        "cue": "기꺼이 ~하다 / ~할 의향이 있다",
        "model": "be willing to [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 위한 것이다 / ~에 찬성하다",
        "model": "be for [purpose/person]",
        "tier": 2,
        "star": true,
        "easyEn": "to support something or be intended for someone"
      },
      {
        "cue": "~에 반대하다",
        "model": "be against [idea]",
        "tier": 2,
        "star": true,
        "easyEn": "to oppose or disagree with something"
      },
      {
        "cue": "~을 잘 관리하고 있다",
        "model": "be on top of [thing]",
        "tier": 2,
        "easyEn": "to be managing something well and in control"
      },
      {
        "cue": "~이 밀려 있다",
        "model": "be behind on [thing]",
        "tier": 2,
        "easyEn": "to be late or not have done enough yet"
      },
      {
        "cue": "~이 부족하다",
        "model": "be short on [thing]",
        "tier": 2,
        "easyEn": "to not have enough of something"
      },
      {
        "cue": "(서버/시스템이) 가동 중이다 / 깨어 있다",
        "model": "be up",
        "tier": 2,
        "star": true,
        "easyEn": "to be running or awake"
      },
      {
        "cue": "(서버/시스템이) 다운되다 / 작동을 멈추다",
        "model": "be down",
        "tier": 2,
        "star": true,
        "easyEn": "to be not working or stopped (system)"
      },
      {
        "cue": "마감이 ~이다 / 기한이 ~까지다",
        "model": "be due [date]",
        "tier": 2,
        "star": true,
        "easyEn": "to be expected or required by a certain time"
      },
      {
        "cue": "쉬는 날이다 / 자리에 없다 / (기기가) 꺼져 있다",
        "model": "be off",
        "tier": 2,
        "easyEn": "to be away, not working, or turned off"
      },
      {
        "cue": "끝나다 / 종료되다",
        "model": "be over",
        "tier": 2,
        "easyEn": "to be finished or ended"
      },
      {
        "cue": "비상 대기 중이다 / 당직이다",
        "model": "be on call",
        "tier": 2,
        "easyEn": "to be ready to work if needed at any time"
      },
      {
        "cue": "~할 의향이 있다 / ~에 응할 마음이 있다",
        "model": "be up for [thing]",
        "tier": 2,
        "easyEn": "to be willing or eager to do something"
      },
      {
        "cue": "~에 동의하다 / 적극 지지하다",
        "model": "be on board with [thing]",
        "tier": 2,
        "easyEn": "to agree with and support a plan"
      },
      {
        "cue": "(이해/의견이) 일치하다",
        "model": "be on the same page",
        "tier": 2,
        "easyEn": "to share the same understanding or opinion"
      },
      {
        "cue": "~의 대상이다 / ~에 따라 달라질 수 있다",
        "model": "be subject to [thing]",
        "tier": 2,
        "easyEn": "to be affected or controlled by something"
      },
      {
        "cue": "~할 능력이 있다",
        "model": "be capable of [-ing]",
        "tier": 2
      }
    ]
  },
  {
    "id": "have",
    "verb": "HAVE",
    "gloss": "have는 소유, 경험, 문제, 의무를 만든다.",
    "items": [
      {
        "cue": "~해야 한다",
        "model": "have to [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 접근 권한이 있다",
        "model": "have access to [system/data]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~경험이 있다",
        "model": "have experience with [tool/domain]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 어려움을 겪다",
        "model": "have trouble with [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 문제가 있다",
        "model": "have a problem with [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~와 관련이 있다",
        "model": "have something to do with [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "to be related or connected to something"
      },
      {
        "cue": "~와 관련이 없다",
        "model": "have nothing to do with [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "to have no connection to something"
      },
      {
        "cue": "~을 염두에 두고 있다",
        "model": "have [thing] in mind",
        "tier": 1,
        "star": true,
        "easyEn": "to be thinking of or considering something"
      },
      {
        "cue": "~에 대해 전혀 모른다",
        "model": "have no idea about [thing]",
        "tier": 1
      },
      {
        "cue": "~하는 데 어려움을 겪다",
        "model": "have a hard time [-ing]",
        "tier": 1,
        "star": true,
        "easyEn": "to find something difficult to do"
      },
      {
        "cue": "~에 영향을 미치다",
        "model": "have an impact on [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~이 남아 있다",
        "model": "have [thing] left",
        "tier": 1,
        "star": true,
        "easyEn": "to still have some amount remaining"
      },
      {
        "cue": "~을 통제하고 있다",
        "model": "have [thing] under control",
        "tier": 2,
        "star": true,
        "easyEn": "to be managing something successfully"
      },
      {
        "cue": "~을 집에 초대하다",
        "model": "have [person] over",
        "tier": 2,
        "star": true,
        "easyEn": "to invite someone to your home"
      },
      {
        "cue": "입고 있다 / 일정이 있다",
        "model": "have [thing] on",
        "tier": 2,
        "star": true,
        "easyEn": "to be wearing something or have it scheduled"
      },
      {
        "cue": "~에게 악감정이 있다",
        "model": "have [thing] against [person]",
        "tier": 2,
        "easyEn": "to dislike someone for a reason"
      },
      {
        "cue": "~에게 ~하게 시키다",
        "model": "have [person] do [verb]",
        "tier": 2
      },
      {
        "cue": "~을 처리되게 하다",
        "model": "have [thing] done",
        "tier": 2
      },
      {
        "cue": "처리할 일이 많다",
        "model": "have a lot going on",
        "tier": 2,
        "easyEn": "to have many things happening or be very busy"
      },
      {
        "cue": "~에 발언권이 있다",
        "model": "have a say in [thing]",
        "tier": 2,
        "easyEn": "to have the right to share an opinion on a decision"
      },
      {
        "cue": "~에 영향을 끼치다",
        "model": "have an effect on [thing]",
        "tier": 2
      },
      {
        "cue": "~을 통제하다 / 좌우하다",
        "model": "have control over [thing]",
        "tier": 2
      },
      {
        "cue": "~와 잠깐 이야기하다 / 한마디 하다",
        "model": "have a word with [person]",
        "tier": 2,
        "easyEn": "to talk briefly with someone, often seriously"
      },
      {
        "cue": "~을 가동시키다 / 돌아가게 만들다",
        "model": "have [thing] up and running",
        "tier": 2,
        "easyEn": "to have something working and operating properly"
      },
      {
        "cue": "~에 이해관계가 있다",
        "model": "have a stake in [thing]",
        "tier": 2,
        "easyEn": "to have a personal interest or share in something"
      },
      {
        "cue": "~의 편이 되어주다 / 뒤를 봐주다",
        "model": "have [person]'s back",
        "tier": 2,
        "easyEn": "to support and protect someone"
      },
      {
        "cue": "~와 끝까지 따져서 해결하다",
        "model": "have it out with [person]",
        "tier": 3,
        "easyEn": "to argue openly to settle a disagreement"
      }
    ]
  },
  {
    "id": "do",
    "verb": "DO",
    "gloss": "do는 처리, 수행, 반복, 제거를 만든다.",
    "items": [
      {
        "cue": "~을 하다 / 처리하다",
        "model": "do [task]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 대해 조치를 취하다",
        "model": "do something about [problem]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에서 잘하다",
        "model": "do well in [area]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 대해 조사하다",
        "model": "do research on [topic]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~의 부탁을 들어주다",
        "model": "do [person] a favor",
        "tier": 1,
        "star": true,
        "easyEn": "to help someone by doing something for them"
      },
      {
        "cue": "~에서 못하다",
        "model": "do badly in [area]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 테스트하다",
        "model": "do testing on [system]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~와 거래하다",
        "model": "do business with [company/person]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~없이 지내다",
        "model": "do without [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "to manage even though you do not have something"
      },
      {
        "cue": "다시 하다",
        "model": "do over [task]",
        "tier": 2,
        "easyEn": "to do something again from the start"
      },
      {
        "cue": "~을 없애다",
        "model": "do away with [thing]",
        "tier": 2,
        "easyEn": "to get rid of or stop using something"
      },
      {
        "cue": "~와 관련 있다",
        "model": "have to do with [thing]",
        "tier": 2,
        "easyEn": "to be related or connected to something"
      },
      {
        "cue": "효과가 있다 / 문제를 해결하다",
        "model": "do the trick",
        "tier": 2,
        "easyEn": "to work and solve the problem"
      },
      {
        "cue": "~을 손으로/수동으로 하다",
        "model": "do [thing] by hand",
        "tier": 2,
        "easyEn": "to do something manually, not by machine"
      },
      {
        "cue": "잠그다 / 꾸미다",
        "model": "do up [button/zipper/room]",
        "tier": 3,
        "easyEn": "to fasten something, or to decorate a room"
      },
      {
        "cue": "~이 있으면 좋겠다",
        "model": "could do with [thing]",
        "tier": 3,
        "easyEn": "to want or need something"
      },
      {
        "cue": "~에게 공정하게 대하다",
        "model": "do right by [person]",
        "tier": 3,
        "easyEn": "to treat someone fairly and well"
      }
    ]
  },
  {
    "id": "make",
    "verb": "MAKE",
    "gloss": "make는 만들기, 결과, 보상, 의미를 만든다.",
    "items": [
      {
        "cue": "~을 만들다",
        "model": "make [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에게 ~하게 만들다",
        "model": "make [person] do [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 확실히 하다",
        "model": "make sure [that sentence]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "말이 되다",
        "model": "make sense",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 이해하다",
        "model": "make sense of [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "지어내다",
        "model": "make up [story/excuse]",
        "tier": 1,
        "star": true,
        "easyEn": "to invent a false story or excuse"
      },
      {
        "cue": "~에 도착하다 / 참석하다",
        "model": "make it to [place/event]",
        "tier": 1,
        "star": true,
        "easyEn": "to succeed in getting to a place or event"
      },
      {
        "cue": "변화를 가져오다 / 차이를 만들다",
        "model": "make a difference",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에서 진전을 이루다",
        "model": "make progress on [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 실현시키다 / 성사시키다",
        "model": "make [thing] happen",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~이 작동하게 만들다 / 통하게 하다",
        "model": "make [thing] work",
        "tier": 1,
        "star": true
      },
      {
        "cue": "결정을 내리다",
        "model": "make a decision",
        "tier": 1
      },
      {
        "cue": "~을 만회하다",
        "model": "make up for [loss/mistake]",
        "tier": 2,
        "star": true,
        "easyEn": "to do something to fix or balance a past mistake or loss"
      },
      {
        "cue": "겨우 알아보다 / 이해하다",
        "model": "make out [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "to barely see, hear, or understand something"
      },
      {
        "cue": "~을 ~로 만들다",
        "model": "make [thing] into [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 활용하다",
        "model": "make use of [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 위한 공간을 만들다",
        "model": "make room for [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 버텨내다",
        "model": "make it through [difficulty]",
        "tier": 2,
        "star": true,
        "easyEn": "to survive or reach the end of a hard time"
      },
      {
        "cue": "~로 어떻게든 버티다",
        "model": "make do with [thing]",
        "tier": 2,
        "easyEn": "manage using what you have, even if not enough"
      },
      {
        "cue": "~로 만들어져 있다",
        "model": "be made of [material]",
        "tier": 2
      },
      {
        "cue": "~을 원료로 만들어지다",
        "model": "be made from [material]",
        "tier": 2
      },
      {
        "cue": "~로 만들어져 있다",
        "model": "be made out of [material]",
        "tier": 2
      },
      {
        "cue": "결정을 내리다 / 전화를 걸다",
        "model": "make a call",
        "tier": 2
      },
      {
        "cue": "~을 최대한 활용하다",
        "model": "make the most of [thing]",
        "tier": 2,
        "easyEn": "use a situation or thing as well as possible"
      },
      {
        "cue": "~와 화해하다",
        "model": "make up with [person]",
        "tier": 2,
        "easyEn": "become friends again after an argument"
      },
      {
        "cue": "~로 향하다 / ~에 도움이 되다",
        "model": "make for [place/result]",
        "tier": 3,
        "easyEn": "to move toward a place, or to help create a result"
      },
      {
        "cue": "~을 훔쳐 달아나다",
        "model": "make off with [thing]",
        "tier": 3,
        "easyEn": "to steal something and quickly leave"
      }
    ]
  },
  {
    "id": "get",
    "verb": "GET",
    "gloss": "get은 영어에서 제일 큰 뼈대다. 얻다, 되다, 도착하다, 이해하다, 처리하다.",
    "items": [
      {
        "cue": "일어나다",
        "model": "get up",
        "tier": 1,
        "star": true
      },
      {
        "cue": "들어가다 / 도착하다",
        "model": "get in",
        "tier": 1,
        "star": true
      },
      {
        "cue": "들어가다 / 관심 갖다 / 빠지다",
        "model": "get into [place/topic]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "나가다",
        "model": "get out",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에서 나오다 / ~을 피하다",
        "model": "get out of [place/task]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "타다",
        "model": "get on [bus/train]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "내리다 / 퇴근하다",
        "model": "get off [bus/train/work]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "극복하다",
        "model": "get over [problem/person]",
        "tier": 1,
        "star": true,
        "easyEn": "recover from something upsetting or difficult"
      },
      {
        "cue": "끝까지 해내다",
        "model": "get through [task/difficulty]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "그럭저럭 지내다",
        "model": "get by",
        "tier": 1,
        "star": true,
        "easyEn": "manage to live or work with what you have"
      },
      {
        "cue": "~와 잘 지내다",
        "model": "get along with [person]",
        "tier": 1,
        "star": true,
        "easyEn": "have a friendly relationship with someone"
      },
      {
        "cue": "돌아오다",
        "model": "get back",
        "tier": 1,
        "star": true
      },
      {
        "cue": "나중에 다시 답하다",
        "model": "get back to [person]",
        "tier": 1,
        "star": true,
        "easyEn": "reply to someone later"
      },
      {
        "cue": "~에 익숙해지다",
        "model": "get used to [-ing/noun]",
        "tier": 1,
        "star": true,
        "easyEn": "become familiar with something over time"
      },
      {
        "cue": "~을 제거하다",
        "model": "get rid of [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "remove or throw away something you do not want"
      },
      {
        "cue": "시작하다",
        "model": "get started",
        "tier": 1,
        "star": true
      },
      {
        "cue": "막히다",
        "model": "get stuck",
        "tier": 1,
        "star": true
      },
      {
        "cue": "끝내다",
        "model": "get done",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~와 연락하다",
        "model": "get in touch with [person]",
        "tier": 1,
        "star": true,
        "easyEn": "contact or communicate with someone"
      },
      {
        "cue": "(~와) 모이다 / 만나다",
        "model": "get together (with [person])",
        "tier": 1,
        "star": true
      },
      {
        "cue": "돌아다니다 / 우회하다",
        "model": "get around [place/problem]",
        "tier": 2,
        "star": true,
        "easyEn": "move from place to place, or avoid a problem"
      },
      {
        "cue": "결국 시간을 내서 ~하다",
        "model": "get around to [-ing]",
        "tier": 2,
        "star": true,
        "easyEn": "finally find time to do something"
      },
      {
        "cue": "생각을 전달하다",
        "model": "get across [idea]",
        "tier": 2,
        "star": true,
        "easyEn": "make an idea clearly understood by others"
      },
      {
        "cue": "떠나다 / 도망가다",
        "model": "get away",
        "tier": 2
      },
      {
        "cue": "~하고도 처벌을 피하다",
        "model": "get away with [thing]",
        "tier": 2,
        "easyEn": "do something wrong without being caught or punished"
      },
      {
        "cue": "앞서가다",
        "model": "get ahead",
        "tier": 2,
        "easyEn": "make progress or succeed, especially at work"
      },
      {
        "cue": "뒤처지다",
        "model": "get behind",
        "tier": 2
      },
      {
        "cue": "~이 밀리다",
        "model": "get behind on [thing]",
        "tier": 2
      },
      {
        "cue": "~에 도착하다 / ~에게 영향을 주다",
        "model": "get to [place/person]",
        "tier": 2,
        "easyEn": "reach a place, or start to upset someone"
      },
      {
        "cue": "~을 의미하려 하다",
        "model": "get at [meaning]",
        "tier": 2,
        "easyEn": "try to express or suggest a meaning"
      },
      {
        "cue": "~와 잘 지내다 / ~을 계속 진행하다",
        "model": "get on with [person/task]",
        "tier": 2,
        "easyEn": "continue a task, or have a good relationship"
      },
      {
        "cue": "~에 본격적으로 착수하다",
        "model": "get down to [task/business]",
        "tier": 2,
        "star": true,
        "easyEn": "start seriously focusing on a task"
      },
      {
        "cue": "~을 빨리 끝내버리다",
        "model": "get [thing] over with",
        "tier": 2,
        "star": true,
        "easyEn": "finish something unpleasant as soon as possible"
      },
      {
        "cue": "~을 따라잡다 / 숙지하다",
        "model": "get up to speed on [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "learn what you need to know about something"
      },
      {
        "cue": "~의 요령을 터득하다",
        "model": "get the hang of [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "learn how to do something with practice"
      },
      {
        "cue": "~를 이해시키다 / ~와 연락이 닿다",
        "model": "get through to [person]",
        "tier": 2,
        "easyEn": "succeed in making someone understand you"
      },
      {
        "cue": "~에게 앙갚음하다 / 복수하다",
        "model": "get back at [person]",
        "tier": 2,
        "easyEn": "do something bad to someone who hurt you"
      },
      {
        "cue": "~을 장악하다 / 잘 관리하다",
        "model": "get on top of [thing]",
        "tier": 2,
        "easyEn": "gain control of something and manage it well"
      },
      {
        "cue": "~을 다시 시작하다 / ~에 다시 빠져들다",
        "model": "get back into [thing]",
        "tier": 2,
        "easyEn": "start doing or enjoying something again"
      },
      {
        "cue": "~와 연락이 닿다 / ~을 구하다",
        "model": "get a hold of [person/thing]",
        "tier": 2,
        "easyEn": "manage to contact someone or obtain something"
      },
      {
        "cue": "출발하다 / 시작하다",
        "model": "get going",
        "tier": 2
      },
      {
        "cue": "~에 끼다 / 동참하다",
        "model": "get in on [thing]",
        "tier": 3,
        "easyEn": "become involved in an activity others are doing"
      }
    ]
  },
  {
    "id": "go",
    "verb": "GO",
    "gloss": "go는 이동, 진행, 변화, 상태를 만든다.",
    "items": [
      {
        "cue": "나가다",
        "model": "go out",
        "tier": 1,
        "star": true
      },
      {
        "cue": "들어가다",
        "model": "go in",
        "tier": 1,
        "star": true
      },
      {
        "cue": "자세히 들어가다",
        "model": "go into [detail/topic]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "계속되다 / 발생하다",
        "model": "go on",
        "tier": 1,
        "star": true
      },
      {
        "cue": "검토하다",
        "model": "go over [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "review or examine something carefully"
      },
      {
        "cue": "겪다 / 자세히 살펴보다",
        "model": "go through [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "experience something, or examine it carefully"
      },
      {
        "cue": "돌아가다",
        "model": "go back",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~로 돌아가다",
        "model": "go back to [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "진행하다",
        "model": "go ahead",
        "tier": 1,
        "star": true
      },
      {
        "cue": "떠나다 / 사라지다",
        "model": "go away",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 선택하다",
        "model": "go with [option]",
        "tier": 1,
        "star": true,
        "easyEn": "choose or decide on an option"
      },
      {
        "cue": "올라가다",
        "model": "go up",
        "tier": 1,
        "star": true
      },
      {
        "cue": "내려가다 / 발생하다",
        "model": "go down",
        "tier": 1,
        "star": true
      },
      {
        "cue": "잘못되다 / 틀어지다",
        "model": "go wrong",
        "tier": 1,
        "star": true
      },
      {
        "cue": "돌아다니다",
        "model": "go around [place]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "지나가다 / ~에 따라 판단하다",
        "model": "go by",
        "tier": 2,
        "star": true,
        "easyEn": "pass by, or use something to decide or judge"
      },
      {
        "cue": "~을 선택하다 / 시도하다",
        "model": "go for [option/goal]",
        "tier": 2,
        "star": true,
        "easyEn": "choose something, or try hard to get it"
      },
      {
        "cue": "~에 어긋나다 / 반대하다",
        "model": "go against [rule/idea]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "알람이 울리다 / 폭발하다 / 상하다",
        "model": "go off",
        "tier": 2,
        "easyEn": "ring suddenly, explode, or become spoiled"
      },
      {
        "cue": "~없이 지내다",
        "model": "go without [thing]",
        "tier": 2
      },
      {
        "cue": "~을 추구하다 / 뒤쫓다",
        "model": "go after [goal/person]",
        "tier": 2
      },
      {
        "cue": "~에 동의하고 따르다",
        "model": "go along with [idea]",
        "tier": 2,
        "easyEn": "agree with or accept a plan or idea"
      },
      {
        "cue": "일부러 애쓰다",
        "model": "go out of [one’s way]",
        "tier": 2,
        "easyEn": "make a special effort to do something"
      },
      {
        "cue": "계획을 끝까지 실행하다",
        "model": "go through with [plan]",
        "tier": 2,
        "easyEn": "do something you planned, even if difficult"
      },
      {
        "cue": "~을 진행하다 / 추진하다",
        "model": "go ahead with [plan]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 어기다 / 번복하다",
        "model": "go back on [promise/word]",
        "tier": 2,
        "star": true,
        "easyEn": "fail to keep a promise you made"
      },
      {
        "cue": "~에 착수하다 / ~을 처리하다(방식)",
        "model": "go about [-ing/task]",
        "tier": 2,
        "star": true,
        "easyEn": "start dealing with a task in a certain way"
      },
      {
        "cue": "(서비스/기능이) 출시되다 / 가동되다",
        "model": "go live",
        "tier": 2,
        "easyEn": "start operating or become publicly available"
      },
      {
        "cue": "~와 사귀다 / 데이트하다",
        "model": "go out with [person]",
        "tier": 2,
        "easyEn": "have a romantic relationship with someone"
      },
      {
        "cue": "~에 맞서다 / 겨루다",
        "model": "go up against [opponent]",
        "tier": 2,
        "easyEn": "compete or fight against someone strong"
      },
      {
        "cue": "~를 살살 다루다 / 봐주다",
        "model": "go easy on [person]",
        "tier": 2,
        "easyEn": "treat someone gently and not too harshly"
      },
      {
        "cue": "~에 대해 계속 떠들다",
        "model": "go on about [thing]",
        "tier": 2,
        "easyEn": "keep talking about something for too long"
      },
      {
        "cue": "왔다 갔다 하다 / (의견을) 주고받다",
        "model": "go back and forth",
        "tier": 2,
        "easyEn": "move or switch repeatedly between two things"
      }
    ]
  },
  {
    "id": "come",
    "verb": "COME",
    "gloss": "come은 오다, 나오다, 발생하다, 결과적으로 ~되다.",
    "items": [
      {
        "cue": "들어오다",
        "model": "come in",
        "tier": 1,
        "star": true
      },
      {
        "cue": "나오다 / 공개되다",
        "model": "come out",
        "tier": 1,
        "star": true,
        "easyEn": "be released or become public"
      },
      {
        "cue": "생기다 / 언급되다",
        "model": "come up",
        "tier": 1,
        "star": true,
        "easyEn": "happen or be mentioned, often unexpectedly"
      },
      {
        "cue": "~을 생각해내다",
        "model": "come up with [idea/solution]",
        "tier": 1,
        "star": true,
        "easyEn": "think of or produce an idea or solution"
      },
      {
        "cue": "돌아오다",
        "model": "come back",
        "tier": 1,
        "star": true
      },
      {
        "cue": "들르다",
        "model": "come over",
        "tier": 1,
        "star": true,
        "easyEn": "come to someone's home to visit"
      },
      {
        "cue": "~에서 오다 / 비롯되다",
        "model": "come from [place/source]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "우연히 발견하다 / 마주치다",
        "model": "come across [thing/person]",
        "tier": 2,
        "star": true,
        "easyEn": "find or meet by chance"
      },
      {
        "cue": "해내다 / 전달되다",
        "model": "come through",
        "tier": 2,
        "star": true,
        "easyEn": "succeed or deliver what was promised"
      },
      {
        "cue": "~에 이르다",
        "model": "come to [amount/conclusion]",
        "tier": 2,
        "star": true,
        "easyEn": "add up to or reach a total or decision"
      },
      {
        "cue": "결국 ~의 문제로 귀결되다",
        "model": "come down to [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "be decided by one key factor"
      },
      {
        "cue": "~에서 나오다",
        "model": "come out of [place/situation]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에 들어오다 / 돈을 상속받다",
        "model": "come into [place/money]",
        "tier": 2,
        "star": true,
        "easyEn": "receive or inherit money"
      },
      {
        "cue": "함께 가다 / 진전되다",
        "model": "come along",
        "tier": 2,
        "easyEn": "go with someone; or make progress"
      },
      {
        "cue": "생각을 바꾸다 / 들르다",
        "model": "come around",
        "tier": 2,
        "easyEn": "change your mind to agree"
      },
      {
        "cue": "병에 걸리다",
        "model": "come down with [illness]",
        "tier": 2,
        "easyEn": "start to get an illness"
      },
      {
        "cue": "~이 딸려 오다",
        "model": "come with [thing]",
        "tier": 2,
        "easyEn": "be included along with something"
      },
      {
        "cue": "~라는 인상을 주다 / ~처럼 보이다",
        "model": "come off as [impression]",
        "tier": 2,
        "easyEn": "give a certain impression to others"
      },
      {
        "cue": "발생하다",
        "model": "come about",
        "tier": 3,
        "easyEn": "happen or occur"
      },
      {
        "cue": "~보다 먼저 오다 / 우선하다",
        "model": "come before [thing]",
        "tier": 3,
        "easyEn": "be presented to a group or person for a decision"
      },
      {
        "cue": "~을 뒤쫓다 / 공격하다",
        "model": "come after [person]",
        "tier": 3,
        "easyEn": "chase or try to harm someone"
      },
      {
        "cue": "(예상 못 한) 문제/장벽에 부딪히다",
        "model": "come up against [problem/obstacle]",
        "tier": 3,
        "easyEn": "face a problem or obstacle"
      },
      {
        "cue": "(제품·발표 등을) 내놓다 / 불쑥 말하다",
        "model": "come out with [statement/product]",
        "tier": 3,
        "easyEn": "release something; or suddenly say something"
      },
      {
        "cue": "~를 호되게 나무라다 / 강하게 단속하다",
        "model": "come down on [person]",
        "tier": 3,
        "easyEn": "criticize or punish someone harshly"
      },
      {
        "cue": "기대에 못 미치다 / 부족하다",
        "model": "come up short",
        "tier": 3,
        "easyEn": "fail to reach a goal or amount"
      }
    ]
  },
  {
    "id": "take",
    "verb": "TAKE",
    "gloss": "take는 잡다, 가져가다, 맡다, 시간이 걸리다, 받아들이다.",
    "items": [
      {
        "cue": "꺼내다 / 데리고 나가다",
        "model": "take out [thing/person]",
        "tier": 1,
        "star": true,
        "easyEn": "remove something; or take someone out socially"
      },
      {
        "cue": "맡다 / 떠안다",
        "model": "take on [task/responsibility]",
        "tier": 1,
        "star": true,
        "easyEn": "accept or start a new task"
      },
      {
        "cue": "벗다 / 쉬다 / 이륙하다",
        "model": "take off [clothes/time]",
        "tier": 1,
        "star": true,
        "easyEn": "remove clothes; leave; or depart"
      },
      {
        "cue": "넘겨받다 / 장악하다",
        "model": "take over [task/system]",
        "tier": 1,
        "star": true,
        "easyEn": "take control of a task or system"
      },
      {
        "cue": "가져가다 / 빼앗다",
        "model": "take away [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "처리하다 / 돌보다",
        "model": "take care of [thing/person]",
        "tier": 1,
        "star": true,
        "easyEn": "handle or look after something or someone"
      },
      {
        "cue": "~을 고려하다",
        "model": "take into account [factor]",
        "tier": 1,
        "star": true,
        "easyEn": "consider something when deciding"
      },
      {
        "cue": "~에 책임지다",
        "model": "take responsibility for [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "휴가를 내다",
        "model": "take time off",
        "tier": 1,
        "star": true
      },
      {
        "cue": "메모하다",
        "model": "take notes",
        "tier": 1,
        "star": true
      },
      {
        "cue": "한번 보다",
        "model": "take a look at [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "시간이 좀 걸리다",
        "model": "take a while",
        "tier": 1,
        "star": true
      },
      {
        "cue": "(일이) 일어나다 / (행사가) 열리다",
        "model": "take place",
        "tier": 1,
        "star": true,
        "easyEn": "happen or be held"
      },
      {
        "cue": "~을 활용하다 / ~을 (부당하게) 이용하다",
        "model": "take advantage of [thing/person]",
        "tier": 1,
        "star": true,
        "easyEn": "use an opportunity; or unfairly exploit someone"
      },
      {
        "cue": "~에 참여하다",
        "model": "take part in [activity]",
        "tier": 1,
        "star": true,
        "easyEn": "participate in an activity"
      },
      {
        "cue": "받아들이다 / 이해하다",
        "model": "take in [information/person]",
        "tier": 2,
        "star": true,
        "easyEn": "absorb and understand information"
      },
      {
        "cue": "시작하다 / 차지하다",
        "model": "take up [hobby/space/time]",
        "tier": 2,
        "star": true,
        "easyEn": "start a hobby; or fill space or time"
      },
      {
        "cue": "적다 / 내리다",
        "model": "take down [notes/system]",
        "tier": 2,
        "star": true,
        "easyEn": "write down; or remove and shut down"
      },
      {
        "cue": "돌려받다 / 취소하다",
        "model": "take back [thing/words]",
        "tier": 2,
        "star": true,
        "easyEn": "return something; or retract what you said"
      },
      {
        "cue": "~을 닮다",
        "model": "take after [person]",
        "tier": 2,
        "easyEn": "look or behave like a relative"
      },
      {
        "cue": "분해하다",
        "model": "take apart [thing]",
        "tier": 2
      },
      {
        "cue": "~에게 과정을 설명하다",
        "model": "take [person] through [process]",
        "tier": 2,
        "easyEn": "explain a process step by step"
      },
      {
        "cue": "~에서 가져오다",
        "model": "take [thing] from [source]",
        "tier": 2
      },
      {
        "cue": "~을 ~로 가져가다",
        "model": "take [thing] to [place/person]",
        "tier": 2
      },
      {
        "cue": "제안을 받아들이다",
        "model": "take [person] up on [offer]",
        "tier": 2,
        "easyEn": "accept someone's offer or invitation"
      },
      {
        "cue": "(문제·안건을) ~에게 제기하다 / 상의하다",
        "model": "take [thing] up with [person]",
        "tier": 2,
        "easyEn": "raise an issue with someone"
      },
      {
        "cue": "~에게 화풀이하다",
        "model": "take it out on [person]",
        "tier": 2,
        "easyEn": "unfairly direct your anger at someone"
      },
      {
        "cue": "~를 대신해 (일을) 맡다",
        "model": "take over for [person]",
        "tier": 2,
        "easyEn": "do someone's job in their place"
      },
      {
        "cue": "~을 당연하게 여기다",
        "model": "take [thing] for granted",
        "tier": 2,
        "easyEn": "fail to appreciate what you have"
      },
      {
        "cue": "~을 책임지고 맡다 / 주도하다",
        "model": "take charge of [thing]",
        "tier": 2,
        "easyEn": "take control and lead something"
      },
      {
        "cue": "~에 자부심을 갖다",
        "model": "take pride in [thing/-ing]",
        "tier": 2,
        "easyEn": "feel proud of something"
      }
    ]
  },
  {
    "id": "give",
    "verb": "GIVE",
    "gloss": "give는 주다, 양보하다, 포기하다, 발생시키다.",
    "items": [
      {
        "cue": "포기하다",
        "model": "give up",
        "tier": 1,
        "star": true,
        "easyEn": "stop trying"
      },
      {
        "cue": "~를 도와주다",
        "model": "give [person] a hand",
        "tier": 1,
        "star": true,
        "easyEn": "help someone"
      },
      {
        "cue": "~에 피드백을 주다",
        "model": "give feedback on [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "한번 해보다",
        "model": "give it a try",
        "tier": 1,
        "star": true,
        "easyEn": "attempt something"
      },
      {
        "cue": "~에게 업데이트를 주다",
        "model": "give [person] an update on [thing]",
        "tier": 1
      },
      {
        "cue": "~에 대한 기대를 접다 / ~을 단념하다",
        "model": "give up on [person/thing]",
        "tier": 1,
        "star": true,
        "easyEn": "stop hoping for someone or something"
      },
      {
        "cue": "~에게 미리 귀띔해주다 / 알려주다",
        "model": "give [person] a heads-up",
        "tier": 1,
        "star": true,
        "easyEn": "warn someone in advance"
      },
      {
        "cue": "굴복하다 / 양보하다",
        "model": "give in",
        "tier": 2,
        "star": true,
        "easyEn": "stop resisting and agree"
      },
      {
        "cue": "나눠주다 / 고갈되다",
        "model": "give out [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "hand out; or stop working"
      },
      {
        "cue": "공짜로 주다 / 폭로하다",
        "model": "give away [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "give for free; or reveal a secret"
      },
      {
        "cue": "돌려주다",
        "model": "give back [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "냄새/빛/열을 내다",
        "model": "give off [smell/light/heat]",
        "tier": 2,
        "star": true,
        "easyEn": "send out smell, light, or heat"
      },
      {
        "cue": "~에 대해 발표하다",
        "model": "give a presentation on [topic]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에게 접근 권한을 주다",
        "model": "give access to [person]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에게 공을 인정하다",
        "model": "give [person] credit for [thing]",
        "tier": 2,
        "easyEn": "acknowledge someone's good work"
      },
      {
        "cue": "~에게 허락하다",
        "model": "give [person] permission to [verb]",
        "tier": 2
      },
      {
        "cue": "~에 굴복하다 / 못 이기다",
        "model": "give in to [pressure/temptation]",
        "tier": 2,
        "easyEn": "stop resisting pressure or temptation"
      },
      {
        "cue": "~을 좀 생각해보다 / 고민해보다",
        "model": "give [thing] some thought",
        "tier": 2,
        "easyEn": "think carefully about something"
      },
      {
        "cue": "~를 일단 선의로 봐주다 / 믿어주다",
        "model": "give [person] the benefit of the doubt",
        "tier": 2,
        "easyEn": "choose to trust someone despite doubt"
      },
      {
        "cue": "(지역사회 등에) 환원하다 / 베풀다",
        "model": "give back to [community]",
        "tier": 2,
        "easyEn": "help your community in return"
      },
      {
        "cue": "(퇴사·해지를) 미리 통보하다",
        "model": "give notice",
        "tier": 2,
        "easyEn": "formally announce you are quitting"
      },
      {
        "cue": "~을 초래하다",
        "model": "give rise to [problem/result]",
        "tier": 3,
        "easyEn": "cause something to happen"
      },
      {
        "cue": "~에게 길을 내주다 / ~로 바뀌다",
        "model": "give way to [thing]",
        "tier": 3,
        "easyEn": "be replaced by something; or stop resisting it"
      }
    ]
  },
  {
    "id": "put",
    "verb": "PUT",
    "gloss": "put은 놓다, 넣다, 배치하다, 미루다, 참다.",
    "items": [
      {
        "cue": "입다 / 틀다",
        "model": "put on [clothes/music]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "미루다",
        "model": "put off [task/event]",
        "tier": 1,
        "star": true,
        "easyEn": "delay something to a later time"
      },
      {
        "cue": "참고 견디다",
        "model": "put up with [thing/person]",
        "tier": 1,
        "star": true,
        "easyEn": "accept something unpleasant without complaining"
      },
      {
        "cue": "내려놓다 / 적다",
        "model": "put down [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "제자리에 돌려놓다",
        "model": "put back [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "치우다",
        "model": "put away [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "조립하다 / 준비하다",
        "model": "put together [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 ~에 넣다",
        "model": "put [thing] into [place/system]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "끄다 / 내놓다",
        "model": "put out [fire/message]",
        "tier": 2,
        "star": true,
        "easyEn": "stop a fire burning; or publicly release something"
      },
      {
        "cue": "올리다 / 게시하다",
        "model": "put up [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "build, hang, or display something"
      },
      {
        "cue": "투입하다 / 제출하다",
        "model": "put in [effort/time/request]",
        "tier": 2,
        "star": true,
        "easyEn": "contribute time or effort; or submit a request"
      },
      {
        "cue": "제안하다",
        "model": "put forward [idea/proposal]",
        "tier": 2,
        "star": true,
        "easyEn": "suggest an idea or plan for consideration"
      },
      {
        "cue": "제쳐두다 / 따로 빼두다",
        "model": "put aside [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "save it for later, or stop considering it"
      },
      {
        "cue": "~를 힘들게 하다",
        "model": "put [person] through [difficulty]",
        "tier": 2,
        "easyEn": "make someone experience something hard"
      },
      {
        "cue": "전화 연결해주다",
        "model": "put [person] through to [person]",
        "tier": 2,
        "easyEn": "connect someone by phone to another person"
      },
      {
        "cue": "~을 뒤로하고 잊다",
        "model": "put behind [thing]",
        "tier": 2,
        "easyEn": "stop letting a bad past event affect you"
      },
      {
        "cue": "~을 보류하다",
        "model": "put [thing] on hold",
        "tier": 2,
        "easyEn": "pause or delay something for now"
      },
      {
        "cue": "~을 마련하다 / 적용하다",
        "model": "put [thing] in place",
        "tier": 2,
        "easyEn": "create or arrange something so it is ready to use"
      },
      {
        "cue": "~에 압박을 가하다",
        "model": "put pressure on [person/thing]",
        "tier": 2
      },
      {
        "cue": "~을 중단시키다 / 끝장내다",
        "model": "put a stop to [thing]",
        "tier": 2
      },
      {
        "cue": "~을 균형 있게 / 제대로 보게 하다",
        "model": "put [thing] in perspective",
        "tier": 2,
        "easyEn": "see something's real importance by comparing it"
      },
      {
        "cue": "다시 말하면 / 바꿔 말하면",
        "model": "put it another way",
        "tier": 2,
        "easyEn": "say the same thing in different words"
      },
      {
        "cue": "생각을 전달하다",
        "model": "put across [idea]",
        "tier": 3,
        "easyEn": "explain an idea so people understand it"
      },
      {
        "cue": "(휴가·승진 등을) 신청하다",
        "model": "put in for [thing]",
        "tier": 3,
        "easyEn": "formally apply or request something"
      },
      {
        "cue": "~을 정확히 짚어내다",
        "model": "put one's finger on [thing]",
        "tier": 3,
        "easyEn": "identify exactly what is wrong or different"
      }
    ]
  },
  {
    "id": "set",
    "verb": "SET",
    "gloss": "set은 설정하다, 준비하다, 시작시키다, 따로 두다.",
    "items": [
      {
        "cue": "설정하다 / 준비하다",
        "model": "set up [system/meeting/environment]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "제시하다 / 출발하다",
        "model": "set out [goal/plan]",
        "tier": 2,
        "star": true,
        "easyEn": "clearly describe or explain a plan or goal"
      },
      {
        "cue": "울리게 하다 / 촉발하다 / 출발하다",
        "model": "set off [alarm/event]",
        "tier": 2,
        "star": true,
        "easyEn": "cause something to start, like an alarm"
      },
      {
        "cue": "따로 빼두다",
        "model": "set aside [time/money]",
        "tier": 2,
        "star": true,
        "easyEn": "save time or money for a purpose"
      },
      {
        "cue": "지연시키다",
        "model": "set back [schedule/person]",
        "tier": 2,
        "star": true,
        "easyEn": "delay progress; or cost someone money"
      },
      {
        "cue": "값을 ~로 설정하다",
        "model": "set [value] to [number]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에게 ~을 마련해주다 / 소개해주다",
        "model": "set [person] up with [thing/person]",
        "tier": 2,
        "star": true,
        "easyEn": "arrange for someone to meet or get something"
      },
      {
        "cue": "~을 ~시각으로 잡다",
        "model": "set [thing] for [time/date]",
        "tier": 2
      },
      {
        "cue": "~을 ~위에 놓다",
        "model": "set [thing] on [surface]",
        "tier": 2
      },
      {
        "cue": "풀어주다",
        "model": "set [person] free",
        "tier": 2
      },
      {
        "cue": "~하려고 착수하다 / 작정하고 ~하다",
        "model": "set out to [verb]",
        "tier": 2,
        "easyEn": "begin with a clear goal to do something"
      },
      {
        "cue": "~가 성공/실패하도록 만들다",
        "model": "set [person] up for [success/failure]",
        "tier": 2,
        "easyEn": "put someone in a position likely to succeed or fail"
      },
      {
        "cue": "기대치를 설정하다 / 미리 합의하다",
        "model": "set expectations",
        "tier": 2
      },
      {
        "cue": "~을 진행시키다 / 가동하다",
        "model": "set [thing] in motion",
        "tier": 2,
        "easyEn": "start a process or chain of events"
      },
      {
        "cue": "~을 위한 발판을 마련하다",
        "model": "set the stage for [thing]",
        "tier": 2,
        "easyEn": "create the right conditions for something to happen"
      },
      {
        "cue": "선례를 남기다",
        "model": "set a precedent",
        "tier": 2,
        "easyEn": "do something that becomes an example for the future"
      },
      {
        "cue": "내려놓다 / 적다",
        "model": "set down [thing]",
        "tier": 3,
        "star": true,
        "easyEn": "put something down on a surface"
      },
      {
        "cue": "~하기 시작하다",
        "model": "set about [-ing]",
        "tier": 3,
        "star": true,
        "easyEn": "start doing a task"
      },
      {
        "cue": "시작되다",
        "model": "set in",
        "tier": 3,
        "easyEn": "begin and likely continue, often something bad"
      },
      {
        "cue": "구별되게 만들다",
        "model": "set apart [thing]",
        "tier": 3,
        "easyEn": "make someone or something clearly different"
      },
      {
        "cue": "~와 ~를 대립시키다",
        "model": "set [person] against [person]",
        "tier": 3,
        "easyEn": "make two people oppose each other"
      }
    ]
  },
  {
    "id": "keep",
    "verb": "KEEP",
    "gloss": "keep은 유지하다, 계속하다, 막다, 기록하다.",
    "items": [
      {
        "cue": "유지하다 / 따라가다",
        "model": "keep up",
        "tier": 1,
        "star": true,
        "easyEn": "continue at the same pace or level"
      },
      {
        "cue": "~을 따라가다",
        "model": "keep up with [person/work]",
        "tier": 1,
        "star": true,
        "easyEn": "stay at the same level or pace as something"
      },
      {
        "cue": "~을 추적하다 / 기록하다",
        "model": "keep track of [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "stay aware of or record something over time"
      },
      {
        "cue": "~을 명심하다",
        "model": "keep in mind [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 지켜보다",
        "model": "keep an eye on [thing/person]",
        "tier": 1,
        "star": true,
        "easyEn": "watch something carefully over time"
      },
      {
        "cue": "계속하다",
        "model": "keep going",
        "tier": 1,
        "star": true
      },
      {
        "cue": "계속 ~하다",
        "model": "keep on [-ing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "들어오지 못하게 하다",
        "model": "keep out [person/thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 피하다",
        "model": "keep away from [thing/person]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "숨기다 / 막다",
        "model": "keep back [information/person]",
        "tier": 2,
        "star": true,
        "easyEn": "hold something back, or hide information"
      },
      {
        "cue": "낮게 유지하다",
        "model": "keep down [cost/noise]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에 접근하지 않다 / 피하다",
        "model": "keep off [grass/topic]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~가 ~하지 못하게 막다",
        "model": "keep [person] from [-ing]",
        "tier": 2,
        "star": true,
        "easyEn": "stop someone or something from doing something"
      },
      {
        "cue": "~을 지키다",
        "model": "keep to [schedule/plan]",
        "tier": 2,
        "star": true,
        "easyEn": "follow a plan or schedule without changing"
      },
      {
        "cue": "~을 통제하다",
        "model": "keep [thing] under control",
        "tier": 2
      },
      {
        "cue": "계속 알려주다",
        "model": "keep [person] posted",
        "tier": 2,
        "easyEn": "regularly tell someone about new developments"
      },
      {
        "cue": "~을 동기화 상태로 유지하다",
        "model": "keep [thing] in sync",
        "tier": 2,
        "easyEn": "keep two things matching and updated together"
      },
      {
        "cue": "~에게 계속 정보를 공유하다 / 상황을 알려주다",
        "model": "keep [person] in the loop",
        "tier": 2,
        "star": true,
        "easyEn": "keep someone informed and included in updates"
      },
      {
        "cue": "~을 빈틈없이 챙기다 / 뒤처지지 않게 관리하다",
        "model": "keep on top of [thing]",
        "tier": 2,
        "easyEn": "manage something well so nothing is missed or late"
      },
      {
        "cue": "~을 꾸준히 계속하다 / 매달리다",
        "model": "keep at [it/thing]",
        "tier": 2,
        "easyEn": "continue working hard at something without stopping"
      },
      {
        "cue": "~을 혼자만 알다 / 비밀로 하다",
        "model": "keep [thing] to oneself",
        "tier": 2,
        "easyEn": "keep something private and not tell others"
      },
      {
        "cue": "~을 최신 상태로 유지하다",
        "model": "keep [thing] up to date",
        "tier": 2,
        "easyEn": "keep something current with the newest information"
      },
      {
        "cue": "~을 계속 주시하다 / 파악하다",
        "model": "keep tabs on [thing/person]",
        "tier": 2,
        "easyEn": "watch or check on something regularly"
      }
    ]
  },
  {
    "id": "let",
    "verb": "LET",
    "gloss": "let은 허락하다, 내버려두다, 놓아주다.",
    "items": [
      {
        "cue": "들여보내다",
        "model": "let [person] in",
        "tier": 1,
        "star": true
      },
      {
        "cue": "내보내다",
        "model": "let [person] out",
        "tier": 1,
        "star": true
      },
      {
        "cue": "실망시키다",
        "model": "let [person] down",
        "tier": 1,
        "star": true,
        "easyEn": "fail someone who was depending on you"
      },
      {
        "cue": "놓아주다",
        "model": "let go of [thing/person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "알려주다",
        "model": "let [person] know",
        "tier": 1,
        "star": true
      },
      {
        "cue": "약해지다",
        "model": "let up",
        "tier": 2,
        "star": true,
        "easyEn": "become weaker or less intense"
      },
      {
        "cue": "봐주다 / 처벌하지 않다",
        "model": "let [person] off",
        "tier": 2,
        "star": true,
        "easyEn": "decide not to punish someone"
      },
      {
        "cue": "들여보내다 / 비밀을 알려주다",
        "model": "let [person] into [place/secret]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "지나가게 해주다",
        "model": "let [person] through",
        "tier": 2
      },
      {
        "cue": "~에게 비밀을 알려주다",
        "model": "let [person] in on [secret]",
        "tier": 2,
        "easyEn": "tell someone a secret or private information"
      },
      {
        "cue": "포기하다 / 놓아주다",
        "model": "let [thing] go",
        "tier": 2,
        "easyEn": "stop trying to keep or control something"
      },
      {
        "cue": "~가 처리하게 두다",
        "model": "let [person] handle [thing]",
        "tier": 2
      },
      {
        "cue": "내색하다 / (비밀·아는 것을) 흘리다",
        "model": "let on (that [clause])",
        "tier": 3,
        "easyEn": "show that you know a secret"
      },
      {
        "cue": "~를 봐주다 / 책임을 면하게 해주다",
        "model": "let [person] off the hook",
        "tier": 3,
        "easyEn": "free someone from blame or responsibility"
      }
    ]
  },
  {
    "id": "leave",
    "verb": "LEAVE",
    "gloss": "leave는 떠나다, 남기다, 빼다, 맡기다.",
    "items": [
      {
        "cue": "빼다 / 누락하다",
        "model": "leave out [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "남겨두다",
        "model": "leave behind [thing/person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~로 떠나다",
        "model": "leave for [place]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 빼놓다",
        "model": "leave [thing] out",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 혼자 두다",
        "model": "leave [person] alone",
        "tier": 1
      },
      {
        "cue": "중단하다",
        "model": "leave off [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "stop at a certain point"
      },
      {
        "cue": "~에서 출발하다",
        "model": "leave from [place]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 ~에 두고 가다",
        "model": "leave [thing] in [place]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 ~에게 맡기다",
        "model": "leave [thing] with [person]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 ~에게 맡기다",
        "model": "leave [thing] to [person]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에게 맡기다",
        "model": "leave it up to [person]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 일단 제쳐두다",
        "model": "leave aside [issue]",
        "tier": 2
      },
      {
        "cue": "~을 열어두다 / 미결로 두다",
        "model": "leave [thing] open",
        "tier": 2
      },
      {
        "cue": "~에게 인상을 남기다",
        "model": "leave [person] with [impression]",
        "tier": 2
      },
      {
        "cue": "~을 ~에서 빼다 / 제외하다 (\"leave me out of this\")",
        "model": "leave [person/thing] out of [thing]",
        "tier": 2
      }
    ]
  },
  {
    "id": "bring",
    "verb": "BRING",
    "gloss": "bring은 가져오다, 꺼내다, 유발하다.",
    "items": [
      {
        "cue": "언급하다 / 제기하다",
        "model": "bring up [topic/issue]",
        "tier": 1,
        "star": true,
        "easyEn": "start talking about a subject"
      },
      {
        "cue": "데려오다 / 도입하다",
        "model": "bring in [person/tool/idea]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "되돌리다 / 다시 가져오다",
        "model": "bring back [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 ~에게 가져오다",
        "model": "bring [thing] to [place/person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "드러내다",
        "model": "bring out [quality/result]",
        "tier": 2,
        "star": true,
        "easyEn": "make a quality become easy to notice"
      },
      {
        "cue": "가져오다 / 데려오다",
        "model": "bring over [thing/person]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "데리고 오다 / 가져오다",
        "model": "bring along [thing/person]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "낮추다 / 무너뜨리다",
        "model": "bring down [cost/system]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "모으다",
        "model": "bring together [people/things]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "초래하다",
        "model": "bring about [change/result]",
        "tier": 2,
        "star": true,
        "easyEn": "cause something to happen"
      },
      {
        "cue": "~를 논의/프로젝트에 참여시키다",
        "model": "bring [person] into [discussion/project]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 가지고 오다",
        "model": "bring [thing] with [person]",
        "tier": 2
      },
      {
        "cue": "제안하다 / 날짜를 앞당기다",
        "model": "bring forward [idea/date]",
        "tier": 2,
        "easyEn": "move an event to an earlier time"
      },
      {
        "cue": "~을 ~에게 (의제로) 꺼내다 / 이야기를 꺼내다",
        "model": "bring [thing] up with [person]",
        "tier": 2,
        "easyEn": "start discussing a subject with someone"
      },
      {
        "cue": "~에게 상황을 파악시키다 / 최신 정보를 공유하다",
        "model": "bring [person] up to speed (on [thing])",
        "tier": 2,
        "easyEn": "give someone the latest information they need"
      },
      {
        "cue": "설득해서 마음을 바꾸게 하다",
        "model": "bring [person] around",
        "tier": 3,
        "easyEn": "persuade someone to change their opinion"
      }
    ]
  },
  {
    "id": "turn",
    "verb": "TURN",
    "gloss": "turn은 방향, 변화, 작동, 결과를 만든다.",
    "items": [
      {
        "cue": "켜다",
        "model": "turn on [device]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "끄다",
        "model": "turn off [device]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "키우다 / 나타나다",
        "model": "turn up [volume/person]",
        "tier": 1,
        "star": true,
        "easyEn": "raise the volume; or arrive or appear unexpectedly"
      },
      {
        "cue": "낮추다 / 거절하다",
        "model": "turn down [volume/offer]",
        "tier": 1,
        "star": true,
        "easyEn": "lower the volume; or reject an offer or request"
      },
      {
        "cue": "결과가 ~로 드러나다",
        "model": "turn out",
        "tier": 1,
        "star": true,
        "easyEn": "end up happening in a certain way"
      },
      {
        "cue": "알고 보니 ~이다",
        "model": "turn out to be [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "be found to actually be something"
      },
      {
        "cue": "~로 변하다",
        "model": "turn into [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 의지하다",
        "model": "turn to [person/tool]",
        "tier": 1,
        "star": true,
        "easyEn": "go to someone or something for help"
      },
      {
        "cue": "제출하다",
        "model": "turn in [assignment]",
        "tier": 2,
        "star": true,
        "easyEn": "submit or deliver completed work"
      },
      {
        "cue": "상황을 개선하다 / 방향을 돌리다",
        "model": "turn around [situation]",
        "tier": 2,
        "star": true,
        "easyEn": "change a bad situation into a good one"
      },
      {
        "cue": "뒤집다 / 넘기다",
        "model": "turn over [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "flip it; or hand it to someone"
      },
      {
        "cue": "~에 등을 돌리다",
        "model": "turn against [person/idea]",
        "tier": 2,
        "star": true,
        "easyEn": "stop supporting and start opposing someone"
      },
      {
        "cue": "돌려보내다",
        "model": "turn away [person]",
        "tier": 2,
        "easyEn": "refuse to let someone enter or stay"
      },
      {
        "cue": "되돌아가다",
        "model": "turn back",
        "tier": 2
      },
      {
        "cue": "A에서 B로 바뀌다",
        "model": "turn from A to B",
        "tier": 2
      },
      {
        "cue": "~쪽으로 향하다",
        "model": "turn toward [thing]",
        "tier": 2
      },
      {
        "cue": "~을 ~에게 넘기다",
        "model": "turn [thing] over to [person]",
        "tier": 2,
        "easyEn": "hand control or responsibility to someone"
      },
      {
        "cue": "(작업·요청을) 빨리 처리해서 넘기다 / 완료해 돌려주다",
        "model": "turn [thing] around",
        "tier": 2,
        "easyEn": "finish and return work quickly"
      }
    ]
  },
  {
    "id": "run",
    "verb": "RUN",
    "gloss": "run은 달리다, 실행하다, 운영하다, 문제를 만나다.",
    "items": [
      {
        "cue": "문제를 만나다 / 우연히 마주치다",
        "model": "run into [problem/person]",
        "tier": 1,
        "star": true,
        "easyEn": "meet by chance; or hit a problem"
      },
      {
        "cue": "~이 다 떨어지다",
        "model": "run out of [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "use all of something until none remains"
      },
      {
        "cue": "빠르게 검토하다 / 설명하다",
        "model": "run through [plan/process]",
        "tier": 1,
        "star": true,
        "easyEn": "quickly review or go over something"
      },
      {
        "cue": "~에게 의견을 물어보다",
        "model": "run by [person]",
        "tier": 1,
        "star": true,
        "easyEn": "tell someone to get their opinion or approval"
      },
      {
        "cue": "도망가다",
        "model": "run away",
        "tier": 1,
        "star": true
      },
      {
        "cue": "쿼리/테스트/스크립트를 실행하다",
        "model": "run [query/test/script]",
        "tier": 1
      },
      {
        "cue": "시간을 초과하다 / 차로 치다",
        "model": "run over [time/person]",
        "tier": 2,
        "star": true,
        "easyEn": "go past a time limit; or hit with a vehicle"
      },
      {
        "cue": "~로 작동하다",
        "model": "run on [system/fuel]",
        "tier": 2,
        "star": true,
        "easyEn": "work using a particular power source or fuel"
      },
      {
        "cue": "~에서 도망치다 / ~에서 실행되다",
        "model": "run from [thing/place]",
        "tier": 2,
        "star": true,
        "easyEn": "escape from; or operate from a place"
      },
      {
        "cue": "돌아다니다",
        "model": "run around [place]",
        "tier": 2,
        "star": true,
        "easyEn": "move about busily doing many things"
      },
      {
        "cue": "우연히 발견하다",
        "model": "run across [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "find something by chance"
      },
      {
        "cue": "닳다 / 약해지다",
        "model": "run down [battery/system]",
        "tier": 2,
        "star": true,
        "easyEn": "lose power or become weak"
      },
      {
        "cue": "문제에 부딪히다",
        "model": "run up against [problem]",
        "tier": 2,
        "star": true,
        "easyEn": "meet a difficulty or obstacle"
      },
      {
        "cue": "뒤쫓다",
        "model": "run after [person]",
        "tier": 2
      },
      {
        "cue": "선거에 출마하다",
        "model": "run for [position]",
        "tier": 2,
        "easyEn": "compete to be elected to a position"
      },
      {
        "cue": "~에게 도움을 청하러 가다",
        "model": "run to [person]",
        "tier": 2,
        "easyEn": "go to someone for help or support"
      },
      {
        "cue": "(아이디어를) 그대로 밀고 나가다 / 추진하다",
        "model": "run with [idea/plan]",
        "tier": 2,
        "easyEn": "accept an idea and develop it further"
      },
      {
        "cue": "~에게 (확인차) 보여주고 의견을 묻다",
        "model": "run [thing] past [person]",
        "tier": 2,
        "easyEn": "show someone to get their opinion or approval"
      },
      {
        "cue": "(시스템을) 가동시키다 / 정상 작동하게 하다",
        "model": "get [system] up and running",
        "tier": 2,
        "easyEn": "make something working and fully operational"
      },
      {
        "cue": "집안 내력이다",
        "model": "run in [family]",
        "tier": 3,
        "easyEn": "be common in a family and passed from parents to children"
      }
    ]
  },
  {
    "id": "work",
    "verb": "WORK",
    "gloss": "work는 일하다, 작동하다, 해결하다, 협업하다.",
    "items": [
      {
        "cue": "~작업을 하다",
        "model": "work on [task/project]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~와 일하다 / ~을 다루다",
        "model": "work with [person/tool]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에서 일하다 / ~에게 효과가 있다",
        "model": "work for [company/person]",
        "tier": 1,
        "star": true,
        "easyEn": "be employed by; or be acceptable to someone"
      },
      {
        "cue": "~분야/장소에서 일하다",
        "model": "work in [field/place]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "해결되다 / 운동하다",
        "model": "work out",
        "tier": 1,
        "star": true,
        "easyEn": "exercise; or end up resolved successfully"
      },
      {
        "cue": "~을 해결하다 / 계산하다",
        "model": "work [thing] out",
        "tier": 1,
        "star": true,
        "easyEn": "solve or figure something out"
      },
      {
        "cue": "제한을 우회하다",
        "model": "work around [limitation]",
        "tier": 1,
        "star": true,
        "easyEn": "find a way to avoid a problem"
      },
      {
        "cue": "~을 향해 노력하다",
        "model": "work toward [goal]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "재택근무하다",
        "model": "work from home",
        "tier": 1,
        "star": true
      },
      {
        "cue": "차근차근 해결하다",
        "model": "work through [problem]",
        "tier": 2,
        "star": true,
        "easyEn": "study material from start to finish"
      },
      {
        "cue": "~에 불리하게 작용하다",
        "model": "work against [goal/person]",
        "tier": 2,
        "star": true,
        "easyEn": "make success harder for someone or something"
      },
      {
        "cue": "~아래에서 일하다",
        "model": "work under [condition/person]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "갚다 / 소모하다",
        "model": "work off [debt/calories]",
        "tier": 2,
        "easyEn": "reduce something through effort or activity"
      },
      {
        "cue": "점점 ~수준에 도달하다",
        "model": "work up to [level]",
        "tier": 2,
        "easyEn": "gradually build up to a higher level"
      },
      {
        "cue": "계산해보니 ~가 되다",
        "model": "work out to [amount]",
        "tier": 2,
        "easyEn": "add up to a total amount"
      },
      {
        "cue": "자료를 끝까지 공부하다",
        "model": "work through [book/material]",
        "tier": 2,
        "easyEn": "study material from start to finish"
      },
      {
        "cue": "~와 (협의해서) 해결하다 / 합의를 보다",
        "model": "work [thing] out with [person]",
        "tier": 2,
        "easyEn": "reach an agreement with someone by discussing"
      },
      {
        "cue": "(초안·견적·제안서를) 작성하다 / 준비해내다",
        "model": "work up [draft/estimate/proposal]",
        "tier": 2,
        "easyEn": "prepare or create a document or estimate"
      },
      {
        "cue": "~와 함께(나란히) 일하다 / 협업하다",
        "model": "work alongside [person/team]",
        "tier": 2
      },
      {
        "cue": "~을 (일정·계획에) 끼워 넣다 / 반영하다",
        "model": "work [thing] into [schedule/plan]",
        "tier": 2,
        "easyEn": "fit something into a schedule or plan"
      }
    ]
  },
  {
    "id": "look",
    "verb": "LOOK",
    "gloss": "look은 보기, 찾기, 조사하기, 기대하기의 핵심이다.",
    "items": [
      {
        "cue": "~을 보다 / 살펴보다",
        "model": "look at [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 찾다",
        "model": "look for [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 조사하다",
        "model": "look into [issue]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "찾아보다",
        "model": "look up [word/info]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "조심하다",
        "model": "look out",
        "tier": 1,
        "star": true,
        "easyEn": "be careful; watch for danger"
      },
      {
        "cue": "~을 기대하다",
        "model": "look forward to [-ing/noun]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~처럼 보이다",
        "model": "look like [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "훑어보다 / 검토하다",
        "model": "look over [document]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "자세히 훑어보다",
        "model": "look through [document/list]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "돌보다 / 관리하다",
        "model": "look after [person/thing]",
        "tier": 2,
        "star": true,
        "easyEn": "take care of someone or something"
      },
      {
        "cue": "~을 돌아보다",
        "model": "look back on [time/event]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "깔보다",
        "model": "look down on [person]",
        "tier": 2,
        "star": true,
        "easyEn": "think someone is less important than you"
      },
      {
        "cue": "존경하다",
        "model": "look up to [person]",
        "tier": 2,
        "star": true,
        "easyEn": "respect and admire someone"
      },
      {
        "cue": "마치 ~처럼 보이다",
        "model": "look as if [sentence]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "둘러보다",
        "model": "look around [place]",
        "tier": 2
      },
      {
        "cue": "시선을 돌리다",
        "model": "look away",
        "tier": 2
      },
      {
        "cue": "~을 조심하다 / 챙기다",
        "model": "look out for [thing/person]",
        "tier": 2
      },
      {
        "cue": "~에게 ~을 기대하다",
        "model": "look to [person] for [thing]",
        "tier": 2
      },
      {
        "cue": "~을 내다보다 / 앞날을 계획하다",
        "model": "look ahead to [thing/time]",
        "tier": 2,
        "easyEn": "think about something that will happen in the future"
      },
      {
        "cue": "~너머를 보다",
        "model": "look beyond [thing]",
        "tier": 3,
        "easyEn": "think about more than the obvious or immediate thing"
      },
      {
        "cue": "(~에게) 잠깐 들러 보다 / 안부를 살피다",
        "model": "look in on [person]",
        "tier": 3,
        "easyEn": "make a short visit to see if someone is okay"
      }
    ]
  },
  {
    "id": "use",
    "verb": "USE",
    "gloss": "use는 도구, 목적, 활용을 만든다.",
    "items": [
      {
        "cue": "~을 ~용도로 사용하다",
        "model": "use [thing] for [purpose]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~하기 위해 ~을 사용하다",
        "model": "use [thing] to [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 ~로 사용하다",
        "model": "use [thing] as [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 익숙하다",
        "model": "be used to [-ing/noun]",
        "tier": 1,
        "star": true,
        "easyEn": "be familiar with something so it feels normal"
      },
      {
        "cue": "예전에 ~하곤 했다",
        "model": "used to [verb]",
        "tier": 1,
        "star": true,
        "easyEn": "did something regularly in the past, but not now"
      },
      {
        "cue": "~을 ~와 함께 사용하다",
        "model": "use [thing] with [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 ~에 사용하다",
        "model": "use [thing] on [target]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "다 써버리다",
        "model": "use up [resource]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 활용하다",
        "model": "make use of [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 실제로 활용하다",
        "model": "put [thing] to use",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 ~에게 불리하게 사용하다",
        "model": "use [thing] against [person]",
        "tier": 2
      },
      {
        "cue": "~을 ~에서 사용하다",
        "model": "use [thing] in [context]",
        "tier": 2
      },
      {
        "cue": "~대신 ~을 사용하다",
        "model": "use [thing] instead of [thing]",
        "tier": 2
      },
      {
        "cue": "~이 필요 없다 / 쓸모없다고 여기다",
        "model": "have no use for [thing]",
        "tier": 3,
        "easyEn": "not need or want something at all"
      },
      {
        "cue": "~해봐야 소용없다",
        "model": "no use [-ing]",
        "tier": 3,
        "easyEn": "it will not help, so there is no reason to do it"
      },
      {
        "cue": "~에게 도움이 되다 / 쓸모가 있다",
        "model": "be of use to [person]",
        "tier": 3,
        "easyEn": "be helpful or useful to someone"
      }
    ]
  },
  {
    "id": "move",
    "verb": "MOVE",
    "gloss": "move는 이동, 이사, 진행, 감정 변화를 만든다.",
    "items": [
      {
        "cue": "다음으로 넘어가다 / 잊고 나아가다",
        "model": "move on",
        "tier": 1,
        "star": true
      },
      {
        "cue": "다음 주제로 넘어가다",
        "model": "move on to [topic]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "앞으로 진행하다",
        "model": "move forward",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 진행하다 / 추진하다",
        "model": "move forward with [plan/thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "이사 들어오다",
        "model": "move in",
        "tier": 2,
        "star": true
      },
      {
        "cue": "이사 나가다",
        "model": "move out",
        "tier": 2,
        "star": true
      },
      {
        "cue": "옆으로 비키다",
        "model": "move over",
        "tier": 2,
        "star": true
      },
      {
        "cue": "올라가다 / 앞당겨지다",
        "model": "move up",
        "tier": 2,
        "star": true
      },
      {
        "cue": "내려가다",
        "model": "move down",
        "tier": 2,
        "star": true
      },
      {
        "cue": "돌아다니다",
        "model": "move around [place]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "이사 가다 / 멀어지다",
        "model": "move away",
        "tier": 2,
        "star": true
      },
      {
        "cue": "다시 이사 오다 / 뒤로 가다",
        "model": "move back",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~로 들어가다 / 진출하다",
        "model": "move into [place/field]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에서 나가다",
        "model": "move out of [place]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~쪽으로 나아가다",
        "model": "move toward [goal]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "과정을 거쳐가다",
        "model": "move through [process]",
        "tier": 2
      },
      {
        "cue": "A에서 B로 이동하다",
        "model": "move from A to B",
        "tier": 2
      },
      {
        "cue": "~에 감동받다",
        "model": "be moved by [thing]",
        "tier": 2,
        "easyEn": "feel strong emotion because of something"
      },
      {
        "cue": "~을 밀고 나가다",
        "model": "move ahead with [thing]",
        "tier": 2
      },
      {
        "cue": "~로 승진하다 / 올라가다",
        "model": "move up to [role/position]",
        "tier": 2
      },
      {
        "cue": "~을 넘어서다 / 극복하다",
        "model": "move past [thing]",
        "tier": 2
      }
    ]
  },
  {
    "id": "hold",
    "verb": "HOLD",
    "gloss": "hold는 잡다, 유지하다, 지연시키다, 버티다.",
    "items": [
      {
        "cue": "기다리다 / 붙잡다",
        "model": "hold on",
        "tier": 1,
        "star": true
      },
      {
        "cue": "지연시키다 / 버티다",
        "model": "hold up [thing/person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "미루다 / 막다",
        "model": "hold off [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "막다 / 억제하다",
        "model": "hold back [thing/person]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "유지하다 / 낮게 유지하다",
        "model": "hold down [job/cost]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "버티다",
        "model": "hold out",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 고집하며 기다리다",
        "model": "hold out for [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "꽉 붙잡다 / 유지하다",
        "model": "hold onto [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 지키다",
        "model": "hold to [plan/promise]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에게 기준/약속을 지키게 하다",
        "model": "hold [person] to [standard/promise]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "유지되다 / 무너지지 않다",
        "model": "hold together",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 이유로 안 좋게 보다",
        "model": "hold against [person]",
        "tier": 2,
        "easyEn": "keep being upset with someone for something they did"
      },
      {
        "cue": "~에게 책임을 묻다",
        "model": "hold [person] accountable for [thing]",
        "tier": 2
      },
      {
        "cue": "~을 제자리에 고정하다",
        "model": "hold [thing] in place",
        "tier": 2
      },
      {
        "cue": "~을 미루다 / 보류하다",
        "model": "hold off on [thing/-ing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~하는 것을 참다 / 자제하다",
        "model": "hold back from [-ing]",
        "tier": 2
      },
      {
        "cue": "연기하다 / 계속 보유하다",
        "model": "hold over [thing]",
        "tier": 3,
        "easyEn": "delay something to a later time"
      },
      {
        "cue": "~속에서도 버티다 / 견디다",
        "model": "hold up under [pressure/scrutiny]",
        "tier": 3,
        "easyEn": "stay strong or true when tested"
      }
    ]
  },
  {
    "id": "carry",
    "verb": "CARRY",
    "gloss": "carry는 들고 가다, 수행하다, 이어지다.",
    "items": [
      {
        "cue": "수행하다",
        "model": "carry out [task/plan]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "계속하다",
        "model": "carry on",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 계속하다",
        "model": "carry on with [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "이월되다 / 이어지다",
        "model": "carry over [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "들고 다니다",
        "model": "carry around [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "가져가다 / 흥분시키다",
        "model": "carry away [thing/person]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 ~안으로 들고 가다",
        "model": "carry [thing] into [place]",
        "tier": 2
      },
      {
        "cue": "~을 지니고 다니다",
        "model": "carry [thing] with [person]",
        "tier": 2
      },
      {
        "cue": "감정에 휩쓸리다",
        "model": "be carried away by [emotion]",
        "tier": 2,
        "easyEn": "lose control because of strong feelings"
      },
      {
        "cue": "계속 ~하다",
        "model": "carry on [-ing]",
        "tier": 2
      },
      {
        "cue": "다시 가져가다",
        "model": "carry back [thing]",
        "tier": 3,
        "star": true,
        "easyEn": "take something back to where it came from"
      },
      {
        "cue": "해내다",
        "model": "carry off [thing]",
        "tier": 3,
        "star": true,
        "easyEn": "manage to do something difficult successfully"
      },
      {
        "cue": "끝까지 해내다",
        "model": "carry through [plan]",
        "tier": 3,
        "star": true,
        "easyEn": "finish or complete a plan you started"
      },
      {
        "cue": "~을 이어가다 / 이월하다",
        "model": "carry forward [thing]",
        "tier": 3,
        "easyEn": "continue something or move it to a later time"
      },
      {
        "cue": "~에게 영향력이 있다",
        "model": "carry weight with [person]",
        "tier": 3,
        "easyEn": "have real influence on someone's opinion"
      }
    ]
  },
  {
    "id": "pull",
    "verb": "PULL",
    "gloss": "pull은 당기다, 빼내다, 해내다, 멈춰 세우다.",
    "items": [
      {
        "cue": "빼내다 / 철수하다",
        "model": "pull out [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "차를 길가에 세우다",
        "model": "pull over",
        "tier": 2,
        "star": true
      },
      {
        "cue": "멈춰 서다 / 끌어올리다",
        "model": "pull up",
        "tier": 2,
        "star": true
      },
      {
        "cue": "끌어내리다 / 철거하다",
        "model": "pull down [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "끌어들이다",
        "model": "pull in [thing/person]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "어려운 일을 해내다",
        "model": "pull off [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "succeed at something difficult or surprising"
      },
      {
        "cue": "버텨내다 / 회복하다",
        "model": "pull through [difficulty]",
        "tier": 2,
        "star": true,
        "easyEn": "survive or recover from a serious problem"
      },
      {
        "cue": "멀어지다 / 빠져나가다",
        "model": "pull away",
        "tier": 2,
        "star": true
      },
      {
        "cue": "물러나다 / 철회하다",
        "model": "pull back",
        "tier": 2,
        "star": true
      },
      {
        "cue": "분해하다 / 갈라놓다",
        "model": "pull apart [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "힘을 합치다 / 정신 차리다",
        "model": "pull together",
        "tier": 2,
        "star": true,
        "easyEn": "join efforts and work together as a team"
      },
      {
        "cue": "응원하다",
        "model": "pull for [person/team]",
        "tier": 2,
        "easyEn": "support someone and hope they succeed"
      },
      {
        "cue": "~를 ~에 끌어들이다",
        "model": "pull [person] into [thing]",
        "tier": 2
      },
      {
        "cue": "~를 따로 불러내다",
        "model": "pull [person] aside",
        "tier": 2
      },
      {
        "cue": "~에서 손을 떼다 / 빠지다 / 철수하다",
        "model": "pull out of [deal/place/commitment]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 줄이다 / 축소하다",
        "model": "pull back on [spending/plan]",
        "tier": 2
      },
      {
        "cue": "~을 앞서 나가다",
        "model": "pull ahead of [competitor]",
        "tier": 2
      },
      {
        "cue": "~을 중단시키다 / 접다",
        "model": "pull the plug on [project/thing]",
        "tier": 2,
        "easyEn": "stop or end a project or activity"
      },
      {
        "cue": "제 몫을 다하다",
        "model": "pull your weight",
        "tier": 2,
        "easyEn": "do your fair share of the work"
      },
      {
        "cue": "~에 맞서 당기다",
        "model": "pull against [thing]",
        "tier": 3,
        "easyEn": "move or pull in the opposite direction from something"
      }
    ]
  },
  {
    "id": "push",
    "verb": "PUSH",
    "gloss": "push는 밀다, 추진하다, 압박하다, 반대하다.",
    "items": [
      {
        "cue": "반대하다 / 미루다",
        "model": "push back",
        "tier": 2,
        "star": true,
        "easyEn": "disagree with or resist something; or postpone it"
      },
      {
        "cue": "~에 이의를 제기하다",
        "model": "push back on [idea/deadline]",
        "tier": 2,
        "star": true,
        "easyEn": "object to or resist a particular idea or deadline"
      },
      {
        "cue": "밀어붙여 해내다",
        "model": "push through [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "force something to get completed or approved despite resistance"
      },
      {
        "cue": "배포하다 / 내보내다",
        "model": "push out [release/change]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "올리다",
        "model": "push up [number/price]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "낮추다",
        "model": "push down [number/price]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "밀어내다",
        "model": "push away [person/thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "계속 추진하다",
        "model": "push ahead",
        "tier": 2,
        "star": true
      },
      {
        "cue": "강하게 요구하다",
        "model": "push for [change/result]",
        "tier": 2,
        "star": true,
        "easyEn": "strongly ask for or demand a change or result"
      },
      {
        "cue": "~에게 억지로 ~하게 하다",
        "model": "push [person] into [-ing]",
        "tier": 2
      },
      {
        "cue": "~을 ~에 푸시하다 / 올리다 (코드를 저장소·운영에 올리다)",
        "model": "push [thing] to [place/branch]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 계속 밀고 나가다 / 추진하다",
        "model": "push forward with [plan/project]",
        "tier": 2
      },
      {
        "cue": "밀고 들어가다",
        "model": "push in",
        "tier": 3,
        "star": true,
        "easyEn": "press something inward, or move into a space ahead of others"
      },
      {
        "cue": "~에 맞서 밀다 / 반대하다",
        "model": "push against [thing]",
        "tier": 3,
        "star": true,
        "easyEn": "press hard on something, often something that resists you"
      },
      {
        "cue": "밀어 넘어뜨리다",
        "model": "push over [thing/person]",
        "tier": 3,
        "easyEn": "push someone or something so they fall down"
      },
      {
        "cue": "~을 밀치고 지나가다 / 한계를 넘다",
        "model": "push past [person/limit]",
        "tier": 3,
        "easyEn": "move forcefully past someone, or go beyond a limit"
      }
    ]
  },
  {
    "id": "pick",
    "verb": "PICK",
    "gloss": "pick은 집다, 고르다, 배우다, 알아차리다.",
    "items": [
      {
        "cue": "집다 / 데리러 가다 / 배우다",
        "model": "pick up [thing/person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "고르다",
        "model": "pick out [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "괴롭히다",
        "model": "pick on [person]",
        "tier": 2,
        "star": true,
        "easyEn": "repeatedly tease, criticize, or treat someone unfairly"
      },
      {
        "cue": "세세히 비판하다 / 분해하다",
        "model": "pick apart [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "criticize something in great detail to find its faults"
      },
      {
        "cue": "선택지 중에서 고르다",
        "model": "pick from [options]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "알아차리다",
        "model": "pick up on [signal/detail]",
        "tier": 2,
        "star": true,
        "easyEn": "notice a small detail or hint that others miss"
      },
      {
        "cue": "A와 B 중 고르다",
        "model": "pick between A and B",
        "tier": 2
      },
      {
        "cue": "~보다 ~을 고르다",
        "model": "pick [thing] over [thing]",
        "tier": 2
      },
      {
        "cue": "~를 역할에 뽑다",
        "model": "pick [person] for [role]",
        "tier": 2
      },
      {
        "cue": "남이 못 한 몫·부족한 부분을 대신 떠맡다",
        "model": "pick up the slack",
        "tier": 2,
        "easyEn": "do the extra work someone else failed to do"
      },
      {
        "cue": "뒤지다 / 골라내다",
        "model": "pick through [things]",
        "tier": 3,
        "star": true,
        "easyEn": "search carefully through many things to find what you want"
      },
      {
        "cue": "조금씩 먹다 / 흠잡다",
        "model": "pick at [food/problem]",
        "tier": 3,
        "easyEn": "eat only tiny amounts; or keep touching something repeatedly"
      },
      {
        "cue": "(누가) 중단한 지점부터 이어받아 하다",
        "model": "pick up where [person] left off",
        "tier": 3,
        "easyEn": "continue something from the point where someone stopped"
      }
    ]
  },
  {
    "id": "drop",
    "verb": "DROP",
    "gloss": "drop은 떨어뜨리다, 내려주다, 줄다, 중단하다.",
    "items": [
      {
        "cue": "내려주다 / 전달하다 / 줄어들다",
        "model": "drop off [person/thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "잠깐 들르다",
        "model": "drop by [place]",
        "tier": 2,
        "star": true,
        "easyEn": "visit somewhere briefly, often without planning ahead"
      },
      {
        "cue": "잠깐 들르다",
        "model": "drop in",
        "tier": 2,
        "star": true,
        "easyEn": "make a short, casual visit without planning ahead"
      },
      {
        "cue": "중퇴하다 / 빠지다",
        "model": "drop out",
        "tier": 2,
        "star": true,
        "easyEn": "quit a school, course, or activity before finishing"
      },
      {
        "cue": "~에서 빠지다",
        "model": "drop out of [school/program]",
        "tier": 2,
        "star": true,
        "easyEn": "stop attending a school or program before finishing"
      },
      {
        "cue": "~에서 ~로 떨어지다",
        "model": "drop from [number] to [number]",
        "tier": 2
      },
      {
        "cue": "~을 계획/목록에서 빼다",
        "model": "drop [thing] from [plan/list]",
        "tier": 2
      },
      {
        "cue": "맡은 일을 실수로 놓치다 / 그르치다",
        "model": "drop the ball",
        "tier": 2,
        "easyEn": "fail to handle a task you were responsible for"
      },
      {
        "cue": "뒤로 처지다",
        "model": "drop back",
        "tier": 3,
        "star": true,
        "easyEn": "move back to a position behind where you were"
      },
      {
        "cue": "사라지다 / 떨어져 나가다",
        "model": "drop away",
        "tier": 3,
        "star": true,
        "easyEn": "gradually decrease or disappear over time"
      },
      {
        "cue": "아래로 떨어지다",
        "model": "drop down",
        "tier": 3,
        "star": true,
        "easyEn": "move down to a lower position or level"
      },
      {
        "cue": "잠깐 들르다",
        "model": "drop into [place]",
        "tier": 3,
        "star": true,
        "easyEn": "visit a place briefly without planning ahead"
      },
      {
        "cue": "~을 ~에게 전달하다",
        "model": "drop [thing] to [person/place]",
        "tier": 3,
        "easyEn": "deliver or bring something to a person or place"
      },
      {
        "cue": "짧게 연락하다",
        "model": "drop [person] a line",
        "tier": 3,
        "easyEn": "send someone a short, casual message"
      },
      {
        "cue": "~에게 예고 없이 불쑥 들르다 / 찾아가다",
        "model": "drop in on [person]",
        "tier": 3,
        "easyEn": "visit someone suddenly without telling them in advance"
      }
    ]
  },
  {
    "id": "pass",
    "verb": "PASS",
    "gloss": "pass는 지나가다, 건네다, 통과하다, 전달하다.",
    "items": [
      {
        "cue": "~을 ~에게 건네다",
        "model": "pass [thing] to [person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "전달하다 / 거절하다",
        "model": "pass on [information/offer]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "기절하다 / 나눠주다",
        "model": "pass out",
        "tier": 2,
        "star": true,
        "easyEn": "to suddenly lose consciousness and faint"
      },
      {
        "cue": "돌아가시다",
        "model": "pass away",
        "tier": 2,
        "star": true,
        "easyEn": "to die"
      },
      {
        "cue": "돌리다 / 나눠 돌리다",
        "model": "pass around [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "지나가다",
        "model": "pass by [place/person]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "통과하다",
        "model": "pass through [place/process]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "건너뛰다 / 승진에서 제외하다",
        "model": "pass over [person/thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "물려주다",
        "model": "pass down [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "메시지를 전달하다",
        "model": "pass along [message]",
        "tier": 2
      },
      {
        "cue": "기회를 놓치다 / 거절하다",
        "model": "pass up [chance]",
        "tier": 2,
        "easyEn": "to choose not to take an offer or chance"
      },
      {
        "cue": "~을 ~에게 전달하다 / 넘겨주다",
        "model": "pass [thing] on to [person]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 ~에게 전달해주다 / 전해주다",
        "model": "pass [thing] along to [person]",
        "tier": 2
      },
      {
        "cue": "~을 ~인 척하다",
        "model": "pass off [thing] as [thing]",
        "tier": 3,
        "star": true,
        "easyEn": "to falsely present something as something it is not"
      },
      {
        "cue": "~로 통하다",
        "model": "pass for [thing]",
        "tier": 3,
        "easyEn": "to be accepted or mistaken as something else"
      }
    ]
  },
  {
    "id": "hand",
    "verb": "HAND",
    "gloss": "hand는 손으로 건네다, 제출하다, 인계하다.",
    "items": [
      {
        "cue": "~을 ~에게 건네다",
        "model": "hand [thing] to [person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "제출하다",
        "model": "hand in [assignment/document]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "나눠주다",
        "model": "hand out [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "넘겨주다 / 인계하다",
        "model": "hand over [thing/task]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "돌려주다",
        "model": "hand back [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "물려주다 / 판결을 내리다",
        "model": "hand down [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "인계하다",
        "model": "hand off [task]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~를 ~에게 넘기다",
        "model": "hand [person] over to [authority/team]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 ~에게 제출하다",
        "model": "hand [thing] in to [person]",
        "tier": 2
      },
      {
        "cue": "~을 ~에게 인계하다 / 넘기다 (업무·작업)",
        "model": "hand [thing] off to [person]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "돌리다",
        "model": "hand around [thing]",
        "tier": 3,
        "easyEn": "to give something to each person in a group"
      }
    ]
  },
  {
    "id": "fill",
    "verb": "FILL",
    "gloss": "fill은 채우다, 작성하다, 대신하다, 정보를 알려주다.",
    "items": [
      {
        "cue": "빈칸을 채우다",
        "model": "fill in [blank/form]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "양식을 작성하다",
        "model": "fill out [form]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "가득 채우다",
        "model": "fill up [tank/bottle]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 ~로 채우다",
        "model": "fill [thing] with [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~를 대신하다",
        "model": "fill in for [person]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에게 상황을 알려주다",
        "model": "fill [person] in on [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "to tell someone the details they missed"
      },
      {
        "cue": "시간을 ~로 채우다",
        "model": "fill [time] with [activity]",
        "tier": 2
      },
      {
        "cue": "~로 가득 차다",
        "model": "be filled with [emotion/thing]",
        "tier": 2
      },
      {
        "cue": "~을 재료로 메우다",
        "model": "fill [thing] in with [material]",
        "tier": 3,
        "easyEn": "to put material into a hole to make it full"
      }
    ]
  },
  {
    "id": "clear",
    "verb": "CLEAR",
    "gloss": "clear는 치우다, 명확하게 하다, 허가받다.",
    "items": [
      {
        "cue": "정리하다 / 해명하다",
        "model": "clear up [confusion/problem]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "비우다",
        "model": "clear out [space]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "치우다",
        "model": "clear away [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "표면을 치우다",
        "model": "clear off [surface]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에게 확인/허가받다",
        "model": "clear [thing] with [person]",
        "tier": 2,
        "star": true,
        "easyEn": "get someone's approval before doing it"
      },
      {
        "cue": "~에서 ~을 치우다",
        "model": "clear [thing] from [place]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에게 ~을 명확히 해주다",
        "model": "clear [thing] up for [person]",
        "tier": 2
      },
      {
        "cue": "~을 위한 길을 열다",
        "model": "clear the way for [thing]",
        "tier": 2,
        "easyEn": "make it possible for something to happen"
      },
      {
        "cue": "(오해·문제를) ~와 풀다 / 해소하다",
        "model": "clear [thing] up with [person]",
        "tier": 2,
        "easyEn": "resolve a problem or misunderstanding with someone"
      },
      {
        "cue": "~에 대한 승인 / 허가를 받다 (예: 배포·릴리스 승인)",
        "model": "be cleared for [thing/action]",
        "tier": 2,
        "easyEn": "be officially allowed to do something"
      },
      {
        "cue": "통과하다",
        "model": "clear through [process/security]",
        "tier": 3,
        "star": true,
        "easyEn": "to pass an official check or process"
      },
      {
        "cue": "~에서 ~을 제거하다",
        "model": "clear [place] of [thing]",
        "tier": 3,
        "star": true,
        "easyEn": "to remove all of something from a place"
      },
      {
        "cue": "혐의를 벗기다",
        "model": "clear [person] of [charge]",
        "tier": 3,
        "easyEn": "to remove all of something from a place"
      }
    ]
  },
  {
    "id": "clean",
    "verb": "CLEAN",
    "gloss": "clean은 청소, 정리, 제거다.",
    "items": [
      {
        "cue": "정리하다 / 청소하다",
        "model": "clean up [place/code/data]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "완전히 비우다",
        "model": "clean out [place/container]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "표면을 닦다",
        "model": "clean off [surface]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "치우다",
        "model": "clean away [dirt/mess]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~뒤를 치우다",
        "model": "clean up after [person/event]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~로 닦다",
        "model": "clean [thing] with [tool]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "표면에서 ~을 닦아내다",
        "model": "clean [thing] from [surface]",
        "tier": 2
      },
      {
        "cue": "~에서 ~을 완전히 치우다",
        "model": "clean [thing] out of [place]",
        "tier": 2
      },
      {
        "cue": "~용도로 정리하다",
        "model": "clean [thing] up for [purpose]",
        "tier": 2
      }
    ]
  },
  {
    "id": "cut",
    "verb": "CUT",
    "gloss": "cut은 자르다, 줄이다, 차단하다.",
    "items": [
      {
        "cue": "끊다 / 차단하다",
        "model": "cut off [thing/person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 줄이다",
        "model": "cut down on [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "잘라내다 / 끊다",
        "model": "cut out [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 줄이다",
        "model": "cut back on [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "끼어들다",
        "model": "cut in",
        "tier": 2,
        "star": true
      },
      {
        "cue": "뚫고 지나가다 / 핵심으로 들어가다",
        "model": "cut through [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "get past obstacles quickly to reach what matters"
      },
      {
        "cue": "~을 자르다 / 잠식하다",
        "model": "cut into [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "reduce something such as profits or time"
      },
      {
        "cue": "잘게 자르다",
        "model": "cut up [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 계획/예산에서 빼다",
        "model": "cut [thing] from [plan/budget]",
        "tier": 2
      },
      {
        "cue": "~로부터 단절되다 / 고립되다 (예: 네트워크·팀에서)",
        "model": "be cut off from [people/resource]",
        "tier": 2,
        "easyEn": "be separated or isolated from people or things"
      },
      {
        "cue": "가로지르다 / 여러 영역에 걸치다",
        "model": "cut across [place/topic]",
        "tier": 3,
        "star": true,
        "easyEn": "go straight across; also apply to many areas"
      },
      {
        "cue": "잘라내다",
        "model": "cut away [thing]",
        "tier": 3,
        "star": true,
        "easyEn": "to remove something by cutting it off"
      },
      {
        "cue": "새 시스템으로 전환하다",
        "model": "cut over to [system]",
        "tier": 3,
        "easyEn": "switch from an old system to a new one"
      },
      {
        "cue": "~에 적합하다",
        "model": "be cut out for [role]",
        "tier": 3,
        "easyEn": "have the right qualities for a job"
      },
      {
        "cue": "대충 처리하다 / 편법으로 줄이다 (품질·절차를 깎다)",
        "model": "cut corners",
        "tier": 3,
        "easyEn": "do work cheaply or quickly, lowering quality"
      },
      {
        "cue": "(대화·일에) 끼어들다 / 가로막다",
        "model": "cut in on [person/conversation]",
        "tier": 3,
        "easyEn": "to interrupt someone while they are talking"
      }
    ]
  },
  {
    "id": "break",
    "verb": "BREAK",
    "gloss": "break는 깨다, 고장 나다, 나누다, 발생하다.",
    "items": [
      {
        "cue": "고장 나다 / 무너지다",
        "model": "break down",
        "tier": 1,
        "star": true
      },
      {
        "cue": "나눠 설명하다 / 분해하다",
        "model": "break [thing] down",
        "tier": 1,
        "star": true
      },
      {
        "cue": "헤어지다 / 쪼개다",
        "model": "break up",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~와 헤어지다 / 관계를 끝내다",
        "model": "break up with [person]",
        "tier": 1
      },
      {
        "cue": "침입하다 / 길들이다",
        "model": "break in",
        "tier": 2,
        "star": true
      },
      {
        "cue": "침입하다 / 진입하다",
        "model": "break into [place/field]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "발생하다",
        "model": "break out",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에서 벗어나다",
        "model": "break out of [place/pattern]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "중단하다 / 떼어내다",
        "model": "break off [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "돌파하다",
        "model": "break through [barrier]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에서 떨어져 나오다",
        "model": "break away from [group]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "부서지다 / 분해하다",
        "model": "break apart [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 부분으로 나누다",
        "model": "break [thing] into [parts]",
        "tier": 2
      },
      {
        "cue": "소식을 조심스럽게 전하다",
        "model": "break [news] to [person]",
        "tier": 2,
        "easyEn": "tell someone about important or upsetting news"
      },
      {
        "cue": "손익분기점을 맞추다",
        "model": "break even",
        "tier": 2,
        "easyEn": "earn back exactly what you spent, with no profit or loss"
      },
      {
        "cue": "~을 더 작은 부분으로 나누다 / 쪼개서 설명하다",
        "model": "break [thing] down into [parts]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~와 결별하다",
        "model": "break with [tradition/person]",
        "tier": 3,
        "easyEn": "to stop following a tradition or end a relationship"
      },
      {
        "cue": "어색한 분위기를 깨다 / 긴장을 풀다",
        "model": "break the ice",
        "tier": 3,
        "easyEn": "make people feel relaxed in a new social situation"
      }
    ]
  },
  {
    "id": "fix",
    "verb": "FIX",
    "gloss": "fix는 고치다, 고정하다, 정하다.",
    "items": [
      {
        "cue": "버그/문제를 고치다",
        "model": "fix [bug/problem]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "수리하다 / 꾸미다 / 연결해주다",
        "model": "fix up [place/person]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 제자리에 고정하다",
        "model": "fix [thing] in [place]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 ~에 고정하다",
        "model": "fix [thing] to [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 ~방법으로 고치다",
        "model": "fix [problem] with [method]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 ~를 위해 고치다",
        "model": "fix [thing] for [person]",
        "tier": 3,
        "star": true,
        "easyEn": "decide on a specific date or time for something"
      },
      {
        "cue": "~에 집착하다",
        "model": "be fixed on [idea]",
        "tier": 3,
        "easyEn": "focused on one idea and unwilling to change your mind"
      },
      {
        "cue": "행사 날짜/시간을 정하다",
        "model": "fix [date/time] for [event]",
        "tier": 3,
        "easyEn": "decide on a specific date or time for something"
      },
      {
        "cue": "~을 응시하다",
        "model": "fix [eyes] on [thing]",
        "tier": 3,
        "easyEn": "look at something steadily without looking away"
      },
      {
        "cue": "~의 위치/상황을 파악하다",
        "model": "get a fix on [thing]",
        "tier": 3,
        "easyEn": "get a clear understanding of a situation or location"
      }
    ]
  },
  {
    "id": "build",
    "verb": "BUILD",
    "gloss": "build는 만들다, 쌓다, 기반 위에 확장하다.",
    "items": [
      {
        "cue": "쌓아 올리다 / 강화하다",
        "model": "build up [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 기반으로 발전시키다",
        "model": "build on [idea/system]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~안에 포함해 만들다",
        "model": "build into [system/process]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에서 시작해 만들다",
        "model": "build from [base]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "확장해서 구축하다",
        "model": "build out [system/feature]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 위해 만들다",
        "model": "build for [user/use case]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~로 만들다",
        "model": "build with [tool/material]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 중심으로 설계하다",
        "model": "build around [constraint/idea]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 습관으로 만들다",
        "model": "build [thing] into [habit]",
        "tier": 2
      },
      {
        "cue": "처음부터 만들다",
        "model": "build [thing] from scratch",
        "tier": 2,
        "easyEn": "make something completely new from the beginning"
      },
      {
        "cue": "시간을 두고 쌓다",
        "model": "build [thing] over time",
        "tier": 2
      },
      {
        "cue": "~을 향해 점점 고조시키다 / 차근차근 쌓아 나아가다",
        "model": "build up to [thing/event]",
        "tier": 2
      },
      {
        "cue": "~ 위에 얹어서 (확장해) 만들다",
        "model": "build on top of [thing/framework]",
        "tier": 2
      },
      {
        "cue": "~의 타당성을 뒷받침할 근거를 모으다",
        "model": "build a case for [decision/change]",
        "tier": 2,
        "easyEn": "gather reasons and evidence to support an idea"
      },
      {
        "cue": "~을 기반으로 하다",
        "model": "build upon [idea/system]",
        "tier": 3,
        "star": true,
        "easyEn": "use something as a base to develop it further"
      }
    ]
  },
  {
    "id": "open",
    "verb": "OPEN",
    "gloss": "open은 열다, 시작하다, 공개하다.",
    "items": [
      {
        "cue": "열다 / 공개하다 / 마음을 열다",
        "model": "open up [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에게 개방하다",
        "model": "open [thing] to [person/public]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~용도로 열다",
        "model": "open [thing] for [purpose]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~로 시작하다",
        "model": "open with [topic]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에서 열리다",
        "model": "open in [app/browser]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에 대해 털어놓다",
        "model": "open up about [feeling/problem]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에게 마음을 열다",
        "model": "open up to [person]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~로 계정/파일을 열다",
        "model": "open [account/file] with [provider/app]",
        "tier": 2
      },
      {
        "cue": "~에 열려 있다",
        "model": "be open to [idea]",
        "tier": 2
      },
      {
        "cue": "~에 대해 솔직하게 터놓다 / 숨기지 않다",
        "model": "be open about [thing]",
        "tier": 2
      },
      {
        "cue": "~에게 솔직하게 (숨김없이) 대하다",
        "model": "be open with [person]",
        "tier": 2
      },
      {
        "cue": "~공간으로 이어지다",
        "model": "open into [space]",
        "tier": 3,
        "star": true,
        "easyEn": "lead directly into another room or space"
      },
      {
        "cue": "~쪽으로 나 있다",
        "model": "open onto [view/street]",
        "tier": 3,
        "star": true,
        "easyEn": "face or lead directly to a view or street"
      },
      {
        "cue": "펼쳐지다",
        "model": "open out",
        "tier": 3,
        "easyEn": "become wider or spread out"
      }
    ]
  },
  {
    "id": "close",
    "verb": "CLOSE",
    "gloss": "close는 닫다, 종료하다, 가까워지다.",
    "items": [
      {
        "cue": "폐업하다 / 종료하다",
        "model": "close down [business/service]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "막다 / 차단하다",
        "model": "close off [area/option]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에 가까워지다",
        "model": "close in on [target]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "문을 닫다 / 간격을 좁히다",
        "model": "close up [shop/gap]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "마무리하다 / 정산하다",
        "model": "close out [task/account]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~로 마무리하다",
        "model": "close with [remark/point]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 일반에 닫다",
        "model": "close [thing] to [public]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "계약을 체결하다",
        "model": "close [deal] with [person/company]",
        "tier": 2
      },
      {
        "cue": "~에 가깝다",
        "model": "be close to [-ing/noun]",
        "tier": 2
      },
      {
        "cue": "거의 ~할 뻔하다",
        "model": "come close to [-ing]",
        "tier": 2
      },
      {
        "cue": "~와 친하다 / 가깝게 지내다",
        "model": "be close with [person]",
        "tier": 2
      },
      {
        "cue": "~부터 ~까지 닫다",
        "model": "close [thing] from [date] to [date]",
        "tier": 3,
        "star": true,
        "easyEn": "shut a place during a set period of time"
      }
    ]
  },
  {
    "id": "start",
    "verb": "START",
    "gloss": "start는 시작, 출발, 출신 상태를 만든다.",
    "items": [
      {
        "cue": "다시 시작하다",
        "model": "start over",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~부터 시작하다",
        "model": "start with [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~하기 시작하다",
        "model": "start to [verb]",
        "tier": 1
      },
      {
        "cue": "~하기 시작하다",
        "model": "start [-ing]",
        "tier": 1
      },
      {
        "cue": "~을 시작하다",
        "model": "get started on [thing]",
        "tier": 1
      },
      {
        "cue": "시작하다 / 시동 걸다",
        "model": "start up [company/system]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "시작하다",
        "model": "start off",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~로 시작하다",
        "model": "start off with [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "시작하다",
        "model": "start out",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~로 시작하다",
        "model": "start out as [role]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 시작하다",
        "model": "start on [task]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에서 시작하다",
        "model": "start from [point]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~하는 것으로 시작하다",
        "model": "start by [-ing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~분야/장소에서 시작하다",
        "model": "start in [field/place]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~로 시작하다",
        "model": "start as [role]",
        "tier": 2
      },
      {
        "cue": "~하는 것으로 시작하다 (발표/설명 도입)",
        "model": "start off by [-ing]",
        "tier": 2
      },
      {
        "cue": "~을 다시 가동하다 / 재시작하다 (서버/서비스)",
        "model": "start [thing] back up",
        "tier": 2
      }
    ]
  },
  {
    "id": "stop",
    "verb": "STOP",
    "gloss": "stop은 멈추다, 막다, 들르다.",
    "items": [
      {
        "cue": "잠깐 들르다",
        "model": "stop by [place]",
        "tier": 1,
        "star": true,
        "easyEn": "visit a place for a short time"
      },
      {
        "cue": "~가 ~하지 못하게 막다",
        "model": "stop [person] from [-ing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에서 멈추다",
        "model": "stop at [place/point]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~하던 것을 멈추다",
        "model": "stop doing [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~하기 위해 멈추다",
        "model": "stop to do [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "잠깐 들르다",
        "model": "stop in [place]",
        "tier": 2,
        "star": true,
        "easyEn": "visit a place for a short time"
      },
      {
        "cue": "가는 길에 들르다",
        "model": "stop off [place]",
        "tier": 2,
        "star": true,
        "easyEn": "stop somewhere briefly during a trip"
      },
      {
        "cue": "경유하다",
        "model": "stop over [place]",
        "tier": 2,
        "star": true,
        "easyEn": "stay somewhere briefly while traveling to another place"
      },
      {
        "cue": "~을 위해 멈추다",
        "model": "stop for [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "멈추다",
        "model": "come to a stop",
        "tier": 2
      },
      {
        "cue": "~을 중단시키다 / 그만두게 하다",
        "model": "put a stop to [thing]",
        "tier": 2
      },
      {
        "cue": "막다",
        "model": "stop up [hole/drain]",
        "tier": 3,
        "easyEn": "block or plug an opening"
      },
      {
        "cue": "~까지는 하지 않다",
        "model": "stop short of [-ing]",
        "tier": 3,
        "easyEn": "almost do something but decide not to"
      }
    ]
  },
  {
    "id": "say",
    "verb": "SAY",
    "gloss": "say는 말하다, 표현하다, 암시하다.",
    "items": [
      {
        "cue": "~에게 ~라고 말하다",
        "model": "say [thing] to [person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 대해 뭔가를 보여주다/말하다",
        "model": "say something about [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 동의하다/거절하다",
        "model": "say yes/no to [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 ~언어/방식으로 말하다",
        "model": "say [thing] in [language/way]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "소리 내어 말하다",
        "model": "say [thing] out loud",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~라고 말하다 (간접화법)",
        "model": "say (that) [sentence]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "말할 필요도 없다",
        "model": "go without saying",
        "tier": 2,
        "star": true,
        "easyEn": "be so obvious it does not need saying"
      },
      {
        "cue": "그것은 ~에 대해 많은 것을 보여준다",
        "model": "that says a lot about [person/thing]",
        "tier": 2,
        "easyEn": "it shows something important about someone or something"
      },
      {
        "cue": "확실히 말하다",
        "model": "say for sure",
        "tier": 2
      },
      {
        "cue": "혼잣말하다",
        "model": "say to oneself",
        "tier": 2
      },
      {
        "cue": "~인 것 같다 / 아마 ~일 것이다 (조심스러운 추측·완충)",
        "model": "I'd say (that) [sentence]",
        "tier": 2
      },
      {
        "cue": "말할 것도 없이 / 당연히",
        "model": "needless to say",
        "tier": 2
      },
      {
        "cue": "아무리 줄여 말해도 그 정도다 (절제된 표현)",
        "model": "to say the least",
        "tier": 2,
        "easyEn": "the truth is even stronger than what was said"
      },
      {
        "cue": "중얼거리다",
        "model": "say [thing] under one’s breath",
        "tier": 3,
        "star": true,
        "easyEn": "say something very quietly so others barely hear"
      }
    ]
  },
  {
    "id": "tell",
    "verb": "TELL",
    "gloss": "tell은 알려주다, 구분하다, 혼내다.",
    "items": [
      {
        "cue": "~에게 ~에 대해 말해주다",
        "model": "tell [person] about [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에게 ~하라고 말하다",
        "model": "tell [person] to [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "A와 B 차이를 말하다",
        "model": "tell the difference between A and B",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에게 ~을 말해주다 (예: tell me the answer)",
        "model": "tell [person] [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에게 ~라고 말해주다 (간접화법)",
        "model": "tell [person] (that) [sentence]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~인 걸 알 수 있다 / 보면 안다",
        "model": "I can tell (that) [sentence]",
        "tier": 1,
        "star": true,
        "easyEn": "I can notice or sense it is true"
      },
      {
        "cue": "A와 B를 구별하다",
        "model": "tell apart A and B",
        "tier": 2,
        "star": true,
        "easyEn": "see the difference between two similar things"
      },
      {
        "cue": "A와 B를 구별하다",
        "model": "tell A from B",
        "tier": 2,
        "star": true,
        "easyEn": "see the difference between two things"
      },
      {
        "cue": "혼내다",
        "model": "tell off [person]",
        "tier": 2,
        "star": true,
        "easyEn": "angrily criticize someone for doing something wrong"
      },
      {
        "cue": "고자질하다",
        "model": "tell on [person]",
        "tier": 2,
        "star": true,
        "easyEn": "report someone's bad behavior to an authority"
      },
      {
        "cue": "~을 보고 알 수 있다",
        "model": "tell by [sign]",
        "tier": 2,
        "star": true,
        "easyEn": "know something from a sign or clue"
      },
      {
        "cue": "경험상 ~에게 말하다",
        "model": "tell [person] from experience",
        "tier": 2
      },
      {
        "cue": "사실대로 말하면 / 솔직히 말하면",
        "model": "to tell (you) the truth",
        "tier": 2,
        "easyEn": "speaking honestly"
      },
      {
        "cue": "~는 알 수 없다 / 예측할 수 없다",
        "model": "there's no telling [what/how ...]",
        "tier": 2,
        "easyEn": "it is impossible to know or predict"
      },
      {
        "cue": "~을 ~했다고 혼내다 / 나무라다",
        "model": "tell [person] off for [-ing]",
        "tier": 2,
        "easyEn": "angrily criticize someone for doing something"
      },
      {
        "cue": "~에 대해 말하다",
        "model": "tell of [thing]",
        "tier": 3,
        "easyEn": "describe or talk about something"
      },
      {
        "cue": "~에게 불리하게 작용하다",
        "model": "tell against [person]",
        "tier": 3,
        "easyEn": "be a disadvantage to someone"
      },
      {
        "cue": "솔직히 말하다",
        "model": "tell [person] straight",
        "tier": 3,
        "easyEn": "tell someone honestly and directly"
      }
    ]
  },
  {
    "id": "ask",
    "verb": "ASK",
    "gloss": "ask는 묻다, 요청하다, 초대하다.",
    "items": [
      {
        "cue": "~을 요청하다",
        "model": "ask for [thing/help]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 대해 묻다",
        "model": "ask about [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에게 ~해달라고 요청하다",
        "model": "ask [person] to [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에게 ~에 대해 묻다",
        "model": "ask [person] about [thing]",
        "tier": 1
      },
      {
        "cue": "~에게 ~을 요청하다",
        "model": "ask [person] for [thing]",
        "tier": 1
      },
      {
        "cue": "여기저기 물어보다",
        "model": "ask around",
        "tier": 2,
        "star": true
      },
      {
        "cue": "데이트 신청하다",
        "model": "ask [person] out",
        "tier": 2,
        "star": true,
        "easyEn": "invite someone to go on a date"
      },
      {
        "cue": "들어오라고 하다",
        "model": "ask [person] in",
        "tier": 2,
        "star": true
      },
      {
        "cue": "집에 초대하다",
        "model": "ask [person] over",
        "tier": 2,
        "star": true,
        "easyEn": "invite someone to come to your home"
      },
      {
        "cue": "~에게 ~을 요구하다",
        "model": "ask [thing] of [person]",
        "tier": 2,
        "star": true,
        "easyEn": "request something from someone"
      },
      {
        "cue": "~을 찾으려고 여기저기 묻다",
        "model": "ask around for [thing]",
        "tier": 2
      },
      {
        "cue": "어서 물어봐 / 얼마든지 물어봐",
        "model": "ask away",
        "tier": 2,
        "easyEn": "feel free to ask as much as you want"
      },
      {
        "cue": "안부를 묻다",
        "model": "ask after [person]",
        "tier": 3,
        "star": true,
        "easyEn": "ask how someone is doing"
      }
    ]
  },
  {
    "id": "talk",
    "verb": "TALK",
    "gloss": "talk는 대화, 논의, 설득을 만든다.",
    "items": [
      {
        "cue": "~에게 말하다",
        "model": "talk to [person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~와 이야기하다",
        "model": "talk with [person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 대해 말하다",
        "model": "talk about [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "논의하다",
        "model": "talk over [issue]",
        "tier": 2,
        "star": true,
        "easyEn": "discuss something together"
      },
      {
        "cue": "차근차근 이야기하며 설명하다",
        "model": "talk through [problem/process]",
        "tier": 2,
        "star": true,
        "easyEn": "discuss something step by step"
      },
      {
        "cue": "~에게 과정을 설명해주다",
        "model": "talk [person] through [process]",
        "tier": 2,
        "star": true,
        "easyEn": "explain a process to someone step by step"
      },
      {
        "cue": "깔보듯 말하다",
        "model": "talk down to [person]",
        "tier": 2,
        "star": true,
        "easyEn": "speak to someone as if they are not smart"
      },
      {
        "cue": "설득해서 ~하게 하다",
        "model": "talk [person] into [-ing]",
        "tier": 2,
        "star": true,
        "easyEn": "persuade someone to do something"
      },
      {
        "cue": "설득해서 ~하지 않게 하다",
        "model": "talk [person] out of [-ing]",
        "tier": 2,
        "star": true,
        "easyEn": "persuade someone not to do something"
      },
      {
        "cue": "말대꾸하다",
        "model": "talk back to [person]",
        "tier": 2,
        "star": true,
        "easyEn": "reply rudely to someone in authority"
      },
      {
        "cue": "좋게 말하다 / 띄워주다",
        "model": "talk up [thing/person]",
        "tier": 2,
        "easyEn": "praise something to make it sound better"
      },
      {
        "cue": "핵심을 피해서 말하다",
        "model": "talk around [issue]",
        "tier": 3,
        "star": true,
        "easyEn": "avoid discussing the main point directly"
      },
      {
        "cue": "일 얘기만 하다",
        "model": "talk shop",
        "tier": 3,
        "easyEn": "talk about work in a social situation"
      },
      {
        "cue": "~관점에서 말하다",
        "model": "talk in terms of [thing]",
        "tier": 3,
        "easyEn": "describe something using a particular measure or idea"
      },
      {
        "cue": "진정시키다 / 설득해서 (가격을) 깎게 하다",
        "model": "talk [person] down",
        "tier": 3,
        "easyEn": "calmly persuade someone to be less upset or to lower a price"
      },
      {
        "cue": "(말이 어긋나) 서로 딴소리하다 / 소통이 안 되다",
        "model": "talk past [person]",
        "tier": 3,
        "easyEn": "keep missing each other's point when talking"
      }
    ]
  },
  {
    "id": "call",
    "verb": "CALL",
    "gloss": "call은 부르다, 전화하다, 취소하다, 지적하다.",
    "items": [
      {
        "cue": "다시 전화하다",
        "model": "call back [person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "취소하다",
        "model": "call off [event/plan]",
        "tier": 2,
        "star": true,
        "easyEn": "cancel something that was planned"
      },
      {
        "cue": "지적하다",
        "model": "call out [person/problem]",
        "tier": 2,
        "star": true,
        "easyEn": "publicly criticize someone or name a problem openly"
      },
      {
        "cue": "~에 대해 ~를 지적하다",
        "model": "call [person] out on [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "publicly criticize someone for something they did"
      },
      {
        "cue": "부르다 / 투입하다",
        "model": "call in [person]",
        "tier": 2,
        "star": true,
        "easyEn": "ask someone to come in to help or work"
      },
      {
        "cue": "병가 전화하다",
        "model": "call in sick",
        "tier": 2,
        "star": true,
        "easyEn": "phone work to say you are too sick to come"
      },
      {
        "cue": "지명하다 / 요청하다",
        "model": "call on [person]",
        "tier": 2,
        "star": true,
        "easyEn": "ask someone to speak, or ask them for help"
      },
      {
        "cue": "전화하다 / 불러오다",
        "model": "call up [person/info]",
        "tier": 2,
        "star": true,
        "easyEn": "phone someone, or bring up information on a screen"
      },
      {
        "cue": "요구하다 / 필요로 하다",
        "model": "call for [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "require or demand something"
      },
      {
        "cue": "여러 곳에 전화하다",
        "model": "call around",
        "tier": 2,
        "star": true,
        "easyEn": "phone several different places"
      },
      {
        "cue": "~를 오라고 부르다",
        "model": "call over [person]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에 대해 전화하다",
        "model": "call about [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에 의문을 제기하다",
        "model": "call into question [thing]",
        "tier": 2,
        "easyEn": "make people doubt whether something is true"
      },
      {
        "cue": "~에 주의를 끌다",
        "model": "call attention to [thing]",
        "tier": 2,
        "easyEn": "make people notice something"
      },
      {
        "cue": "~을 ~라고 부르다",
        "model": "call [thing] by [name]",
        "tier": 2
      },
      {
        "cue": "미리 전화해두다",
        "model": "call ahead",
        "tier": 2,
        "easyEn": "phone in advance to arrange something"
      },
      {
        "cue": "그만하고 오늘 일을 마치다",
        "model": "call it a day",
        "tier": 3,
        "easyEn": "stop working for the day"
      }
    ]
  },
  {
    "id": "check",
    "verb": "CHECK",
    "gloss": "check는 확인, 점검, 검토다.",
    "items": [
      {
        "cue": "체크인하다 / 안부 확인하다",
        "model": "check in",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~와 상태 확인하다",
        "model": "check in with [person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "확인해보다 / 살펴보다",
        "model": "check out [thing/person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "상태를 확인하다",
        "model": "check on [thing/person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에게 확인하다",
        "model": "check with [person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~이 있는지 확인하다",
        "model": "check for [error]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "검토하다",
        "model": "check over [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "꼼꼼히 확인하다",
        "model": "check through [list/document]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "체크 표시하다",
        "model": "check off [item]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "상태를 확인하다",
        "model": "check up on [person/thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "체크인하다 / 조사하다",
        "model": "check into [hotel/issue]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~와 대조하다",
        "model": "check against [spec/source]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "체크아웃하다",
        "model": "check out of [hotel]",
        "tier": 2
      },
      {
        "cue": "~에게 다시 확인하다",
        "model": "double-check with [person]",
        "tier": 2
      },
      {
        "cue": "나중에 다시 확인하다 / 다시 들르다",
        "model": "check back",
        "tier": 2
      },
      {
        "cue": "~의 상태를 잠깐 확인하다",
        "model": "check in on [person/thing]",
        "tier": 2
      },
      {
        "cue": "~에서 확인하다",
        "model": "check [thing] from [source]",
        "tier": 3,
        "easyEn": "to confirm something is correct by using a source."
      }
    ]
  },
  {
    "id": "find",
    "verb": "FIND",
    "gloss": "find는 찾다, 알아내다, 발견하다.",
    "items": [
      {
        "cue": "알아내다",
        "model": "find out [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 대해 알아내다",
        "model": "find out about [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에서 ~을 찾다",
        "model": "find [thing] in [place]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~를 위해 ~을 찾아주다",
        "model": "find [thing] for [person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~할 방법을 찾다",
        "model": "find a way to [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~하기 어렵다고 느끼다",
        "model": "find it hard to [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "어느새 ~상황에 처하다",
        "model": "find yourself in [situation]",
        "tier": 2,
        "star": true,
        "easyEn": "to unexpectedly end up in a particular situation"
      },
      {
        "cue": "흠잡다",
        "model": "find fault with [thing/person]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~와 공통점을 찾다",
        "model": "find [thing] in common with [person]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~방법으로 찾다",
        "model": "find [thing] by [method]",
        "tier": 2
      },
      {
        "cue": "~을 통해 찾다",
        "model": "find [thing] through [source]",
        "tier": 2
      },
      {
        "cue": "~할 시간을 내다",
        "model": "find time to [verb]",
        "tier": 2
      },
      {
        "cue": "~을 파악해 익숙해지다 / 길을 알게 되다",
        "model": "find your way around [place/codebase]",
        "tier": 2,
        "easyEn": "to learn how to navigate or get familiar with something"
      },
      {
        "cue": "~에게 유리/불리한 판결을 내리다",
        "model": "find for/against [person]",
        "tier": 3,
        "easyEn": "to decide a court case for or against someone."
      }
    ]
  },
  {
    "id": "think",
    "verb": "THINK",
    "gloss": "think는 생각, 검토, 상상, 회상을 만든다.",
    "items": [
      {
        "cue": "~에 대해 생각하다",
        "model": "think about [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 떠올리다 / ~라고 생각하다",
        "model": "think of [thing/person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "심사숙고하다",
        "model": "think over [decision]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "끝까지 생각해보다",
        "model": "think through [problem/plan]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "생각해내다",
        "model": "think up [idea]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "앞일을 생각하다",
        "model": "think ahead",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 회상하다",
        "model": "think back on [time/event]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "A를 B로 생각하다",
        "model": "think of A as B",
        "tier": 2,
        "star": true
      },
      {
        "cue": "속으로 생각하다",
        "model": "think to oneself",
        "tier": 2,
        "star": true
      },
      {
        "cue": "생각을 소리 내어 말하다",
        "model": "think aloud",
        "tier": 2
      },
      {
        "cue": "~관점에서 생각하다",
        "model": "think in terms of [thing]",
        "tier": 2,
        "easyEn": "to consider something from a particular point of view"
      },
      {
        "cue": "~을 높이 평가하다",
        "model": "think highly of [person]",
        "tier": 2,
        "easyEn": "to respect or admire someone a lot"
      },
      {
        "cue": "~을 다시 한 번 신중히 생각하다",
        "model": "think twice about [thing]",
        "tier": 2,
        "easyEn": "to carefully consider before deciding to do something."
      },
      {
        "cue": "다시 생각하고 하지 않기로 하다",
        "model": "think better of [thing]",
        "tier": 3,
        "easyEn": "to change your mind and decide not to do something."
      },
      {
        "cue": "~을 대수롭지 않게 여기다",
        "model": "think nothing of [thing]",
        "tier": 3,
        "easyEn": "to see something as easy or not a problem."
      },
      {
        "cue": "즉석에서 빠르게 판단하고 대처하다",
        "model": "think on your feet",
        "tier": 3,
        "easyEn": "to react and make decisions quickly without preparation."
      }
    ]
  },
  {
    "id": "know",
    "verb": "KNOW",
    "gloss": "know는 지식, 경험, 인식의 뼈대다.",
    "items": [
      {
        "cue": "~에 대해 알다",
        "model": "know about [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 알아가다",
        "model": "get to know [person/thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~하는 법을 알다",
        "model": "know how to [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에게 (~을) 알려주다",
        "model": "let [person] know (about [thing])",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~의 존재를 알다",
        "model": "know of [person/thing]",
        "tier": 2,
        "star": true,
        "easyEn": "be aware that something or someone exists"
      },
      {
        "cue": "경험상 알다",
        "model": "know from experience",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~로 알다 / ~라는 이름으로 알다",
        "model": "know by [sign/name]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~로 유명하다",
        "model": "be known for [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~로 알려져 있다",
        "model": "be known as [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에게 알려져 있다",
        "model": "be known to [person/group]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~할 만큼 어리석지는 않다",
        "model": "know better than to [verb]",
        "tier": 2,
        "star": true,
        "easyEn": "be sensible enough not to do something."
      },
      {
        "cue": "~을 속속들이 알다",
        "model": "know [thing] inside out",
        "tier": 2,
        "easyEn": "know something completely and in full detail."
      },
      {
        "cue": "확실히 알다",
        "model": "know [thing] for sure",
        "tier": 2
      },
      {
        "cue": "내가 아는 한",
        "model": "as far as I know",
        "tier": 2,
        "star": true
      },
      {
        "cue": "외우거나 찾아보지 않고 바로 알다",
        "model": "know [thing] off the top of one's head",
        "tier": 2,
        "easyEn": "know it immediately without checking or looking it up."
      },
      {
        "cue": "~을 훤히 꿰다 / 능숙하게 다루다",
        "model": "know one's way around [thing/place]",
        "tier": 2,
        "easyEn": "be very familiar with a place or subject."
      },
      {
        "cue": "내가 알기로는 아니다",
        "model": "not that I know of",
        "tier": 2,
        "easyEn": "no, based on what I currently know"
      },
      {
        "cue": "얼굴만 알다",
        "model": "know [person] by sight",
        "tier": 3,
        "easyEn": "recognize someone's face without knowing them personally."
      }
    ]
  },
  {
    "id": "learn",
    "verb": "LEARN",
    "gloss": "learn은 배우다, 알게 되다, 경험에서 얻다.",
    "items": [
      {
        "cue": "~에 대해 배우다",
        "model": "learn about [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에게서 / ~로부터 배우다",
        "model": "learn from [person/mistake/experience]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~하는 법을 배우다",
        "model": "learn to [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~하는 방법을 배우다",
        "model": "learn how to [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에게서 ~을 배우다",
        "model": "learn [thing] from [person/source]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~하면서 배우다",
        "model": "learn by [-ing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에 대해 알게 되다",
        "model": "learn of [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "find out about something, often in a formal way"
      },
      {
        "cue": "경험을 통해 배우다",
        "model": "learn through [experience]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "시간이 지나며 배우다",
        "model": "learn [thing] over time",
        "tier": 2
      },
      {
        "cue": "고생해서 배우다",
        "model": "learn [thing] the hard way",
        "tier": 2,
        "easyEn": "learn it through a difficult or painful experience."
      },
      {
        "cue": "외우다",
        "model": "learn [thing] by heart",
        "tier": 2,
        "easyEn": "memorize it so you can repeat it exactly."
      },
      {
        "cue": "처음부터 배우다",
        "model": "learn from scratch",
        "tier": 2,
        "easyEn": "learn it starting from the very beginning."
      },
      {
        "cue": "(업무) 요령을 익히다",
        "model": "learn the ropes",
        "tier": 2,
        "easyEn": "learn how to do a new job or task."
      },
      {
        "cue": "일하면서 배우다 / 실무로 익히다",
        "model": "learn on the job",
        "tier": 2
      },
      {
        "cue": "(실수에서) 교훈을 얻다",
        "model": "learn one's lesson",
        "tier": 2,
        "easyEn": "finally understand not to repeat a mistake."
      }
    ]
  },
  {
    "id": "explain",
    "verb": "EXPLAIN",
    "gloss": "explain은 설명, 원인, 방식 전달이다.",
    "items": [
      {
        "cue": "~에게 ~을 설명하다",
        "model": "explain [thing] to [person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "왜 ~인지 설명하다",
        "model": "explain why [sentence]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "어떻게 ~인지 설명하다",
        "model": "explain how [sentence]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~관점에서 설명하다",
        "model": "explain [thing] in terms of [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~로 설명하다",
        "model": "explain [thing] by [reason/method]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "예시로 설명하다",
        "model": "explain [thing] with [example]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "자세히 설명하다",
        "model": "explain [thing] in detail",
        "tier": 2,
        "star": true
      },
      {
        "cue": "변명으로 넘기다",
        "model": "explain away [problem/evidence]",
        "tier": 2,
        "star": true,
        "easyEn": "make a problem seem unimportant by giving reasons."
      },
      {
        "cue": "예시/이야기로 설명하다",
        "model": "explain [thing] through [example/story]",
        "tier": 2
      },
      {
        "cue": "~을 ~로 설명하다",
        "model": "explain [thing] as [thing]",
        "tier": 2
      },
      {
        "cue": "~에게 명확히 설명하다",
        "model": "explain [thing] clearly to [person]",
        "tier": 2
      }
    ]
  },
  {
    "id": "show",
    "verb": "SHOW",
    "gloss": "show는 보여주다, 나타나다, 안내하다.",
    "items": [
      {
        "cue": "나타나다",
        "model": "show up",
        "tier": 1,
        "star": true,
        "easyEn": "to arrive or appear somewhere"
      },
      {
        "cue": "자랑하다 / 과시하다",
        "model": "show off [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "to display something proudly to impress people"
      },
      {
        "cue": "~에게 ~을 보여주다",
        "model": "show [thing] to [person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에게 ~하는 법을 보여주다",
        "model": "show [person] how to [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 나타나다 / 출근하다",
        "model": "show up for [event/work]",
        "tier": 1,
        "star": true,
        "easyEn": "to arrive for work or an event"
      },
      {
        "cue": "~에게 ~를 구경시켜주다",
        "model": "show [person] around [place]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "안으로 안내하다",
        "model": "show [person] in",
        "tier": 2,
        "star": true
      },
      {
        "cue": "밖으로 안내하다",
        "model": "show [person] out",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 화면/차트에 보여주다",
        "model": "show [thing] on [screen/chart]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 ~로 표시하다",
        "model": "show [thing] as [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "결과가 데이터에 나타나다",
        "model": "show [result] in [data]",
        "tier": 2
      },
      {
        "cue": "~를 방으로 안내하다",
        "model": "show [person] into [room]",
        "tier": 2
      },
      {
        "cue": "~의 징후를 보이다",
        "model": "show signs of [thing]",
        "tier": 2
      },
      {
        "cue": "~에 대한 성과/결실이 있다",
        "model": "have [something] to show for [effort/time]",
        "tier": 2,
        "easyEn": "to have a result that proves your effort was worthwhile."
      },
      {
        "cue": "드러나다",
        "model": "show through",
        "tier": 3,
        "star": true,
        "easyEn": "to become visible or noticeable."
      }
    ]
  },
  {
    "id": "try",
    "verb": "TRY",
    "gloss": "try는 시도, 테스트, 입어보기다.",
    "items": [
      {
        "cue": "~하려고 노력하다",
        "model": "try to [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "한번 ~해보다",
        "model": "try [-ing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "입어보다",
        "model": "try on [clothes]",
        "tier": 1,
        "star": true,
        "easyEn": "to put on clothing to see if it fits"
      },
      {
        "cue": "시험해보다",
        "model": "try out [tool/method]",
        "tier": 1,
        "star": true,
        "easyEn": "to test something to see if it works"
      },
      {
        "cue": "다시 시도하다",
        "model": "try again",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 한번 해보다",
        "model": "give [thing] a try",
        "tier": 1
      },
      {
        "cue": "(구어) ~해보다",
        "model": "try and [verb]",
        "tier": 1
      },
      {
        "cue": "선발 시험을 보다",
        "model": "try out for [team/role]",
        "tier": 2,
        "star": true,
        "easyEn": "to compete or audition for a spot on a team"
      },
      {
        "cue": "~을 노리다",
        "model": "try for [goal]",
        "tier": 2,
        "star": true,
        "easyEn": "to attempt to get or achieve something"
      },
      {
        "cue": "~을 ~로 해보다",
        "model": "try [thing] with [method/tool]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 ~에 시험해보다",
        "model": "try [thing] on [target]",
        "tier": 2
      },
      {
        "cue": "~를 ~죄로 재판하다",
        "model": "try [person] for [crime]",
        "tier": 2,
        "easyEn": "to put someone on trial for a crime"
      },
      {
        "cue": "최선을 다하다",
        "model": "try one’s best",
        "tier": 2
      },
      {
        "cue": "~을 ~에게 시험 삼아 해보다 / 반응을 떠보다",
        "model": "try [thing] out on [person]",
        "tier": 2,
        "easyEn": "to test an idea on someone to see their reaction"
      }
    ]
  },
  {
    "id": "help",
    "verb": "HELP",
    "gloss": "help는 돕다, 거들다, 버티게 하다.",
    "items": [
      {
        "cue": "거들다 / 도와주다",
        "model": "help out",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 거들다",
        "model": "help out with [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~가 ~하는 것을 돕다",
        "model": "help [person] with [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~가 ~하도록 돕다",
        "model": "help [person] do [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~가 ~하도록 돕다",
        "model": "help [person] to [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~하지 않을 수 없다",
        "model": "can’t help [-ing]",
        "tier": 1,
        "star": true,
        "easyEn": "to be unable to stop yourself from doing something."
      },
      {
        "cue": "~함으로써 돕다",
        "model": "help by [-ing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~가 어려움을 견디게 돕다",
        "model": "help [person] through [difficulty]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "마음껏 먹다/마시다",
        "model": "help yourself to [food/drink]",
        "tier": 2,
        "star": true,
        "easyEn": "to take as much food or drink as you want."
      },
      {
        "cue": "~가 상황에서 벗어나게 돕다",
        "model": "help [person] out of [situation]",
        "tier": 2
      },
      {
        "cue": "~가 들어가도록 돕다",
        "model": "help [person] into [place]",
        "tier": 2
      },
      {
        "cue": "~을 진전시키다",
        "model": "help [thing] along",
        "tier": 3,
        "easyEn": "to help something make progress."
      }
    ]
  },
  {
    "id": "need",
    "verb": "NEED",
    "gloss": "need는 필요, 의무, 요구사항이다.",
    "items": [
      {
        "cue": "~해야 한다",
        "model": "need to [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 ~용도로 필요로 하다",
        "model": "need [thing] for [purpose]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에게서 ~이 필요하다",
        "model": "need [thing] from [person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 도움이 필요하다",
        "model": "need help with [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~가 ~해줘야 한다",
        "model": "need [person] to [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~까지 ~이 필요하다",
        "model": "need [thing] by [date/time]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~할 필요 없다",
        "model": "no need to [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~이 필요하다",
        "model": "be in need of [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에 대한 필요가 있다",
        "model": "there is a need for [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~상황에서 ~이 필요하다",
        "model": "need [thing] in [situation]",
        "tier": 2
      },
      {
        "cue": "프로젝트에 ~이 필요하다",
        "model": "need [thing] on [project]",
        "tier": 2
      },
      {
        "cue": "~보다 ~이 더 필요하다",
        "model": "need [thing] more than [thing]",
        "tier": 2
      },
      {
        "cue": "필요하다면 / 필요시에는",
        "model": "if need be",
        "tier": 3,
        "easyEn": "if it is necessary"
      }
    ]
  },
  {
    "id": "want",
    "verb": "WANT",
    "gloss": "want는 원하다, 요청하다, 참여 의사다.",
    "items": [
      {
        "cue": "~하고 싶다",
        "model": "want to [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~가 ~하기를 원하다",
        "model": "want [person] to [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~용도로 ~을 원하다",
        "model": "want [thing] for [purpose]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에게서 ~을 원하다",
        "model": "want [thing] from [person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 돌려받고 싶다",
        "model": "want [thing] back",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 대해 알고 싶다",
        "model": "want to know about [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "참여하고 싶다",
        "model": "want in",
        "tier": 2,
        "star": true,
        "easyEn": "want to join or be included"
      },
      {
        "cue": "빠지고 싶다",
        "model": "want out",
        "tier": 2,
        "star": true,
        "easyEn": "want to leave or quit"
      },
      {
        "cue": "~죄로 수배 중이다",
        "model": "be wanted for [crime]",
        "tier": 2,
        "easyEn": "be sought by the police for a crime"
      },
      {
        "cue": "나한테 뭘 원하는 거야?",
        "model": "what do you want from me?",
        "tier": 2
      },
      {
        "cue": "~이 처리되길 원하다",
        "model": "want [thing] done",
        "tier": 2
      },
      {
        "cue": "~에 끼고 싶다 / ~에 참여하고 싶다",
        "model": "want in on [thing]",
        "tier": 2,
        "easyEn": "want to take part in or share in something"
      },
      {
        "cue": "~에서 빠지고 싶다 / ~에서 손 떼고 싶다",
        "model": "want out of [thing]",
        "tier": 2,
        "easyEn": "want to leave or escape from something"
      },
      {
        "cue": "부족한 것이 없다",
        "model": "want for nothing",
        "tier": 3,
        "easyEn": "have everything you need; lack nothing"
      }
    ]
  },
  {
    "id": "handle",
    "verb": "HANDLE",
    "gloss": "handle은 처리하다, 다루다, 감당하다.",
    "items": [
      {
        "cue": "문제/요청을 처리하다",
        "model": "handle [problem/request]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 감당하지 못하다 / 처리하지 못하다",
        "model": "can't handle [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 조심히 다루다",
        "model": "handle [thing] with care",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~함으로써 처리하다",
        "model": "handle [thing] by [-ing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~로부터 온 요청을 처리하다",
        "model": "handle [request] from [person]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~를 대신해 ~을 처리하다",
        "model": "handle [thing] for [person/team]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "압박 속에서 ~을 처리하다",
        "model": "handle [thing] under pressure",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 파악하다 / 감 잡다",
        "model": "get a handle on [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "start to understand or control something"
      },
      {
        "cue": "절차를 통해 처리하다",
        "model": "handle [thing] through [process]",
        "tier": 2
      },
      {
        "cue": "~을 ~방식으로 처리하다",
        "model": "handle [thing] in [way]",
        "tier": 2
      },
      {
        "cue": "문제 없이 처리하다",
        "model": "handle [thing] without [problem]",
        "tier": 2
      }
    ]
  },
  {
    "id": "manage",
    "verb": "MANAGE",
    "gloss": "manage는 관리하다, 해내다, 버티다.",
    "items": [
      {
        "cue": "가까스로 ~해내다",
        "model": "manage to [verb]",
        "tier": 1,
        "star": true,
        "easyEn": "succeed in doing something difficult"
      },
      {
        "cue": "팀/프로젝트를 관리하다",
        "model": "manage [team/project]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~없이 해내다",
        "model": "manage without [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 가지고 어떻게든 해내다",
        "model": "manage with [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~하면서 해내다",
        "model": "manage by [-ing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "위기/문제를 헤쳐나가다",
        "model": "manage through [crisis/problem]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "시스템에서 리스크를 관리하다",
        "model": "manage [risk] in [system]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~명 규모 팀을 관리하다",
        "model": "manage [team] of [number]",
        "tier": 2
      },
      {
        "cue": "~를 위해 ~을 관리하다",
        "model": "manage [thing] for [client/team]",
        "tier": 2
      },
      {
        "cue": "제약 속에서 ~을 관리하다",
        "model": "manage [thing] under [constraint]",
        "tier": 2
      },
      {
        "cue": "~의 기대치를 관리하다",
        "model": "manage [person's] expectations",
        "tier": 2,
        "star": true
      },
      {
        "cue": "상사를 잘 관리하다 / 상향 관리하다",
        "model": "manage up",
        "tier": 3,
        "star": true,
        "easyEn": "handle the relationship with your boss well"
      }
    ]
  },
  {
    "id": "change",
    "verb": "CHANGE",
    "gloss": "change는 바꾸다, 변하다, 전환하다.",
    "items": [
      {
        "cue": "~로 변하다 / 옷을 갈아입다",
        "model": "change into [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "A에서 B로 바뀌다",
        "model": "change from A to B",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 ~로 바꾸다",
        "model": "change [thing] to [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "옷을 갈아입고 나오다",
        "model": "change out of [clothes]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "마음을 바꾸다 / 생각을 바꾸다",
        "model": "change [one's] mind",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~를 위해 바뀌다",
        "model": "change for [reason/person]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~시스템으로 전환하다",
        "model": "change over to [system]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "다시 바꾸다",
        "model": "change back",
        "tier": 2,
        "star": true
      },
      {
        "cue": "변화를 주다",
        "model": "change up [routine/design]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "시간/상황에 따라 바뀌다",
        "model": "change with [time/context]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "파일/시스템에서 ~을 바꾸다",
        "model": "change [thing] in [file/system]",
        "tier": 2
      },
      {
        "cue": "화면/페이지에서 ~을 바꾸다",
        "model": "change [thing] on [page/screen]",
        "tier": 2
      },
      {
        "cue": "더 좋게 바꾸다",
        "model": "change [thing] for the better",
        "tier": 2
      },
      {
        "cue": "더 나쁘게 바꾸다",
        "model": "change [thing] for the worse",
        "tier": 2
      },
      {
        "cue": "평소와 달리 / 기분 전환으로",
        "model": "for a change",
        "tier": 2,
        "easyEn": "to do something different from the usual routine"
      }
    ]
  },
  {
    "id": "update",
    "verb": "UPDATE",
    "gloss": "update는 갱신하다, 알려주다, 최신화하다.",
    "items": [
      {
        "cue": "~에게 계속 업데이트해주다",
        "model": "keep [person] updated on [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에게 ~에 대해 업데이트하다",
        "model": "update [person] on [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "시스템을 ~버전으로 업데이트하다",
        "model": "update [system] to [version]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에서 가져와 업데이트하다",
        "model": "update [thing] from [source]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "문서를 정보로 업데이트하다",
        "model": "update [document] with [information]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 위해 업데이트하다",
        "model": "update [thing] for [reason/user]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "최신 정보로 업데이트되어 있다",
        "model": "be updated with [latest info]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "DB/파일에서 필드를 업데이트하다",
        "model": "update [field] in [database/file]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "화면/페이지에서 ~을 업데이트하다",
        "model": "update [thing] on [page/screen]",
        "tier": 2
      },
      {
        "cue": "마감 전 업데이트하다",
        "model": "update [thing] before [deadline]",
        "tier": 2
      },
      {
        "cue": "변경 후 업데이트하다",
        "model": "update [thing] after [change]",
        "tier": 2
      }
    ]
  },
  {
    "id": "feel",
    "verb": "FEEL",
    "gloss": "feel은 감각·감정·직관의 동사다. (몸·마음으로) 느끼다, ~한 기분이다, 만져서 알다, ~인 것 같다, (남의 처지를) 헤아리다.",
    "items": [
      {
        "cue": "~한 기분/상태이다. feel tired / sick / confident. (기분·컨디션 표현의 기본형, 연결동사 용법)",
        "model": "feel [adjective]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~하고 싶다. I feel like taking a break. (= want to)",
        "model": "feel like [-ing]",
        "tier": 1,
        "star": true,
        "easyEn": "want to do something"
      },
      {
        "cue": "편하게/얼마든지 ~하세요. Feel free to reach out. (직장 이메일·슬랙 단골)",
        "model": "feel free to [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 대해 어떻게 느끼다/생각하다. How do you feel about the deadline? (면접·1:1 단골)",
        "model": "feel about [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~를 불쌍히/안쓰럽게 여기다, 동정하다.",
        "model": "feel sorry for [person]",
        "tier": 1
      },
      {
        "cue": "~를 안쓰럽게 여기다, 마음으로 헤아리다, 공감하다. I really feel for you.",
        "model": "feel for [person]",
        "tier": 2,
        "easyEn": "feel sympathy for someone who is suffering"
      },
      {
        "cue": "~할 기운/컨디션이 되다. I don't feel up to it today. (주로 부정·의문문)",
        "model": "feel up to [thing]",
        "tier": 2,
        "easyEn": "have the energy or health to do something"
      },
      {
        "cue": "떠보다, 의중·분위기를 살피다, 간을 보다. Let me feel out the team first.",
        "model": "feel out [person/situation]",
        "tier": 2,
        "easyEn": "carefully find out what someone thinks or feels"
      },
      {
        "cue": "~에 대해 강한 의견/확신을 갖다. I feel strongly about this approach.",
        "model": "feel strongly about [thing]",
        "tier": 2
      },
      {
        "cue": "~할 필요를 느끼다. I don't feel the need to refactor it now.",
        "model": "feel the need to [verb]",
        "tier": 2
      },
      {
        "cue": "~에 대한 감을 잡다, 익숙해지다. get a feel for the codebase. (온보딩 단골)",
        "model": "get a feel for [thing]",
        "tier": 2,
        "easyEn": "become familiar with how something works"
      },
      {
        "cue": "편안하다, 익숙해서 마음이 놓이다. I feel at home with this stack.",
        "model": "feel at home",
        "tier": 2,
        "easyEn": "feel comfortable and relaxed in a place"
      },
      {
        "cue": "소외감을 느끼다, 끼지 못한/빠진 느낌이 들다.",
        "model": "feel left out",
        "tier": 2,
        "easyEn": "feel excluded from a group"
      },
      {
        "cue": "어울리지 않는/겉도는 느낌이 들다, 어색하다.",
        "model": "feel out of place",
        "tier": 2,
        "easyEn": "feel that you do not belong somewhere"
      },
      {
        "cue": "~가 …하는 것을 느끼다 (지각동사). I felt the floor shake. / I felt my phone buzz.",
        "model": "feel [thing] [verb]",
        "tier": 2
      },
      {
        "cue": "~라고 생각하다/느끼다 (의견을 부드럽게 말할 때; feel like [clause]보다 격식 있어 직장 이메일·글에 적합). I feel that we should test this first.",
        "model": "feel that [clause]",
        "tier": 2
      },
      {
        "cue": "~하는 게 편하다/부담 없다, 자신 있다. Do you feel comfortable working with React? (면접 단골)",
        "model": "feel comfortable [-ing]",
        "tier": 2
      },
      {
        "cue": "몸이 좀 안 좋다, 컨디션이 별로다. (관용구)",
        "model": "feel under the weather",
        "tier": 3,
        "easyEn": "feel slightly sick or unwell"
      },
      {
        "cue": "더듬어 나아가다; 조심스럽게/탐색하듯 진행하다. We're still feeling our way.",
        "model": "feel one's way",
        "tier": 3,
        "easyEn": "move or act slowly and carefully while learning"
      },
      {
        "cue": "(주로 돈·예산이) 쪼들리다, 경제적 압박을 느끼다. (관용구) Startups feel the pinch when funding dries up.",
        "model": "feel the pinch",
        "tier": 3,
        "easyEn": "have less money than before; struggle with money"
      },
      {
        "cue": "압박/부담을 받다. The team is feeling the heat before launch.",
        "model": "feel the heat",
        "tier": 3,
        "easyEn": "feel strong pressure or stress"
      },
      {
        "cue": "(informal·성적) 몸을 더듬다, 추행하다. ※ feel up to와 혼동 금지 — 직장에서 쓰지 말 것.",
        "model": "feel up [person]",
        "tier": 3,
        "easyEn": "touch someone's body in a sexual way"
      }
    ]
  },
  {
    "id": "send",
    "verb": "SEND",
    "gloss": "send는 무언가를 한 지점에서 다른 지점으로 보내는 동사다. 보내다, 발송하다, 전달하다, (사람을) 부르다, (신호를) 전하다.",
    "items": [
      {
        "cue": "~에게 ~을 보내다 (가장 기본형)",
        "model": "send [thing] to [person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에게 ~을 보내주다 (수여동사 2목적어, 예: send me the file)",
        "model": "send [person] [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "(여러 곳에) 발송하다, 배포하다 (이메일·청구서·초대장 등)",
        "model": "send out [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "(이쪽으로/그 사람에게) 보내주다 (예: send over the draft, can you send that over?)",
        "model": "send over [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "돌려보내다, 반송하다, 반품하다",
        "model": "send back [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "제출하다 (지원서·양식), (인력·지원을) 투입하다",
        "model": "send in [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "부치다, 발송하다; (떠나는 사람을) 배웅하다",
        "model": "send off [thing]",
        "tier": 2
      },
      {
        "cue": "(시스템·채널을 통해) 전송하다, 보내 처리하다 (NA에서는 send over가 더 흔함)",
        "model": "send through [thing]",
        "tier": 2
      },
      {
        "cue": "회람하다, 여러 사람에게 돌리다 (예: send around the agenda)",
        "model": "send around [thing]",
        "tier": 2,
        "easyEn": "give something to many people in turn"
      },
      {
        "cue": "(오라고) 부르다, 호출하다; 청해서 가져오게 하다 (예: send for help, send for backup)",
        "model": "send for [person/thing]",
        "tier": 2,
        "easyEn": "ask or order someone to come to you"
      },
      {
        "cue": "돌려보내다, 내쫓다; 멀리 보내다",
        "model": "send away [person]",
        "tier": 2
      },
      {
        "cue": "상부에 올리다, (윗선에) 에스컬레이션하다",
        "model": "send [something] up the chain",
        "tier": 2,
        "easyEn": "pass a decision or issue to higher-level managers"
      },
      {
        "cue": "안부를 전하다",
        "model": "send my/your regards (to [person])",
        "tier": 2,
        "easyEn": "send a friendly greeting to someone"
      },
      {
        "cue": "(받은 것을) 다른 사람에게 전달하다, 포워딩하다 (NA에서는 forward가 더 자연스러움)",
        "model": "send on [thing] (to [person])",
        "tier": 3,
        "easyEn": "pass something you received to another person"
      },
      {
        "cue": "우편·온라인으로 주문하다 (멀리 신청해서 받다, 예: send away for a brochure)",
        "model": "send away for [thing]",
        "tier": 3,
        "easyEn": "order something by mail and wait for delivery"
      },
      {
        "cue": "(음식 등을) 배달 주문하다 (예: send out for pizza)",
        "model": "send out for [thing]",
        "tier": 3,
        "easyEn": "order food to be delivered to you"
      },
      {
        "cue": "쫓아내다, 단칼에 돌려보내다 (관용구)",
        "model": "send [someone] packing",
        "tier": 3,
        "easyEn": "force someone to leave suddenly"
      },
      {
        "cue": "등골을 오싹하게 만들다 (관용구)",
        "model": "send shivers/chills down [someone's] spine",
        "tier": 3,
        "easyEn": "make someone feel sudden fear or strong emotion"
      },
      {
        "cue": "소식을 전하다, 기별하다 (다소 격식·문어체)",
        "model": "send word (to [person])",
        "tier": 3,
        "easyEn": "send a message or news to someone"
      }
    ]
  },
  {
    "id": "spend",
    "verb": "SPEND",
    "gloss": "spend는 자원을 소모하는 뼈대다. 돈·시간·노력을 어딘가에 쓰거나 들이다, 시간을 보내다.",
    "items": [
      {
        "cue": "[돈]을 [무엇]에 쓰다",
        "model": "spend [money] on [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "[무엇]을 하는 데 [시간]을 쓰다 (예: spend time coding)",
        "model": "spend [time] -ing",
        "tier": 1,
        "star": true
      },
      {
        "cue": "[사람]과 [시간]을 보내다",
        "model": "spend [time] with [person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "[장소(도시·나라 등)]에서 [시간]을 보내다",
        "model": "spend [time] in [place]",
        "tier": 1
      },
      {
        "cue": "[회사·특정 장소]에서 [시간]을 보내다/근무하다 (예: spent 3 years at Amazon)",
        "model": "spend [time] at [place/company]",
        "tier": 1
      },
      {
        "cue": "[돈]을 들여 [무엇]을 하다 (예: spent $500 fixing it)",
        "model": "spend [money] -ing [thing]",
        "tier": 2
      },
      {
        "cue": "([무엇]에) 거금을 쓰다",
        "model": "spend a fortune (on [thing])",
        "tier": 2,
        "easyEn": "spend a very large amount of money"
      },
      {
        "cue": "하룻밤을 보내다, 자고 가다",
        "model": "spend the night",
        "tier": 2,
        "easyEn": "sleep at a place overnight"
      },
      {
        "cue": "제대로/가치 있게 쓴 [돈·시간] (예: time well spent)",
        "model": "[money/time] well spent",
        "tier": 2,
        "easyEn": "worth the money or time you used"
      },
      {
        "cue": "예산을 초과해 쓰다, 과소비하다",
        "model": "overspend (the budget)",
        "tier": 2
      },
      {
        "cue": "현명하게 (돈을) 쓰다",
        "model": "spend wisely",
        "tier": 2
      },
      {
        "cue": "아낌없이/펑펑 쓰다",
        "model": "spend freely",
        "tier": 2
      },
      {
        "cue": "(저축·예비 자금·런웨이를) 점점 헐어 써서 줄이다",
        "model": "spend down [savings/reserves]",
        "tier": 3,
        "easyEn": "slowly use up your savings or money over time"
      }
    ]
  },
  {
    "id": "pay",
    "verb": "PAY",
    "gloss": "pay은 \"돈을 치르다\"가 기본 뼈대. 값을 내다, 빚을 갚다, 대가를 치르다, 보답하다, (노력이) 결실을 맺다, 주의를 기울이다.",
    "items": [
      {
        "cue": "~의 값을 치르다, 결제하다; (잘못의) 대가를 치르다",
        "model": "pay for [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 주의를 기울이다, 신경 쓰다",
        "model": "pay attention to [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "(빚을) 다 갚다; (노력·투자가) 결실을 맺다, 성과를 내다",
        "model": "pay off",
        "tier": 2,
        "star": true,
        "easyEn": "finish paying a debt; or bring a good result"
      },
      {
        "cue": "(빌린) 돈을 갚다; (당한 것을) 되갚다, 앙갚음하다",
        "model": "pay [person] back / pay back [money]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(빚·원금을) 조금씩 갚아 나가다 (예: pay down technical debt = 기술 부채를 줄여 나가다)",
        "model": "pay down [debt]",
        "tier": 2,
        "easyEn": "reduce a debt by paying part of it over time"
      },
      {
        "cue": "(큰돈·보험금·배당금을) 지급하다, 풀다",
        "model": "pay out [money]",
        "tier": 2,
        "easyEn": "give out a large sum of money"
      },
      {
        "cue": "(마지못해) 돈을 다 내다, 빚을 청산하다",
        "model": "pay up",
        "tier": 2,
        "easyEn": "pay money you owe, often unwillingly"
      },
      {
        "cue": "(계좌·연금·펀드에) 돈을 납입하다, 불입하다",
        "model": "pay into [account]",
        "tier": 2
      },
      {
        "cue": "생활비를 벌다, 먹고살게 해 주다; 청구서를 결제하다",
        "model": "pay the bills",
        "tier": 2,
        "easyEn": "earn enough money to cover your living costs"
      },
      {
        "cue": "(~에 대한) 대가를 치르다, 혹독한 값을 치르다",
        "model": "pay the price (for [thing])",
        "tier": 2,
        "easyEn": "suffer a bad result because of something you did"
      },
      {
        "cue": "임금 인상 / 임금 삭감",
        "model": "a pay raise / a pay cut",
        "tier": 2
      },
      {
        "cue": "카드로 결제하다 / 현금으로 내다",
        "model": "pay by [card] / pay in cash",
        "tier": 2
      },
      {
        "cue": "방문하다, 들르다",
        "model": "pay a visit (to [person/place]) / pay [person] a visit",
        "tier": 2
      },
      {
        "cue": "내 권한·결정 범위 밖이다 (직급상 내가 정할 일이 아니다)",
        "model": "above [one's] pay grade",
        "tier": 3,
        "easyEn": "not something I have the power to decide"
      },
      {
        "cue": "(성공·인정 전에) 응당한 고생과 수고를 거치다, 밑바닥부터 경력을 쌓다",
        "model": "pay [one's] dues",
        "tier": 3,
        "easyEn": "work hard for a long time before getting success"
      },
      {
        "cue": "받은 호의를 (직접 갚는 대신) 다른 사람에게 베풀다",
        "model": "pay it forward",
        "tier": 3,
        "easyEn": "help someone else instead of repaying the person who helped you"
      },
      {
        "cue": "~에게 경의·찬사를 표하다",
        "model": "pay tribute to [person]",
        "tier": 3,
        "easyEn": "publicly show respect or praise for someone"
      },
      {
        "cue": "(~에) 바가지를 쓰다, 엄청난 돈을 내다",
        "model": "pay through the nose (for [thing])",
        "tier": 3,
        "easyEn": "pay much more money than something is worth"
      },
      {
        "cue": "조의를 표하다, 문상하다; 예를 갖춰 인사하다",
        "model": "pay [one's] respects (to [person])",
        "tier": 3,
        "easyEn": "formally show respect, often to someone who has died"
      },
      {
        "cue": "~를 칭찬하다, 칭찬의 말을 건네다",
        "model": "pay [person] a compliment",
        "tier": 3,
        "easyEn": "say something nice and admiring to someone"
      },
      {
        "cue": "(입막음·뇌물로) ~를 매수하다, 돈을 주고 입막음하다",
        "model": "pay [person] off",
        "tier": 3,
        "easyEn": "give someone money secretly to keep them quiet"
      }
    ]
  },
  {
    "id": "follow",
    "verb": "FOLLOW",
    "gloss": "follow는 '뒤를 따라가다'가 뼈대다. (사람·사물을) 따라가다, (규칙·지시를) 따르다, (말을) 이해하다, 추적하다, 뒤이어 일어나다.",
    "items": [
      {
        "cue": "지시·규칙·단계를 따르다, 그대로 하다",
        "model": "follow [instructions/rules/steps]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "후속 조치를 하다; (나중에) 다시 연락하거나 확인하다",
        "model": "follow up",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 대해 후속으로 확인·처리하다",
        "model": "follow up on [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에게 추가로(후속) 연락하다",
        "model": "follow up with [person]",
        "tier": 1
      },
      {
        "cue": "(시작한 일을) 끝까지 해내다, 약속을 이행하다",
        "model": "follow through",
        "tier": 2,
        "star": true,
        "easyEn": "finish doing what you started or promised"
      },
      {
        "cue": "~을 끝까지 이행하다, 완수하다",
        "model": "follow through on [a promise/plan]",
        "tier": 2,
        "easyEn": "fully carry out a promise you made"
      },
      {
        "cue": "~을 끝까지 밀고 나가다, 실행에 옮기다",
        "model": "follow through with [a plan/decision]",
        "tier": 2,
        "easyEn": "carry a plan all the way to completion"
      },
      {
        "cue": "(설명·시범을) 따라 하다, 함께 진행을 따라가다",
        "model": "follow along",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 같이 따라 하다, 보면서 똑같이 진행하다",
        "model": "follow along with [a tutorial/speaker]",
        "tier": 2
      },
      {
        "cue": "(말을) 이해 못 하겠다 / 이해돼요?, 알아듣다",
        "model": "I don't follow / do you follow?",
        "tier": 2,
        "star": true,
        "easyEn": "I do not understand what you mean"
      },
      {
        "cue": "대화·논리·흐름을 따라가며 이해하다",
        "model": "follow the conversation/argument/logic",
        "tier": 2,
        "easyEn": "understand something as it develops"
      },
      {
        "cue": "절차·규정대로 처리하다 (직장)",
        "model": "follow protocol / follow procedure",
        "tier": 2
      },
      {
        "cue": "~의 주도·방식을 따르다, ~가 하는 대로 하다",
        "model": "follow [someone]'s lead",
        "tier": 2,
        "easyEn": "do what someone else does; let them guide you"
      },
      {
        "cue": "(SNS에서) 맞팔하다, 다시 팔로우해 주다",
        "model": "follow back",
        "tier": 2
      },
      {
        "cue": "~을 졸졸 따라다니다",
        "model": "follow [someone] around",
        "tier": 2
      },
      {
        "cue": "직감·본능을 따르다",
        "model": "follow your gut / follow your instincts",
        "tier": 2,
        "easyEn": "trust your natural feeling instead of careful thought"
      },
      {
        "cue": "다음과 같다 (목록·내용을 도입할 때)",
        "model": "as follows",
        "tier": 2,
        "easyEn": "as shown next in the following list"
      },
      {
        "cue": "후속 (이메일·회의·질문); 후속 연락·조치 (명사형) — 동사 follow up과 구분",
        "model": "a follow-up [email/meeting/question]",
        "tier": 2
      },
      {
        "cue": "~에 뒤이어 ~, ~ 다음에 (순서·시간; 기술 문서에서 흔함)",
        "model": "[X] followed by [Y]",
        "tier": 2
      },
      {
        "cue": "(남이 한 대로) 따라 하다, 선례를 따르다",
        "model": "follow suit",
        "tier": 3,
        "easyEn": "do the same thing someone else just did"
      },
      {
        "cue": "돈의 흐름을 추적하다 (조사·분석)",
        "model": "follow the money",
        "tier": 3,
        "easyEn": "follow where the money goes to find the truth"
      }
    ]
  },
  {
    "id": "mean",
    "verb": "MEAN",
    "gloss": "mean은 \"의미·의도·결과\"의 뼈대다. 뜻하다, 작정하다(의도하다), ~를 수반하다·초래하다, 진심이다. ~로 정해져 있다.",
    "items": [
      {
        "cue": "~을 의미하다, 뜻하다 (단어·표현의 뜻). 예: What does this acronym mean?",
        "model": "mean [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "내 말은, 그러니까 (말 정정·부연하는 회화 필러). 예: I mean, it works, but it's slow.",
        "model": "I mean ...",
        "tier": 1,
        "star": true,
        "easyEn": "used to explain or correct what you just said"
      },
      {
        "cue": "~할 작정이다, ~하려고 하다 (의도). 흔히 부정형: I didn't mean to interrupt = 끼어들 생각은 아니었다.",
        "model": "mean to [verb]",
        "tier": 1,
        "star": true,
        "easyEn": "intend to do something"
      },
      {
        "cue": "(말·행동)으로 ~라는 뜻으로 말하다. 예: What do you mean by 'flaky test'?",
        "model": "mean by [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~하기로 되어 있다, ~해야 한다 (예정·규칙·역할). 예: This script is meant to run nightly.",
        "model": "be meant to [verb]",
        "tier": 2,
        "star": true,
        "easyEn": "be supposed or expected to do something"
      },
      {
        "cue": "~에게 큰 의미가 있다, 소중하다. 예: Your review meant a lot to me.",
        "model": "mean [a lot / the world] to [person]",
        "tier": 2,
        "star": true,
        "easyEn": "be very important to someone"
      },
      {
        "cue": "~를 수반하다, ~라는 뜻이다 (필연적 결과). 예: Refactoring this means rewriting the tests.",
        "model": "mean [-ing] / mean [that-clause]",
        "tier": 2,
        "easyEn": "have something as a necessary result"
      },
      {
        "cue": "~를 위한 것이다, ~에 딱 맞다/어울리다. 예: This endpoint is meant for internal use only.",
        "model": "be meant for [person / purpose]",
        "tier": 2,
        "easyEn": "be intended for a certain person or use"
      },
      {
        "cue": "선의로 하다, 악의는 없다 (결과는 별개라는 뉘앙스). 예: He means well, but the PR broke prod.",
        "model": "mean well",
        "tier": 2,
        "easyEn": "want to help, even if the results are bad"
      },
      {
        "cue": "진심이다, 농담이 아니다. 예: I mean it — ship it today.",
        "model": "mean it",
        "tier": 2,
        "easyEn": "be serious and not joking"
      },
      {
        "cue": "~가 ~하도록 의도하다. 예: I didn't mean for the deploy to go out yet.",
        "model": "mean for [person] to [verb]",
        "tier": 2,
        "easyEn": "intend for someone to do something"
      },
      {
        "cue": "그렇다고 ~인 것은 아니다 (논리적 반박·단서). 예: Just because it compiles doesn't mean it works.",
        "model": "[thing] doesn't mean [that-clause]",
        "tier": 2
      },
      {
        "cue": "(그러니까) ~라는 말이지?, ~라는 거야? (상대 말 확인·재진술). 예: You mean the staging server, not prod?",
        "model": "you mean [thing / that-clause]?",
        "tier": 2,
        "easyEn": "used to confirm what someone just said"
      },
      {
        "cue": "무슨 말인지 알지(요)?, 그런 거 있잖아 (이해 확인 회화 태그). 예: It's a bit hacky, if you know what I mean.",
        "model": "know what I mean? / if you know what I mean",
        "tier": 2,
        "easyEn": "used to check the listener understands you"
      },
      {
        "cue": "진지하다, 작정하고 덤비다. 예: When the CTO joins the call, they mean business.",
        "model": "mean business",
        "tier": 3,
        "easyEn": "be serious and determined to act"
      },
      {
        "cue": "그렇게 될 운명이다, 될 일은 된다. 예: Guess this feature just wasn't meant to be.",
        "model": "(be) meant to be",
        "tier": 3,
        "easyEn": "sure to happen, as if it was always going to"
      }
    ]
  },
  {
    "id": "seem",
    "verb": "SEEM",
    "gloss": "seem은 '판단·인상'을 다루는 연결동사다. 단정하지 않고 ~인 것 같다, ~처럼 보이다, ~인 듯하다로 부드럽게 말한다.",
    "items": [
      {
        "cue": "~해 보이다, ~인 것 같다 (It seems reasonable. 합리적인 것 같다)",
        "model": "seem [adj]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~하는 것 같다, ~하는 듯하다 (They seem to agree. 동의하는 것 같다)",
        "model": "seem to [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~인 것 같다, ~처럼 보이다 (It seems like a good idea. 좋은 생각 같다)",
        "model": "seem like [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~인 것 같다, 보아하니 ~이다 (It seems that the build failed. 빌드가 실패한 것 같다)",
        "model": "it seems (that) [clause]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~인 것 같다, ~인 듯하다 (It seems to be working now. 이제 작동하는 것 같다)",
        "model": "seem to be [thing/adj]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "아무리 해도 ~이 안 되는 것 같다 (I can't seem to fix it. 도무지 못 고치겠다)",
        "model": "can't seem to [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~하지 않는 것 같다, ~인 것 같지 않다 (It doesn't seem to work. 안 되는 것 같다)",
        "model": "doesn't seem to [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~이 있는 것 같다 (There seems to be a delay. 지연이 있는 것 같다)",
        "model": "there seems to be [thing]",
        "tier": 2
      },
      {
        "cue": "~인 것 같다 (구어, It seems like nobody noticed. 아무도 못 본 것 같다)",
        "model": "seems like [clause]",
        "tier": 2
      },
      {
        "cue": "마치 ~인 것처럼 보이다 (It seems as if it's stuck. 멈춘 것처럼 보인다)",
        "model": "seem as if / seem as though [clause]",
        "tier": 2
      },
      {
        "cue": "~인 것 같다 (한 발 물러선 조심스러운 단정; It would seem we underestimated it. 우리가 과소평가한 것 같네요)",
        "model": "it would seem (that) [clause]",
        "tier": 2
      },
      {
        "cue": "~라고 생각하는/아는/믿는 것 같다 (종종 가벼운 반박 뉘앙스; You seem to think it's easy. 쉽다고 생각하는 것 같네)",
        "model": "seem to think / know / believe [clause]",
        "tier": 2
      },
      {
        "cue": "그건 맞지 않는/뭔가 이상한 것 같다 (직장에서 자주 쓰는 완곡한 이의 제기)",
        "model": "that doesn't seem right / seems off",
        "tier": 2
      },
      {
        "cue": "내가 보기엔 ~인 것 같다 (의견을 완곡하게 말할 때; It seems to me that we should refactor. 내 생각엔 리팩터링해야 할 것 같다)",
        "model": "it seems to me (that) [clause]",
        "tier": 2
      },
      {
        "cue": "[사람]이 보기엔 ~한 것 같다 (That seems fine to me. 내가 보기엔 괜찮은 것 같다)",
        "model": "seem [adj] to [person]",
        "tier": 2
      },
      {
        "cue": "(적어도) 그런 것 같네 / 겉보기엔 그렇다",
        "model": "so it seems / or so it seems",
        "tier": 3,
        "easyEn": "that is how it appears, though maybe not true"
      }
    ]
  },
  {
    "id": "miss",
    "verb": "MISS",
    "gloss": "miss는 '놓치다'가 뼈대다. 못 잡다·못 맞히다, 빠뜨리다, 빠지다(결석), 그리워하다.",
    "items": [
      {
        "cue": "(버스·비행기·회의·기회를) 놓치다, 못 잡다. ex: miss the bus / miss the meeting",
        "model": "miss [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "핵심을 놓치다, 요점을 못 잡다. ex: you're missing the point",
        "model": "miss the point",
        "tier": 1,
        "star": true
      },
      {
        "cue": "(좋은 기회·혜택을) 놓치다, 못 누리다. ex: miss out on the discount",
        "model": "miss out on [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "(못 껴서) 손해 보다, 빠지다. ex: I don't want you to miss out",
        "model": "miss out",
        "tier": 1,
        "star": true
      },
      {
        "cue": "(전화·회의에서 한 말·정보를) 못 듣다, 못 알아듣다. ex: Sorry, I missed that — can you say it again?",
        "model": "miss that / miss [what was said]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "전화를 못 받다; 부재중 전화. ex: I missed your call / a missed call",
        "model": "miss a call / missed call",
        "tier": 1
      },
      {
        "cue": "빗나가다, 기대에 못 미치다, 핵심을 벗어나다. ex: the demo missed the mark",
        "model": "miss the mark",
        "tier": 2,
        "easyEn": "fail to reach the intended goal or standard"
      },
      {
        "cue": "사라지다, 없어지다, 행방불명되다. ex: the file went missing",
        "model": "go missing",
        "tier": 2
      },
      {
        "cue": "빠져 있다, 없다. ex: a semicolon is missing / something's missing here",
        "model": "be missing",
        "tier": 2
      },
      {
        "cue": "(길 안내) 바로 보여요, 못 찾을 리 없어요.",
        "model": "you can't miss it",
        "tier": 2
      },
      {
        "cue": "아슬아슬하게 놓치다 / 가까스로 피하다. ex: narrowly miss the train",
        "model": "narrowly / barely miss [thing]",
        "tier": 2
      },
      {
        "cue": "(절차·단계를) 빠뜨리다, 누락하다. ex: did I miss a step in the setup?",
        "model": "miss a step",
        "tier": 2
      },
      {
        "cue": "(기회·타이밍의) 적기를 놓치다. ex: we missed the window to launch",
        "model": "miss the window",
        "tier": 2,
        "easyEn": "miss the right time to do something"
      },
      {
        "cue": "(이미 늦어) 기회를 놓치다. ex: we missed the boat on that trend",
        "model": "miss the boat",
        "tier": 3,
        "easyEn": "lose a chance by acting too late"
      },
      {
        "cue": "흔들림 없이, 당황하지 않고 곧바로. ex: he answered without missing a beat",
        "model": "without missing a beat",
        "tier": 3,
        "easyEn": "responding instantly, with no pause or hesitation"
      },
      {
        "cue": "들쭉날쭉한, 운에 좌우되는, 일관성 없는. ex: the wifi here is hit or miss",
        "model": "hit or miss",
        "tier": 3,
        "easyEn": "sometimes good, sometimes bad; not reliable"
      },
      {
        "cue": "무슨 일이 있어도 꼭 갈게/참석할게.",
        "model": "wouldn't miss it (for the world)",
        "tier": 3,
        "easyEn": "I will definitely come; nothing would stop me"
      },
      {
        "cue": "큰일 날 뻔함, 아슬아슬하게 비켜감 (사고·충돌). ex: that was a near miss",
        "model": "near miss",
        "tier": 3,
        "easyEn": "a situation where an accident was barely avoided"
      }
    ]
  },
  {
    "id": "end",
    "verb": "END",
    "gloss": "end는 '끝'을 다루는 뼈대다. 끝나다, 끝내다, 그리고 결국 ~한 상태/결과에 이르다(end up).",
    "items": [
      {
        "cue": "결국 ~하게 되다, 결국 ~한 처지가 되다 (의도와 다르게 도달한 결말)",
        "model": "end up",
        "tier": 1,
        "star": true
      },
      {
        "cue": "결국 ~하고 말다, 어쩌다 보니 ~하게 되다 (We ended up rewriting the whole thing)",
        "model": "end up [-ing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "결국 ~을 갖게/떠안게 되다 (We ended up with a ton of tech debt)",
        "model": "end up with [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "결국 ~에 처하게 되다, ~로 흘러가다 (ended up in prod, ended up in a meeting)",
        "model": "end up in [place/state]",
        "tier": 1
      },
      {
        "cue": "결국엔, 마지막에 가서는 (긴 과정 끝의 결론)",
        "model": "in the end",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 끝내다, 종료하다 (end the call / the meeting / the relationship) — 타동사",
        "model": "end [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~이 끝날 때까지, (기한) ~까지 (by the end of the day = 오늘 퇴근 전까지/EOD, by the end of the week = 이번 주 안에)",
        "model": "by the end of [time]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~의 끝에, ~이 끝날 무렵에 (문자 그대로의 위치/시점: at the end of the file / the sprint / the month)",
        "model": "at the end of [thing]",
        "tier": 1
      },
      {
        "cue": "~로 끝나다, ~로 귀결되다 (end in failure / disaster / a tie)",
        "model": "end in [thing]",
        "tier": 2
      },
      {
        "cue": "~로 끝맺다, ~으로 마무리하다 (Let's end with a quick recap)",
        "model": "end with [thing]",
        "tier": 2
      },
      {
        "cue": "결국 따지고 보면, 중요한 건 (직장에서 핵심을 짚을 때 흔함)",
        "model": "at the end of the day",
        "tier": 2,
        "star": true,
        "easyEn": "in the end, what matters most after everything"
      },
      {
        "cue": "끝나다, 막을 내리다 (The sprint came to an end)",
        "model": "come to an end",
        "tier": 2
      },
      {
        "cue": "~을 끝내다, 종결시키다 (격식 있는 표현)",
        "model": "bring [thing] to an end",
        "tier": 2
      },
      {
        "cue": "~을 끝장내다, 종식시키다 (put an end to the confusion)",
        "model": "put an end to [thing]",
        "tier": 2
      },
      {
        "cue": "막다른 길, 더 진전 없는 상황 (This approach is a dead end)",
        "model": "dead end",
        "tier": 2,
        "easyEn": "a situation with no way to make progress"
      },
      {
        "cue": "종단간의, 전 과정 전체의 (end-to-end testing / encryption — 기술 용어)",
        "model": "end-to-end",
        "tier": 2,
        "easyEn": "covering the whole process from start to finish"
      },
      {
        "cue": "최종 사용자, 실제 쓰는 사람 (제품/기술 맥락)",
        "model": "end user",
        "tier": 2
      },
      {
        "cue": "최종 목표, 궁극적인 목적",
        "model": "end goal",
        "tier": 2
      },
      {
        "cue": "최종 결과물, 모든 게 끝난 뒤의 결과",
        "model": "end result",
        "tier": 2
      },
      {
        "cue": "프런트엔드(사용자 화면 쪽) / 백엔드(서버 쪽) — 개발 직군·시스템 아키텍처 용어 (front-end developer, back-end service)",
        "model": "front end / back end",
        "tier": 2,
        "easyEn": "the user-facing side / the server side of software"
      },
      {
        "cue": "겨우 먹고살다, 수입에 맞춰 빠듯하게 생활하다 (관용구)",
        "model": "make ends meet",
        "tier": 3,
        "easyEn": "earn just enough money to pay for basic needs"
      },
      {
        "cue": "남은 자잘한 일들을 마무리 짓다, 끝마무리하다",
        "model": "tie up loose ends",
        "tier": 3,
        "easyEn": "finish the small remaining tasks or details"
      },
      {
        "cue": "~하게 마무리하다 (end the quarter on a high note = 좋게 끝맺다)",
        "model": "end on [a high/low note]",
        "tier": 3,
        "easyEn": "finish in a good or bad way"
      },
      {
        "cue": "연이어, 쉬지 않고 계속 (for hours/days on end)",
        "model": "on end",
        "tier": 3,
        "easyEn": "without stopping, for a long time"
      }
    ]
  },
  {
    "id": "stand",
    "verb": "STAND",
    "gloss": "stand는 '서다'가 뼈대다. 서 있다, 견디다, 위치하다, 입장을 지키다, 의미하다/대표하다.",
    "items": [
      {
        "cue": "일어서다; (구어) ~을 바람맞히다; (IT) 서버·환경을 구축하다/띄우다 (stand up a server/environment)",
        "model": "stand up / stand [person] up",
        "tier": 1,
        "star": true
      },
      {
        "cue": "두드러지다, 눈에 띄다 (이력서·후보가 돋보이다)",
        "model": "stand out (from [others])",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 의미하다/~의 약자다 (What does API stand for?); (부정문) ~을 용납하다/좌시하다 (I won't stand for it)",
        "model": "stand for [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "to represent or be the short form of something"
      },
      {
        "cue": "~을 못 견디다, 질색하다",
        "model": "can't stand [thing/-ing]",
        "tier": 1,
        "star": true,
        "easyEn": "to strongly dislike someone or something"
      },
      {
        "cue": "대기하다; 곁을 지키다; (약속·결정·발언을) 고수하다 (I stand by what I said)",
        "model": "stand by ([person/decision])",
        "tier": 2,
        "star": true,
        "easyEn": "to support someone or stay loyal to a decision"
      },
      {
        "cue": "옹호하다, 편들다, (권리를) 위해 나서다 (stand up for yourself)",
        "model": "stand up for [person/thing]",
        "tier": 2,
        "easyEn": "to defend or support someone or something"
      },
      {
        "cue": "(강자·압력에) 맞서다; (혹사·검증을) 견뎌내다 (stand up to scrutiny)",
        "model": "stand up to [person/pressure]",
        "tier": 2,
        "easyEn": "to resist or face someone or something strong"
      },
      {
        "cue": "(부재중인) ~을 대신하다, 대타로 뛰다",
        "model": "stand in for [person]",
        "tier": 2,
        "easyEn": "to take someone's place for a while"
      },
      {
        "cue": "뒤로 물러서다; (거리를 두고) 한발 떨어져 객관적으로 보다",
        "model": "stand back",
        "tier": 2
      },
      {
        "cue": "(비상·경계·동원을) 해제하다, 철수하다 (We can stand down now) — 온콜/인시던트 상황에서 흔함; (직책에서) 물러나다·사퇴하다 (이 뜻은 주로 英, 美는 step down)",
        "model": "stand down",
        "tier": 2,
        "easyEn": "to stop being on alert or active duty"
      },
      {
        "cue": "(하는 일 없이) 빈둥거리며 서 있다",
        "model": "stand around",
        "tier": 2
      },
      {
        "cue": "(성공할) 가능성이 있다 (주로 부정문: don't stand a chance)",
        "model": "stand a chance (of [-ing])",
        "tier": 2,
        "easyEn": "to have a real possibility of succeeding"
      },
      {
        "cue": "현재 상황으로는, 지금 이대로라면",
        "model": "as it stands / as things stand",
        "tier": 2,
        "easyEn": "in the current situation; as things are now"
      },
      {
        "cue": "(수치·기록이) ~에 달하다, ~이다 (Revenue stands at $1M)",
        "model": "stand at [number]",
        "tier": 2,
        "easyEn": "to be at a particular level or amount"
      },
      {
        "cue": "(어떤 사안에 대해) 어떤 입장·상황인지 묻다 (Where do we stand on the deadline?) — 회의에서 진행 상황·합의 여부 확인 시 자주 씀",
        "model": "where do [you/we] stand (on [thing])",
        "tier": 2,
        "easyEn": "what is your opinion or current status on something"
      },
      {
        "cue": "~을 얻을/잃을 처지·가능성이 크다 (You stand to gain a lot)",
        "model": "stand to [gain/lose]",
        "tier": 3,
        "easyEn": "to be likely to gain or lose something"
      },
      {
        "cue": "물러서지 않고 자기 입장을 고수하다",
        "model": "stand one's ground",
        "tier": 3,
        "easyEn": "to refuse to change your opinion when others oppose you"
      },
      {
        "cue": "(입장·원칙을) 확고히 지키다, 굽히지 않다",
        "model": "stand firm (on [thing])",
        "tier": 3,
        "easyEn": "to keep your opinion strongly and refuse to change"
      },
      {
        "cue": "세월의 검증을 견디다, 오래도록 통하다",
        "model": "stand the test of time",
        "tier": 3,
        "easyEn": "to stay good or valid over many years"
      },
      {
        "cue": "내가 틀렸음을 인정하다, 정정을 받아들이다 (I stand corrected)",
        "model": "stand corrected",
        "tier": 3,
        "easyEn": "to admit that you were wrong"
      },
      {
        "cue": "당연하다, 이치에 맞다 (It stands to reason that…)",
        "model": "stand to reason",
        "tier": 3,
        "easyEn": "to be logical or obvious"
      }
    ]
  },
  {
    "id": "fall",
    "verb": "FALL",
    "gloss": "fall은 \"떨어지다/넘어지다\"가 뼈대. 가치·수치가 하락하다, 어떤 상태로 빠지다, 계획이 무산되다, 어떤 범주에 속하다.",
    "items": [
      {
        "cue": "잠들다",
        "model": "fall asleep",
        "tier": 1,
        "star": true
      },
      {
        "cue": "(~와) 사랑에 빠지다",
        "model": "fall in love (with [person])",
        "tier": 1,
        "star": true
      },
      {
        "cue": "부서지다, 무너지다; (계획·관계가) 와해되다; (사람이 정신적으로) 무너지다",
        "model": "fall apart",
        "tier": 1,
        "star": true
      },
      {
        "cue": "(계획·거래가) 무산되다, 깨지다, 성사되지 못하다",
        "model": "fall through",
        "tier": 2,
        "star": true,
        "easyEn": "(of a plan or deal) to fail to happen"
      },
      {
        "cue": "(일정·진도에서) 뒤처지다, 밀리다",
        "model": "fall behind",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(지불·업무가) 밀리다, ~을 제때 못 따라가다",
        "model": "fall behind on [payments/work]",
        "tier": 2
      },
      {
        "cue": "(여의치 않을 때) ~에 의지하다, ~을 비상수단으로 쓰다 (cf. 명사 fallback)",
        "model": "fall back on [plan/skill/person]",
        "tier": 2,
        "star": true,
        "easyEn": "to use something for support when other plans fail"
      },
      {
        "cue": "(속임수에) 속아넘어가다; (~에게) 홀딱 반하다",
        "model": "fall for [it] / fall for [person]",
        "tier": 2,
        "star": true,
        "easyEn": "to be tricked; or to become attracted to someone"
      },
      {
        "cue": "(목표·기대에) 못 미치다, 부족하다",
        "model": "fall short (of [goal/expectation])",
        "tier": 2,
        "star": true,
        "easyEn": "to fail to reach a goal or expectation"
      },
      {
        "cue": "~의 범주에 속하다, ~ 소관이다 (it falls under my team)",
        "model": "fall under [category/jurisdiction]",
        "tier": 2,
        "star": true,
        "easyEn": "to belong to a category or be someone's responsibility"
      },
      {
        "cue": "떨어져 나가다; (수치·수요·품질이) 감소하다, 줄다",
        "model": "fall off",
        "tier": 2
      },
      {
        "cue": "~에 속하다; (습관·함정에) 빠지다",
        "model": "fall into [category/habit/trap]",
        "tier": 2,
        "easyEn": "to enter a group, a habit, or a trap"
      },
      {
        "cue": "(머리카락·이빨이) 빠지다; (사이가) 틀어지다 — 단, 다툼 뜻은 NA에선 명사 \"have a falling-out\"이 더 자연스러움",
        "model": "fall out",
        "tier": 2
      },
      {
        "cue": "뒤로 물러나다, 후퇴하다; (시계를) 한 시간 되돌리다 (서머타임 해제, \"spring forward, fall back\")",
        "model": "fall back",
        "tier": 2
      },
      {
        "cue": "넘어지다, 쓰러지다; (논리·계획이) 허점을 드러내다, 무너지다",
        "model": "fall down",
        "tier": 2
      },
      {
        "cue": "넘어지다, 자빠지다; (물건이) 쓰러지다",
        "model": "fall over",
        "tier": 2
      },
      {
        "cue": "(관리 소홀로) 누락되다, 빠뜨려져 처리 안 되다 (= slip through the cracks)",
        "model": "fall through the cracks",
        "tier": 2,
        "easyEn": "to be missed or forgotten by mistake"
      },
      {
        "cue": "(일이) 제자리를 찾다, 맞아떨어지다, 정리되다",
        "model": "fall into place",
        "tier": 2,
        "easyEn": "(of things) to become clear and organized as expected"
      },
      {
        "cue": "(농담·시도·발표가) 먹히지 않다, 반응 없이 실패하다",
        "model": "fall flat",
        "tier": 2,
        "easyEn": "to fail to get the wanted reaction"
      },
      {
        "cue": "(책임·부담이) ~에게 돌아가다; (날짜가) ~에 해당하다",
        "model": "fall on [person] / fall on [date]",
        "tier": 2,
        "easyEn": "(duty) to become someone's job; (date) to happen on"
      },
      {
        "cue": "병이 나다, 앓아눕다 (다소 격식체; NA 구어로는 보통 get sick)",
        "model": "fall ill",
        "tier": 2
      },
      {
        "cue": "~의 희생양이 되다, ~에 당하다 (fall victim to a scam / fall prey to phishing)",
        "model": "fall victim to [thing] / fall prey to [thing]",
        "tier": 2,
        "easyEn": "to be harmed or affected by something bad"
      },
      {
        "cue": "(계획·습관 등이) 흐지부지되다, 도중에 밀려나 중단되다",
        "model": "fall by the wayside",
        "tier": 3,
        "easyEn": "to be abandoned or stop being done over time"
      },
      {
        "cue": "(인기·사용·애정에서) 밀려나다; ~의 총애를 잃다, 더 이상 쓰이지 않게 되다 (the library fell out of favor/use)",
        "model": "fall out of [favor/use/love]",
        "tier": 3,
        "easyEn": "to stop being popular, used, or loved"
      }
    ]
  },
  {
    "id": "catch",
    "verb": "CATCH",
    "gloss": "catch는 '잡다/붙잡다'가 뼈대다. (날아오는 걸) 받다, 따라잡다, 알아채다·알아듣다, (병에) 걸리다, (현장을) 들키게 잡다, 시간 맞춰 타다.",
    "items": [
      {
        "cue": "따라잡다; 밀린 일을 처리하다; (오랜만에) 근황을 나누다 (Let's catch up sometime)",
        "model": "catch up",
        "tier": 1,
        "star": true
      },
      {
        "cue": "밀린 ~을 만회하다 (catch up on sleep / email / work)",
        "model": "catch up on [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~와 근황을 나누다; (앞선) ~를 따라잡다",
        "model": "catch up with [person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "(말을) 알아듣다·알아채다 (Sorry, I didn't catch that)",
        "model": "(didn't) catch [that]",
        "tier": 1,
        "star": true,
        "easyEn": "to hear or understand what someone said"
      },
      {
        "cue": "(병에) 걸리다",
        "model": "catch a cold / catch the flu",
        "tier": 1,
        "star": true,
        "easyEn": "to become sick with a cold or flu"
      },
      {
        "cue": "(차편을) 시간 맞춰 잡아타다",
        "model": "catch the bus / catch a flight",
        "tier": 1,
        "star": true,
        "easyEn": "to get on a bus or plane in time"
      },
      {
        "cue": "(뒤처졌다가) ~의 수준까지 따라잡다 (catch up to the competition)",
        "model": "catch up to [person/thing]",
        "tier": 2
      },
      {
        "cue": "(아이디어·유행이) 인기를 얻다·자리잡다; 이해하다·감을 잡다",
        "model": "catch on",
        "tier": 2,
        "star": true,
        "easyEn": "to become popular; or to start to understand"
      },
      {
        "cue": "~을 알아차리다·간파하다",
        "model": "catch on to [thing]",
        "tier": 2,
        "easyEn": "to start to understand or notice something"
      },
      {
        "cue": "~의 허를 찌르다, 방심한 틈을 노리다 (The question caught me off guard)",
        "model": "catch [person] off guard",
        "tier": 2,
        "star": true,
        "easyEn": "to surprise someone who is not ready"
      },
      {
        "cue": "~가 ...하는 현장을 잡다·들키다 (catch them in the act)",
        "model": "catch [person] doing [-ing]",
        "tier": 2,
        "star": true,
        "easyEn": "to find someone while they are doing something"
      },
      {
        "cue": "(놓친 내용을) ~에게 알려줘 따라잡게 하다 (Can you catch me up on the project?)",
        "model": "catch [person] up",
        "tier": 2,
        "easyEn": "to tell someone the news they missed"
      },
      {
        "cue": "~에 휘말리다·휩쓸리다; ~에 푹 몰두하다",
        "model": "get caught up in [thing]",
        "tier": 2,
        "easyEn": "to become very involved in something"
      },
      {
        "cue": "~의 눈길을 끌다",
        "model": "catch [person]'s eye",
        "tier": 2,
        "easyEn": "to attract someone's attention or notice"
      },
      {
        "cue": "~의 주의·관심을 끌다",
        "model": "catch [person]'s attention",
        "tier": 2
      },
      {
        "cue": "~을 흘끗 보다",
        "model": "catch a glimpse of [thing]",
        "tier": 2
      },
      {
        "cue": "불이 붙다; (인기가) 급속히 번지다",
        "model": "catch fire",
        "tier": 2,
        "easyEn": "to start burning; or to quickly become very popular"
      },
      {
        "cue": "숨을 고르다·돌리다",
        "model": "catch your breath",
        "tier": 2,
        "easyEn": "to rest until you can breathe normally again"
      },
      {
        "cue": "나중에 봐 (격식 없는 작별 인사)",
        "model": "catch you later",
        "tier": 2,
        "easyEn": "an informal way to say goodbye"
      },
      {
        "cue": "~의 낌새를 채다, ~에 대한 소문을 듣다 (cf. get wind of)",
        "model": "catch wind of [thing]",
        "tier": 3,
        "easyEn": "to hear news or a rumor about something"
      },
      {
        "cue": "운이 트이다 (보통 부정문: can't catch a break)",
        "model": "catch a break",
        "tier": 3,
        "easyEn": "to get a bit of good luck"
      },
      {
        "cue": "현행범으로·딱 걸린 채로 붙잡다",
        "model": "catch [person] red-handed",
        "tier": 3,
        "easyEn": "to find someone just as they do something wrong"
      }
    ]
  },
  {
    "id": "watch",
    "verb": "WATCH",
    "gloss": "watch는 시간을 들여 주의 깊게 본다. 지켜보다, 감시하다, 시청하다, 조심하다, 보살피다.",
    "items": [
      {
        "cue": "~을 보다, 시청하다 (TV·영상·경기 등을 시간 들여 보는 것)",
        "model": "watch [show/video/thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "조심해! 위험해! (갑작스런 경고)",
        "model": "watch out",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 조심하다, ~을 경계하며 살피다 (조심해야 할 대상)",
        "model": "watch out for [thing/person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~가 …하는 것을 지켜보다 (지각동사: watch him leave / watch her coding)",
        "model": "watch [person] [verb/-ing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~이 나타나는지 주의해서 살피다, ~을 기다리며 지켜보다 (watch out for의 '위험 경계'보다 '징후·등장'을 기다리는 쪽 뉘앙스)",
        "model": "watch for [thing]",
        "tier": 2
      },
      {
        "cue": "~을 보살피다, 지켜주다 (책임지고 돌봄)",
        "model": "watch over [person/thing]",
        "tier": 2
      },
      {
        "cue": "조심해, 말조심해 (가벼운 경고·위협)",
        "model": "watch it",
        "tier": 2,
        "easyEn": "Be careful, or stop what you are doing."
      },
      {
        "cue": "몸조심해, 행동 조심해",
        "model": "watch yourself",
        "tier": 2,
        "easyEn": "Be careful with how you behave."
      },
      {
        "cue": "발밑 조심해; (비유) 언행·처신을 조심해",
        "model": "watch your step",
        "tier": 2,
        "easyEn": "Be careful where you walk or how you act."
      },
      {
        "cue": "말조심해, 욕설·무례한 말 삼가",
        "model": "watch your mouth / watch your language",
        "tier": 2,
        "easyEn": "Do not say rude or offensive words."
      },
      {
        "cue": "등 뒤를 조심해 (배신·위험을 경계하라)",
        "model": "watch your back",
        "tier": 2,
        "easyEn": "Stay alert for danger or people who might hurt you."
      },
      {
        "cue": "watch the time = 시간을 신경 쓰다, 늦지 않게 시간을 확인하다. (※ watch the clock은 '지루해서/빨리 끝나길 바라며 시계만 들여다보다'라는 부정적 관용구 뉘앙스도 있음 — a clock-watcher)",
        "model": "watch the time / watch the clock",
        "tier": 2
      },
      {
        "cue": "(로그·빌드·테스트·지표를) 모니터링하다, 돌아가는 걸 지켜보다 (개발 현장; watch [thing]의 '감시·관찰' 용법)",
        "model": "watch the logs / build / tests / metrics",
        "tier": 2
      },
      {
        "cue": "내 담당·책임 하에 (여기서 watch는 명사 '근무·당번'; Not on my watch! = 내가 있는 한 안 돼 / happened on my watch = 내 근무 중에 터졌다)",
        "model": "on [my/someone's] watch",
        "tier": 2,
        "easyEn": "While someone is in charge or on duty."
      },
      {
        "cue": "망을 보다, 경계 서다 (watch는 명사)",
        "model": "keep watch",
        "tier": 2,
        "easyEn": "Guard a place and look out for danger."
      },
      {
        "cue": "두고 보다, 섣불리 움직이지 않고 관망하다 (NA에서는 'wait and see'가 더 흔함)",
        "model": "watch and wait / wait-and-see",
        "tier": 2
      },
      {
        "cue": "보고 배워 (시범 보일 때 쓰는, 약간 으스대는 듯한 구어 표현)",
        "model": "watch and learn",
        "tier": 3,
        "easyEn": "Watch how I do it and learn from me."
      }
    ]
  },
  {
    "id": "back",
    "verb": "BACK",
    "gloss": "back은 뒤를 받쳐 주는 동작이다. 뒤로 가다(후진), 뒤를 봐주다(지지·후원), 한 발 물러서다, 뒤로 미루다.",
    "items": [
      {
        "cue": "백업하다(자료) / 후진하다(차) / 뒷받침하다(주장을 데이터로) / (교통·하수·일이) 밀리다, 막히다 (I'm backed up with work = 일이 밀렸다)",
        "model": "back up",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~를 지지하다, 편들다, 거들어 주다 (회의·논쟁에서 같은 편을 들어 줌)",
        "model": "back [person] up",
        "tier": 1,
        "star": true
      },
      {
        "cue": "물러나다, 손 떼다, (압박·간섭을) 거두다. 'Back off!' = 비켜/그만 좀 해",
        "model": "back off",
        "tier": 1,
        "star": true
      },
      {
        "cue": "(주장·입장에서) 물러서다, 굽히다, 양보하다",
        "model": "back down",
        "tier": 2,
        "star": true,
        "easyEn": "Stop arguing and give up your position."
      },
      {
        "cue": "(약속·거래·계획에서) 발을 빼다, 발뺌하다, 막판에 빠지다",
        "model": "back out",
        "tier": 2,
        "star": true,
        "easyEn": "Withdraw from a plan or agreement."
      },
      {
        "cue": "~(약속·계약·거래)에서 발을 빼다, 손을 떼다, 취소하다",
        "model": "back out of [something]",
        "tier": 2,
        "star": true,
        "easyEn": "Withdraw from a plan, deal, or promise."
      },
      {
        "cue": "지지하다, 후원하다, (돈을) 대다, (후보·프로젝트에) 베팅하다 (back a startup = 스타트업에 투자·지원하다)",
        "model": "back [something/someone]",
        "tier": 2,
        "star": true,
        "easyEn": "Support, fund, or invest in someone or something."
      },
      {
        "cue": "~의 후원·뒷받침을 받다 (data-backed = 데이터로 뒷받침된, a VC-backed startup = VC 투자를 받은 스타트업)",
        "model": "be backed by [something/someone]",
        "tier": 2,
        "easyEn": "Be supported or funded by someone."
      },
      {
        "cue": "연달아, 연속으로 (back-to-back meetings = 회의가 줄줄이 연달아 있음)",
        "model": "back-to-back",
        "tier": 2,
        "star": true,
        "easyEn": "One right after another with no gap."
      },
      {
        "cue": "왔다 갔다 / (의견·이메일을) 주고받다, 옥신각신하다 (go back and forth = 결론 없이 계속 주고받다)",
        "model": "back and forth",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~의 뒤를 봐주다, 든든히 지지하다 ('I've got your back' = 내가 뒤에서 받쳐 줄게)",
        "model": "have [person]'s back",
        "tier": 2,
        "star": true,
        "easyEn": "Support and protect someone who needs help."
      },
      {
        "cue": "~에서 뒷걸음치다 / (입장·약속·계획에서) 슬그머니 발을 빼다, 거리를 두다",
        "model": "back away from [something]",
        "tier": 2
      },
      {
        "cue": "후진해서 들어가다(주차) / 후진하다 ~를 들이받다 / (숫자를) 역산해서 구하다",
        "model": "back into [something]",
        "tier": 2
      },
      {
        "cue": "~를 궁지로 몰다, 빠져나갈 수 없게 만들다",
        "model": "back [someone] into a corner",
        "tier": 2,
        "easyEn": "Force someone into a position with no escape."
      },
      {
        "cue": "~를 뒤로 미루다, 후순위로 돌리다 (당장 급하지 않은 일로 제쳐 둠)",
        "model": "put [something] on the back burner",
        "tier": 2,
        "easyEn": "Delay something to deal with it later."
      },
      {
        "cue": "약속을 어기다, 말을 번복하다, 한 말을 뒤집다",
        "model": "go back on [one's word/promise]",
        "tier": 2,
        "easyEn": "Break a promise you made."
      },
      {
        "cue": "(배포·코드·변경·정책을) 되돌리다, 롤백하다, 이전 버전으로 복구하다 (roll back the deploy = 배포를 롤백하다)",
        "model": "roll back [something]",
        "tier": 2,
        "star": true,
        "easyEn": "Return something to an earlier version or state."
      },
      {
        "cue": "(다른 방법이 안 될 때) ~에 의지하다, ~를 대비책·차선책으로 쓰다 (fall back on a default = 기본값으로 되돌아가다)",
        "model": "fall back on [something]",
        "tier": 2,
        "easyEn": "Use something as a backup when other options fail."
      },
      {
        "cue": "~를 줄이다, 절감하다 (cut back on spending/meetings = 지출·회의를 줄이다)",
        "model": "cut back on [something]",
        "tier": 2,
        "easyEn": "Reduce the amount of something."
      },
      {
        "cue": "(실패·병·부진에서) 회복하다, 다시 일어서다, 반등하다 (bounce back from a setback = 좌절에서 다시 일어서다)",
        "model": "bounce back",
        "tier": 2,
        "easyEn": "Recover quickly after a problem or illness."
      },
      {
        "cue": "대략적인 어림 계산, 봉투 뒷면 계산 (정밀하지 않은 빠른 추정 — 면접 추정 문제에서 자주 씀)",
        "model": "back-of-the-envelope [calculation]",
        "tier": 3,
        "easyEn": "A rough, quick estimate that is not exact."
      }
    ]
  },
  {
    "id": "write",
    "verb": "WRITE",
    "gloss": "write는 글·기호를 표면에 남기는 동사다. (글을) 쓰다, 적다, 작성하다, (코드를) 짜다, (편지·메일로) 연락하다.",
    "items": [
      {
        "cue": "~을 적어두다, 메모하다",
        "model": "write down [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "코드를 작성하다, 코딩하다",
        "model": "write code",
        "tier": 1,
        "star": true
      },
      {
        "cue": "(보고서·문서·노트를) 정식으로 작성하다, 정리해서 쓰다",
        "model": "write up [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 (특정 언어로) 작성하다 (예: write it in Python)",
        "model": "write [thing] in [language]",
        "tier": 2
      },
      {
        "cue": "~에게 편지·메일을 쓰다, 연락하다",
        "model": "write to [person]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에게 (이메일·편지를) 써 보내다 — 미국식은 to 없이 쓰기도 함 (예: write me an email, I'll write you)",
        "model": "write [person] [thing]",
        "tier": 2
      },
      {
        "cue": "(빚·자산을) 손실 처리하다, 탕감하다, 장부에서 지우다",
        "model": "write off [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "Cancel a debt or record something as a loss."
      },
      {
        "cue": "답장하다, 회신하다",
        "model": "write back (to [person])",
        "tier": 2
      },
      {
        "cue": "(생략 없이) 풀어서 다 적다; (수표·처방전을) 작성하다",
        "model": "write out [thing]",
        "tier": 2
      },
      {
        "cue": "~에 대해 (글을) 쓰다",
        "model": "write about [thing]",
        "tier": 2
      },
      {
        "cue": "~을 가망 없다고 단념하다, ~로 치부하다 (예: write it off as a fluke)",
        "model": "write off [thing/person] as [X]",
        "tier": 2,
        "easyEn": "Decide someone or something is not important or useful."
      },
      {
        "cue": "~에 기고하다, ~를 위해 글을 쓰다",
        "model": "write for [publication/company]",
        "tier": 2
      },
      {
        "cue": "(회사·방송에) 의견·문의 편지를 보내다",
        "model": "write in (to [company/show])",
        "tier": 2,
        "easyEn": "Send a letter or message to an organization."
      },
      {
        "cue": "(계약·코드·규정에) ~을 명시해 넣다",
        "model": "write [thing] into [contract/code]",
        "tier": 2,
        "easyEn": "Include something officially in a contract or code."
      },
      {
        "cue": "수표를 쓰다, 발행하다",
        "model": "write a check",
        "tier": 2
      },
      {
        "cue": "~을 서면으로 받아두다, 문서로 남기다",
        "model": "get [thing] in writing",
        "tier": 2,
        "easyEn": "Get something as a written, official record."
      },
      {
        "cue": "(투표용지에) 후보 이름을 직접 적어 넣다",
        "model": "write in [name]",
        "tier": 3,
        "easyEn": "Add a candidate not printed on the ballot."
      },
      {
        "cue": "별것 아니다, 특별히 내세울 것 없다",
        "model": "nothing to write home about",
        "tier": 3,
        "easyEn": "Not special or impressive."
      },
      {
        "cue": "(능력·입지 덕에) 원하는 조건을 마음대로 정하다",
        "model": "write your own ticket",
        "tier": 3,
        "easyEn": "Set your own terms because you are highly valued."
      }
    ]
  },
  {
    "id": "read",
    "verb": "READ",
    "gloss": "read는 글자·신호를 의미로 바꾸는 동사다. 읽다, 해석하다, (분위기·의도를) 파악하다, (계기가) 가리키다, (글이) ~라고 쓰여 있다.",
    "items": [
      {
        "cue": "(책·글·코드를) 읽다",
        "model": "read [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 대해 (글로) 읽다, 읽어서 접하다",
        "model": "read about [topic]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "(특정 주제를) 미리 공부하다, 사전 조사하다 (read up on the company before the interview)",
        "model": "read up on [topic]",
        "tier": 2,
        "star": true,
        "easyEn": "study a subject by reading about it beforehand"
      },
      {
        "cue": "처음부터 끝까지 다 읽다, 통독하다",
        "model": "read through [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(글·문서를) 검토하다, 살펴보다 (read over my essay)",
        "model": "read over [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(실제보다) 확대 해석하다, 없는 의미를 갖다 붙이다 (don't read too much into it)",
        "model": "read into [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "Find a meaning that is not really there."
      },
      {
        "cue": "소리 내어 읽다, (목록·결과를) 낭독하다; (시스템이 값을) 출력하다",
        "model": "read out [thing]",
        "tier": 2
      },
      {
        "cue": "(계기·화면·목록에서) 수치를 읽어 내다, 읽어 주다",
        "model": "read off [thing]",
        "tier": 2,
        "easyEn": "read a value from a screen, gauge, or list"
      },
      {
        "cue": "(받아 적은 내용을) 다시 읽어 확인해 주다 (read it back to me)",
        "model": "read back [thing]",
        "tier": 2,
        "easyEn": "read something aloud again to confirm it is correct"
      },
      {
        "cue": "~로 해석하다, ~라는 뜻으로 받아들이다 (I read that as a yes)",
        "model": "read [thing] as [meaning]",
        "tier": 2
      },
      {
        "cue": "(표지판·문서에) ~라고 쓰여 있다, ~라고 적혀 있다",
        "model": "[sign/text] reads ...",
        "tier": 2,
        "star": true
      },
      {
        "cue": "분위기를 읽다, 좌중의 분위기를 파악하다",
        "model": "read the room",
        "tier": 2,
        "star": true,
        "easyEn": "Sense the mood and feelings of the people present."
      },
      {
        "cue": "행간을 읽다, 숨은 뜻을 파악하다",
        "model": "read between the lines",
        "tier": 2,
        "star": true,
        "easyEn": "Understand the hidden meaning that is not stated directly."
      },
      {
        "cue": "~의 마음을 읽다, 속을 꿰뚫어 보다",
        "model": "read [someone]'s mind",
        "tier": 2,
        "easyEn": "Know exactly what someone is thinking."
      },
      {
        "cue": "소리 내어 읽다",
        "model": "read aloud / read out loud",
        "tier": 2
      },
      {
        "cue": "(중단하지 말고) 계속 읽어 나가다 (Read on to find out more)",
        "model": "read on",
        "tier": 2
      },
      {
        "cue": "~의 속마음을 훤히 들여다보다",
        "model": "read [someone] like a book",
        "tier": 3,
        "easyEn": "Easily understand what someone thinks or feels."
      },
      {
        "cue": "(프로그램이 데이터·파일을) 읽어 들이다, 입력받다",
        "model": "read in [data/file]",
        "tier": 3,
        "easyEn": "Load data or a file into a program."
      },
      {
        "cue": "(음성·낭독을) 따라 같이 읽어 나가다",
        "model": "read along",
        "tier": 3,
        "easyEn": "Follow the words while someone reads aloud."
      },
      {
        "cue": "(무전·통화에서) ~의 말이 잘 들리다/수신되다 (I read you loud and clear)",
        "model": "read [someone] (comms)",
        "tier": 3,
        "easyEn": "hear and understand someone clearly over radio"
      },
      {
        "cue": "~를 호되게 꾸짖다, 단단히 경고하다",
        "model": "read [someone] the riot act",
        "tier": 3,
        "easyEn": "scold someone severely and warn them to stop"
      }
    ]
  },
  {
    "id": "hear",
    "verb": "HEAR",
    "gloss": "hear는 소리/정보가 내 쪽으로 들어오는 동사다. (귀로) 듣다, 소식을 전해 듣다, 연락을 받다, 알아듣다.",
    "items": [
      {
        "cue": "~라고 들었다, ~라는 소식을 듣다",
        "model": "hear (that) [clause]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 대한 소식을 듣다, ~에 대해 전해 듣다",
        "model": "hear about [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에게서 연락(소식)을 받다",
        "model": "hear from [person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~가 …하는 것(소리)을 듣다 (지각동사)",
        "model": "hear [person] [-ing] / hear [person] [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에게서 답장(회신)을 받다 (업무 필수)",
        "model": "hear back from [person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~의 존재(이름)를 들어서 알다, 들어본 적 있다",
        "model": "hear of [thing] / hear of [person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "무슨 말인지 알겠어, 네 말 이해해/공감해",
        "model": "I hear you",
        "tier": 1,
        "star": true,
        "easyEn": "I understand what you mean"
      },
      {
        "cue": "제 말 들리세요? / 소리가 안 들려요 (화상회의 필수 표현)",
        "model": "can you hear me? / I can't hear you",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~의 말을 (중간에 끊지 않고) 끝까지 들어주다",
        "model": "hear [person] out",
        "tier": 2,
        "star": true,
        "easyEn": "listen to all of what someone has to say"
      },
      {
        "cue": "~에 대해 좋은 얘기 많이 들었어요",
        "model": "I've heard good things about [person] / [thing]",
        "tier": 2
      },
      {
        "cue": "내 말 제대로 들었잖아(다시 말 안 해), 맞게 들은 거야",
        "model": "you heard me / you heard right",
        "tier": 2,
        "easyEn": "I mean what I said and will not repeat it"
      },
      {
        "cue": "제가 이해한 바로는 ~라는 말씀이군요 (회의에서 상대 말을 확인·재진술)",
        "model": "what I'm hearing is (that) [clause]",
        "tier": 2
      },
      {
        "cue": "~의 말이 또렷이 들리다 / 무슨 말인지 확실히 알겠다",
        "model": "hear [someone] loud and clear",
        "tier": 2,
        "easyEn": "hear and understand someone very clearly"
      },
      {
        "cue": "~의 입장(해명)을 들어보다",
        "model": "hear [someone]'s side (of the story)",
        "tier": 2
      },
      {
        "cue": "(제안 등을) 절대 받아들이지 않다, 들으려고도 하지 않다",
        "model": "won't hear of [it]",
        "tier": 3,
        "easyEn": "refuse to allow or even consider something"
      },
      {
        "cue": "소문으로(입소문으로) 전해 듣다",
        "model": "hear (it) through the grapevine",
        "tier": 3,
        "easyEn": "learn news informally through rumor or gossip"
      },
      {
        "cue": "그 일은 이걸로 끝이 아니다, 계속 들먹여질 것이다",
        "model": "not hear the last of [it] / [someone]",
        "tier": 3,
        "easyEn": "you will hear about this matter again"
      }
    ]
  },
  {
    "id": "see",
    "verb": "SEE",
    "gloss": "see는 '인식'의 뼈대다. (눈으로) 보다, 이해하다·알겠다, 알아보다·확인하다, 만나다, 챙겨서 처리하다.",
    "items": [
      {
        "cue": "(눈으로) 보다; 이해하다·알겠다(I see); ~을 알다",
        "model": "see [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~인지 (해 보고) 확인하다, 알아보다 (Let me see if it works)",
        "model": "see if / see whether [clause]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "어디 보자; (생각·확인할 때) 음, 그러니까",
        "model": "let me see / let's see",
        "tier": 1,
        "star": true,
        "easyEn": "give me a moment to think or check"
      },
      {
        "cue": "또 봐, 잘 가 (가벼운 작별 인사)",
        "model": "see you (around / later)",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~가 …하는 것을 보다 (동작 전체); ~가 …하고 있는 것을 보다 (진행 중) (I saw him leave / I saw her crossing the street)",
        "model": "see [person] [verb] / see [person] [-ing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 …로 여기다·간주하다 (I see this as an opportunity)",
        "model": "see [thing] as [X]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 맡아 처리하다·챙기다; 반드시 ~하도록 하다 (다소 격식체)",
        "model": "see to [thing] / see to it that [clause]",
        "tier": 2,
        "easyEn": "make sure something is done or dealt with"
      },
      {
        "cue": "속셈을 간파하다, 꿰뚫어 보다 (I saw through his excuse)",
        "model": "see through [person / thing]",
        "tier": 2,
        "easyEn": "realize the truth behind someone's lies"
      },
      {
        "cue": "끝까지 해내다, 완수하다 (see the project through)",
        "model": "see [thing] through",
        "tier": 2,
        "easyEn": "continue something until it is fully finished"
      },
      {
        "cue": "배웅하다, 떠나는 사람을 전송하다 (공항·역에서)",
        "model": "see [person] off / see off",
        "tier": 2,
        "easyEn": "go with someone to say goodbye as they leave"
      },
      {
        "cue": "문까지 배웅하다; (oneself) 알아서 나가다 (I'll see myself out)",
        "model": "see [person] out / see [oneself] out",
        "tier": 2,
        "easyEn": "walk someone to the door as they leave"
      },
      {
        "cue": "~을 알아보다, 처리 방법을 찾아보다 (I'll see about it)",
        "model": "see about [thing]",
        "tier": 2,
        "easyEn": "find out about something and deal with it"
      },
      {
        "cue": "두고 보다, 지켜보다",
        "model": "wait and see",
        "tier": 2
      },
      {
        "cue": "직접 확인하다 (See for yourself)",
        "model": "see for [oneself]",
        "tier": 2
      },
      {
        "cue": "미리 알아채다, 예상하다 (보통 안 좋은 일; I didn't see it coming)",
        "model": "see [thing] coming",
        "tier": 2,
        "easyEn": "expect something before it happens"
      },
      {
        "cue": "(~와) 의견이 완전히 일치하다 (주로 부정문: we don't see eye to eye)",
        "model": "see eye to eye (with [person])",
        "tier": 2,
        "easyEn": "completely agree with someone"
      },
      {
        "cue": "~의 요점·의미를 이해하다 (주로 부정문: I don't see the point)",
        "model": "see the point (of / in [thing])",
        "tier": 2,
        "easyEn": "understand the reason or value of something"
      },
      {
        "cue": "내가 보기엔, 내가 아는 한",
        "model": "as far as I can see",
        "tier": 2,
        "easyEn": "based on what I know or can tell"
      },
      {
        "cue": "~인 점을 고려하면, ~이니까 (구어체)",
        "model": "seeing as / seeing that [clause]",
        "tier": 2,
        "easyEn": "because; considering that"
      },
      {
        "cue": "~에 관해 …를 만나 상의하다 (see HR about my contract)",
        "model": "see [person] about [thing]",
        "tier": 2
      },
      {
        "cue": "어떻게든 해보다, 방법을 찾아보다 (I'll see what I can do)",
        "model": "see what [I] can do",
        "tier": 2,
        "easyEn": "try to help or find a solution"
      },
      {
        "cue": "오랜만이야 (오래간만에 만났을 때 하는 인사)",
        "model": "long time no see",
        "tier": 2,
        "easyEn": "we have not seen each other for a long time"
      },
      {
        "cue": "~하는 것이 적절하다고 판단하다 (do as you see fit) — 다소 격식체",
        "model": "see fit (to [verb])",
        "tier": 3,
        "easyEn": "decide that something is the right thing to do"
      },
      {
        "cue": "(마침내) 깨닫다, 진실을 알게 되다",
        "model": "see the light",
        "tier": 3,
        "easyEn": "finally understand or realize the truth"
      },
      {
        "cue": "몹시 화가 나다, 분통이 터지다",
        "model": "see red",
        "tier": 3,
        "easyEn": "suddenly become very angry"
      }
    ]
  },
  {
    "id": "live",
    "verb": "LIVE",
    "gloss": "live는 '살다'의 뼈대다. 생존하다, 거주하다, (삶·경험을) 살아내다, 무언가에 기대어 먹고살다.",
    "items": [
      {
        "cue": "[장소]에 살다, 거주하다 (live abroad/downtown처럼 부사와 바로 결합하기도)",
        "model": "live in [place]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "동거하다, 함께 살다",
        "model": "live together",
        "tier": 1
      },
      {
        "cue": "[형용사]한 삶을 살다 ('live a healthy/normal/quiet life') — 매우 흔한 연어, 학습자 필수",
        "model": "live a [adjective] life",
        "tier": 1
      },
      {
        "cue": "[기대·기준]에 부응하다, 명성에 걸맞게 해내다 (면접 표현: 'live up to expectations')",
        "model": "live up to [expectations/standards]",
        "tier": 2,
        "star": true,
        "easyEn": "reach the standard that people expect of you"
      },
      {
        "cue": "[불편·문제·결정]을 감수하고 받아들이다 ('I can live with that' = 그 정도는 괜찮다); (사람과) 동거하다",
        "model": "live with [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "accept something unpleasant and keep going"
      },
      {
        "cue": "[돈·음식]으로 먹고살다, ~을 주식으로 삼다; (유산·기억·전통이) 계속 이어지다/살아있다",
        "model": "live on [money/food]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "[사람]에게 얹혀살다, [저축·땅·이자]에 기대어 생계를 잇다 (미국 구어로는 'live off of'도 흔함)",
        "model": "live off [person/savings/land]",
        "tier": 2,
        "easyEn": "get your money or food from a person or source"
      },
      {
        "cue": "[힘든 시기·사건]을 겪어내다, 견뎌 살아남다",
        "model": "live through [hard times]",
        "tier": 2
      },
      {
        "cue": "[원칙·신조·규칙]에 따라 살다",
        "model": "live by [a rule/code/principle]",
        "tier": 2
      },
      {
        "cue": "[것]을 낙으로 삼고 살다, ~을 위해 살다 ('I live for Fridays')",
        "model": "live for [thing]",
        "tier": 2,
        "easyEn": "enjoy something so much it is your main joy"
      },
      {
        "cue": "월급으로 근근이 살다, 저축 없이 빠듯하게 생활하다 ('from paycheck to paycheck'으로도 씀)",
        "model": "live paycheck to paycheck",
        "tier": 2,
        "easyEn": "spend all your pay with nothing left to save"
      },
      {
        "cue": "따로 살다, 별거하다",
        "model": "live apart",
        "tier": 2
      },
      {
        "cue": "(창피한 일·실수)를 사람들이 잊게 만들다, 떨쳐내다 (주로 부정형 'never live it down')",
        "model": "live [thing] down",
        "tier": 3,
        "easyEn": "make people forget something embarrassing you did"
      },
      {
        "cue": "(꿈·환상)을 실현하며 살다; (여생)을 보내다",
        "model": "live out [a dream/one's days]",
        "tier": 3,
        "easyEn": "make a dream real; spend the rest of your life"
      },
      {
        "cue": "신나게 즐기다, 흥청망청 놀다",
        "model": "live it up",
        "tier": 3,
        "easyEn": "enjoy yourself in an exciting, expensive way"
      },
      {
        "cue": "[것]에 푹 빠져 살다, ~이 삶의 전부다 ('I live and breathe code')",
        "model": "live and breathe [thing]",
        "tier": 3,
        "easyEn": "love something so much it fills your whole life"
      },
      {
        "cue": "꿈꾸던 삶을 살다 (직장에서 종종 반어적으로 'Living the dream' = 아주 잘나가지(빈정))",
        "model": "live the dream",
        "tier": 3,
        "easyEn": "have the perfect life you always wanted"
      },
      {
        "cue": "호화롭게 살다, 떵떵거리며 즐기며 살다 (미국 구어)",
        "model": "live large",
        "tier": 3,
        "easyEn": "live in a rich way and spend a lot of money"
      },
      {
        "cue": "[사람·것]이여 영원하라, ~만세 ('Long live the king')",
        "model": "long live [person/thing]",
        "tier": 3,
        "easyEn": "may this person or thing last a long time"
      },
      {
        "cue": "살면서 배운다 (실수에서 교훈을 얻다)",
        "model": "live and learn",
        "tier": 3,
        "easyEn": "you learn from the mistakes you make in life"
      },
      {
        "cue": "오래 살아 ~하게 되다, 결국 ~하다 ('live to regret it' = 결국 후회하게 되다; 'lived to see ~' = 살아서 ~을 보다)",
        "model": "live to [verb]",
        "tier": 3,
        "easyEn": "live long enough to finally do something"
      },
      {
        "cue": "서로 간섭 말고 각자 살게 두자, 너그럽게 봐주며 살다",
        "model": "live and let live",
        "tier": 3,
        "easyEn": "let others live their way and do not bother them"
      }
    ]
  },
  {
    "id": "grow",
    "verb": "GROW",
    "gloss": "grow는 점점 커지고 자라나는 변화의 뼈대다. 자라다, 늘다, 키우다, 점점 ~해지다(차차 되다).",
    "items": [
      {
        "cue": "자라다, 성장하다; 어른이 되다; (~에서) 자라다 (Where did you grow up?); (명령형) 철 좀 들어라",
        "model": "grow up",
        "tier": 1,
        "star": true
      },
      {
        "cue": "(사업·매출·팀·고객을) 키우다, 성장시키다",
        "model": "grow [a business] / grow [revenue]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "점점 ~해지다 (grow tired 점점 지치다, grow dark 점점 어두워지다)",
        "model": "grow [adjective] (grow tired / cold / dark)",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(자라서) ~에 맞게 되다; (역할·일에) 차차 적응해 잘 해내게 되다 (I grew into the role)",
        "model": "grow into [role/thing]",
        "tier": 2,
        "star": true,
        "easyEn": "slowly get good enough for a job or role"
      },
      {
        "cue": "~만큼 증가하다, 늘다 (매출이 20% 늘다)",
        "model": "grow by [percent/amount]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(자라서 옷이) 작아 못 입게 되다; (습관·취미에서) 벗어나 안 하게 되다; ~에서 비롯되다/생겨나다",
        "model": "grow out of [thing]",
        "tier": 2,
        "easyEn": "get too big or old for something; stop a habit"
      },
      {
        "cue": "(처음엔 별로였다가) 점점 좋아지게 되다, 마음에 들기 시작하다 (It grows on you)",
        "model": "grow on [person]",
        "tier": 2,
        "easyEn": "start to like something more as time passes"
      },
      {
        "cue": "(사이가) 점점 멀어지다, 소원해지다",
        "model": "grow apart",
        "tier": 2,
        "easyEn": "slowly become less close to someone"
      },
      {
        "cue": "(머리카락·손톱·잘린 부분이) 다시 자라다",
        "model": "grow back",
        "tier": 2
      },
      {
        "cue": "(자신감·인기·규모가) 점점 커지다, 늘다",
        "model": "grow in [confidence/popularity]",
        "tier": 2
      },
      {
        "cue": "~에 점점 싫증나다, 지겨워지다",
        "model": "grow tired of [thing/-ing]",
        "tier": 2
      },
      {
        "cue": "~에 점점 익숙해지다 (다소 격식)",
        "model": "grow accustomed to [thing/-ing]",
        "tier": 2,
        "easyEn": "become used to something over time"
      },
      {
        "cue": "~을 점점 좋아하게 되다, ~에 정들다",
        "model": "grow fond of [person/thing]",
        "tier": 2,
        "easyEn": "start to like someone or something"
      },
      {
        "cue": "나이 들다, 늙다 (grow old together 함께 늙어가다)",
        "model": "grow old",
        "tier": 2
      },
      {
        "cue": "X에서 Y로 늘어나다, 성장하다 (직원이 10명에서 100명으로 늘다)",
        "model": "grow from [X] to [Y]",
        "tier": 2
      },
      {
        "cue": "(작물·식물을) 재배하다, 기르다 (grow vegetables 채소를 기르다)",
        "model": "grow [crops/plants/vegetables]",
        "tier": 2
      }
    ]
  },
  {
    "id": "sign",
    "verb": "SIGN",
    "gloss": "sign은 이름을 쓰는 동작이 뼈대다. 서명하다 → 가입/등록하다, 승인하다, 계약·합류하다, 양도하다.",
    "items": [
      {
        "cue": "(서비스·수업·이벤트에) 등록하다, 가입하다, 신청하다",
        "model": "sign up",
        "tier": 1,
        "star": true
      },
      {
        "cue": "[thing](수업·뉴스레터·헬스장 등)에 등록하다/신청하다",
        "model": "sign up for [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "로그인하다; (방문 시) 방명록·출입대장에 서명하다",
        "model": "sign in",
        "tier": 1,
        "star": true
      },
      {
        "cue": "[thing](계정·서비스 등)에 로그인하다",
        "model": "sign in to [thing] / sign into [thing]",
        "tier": 1
      },
      {
        "cue": "로그아웃하다; 퇴실하며 서명하다; (물건을) 대출 기록하고 가져가다",
        "model": "sign out",
        "tier": 1,
        "star": true
      },
      {
        "cue": "[문서·서류]에 서명하다 (기본 뜻)",
        "model": "sign [document]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "[thing](계정·서비스 등)에서 로그아웃하다",
        "model": "sign out of [thing]",
        "tier": 2
      },
      {
        "cue": "(작업·문서를) 승인하며 마무리하다; (이메일·방송을) 끝맺다, 작별하다",
        "model": "sign off",
        "tier": 2,
        "star": true,
        "easyEn": "approve something, or end a message or broadcast"
      },
      {
        "cue": "[thing]을 최종 승인하다, 결재하다",
        "model": "sign off on [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "give final approval for something"
      },
      {
        "cue": "(회사·프로젝트에) 합류하다, 계약하고 들어오다",
        "model": "sign on",
        "tier": 2,
        "easyEn": "agree to join a company or project"
      },
      {
        "cue": "[role](직책)로(서) 합류/계약하다",
        "model": "sign on as [role]",
        "tier": 2,
        "easyEn": "join a company or project in a certain role"
      },
      {
        "cue": "[회사·팀·소속사]와 계약하다",
        "model": "sign with [company/team]",
        "tier": 2,
        "easyEn": "make a contract to join a company or team"
      },
      {
        "cue": "[thing](택배 등)을 받았다고 수령 서명하다",
        "model": "sign for [thing]",
        "tier": 2,
        "easyEn": "sign your name to show you received something"
      },
      {
        "cue": "[thing]의 소유권·권리를 [person]에게 양도하다",
        "model": "sign over [thing] to [person]",
        "tier": 3,
        "easyEn": "give someone legal ownership by signing a document"
      },
      {
        "cue": "[thing](권리 등)을 서명으로 포기·양도하다",
        "model": "sign away [thing]",
        "tier": 3,
        "easyEn": "give up a right by signing a document"
      },
      {
        "cue": "정식으로 계약서에 서명하다, 확정 동의하다 (관용구)",
        "model": "sign on the dotted line",
        "tier": 3,
        "easyEn": "formally sign a contract to agree to it"
      },
      {
        "cue": "[대출·서류]에 연대 보증 서명하다; (구어) ~에 동의·지지하다",
        "model": "co-sign [thing]",
        "tier": 3,
        "easyEn": "sign a loan with someone to share the responsibility"
      }
    ]
  },
  {
    "id": "walk",
    "verb": "WALK",
    "gloss": "walk는 '발로 이동하다'가 뼈대다. 걷다 → 데려다주다/산책시키다 → 떠나다/발 빼다 → (단계별로) 설명하며 안내하다.",
    "items": [
      {
        "cue": "~에게 ~를 단계별로 차근차근 설명해주다 (면접 필수: walk me through your resume/your solution)",
        "model": "walk [person] through [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "explain something to someone step by step"
      },
      {
        "cue": "~를 처음부터 끝까지 짚어보다/시연하다 (walk through the code, the plan)",
        "model": "walk through [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "go through or review something step by step"
      },
      {
        "cue": "~에서 손을 떼다/포기하다, (협상·거래를) 깨고 나오다",
        "model": "walk away from [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "decide to stop being involved in something"
      },
      {
        "cue": "그냥 떠나버리다, 발을 빼다, 단념하다",
        "model": "walk away",
        "tier": 2,
        "star": true,
        "easyEn": "leave a situation; give up on it"
      },
      {
        "cue": "(개를) 산책시키다 / ~를 (집까지) 걸어서 데려다주다",
        "model": "walk [the dog] / walk [person] home",
        "tier": 2
      },
      {
        "cue": "박차고 나가버리다, (항의로) 퇴장하다, 파업하다 (명사 a walkout)",
        "model": "walk out",
        "tier": 2,
        "easyEn": "leave suddenly in protest; go on strike"
      },
      {
        "cue": "(했던 말·입장을) 번복하다/철회하다, 한발 물러서다 (walk it back)",
        "model": "walk back [statement]",
        "tier": 2,
        "easyEn": "say you no longer fully mean what you said before"
      },
      {
        "cue": "~로 걸어 들어가다 / (함정·문제에) 제 발로 빠지다 (walk into a trap)",
        "model": "walk into [thing]",
        "tier": 2,
        "easyEn": "enter something; or get into trouble unaware"
      },
      {
        "cue": "~에게 다가가다, 성큼 걸어가 말을 걸다",
        "model": "walk up to [person]",
        "tier": 2
      },
      {
        "cue": "~를 지나치다, 그냥 스쳐 지나가다",
        "model": "walk past / walk by [thing]",
        "tier": 2
      },
      {
        "cue": "~를 버리고 떠나다, (책임·관계를) 내팽개치고 가버리다",
        "model": "walk out on [person]",
        "tier": 3,
        "easyEn": "suddenly abandon someone you are responsible for"
      },
      {
        "cue": "(남이 뭔가 하던 중에) 불쑥 들어가 맞닥뜨리다/목격하다",
        "model": "walk in on [person/thing]",
        "tier": 3,
        "easyEn": "enter and unexpectedly find something happening"
      },
      {
        "cue": "홱 가버리다 / (walk off [stress/a meal]) 걸어서 풀다·삭이다",
        "model": "walk off",
        "tier": 3,
        "easyEn": "leave suddenly; or get rid of a feeling by walking"
      },
      {
        "cue": "~를 거머쥐다, (상·이득을) 손쉽게 차지하다",
        "model": "walk away with [thing]",
        "tier": 3,
        "easyEn": "win or take something, often easily"
      },
      {
        "cue": "~를 함부로 대하다, 짓밟다, 호구 취급하다",
        "model": "walk (all) over [person]",
        "tier": 3,
        "easyEn": "treat someone badly and use them unfairly"
      },
      {
        "cue": "~를 슬쩍 들고 가버리다 / (상을) 거뜬히 타가다",
        "model": "walk off with [thing]",
        "tier": 3,
        "easyEn": "steal something; or win a prize easily"
      },
      {
        "cue": "살얼음판 걷듯 눈치 보며 조심하다",
        "model": "walk on eggshells",
        "tier": 3,
        "easyEn": "be very careful not to upset someone"
      },
      {
        "cue": "아슬아슬하게 줄타기하다, 위태로운 균형을 잡다",
        "model": "walk a (fine/thin) line",
        "tier": 3,
        "easyEn": "balance carefully between two risky options"
      },
      {
        "cue": "식은 죽 먹기, 아주 쉬운 일",
        "model": "a walk in the park",
        "tier": 3,
        "easyEn": "something very easy to do"
      },
      {
        "cue": "말한 대로 실제로 실천하다, 행동으로 보여주다",
        "model": "walk the walk / walk the talk",
        "tier": 3,
        "easyEn": "actually do what you say you will do"
      },
      {
        "cue": "(혐의를 벗고) 풀려나다, 무죄로 석방되다",
        "model": "walk free",
        "tier": 3,
        "easyEn": "leave court without punishment; be found not guilty"
      }
    ]
  },
  {
    "id": "throw",
    "verb": "THROW",
    "gloss": "throw의 뼈대는 '힘껏 던지다'. 던지다 → 버리다, 갑자기 일으키다(파티·성질·에러), 헷갈리게 하다.",
    "items": [
      {
        "cue": "~를 향해 (겨냥해) 던지다, 집어던지다",
        "model": "throw [thing] at [person/place]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "버리다; (기회·돈을) 날려버리다",
        "model": "throw away [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "버리다; (아이디어·이름을) 던져보다, 제안하다; (사람을) 내쫓다",
        "model": "throw out [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "토하다, 게우다",
        "model": "throw up",
        "tier": 1,
        "star": true,
        "easyEn": "vomit"
      },
      {
        "cue": "(프로그래밍) 예외/에러를 던지다, 발생시키다",
        "model": "throw an exception / throw an error",
        "tier": 2,
        "star": true,
        "easyEn": "in coding, make the program signal an error"
      },
      {
        "cue": "파티를 열다, 자리를 마련하다",
        "model": "throw a party",
        "tier": 2,
        "star": true,
        "easyEn": "host or organize a party"
      },
      {
        "cue": "덤으로 끼워주다; (말·의견을) 슬쩍 덧붙이다",
        "model": "throw in [thing]",
        "tier": 2,
        "easyEn": "add something extra, often for free"
      },
      {
        "cue": "헷갈리게 하다, (계산·일정을) 어긋나게 하다; (옷·습관을) 벗어던지다",
        "model": "throw off [thing]",
        "tier": 2,
        "easyEn": "confuse someone or disrupt a plan or schedule"
      },
      {
        "cue": "급조하다, 대충 뚝딱 만들다",
        "model": "throw together [thing]",
        "tier": 2,
        "easyEn": "make something quickly and carelessly"
      },
      {
        "cue": "(자기가 살려고) 남에게 책임을 떠넘기다, 동료를 희생시키다",
        "model": "throw [someone] under the bus",
        "tier": 2,
        "star": true,
        "easyEn": "blame or sacrifice someone to protect yourself"
      },
      {
        "cue": "~에 몰두하다, 전념하다",
        "model": "throw oneself into [work]",
        "tier": 2,
        "easyEn": "start doing something with full energy and effort"
      },
      {
        "cue": "성질부리다, 화를 버럭 내다, 떼쓰다",
        "model": "throw a fit / throw a tantrum",
        "tier": 2,
        "easyEn": "suddenly become very angry or upset"
      },
      {
        "cue": "~에게 (받으라고) 던져주다, 패스하다, 토스하다",
        "model": "throw [thing] to [person]",
        "tier": 2
      },
      {
        "cue": "(옷을) 대충 걸쳐 입다, 후딱 걸치다",
        "model": "throw on [clothes]",
        "tier": 2,
        "easyEn": "quickly put on a piece of clothing"
      },
      {
        "cue": "포기하다, 백기를 들다",
        "model": "throw in the towel",
        "tier": 3,
        "easyEn": "give up; admit defeat"
      },
      {
        "cue": "계획을 망치다, 차질을 빚게 하다",
        "model": "throw a wrench into [plan] / throw a wrench in the works",
        "tier": 3,
        "easyEn": "cause a problem that ruins a plan"
      },
      {
        "cue": "예상 밖의 변수를 던지다, 허를 찌르는 상황을 만들다",
        "model": "throw a curveball",
        "tier": 3,
        "easyEn": "surprise someone with something unexpected"
      },
      {
        "cue": "권력·영향력을 함부로 휘두르다",
        "model": "throw your weight around",
        "tier": 3,
        "easyEn": "use your power in a forceful, annoying way"
      },
      {
        "cue": "~와 한편이 되다, 손잡다",
        "model": "throw in with [person]",
        "tier": 3,
        "easyEn": "decide to join and support someone"
      },
      {
        "cue": "신중함을 버리고 과감하게 밀어붙이다",
        "model": "throw caution to the wind",
        "tier": 3,
        "easyEn": "take a risk without worrying about it"
      },
      {
        "cue": "도전장을 내밀다, 정면승부를 걸다",
        "model": "throw down the gauntlet",
        "tier": 3,
        "easyEn": "openly challenge someone to a contest"
      },
      {
        "cue": "(은근히) 깎아내리다, 돌려서 디스하다 (구어/슬랭)",
        "model": "throw shade (at [someone])",
        "tier": 3,
        "easyEn": "subtly insult or criticize someone"
      },
      {
        "cue": "돈을 펑펑 쓰다, 과시하듯 낭비하다",
        "model": "throw money around",
        "tier": 3,
        "easyEn": "spend money carelessly to impress others"
      }
    ]
  },
  {
    "id": "draw",
    "verb": "DRAW",
    "gloss": "draw는 선을 긋고 끌어당기는 게 뼈대다. 그리다, 끌어당기다(관심·사람), 뽑아내다(돈·정보), 도출하다(결론), 비기다.",
    "items": [
      {
        "cue": "그리다 — 그림·도표·차트를 그리다. (예: draw a diagram on the whiteboard 화이트보드에 도표를 그리다 — 기술 면접 단골)",
        "model": "draw [a diagram/picture/chart]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "작성하다 — 계획·계약서·목록을 정식으로 작성하다. (예: draw up a proposal 제안서를 작성하다)",
        "model": "draw up [a plan/contract/list]",
        "tier": 2,
        "star": true,
        "easyEn": "prepare or write something formally"
      },
      {
        "cue": "활용하다, 끌어다 쓰다 — 경험·지식·자원에 의지해 활용하다. (예: I drew on my past projects 이전 프로젝트 경험을 활용했다)",
        "model": "draw on/upon [experience/knowledge]",
        "tier": 2,
        "star": true,
        "easyEn": "use your experience or knowledge as a resource"
      },
      {
        "cue": "~에 주의·관심을 끌다, ~을 부각시키다. (예: I want to draw your attention to this risk 이 리스크에 주목해 주세요)",
        "model": "draw [attention] to [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "make people notice something"
      },
      {
        "cue": "결론을 도출하다 — (데이터·근거에서) 결론을 이끌어내다. (예: we can't draw a conclusion from one data point 데이터 한 개로는 결론을 못 낸다)",
        "model": "draw a conclusion (from [data])",
        "tier": 2,
        "star": true,
        "easyEn": "form a decision based on facts or evidence"
      },
      {
        "cue": "선을 긋다, 한계를 정하다 — 여기까지는 받아들이지만 그 이상은 안 된다고 선을 긋다. (예: I draw the line at working weekends 주말 근무는 선을 긋는다)",
        "model": "draw the line (at [thing])",
        "tier": 2,
        "easyEn": "set a limit on what you will accept"
      },
      {
        "cue": "끌어내다 (정보·의견을 이끌어내다); 질질 끌다 (회의·과정을 길게 늘이다). (예: draw out the quieter teammates 말 없는 팀원의 의견을 끌어내다). ※ '돈 인출' 뜻의 draw out은 영국식 — 미국은 withdraw/take out.",
        "model": "draw out [info/opinion/meeting]",
        "tier": 3,
        "easyEn": "get information from someone; or make something last longer"
      },
      {
        "cue": "A와 B를 구분 짓다, 경계를 긋다 (둘을 구별하다). ※ 한계를 정하는 'draw the line'(위 항목)과 다름.",
        "model": "draw a line/distinction between [A] and [B]",
        "tier": 3,
        "easyEn": "show how two things are different"
      },
      {
        "cue": "A와 B를 비교하다, 유사점을 짚어내다.",
        "model": "draw a comparison/parallel between [A] and [B]",
        "tier": 3,
        "easyEn": "point out how two things are similar"
      },
      {
        "cue": "물러서다, 주춤하다, (관여에서) 발을 빼다. ※ 구어에서는 pull back이 더 흔함.",
        "model": "draw back (from [thing])",
        "tier": 3,
        "easyEn": "move back; stop being involved"
      },
      {
        "cue": "(자금·재고·예비비를) 끌어 쓰다, 줄이다. (금융: drawdown = 인출·하락폭)",
        "model": "draw down [funds/reserves]",
        "tier": 3,
        "easyEn": "gradually use up money or supplies"
      },
      {
        "cue": "아무것도 못 떠올리다, 허탕 치다. (예: I drew a blank on the answer 답이 도무지 안 떠올랐다 — 면접 회상에 유용)",
        "model": "draw a blank",
        "tier": 3,
        "easyEn": "be unable to remember or think of anything"
      },
      {
        "cue": "사람들을 끌어모으다, 인파를 끌다.",
        "model": "draw a crowd",
        "tier": 3,
        "easyEn": "attract a lot of people"
      },
      {
        "cue": "비난·공격을 사다, 도마에 오르다. (예: the decision drew criticism 그 결정이 비난을 샀다)",
        "model": "draw fire / draw criticism",
        "tier": 3,
        "easyEn": "attract criticism or attack"
      },
      {
        "cue": "급여를 받다 — 정기적으로 급여를 받다. (예: the founder still draws a salary 창업자가 여전히 급여를 받는다). ※ 계좌에서 '돈을 draw(인출)'는 영국식 — 미국은 withdraw.",
        "model": "draw a salary",
        "tier": 3,
        "easyEn": "receive regular pay from a job"
      },
      {
        "cue": "~에서 영감을 얻다.",
        "model": "draw inspiration from [thing]",
        "tier": 3,
        "easyEn": "get new ideas or motivation from something"
      },
      {
        "cue": "끝나가다, 마무리되어 가다. (예: the meeting drew to a close 회의가 마무리되었다)",
        "model": "draw to a close/an end",
        "tier": 3,
        "easyEn": "slowly come to an end"
      },
      {
        "cue": "제비뽑기로 정하다, 추첨하다. ※ 미국 구어에서는 'draw the short straw(불리한 역할을 맡다)'가 가장 흔함.",
        "model": "draw lots / draw straws",
        "tier": 3,
        "easyEn": "choose by random selection"
      },
      {
        "cue": "앞서 나가다 (경기에서 격차를 벌리다); (몸을) 떼어 물러나다. ※ 주로 스포츠·물리적 맥락.",
        "model": "draw away (from [others])",
        "tier": 3,
        "easyEn": "move ahead of others; or move away from something"
      },
      {
        "cue": "(사람·요소를) 모으다, 결집시키다; 가까워지다. (예: the crisis drew the team together 위기가 팀을 결집시켰다)",
        "model": "draw together",
        "tier": 3,
        "easyEn": "bring people or things closer; unite"
      },
      {
        "cue": "사로잡다, 빠져들게 하다 — (이야기·디자인·발표가) 사람의 관심을 끌어 몰입시키다. (예: the opening demo really drew the audience in 첫 데모가 청중을 완전히 사로잡았다)",
        "model": "draw [someone/people] in",
        "tier": 3,
        "easyEn": "attract and hold someone's interest"
      }
    ]
  },
  {
    "id": "point",
    "verb": "POINT",
    "gloss": "point는 방향을 가리키는 게 뼈대다. 가리키다, 지적하다, 향하다, (증거·데이터가) 시사하다.",
    "items": [
      {
        "cue": "[것]을 지적하다, 짚어서 알려주다 (회의·코드리뷰: 'I'd like to point out~')",
        "model": "point out",
        "tier": 1,
        "star": true,
        "easyEn": "to mention something or call attention to it"
      },
      {
        "cue": "~라는 점을 지적하다",
        "model": "point out that [clause]",
        "tier": 1,
        "easyEn": "to mention or note that something is true"
      },
      {
        "cue": "본론으로 들어가다, 핵심만 말하다",
        "model": "get to the point",
        "tier": 1,
        "star": true,
        "easyEn": "to say the main thing without delay"
      },
      {
        "cue": "~해봐야 소용없다, ~할 의미가 없다",
        "model": "there's no point (in [-ing])",
        "tier": 1,
        "star": true,
        "easyEn": "there is no reason or use in doing it"
      },
      {
        "cue": "관점, 시각 ('from a user's point of view')",
        "model": "point of view",
        "tier": 1,
        "star": true
      },
      {
        "cue": "좋은 지적이야, 일리 있는 말이야 (회의 맞장구)",
        "model": "good point / fair point",
        "tier": 1,
        "star": true,
        "easyEn": "that is a valid or reasonable remark"
      },
      {
        "cue": "요점은 ~이다, 내 말은 ~라는 거다",
        "model": "the point is (that)",
        "tier": 1,
        "easyEn": "the main thing I want to say is"
      },
      {
        "cue": "현 시점에서는, 이제 와서는",
        "model": "at this point",
        "tier": 1,
        "star": true
      },
      {
        "cue": "[것]을 가리키다; (데이터·증거가) [것]을 시사하다 ('the metrics point to a memory leak')",
        "model": "point to",
        "tier": 2,
        "star": true,
        "easyEn": "to suggest or indicate something as the cause"
      },
      {
        "cue": "[사람/것]을 (손가락 등으로) 콕 가리키다",
        "model": "point at",
        "tier": 2
      },
      {
        "cue": "[사람]에게 [것]을 짚어서 알려주다",
        "model": "point [thing] out to [person]",
        "tier": 2,
        "easyEn": "to show or mention something to someone"
      },
      {
        "cue": "[사람]에게 [것]을 알려주다/안내하다 ('Can you point me to the docs?')",
        "model": "point [person] to [thing]",
        "tier": 2,
        "easyEn": "to direct someone to where something is"
      },
      {
        "cue": "일부러/반드시 ~하다, 꼭 챙겨서 하다",
        "model": "make a point of [-ing]",
        "tier": 2,
        "easyEn": "to make sure you do something on purpose"
      },
      {
        "cue": "요점/핵심을 놓치다, 잘못 이해하다",
        "model": "miss the point",
        "tier": 2,
        "star": true,
        "easyEn": "to fail to understand the main idea"
      },
      {
        "cue": "무슨 말인지 알겠어, 그 지적 인정해",
        "model": "point taken",
        "tier": 2,
        "easyEn": "I understand and accept your criticism"
      },
      {
        "cue": "고충, 불편한 지점 (제품·UX에서 자주)",
        "model": "pain point",
        "tier": 2,
        "easyEn": "a specific problem that frustrates users or customers"
      },
      {
        "cue": "담당자, 연락 창구",
        "model": "point of contact (POC)",
        "tier": 2,
        "easyEn": "the person you go to for communication"
      },
      {
        "cue": "단일 장애점 (이것 하나 죽으면 전체가 멈추는 지점; 시스템 디자인 면접 필수)",
        "model": "single point of failure",
        "tier": 2,
        "easyEn": "one part whose failure stops the whole system"
      },
      {
        "cue": "핵심 논점, 강조해서 말할 거리",
        "model": "talking point",
        "tier": 2,
        "easyEn": "a key topic prepared for discussion"
      },
      {
        "cue": "간결하고 핵심을 찌르는 ('short and to the point')",
        "model": "to the point",
        "tier": 2,
        "easyEn": "short, clear, and focused on what matters"
      },
      {
        "cue": "글머리표 항목 (문서·슬라이드)",
        "model": "bullet point",
        "tier": 2
      },
      {
        "cue": "출발점, 시작점 ('a good starting point')",
        "model": "starting point",
        "tier": 2
      },
      {
        "cue": "강점, 셀링 포인트 ('the main selling point is~')",
        "model": "selling point",
        "tier": 2,
        "easyEn": "a feature that makes something attractive to buy"
      },
      {
        "cue": "핵심과 무관한, 논점에서 벗어난",
        "model": "beside the point",
        "tier": 3,
        "easyEn": "not relevant to what is being discussed"
      },
      {
        "cue": "[사람]을 탓하다, 책임을 전가하다",
        "model": "point a finger at / point fingers",
        "tier": 3,
        "easyEn": "to blame someone"
      },
      {
        "cue": "단적인 예, 바로 그 사례",
        "model": "case in point",
        "tier": 3,
        "easyEn": "a clear example of what was just said"
      },
      {
        "cue": "걸림돌, 합의가 막히는 지점 (협상·논의에서)",
        "model": "sticking point",
        "tier": 3,
        "easyEn": "an issue that blocks agreement or progress"
      }
    ]
  },
  {
    "id": "settle",
    "verb": "SETTLE",
    "gloss": "settle은 '자리를 잡고 가라앉아 안정되다'가 뼈대다. 정착하다, (문제를) 해결하다, (선택을) 결정하다, (마음·속이) 진정되다, (돈을) 정산하다.",
    "items": [
      {
        "cue": "진정하다, 차분해지다; (결혼·이사 등으로) 한곳에 정착해 안정된 생활을 하다",
        "model": "settle down",
        "tier": 1,
        "star": true,
        "easyEn": "to become calm, or to start a stable settled life"
      },
      {
        "cue": "(새 집·새 직장 등 낯선 환경에) 적응하다, 자리를 잡다",
        "model": "settle in",
        "tier": 2,
        "star": true,
        "easyEn": "to get comfortable and used to a new place or job"
      },
      {
        "cue": "(더 나은 것을 포기하고) ~로 만족하다, 아쉬운 대로 받아들이다 (don't settle for less)",
        "model": "settle for [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "to accept something less than what you wanted"
      },
      {
        "cue": "(여러 선택지 중) ~로 결정하다, ~로 정하다 (settle on a name/date/approach)",
        "model": "settle on [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "to decide on or choose something"
      },
      {
        "cue": "(새 일·일상·환경)에 적응해 자리를 잡다 (settle into the new role)",
        "model": "settle into [a job / routine / place]",
        "tier": 2,
        "easyEn": "to get used to a new job, routine, or place"
      },
      {
        "cue": "(분쟁·문제·논쟁을) 해결하다, 매듭짓다, 결말짓다",
        "model": "settle [a dispute / matter / argument]",
        "tier": 2,
        "star": true,
        "easyEn": "to resolve or end a disagreement"
      },
      {
        "cue": "(빚·계산을) 정산하다, 셈을 치르다 (let's settle up later)",
        "model": "settle up (with [person])",
        "tier": 2,
        "easyEn": "to pay back money you owe someone"
      },
      {
        "cue": "(소송을) 합의로 끝내다, 법정 밖에서 합의하다",
        "model": "settle [a lawsuit] / settle out of court",
        "tier": 2,
        "easyEn": "to end a legal case by agreement instead of a trial"
      },
      {
        "cue": "그럼 결정 났다, 그걸로 끝이다 (논의·고민을 끝내는 말)",
        "model": "that settles it",
        "tier": 2,
        "easyEn": "that makes the decision final"
      },
      {
        "cue": "차분히 ~에 착수하다, 본격적으로 ~을 시작하다 (settle down to work)",
        "model": "settle down to [work / -ing]",
        "tier": 3,
        "easyEn": "to start working calmly and with focus"
      },
      {
        "cue": "(혼란·소동이) 가라앉다; 상황이 진정되길 기다리다",
        "model": "let the dust settle",
        "tier": 3,
        "easyEn": "to wait until a confusing situation becomes calm"
      },
      {
        "cue": "신경을 가라앉히다, 마음을 진정시키다; 속을 가라앉히다",
        "model": "settle one's nerves / settle one's stomach",
        "tier": 3,
        "easyEn": "to make yourself calm, or ease an upset stomach"
      },
      {
        "cue": "묵은 원한을 갚다, 앙갚음하다, 보복하다 (idiom)",
        "model": "settle a/the score",
        "tier": 3,
        "easyEn": "to get revenge for a past wrong"
      },
      {
        "cue": "(의자 등에) 편히 기대어 앉다, 느긋이 자리 잡다 (settle back and relax)",
        "model": "settle back",
        "tier": 3,
        "easyEn": "to lean back and relax comfortably"
      },
      {
        "cue": "(오래 머물) 자리를 잡고 ~에 대비하다, ~할 채비로 눌러앉다",
        "model": "settle in for [the night / a long wait]",
        "tier": 3,
        "easyEn": "to get comfortable and ready to stay a long time"
      }
    ]
  },
  {
    "id": "count",
    "verb": "COUNT",
    "gloss": "count는 '세다'가 뼈대다. 수를 세다, (가치 있는 것으로) 치다·중요하다·유효하다, 믿고 의지하다(count on).",
    "items": [
      {
        "cue": "~를 믿다, ~에 의지하다, ~을 기대하다 (You can count on me. / Don't count on it. / I'm counting on you to finish it.)",
        "model": "count on [person] / count on [thing] / count on [person] to do / count on -ing",
        "tier": 1,
        "star": true,
        "easyEn": "to rely on or trust someone or something"
      },
      {
        "cue": "(수를) 세다, 헤아리다 (count the votes / count to ten)",
        "model": "count [things]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "중요하다, 유효하다, 의미가 있다 (Every vote counts. / It's the thought that counts. / This one doesn't count.)",
        "model": "[thing] counts",
        "tier": 1,
        "star": true,
        "easyEn": "it matters or has value"
      },
      {
        "cue": "끼워주다, 한 명으로 포함시키다 (Count me in!)",
        "model": "count [person] in",
        "tier": 2,
        "easyEn": "to include someone in an activity"
      },
      {
        "cue": "빼다, 제외하다 (Count me out.)",
        "model": "count [person] out",
        "tier": 2,
        "easyEn": "to exclude someone from an activity"
      },
      {
        "cue": "~에 산입되다, ~의 일부로 인정되다 (These hours count toward your PTO. / It counts toward your grade.)",
        "model": "count toward(s) [thing]",
        "tier": 2,
        "easyEn": "to be included as part of a total"
      },
      {
        "cue": "~에게 불리하게 작용하다, 감점·약점이 되다 (Will this count against me in the review?)",
        "model": "count against [person]",
        "tier": 2,
        "easyEn": "to be a disadvantage to someone"
      },
      {
        "cue": "다 더하다, 합산하다 (Count up the totals.)",
        "model": "count up [things]",
        "tier": 2
      },
      {
        "cue": "(숫자를) 거꾸로 세다, 카운트다운하다 (count down from ten)",
        "model": "count down (from [number])",
        "tier": 2
      },
      {
        "cue": "가치가 있다 / 아무 소용 없다 (Experience counts for a lot. / All that work counted for nothing.)",
        "model": "count for [something] / count for nothing",
        "tier": 2,
        "easyEn": "to have value, or to have no value"
      },
      {
        "cue": "~로 간주되다, ~으로 쳐지다 (Does this count as overtime? / A retweet counts as engagement.)",
        "model": "count as [something]",
        "tier": 2,
        "easyEn": "to be accepted or considered as something"
      },
      {
        "cue": "세다가 수를 놓치다, 너무 많아 못 세다 (I've lost count of how many times this broke.)",
        "model": "lose count (of [things])",
        "tier": 2,
        "easyEn": "to forget the number because there are too many"
      },
      {
        "cue": "~을 손꼽아 기다리다, ~까지 날짜를 세다 (We're counting down to the launch.)",
        "model": "count down to [event]",
        "tier": 2,
        "easyEn": "to eagerly wait for an event as time passes"
      },
      {
        "cue": "~를 ~의 하나로 꼽다, ~에 포함시키다 (I count her among my closest mentors.)",
        "model": "count [person/thing] among [group]",
        "tier": 3,
        "easyEn": "to consider someone or something part of a group"
      },
      {
        "cue": "한 개씩 세어 내놓다, 따로 세다 (She counted out the bills onto the table.)",
        "model": "count out [money/items]",
        "tier": 3,
        "easyEn": "to count things one by one"
      },
      {
        "cue": "(차례로) 번호를 외치다 (Count off by twos.)",
        "model": "count off",
        "tier": 3,
        "easyEn": "to say numbers in turn one after another"
      },
      {
        "cue": "가진 것에 감사하다",
        "model": "count your blessings",
        "tier": 3,
        "easyEn": "to appreciate the good things you have"
      },
      {
        "cue": "김칫국부터 마시지 마라, 결과 나오기 전에 좋아하지 마라",
        "model": "don't count your chickens (before they hatch)",
        "tier": 3,
        "easyEn": "do not assume success before it actually happens"
      },
      {
        "cue": "인원수를 세다, 머릿수를 세다 (Let me count heads before we order.)",
        "model": "count heads",
        "tier": 3,
        "easyEn": "to count how many people are present"
      },
      {
        "cue": "(잠들려고) 양을 세다",
        "model": "count sheep",
        "tier": 3,
        "easyEn": "to try to fall asleep by counting imagined sheep"
      }
    ]
  },
  {
    "id": "plan",
    "verb": "PLAN",
    "gloss": "plan은 '미리 정해 둔다'가 뼈대다. 계획하다, 작정하다, 대비하다, 설계하다.",
    "items": [
      {
        "cue": "~할 계획이다, ~하려고 한다 (가장 기본). \"I plan to ship it Friday.\"",
        "model": "plan to [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~할 작정이다, ~할 예정이다 (구어에서 plan to와 거의 같게 씀). \"Are you planning on attending the standup?\"",
        "model": "plan on [-ing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 대비해 계획하다, ~을 미리 준비하다. \"We need to plan for scale / for the worst case.\"",
        "model": "plan for [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "미리미리 계획하다, 앞일을 대비하다. \"Book early and plan ahead.\"",
        "model": "plan ahead",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 계획하다, ~을 짜다 (타동사 기본). \"plan the sprint / a meeting / the launch.\"",
        "model": "plan [the thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "계획을 세우다, 약속을 잡다. \"Let's make plans for Q3.\"",
        "model": "make plans (to/for)",
        "tier": 1
      },
      {
        "cue": "선약이 있다, (저녁 등) 약속이 있다. \"I have plans tonight.\"",
        "model": "have plans",
        "tier": 1
      },
      {
        "cue": "계획대로, 예정대로. \"The deploy went as planned.\"",
        "model": "as planned",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 꼼꼼히/세세하게 짜다, 구상을 끝까지 그리다. \"Let's plan out the rollout step by step.\"",
        "model": "plan out [thing]",
        "tier": 2
      },
      {
        "cue": "~을 피해서/고려해서 일정을 잡다. \"We planned the release around the holidays.\"",
        "model": "plan around [thing]",
        "tier": 2,
        "easyEn": "arrange your schedule to avoid or fit something"
      },
      {
        "cue": "계획대로 진행되다 (부정으로 자주 씀). \"Nothing went according to plan.\"",
        "model": "go according to plan",
        "tier": 2
      },
      {
        "cue": "계획 변경 (갑자기 바뀜). \"Change of plans — we're demoing today.\"",
        "model": "change of plans",
        "tier": 2
      },
      {
        "cue": "차선책, 대안, 백업 계획. \"If the API is down, what's our Plan B?\"",
        "model": "Plan B",
        "tier": 2,
        "easyEn": "a backup plan if the first one fails"
      },
      {
        "cue": "작전, 전략, 실행 방안 (미국 직장에서 흔함). \"What's the game plan for the migration?\"",
        "model": "game plan",
        "tier": 2,
        "easyEn": "an overall strategy or plan of action"
      },
      {
        "cue": "실행 계획, 후속 조치 계획. \"Let's turn this into an action plan.\"",
        "model": "action plan / plan of action",
        "tier": 2
      },
      {
        "cue": "사업 계획(서). \"The founders pitched their business plan.\"",
        "model": "business plan",
        "tier": 2
      },
      {
        "cue": "종합 계획, 큰 그림. \"This is all part of the master plan.\"",
        "model": "master plan",
        "tier": 2
      },
      {
        "cue": "(SaaS) 요금제, 구독 플랜. \"We're on the free plan / upgrade to the Pro plan.\"",
        "model": "pricing plan / subscription plan",
        "tier": 2
      },
      {
        "cue": "퇴직 연금 제도 (미국 직장 복지). \"Does the company match the 401(k) plan?\"",
        "model": "retirement plan / 401(k) plan",
        "tier": 2
      },
      {
        "cue": "계획대로 밀고 나가다, 계획을 고수하다. \"Let's stick to the plan and not add scope.\"",
        "model": "stick to the plan",
        "tier": 2
      },
      {
        "cue": "계획은 ~하는 것이다 (스탠드업/회의에서 매우 흔함). \"The plan is to launch next week.\"",
        "model": "the plan is to [verb]",
        "tier": 2
      },
      {
        "cue": "아무리 잘 짠 계획도 (어긋나기 마련이다) — 속담. \"The best-laid plans... the server crashed anyway.\"",
        "model": "the best-laid plans",
        "tier": 3,
        "easyEn": "even careful plans can still go wrong"
      }
    ]
  },
  {
    "id": "figure",
    "verb": "FIGURE",
    "gloss": "figure는 머릿속으로 따져서 알아내고 짐작하는 게 핵심이다. 알아내다, 해결하다, ~라고 생각하다, 예상하다, (중요하게) 등장하다.",
    "items": [
      {
        "cue": "알아내다, 이해하다, (문제를) 해결하다 — 머리 써서 답·방법을 찾다. \"Let me figure out why the build is failing.\"",
        "model": "figure out [thing] / figure out how to [verb]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~라고 생각하다/짐작하다 (= I guess/think). \"I figured you'd already left.\" 북미 회화에서 매우 흔함",
        "model": "figure (that) [clause]",
        "tier": 2,
        "star": true,
        "easyEn": "think or guess that something is true"
      },
      {
        "cue": "(사람) 속을 도무지 모르겠다, 이해가 안 된다. \"I can't figure her out.\" figure out의 분리형 — 사람의 성격·속내를 파악하다",
        "model": "can't figure [person] out",
        "tier": 2,
        "easyEn": "cannot understand what someone is really like"
      },
      {
        "cue": "~에 요소로 작용하다, 영향을 주다. \"How does cost figure into the decision?\"",
        "model": "figure into [thing]",
        "tier": 2,
        "easyEn": "be one factor that affects a result"
      },
      {
        "cue": "~을 예상하다, 계획·일정에 넣다, 기대하다. \"I figured on finishing by 5.\" 비격식",
        "model": "figure on [thing] / figure on [-ing]",
        "tier": 3,
        "easyEn": "expect something or include it in your plans"
      },
      {
        "cue": "(계산·고려에) ~을 넣다/포함하다. \"Did you figure in the tax?\"",
        "model": "figure in [thing]",
        "tier": 3,
        "easyEn": "include something when you calculate or decide"
      },
      {
        "cue": "참 알다가도 모르겠네, 어이없네 (예상 밖 결과에 던지는 감탄)",
        "model": "go figure",
        "tier": 3,
        "easyEn": "that is surprising and hard to explain"
      },
      {
        "cue": "그럴 줄 알았다, 예상한 대로네 (당연하다는 듯한 빈정거림)",
        "model": "it figures / that figures",
        "tier": 3,
        "easyEn": "that is exactly what I expected"
      },
      {
        "cue": "말이 안 된다, 앞뒤가 안 맞는다, 이해가 안 간다",
        "model": "it doesn't figure",
        "tier": 3,
        "easyEn": "that does not make sense"
      },
      {
        "cue": "누가 알았겠어, 뜻밖이네 (예상 못 한 결과에 대한 놀람)",
        "model": "who'd have figured / who would have figured",
        "tier": 3,
        "easyEn": "nobody expected that to happen"
      }
    ]
  },
  {
    "id": "sort",
    "verb": "SORT",
    "gloss": "sort는 뒤섞인 걸 가르고 줄 세우는 뼈대 동사다. 분류하다, 정렬하다, (문제를) 해결·정리하다, 가려내다.",
    "items": [
      {
        "cue": "어느 정도, 약간, 뭐랄까 (말할 때 buffer로도 자주 씀)",
        "model": "sort of",
        "tier": 1,
        "star": true,
        "easyEn": "somewhat; partly; not completely"
      },
      {
        "cue": "(문제·상황을) 해결하다, 처리하다; (어질러진 걸) 정리·정돈하다",
        "model": "sort out [thing/problem]",
        "tier": 2,
        "star": true,
        "easyEn": "fix a problem or organize something messy"
      },
      {
        "cue": "(배열·목록·데이터를) 정렬하다 — 코딩/인터뷰 핵심",
        "model": "sort [array/list/data]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "[기준(날짜·이름·크기 등)]으로 정렬하다",
        "model": "sort by [criterion]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(많은 것을) 하나하나 살펴보며 추리다/정리하다",
        "model": "sort through [things]",
        "tier": 2
      },
      {
        "cue": "[것들]을 [그룹·범주]로 분류해 넣다",
        "model": "sort [things] into [groups/categories]",
        "tier": 2
      },
      {
        "cue": "오름차순/내림차순으로 정렬하다",
        "model": "sort in ascending/descending order",
        "tier": 2
      },
      {
        "cue": "온갖, 갖가지 [것]",
        "model": "all sorts of [things]",
        "tier": 2,
        "easyEn": "many different kinds of things"
      },
      {
        "cue": "일종의 [것]; 비슷한 거",
        "model": "a sort of [thing]",
        "tier": 2,
        "easyEn": "a kind of thing; something similar"
      },
      {
        "cue": "[것]이 처리·해결되게 하다, 정리되게 만들다",
        "model": "get [thing] sorted (out)",
        "tier": 2,
        "easyEn": "get something fixed or organized"
      },
      {
        "cue": "정렬 순서 (오름차순/내림차순 등 정렬 방향) — 기술 용어",
        "model": "sort order",
        "tier": 2
      },
      {
        "cue": "[A]를 [B]와 구분해 가려내다 (옥석을 가리다)",
        "model": "sort [A] from [B]",
        "tier": 3,
        "easyEn": "separate one type of thing from another"
      },
      {
        "cue": "마음·생활을 추스르다, 정신 차리다",
        "model": "sort [oneself] out",
        "tier": 3,
        "easyEn": "deal with your problems and become organized"
      },
      {
        "cue": "컨디션이 안 좋은, 기분이 언짢은",
        "model": "out of sorts",
        "tier": 3,
        "easyEn": "feeling slightly unwell or in a bad mood"
      },
      {
        "cue": "일종의 ~ (그저 그런 수준의)",
        "model": "of sorts",
        "tier": 3,
        "easyEn": "a kind of thing, but not a good example"
      }
    ]
  },
  {
    "id": "step",
    "verb": "STEP",
    "gloss": "step은 '발을 한 걸음 옮기다'가 뼈대다. 나서다, 물러나다, 개입하다, 자리를 비우다, 단계별로 짚어가다.",
    "items": [
      {
        "cue": "[person]가 더 책임지고 나서다, 수준을 한 단계 끌어올리다 (I stepped up to lead the release.)",
        "model": "step up",
        "tier": 2,
        "star": true,
        "easyEn": "take on more responsibility, or improve your performance"
      },
      {
        "cue": "(직책·역할에서) 물러나다, 사임하다 (The CTO stepped down last month.)",
        "model": "step down",
        "tier": 2,
        "star": true,
        "easyEn": "leave an important job or official position"
      },
      {
        "cue": "개입하다, (남을) 대신해 나서다 (My manager stepped in to unblock us.)",
        "model": "step in",
        "tier": 2,
        "star": true,
        "easyEn": "get involved to help or handle a problem"
      },
      {
        "cue": "한발 물러서서 큰 그림을 보다, 거리를 두다 (Let's step back and rethink the design.)",
        "model": "step back",
        "tier": 2,
        "star": true,
        "easyEn": "pause to look at the whole situation calmly"
      },
      {
        "cue": "(잠깐) 자리를 비우다, 밖으로 나가다 (I'll step out for a sec.)",
        "model": "step out",
        "tier": 2,
        "easyEn": "leave a place for a short time"
      },
      {
        "cue": "옆으로 비키다; (자리를) 양보하고 물러나다 (He stepped aside so a new lead could take over.)",
        "model": "step aside",
        "tier": 2,
        "easyEn": "move aside, or give up your position for someone"
      },
      {
        "cue": "[thing]에서 잠시 손을 떼다, 떨어지다 (I stepped away from the project for a week.)",
        "model": "step away (from [thing])",
        "tier": 2,
        "easyEn": "take a break from something for a while"
      },
      {
        "cue": "(코드·로직·과정을) 한 단계씩 짚어가다 (Let me step through the algorithm.)",
        "model": "step through [thing]",
        "tier": 2,
        "easyEn": "go through something carefully, one stage at a time"
      },
      {
        "cue": "[person]를 대신해 대타로 들어가다 (Can you step in for me at the standup?)",
        "model": "step in for [person]",
        "tier": 2,
        "easyEn": "temporarily do someone's job in their place"
      },
      {
        "cue": "(역할·상황에) 들어가 맡다; step into [person]'s shoes = ~의 역할을 이어받다",
        "model": "step into [role/situation]",
        "tier": 2,
        "easyEn": "begin taking on a role or situation"
      },
      {
        "cue": "실력·수준을 끌어올리다 (We need to step up our game on testing.)",
        "model": "step up [one's] game",
        "tier": 2,
        "easyEn": "improve how well you do something"
      },
      {
        "cue": "책임지고 나서다, 제 역할을 다하다 (관용구)",
        "model": "step up to the plate",
        "tier": 2,
        "easyEn": "take responsibility and deal with a task"
      },
      {
        "cue": "남의 영역을 침범하다, 기분을 상하게 하다 (I don't want to step on your toes here.)",
        "model": "step on [person]'s toes",
        "tier": 2,
        "easyEn": "upset someone by interfering in their area"
      },
      {
        "cue": "조치를 취하다 (We took steps to prevent the outage.)",
        "model": "take steps (to [verb])",
        "tier": 2,
        "easyEn": "take action to achieve or prevent something"
      },
      {
        "cue": "한 단계씩, 차근차근 (Walk me through it step by step.)",
        "model": "step by step",
        "tier": 2
      },
      {
        "cue": "앞으로 나서다, 자원하다·제보하다 (A volunteer stepped forward.)",
        "model": "step forward",
        "tier": 2,
        "easyEn": "offer to help, or give information to authorities"
      },
      {
        "cue": "발밑 조심해; 언행을 조심해",
        "model": "watch your step",
        "tier": 2,
        "easyEn": "be careful, in walking or in how you behave"
      },
      {
        "cue": "선을 넘다, 규범·기대에서 벗어나다",
        "model": "step out of line",
        "tier": 2,
        "easyEn": "behave badly or break the accepted rules"
      },
      {
        "cue": "~와 보조가 안 맞다, 엇박자다 (The plan is out of step with reality.)",
        "model": "out of step (with [thing/person])",
        "tier": 2,
        "easyEn": "not matching or not agreeing with something"
      },
      {
        "cue": "한발 앞서 있다 (Stay one step ahead of the competition.)",
        "model": "one step ahead (of [person])",
        "tier": 2,
        "easyEn": "acting early so you stay in front of someone"
      },
      {
        "cue": "~을 넘어가다, 타고 넘다 (literal)",
        "model": "step over [thing]",
        "tier": 2
      },
      {
        "cue": "서둘러, 속도 내 (관용구)",
        "model": "step on it",
        "tier": 3,
        "easyEn": "hurry up; go faster"
      },
      {
        "cue": "~와 발맞추다, 보조를 맞추다",
        "model": "in step (with [thing/person])",
        "tier": 3,
        "easyEn": "matching or moving together with something"
      }
    ]
  },
  {
    "id": "lay",
    "verb": "LAY",
    "gloss": "lay는 '평평하게 놓다·눕히다'가 뼈대인 타동사. 거기서 규칙을 정하고(확립), 계획을 펼쳐 보이고, 사람을 내보내고(해고), 기반을 깐다. (자동사 lie '눕다'와 혼동 주의)",
    "items": [
      {
        "cue": "(경영상 이유로) 해고하다·정리해고하다. 'The company laid off 200 people' = 200명을 정리해고했다. 수동 'be/get laid off' = 해고당하다 (테크 업계 필수 표현). 별개로 'lay off [the coffee/sugar]' = ~을 그만두다·끊다, 'Lay off!' = 그만 좀 해·집적대지 마.",
        "model": "lay off [person] / lay [person] off",
        "tier": 2,
        "star": true,
        "easyEn": "end someone's job because fewer workers are needed"
      },
      {
        "cue": "(계획·생각을) 조목조목 펼쳐 설명하다; (물건·UI를) 배치하다. 'lay out the roadmap' = 로드맵을 제시하다 (면접·스탠드업에서 매우 흔함). 참고: 'lay out [money]' = 큰돈을 지출하다 — 다소 격식·영국식, 미국 일상 회화는 shell out/fork out을 더 씀.",
        "model": "lay out [plan/idea] / lay [thing] out",
        "tier": 2,
        "star": true,
        "easyEn": "explain something clearly in detail, or arrange items"
      },
      {
        "cue": "(규칙·원칙을) 확립하다·못박아 정하다. 'lay down the ground rules' = 기본 원칙을 정하다. 'lay down the law' = 단호하게 명령·엄포를 놓다. 문자 그대로는 '내려놓다'.",
        "model": "lay down [rules/principles]",
        "tier": 2,
        "star": true,
        "easyEn": "firmly establish rules or principles"
      },
      {
        "cue": "~을 (조심히) 놓다·눕히다·깔다. 'lay the cable' = 케이블을 깔다, 'lay it on the table' = 탁자에 놓다. (사람·자신이 '눕다'는 자동사 lie down — lay/lie 혼동 주의)",
        "model": "lay [thing] down / lay [thing] [place]",
        "tier": 2,
        "easyEn": "put something down carefully or in a place"
      },
      {
        "cue": "~을 위한 기반·사전 작업을 닦다·마련하다. 'lay the groundwork for the migration' = 마이그레이션의 토대를 마련하다. (업무에서 매우 흔함)",
        "model": "lay the groundwork for [thing]",
        "tier": 2,
        "easyEn": "do the early work that makes something possible"
      },
      {
        "cue": "(비행기 환승 때문에) ~에서 경유·대기 체류하다. 명사 layover = 경유 대기 시간 (미국식; 영국식 stopover).",
        "model": "lay over (in [place])",
        "tier": 2,
        "easyEn": "stop somewhere between flights on a journey"
      },
      {
        "cue": "(새 환경의) 상황·돌아가는 판세를 파악하다. 미국식 표현 (영국식은 'lie of the land'). 새 팀/코드베이스에 적응할 때 자주 씀.",
        "model": "get the lay of the land",
        "tier": 2,
        "easyEn": "learn how a new place or situation works"
      },
      {
        "cue": "책임·탓을 ~에게 돌리다·전가하다. (변형: lay the blame at someone's feet/door)",
        "model": "lay the blame on [person]",
        "tier": 2,
        "easyEn": "say that something is someone's fault"
      },
      {
        "cue": "몸을 사리다·잠잠히 지내다·잠적하다. (구어로 lay low, 규범 표현은 lie low)",
        "model": "lay low / lie low",
        "tier": 2,
        "easyEn": "stay hidden and avoid attention for a while"
      },
      {
        "cue": "~의 기초·토대를 놓다·마련하다. (groundwork와 의미 유사, 다른 콜로케이션)",
        "model": "lay the foundation(s) for [thing]",
        "tier": 2,
        "easyEn": "create the basic things something needs to succeed"
      },
      {
        "cue": "~을 호되게 비난하다·몰아세우다·들들 볶다. (구어, 다소 격하게 따질 때)",
        "model": "lay into [person]",
        "tier": 3,
        "easyEn": "criticize or attack someone strongly"
      },
      {
        "cue": "(병·부상으로) 앓아 누워 있다·몸져눕다. 'laid up with the flu' = 독감으로 드러눕다.",
        "model": "be laid up (with [illness])",
        "tier": 3,
        "easyEn": "be stuck in bed because of illness or injury"
      },
      {
        "cue": "~을 한쪽에 치워두다·(논쟁·감정을) 제쳐두다; (돈·시간을) 따로 떼어 두다. (다소 격식 — 일상 회화는 set aside/put aside가 더 흔함)",
        "model": "lay aside [thing]",
        "tier": 3,
        "easyEn": "put something to one side, or save it"
      },
      {
        "cue": "~에 대한 권리·소유권을 주장하다; (공로를) 자기 것이라 주장하다.",
        "model": "lay claim to [thing]",
        "tier": 3,
        "easyEn": "say that something belongs to you"
      },
      {
        "cue": "(우려·소문·논란을) 잠재우다·종식시키다. (사람을) 안장하다.",
        "model": "lay [concerns/rumors] to rest",
        "tier": 3,
        "easyEn": "end worries or rumors by proving them wrong"
      },
      {
        "cue": "~을 (처음) 보다·목격하다. 'the first time I laid eyes on it' = 그걸 처음 봤을 때.",
        "model": "lay eyes on [thing/person]",
        "tier": 3,
        "easyEn": "see something or someone"
      },
      {
        "cue": "(칭찬·아첨·과장을) 지나치게 늘어놓다·오버하다.",
        "model": "lay it on thick",
        "tier": 3,
        "easyEn": "praise or exaggerate far too much"
      },
      {
        "cue": "솔직히 다 털어놓다; (지위·평판 등을) 걸고 위험을 무릅쓰다.",
        "model": "lay it (all) on the line",
        "tier": 3,
        "easyEn": "speak very honestly, or risk something important"
      },
      {
        "cue": "(감춰진 것을) 드러내다·낱낱이 폭로하다. 'lay bare the problems' = 문제를 다 까발리다.",
        "model": "lay [thing] bare",
        "tier": 3,
        "easyEn": "reveal something hidden completely"
      },
      {
        "cue": "~을 초토화하다·쑥대밭으로 만들다 (강한 비유·다소 과장).",
        "model": "lay waste to [thing]",
        "tier": 3,
        "easyEn": "destroy something completely"
      },
      {
        "cue": "(협상·논의에서) 속내·계획·패를 솔직히 다 드러내다. 'Let me lay my cards on the table' = 솔직히 말할게요. (cf. put your cards on the table)",
        "model": "lay your cards on the table",
        "tier": 3,
        "easyEn": "honestly tell people your real plans or intentions"
      }
    ]
  },
  {
    "id": "roll",
    "verb": "ROLL",
    "gloss": "roll은 '구르다/굴리다'가 뼈대다. 거기서 굴려 내보내다(배포·출시), 되돌리다(롤백), 이월하다, 합산하다, 밀려들다로 뻗는다.",
    "items": [
      {
        "cue": "(제품·기능을) 출시하다, 배포하다 (\"we rolled out the new feature to all users\"); (반죽 등을) 밀어 펴다",
        "model": "roll out [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "release or introduce something to many people"
      },
      {
        "cue": "(이전 상태로) 되돌리다, 롤백하다 (\"roll back the release\"); (가격·규제·정책을) 축소·인하하다",
        "model": "roll back [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "return something to an earlier state, or reduce it"
      },
      {
        "cue": "(남은 예산·휴가가) 이월되다 / [thing] 이월하다 (\"unused budget rolls over\"); (자금·401k·계좌를) 옮기다(이전); 뒤집다, 뒹굴다",
        "model": "roll over",
        "tier": 2,
        "star": true,
        "easyEn": "carry over to a later time, or transfer accounts"
      },
      {
        "cue": "(수치·데이터를) 합산·집계하다 (\"roll up the numbers\"); (소매를) 걷어붙이다 (= roll up your sleeves, 본격적으로 일에 착수하다)",
        "model": "roll up [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "combine numbers or data into one total"
      },
      {
        "cue": "(주문·돈·사람·결과가) 밀려들다, 쏟아져 들어오다 (\"orders are rolling in\")",
        "model": "roll in",
        "tier": 2,
        "easyEn": "arrive in large numbers or amounts"
      },
      {
        "cue": "일을 시작하다, 첫발을 떼다, 굴러가게 만들다",
        "model": "get the ball rolling",
        "tier": 2,
        "star": true,
        "easyEn": "start an activity or process"
      },
      {
        "cue": "계속 잘 풀리는 중, 연속으로 성공하는 중 (\"the team's on a roll\")",
        "model": "on a roll",
        "tier": 2,
        "easyEn": "having continued success for a while"
      },
      {
        "cue": "(예상 못 한 어려움·변화에) 유연하게 대처하다, 잘 버텨내다",
        "model": "roll with the punches",
        "tier": 2,
        "easyEn": "stay calm and adapt to problems and changes"
      },
      {
        "cue": "수시로, 마감 없이 계속 (채용·접수 등을 상시로) (\"we review applications on a rolling basis\")",
        "model": "on a rolling basis",
        "tier": 2,
        "easyEn": "continuously, with no single fixed deadline"
      },
      {
        "cue": "운에 맡기고 모험하다, 한번 걸어보다",
        "model": "roll the dice",
        "tier": 2,
        "easyEn": "take a risk and hope for luck"
      },
      {
        "cue": "자, 시작하자 / 시작할 준비가 다 됐다",
        "model": "let's roll / ready to roll",
        "tier": 2,
        "easyEn": "let's start; we are ready to begin"
      },
      {
        "cue": "여러 개를 하나로 합친 (\"two roles rolled into one\")",
        "model": "[things] rolled into one",
        "tier": 2,
        "easyEn": "several things combined into a single one"
      },
      {
        "cue": "(창문·블라인드 등을) 내리다",
        "model": "roll down [thing]",
        "tier": 2
      },
      {
        "cue": "(잔액·날짜·일정을) 다음 기간으로 이월·이동하다 (회계·계획에서)",
        "model": "roll forward [thing]",
        "tier": 3,
        "easyEn": "move a balance or date to the next period"
      },
      {
        "cue": "(프로젝트·팀에서) 빠지다, 손을 떼다 (컨설팅·스태핑 표현; 반대는 roll onto)",
        "model": "roll off [project]",
        "tier": 3,
        "easyEn": "finish working on a project and leave it"
      },
      {
        "cue": "극진히 환대하다, 융숭하게 대접하다",
        "model": "roll out the red carpet",
        "tier": 3,
        "easyEn": "welcome someone in a special, generous way"
      },
      {
        "cue": "(책임자가) 문책당하다, 목이 날아가다",
        "model": "heads will roll",
        "tier": 3,
        "easyEn": "people will be punished or fired"
      },
      {
        "cue": "(기성품·라이브러리를 안 쓰고) 직접 만들어 쓰다, 자체 구현하다 (\"don't roll your own crypto\", \"roll your own auth\") — 개발 현장에서 매우 흔함",
        "model": "roll your own [thing]",
        "tier": 3,
        "easyEn": "build it yourself instead of using existing tools"
      }
    ]
  },
  {
    "id": "kick",
    "verb": "KICK",
    "gloss": "kick은 발로 차듯 무언가를 갑자기·세게 작동시키는 뼈대다. 시작하다, 효력이 발동되다, 내쫓다, 자극을 주다.",
    "items": [
      {
        "cue": "(회의·프로젝트·스프린트·빌드를) 시작하다, 착수하다. 명사 kickoff = 착수 회의. 'Let's kick off the sprint.'",
        "model": "kick off [thing] / kick [thing] off",
        "tier": 1,
        "star": true,
        "easyEn": "start a meeting, project, or event"
      },
      {
        "cue": "(효과·할인·약·기능·정책이) 작동하기 시작하다, 발효되다; (돈을) 십시일반 보태다. 'The discount kicks in at checkout.' 'Everyone kicked in $20.'",
        "model": "kick in",
        "tier": 2,
        "star": true,
        "easyEn": "start to take effect or start working"
      },
      {
        "cue": "내쫓다, 쫓아내다, (팀·프로젝트·자리에서) 퇴출시키다.",
        "model": "kick [person] out (of [place])",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(아이디어를) 격식 없이 논의하다, 이리저리 굴려보다; (생각·물건이) 어딘가 떠돌다·굴러다니다. 'Let's kick around some ideas.'",
        "model": "kick around [thing] / kick [thing] around",
        "tier": 2,
        "easyEn": "discuss ideas in a casual, informal way"
      },
      {
        "cue": "느긋하게 쉬다, 긴장을 풀다 ('kick back and relax'); 명사 kickback = 리베이트, 뇌물성 사례금.",
        "model": "kick back / a kickback",
        "tier": 2,
        "easyEn": "relax and rest; (noun) a secret illegal payment"
      },
      {
        "cue": "~을 무척 즐기다, ~에서 재미를 느끼다. 'I get a kick out of debugging.'",
        "model": "get a kick out of [thing] / [-ing]",
        "tier": 2,
        "easyEn": "enjoy something a lot; find it fun"
      },
      {
        "cue": "(나쁜) 습관·중독을 끊다.",
        "model": "kick the habit",
        "tier": 2,
        "easyEn": "stop a bad habit or addiction"
      },
      {
        "cue": "(프로젝트·성장·과정에) 시동을 걸다, 본격적으로 출발시키다, (경기·동력을) 부양하다. 'Let's kickstart the project.' (cf. 크라우드펀딩 플랫폼 Kickstarter)",
        "model": "kick-start [thing] / kickstart [thing]",
        "tier": 2,
        "easyEn": "give something a strong, energetic start"
      },
      {
        "cue": "(결정·문제 해결을) 미루다, 뒤로 떠넘기다. 회의 단골 표현.",
        "model": "kick the can down the road",
        "tier": 3,
        "easyEn": "delay dealing with a problem until later"
      },
      {
        "cue": "(도입·구매 전에) 직접 만져보고 점검하다, 가볍게 테스트해 보다. 'Let's kick the tires on this tool.'",
        "model": "kick the tires",
        "tier": 3,
        "easyEn": "test or check something before buying it"
      },
      {
        "cue": "소란을 피우다, 강하게 항의하다; (먼지·문제 등을) 일으키다.",
        "model": "kick up a fuss / kick up [thing]",
        "tier": 3,
        "easyEn": "complain loudly or cause a noisy protest"
      },
      {
        "cue": "한 단계 끌어올리다, 강도·수준을 높이다. 'Let's kick it up a notch.'",
        "model": "kick [thing] up a notch",
        "tier": 3,
        "easyEn": "increase the level, intensity, or quality"
      },
      {
        "cue": "본격적으로 돌아가기 시작하다, 속도가 붙다, 가동되다.",
        "model": "kick into gear / kick into high gear",
        "tier": 3,
        "easyEn": "start working actively and gain speed"
      },
      {
        "cue": "(실수·놓친 기회 때문에) 자책하다, 땅을 치고 후회하다.",
        "model": "kick oneself (for [-ing])",
        "tier": 3,
        "easyEn": "feel angry at yourself for a mistake"
      },
      {
        "cue": "(pants) 정신 차리게 하는 자극·동기부여; (teeth) 뼈아픈 좌절·배신.",
        "model": "a kick in the pants / a kick in the teeth",
        "tier": 3,
        "easyEn": "a push to act; or a painful disappointment"
      },
      {
        "cue": "매정하게 차버리다, 내치다, 버리다. (구어)",
        "model": "kick [person/thing] to the curb",
        "tier": 3,
        "easyEn": "reject or get rid of someone or something"
      },
      {
        "cue": "마지못해 끌려가듯, 죽어라 버티면서. 'dragged kicking and screaming.'",
        "model": "kicking and screaming",
        "tier": 3,
        "easyEn": "very unwillingly, while strongly resisting"
      },
      {
        "cue": "재미 삼아, 그냥 심심풀이로.",
        "model": "for kicks / just for kicks",
        "tier": 3,
        "easyEn": "just for fun or amusement"
      },
      {
        "cue": "여전히 건재하다, 멀쩡히 잘 지내다.",
        "model": "alive and kicking",
        "tier": 3,
        "easyEn": "still active, healthy, and doing well"
      },
      {
        "cue": "죽다, 뻗다. (속어, 격식 X)",
        "model": "kick the bucket",
        "tier": 3,
        "easyEn": "die"
      }
    ]
  },
  {
    "id": "wrap",
    "verb": "WRAP",
    "gloss": "wrap의 본질은 \"감싸다/두르다\"다. 물건을 싸다, 둘러 감다, (일을) 마무리하다, (머리로) 완전히 이해하다.",
    "items": [
      {
        "cue": "~을 마무리하다, 끝내다 (회의·프로젝트·하루). 목적어 없이 'let's wrap up'처럼도 씀",
        "model": "wrap up [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "to finish or complete something"
      },
      {
        "cue": "~을 완전히 이해하다, 머릿속에 정리하다 (보통 어렵거나 낯선 것). 예: I can't wrap my head around this codebase",
        "model": "wrap [one's] head around [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "fully understand something difficult or confusing"
      },
      {
        "cue": "~을 ~로 감싸다/싸다. (프로그래밍) 예: wrap the component in a provider, wrap the call in a try/catch",
        "model": "wrap [thing] in [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 ~에 두르다, 감다 (예: wrap a cable around the post)",
        "model": "wrap [thing] around [thing]",
        "tier": 2
      },
      {
        "cue": "~를 빙 둘러 감싸며 돌다, ~를 따라 휘감다 (예: the porch wraps around the house)",
        "model": "wrap around [thing]",
        "tier": 2
      },
      {
        "cue": "~에 푹 빠지다, 정신이 팔리다, 몰두하다 (예: he's so wrapped up in his work)",
        "model": "be/get wrapped up in [thing]",
        "tier": 2,
        "easyEn": "be completely focused on or deeply involved in something"
      },
      {
        "cue": "(회의·기간의) 요약, 정리, 마무리. 예: a quick wrap-up, a wrap-up meeting(마무리 회의)",
        "model": "a wrap-up (of [thing])",
        "tier": 2,
        "easyEn": "a short summary of something"
      },
      {
        "cue": "감싸는 것; (코드) 래퍼, 다른 함수·API를 감싼 층",
        "model": "a wrapper (around [thing])",
        "tier": 2
      },
      {
        "cue": "~을 선물용으로 포장하다",
        "model": "gift-wrap [thing]",
        "tier": 2
      },
      {
        "cue": "뽁뽁이, 완충용 에어캡 포장재 (동사로 bubble-wrap [thing]도 씀)",
        "model": "bubble wrap",
        "tier": 2
      },
      {
        "cue": "이걸로 다 끝났다, 마무리됐다 (원래 촬영 종료 신호; 다소 캐주얼)",
        "model": "that's a wrap",
        "tier": 3,
        "easyEn": "we are finished; it is done"
      },
      {
        "cue": "~을 비밀로 하다, 공개하지 않다 (예: keep the launch under wraps)",
        "model": "keep [thing] under wraps",
        "tier": 3,
        "easyEn": "keep something secret or hidden"
      },
      {
        "cue": "~을 수축 비닐로 밀봉 포장하다",
        "model": "shrink-wrap [thing]",
        "tier": 3,
        "easyEn": "to wrap something tightly in plastic"
      },
      {
        "cue": "자동 줄바꿈 (텍스트가 줄 끝에서 다음 줄로 넘어감)",
        "model": "word wrap / text wrapping",
        "tier": 3,
        "easyEn": "text moves to the next line automatically"
      }
    ]
  },
  {
    "id": "reach",
    "verb": "REACH",
    "gloss": "reach는 '뻗어서 닿다'가 뼈대다. 도달하다, (사람에게) 연락이 닿다, (합의·목표에) 이르다, 손을 뻗다.",
    "items": [
      {
        "cue": "~에게 (먼저) 연락하다, 손을 내밀다 (I'll reach out to the team)",
        "model": "reach out to [person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "(먼저) 연락하다, 문의·도움을 요청하다 (Feel free to reach out if you have questions)",
        "model": "reach out",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 도착하다, 다다르다 (전치사 없이 바로 목적어: reach the office)",
        "model": "reach [a place / destination]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에게 연락이 닿다 (You can reach me at this number)",
        "model": "reach [person] (at [number / email])",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 잡으려 손을 뻗다; (목표를) 추구하다 (reach for the stars)",
        "model": "reach for [thing]",
        "tier": 2
      },
      {
        "cue": "(시간이 좀 지난 뒤) 다시 연락하다, 후속으로 follow up하다 (I'll reach back out next week)",
        "model": "reach back out (to [person])",
        "tier": 2
      },
      {
        "cue": "도움·지원을 청하다, 손을 내밀어 구하다 (reach out for help)",
        "model": "reach out for [help / support]",
        "tier": 2
      },
      {
        "cue": "~안으로 손을 넣다 (reach into your bag)",
        "model": "reach into [thing]",
        "tier": 2
      },
      {
        "cue": "손 닿는 곳에 / 닿지 않는 곳에; (목표가) 손에 잡힐 듯/멀게",
        "model": "within reach / out of reach",
        "tier": 2
      },
      {
        "cue": "~하는 지경·단계에 이르다 (We've reached a point where...)",
        "model": "reach a point where [clause]",
        "tier": 2
      },
      {
        "cue": "~의 끝에 다다르다 (reach the end of the road)",
        "model": "reach the end (of [thing])",
        "tier": 2
      },
      {
        "cue": "위로/아래로 손을 뻗다 (reach up to grab a box)",
        "model": "reach up / reach down",
        "tier": 2
      },
      {
        "cue": "정원·최대 수용량에 도달하다 (The event has reached capacity)",
        "model": "reach capacity",
        "tier": 2
      },
      {
        "cue": "~을 가로질러 손을 뻗다; (진영·부서를 넘어) 협력의 손을 내밀다",
        "model": "reach across [thing] / reach across the aisle",
        "tier": 3,
        "easyEn": "work together with people from an opposing group"
      }
    ]
  },
  {
    "id": "deal",
    "verb": "DEAL",
    "gloss": "deal의 중심 뼈대는 '다루다/처리하다'. 여기서 거래하다, (카드·몫을) 나눠주다, (타격·벌을) 가하다로 뻗고, a great deal처럼 '양·정도'를 나타내는 명사로도 쓴다.",
    "items": [
      {
        "cue": "(문제·일·사람을) 처리하다, 다루다, 대응하다 — \"I'll deal with the bug today.\"",
        "model": "deal with [problem/task/person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "대단한 일 / 큰 문제 — \"It's not a big deal\" 별거 아냐",
        "model": "[a/no] big deal",
        "tier": 1,
        "star": true
      },
      {
        "cue": "아주 많은, 다량의 — \"a great deal of time/effort\" (격식체; 회화에선 a lot of가 더 흔함)",
        "model": "a great deal (of) [thing]",
        "tier": 2,
        "easyEn": "a large amount of something"
      },
      {
        "cue": "거래를 성사시키다, 합의하다, 협상을 타결하다",
        "model": "make / cut / strike a deal (with [person])",
        "tier": 2,
        "star": true
      },
      {
        "cue": "거래(협상)를 깨는 결정적 결격 사유, 절대 양보 못 할 조건",
        "model": "deal-breaker",
        "tier": 2,
        "star": true,
        "easyEn": "a condition serious enough to stop a deal or plan"
      },
      {
        "cue": "거래를 매듭짓다, 계약을 최종 성사시키다",
        "model": "close / seal the deal",
        "tier": 2
      },
      {
        "cue": "(상품·서비스를) 취급하다, 거래하다, ~를 전문으로 하다 — \"We deal in used hardware.\"",
        "model": "deal in [goods/service]",
        "tier": 2,
        "easyEn": "to buy and sell a type of product"
      },
      {
        "cue": "(타격·벌을) 가하다, 안기다 — \"deal a blow to the economy\"",
        "model": "deal (out) a blow / [punishment] (to [someone])",
        "tier": 2,
        "easyEn": "to cause harm or damage to someone or something"
      },
      {
        "cue": "마약을 팔다, 밀매하다",
        "model": "deal drugs",
        "tier": 2,
        "easyEn": "to sell illegal drugs"
      },
      {
        "cue": "(받아들이고) 알아서 해라, 감수해라 (다소 직설적·퉁명스러운 관용구)",
        "model": "deal with it",
        "tier": 2
      },
      {
        "cue": "이미 끝난 일, 확정된 사안 — \"It's a done deal.\"",
        "model": "done deal",
        "tier": 2,
        "easyEn": "something already decided and final"
      },
      {
        "cue": "진짜배기, 명실상부한 것/사람",
        "model": "the real deal",
        "tier": 2,
        "easyEn": "someone or something that is genuine, not fake"
      },
      {
        "cue": "거래 결렬, 합의 불가, 안 됨",
        "model": "no deal",
        "tier": 2
      },
      {
        "cue": "있잖아, 상황은 이래, 자 들어봐 — 본론·조건을 꺼낼 때 쓰는 구어 표현 (북미 직장 회화 빈출)",
        "model": "here's the deal",
        "tier": 2,
        "easyEn": "let me explain the situation or the terms"
      },
      {
        "cue": "무슨 상황이야?, 어떻게 된 거야?, ~는 왜 그래? (구어체)",
        "model": "what's the deal (with [thing/person])?",
        "tier": 2,
        "easyEn": "what is happening, or why is it like this"
      },
      {
        "cue": "그렇게 하자, 합의됐어, 콜! — 제안을 수락할 때",
        "model": "it's a deal / Deal!",
        "tier": 2
      },
      {
        "cue": "나눠주다, 분배하다 (= dish out)",
        "model": "deal out [things/cards/money]",
        "tier": 3,
        "easyEn": "to give things out to several people"
      },
      {
        "cue": "(게임·계획에) 끼워주다, 참여시키다 — \"Deal me in.\"",
        "model": "deal [someone] in",
        "tier": 3,
        "easyEn": "to include someone in a game or plan"
      },
      {
        "cue": "(게임·계획에서) 빼다, 제외하다",
        "model": "deal [someone] out",
        "tier": 3,
        "easyEn": "to leave someone out of a game or plan"
      },
      {
        "cue": "(카드 게임에서) 카드를 돌리다, 패를 나누다",
        "model": "deal the cards",
        "tier": 3,
        "easyEn": "to give cards to players in a game"
      },
      {
        "cue": "부당한 대우, 불공평한 처사 — \"got a raw deal\"",
        "model": "raw deal",
        "tier": 3,
        "easyEn": "unfair or bad treatment"
      }
    ]
  },
  {
    "id": "shut",
    "verb": "SHUT",
    "gloss": "shut은 '닫아서 막는다'가 뼈대다. 닫다, 끄다, 차단하다, 가두다.",
    "items": [
      {
        "cue": "(서버·시스템을) 끄다; (사업·공장을) 영구 폐쇄하다",
        "model": "shut [thing] down",
        "tier": 1,
        "star": true
      },
      {
        "cue": "(수도·전기·가스 등) 공급을 끊다; (기계·기능을) 끄다",
        "model": "shut [thing] off",
        "tier": 1,
        "star": true
      },
      {
        "cue": "입 다물다, 조용히 하다 (구어); shut [person] up = ~의 입을 막다",
        "model": "shut up",
        "tier": 1,
        "star": true
      },
      {
        "cue": "배제하다, (사람·소리·생각을) 막아 들이지 않다; (경기에서) 완봉으로 이기다",
        "model": "shut [person/thing] out",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(사람이) 마음을 닫고 감정·반응을 멈추다 (스트레스 상황에서)",
        "model": "shut down",
        "tier": 2,
        "easyEn": "to stop talking or reacting because of stress or emotion"
      },
      {
        "cue": "입 다물다, 비밀을 지키다",
        "model": "keep your mouth shut",
        "tier": 2
      },
      {
        "cue": "안에 가두다, 들여놓고 문을 닫다",
        "model": "shut [person/animal] in",
        "tier": 3,
        "easyEn": "to keep a person or animal inside a closed space"
      },
      {
        "cue": "격리하다; (혼자) 틀어박히다",
        "model": "shut [oneself] away",
        "tier": 3,
        "easyEn": "to stay alone and away from other people"
      },
      {
        "cue": "~로부터 단절시키다, 고립시키다",
        "model": "shut [oneself] off from [thing]",
        "tier": 3,
        "easyEn": "to keep yourself separate from something or someone"
      },
      {
        "cue": "(가능성을) 차단하다, ~을 거절하다",
        "model": "shut the door on [thing]",
        "tier": 3,
        "easyEn": "to refuse or end any chance of something"
      },
      {
        "cue": "(문·서랍 등에) ~을 끼다, 끼이게 하다",
        "model": "shut [thing] in [place]",
        "tier": 3,
        "easyEn": "to catch or trap something by closing a door or drawer"
      },
      {
        "cue": "명백한[뻔한] 사건·문제",
        "model": "open-and-shut case",
        "tier": 3,
        "easyEn": "a case or problem that is very clear and easy to decide"
      },
      {
        "cue": "눈 감고도 할 만큼 아주 쉽게 하다",
        "model": "do [thing] with your eyes shut",
        "tier": 3,
        "easyEn": "to do something very easily"
      }
    ]
  },
  {
    "id": "play",
    "verb": "PLAY",
    "gloss": "play는 '하다·놀다'의 뼈대다. (게임·스포츠를) 하다, (악기를) 연주하다, (음악·영상을) 재생하다, (역할을) 맡다/연기하다.",
    "items": [
      {
        "cue": "게임·스포츠를 하다 (play soccer, play chess)",
        "model": "play [game/sport]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에서 역할을 하다, 한몫하다 (QA plays a key role in releases)",
        "model": "play a role / play a part (in [thing])",
        "tier": 1,
        "star": true
      },
      {
        "cue": "축소·경시하다, 대수롭지 않게 말하다 (don't play down the risk; = downplay)",
        "model": "play down [thing]",
        "tier": 2,
        "easyEn": "to make something seem less important than it is"
      },
      {
        "cue": "강조하다, 부각시키다 (때로 과장하다) (play up your strengths)",
        "model": "play up [thing]",
        "tier": 2,
        "easyEn": "to emphasize something or make it seem more important"
      },
      {
        "cue": "(시간을 두고) 전개되다, 펼쳐지다 (let's see how it plays out)",
        "model": "play out",
        "tier": 2,
        "star": true,
        "easyEn": "to develop or happen over time"
      },
      {
        "cue": "이것저것 만져보며 실험하다, 만지작거리다 (play around with the settings)",
        "model": "play around with [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "장단을 맞춰주다, 일단 협조하는 척하다 (just play along for now)",
        "model": "play along (with [person/idea])",
        "tier": 2,
        "easyEn": "to pretend to agree or cooperate for now"
      },
      {
        "cue": "(녹음·녹화를) 다시 재생하다 (play back the call)",
        "model": "play back [recording]",
        "tier": 2
      },
      {
        "cue": "(생각을) 굴려보다, (수치·데이터를) 이리저리 만져보다 (play with an idea; play with the numbers)",
        "model": "play with [thing]",
        "tier": 2,
        "easyEn": "to experiment with an idea or with numbers"
      },
      {
        "cue": "상황 봐가며 즉흥적으로 정하다 (let's play it by ear)",
        "model": "play it by ear",
        "tier": 2,
        "easyEn": "to decide what to do as the situation develops"
      },
      {
        "cue": "안전하게 가다, 무리하지 않다",
        "model": "play it safe",
        "tier": 2
      },
      {
        "cue": "(일부러) 반대 입장을 취해보다 (의도적으로 반론 제기)",
        "model": "play devil's advocate",
        "tier": 2,
        "easyEn": "to argue against something on purpose to test it"
      },
      {
        "cue": "강점을 살리다, 잘하는 쪽으로 가다",
        "model": "play to [one's] strengths",
        "tier": 2,
        "easyEn": "to focus on what you are good at"
      },
      {
        "cue": "강경하게 밀어붙이다, 빡세게 나가다",
        "model": "play hardball",
        "tier": 2,
        "easyEn": "to act tough and refuse to compromise"
      },
      {
        "cue": "편애하다, 특정인을 봐주다",
        "model": "play favorites",
        "tier": 2,
        "easyEn": "to treat some people better than others unfairly"
      },
      {
        "cue": "~에 일조하다, 맞아떨어지다; 도리어 남 좋은 일 시키다",
        "model": "play into [thing] / play into [someone's] hands",
        "tier": 2,
        "easyEn": "to accidentally help someone who opposes you"
      },
      {
        "cue": "모르는 척하다, 시치미 떼다",
        "model": "play dumb",
        "tier": 2,
        "easyEn": "to pretend you do not know something"
      },
      {
        "cue": "뒤처진 것을 따라잡다, 만회하려 애쓰다",
        "model": "play catch-up",
        "tier": 2,
        "easyEn": "to try to catch up after falling behind"
      },
      {
        "cue": "농간 부리다, 가지고 놀다 (stop playing games)",
        "model": "play games (with [person])",
        "tier": 2,
        "easyEn": "to behave dishonestly to trick or control someone"
      },
      {
        "cue": "사이좋게 굴다, 협조적으로 행동하다",
        "model": "play nice",
        "tier": 2,
        "easyEn": "to behave well and cooperate with others"
      },
      {
        "cue": "(요인·기능이) 작용하기 시작하다, 관여하게 되다 (this is where caching comes into play)",
        "model": "[thing] comes into play",
        "tier": 2,
        "easyEn": "to start to have an effect or become relevant"
      },
      {
        "cue": "침착한 척하다, 태연하게 굴다 (서두르지 않다)",
        "model": "play it cool",
        "tier": 2,
        "easyEn": "to stay calm and act unworried"
      },
      {
        "cue": "길게 보고 전략적으로 움직이다, 장기전을 펼치다",
        "model": "play the long game",
        "tier": 2,
        "easyEn": "to follow a long-term plan instead of fast results"
      },
      {
        "cue": "둘을 서로 경쟁·대립시키다, 이간질하다 (play them off against each other); 'play off each other' = 서로 주거니 받거니 받쳐주다",
        "model": "play [person] off against [person]",
        "tier": 3,
        "easyEn": "to make two people compete against each other"
      }
    ]
  },
  {
    "id": "hang",
    "verb": "HANG",
    "gloss": "hang은 '걸어서 매달다'가 뼈대다. 걸다, 매달다, 머물다, (전화를) 끊다, (프로그램이) 멈추다.",
    "items": [
      {
        "cue": "(전화를) 끊다",
        "model": "hang up",
        "tier": 1,
        "star": true,
        "easyEn": "end a telephone call"
      },
      {
        "cue": "(편하게) 어울려 놀다, 시간을 보내다",
        "model": "hang out (with [person])",
        "tier": 1,
        "star": true,
        "easyEn": "spend relaxed free time with someone"
      },
      {
        "cue": "잠깐만 기다려; (꽉) 붙잡다",
        "model": "hang on",
        "tier": 1,
        "star": true,
        "easyEn": "wait for a short moment"
      },
      {
        "cue": "[물건]을 (벽·고리에) 걸다, 매달다",
        "model": "hang [thing] (on [place])",
        "tier": 2,
        "star": true
      },
      {
        "cue": "[것]의 요령·감을 익히다",
        "model": "get the hang of [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "learn how to do something"
      },
      {
        "cue": "(하는 일 없이) 서성이다, 빈둥거리다; ~ 근처에서 시간 보내다",
        "model": "hang around",
        "tier": 2,
        "star": true
      },
      {
        "cue": "포기하지 않고 버티다, 견디다",
        "model": "hang in (there)",
        "tier": 2,
        "star": true,
        "easyEn": "keep trying and do not give up"
      },
      {
        "cue": "(프로그램·컴퓨터가) 멈추다, 먹통이 되다, 응답이 없다",
        "model": "[program/computer] hang(s)",
        "tier": 2,
        "star": true,
        "easyEn": "(a computer) stops responding and freezes"
      },
      {
        "cue": "[사람]과의 전화를 (화나서) 일방적으로 끊다",
        "model": "hang up on [person]",
        "tier": 2,
        "easyEn": "suddenly end a phone call with someone"
      },
      {
        "cue": "[것]을 계속 가지고 있다, 놓지 않다 (보관·유지)",
        "model": "hang on to [thing]",
        "tier": 2
      },
      {
        "cue": "숙취에 시달리다, 술이 덜 깨다",
        "model": "be/get hung over",
        "tier": 2,
        "easyEn": "feel ill after drinking too much alcohol"
      },
      {
        "cue": "[사람]을 (답·반응 없이) 기다리게 하다; (응답·약속을 안 지켜) 곤란하게 내버려두다",
        "model": "leave [person] hanging",
        "tier": 2,
        "easyEn": "leave someone waiting without an answer"
      },
      {
        "cue": "[것]에 (지나치게) 집착하다·얽매이다; (그 문제 때문에) 막히다·지연되다",
        "model": "be/get hung up on [thing]",
        "tier": 2,
        "easyEn": "be too focused or worried about something"
      },
      {
        "cue": "선뜻 나서지 않고 머뭇거리다, 뒤에 남다",
        "model": "hang back",
        "tier": 3,
        "easyEn": "to stay back because you do not want to act"
      },
      {
        "cue": "(위협·걱정이) ~위에 드리우다, 가시지 않다",
        "model": "hang over [person/thing]",
        "tier": 3,
        "easyEn": "(a problem) stays and keeps making you worried"
      },
      {
        "cue": "(결과가) 불확실한 상태다, 아직 결정 안 났다",
        "model": "hang in the balance",
        "tier": 3,
        "easyEn": "the outcome is uncertain and undecided"
      },
      {
        "cue": "위태롭다, 간당간당하다",
        "model": "hang by a thread",
        "tier": 3,
        "easyEn": "to be very close to failing or ending"
      },
      {
        "cue": "(주장·계획이) 앞뒤가 맞다, 일관되다; 서로 똘똘 뭉치다",
        "model": "hang together",
        "tier": 3,
        "easyEn": "be consistent; or stay united as a group"
      },
      {
        "cue": "아래로 늘어지다, 처지다",
        "model": "hang down",
        "tier": 3,
        "easyEn": "hang loosely down toward the ground"
      },
      {
        "cue": "(미국 구어) 좌회전/우회전하다",
        "model": "hang a left/right",
        "tier": 3,
        "easyEn": "turn left or right while driving"
      }
    ]
  },
  {
    "id": "weigh",
    "verb": "WEIGH",
    "gloss": "weigh는 '무게'를 재는 동사다. 무게가 나가다, (선택지를) 따져보다·저울질하다, 마음을 짓누르다, 영향을 미치다.",
    "items": [
      {
        "cue": "무게가 ...이다, 무게가 나가다 — It weighs 3 kilos. / How much do you weigh?",
        "model": "weigh [amount]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "의견을 보태다, 한마디 거들다 — Feel free to weigh in. / Can you weigh in here?",
        "model": "weigh in",
        "tier": 2,
        "star": true,
        "easyEn": "give your opinion in a discussion"
      },
      {
        "cue": "...에 대해 의견을 내다 — Could you weigh in on the design decision?",
        "model": "weigh in on [topic]",
        "tier": 2,
        "easyEn": "give your opinion about a topic"
      },
      {
        "cue": "마음을 짓누르다, 부담이 되다 — The deadline is weighing on me. / It's been weighing on my mind.",
        "model": "weigh on [someone]",
        "tier": 2,
        "star": true,
        "easyEn": "cause someone ongoing worry or stress"
      },
      {
        "cue": "...보다 더 크다/중요하다, 능가하다 — The benefits outweigh the risks.",
        "model": "outweigh [something]",
        "tier": 2,
        "star": true,
        "easyEn": "be more important or greater than something else"
      },
      {
        "cue": "짓누르다, (짐·걱정이) 무겁게 누르다 — He's weighed down by debt. / weighed down with bags.",
        "model": "weigh [someone/something] down",
        "tier": 2,
        "easyEn": "make someone feel heavy or full of worry"
      },
      {
        "cue": "...을 ...과 견주어 따지다, 저울질하다 — Weigh the cost against the benefit.",
        "model": "weigh [A] against [B]",
        "tier": 2,
        "easyEn": "compare two things to reach a decision"
      },
      {
        "cue": "(의견·제안 등을) 내놓다, 보태다 — She weighed in with a couple of suggestions.",
        "model": "weigh in with [something]",
        "tier": 3,
        "easyEn": "add a comment or suggestion to a discussion"
      },
      {
        "cue": "무게·분량이 ...에 달하다 — He weighs in at 180 pounds. / The report weighs in at 300 pages.",
        "model": "weigh in at [amount]",
        "tier": 3,
        "easyEn": "be a certain weight when measured"
      },
      {
        "cue": "...에게 불리하게 작용하다, 불리한 요소가 되다 — His lack of experience weighs against him.",
        "model": "weigh against [someone]",
        "tier": 3,
        "easyEn": "be a disadvantage for someone"
      },
      {
        "cue": "말을 신중히 고르다, 단어를 가려 쓰다 — Weigh your words carefully in the review.",
        "model": "weigh your words",
        "tier": 3,
        "easyEn": "choose your words carefully before speaking"
      }
    ]
  },
  {
    "id": "scale",
    "verb": "SCALE",
    "gloss": "scale의 뼈대는 '규모'다. 크기를 키우거나 줄이다, 규모가 커져도 감당하다(확장성), (벽·산을) 오르다, 저울·척도.",
    "items": [
      {
        "cue": "규모를 키우다 — 팀·생산·시스템의 용량을 늘리다. (기술) 더 강력한 장비로 수직 확장하다. 목적어 없이 'we need to scale up(우리는 규모를 키워야 한다)'처럼도 쓴다.",
        "model": "scale up [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "확장성이 있다, 규모가 커져도 감당하다 — 'this doesn't scale(이 방식은 규모가 커지면 안 통한다)'. 면접 단골 표현.",
        "model": "[thing] scales (well) / doesn't scale",
        "tier": 2,
        "star": true,
        "easyEn": "keep working well as size or usage grows"
      },
      {
        "cue": "규모를 줄이다, 축소하다 (인원·생산·계획·서버 리소스를 작게 줄임).",
        "model": "scale down [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(계획·지출·범위를) 줄이다, 삭감하다, 보수적으로 축소하다. 'scale back operations(사업을 축소하다)'.",
        "model": "scale back [thing]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "대규모로, 큰 규모에서 (운영·실행하다). 'run/operate at scale'. 테크 면접 빈출.",
        "model": "at scale",
        "tier": 2,
        "star": true,
        "easyEn": "operating at a very large size or volume"
      },
      {
        "cue": "~규모까지 확장하다/감당하다. 'scale to millions of users(수백만 사용자까지 감당하다)'.",
        "model": "scale to [size/number]",
        "tier": 2,
        "easyEn": "grow to handle a certain size or number"
      },
      {
        "cue": "~을 줄이다, ~에 대한 지출·규모를 삭감하다. 'scale back on hiring(채용을 줄이다)'.",
        "model": "scale back on [thing]",
        "tier": 2,
        "easyEn": "reduce the amount of something"
      },
      {
        "cue": "~의 규모·크기·범위. 'the scale of the problem(문제의 규모)'.",
        "model": "the scale of [thing]",
        "tier": 2
      },
      {
        "cue": "1에서 10까지의 척도로 (평가하다). 정도를 묻는 표현.",
        "model": "on a scale of [1] to [10]",
        "tier": 2
      },
      {
        "cue": "(서버·노드·인스턴스를 늘려) 수평 확장하다. up(수직)과 대비되는 인프라 용어.",
        "model": "scale out [thing]",
        "tier": 3,
        "easyEn": "add more machines to handle more load"
      },
      {
        "cue": "~에 비례해 늘어나다/커지다. 'costs scale with usage(비용이 사용량에 비례해 증가한다)'.",
        "model": "[thing] scales with [thing]",
        "tier": 3,
        "easyEn": "increase or decrease in proportion to something else"
      },
      {
        "cue": "규모의 경제 — 생산량이 늘수록 단가가 낮아지는 효과.",
        "model": "economies of scale",
        "tier": 3,
        "easyEn": "lower cost per unit when producing more"
      },
      {
        "cue": "(벽·담·산을) 기어오르다, 오르다. 물리적 등반 의미.",
        "model": "scale [a wall/mountain]",
        "tier": 3,
        "easyEn": "climb up something steep like a wall"
      },
      {
        "cue": "실제 비율대로, 축척에 맞게 (그려진/만든). 'not to scale(실제 비율 아님)'.",
        "model": "(drawn/built) to scale",
        "tier": 3,
        "easyEn": "drawn in correct proportion to real size"
      },
      {
        "cue": "차등제, 슬라이딩 스케일 — 소득·사용량에 따라 금액이 달라지는 방식.",
        "model": "(a) sliding scale",
        "tier": 3,
        "easyEn": "a system where amounts change by income or use"
      },
      {
        "cue": "저울을 기울게 하다 — 결정적 영향을 주다, 판세를 바꾸다.",
        "model": "tip the scales (in favor of [person])",
        "tier": 3,
        "easyEn": "be the thing that finally decides the result"
      }
    ]
  },
  {
    "id": "extra",
    "verb": "APPENDIX",
    "gloss": "",
    "items": [
      {
        "cue": "문제를 다루다",
        "model": "deal with [problem]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 의존하다",
        "model": "depend on [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 의존하다",
        "model": "rely on [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 집중하다",
        "model": "focus on [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~로 이어지다",
        "model": "lead to [result]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~가 ~하지 못하게 막다",
        "model": "prevent [person/thing] from [-ing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 ~로부터 보호하다",
        "model": "protect [thing] against [risk]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 지원하다",
        "model": "apply for [job/visa]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 적용되다",
        "model": "apply to [case/person]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 가리키다 / 언급하다",
        "model": "refer to [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 응답하다",
        "model": "respond to [request]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~와 관련 있다",
        "model": "relate to [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "A와 B를 비교하다",
        "model": "compare A with B",
        "tier": 1,
        "star": true
      },
      {
        "cue": "A를 B에 비유하다 / 비교하다",
        "model": "compare A to B",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 기반하다",
        "model": "be based on [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 속하다",
        "model": "belong to [person/group]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 동의하다",
        "model": "agree with [person/idea]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 동의하지 않다",
        "model": "disagree with [person/idea]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 신경 쓰다",
        "model": "care about [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 기다리다",
        "model": "wait for [person/thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~을 듣다",
        "model": "listen to [person/thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~에 주의를 기울이다",
        "model": "pay attention to [thing]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "(~을) 후속 조치하다, 챙겨서 마무리하다",
        "model": "follow up on [an action item / a lead]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "(~을) 조사하다, 알아보다",
        "model": "look into [the matter / a complaint]",
        "tier": 1,
        "star": true
      },
      {
        "cue": "~라는 결과를 낳다",
        "model": "result in [result]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에서 비롯되다",
        "model": "result from [cause]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~에 기여하다",
        "model": "contribute to [result]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 설명하다 / 차지하다 / 고려하다",
        "model": "account for [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "explain why something happens, or form part of a total"
      },
      {
        "cue": "A를 B에 기반하다",
        "model": "base A on B",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~로 구성되다",
        "model": "consist of [parts]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "~을 돌보다",
        "model": "care for [person]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(규정·정책·요청을) 준수하다, 따르다 — 격식체, 컴플라이언스 맥락에서 필수",
        "model": "comply with [a regulation / policy / request]",
        "tier": 2,
        "star": true,
        "easyEn": "follow or obey a rule, policy, or request"
      },
      {
        "cue": "(기준·일정·원칙을) 고수하다, 철저히 지키다",
        "model": "adhere to [standards / a schedule / principles]",
        "tier": 2,
        "star": true,
        "easyEn": "follow or stick closely to rules, a plan, or schedule"
      },
      {
        "cue": "(규격·업계 관행에) 부합하다, 들어맞다",
        "model": "conform to [specs / industry norms]",
        "tier": 2,
        "star": true,
        "easyEn": "match or follow standards, rules, or norms"
      },
      {
        "cue": "(목표·전략과) 부합하다, 결을 맞추다 — 면접 단골 표현",
        "model": "align with [our goals / the strategy]",
        "tier": 2,
        "star": true,
        "easyEn": "match or agree with goals or a strategy"
      },
      {
        "cue": "(고객 요구·타깃층에) 맞추다, 부응하다",
        "model": "cater to [client needs / a target audience]",
        "tier": 2,
        "star": true,
        "easyEn": "give people exactly what they want or need"
      },
      {
        "cue": "(상대의 판단·연장자에게) 따르다, 우선권을 양보하다",
        "model": "defer to [your judgment / senior staff]",
        "tier": 2,
        "star": true,
        "easyEn": "let someone else decide because you respect them"
      },
      {
        "cue": "(달리 방법이 없어 극단적 수단에) 의존하다, 결국 동원하다",
        "model": "resort to [drastic measures / layoffs]",
        "tier": 2,
        "star": true,
        "easyEn": "use something as a last option when nothing else works"
      },
      {
        "cue": "(합쳐서 ~에) 이르다; 결국 ~와 마찬가지다",
        "model": "amount to [a significant figure / the same thing]",
        "tier": 2,
        "star": true,
        "easyEn": "add up to a total; or be the same in effect"
      },
      {
        "cue": "(견해·이론에) 동의하다, 지지하다 — 구독이 아니라 '신봉하다' 뜻",
        "model": "subscribe to [a view / a theory / a philosophy]",
        "tier": 2,
        "star": true,
        "easyEn": "agree with or believe in an idea or theory"
      },
      {
        "cue": "(제안·조건에) 반대하다, 이의를 제기하다",
        "model": "object to [a proposal / the terms]",
        "tier": 2,
        "star": true,
        "easyEn": "disagree with or oppose something"
      },
      {
        "cue": "(조건·처리에) 동의하다, 승낙하다 — 법무·약관 맥락",
        "model": "consent to [the terms / data collection]",
        "tier": 2,
        "star": true,
        "easyEn": "agree to or allow something"
      },
      {
        "cue": "(성공을 팀의) 공·덕분으로 돌리다",
        "model": "attribute [the success] to [the team]",
        "tier": 2,
        "star": true,
        "easyEn": "say something was caused by or thanks to someone"
      },
      {
        "cue": "(변화·새 환경에) 적응하다, 맞춰가다",
        "model": "adapt to [change / a new environment]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(~을) 열망하다, 지향하다",
        "model": "aspire to [a leadership role]",
        "tier": 2,
        "star": true,
        "easyEn": "strongly want to achieve something"
      },
      {
        "cue": "(기한·계획에) 전념하다, 확실히 약속하다",
        "model": "commit to [a deadline / a plan]",
        "tier": 2,
        "star": true,
        "easyEn": "firmly promise to do or stick with something"
      },
      {
        "cue": "(자연스레 ~쪽으로) 끌리다, 기울다",
        "model": "gravitate toward [a particular solution]",
        "tier": 2,
        "star": true,
        "easyEn": "be naturally attracted to or move toward something"
      },
      {
        "cue": "(압박·유혹에) 굴복하다, 무너지다",
        "model": "succumb to [pressure / temptation]",
        "tier": 2,
        "star": true,
        "easyEn": "stop resisting and give in to something"
      },
      {
        "cue": "(~와) 다르다, 차이가 나다 — differ '의견이 다르다' with도 가능",
        "model": "differ from [the original / the norm]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(~로부터) 도움을 받다, 덕을 보다",
        "model": "benefit from [feedback / mentorship]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(~을) 삼가다, 자제하다 — 정중한 금지 표현",
        "model": "refrain from [commenting / making promises]",
        "tier": 2,
        "star": true,
        "easyEn": "choose not to do something; hold yourself back"
      },
      {
        "cue": "(데이터에서) 끌어내다, 도출하다",
        "model": "derive [value / insight] from [the data]",
        "tier": 2,
        "star": true,
        "easyEn": "get or obtain something from a source"
      },
      {
        "cue": "(~에서) 비롯되다, 기인하다",
        "model": "stem from [a misunderstanding / root causes]",
        "tier": 2,
        "star": true,
        "easyEn": "to be caused by or come from something"
      },
      {
        "cue": "(계획·절차에서) 벗어나다, 이탈하다",
        "model": "deviate from [the plan / protocol]",
        "tier": 2,
        "star": true,
        "easyEn": "to move away from the usual plan or way"
      },
      {
        "cue": "(~의) 가치를 떨어뜨리다, 깎아내리다",
        "model": "detract from [the overall value]",
        "tier": 2,
        "star": true,
        "easyEn": "to make something seem less good or valuable"
      },
      {
        "cue": "(~을 …와) 구별하다, 차별화하다",
        "model": "distinguish [X] from [Y]",
        "tier": 2,
        "star": true,
        "easyEn": "to see how one thing differs from another"
      },
      {
        "cue": "(~을 …에서) 면제하다, 예외로 두다",
        "model": "exempt [someone] from [a requirement]",
        "tier": 2,
        "star": true,
        "easyEn": "to free someone from a rule or duty"
      },
      {
        "cue": "(스트레스·업무량을) 감당하다, 견디며 대처하다",
        "model": "cope with [stress / a heavy workload]",
        "tier": 2,
        "star": true,
        "easyEn": "to deal with something hard in a calm way"
      },
      {
        "cue": "(어려운 문제와) 씨름하다, 고심하다",
        "model": "grapple with [a tough problem]",
        "tier": 2,
        "star": true,
        "easyEn": "to try hard to deal with a problem"
      },
      {
        "cue": "(상충하는 우선순위에) 대처하다, 맞붙다",
        "model": "contend with [competing priorities]",
        "tier": 2,
        "star": true,
        "easyEn": "to deal with something difficult"
      },
      {
        "cue": "(전문가·법무팀과) 상의하다, 자문을 구하다",
        "model": "consult with [a specialist / legal]",
        "tier": 2,
        "star": true,
        "easyEn": "to ask someone for advice or information"
      },
      {
        "cue": "(여러 부서와) 조율·협력하다",
        "model": "coordinate with [cross-functional teams]",
        "tier": 2,
        "star": true,
        "easyEn": "to organize work together with other people"
      },
      {
        "cue": "(~을 …와) 조화시키다, 양립시키다; (수치를) 대사·맞춰보다",
        "model": "reconcile [X] with [Y]",
        "tier": 2,
        "star": true,
        "easyEn": "to make two different things agree or fit"
      },
      {
        "cue": "(~을) 방해하다, ~에 지장을 주다",
        "model": "interfere with [operations / performance]",
        "tier": 2,
        "star": true,
        "easyEn": "to get in the way of something working"
      },
      {
        "cue": "(~을) 함부로 손대다, 조작·변조하다",
        "model": "tamper with [data / evidence]",
        "tier": 2,
        "star": true,
        "easyEn": "to touch or change something in a wrong way"
      },
      {
        "cue": "(~을) 전문으로 하다, 특화하다",
        "model": "specialize in [a domain / front-end]",
        "tier": 2,
        "star": true,
        "easyEn": "to focus mainly on one area or skill"
      },
      {
        "cue": "(~에) 뛰어나다, 탁월하다 — 면접 강점 표현",
        "model": "excel at/in [a particular skill]",
        "tier": 2,
        "star": true,
        "easyEn": "to be very good at something"
      },
      {
        "cue": "(~에) 참여하다, 적극 관여하다",
        "model": "engage in [discussions / negotiations]",
        "tier": 2,
        "star": true,
        "easyEn": "to take part in an activity"
      },
      {
        "cue": "(~에) 개입하다, 중재하러 나서다",
        "model": "intervene in [a dispute / the process]",
        "tier": 2,
        "star": true,
        "easyEn": "to get involved to change a situation"
      },
      {
        "cue": "(~을) 고려에 넣다, 감안하다",
        "model": "factor [X] in / factor in [costs / risk]",
        "tier": 2,
        "star": true,
        "easyEn": "to include something when you decide or calculate"
      },
      {
        "cue": "(~을) 고집하다, 강력히 요구하다",
        "model": "insist on [accuracy / doing it right]",
        "tier": 2,
        "star": true,
        "easyEn": "to firmly demand or require something"
      },
      {
        "cue": "(기회·흐름을) 십분 활용하다, 잘 이용하다",
        "model": "capitalize on [an opportunity / momentum]",
        "tier": 2,
        "star": true,
        "easyEn": "use a chance to get an advantage"
      },
      {
        "cue": "(~을) 부연 설명하다, 자세히 풀어 말하다 — 면접관 단골 요청",
        "model": "elaborate on [a point / your answer]",
        "tier": 2,
        "star": true,
        "easyEn": "to explain something in more detail"
      },
      {
        "cue": "(~을) 더 깊이 설명하다, 확장해 말하다",
        "model": "expand on [an idea]",
        "tier": 2,
        "star": true,
        "easyEn": "to say more about an idea"
      },
      {
        "cue": "(~에) 착수하다, 본격적으로 나서다",
        "model": "embark on [a new project / initiative]",
        "tier": 2,
        "star": true,
        "easyEn": "to start something new and important"
      },
      {
        "cue": "(~을) 토대로 발전시키다, 쌓아 올리다",
        "model": "build on [prior work / strengths]",
        "tier": 2,
        "star": true,
        "easyEn": "to use something as a base to develop more"
      },
      {
        "cue": "(~에 따라) 조치를 취하다, 실행에 옮기다",
        "model": "act on [feedback / a recommendation]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(~을) 되돌아보다, 성찰하다 — 자기소개 단골",
        "model": "reflect on [the experience / a failure]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(~에) 달려 있다, 전적으로 좌우되다",
        "model": "hinge on [a single factor / approval]",
        "tier": 2,
        "star": true,
        "easyEn": "depend completely on one thing"
      },
      {
        "cue": "(~에) 의견을 보태다, 한마디 거들다",
        "model": "weigh in on [a decision / the topic]",
        "tier": 2,
        "star": true,
        "easyEn": "give your opinion on something being discussed"
      },
      {
        "cue": "(~을) 깊이 파고들다, 파헤치다",
        "model": "delve into [the details / root causes]",
        "tier": 2,
        "star": true,
        "easyEn": "look at or study something in great detail."
      },
      {
        "cue": "(~을) 활용하다, 끌어다 쓰다",
        "model": "tap into [a market / hidden talent]",
        "tier": 2,
        "star": true,
        "easyEn": "start using a resource that is available"
      },
      {
        "cue": "(~을) 보완하다, 상쇄하다, 만회하다",
        "model": "compensate for [a weakness / lost time]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(~을) 옹호하다, 적극 대변·주장하다",
        "model": "advocate for [a policy / the user]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(~을) 택하다, ~쪽으로 가다",
        "model": "opt for [the safer option]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(~을) 감안하다, 여지를 두다",
        "model": "allow for [delays / a margin of error]",
        "tier": 2,
        "star": true,
        "easyEn": "leave enough time or room for something"
      },
      {
        "cue": "(~을) 보증하다, 장담하다",
        "model": "vouch for [a candidate / the results]",
        "tier": 2,
        "star": true,
        "easyEn": "say you are sure someone or something is good"
      },
      {
        "cue": "(~에) 대비하다, 마음의 각오를 하다",
        "model": "brace for [budget cuts / impact]",
        "tier": 2,
        "star": true,
        "easyEn": "get ready for something bad about to happen"
      },
      {
        "cue": "(Y 대신 X를) 쓰다, 대체하다 — 순서 주의(넣는 것 for 빼는 것)",
        "model": "substitute [X] for [Y]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(~을) 강력히 요구하다, 밀어붙이다",
        "model": "push for / press for [a raise / change]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(~에게) 보고하다, ~의 지휘를 받다 — 직속 관계 표현",
        "model": "answer to / report to [a manager]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(문제를 상부로) 보고·이관하다, 에스컬레이션하다",
        "model": "escalate [an issue] to [management]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(업무를 ~에게) 위임하다, 넘기다",
        "model": "delegate [tasks] to [team members]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(~와) 상관관계가 있다, 함께 움직이다",
        "model": "correlate with [performance / outcomes]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(~와) 시기가 겹치다, 동시에 일어나다",
        "model": "coincide with [the product launch]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(~에) 해당하다, 일치하다",
        "model": "correspond to [the figures / your records]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(~을 …와) 동일시하다, 같다고 보다",
        "model": "equate [X] with [Y]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(~을) 꺼리다, 피하려 하다",
        "model": "shy away from [conflict / hard conversations]",
        "tier": 2,
        "star": true,
        "easyEn": "avoid something because it feels hard or uncomfortable"
      },
      {
        "cue": "(~에서) 회복하다, 다시 일어서다",
        "model": "recover from [a setback]",
        "tier": 2,
        "star": true
      },
      {
        "cue": "(규칙·결정에) 따르다, 승복하다",
        "model": "abide by [the rules / a decision]",
        "tier": 3,
        "star": true,
        "easyEn": "accept and follow a rule or decision"
      },
      {
        "cue": "(지연을 외부 요인의) 탓으로 돌리다, ~ 때문으로 보다",
        "model": "ascribe [the delay] to [external factors]",
        "tier": 3,
        "star": true,
        "easyEn": "say something was caused by a particular thing"
      },
      {
        "cue": "(~을) 입증하다, 보증하듯 증언하다 — 추천서 표현",
        "model": "attest to [someone's skill / the quality]",
        "tier": 3,
        "star": true,
        "easyEn": "confirm or prove that something is true"
      },
      {
        "cue": "(~을) 넌지시 언급하다, 에둘러 가리키다",
        "model": "allude to [an issue / a previous point]",
        "tier": 3,
        "star": true,
        "easyEn": "mention something indirectly without saying it openly"
      },
      {
        "cue": "(~에) 관련되다, 해당하다 — 격식체",
        "model": "pertain to [the matter at hand]",
        "tier": 3,
        "star": true,
        "easyEn": "be related or connected to something"
      },
      {
        "cue": "(투표 등을) 기권하다, 삼가다",
        "model": "abstain from [a vote]",
        "tier": 3,
        "star": true,
        "easyEn": "choose not to do something, especially not to vote"
      },
      {
        "cue": "(~가 …하지 못하도록) 막다, 불가능하게 하다",
        "model": "preclude [someone] from [doing something]",
        "tier": 3,
        "star": true,
        "easyEn": "stop someone from being able to do something"
      },
      {
        "cue": "(이해관계자·타 팀과) 연락·협력하다 — 업무 메일 표현",
        "model": "liaise with [stakeholders / other teams]",
        "tier": 3,
        "star": true,
        "easyEn": "talk and work together with other people"
      },
      {
        "cue": "(~을) 생략하다, 없애다, 안 거치다",
        "model": "dispense with [formalities / the middleman]",
        "tier": 3,
        "star": true,
        "easyEn": "do without something or skip it"
      },
      {
        "cue": "(노력이 결국 ~로) 정점에 이르다, 귀결되다",
        "model": "culminate in [a successful launch]",
        "tier": 3,
        "star": true,
        "easyEn": "finally end with an important result"
      },
      {
        "cue": "(~을) 전제로 하다, ~에 기반을 두다",
        "model": "be predicated on [an assumption]",
        "tier": 3,
        "star": true,
        "easyEn": "be based on something being true"
      }
    ]
  }
];

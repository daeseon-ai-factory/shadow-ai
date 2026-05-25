/**
 * BYOAI (Bring Your Own AI) — 사용자가 본인의 ChatGPT / Claude.ai / Gemini /
 * Perplexity / 기타 도구로 직접 클립 분석을 보낼 수 있도록 하는 헬퍼.
 *
 * 동작:
 *   1. transcript + 우리 표준 분석 양식을 합쳐 prompt 문자열 생성
 *   2. 해당 AI 도구의 URL(쿼리에 prompt 끼움)을 새 탭으로 열기
 *   3. 동시에 prompt를 클립보드에 복사 — 도구가 쿼리를 무시해도 사용자가 Cmd+V 한 번이면 됨
 *
 * URL 쿼리 파라미터 지원은 도구마다 다름 (가끔 무시됨). 클립보드 fallback이 안전망.
 */

export type AiTool = "chatgpt" | "claude" | "gemini" | "perplexity" | "copy";

export interface AiToolMeta {
  id: AiTool;
  label: string;
  shortLabel: string;
  domain: string;
  /** URL builder. null이면 단순 클립보드 복사 모드. */
  buildUrl: ((prompt: string) => string) | null;
}

export const AI_TOOLS: AiToolMeta[] = [
  {
    id: "chatgpt",
    label: "ChatGPT (chat.openai.com)",
    shortLabel: "ChatGPT",
    domain: "openai.com",
    buildUrl: (p) => `https://chat.openai.com/?q=${encodeURIComponent(p)}`,
  },
  {
    id: "claude",
    label: "Claude (claude.ai)",
    shortLabel: "Claude.ai",
    domain: "claude.ai",
    buildUrl: (p) => `https://claude.ai/new?q=${encodeURIComponent(p)}`,
  },
  {
    id: "gemini",
    label: "Gemini (gemini.google.com)",
    shortLabel: "Gemini",
    domain: "google.com",
    buildUrl: (p) => `https://gemini.google.com/app?q=${encodeURIComponent(p)}`,
  },
  {
    id: "perplexity",
    label: "Perplexity",
    shortLabel: "Perplexity",
    domain: "perplexity.ai",
    buildUrl: (p) => `https://www.perplexity.ai/?q=${encodeURIComponent(p)}`,
  },
  {
    id: "copy",
    label: "프롬프트만 복사 (어디든 붙여넣기)",
    shortLabel: "복사만",
    domain: "",
    buildUrl: null,
  },
];

interface PromptInput {
  transcript: string;
  videoTitle?: string;
  channelName?: string | null;
  /** "ko" | "en" | "ja" | "zh" | "es". 모국어 글로스 언어. */
  nativeLanguage?: string;
}

/**
 * 분석 프롬프트 — 클립의 transcript를 둘러싼 우리 표준 요청 양식.
 * 외부 도구가 우리 인앱 Claude와 비슷한 모양의 답을 주도록 가이드.
 */
export function buildAnalysisPrompt(input: PromptInput): string {
  const nativeName = nativeLanguageDisplay(input.nativeLanguage ?? "ko");
  const titleLine = input.videoTitle
    ? `\n출처: "${input.videoTitle}"${input.channelName ? ` — ${input.channelName}` : ""}`
    : "";

  return `다음은 영어 영상에서 잘라낸 짧은 자막입니다. 영어 학습자(중급)를 위해 분석해주세요.

자막:
"""
${input.transcript}
"""${titleLine}

다음 4개 항목으로 답해주세요. 글로스/설명은 ${nativeName}로 짧게:

1. **문법 포인트** (최대 3개) — 모르고 지나치기 쉬운 구조만
2. **핵심 표현** — 학습자가 모를 만한 구문 (3~5개). 형식: phrase / 의미 / 사용 예
3. **어휘** — 알아둘 단어 (5~8개). 형식: 단어 / 의미 / 난이도(basic|intermediate|advanced)
4. **맥락 요약** — 1~2 문장으로 무엇을 말하는지

마크다운으로 답하세요. 너무 길게 늘이지 마세요.`;
}

function nativeLanguageDisplay(code: string): string {
  const map: Record<string, string> = {
    ko: "한국어",
    en: "English (1~2 word glosses)",
    ja: "日本語",
    zh: "中文",
    es: "español",
  };
  return map[code] ?? map.ko;
}

/** 사용자 마지막 선택을 localStorage에 기억. */
const STORAGE_KEY = "tubeshadow.byoai.lastTool";

export function loadPreferredTool(): AiTool {
  if (typeof window === "undefined") return "chatgpt";
  const saved = localStorage.getItem(STORAGE_KEY);
  return AI_TOOLS.some((t) => t.id === saved) ? (saved as AiTool) : "chatgpt";
}

export function savePreferredTool(tool: AiTool) {
  if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, tool);
}

/**
 * 실제 보내기. 클립보드 복사는 항상, URL 새 탭은 buildUrl 있을 때만.
 * 반환값: 사용자에게 보여줄 안내 메시지.
 */
export async function sendToExternalAi(
  tool: AiTool,
  prompt: string,
): Promise<{ opened: boolean; message: string }> {
  const meta = AI_TOOLS.find((t) => t.id === tool) ?? AI_TOOLS[0];

  // Copy first — most reliable fallback no matter what
  let copyOk = false;
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(prompt);
      copyOk = true;
    }
  } catch {
    copyOk = false;
  }

  if (!meta.buildUrl) {
    return {
      opened: false,
      message: copyOk
        ? "프롬프트 복사됨. 원하는 AI 도구에서 붙여넣기 (Cmd+V)"
        : "복사 실패 — 직접 텍스트를 복사해주세요",
    };
  }

  const url = meta.buildUrl(prompt);
  const win = window.open(url, "_blank", "noopener,noreferrer");
  const opened = !!win;

  const msg = opened
    ? copyOk
      ? `${meta.shortLabel} 새 탭 열림. 자동 입력 안 되면 Cmd+V (프롬프트 복사됨)`
      : `${meta.shortLabel} 새 탭 열림. 프롬프트는 직접 복사해주세요`
    : copyOk
      ? "팝업 차단 — 프롬프트는 복사됨. 사장님이 직접 도구 열어서 Cmd+V"
      : "팝업 차단 + 복사 실패 — 다시 시도해주세요";

  return { opened, message: msg };
}

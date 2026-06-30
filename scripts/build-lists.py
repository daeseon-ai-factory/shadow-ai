#!/usr/bin/env python3
"""Parse the four user-authored study lists in docs/ into typed, bundled TS datasets
in packages/core/src/. Deterministic parsing (no AI) so content integrity is exact.

  docs/english_pattern.md -> english-patterns.ts  (ENGLISH_PATTERNS)
  docs/phrase_500.md      -> phrasal-500.ts        (PHRASAL_500)
  docs/it_pattern.md      -> it-patterns.ts        (IT_PATTERNS)
  docs/it_term.md         -> it-terms.ts           (IT_TERMS)

Run from repo root:  python3 scripts/build-lists.py
"""
import re, json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS = os.path.join(ROOT, "docs")
SRC = os.path.join(ROOT, "packages", "core", "src")

HANGUL = re.compile(r"[가-힣㄰-㆏]")
def has_kr(s): return bool(HANGUL.search(s))
def debold(s): return s.replace("**", "").strip()


def parse_english_patterns(path):
    out, cat, frame = [], "", None
    for raw in open(path, encoding="utf-8"):
        line = raw.rstrip("\n")
        m = re.match(r"^##\s+(.*\S)\s*$", line)
        if m:
            cat = debold(m.group(1)); continue
        mf = re.match(r"^\s*\d+\.\s+(.*\S)\s*$", line)
        if mf and "**" in line:
            frame = debold(mf.group(1)); continue
        if frame is not None and line.strip():
            out.append({"category": cat, "frame": frame, "example": debold(line)})
            frame = None
    return out


def parse_phrasal_500(path):
    lines = [l.rstrip("\n") for l in open(path, encoding="utf-8")]
    # split into blocks delimited by lone-number lines
    blocks, cur = [], None
    for l in lines[1:]:  # skip title
        if re.match(r"^\d+\s*$", l.strip()):
            if cur: blocks.append(cur)
            cur = []
        elif cur is not None and l.strip():
            cur.append(l.strip())
    if cur: blocks.append(cur)
    def split_note(seg):
        # everything from the first ▶ onward is the note (▶ line + its wrapped continuation lines);
        # what comes before is real content (gloss / exampleKo). Returns (content_lines, note_lines).
        i = next((k for k, x in enumerate(seg) if x.startswith("▶")), None)
        return (seg, []) if i is None else (seg[:i], seg[i:])

    out = []
    for b in blocks:
        if not b: continue
        phrasal = b[0]
        rest = b[1:]
        # Anchor on the English example line (Latin letters, no Hangul); Korean before it is the gloss,
        # Korean after it is the example's translation. This survives ▶ notes that wrap to a 2nd line.
        ex_idx = next((k for k, x in enumerate(rest) if re.search(r"[A-Za-z]", x) and not has_kr(x)), None)
        example = rest[ex_idx] if ex_idx is not None else ""
        before = rest[:ex_idx] if ex_idx is not None else rest
        after = rest[ex_idx + 1:] if ex_idx is not None else []
        b_main, b_note = split_note(before)
        a_main, a_note = split_note(after)
        gloss = next((x for x in b_main if has_kr(x)), "")
        example_ko = next((x for x in a_main if has_kr(x)), "")
        note = " ".join(x.lstrip("▶").strip() for x in (b_note + a_note)).strip()
        out.append({"phrasal": phrasal, "ko": gloss, "note": note,
                    "example": example, "exampleKo": example_ko})
    return out


def parse_it_patterns(path):
    out, cat = [], ""
    started = False
    for raw in open(path, encoding="utf-8"):
        line = raw.rstrip("\n")
        if re.match(r"^#\s+", line):
            started = True
            cat = debold(re.sub(r"^#\s+", "", line)); continue
        if re.match(r"^##\s+", line):
            cat = debold(re.sub(r"^##\s+", "", line)); continue
        if not started:
            continue
        m = re.match(r"^\*\s+(.*?)\s+—\s+(.*\S)\s*$", line)  # * **en** — ko
        if m:
            out.append({"category": cat, "en": debold(m.group(1)), "ko": m.group(2).strip()})
    return out


def parse_it_terms(path):
    out, section = [], ""
    for raw in open(path, encoding="utf-8"):
        line = raw.rstrip("\n")
        if not line.strip():
            continue
        if "\t" in line:
            en, ko = line.split("\t", 1)
            en, ko = en.strip(), ko.strip()
            if en == "표현" and ko == "뜻":  # 표현 / 뜻 header
                continue
            if not en or not ko:
                continue
            out.append({"section": section, "en": en, "ko": ko})
        else:
            # section title (e.g. "2. 코드 구조/리딩 용어"); skip prose/examples
            if re.match(r"^\d*\.\s*\S", line) or (len(line) < 40 and not line.endswith((".", "다", "요"))):
                section = line.strip().lstrip(". ").strip() or section
    return out


def emit(path, banner, iface, const, rows):
    body = json.dumps(rows, ensure_ascii=False, indent=2)
    with open(path, "w", encoding="utf-8") as f:
        f.write(banner + iface + f"\nexport const {const} = " + body + ";\n")
    return len(rows)


def main():
    ep = parse_english_patterns(os.path.join(DOCS, "english_pattern.md"))
    p5 = parse_phrasal_500(os.path.join(DOCS, "phrase_500.md"))
    itp = parse_it_patterns(os.path.join(DOCS, "it_pattern.md"))
    itt = parse_it_terms(os.path.join(DOCS, "it_term.md"))

    head = lambda src, n, extra: (
        f"// AUTO-GENERATED from docs/{src} — DO NOT EDIT BY HAND.\n"
        f"// Regenerate: python3 scripts/build-lists.py\n// {n} entries. {extra}\n\n")

    n1 = emit(os.path.join(SRC, "english-patterns.ts"),
        head("english_pattern.md", len(ep), "Daily speaking sentence frames + an English example."),
        "export interface EnglishPattern {\n  category: string;\n  frame: string; // the pattern frame (KR/EN label)\n  example: string; // one English example of the frame\n}\n",
        "ENGLISH_PATTERNS: EnglishPattern[]", ep)

    n2 = emit(os.path.join(SRC, "phrasal-500.ts"),
        head("phrase_500.md", len(p5), "Conversational phrasal verbs: phrasal + Korean gloss + example."),
        "export interface Phrasal500Item {\n  phrasal: string;\n  ko: string; // Korean gloss\n  note: string; // nuance note (Korean), may be empty\n  example: string; // English example sentence\n  exampleKo: string; // Korean translation of the example, may be empty\n}\n",
        "PHRASAL_500: Phrasal500Item[]", p5)

    n3 = emit(os.path.join(SRC, "it-patterns.ts"),
        head("it_pattern.md", len(itp), "IT interview/work English chunks: English + Korean, by category."),
        "export interface ItPattern {\n  category: string;\n  en: string; // the English chunk\n  ko: string; // Korean meaning\n}\n",
        "IT_PATTERNS: ItPattern[]", itp)

    n4 = emit(os.path.join(SRC, "it-terms.ts"),
        head("it_term.md", len(itt), "Code-explanation expressions/terms: English + Korean, by section."),
        "export interface ItTerm {\n  section: string;\n  en: string; // English term/expression\n  ko: string; // Korean meaning\n}\n",
        "IT_TERMS: ItTerm[]", itt)

    print(f"english-patterns.ts : {n1}")
    print(f"phrasal-500.ts      : {n2}")
    print(f"it-patterns.ts      : {n3}")
    print(f"it-terms.ts         : {n4}")
    print(f"TOTAL               : {n1+n2+n3+n4}")


if __name__ == "__main__":
    main()

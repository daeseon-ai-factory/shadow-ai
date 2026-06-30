#!/usr/bin/env python3
"""Generate packages/core/src/particles.ts (particle/feel overlay for the verb pack).

Inputs (both committed, so this is reproducible without re-running the AI workflow):
  - scripts/data/particle-classifications.json  (per-entry particle/sense/transparent + verify fixes)
  - packages/core/src/phrasal-verbs.ts          (for gid->group.id and item alignment)

The overlay is keyed by the SAME card key as phrasal-verbs.ts (`pv:<id>#<index>`), so it
sits on top of the content without touching it. Powers the 'feel' hook (mode A) and the
particle-family drill / feel-map (mode C).

Run from repo root:  python3 scripts/build-particles.py
"""
import json, os
from collections import defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CLS = os.path.join(ROOT, "scripts", "data", "particle-classifications.json")
PV = os.path.join(ROOT, "packages", "core", "src", "phrasal-verbs.ts")
OUT = os.path.join(ROOT, "packages", "core", "src", "particles.ts")


def load_groups(pv_path):
    txt = open(pv_path, encoding="utf-8").read()
    mark = "VERB_PACK: VerbGroup[] = "
    js = txt[txt.index(mark) + len(mark):].rstrip()
    if js.endswith(";"):
        js = js[:-1]
    # the const is followed by other exports; cut at the array's matching close
    depth = 0
    for i, ch in enumerate(js):
        if ch == "[":
            depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0:
                js = js[: i + 1]
                break
    return json.loads(js)  # list of groups; gid == array index


def main():
    data = json.load(open(CLS))
    cls, fixes = data["classifications"], data.get("fixes", [])
    groups = load_groups(PV)
    gid2id = {i: g["id"] for i, g in enumerate(groups)}

    info = {}
    for c in cls:
        info[(c["gid"], c["idx"])] = {
            "particle": c["particle"], "particleType": c["particleType"],
            "sense": c["sense"], "transparent": c["transparent"],
        }
    for f in fixes:
        k = (f["gid"], f["idx"])
        if k in info:
            info[k]["particle"] = f["particle"]
            info[k]["sense"] = f["sense"]
            info[k]["transparent"] = f["transparent"]

    PINFO, index = {}, defaultdict(list)
    for (gid, idx), v in info.items():
        slug = gid2id.get(gid)
        if slug is None:
            continue
        key = "pv:" + slug + "#" + str(idx)
        PINFO[key] = v
        if v["particleType"] == "adverb" and v["particle"]:
            index[v["particle"]].append(key)
    index_sorted = {p: index[p] for p, _ in sorted(index.items(), key=lambda kv: -len(kv[1]))}

    adverb = sum(1 for v in PINFO.values() if v["particleType"] == "adverb")
    prep = sum(1 for v in PINFO.values() if v["particleType"] == "prep")
    none = sum(1 for v in PINFO.values() if v["particleType"] == "none")
    transp = sum(1 for v in PINFO.values() if v["transparent"])

    banner = (
        "// AUTO-GENERATED particle overlay for the verb pack — DO NOT EDIT BY HAND.\n"
        "// Regenerate: python3 scripts/build-particles.py\n"
        "// Source: scripts/data/particle-classifications.json + phrasal-verbs.ts.\n"
        "// Keyed by the SAME card key as phrasal-verbs.ts (verbKey: `pv:<id>#<index>`), so it\n"
        "// overlays the content without touching it. Powers the 'feel' hook (mode A) and the\n"
        "// particle-family drill / feel-map (mode C).\n"
        "//\n"
        f"// {len(PINFO)} entries tagged: adverb(spatial feel) {adverb} / prep {prep} / none {none}; transparent {transp}.\n"
        f"// {len(index_sorted)} adverb-particle families (up, out, off, down, over, through, back, away, into, on, around...).\n"
        "// NOTE: per-entry `sense` labels are not yet globally canonicalized; particle + transparent\n"
        "// + family membership ARE reliable. Canonicalize senses before shipping the feel-map (mode C).\n\n"
    )
    types = (
        'export type ParticleType = "adverb" | "prep" | "none";\n\n'
        "export interface ParticleInfo {\n"
        '  particle: string; // up/off/out/... (adverb) or the governing preposition (prep), "" if none\n'
        "  particleType: ParticleType;\n"
        "  sense: string; // short feel tag for this particle here (not yet globally normalized)\n"
        "  transparent: boolean; // true = particle logic explains the meaning; false = idiomatic\n"
        "}\n\n"
        "// cardKey (pv:<id>#<index>) -> particle classification\n"
        "export const PARTICLE_INFO: Record<string, ParticleInfo> = "
    )
    families = (
        "\n\n// adverb particle -> cardKeys sharing that particle (the 'feel' families, biggest first).\n"
        '// Use for the sibling hook ("UP family: wrap up, use up, fill up...") and the particle drill.\n'
        "export const PARTICLE_FAMILIES: Record<string, string[]> = "
    )
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(banner + types + json.dumps(PINFO, ensure_ascii=False, indent=2) + ";")
        f.write(families + json.dumps(index_sorted, ensure_ascii=False, indent=2) + ";\n")
    print("wrote", OUT)
    print(f"entries {len(PINFO)} | adverb families {len(index_sorted)} | adverb {adverb} prep {prep} none {none} | transparent {transp}")


if __name__ == "__main__":
    main()

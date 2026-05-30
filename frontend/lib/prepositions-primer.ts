// Curated core-preposition primer for the study page. English + an animated diagram only —
// no Korean. The picture carries the spatial meaning; the gloss + examples are English so you
// learn the preposition the way you'll use it. `key` joins against the user's mined notes and
// selects the diagram in <PrepositionDiagram />.

export interface PrimerPreposition {
  key: string; // lowercase match key + diagram selector
  prep: string; // display form
  gloss: string; // short English sense
  examples: string[]; // English examples
}

export const PREPOSITION_PRIMER: PrimerPreposition[] = [
  { key: "in", prep: "in", gloss: "inside an enclosed space", examples: ["in the room", "in two hours"] },
  { key: "on", prep: "on", gloss: "touching a surface", examples: ["on the table", "on Monday"] },
  { key: "at", prep: "at", gloss: "at a single point", examples: ["at the door", "at 3 p.m."] },
  { key: "to", prep: "to", gloss: "toward a destination", examples: ["go to work", "give it to me"] },
  { key: "into", prep: "into", gloss: "entering — often becoming", examples: ["walk into the room", "refactor it into modules"] },
  { key: "out of", prep: "out of", gloss: "from inside to outside", examples: ["get out of the car", "made out of wood"] },
  { key: "through", prep: "through", gloss: "in one side, out the other", examples: ["walk through the door", "go through the code"] },
  { key: "over", prep: "over", gloss: "above, arcing across", examples: ["jump over the wall", "talk over coffee"] },
  { key: "off", prep: "off", gloss: "away from a surface", examples: ["take it off the table", "live off savings"] },
  { key: "up", prep: "up", gloss: "upward / completely", examples: ["spin up a server", "eat it up"] },
  { key: "down", prep: "down", gloss: "downward", examples: ["write it down", "calm down"] },
  { key: "for", prep: "for", gloss: "toward a purpose", examples: ["a gift for you", "wait for the build"] },
  { key: "with", prep: "with", gloss: "together / using", examples: ["come with me", "cut it with a knife"] },
  { key: "from", prep: "from", gloss: "away from a source", examples: ["from Seoul", "learn from mistakes"] },
  { key: "by", prep: "by", gloss: "right beside / by means of", examples: ["by the window", "fix it by Friday"] },
  { key: "about", prep: "about", gloss: "around a topic", examples: ["talk about it", "about ten people"] },
  { key: "under", prep: "under", gloss: "below", examples: ["under the desk", "under pressure"] },
];

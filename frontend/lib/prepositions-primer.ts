// Curated core-preposition primer. Each preposition has its real, well-established senses
// (standard ESL / cognitive-linguistics meanings — not invented). A sense gets a diagram
// ONLY when the diagram honestly depicts it; abstract senses (e.g. "about" = roughly,
// "on" = concerning) carry no picture rather than a forced one. English only.

export interface PrimerSense {
  label: string; // short English sense
  example: string; // real, idiomatic English example
  diagram?: string; // PrepositionDiagram archetype, omitted when no honest picture fits
}

export interface PrimerPreposition {
  key: string; // lowercase match key (joins mined notes)
  prep: string;
  senses: PrimerSense[];
}

export const PREPOSITION_PRIMER: PrimerPreposition[] = [
  {
    key: "in",
    prep: "in",
    senses: [
      { label: "inside an enclosed space", example: "in the room", diagram: "inside" },
      { label: "within a period of time", example: "in two hours", diagram: "inside" },
    ],
  },
  {
    key: "on",
    prep: "on",
    senses: [
      { label: "touching a surface", example: "on the table", diagram: "surface" },
      { label: "on a day or date", example: "on Monday", diagram: "surface" },
      { label: "about / concerning", example: "a book on AI" },
    ],
  },
  {
    key: "at",
    prep: "at",
    senses: [
      { label: "at a precise place", example: "at the door", diagram: "point" },
      { label: "at a precise time", example: "at 3 p.m.", diagram: "point" },
    ],
  },
  {
    key: "to",
    prep: "to",
    senses: [
      { label: "toward a destination", example: "go to work", diagram: "toward" },
      { label: "to a recipient", example: "give it to me", diagram: "toward" },
    ],
  },
  {
    key: "into",
    prep: "into",
    senses: [
      { label: "entering a space", example: "walk into the room", diagram: "enter" },
      { label: "changing / becoming", example: "turn notes into code", diagram: "enter" },
    ],
  },
  {
    key: "out of",
    prep: "out of",
    senses: [
      { label: "from inside to outside", example: "get out of the car", diagram: "exit" },
      { label: "made from a material", example: "made out of wood", diagram: "leaveSource" },
    ],
  },
  {
    key: "through",
    prep: "through",
    senses: [
      { label: "in one side, out the other", example: "walk through the door", diagram: "through" },
      { label: "from start to finish", example: "go through the code", diagram: "through" },
    ],
  },
  {
    key: "over",
    prep: "over",
    senses: [
      { label: "above, arcing across", example: "jump over the wall", diagram: "arcOver" },
      { label: "covering", example: "a blanket over the bed", diagram: "cover" },
      { label: "more than", example: "over 100 people", diagram: "moreThan" },
    ],
  },
  {
    key: "under",
    prep: "under",
    senses: [
      { label: "below", example: "under the desk", diagram: "below" },
      { label: "less than", example: "under $100", diagram: "lessThan" },
      { label: "subject to", example: "under pressure" },
    ],
  },
  {
    key: "off",
    prep: "off",
    senses: [
      { label: "away from a surface", example: "take it off the table", diagram: "awayOff" },
      { label: "stopped / not on", example: "turn off the light" },
    ],
  },
  {
    key: "up",
    prep: "up",
    senses: [
      { label: "to a higher position", example: "pick it up", diagram: "upward" },
      { label: "increasing", example: "turn the volume up", diagram: "upward" },
    ],
  },
  {
    key: "down",
    prep: "down",
    senses: [
      { label: "to a lower position", example: "sit down", diagram: "downward" },
      { label: "decreasing", example: "turn it down", diagram: "downward" },
    ],
  },
  {
    key: "across",
    prep: "across",
    senses: [
      { label: "to the other side", example: "walk across the street", diagram: "across" },
    ],
  },
  {
    key: "from",
    prep: "from",
    senses: [
      { label: "starting at a source", example: "from Seoul", diagram: "leaveSource" },
      { label: "the source of something", example: "learn from mistakes", diagram: "leaveSource" },
    ],
  },
  {
    key: "for",
    prep: "for",
    senses: [
      { label: "intended for someone", example: "a gift for you", diagram: "toward" },
      { label: "for a length of time", example: "for three days", diagram: "span" },
    ],
  },
  {
    key: "with",
    prep: "with",
    senses: [
      { label: "together / accompanying", example: "come with me", diagram: "together" },
      { label: "using (an instrument)", example: "cut it with a knife", diagram: "tool" },
    ],
  },
  {
    key: "by",
    prep: "by",
    senses: [
      { label: "right beside", example: "by the window", diagram: "beside" },
      { label: "by means of", example: "by car" },
      { label: "no later than", example: "finish by Friday" },
    ],
  },
  {
    key: "about",
    prep: "about",
    senses: [
      { label: "concerning a topic", example: "a talk about AI", diagram: "orbit" },
      { label: "approximately", example: "about ten people" },
    ],
  },
];

// Animated SVG diagrams for prepositions — taught by spatial relationship, no words.
// A reference "box" + a moving "ball" (and arrows/markers) show what each preposition means.
// SMIL animations loop gently so the relationship is felt, not read. Theme-aware via Tailwind
// fill/stroke utilities.

const VB = "0 0 120 84";

function Box() {
  return <rect x={46} y={30} width={40} height={30} rx={4} className="fill-primary/10 stroke-primary/40" strokeWidth={1.5} />;
}

function Ball({ cx, cy, pulse = false }: { cx: number; cy: number; pulse?: boolean }) {
  return (
    <circle cx={cx} cy={cy} r={7} className="fill-primary">
      {pulse && <animate attributeName="r" values="7;8;7" dur="2.2s" repeatCount="indefinite" />}
    </circle>
  );
}

function MotionBall({ path, dur = "2.8s" }: { path: string; dur?: string }) {
  return (
    <circle cx={0} cy={0} r={7} className="fill-primary">
      <animateMotion path={path} dur={dur} repeatCount="indefinite" rotate="0" />
    </circle>
  );
}

function Marker({ x, y }: { x: number; y: number }) {
  // a hollow target ring
  return <circle cx={x} cy={y} r={9} className="fill-none stroke-primary/50" strokeWidth={1.5} strokeDasharray="3 2" />;
}

function GroundLine() {
  return <line x1={8} y1={64} x2={112} y2={64} className="stroke-primary/30" strokeWidth={1.5} />;
}

/** Returns the inner SVG content for a preposition key. */
function content(k: string) {
  switch (k) {
    case "in":
      return (<>{Box()}<Ball cx={66} cy={45} pulse /></>);
    case "on":
      return (<>{Box()}<Ball cx={66} cy={22} pulse /></>);
    case "at":
      return (<>
        <line x1={56} y1={45} x2={76} y2={45} className="stroke-primary/50" strokeWidth={1.5} />
        <line x1={66} y1={35} x2={66} y2={55} className="stroke-primary/50" strokeWidth={1.5} />
        <Ball cx={66} cy={45} pulse />
      </>);
    case "by":
      return (<>{Box()}<Ball cx={98} cy={45} pulse /></>);
    case "under":
      return (<>{Box()}<Ball cx={66} cy={70} pulse /></>);
    case "to":
      return (<>{Marker({ x: 98, y: 45 })}<MotionBall path="M14,45 L86,45" /></>);
    case "for":
      return (<>
        {/* a goal/benefit target */}
        <path d="M98 40 l3 5 l-3 5 l-3 -5 z" className="fill-primary/60" />
        <MotionBall path="M14,45 L86,45" />
      </>);
    case "from":
      return (<>{Marker({ x: 14, y: 45 })}<MotionBall path="M22,45 L112,45" /></>);
    case "into":
      return (<>{Box()}<MotionBall path="M8,45 L66,45" /></>);
    case "out of":
      return (<>{Box()}<MotionBall path="M66,45 L114,45" /></>);
    case "through":
      return (<>{Box()}<MotionBall path="M6,45 L116,45" /></>);
    case "over":
      return (<>{Box()}<MotionBall path="M8,58 Q66,2 114,58" dur="3s" /></>);
    case "off":
      return (<>{Box()}<MotionBall path="M66,23 L106,6" /></>);
    case "up":
      return (<>
        <line x1={66} y1={78} x2={66} y2={12} className="stroke-primary/30" strokeWidth={1.5} />
        <MotionBall path="M66,78 L66,12" dur="2.4s" />
      </>);
    case "down":
      return (<>
        <line x1={66} y1={10} x2={66} y2={76} className="stroke-primary/30" strokeWidth={1.5} />
        <MotionBall path="M66,10 L66,76" dur="2.4s" />
      </>);
    case "across":
      return (<>{GroundLine()}<MotionBall path="M12,55 L108,55" /></>);
    case "about":
      return (<>{Box()}<MotionBall path="M66,15 A 32 28 0 1 1 65.9 15" dur="4s" /></>);
    case "with":
      return (<>
        <circle cx={58} cy={45} r={7} className="fill-primary"><animate attributeName="cy" values="45;42;45" dur="2.2s" repeatCount="indefinite" /></circle>
        <circle cx={74} cy={45} r={7} className="fill-primary/60"><animate attributeName="cy" values="45;42;45" dur="2.2s" repeatCount="indefinite" /></circle>
      </>);
    default:
      return (<>{Box()}<Ball cx={66} cy={45} /></>);
  }
}

export function PrepositionDiagram({ prepKey, className }: { prepKey: string; className?: string }) {
  return (
    <svg viewBox={VB} className={className} role="img" aria-label={`${prepKey} diagram`} preserveAspectRatio="xMidYMid meet">
      {content(prepKey)}
    </svg>
  );
}

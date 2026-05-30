// Animated SVG diagrams for preposition SENSES — taught by spatial relationship, no words.
// Each "sense" of a preposition picks a diagram archetype below. A muted box/line is the
// ground; a primary ball is the figure. Motion paths get a faint dashed guide + an arrowhead
// so the relationship reads even between loops; motion eases so it feels calm, not frantic.

const VB = "0 0 120 84";
const EASE = "0.42 0 0.58 1";

function Box() {
  return <rect x={44} y={30} width={44} height={30} rx={5} className="fill-primary/10 stroke-primary/40" strokeWidth={1.5} />;
}

function Ball({ cx, cy, r = 7, dim = false, pulse = false }: { cx: number; cy: number; r?: number; dim?: boolean; pulse?: boolean }) {
  return (
    <circle cx={cx} cy={cy} r={r} className={dim ? "fill-primary/40" : "fill-primary"}>
      {pulse && <animate attributeName="r" values={`${r};${r + 1};${r}`} dur="2.4s" repeatCount="indefinite" />}
    </circle>
  );
}

/** A moving ball along `path`, with a faint dashed guide + arrowhead so the motion is legible. */
function Motion({ path, dur = "3s" }: { path: string; dur?: string }) {
  return (
    <>
      <path d={path} fill="none" className="stroke-primary/25" strokeWidth={1.25} strokeDasharray="2 3" markerEnd="url(#pp-arrow)" />
      <circle cx={0} cy={0} r={7} className="fill-primary">
        <animateMotion path={path} dur={dur} repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines={EASE} />
      </circle>
    </>
  );
}

function content(d: string) {
  switch (d) {
    case "inside":
      return (<>{Box()}<Ball cx={66} cy={45} pulse /></>);
    case "surface":
      return (<>{Box()}<Ball cx={66} cy={23} pulse /></>);
    case "below":
      return (<>{Box()}<Ball cx={66} cy={71} pulse /></>);
    case "beside":
      return (<>{Box()}<Ball cx={100} cy={45} pulse /></>);
    case "point":
      return (<>
        <line x1={55} y1={45} x2={77} y2={45} className="stroke-primary/45" strokeWidth={1.5} />
        <line x1={66} y1={34} x2={66} y2={56} className="stroke-primary/45" strokeWidth={1.5} />
        <Ball cx={66} cy={45} r={6} pulse />
      </>);
    case "toward":
      return (<><circle cx={98} cy={45} r={10} className="fill-none stroke-primary/45" strokeWidth={1.5} strokeDasharray="3 2" /><Motion path="M14,45 L86,45" /></>);
    case "leaveSource":
      return (<><circle cx={14} cy={45} r={4} className="fill-primary/50" /><Motion path="M24,45 L112,45" /></>);
    case "enter":
      return (<>{Box()}<Motion path="M8,45 L66,45" /></>);
    case "exit":
      return (<>{Box()}<Motion path="M66,45 L114,45" /></>);
    case "through":
      return (<>{Box()}<Motion path="M6,45 L116,45" /></>);
    case "arcOver":
      return (<>{Box()}<Motion path="M8,58 Q66,0 114,58" dur="3.2s" /></>);
    case "cover":
      return (<>
        {Box()}
        <rect x={42} y={6} width={48} height={9} rx={3} className="fill-primary/70">
          <animate attributeName="y" values="6;22;22;6" keyTimes="0;0.45;0.8;1" dur="3.2s" repeatCount="indefinite" calcMode="spline" keySplines={`${EASE};0 0 1 1;${EASE}`} />
        </rect>
      </>);
    case "across":
      return (<><line x1={6} y1={62} x2={114} y2={62} className="stroke-primary/35" strokeWidth={1.5} /><Motion path="M12,53 L108,53" /></>);
    case "awayOff":
      return (<>{Box()}<Motion path="M66,23 L104,7" /></>);
    case "upward":
      return (<><line x1={66} y1={78} x2={66} y2={10} className="stroke-primary/25" strokeWidth={1.5} /><Motion path="M66,78 L66,12" dur="2.6s" /></>);
    case "downward":
      return (<><line x1={66} y1={8} x2={66} y2={76} className="stroke-primary/25" strokeWidth={1.5} /><Motion path="M66,10 L66,76" dur="2.6s" /></>);
    case "orbit":
      return (<>{Box()}<Motion path="M66,14 A 33 28 0 1 1 65.9 14" dur="4.5s" /></>);
    case "together":
      return (<>
        <circle cx={58} cy={45} r={7} className="fill-primary"><animate attributeName="cy" values="45;41;45" dur="2.4s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines={`${EASE};${EASE}`} /></circle>
        <circle cx={74} cy={45} r={7} className="fill-primary/55"><animate attributeName="cy" values="45;41;45" dur="2.4s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines={`${EASE};${EASE}`} /></circle>
      </>);
    case "tool":
      return (<>
        <circle cx={92} cy={45} r={8} className="fill-primary/30 stroke-primary/40" strokeWidth={1.5} />
        <rect x={10} y={42} width={26} height={6} rx={3} className="fill-primary">
          <animateTransform attributeName="transform" type="translate" values="0 0;44 0;0 0" keyTimes="0;0.5;1" dur="2.4s" repeatCount="indefinite" calcMode="spline" keySplines={`${EASE};${EASE}`} />
        </rect>
      </>);
    case "moreThan":
      return (<>
        <line x1={10} y1={50} x2={110} y2={50} className="stroke-primary/40" strokeWidth={1.5} strokeDasharray="4 3" />
        <rect x={50} width={20} rx={2} className="fill-primary">
          <animate attributeName="y" values="62;22" dur="2.6s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines={EASE} />
          <animate attributeName="height" values="0;40" dur="2.6s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines={EASE} />
        </rect>
      </>);
    case "lessThan":
      return (<>
        <line x1={10} y1={34} x2={110} y2={34} className="stroke-primary/40" strokeWidth={1.5} strokeDasharray="4 3" />
        <rect x={50} y={42} width={20} rx={2} className="fill-primary">
          <animate attributeName="height" values="0;20" dur="2.6s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines={EASE} />
          <animate attributeName="y" values="62;42" dur="2.6s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines={EASE} />
        </rect>
      </>);
    case "span":
      return (<>
        <line x1={16} y1={30} x2={16} y2={60} className="stroke-primary/40" strokeWidth={1.5} />
        <line x1={104} y1={30} x2={104} y2={60} className="stroke-primary/40" strokeWidth={1.5} />
        <Motion path="M16,45 L104,45" dur="3s" />
      </>);
    default:
      return (<>{Box()}<Ball cx={66} cy={45} /></>);
  }
}

export function PrepositionDiagram({ diagram, className }: { diagram: string; className?: string }) {
  return (
    <svg viewBox={VB} className={className} role="img" aria-label={`${diagram} diagram`} preserveAspectRatio="xMidYMid meet">
      <defs>
        <marker id="pp-arrow" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={6} markerHeight={6} orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" className="fill-primary/60" />
        </marker>
      </defs>
      {content(diagram)}
    </svg>
  );
}

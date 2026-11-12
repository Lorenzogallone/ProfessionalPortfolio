// One graphic motif per project, drawn in SVG. Each comes in two sizes:
// "card" (behind the screens on the home page) and "header" (case-study header).
// Lines marked .draw trace themselves when their data-reveal parent comes on screen;
// SVGs marked data-smil run on hover (cards) or on their own (headers), see Effects.tsx.

type Variant = "card" | "header";

/* ------------------------------------------------------------------ */
/* Zitto e Corri: heart rate and pace of an interval run.             */
/* ------------------------------------------------------------------ */

// A deterministic interval session: warm-up, five reps, cool-down.
function effort(x: number) {
  const warm = Math.min(1, x / 0.18);
  const cool = x > 0.86 ? Math.max(0, 1 - (x - 0.86) / 0.14) : 1;
  const inReps = x > 0.22 && x < 0.84;
  const phase = ((x - 0.22) / 0.62) * 5;
  const rep = inReps ? Math.max(0, Math.sin((phase % 1) * Math.PI)) ** 0.6 : 0;
  return 0.45 * warm * cool + 0.45 * rep * cool + 0.06;
}

function tracePath(width: number, height: number, top: number, amp: number, jitter: number, lag = 0) {
  const pts: string[] = [];
  const n = 120;
  for (let i = 0; i <= n; i++) {
    const x = i / n;
    const e = effort(Math.max(0, x - lag));
    const noise = Math.sin(i * 1.9) * jitter + Math.sin(i * 0.7 + 1) * jitter * 0.6;
    const y = top + height - e * amp + noise;
    pts.push(`${i === 0 ? "M" : "L"}${(x * width).toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

export function PaceTrace({ variant }: { variant: Variant }) {
  const W = 600;
  const H = 300;
  const hr = tracePath(W, 230, 30, 190, 2.4);
  const pace = tracePath(W, 230, 60, 120, 1.2, 0.012);
  const zones = [70, 110, 150, 190, 230];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
      data-smil={variant === "card" ? "hover" : "auto"}
      aria-hidden
    >
      <defs></defs>
      {/* Heart-rate zones, warmer towards the top. */}
      {zones.map((y, i) => (
        <rect key={y} x="0" y={y - 40} width={W} height="40" fill="#ff6a3d" fillOpacity={0.075 - i * 0.014} />
      ))}
      <g stroke="#ece2d3" strokeOpacity="0.07">
        {Array.from({ length: 11 }, (_, i) => (
          <line key={i} x1={i * 60} x2={i * 60} y1="0" y2={H} />
        ))}
      </g>
      <path
        d={pace}
        fill="none"
        stroke="#8fb3c9"
        strokeOpacity="0.7"
        strokeWidth="1.4"
        pathLength={1}
        className={variant === "card" ? "draw" : "draw-now"}
        style={{ ["--dd" as string]: "0.55s" }}
      />
      <path
        id={`hr-line-${variant}`}
        d={hr}
        fill="none"
        stroke="#ff6a3d"
        strokeWidth="2.2"
        strokeLinejoin="round"
        pathLength={1}
        className={variant === "card" ? "draw" : "draw-now"}
      />
      <g
        className={`motion-only trace-dot ${variant === "card" ? "opacity-0 transition-opacity duration-300 group-hover:opacity-100" : ""}`}
      >
        <circle r="4.5" fill="#ff6a3d" stroke="#16130f" strokeWidth="2" />
        <animateMotion dur={variant === "card" ? "3.2s" : "9s"} repeatCount="indefinite">
          <mpath href={`#hr-line-${variant}`} />
        </animateMotion>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Fanta F1: a circuit with a car on it.                              */
/* ------------------------------------------------------------------ */

// An invented circuit: main straight, a hairpin, a chicane, a long back straight.
const TRACK =
  "M90 218 L300 218 C362 218 372 152 322 142 L222 122 C190 116 196 82 232 76 L300 64 C352 56 348 22 300 24 L118 38 C56 44 40 104 76 124 C116 148 22 204 90 218 Z";

export function Circuit({ variant }: { variant: Variant }) {
  const header = variant === "header";
  return (
    <svg
      viewBox="0 0 400 250"
      className={header ? "w-full" : "absolute inset-x-0 top-4 mx-auto h-[85%] w-full"}
      preserveAspectRatio="xMidYMid meet"
      data-smil={header ? "auto" : "hover"}
      aria-hidden
    >
      <defs>
        <pattern id={`chk-${variant}`} width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill="#16130f" />
          <rect width="2" height="2" fill="#ece2d3" />
          <rect x="2" y="2" width="2" height="2" fill="#ece2d3" />
        </pattern>
      </defs>
      {/* Kerbs: alternating signal and sand along both edges. */}
      <path d={TRACK} fill="none" stroke="#ece2d3" strokeOpacity="0.55" strokeWidth="17" strokeLinejoin="round" />
      <path d={TRACK} fill="none" stroke="#ff6a3d" strokeWidth="17" strokeDasharray="5 5" strokeLinejoin="round" />
      <path d={TRACK} fill="none" stroke="#29241d" strokeWidth="13" strokeLinejoin="round" />
      <path d={TRACK} fill="none" stroke="#ece2d3" strokeOpacity="0.12" strokeWidth="0.8" strokeDasharray="6 7" />
      {/* The racing line traces itself on reveal. */}
      <path
        id={`track-${variant}`}
        d={TRACK}
        fill="none"
        stroke="#ffb38a"
        strokeWidth="1.4"
        strokeOpacity="0.8"
        pathLength={1}
        className={variant === "card" ? "draw" : "draw-now"}
      />
      <rect x="112" y="211" width="8" height="14" fill={`url(#chk-${variant})`} />
      <g>
        <rect x="-14" y="-1.2" width="14" height="2.4" rx="1.2" fill="#ffb38a" opacity="0.5" />
        <rect x="-6" y="-3.2" width="12" height="6.4" rx="2.2" fill="#ff6a3d" />
        <rect x="1" y="-1.6" width="3" height="3.2" rx="1" fill="#16130f" />
        <animateMotion
          dur={header ? "7s" : "3.4s"}
          repeatCount="indefinite"
          rotate="auto"
          keyPoints="0;1"
          keyTimes="0;1"
          calcMode="linear"
        >
          <mpath href={`#track-${variant}`} />
        </animateMotion>
      </g>
    </svg>
  );
}

export function SpeedStreaks() {
  const streaks = [
    { top: "18%", w: "38%", d: "0ms" },
    { top: "34%", w: "24%", d: "260ms" },
    { top: "52%", w: "44%", d: "120ms" },
    { top: "68%", w: "30%", d: "420ms" },
    { top: "80%", w: "20%", d: "640ms" },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {streaks.map((s) => (
        <span
          key={s.top}
          className="streak absolute right-0 h-px bg-ember/50"
          style={{ top: s.top, width: s.w, ["--d" as string]: s.d }}
        />
      ))}
    </div>
  );
}

export function CheckeredEdge({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`checkered pointer-events-none h-2.5 opacity-25 [mask-image:linear-gradient(90deg,transparent,black_20%,black_80%,transparent)] ${className}`}
    />
  );
}

/* ------------------------------------------------------------------ */
/* TIGER: Fig. 1 on graph paper.                                      */
/* ------------------------------------------------------------------ */

export function ThesisFigure({ variant }: { variant: Variant }) {
  const header = variant === "header";
  return (
    <figure
      aria-hidden
      className={`graph-paper relative rounded-[3px] text-paper-ink shadow-[0_24px_40px_-24px_rgba(0,0,0,0.8)] ${
        header
          ? "w-full rotate-[1.5deg] p-6"
          : "absolute top-5 left-1/2 w-[86%] max-w-[440px] -translate-x-1/2 -rotate-2 p-4 sm:p-5"
      }`}
    >
      <div className="flex items-center gap-4 sm:gap-6">
        <svg viewBox="0 0 160 130" className={header ? "w-[46%] shrink-0" : "w-[42%] shrink-0"}>
          <defs>
            <marker
              id={`arrow-${variant}`}
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0 8 4 0 8z" fill="#2a241c" />
            </marker>
            <marker
              id={`arrow-hot-${variant}`}
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0 8 4 0 8z" fill="#c2410c" />
            </marker>
          </defs>
          <g fill="none" stroke="#2a241c" strokeWidth="1.2">
            <circle cx="30" cy="34" r="20" />
            <circle cx="130" cy="34" r="20" />
            <circle cx="80" cy="104" r="20" />
            <path d="M52 34 H106" markerEnd={`url(#arrow-${variant})`} />
            <path d="M120 54 L95 86" markerEnd={`url(#arrow-${variant})`} />
          </g>
          <path
            d="M60 104 C20 104 6 80 18 58"
            fill="none"
            stroke="#c2410c"
            strokeWidth="1.6"
            className="feedback-flow"
            data-live={header ? "" : undefined}
            markerEnd={`url(#arrow-hot-${variant})`}
          />
          <g fontFamily="var(--font-serif)" fontStyle="italic" fontSize="15" fill="#2a241c" textAnchor="middle">
            <text x="30" y="39">
              p
            </text>
            <text x="130" y="39" fontStyle="normal" fontSize="12">
              LLM
            </text>
            <text x="80" y="109">
              T
            </text>
          </g>
          <text x="2" y="96" fontFamily="var(--font-serif)" fontStyle="italic" fontSize="11" fill="#c2410c">
            f
          </text>
        </svg>
        <div className={`font-serif leading-snug ${header ? "text-[1.05rem]" : "text-[0.8rem] sm:text-[0.95rem]"}`}>
          <p className="italic">
            c<sub>k+1</sub> = LLM(p, f(c<sub>k</sub>))
          </p>
          <p className="mt-1.5 italic">
            until T(c<sub>k</sub>) = 1
          </p>
          <p className="mt-1.5 italic">or k = K</p>
        </div>
      </div>
      <figcaption
        className={`mt-3 border-t border-paper-ink/25 pt-2 font-serif ${header ? "text-sm" : "text-[0.7rem] sm:text-xs"}`}
      >
        <span className="font-semibold">Fig. 1.</span> The test-feedback loop: failing tests T become feedback f for the
        next prompt p.
      </figcaption>
    </figure>
  );
}

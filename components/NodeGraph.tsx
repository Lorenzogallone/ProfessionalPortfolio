// The node graph from the LinkedIn banner: a quiet network with one
// highlighted path, drawn in SVG so it stays sharp and weighs nothing.

const nodes = [
  { x: 60, y: 90, r: 5, accent: false },
  { x: 170, y: 50, r: 7, accent: true },
  { x: 300, y: 110, r: 5, accent: false },
  { x: 130, y: 200, r: 9, accent: true },
  { x: 250, y: 250, r: 5, accent: false },
  { x: 360, y: 210, r: 7, accent: true },
  { x: 40, y: 260, r: 4, accent: false },
  { x: 330, y: 330, r: 4, accent: false },
  { x: 190, y: 340, r: 6, accent: false },
];

const edges: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 2],
  [3, 4],
  [2, 5],
  [4, 5],
  [0, 6],
  [6, 3],
  [4, 7],
  [5, 7],
  [4, 8],
  [3, 8],
];

const path: [number, number][] = [
  [1, 3],
  [3, 5],
];

export function NodeGraph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 380" className={className} aria-hidden>
      <defs>
        <radialGradient id="graph-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5eead4" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#5eead4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="190" r="190" fill="url(#graph-glow)" />
      <g stroke="#2b3d66" strokeWidth="1.2">
        {edges.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} />
        ))}
      </g>
      <g stroke="#5eead4" strokeWidth="1.6" strokeDasharray="6 6" className="animate-flow">
        {path.map(([a, b]) => (
          <line key={`p-${a}-${b}`} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} />
        ))}
      </g>
      {nodes.map((n, i) => (
        <g key={i}>
          {n.accent && (
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill="#5eead4"
              className="animate-pulse-node"
              style={{ transformOrigin: `${n.x}px ${n.y}px`, animationDelay: `${i * 0.5}s` }}
            />
          )}
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.accent ? "#5eead4" : "#93c5fd"} opacity={n.accent ? 1 : 0.75} />
        </g>
      ))}
    </svg>
  );
}

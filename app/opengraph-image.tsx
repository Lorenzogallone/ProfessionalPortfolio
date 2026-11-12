import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";

export const alt = `${profile.name} · ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const nodes = [
  { x: 120, y: 150, r: 9, a: false },
  { x: 260, y: 90, r: 12, a: true },
  { x: 380, y: 200, r: 9, a: false },
  { x: 200, y: 320, r: 15, a: true },
  { x: 360, y: 420, r: 9, a: false },
  { x: 470, y: 330, r: 12, a: true },
];
const edges = [
  [0, 1, false],
  [1, 2, false],
  [0, 3, false],
  [3, 4, false],
  [2, 5, false],
  [4, 5, false],
  [1, 3, true],
  [3, 5, true],
] as const;

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        background: "#16130f",
        fontFamily: "sans-serif",
      }}
    >
      <svg width="560" height="520" viewBox="0 0 560 520" style={{ marginLeft: 20 }}>
        {edges.map(([a, b, hot], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke={hot ? "#ff6a3d" : "#4a4034"}
            strokeWidth={hot ? 3 : 2}
          />
        ))}
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={n.a ? "#ff6a3d" : "#ece2d3"} />
        ))}
      </svg>
      <div style={{ display: "flex", flexDirection: "column", paddingRight: 70, flex: 1 }}>
        <div style={{ color: "#ffb38a", fontSize: 26, fontWeight: 600, marginBottom: 26 }}>{profile.eyebrow}</div>
        <div
          style={{
            color: "#ece2d3",
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.08,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          Building enterprise platforms with&nbsp;<span style={{ color: "#ff6a3d" }}>AI built in.</span>
        </div>
        <div style={{ color: "#a39684", fontSize: 28, marginTop: 34 }}>{profile.name}</div>
      </div>
    </div>,
    size,
  );
}

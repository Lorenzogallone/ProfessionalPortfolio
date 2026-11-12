"use client";

import { useEffect, useId, useRef } from "react";

// The node graph from the LinkedIn banner, now alive: nodes drift and lean towards
// the pointer, a route lights up across the network and signals travel along it,
// then the route changes. Drawn in SVG and updated outside React, one frame at a time,
// only while it is on screen. With reduced motion it stays still on the first route.

const nodes = [
  { x: 60, y: 90, r: 5 },
  { x: 170, y: 50, r: 7 },
  { x: 300, y: 110, r: 5 },
  { x: 130, y: 200, r: 9 },
  { x: 250, y: 250, r: 5 },
  { x: 360, y: 210, r: 7 },
  { x: 40, y: 260, r: 4 },
  { x: 330, y: 330, r: 4 },
  { x: 190, y: 340, r: 6 },
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
  [1, 3],
  [3, 5],
];

// Routes through the network, as node sequences. Each one is a chain of existing edges.
const routes = [
  [1, 3, 5],
  [6, 3, 4, 7],
  [0, 1, 2, 5, 7],
  [8, 3, 2],
  [0, 3, 4, 5],
];

const edgeIndex = (a: number, b: number) => edges.findIndex(([x, y]) => (x === a && y === b) || (x === b && y === a));
const ROUTE_MS = 4200;
const SEG_MS = 900;

export function NodeGraph({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lines = Array.from(svg.querySelectorAll<SVGLineElement>("[data-edge]"));
    const hot = Array.from(svg.querySelectorAll<SVGLineElement>("[data-hot]"));
    const dots = Array.from(svg.querySelectorAll<SVGGElement>("[data-node]"));
    const packets = Array.from(svg.querySelectorAll<SVGCircleElement>("[data-packet]"));
    const rings = Array.from(svg.querySelectorAll<SVGCircleElement>("[data-ring]"));

    const pos = nodes.map((n) => ({ x: n.x, y: n.y }));
    const heat = edges.map(([a, b]) =>
      routes[0].slice(1).some((y, k) => edgeIndex(routes[0][k], y) === edgeIndex(a, b)) ? 1 : 0,
    );
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let visible = false;
    let raf = 0;
    let start = 0;
    const ringAt = nodes.map(() => -1e9);
    const circles = dots.map((g) => g.querySelector("circle") as SVGCircleElement);
    const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
    const easeOut = (x: number) => 1 - (1 - x) ** 3;
    const easeBack = (x: number) => 1 + 2.2 * (x - 1) ** 3 + 1.2 * (x - 1) ** 2;
    const INTRO_MS = 1200; // edges trace in, nodes pop, then the routes start

    // Hide the graph until its intro plays (it is drawn fully for reduced motion and without JS).
    if (!reduce.matches) {
      lines.forEach((l) => (l.style.strokeDashoffset = "1"));
      circles.forEach((c) => c.setAttribute("r", "0"));
      hot.forEach((h) => (h.style.opacity = "0"));
    }

    const onPointer = (e: PointerEvent) => {
      const r = svg.getBoundingClientRect();
      pointer.tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width * 0.8)));
      pointer.ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height * 0.8)));
    };

    const frame = (now: number) => {
      if (!start) start = now;
      const t = now - start;
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;

      nodes.forEach((n, i) => {
        const depth = 0.5 + n.r / 9; // bigger nodes feel closer and move more
        pos[i].x = n.x + Math.sin(t / 1900 + i * 1.7) * 4 + pointer.x * 9 * depth;
        pos[i].y = n.y + Math.cos(t / 2300 + i * 1.1) * 4 + pointer.y * 7 * depth;
        dots[i].setAttribute("transform", `translate(${(pos[i].x - n.x).toFixed(2)} ${(pos[i].y - n.y).toFixed(2)})`);
        circles[i].setAttribute("r", (n.r * easeBack(clamp01((t - 700 - i * 60) / 500))).toFixed(2));
      });

      const rt = Math.max(0, t - INTRO_MS);
      const route = routes[Math.floor(rt / ROUTE_MS) % routes.length];
      const local = t < INTRO_MS ? -1e9 : rt % ROUTE_MS;
      const onRoute = new Set(route.slice(1).map((b, k) => edgeIndex(route[k], b)));

      edges.forEach(([a, b], i) => {
        const drawn = easeOut(clamp01((t - 300 - i * 45) / 1100));
        lines[i].style.strokeDashoffset = (1 - drawn).toFixed(3);
        const target = onRoute.has(i) ? drawn : 0;
        heat[i] += (target - heat[i]) * 0.05;
        for (const el of [lines[i], hot[i]]) {
          el.setAttribute("x1", pos[a].x.toFixed(2));
          el.setAttribute("y1", pos[a].y.toFixed(2));
          el.setAttribute("x2", pos[b].x.toFixed(2));
          el.setAttribute("y2", pos[b].y.toFixed(2));
        }
        hot[i].style.opacity = heat[i].toFixed(3);
      });

      // Two signals run the route, half a segment apart; each lights the node it reaches.
      const segs = route.length - 1;
      packets.forEach((p, k) => {
        const lane = k >> 1; // each signal is a glow plus a bright core
        const progress = (local - lane * (SEG_MS / 2)) / SEG_MS;
        if (progress < 0 || progress >= segs) {
          p.style.opacity = "0";
          return;
        }
        const s = Math.floor(progress);
        const f = progress - s;
        const e = f < 0.5 ? 2 * f * f : 1 - (-2 * f + 2) ** 2 / 2;
        const a = pos[route[s]];
        const b = pos[route[s + 1]];
        p.setAttribute("cx", (a.x + (b.x - a.x) * e).toFixed(2));
        p.setAttribute("cy", (a.y + (b.y - a.y) * e).toFixed(2));
        p.style.opacity = "1";
        if (f > 0.96 && t - ringAt[route[s + 1]] > 500) ringAt[route[s + 1]] = t;
      });

      rings.forEach((ring, i) => {
        const age = (t - ringAt[i]) / 900;
        if (age > 1) {
          ring.style.opacity = "0";
          return;
        }
        ring.setAttribute("cx", pos[i].x.toFixed(2));
        ring.setAttribute("cy", pos[i].y.toFixed(2));
        ring.setAttribute("r", (nodes[i].r + age * 16).toFixed(2));
        ring.style.opacity = ((1 - age) * 0.8).toFixed(3);
      });

      raf = visible ? requestAnimationFrame(frame) : 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !reduce.matches && !document.hidden;
      if (visible && !raf) raf = requestAnimationFrame(frame);
    });
    io.observe(svg);
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  const first = new Set(routes[0].slice(1).map((b, k) => edgeIndex(routes[0][k], b)));

  return (
    <svg ref={svgRef} viewBox="0 0 400 380" className={`node-graph ${className}`} aria-hidden>
      <defs>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff6a3d" stopOpacity="0.16" />
          <stop offset="55%" stopColor="#ffb38a" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffb38a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-hot`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="400" y2="380">
          <stop offset="0%" stopColor="#ffb38a" />
          <stop offset="100%" stopColor="#ff6a3d" />
        </linearGradient>
        <filter id={`${uid}-blur`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <circle cx="200" cy="190" r="190" fill={`url(#${uid}-glow)`} />
      <g stroke="#4a4034" strokeWidth="1.2" strokeLinecap="round">
        {edges.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            data-edge
            pathLength={1}
            strokeDasharray="1"
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
          />
        ))}
      </g>
      <g stroke={`url(#${uid}-hot)`} strokeWidth="2" strokeLinecap="round">
        {edges.map(([a, b], i) => (
          <line
            key={`h-${a}-${b}`}
            data-hot
            style={{ opacity: first.has(i) ? 1 : 0 }}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
          />
        ))}
      </g>
      {nodes.map((n, i) => (
        <circle
          key={`r-${i}`}
          data-ring
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill="none"
          stroke="#ff6a3d"
          strokeWidth="1.2"
          style={{ opacity: 0 }}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i} data-node>
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.r >= 7 ? "#ff6a3d" : "#ece2d3"} fillOpacity={n.r >= 7 ? 1 : 0.8} />
        </g>
      ))}
      {[0, 1].map((k) => (
        <g key={`p-${k}`}>
          <circle data-packet r="7" fill="#ffb38a" filter={`url(#${uid}-blur)`} style={{ opacity: 0 }} cx="0" cy="0" />
          <circle data-packet r="2.6" fill="#fff4ea" style={{ opacity: 0 }} cx="0" cy="0" />
        </g>
      ))}
    </svg>
  );
}

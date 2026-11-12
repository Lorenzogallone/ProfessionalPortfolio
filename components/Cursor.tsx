"use client";

import { useEffect, useRef } from "react";

// A magnetic sight that replaces the pointer on mouse devices: a dot sits on the
// pointer, a ring follows it with a little lag. Over links the ring opens up and
// elements marked data-magnetic lean towards the pointer; over elements marked
// data-cursor (project cards) it fills in and says "Open".
// Touch devices and reduced motion keep the normal cursor.
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const r = ring.current;
    const d = dot.current;
    if (!fine || reduce || !r || !d) return;

    const root = document.documentElement;
    root.dataset.customCursor = "";
    let tx = -100;
    let ty = -100;
    let x = -100;
    let y = -100;
    let raf = 0;
    let magnet: HTMLElement | null = null;

    const tick = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      r.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.2 ? requestAnimationFrame(tick) : 0;
    };

    const release = () => {
      if (magnet) magnet.style.translate = "";
      magnet = null;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      d.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      root.dataset.cursorShown = "";
      if (!raf) raf = requestAnimationFrame(tick);

      const target = e.target as Element;
      const card = target.closest("[data-cursor]");
      const m = target.closest<HTMLElement>("[data-magnetic]");
      r.dataset.mode = card ? "open" : m || target.closest("a, button") ? "link" : "";

      if (m !== magnet) release();
      if (m) {
        const b = m.getBoundingClientRect();
        const dx = tx - (b.left + b.width / 2);
        const dy = ty - (b.top + b.height / 2);
        m.style.translate = `${(dx * 0.3).toFixed(1)}px ${(dy * 0.35).toFixed(1)}px`;
        magnet = m;
      }
    };

    const onLeave = () => {
      delete root.dataset.cursorShown;
      release();
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      release();
      delete root.dataset.customCursor;
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden>
        <span>Open</span>
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}

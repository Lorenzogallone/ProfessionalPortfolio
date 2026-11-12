"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Page-wide effects for server-rendered markup, so components stay server components:
// - scroll reveals for elements marked with data-reveal (they get data-in once on screen);
// - SVG animations (SMIL) that only run while their card is hovered or focused;
// - the sector flag: an orange band that sweeps across the screen when you scroll
//   into a new home section (sections marked data-flag), once per section.
// Without JS nothing is hidden: the hidden states only apply under html[data-ready].
export function Effects() {
  const pathname = usePathname();
  const flagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let sweep: Animation | null = null;
    const wave = (section: HTMLElement) => {
      const band = flagRef.current;
      if (reduce || !band || sweep?.playState === "running") return;
      section.dataset.flagged = "";
      sweep = band.animate(
        // The skew leans the band by up to ~40vh, so both ends sit fully off screen.
        [
          { visibility: "visible", transform: "translateX(calc(-100% - 40vh)) skewX(-14deg)" },
          { visibility: "visible", transform: "translateX(calc(100vw + 40vh)) skewX(-14deg)" },
        ],
        { duration: 900, easing: "cubic-bezier(0.7, 0, 0.3, 1)" },
      );
    };

    const pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          if ("flag" in el.dataset) wave(el);
          el.dataset.in = "";
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    const firstLoad = !("ready" in root.dataset);
    for (const el of pending) {
      // On the first load, what is already on screen stays as it is: no flash.
      if (firstLoad && el.getBoundingClientRect().top < window.innerHeight) el.dataset.in = "";
      else io.observe(el);
    }
    root.dataset.ready = "";

    // Hover-driven SVG animations: paused until their card is hovered or focused.
    const cleanups: (() => void)[] = [];
    for (const svg of document.querySelectorAll<SVGSVGElement>("svg[data-smil]")) {
      svg.pauseAnimations();
      if (reduce) continue;
      if (svg.dataset.smil === "auto") {
        svg.unpauseAnimations();
        continue;
      }
      const host = svg.closest<HTMLElement>(".group");
      if (!host) continue;
      const play = () => svg.unpauseAnimations();
      const stop = () => svg.pauseAnimations();
      host.addEventListener("pointerenter", play);
      host.addEventListener("pointerleave", stop);
      host.addEventListener("focusin", play);
      host.addEventListener("focusout", stop);
      cleanups.push(() => {
        host.removeEventListener("pointerenter", play);
        host.removeEventListener("pointerleave", stop);
        host.removeEventListener("focusin", play);
        host.removeEventListener("focusout", stop);
      });
    }

    return () => {
      io.disconnect();
      cleanups.forEach((c) => c());
    };
  }, [pathname]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <div ref={flagRef} className="sector-flag" />
    </div>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Page-wide effects for server-rendered markup, so components stay server components:
// - scroll reveals for elements marked with data-reveal (they get data-in once on screen);
// - SVG animations (SMIL) that only run while their card is hovered or focused.
// Without JS nothing is hidden: the hidden states only apply under html[data-ready].
export function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.in = "";
          io.unobserve(e.target);
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

  return null;
}

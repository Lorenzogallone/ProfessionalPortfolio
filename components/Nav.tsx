"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience", wide: true },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact", cta: true },
];

// Main navigation with a flat pill that slides under the link you point at
// and rests on the section you are reading (on case studies: Work).
export function Nav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const navEl = navRef.current;
    const pill = pillRef.current;
    if (!navEl || !pill) return;
    const links = Array.from(navEl.querySelectorAll<HTMLAnchorElement>("a[data-nav]"));
    let active: HTMLAnchorElement | null = null;
    let hovering = false;

    const place = (el: HTMLAnchorElement | null) => {
      if (!el || el.offsetWidth === 0) {
        pill.style.opacity = "0";
        return;
      }
      pill.style.opacity = "1";
      pill.style.left = `${el.offsetLeft}px`;
      pill.style.width = `${el.offsetWidth}px`;
    };

    const setActive = (href: string | null) => {
      const next = links.find((l) => l.dataset.nav === href) ?? null;
      if (next === active) return;
      active?.removeAttribute("aria-current");
      next?.setAttribute("aria-current", "location");
      active = next;
      if (!hovering) place(active);
    };

    const enter = (e: Event) => {
      hovering = true;
      place(e.currentTarget as HTMLAnchorElement);
    };
    const leave = () => {
      hovering = false;
      place(active);
    };
    links.forEach((l) => l.addEventListener("pointerenter", enter));
    navEl.addEventListener("pointerleave", leave);

    let frame = 0;
    const spy = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const { href } of nav) {
        const section = document.getElementById(href.slice(2));
        if (section && section.getBoundingClientRect().top <= line) current = href;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = "/#contact";
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(spy);
    };

    if (pathname === "/") {
      spy();
      window.addEventListener("scroll", onScroll, { passive: true });
    } else {
      setActive(pathname.startsWith("/work/") ? "/#work" : null);
    }
    const onResize = () => place(active);
    window.addEventListener("resize", onResize);

    return () => {
      links.forEach((l) => l.removeEventListener("pointerenter", enter));
      navEl.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame);
      active?.removeAttribute("aria-current");
    };
  }, [pathname]);

  return (
    <nav ref={navRef} aria-label="Main" className="relative flex items-center gap-0.5 text-sm sm:gap-1">
      <span
        ref={pillRef}
        aria-hidden
        className="absolute top-1/2 h-9 -translate-y-1/2 rounded-lg border border-seam bg-carbon-hi opacity-0 transition-[left,width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
      />
      {nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          data-nav={item.href}
          data-magnetic
          className={`relative rounded-lg px-2.5 py-2 transition-colors sm:px-3.5 ${
            item.cta
              ? "font-semibold text-signal hover:text-ember"
              : "text-muted hover:text-sand aria-[current]:text-sand"
          } ${item.wide ? "hidden sm:inline-block" : "inline-block"}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

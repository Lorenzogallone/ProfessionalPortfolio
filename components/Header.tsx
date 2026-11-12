import Link from "next/link";
import { profile } from "@/lib/content";

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience", wide: true },
  { href: "/#about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line/60 bg-night-950/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 text-[0.95rem] font-semibold text-ink">
          <span className="grid size-7 place-items-center rounded-md border border-line-strong bg-night-800 font-mono text-[0.7rem] text-teal">
            LG
          </span>
          {profile.name}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-5 text-sm sm:gap-7">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-muted transition-colors hover:text-ink ${item.wide ? "hidden sm:inline" : ""}`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/#contact" className="text-teal transition-colors hover:text-ink">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

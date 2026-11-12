import Link from "next/link";
import { profile } from "@/lib/content";

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience", wide: true },
  { href: "/#about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-seam/60 bg-asphalt/70 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 text-[0.95rem] font-semibold text-sand">
          <span className="bezel grid size-8 place-items-center rounded-lg text-[0.72rem] font-extrabold text-signal [font-variation-settings:'wdth'_125]">
            LG
          </span>
          {profile.name}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-5 text-sm sm:gap-7">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-muted transition-colors hover:text-sand ${item.wide ? "hidden sm:inline" : ""}`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/#contact" className="font-semibold text-signal transition-colors hover:text-sand">
            Contact
          </Link>
        </nav>
      </div>
      <span
        aria-hidden
        className="lap-progress absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-signal/0 via-signal to-ember"
      />
    </header>
  );
}

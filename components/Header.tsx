import Link from "next/link";
import { profile } from "@/lib/content";
import { Nav } from "./Nav";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-seam/60 bg-asphalt/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" data-magnetic className="flex items-center gap-2.5 text-[0.95rem] font-semibold text-sand">
          <span className="bezel grid size-8 place-items-center rounded-lg text-[0.72rem] font-extrabold text-signal [font-variation-settings:'wdth'_125]">
            LG
          </span>
          {profile.name}
        </Link>
        <Nav />
      </div>
      <span aria-hidden className="lap-progress absolute inset-x-0 -bottom-px h-px bg-signal" />
    </header>
  );
}

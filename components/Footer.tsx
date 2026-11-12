import { profile } from "@/lib/content";
import { GitHub, LinkedIn, Mail } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-seam/60">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:px-6">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <div className="flex items-center gap-2">
          <a href={`mailto:${profile.email}`} aria-label="Email" className="p-2 transition-colors hover:text-signal">
            <Mail />
          </a>
          <a href={profile.linkedin} aria-label="LinkedIn" className="p-2 transition-colors hover:text-signal">
            <LinkedIn />
          </a>
          <a href={profile.github} aria-label="GitHub" className="p-2 transition-colors hover:text-signal">
            <GitHub />
          </a>
        </div>
      </div>
    </footer>
  );
}

import { profile } from "@/lib/content";
import { GitHub, LinkedIn, Mail } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-line/60">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:px-6">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <div className="flex items-center gap-4">
          <a href={`mailto:${profile.email}`} aria-label="Email" className="transition-colors hover:text-teal">
            <Mail />
          </a>
          <a href={profile.linkedin} aria-label="LinkedIn" className="transition-colors hover:text-teal">
            <LinkedIn />
          </a>
          <a href={profile.github} aria-label="GitHub" className="transition-colors hover:text-teal">
            <GitHub />
          </a>
        </div>
      </div>
    </footer>
  );
}

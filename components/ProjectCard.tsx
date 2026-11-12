import Link from "next/link";
import type { Project } from "@/lib/content";
import { ArrowRight } from "./icons";
import { Phone } from "./Phone";

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-night-800/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/50 hover:bg-night-800 ${
        featured ? "lg:col-span-2 lg:flex-row-reverse" : ""
      }`}
    >
      <Visual project={project} featured={featured} />
      <div className={`flex flex-1 flex-col p-6 sm:p-7 ${featured ? "lg:justify-center lg:p-10" : ""}`}>
        <div className="mb-5 flex items-center justify-between gap-4 font-mono text-[0.72rem] uppercase tracking-[0.16em]">
          <span className="text-teal">{project.tag}</span>
          <span className="text-muted">{project.period}</span>
        </div>
        <h3 className={`mb-3 font-semibold tracking-tight text-ink ${featured ? "text-3xl lg:text-4xl" : "text-2xl"}`}>
          {project.name}
        </h3>
        <p className={`mb-6 max-w-xl leading-relaxed text-body ${featured ? "lg:text-lg" : ""}`}>{project.summary}</p>
        <p className="mt-auto flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-sky/90 lg:mt-0">
          {project.stack.slice(0, featured ? 6 : 4).map((s) => (
            <span key={s}>{s}</span>
          ))}
        </p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-teal">
          Read case study
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function Visual({ project, featured }: { project: Project; featured: boolean }) {
  const screens = project.screens ?? [];
  return (
    <div
      aria-hidden
      className={`relative overflow-hidden border-line bg-[radial-gradient(ellipse_at_50%_100%,rgba(94,234,212,0.16),transparent_65%)] ${
        featured ? "h-80 border-b sm:h-96 lg:h-auto lg:min-h-[26rem] lg:w-[46%] lg:border-b-0 lg:border-l" : "h-60 border-b"
      }`}
    >
      {screens.length === 0 ? (
        <TestLoop />
      ) : featured ? (
        <>
          <Phone
            src={screens[1]?.src ?? screens[0].src}
            alt=""
            sizes="240px"
            className="absolute top-14 left-1/2 w-[46%] max-w-[230px] translate-x-[-95%] rotate-[-4deg] opacity-80 transition-transform duration-500 group-hover:rotate-[-6deg]"
          />
          <Phone
            src={screens[0].src}
            alt=""
            sizes="260px"
            className="absolute top-8 left-1/2 w-[50%] max-w-[250px] translate-x-[-12%] transition-transform duration-500 group-hover:-translate-y-1"
          />
        </>
      ) : (
        <Phone
          src={screens[0].src}
          alt=""
          sizes="220px"
          className="absolute top-8 left-1/2 w-[48%] max-w-[210px] -translate-x-1/2 transition-transform duration-500 group-hover:-translate-y-1"
        />
      )}
    </div>
  );
}

// TIGER has no UI to show: a terminal-style sketch of its loop instead.
function TestLoop() {
  const lines: [string, string][] = [
    ["text-muted", "$ tiger run --repo <project>"],
    ["text-sky", "› generate      attempt 1"],
    ["text-[#fb7185]", "✗ tests failed  → feedback to the LLM"],
    ["text-sky", "› generate      attempt 2"],
    ["text-teal", "✓ all tests passed"],
  ];
  return (
    <div className="absolute inset-x-6 top-8 rounded-xl border border-line-strong bg-night-950/90 p-4 font-mono text-[0.72rem] leading-6 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.85)] sm:inset-x-10 sm:text-xs">
      <div className="mb-3 flex gap-1.5">
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="size-2.5 rounded-full bg-line-strong" />
      </div>
      {lines.map(([color, text]) => (
        <p key={text} className={`${color} whitespace-pre`}>
          {text}
        </p>
      ))}
    </div>
  );
}

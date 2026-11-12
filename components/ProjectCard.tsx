import Link from "next/link";
import type { Project } from "@/lib/content";
import { ArrowRight } from "./icons";

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-night-800/60 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/50 hover:bg-night-800 sm:p-7 ${
        featured ? "lg:col-span-2 lg:flex-row lg:gap-10" : ""
      }`}
    >
      <div className="flex flex-1 flex-col">
        <div className="mb-5 flex items-center justify-between gap-4 font-mono text-[0.72rem] uppercase tracking-[0.16em]">
          <span className="text-teal">{project.tag}</span>
          <span className="text-muted">{project.period}</span>
        </div>
        <h3 className={`mb-3 font-semibold tracking-tight text-ink ${featured ? "text-3xl" : "text-2xl"}`}>
          {project.name}
        </h3>
        <p className="mb-6 max-w-xl leading-relaxed text-body">{project.summary}</p>
        <p className="mt-auto flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-sky/90">
          {project.stack.slice(0, featured ? 6 : 4).map((s) => (
            <span key={s}>{s}</span>
          ))}
        </p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-teal">
          Read case study
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
      {featured && (
        <dl className="mt-8 grid grid-cols-3 gap-3 lg:mt-0 lg:w-72 lg:grid-cols-1 lg:content-center">
          {project.facts.map((f) => (
            <div key={f.label} className="rounded-xl border border-line bg-night-900/70 p-3.5">
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="block text-xl font-semibold text-ink">{f.value}</span>
                <span className="text-xs leading-snug text-muted">{f.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      )}
    </Link>
  );
}

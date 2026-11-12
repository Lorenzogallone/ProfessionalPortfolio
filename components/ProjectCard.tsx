import Link from "next/link";
import type { Project } from "@/lib/content";
import { ArrowRight } from "./icons";
import { CheckeredEdge, Circuit, PaceTrace, SpeedStreaks, ThesisFigure } from "./motifs";
import { Phone } from "./Phone";

export function ProjectCard({
  project,
  featured = false,
  index = 0,
}: {
  project: Project;
  featured?: boolean;
  index?: number;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-reveal="card"
      style={{ ["--d" as string]: `${index * 120}ms` }}
      className={`surface group flex flex-col overflow-hidden rounded-3xl ${featured ? "lg:col-span-2 lg:flex-row-reverse" : ""}`}
    >
      <Visual project={project} featured={featured} />
      <div className={`relative flex flex-1 flex-col p-6 sm:p-8 ${featured ? "lg:justify-center lg:p-12" : ""}`}>
        <div className="mb-5 flex items-baseline justify-between gap-4 text-sm">
          <span className="label">{project.tag}</span>
          <span className="text-muted">{project.period}</span>
        </div>
        <h3 className={`display mb-3 ${featured ? "text-4xl lg:text-5xl" : "text-3xl"}`}>{project.name}</h3>
        <p className={`mb-6 max-w-xl leading-relaxed text-body ${featured ? "lg:text-lg" : ""}`}>{project.summary}</p>
        <p className="mt-auto flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-steel lg:mt-0">
          {project.stack.slice(0, featured ? 6 : 4).map((s) => (
            <span key={s}>{s}</span>
          ))}
        </p>
        <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-signal">
          Read case study
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </div>
    </Link>
  );
}

function Visual({ project, featured }: { project: Project; featured: boolean }) {
  const screens = project.screens ?? [];
  const frame = featured
    ? "h-80 border-b sm:h-96 lg:h-auto lg:min-h-[28rem] lg:w-[48%] lg:border-b-0 lg:border-l"
    : "h-64 border-b";
  return (
    <div aria-hidden className={`relative overflow-hidden border-seam/70 ${frame}`}>
      {project.slug === "zitto-e-corri" && (
        <>
          <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]">
            <PaceTrace variant="card" />
          </div>
          <Phone
            src={screens[1]?.src ?? screens[0].src}
            alt=""
            sizes="240px"
            className="absolute top-14 left-1/2 w-[44%] max-w-[230px] translate-x-[-88%] rotate-[-5deg] opacity-85 transition-transform duration-700 ease-out group-hover:-translate-y-1 group-hover:rotate-[-7deg]"
          />
          <Phone
            src={screens[0].src}
            alt=""
            sizes="260px"
            className="absolute top-8 left-1/2 w-[48%] max-w-[250px] translate-x-[-10%] rotate-[2deg] transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:rotate-[1deg]"
          />
        </>
      )}
      {project.slug === "fanta-f1" && (
        <>
          <div className="absolute inset-y-0 left-0 w-[66%]">
            <Circuit variant="card" />
          </div>
          <SpeedStreaks />
          <Phone
            src={screens[0].src}
            alt=""
            sizes="220px"
            className="absolute top-8 left-[56%] w-[40%] max-w-[200px] rotate-[3deg] transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:rotate-[1deg]"
          />
          <CheckeredEdge className="absolute inset-x-0 bottom-0" />
        </>
      )}
      {project.slug === "tiger" && <ThesisFigure variant="card" />}
    </div>
  );
}

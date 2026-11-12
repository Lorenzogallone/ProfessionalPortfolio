import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Flow } from "@/components/Flow";
import { Gallery } from "@/components/Gallery";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/icons";
import { CheckeredEdge, Circuit, PaceTrace, ThesisFigure } from "@/components/motifs";
import { type Project, projects } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: project.name, description: project.summary, url: `/work/${project.slug}` },
  };
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const sideMotif = project.slug === "fanta-f1" || project.slug === "tiger";

  return (
    <article>
      <header className="relative overflow-hidden border-b border-seam/60">
        <HeaderBackdrop project={project} />
        <div
          className={`relative mx-auto max-w-6xl px-4 pt-10 pb-16 sm:px-6 sm:pt-14 sm:pb-20 ${
            sideMotif ? "lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center lg:gap-14" : ""
          }`}
        >
          <div className="max-w-3xl">
            <Link
              href="/#work"
              className="mb-12 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-signal"
            >
              <ArrowLeft /> All work
            </Link>
            <p className="label hero-fade mb-5 flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-signal" />
              {project.tag}
            </p>
            <h1 className="display-xl text-5xl sm:text-7xl">
              <span className="hero-line">
                <span style={{ ["--d" as string]: "60ms" }}>{project.name}</span>
              </span>
            </h1>
            <p className="hero-fade mt-4 text-sm text-muted" style={{ ["--d" as string]: "200ms" }}>
              {project.context} · {project.period}
            </p>
            <p
              className="hero-fade mt-8 max-w-3xl text-lg leading-relaxed text-body sm:text-xl"
              style={{ ["--d" as string]: "280ms" }}
            >
              {project.intro}
            </p>
            {project.links.length > 0 && (
              <div className="hero-fade mt-9 flex flex-wrap items-center gap-3" style={{ ["--d" as string]: "380ms" }}>
                {project.links.map((l, i) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm ${
                      i === 0
                        ? "btn-signal font-semibold"
                        : "border border-seam-strong bg-carbon-hi/60 font-medium text-sand transition-colors hover:border-ember hover:text-ember"
                    }`}
                  >
                    {l.label} <ArrowUpRight />
                  </a>
                ))}
                {project.links.find((l) => l.note) && (
                  <span className="text-xs text-muted">{project.links.find((l) => l.note)?.note}</span>
                )}
              </div>
            )}
          </div>
          {sideMotif && (
            <div
              className="hero-fade mx-auto mt-12 max-w-sm lg:mt-0 lg:max-w-none"
              style={{ ["--d" as string]: "300ms" }}
            >
              {project.slug === "fanta-f1" ? <Circuit variant="header" /> : <ThesisFigure variant="header" />}
            </div>
          )}
        </div>
        {project.slug === "fanta-f1" && <CheckeredEdge className="absolute inset-x-0 bottom-0" />}
      </header>

      <Gallery project={project} />

      <div className="mx-auto max-w-4xl space-y-16 px-4 py-16 sm:px-6 sm:py-20">
        <dl data-reveal="facts" className="grid gap-3 sm:grid-cols-3">
          {project.facts.map((f, i) => (
            <div
              key={f.label}
              className="step rounded-2xl border border-seam bg-carbon/80 p-5 shadow-[inset_0_1px_0_rgba(236,226,211,0.05)]"
              style={{ ["--d" as string]: `${i * 110}ms` }}
            >
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="display block text-4xl">{f.value}</span>
                <span className="mt-2 block text-sm text-muted">{f.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        <Flow flow={project.flow} />

        {project.sections.map((s) => (
          <section key={s.title} data-reveal="sector">
            <div className="mb-6">
              <h2 className="sector-title display overflow-clip pb-1 text-2xl sm:text-3xl">
                <span className="block">{s.title}</span>
              </h2>
              <span aria-hidden className="sector-line relative mt-4 block h-px" />
            </div>
            {s.body && <p className="max-w-3xl text-lg leading-relaxed text-body">{s.body}</p>}
            {s.points && (
              <ul className={s.points.some((p) => p.title) ? "grid gap-4 sm:grid-cols-2" : "space-y-3"}>
                {s.points.map((p) =>
                  p.title ? (
                    <li
                      key={p.title}
                      className="rounded-2xl border border-seam bg-carbon/80 p-5 shadow-[inset_0_1px_0_rgba(236,226,211,0.05)]"
                    >
                      <h3 className="mb-2 font-semibold text-sand [font-variation-settings:'wdth'_110]">{p.title}</h3>
                      <p className="leading-relaxed text-body">{p.text}</p>
                    </li>
                  ) : (
                    <li key={p.text} className="flex gap-3 text-lg leading-relaxed text-body">
                      <span aria-hidden className="mt-3 size-1.5 shrink-0 rounded-full bg-signal" />
                      {p.text}
                    </li>
                  ),
                )}
              </ul>
            )}
          </section>
        ))}

        <section>
          <h2 className="mb-4 text-base font-semibold text-sand">Stack</h2>
          <p className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="chip px-2.5 py-1">
                {s}
              </span>
            ))}
          </p>
        </section>

        <Link
          href={`/work/${next.slug}`}
          className="glass group flex items-center justify-between rounded-3xl p-6 sm:p-8"
        >
          <span>
            <span className="label block">Next project</span>
            <span className="display mt-2 block text-3xl sm:text-4xl">{next.name}</span>
          </span>
          <ArrowRight className="size-7 text-signal transition-transform duration-300 group-hover:translate-x-1.5" />
        </Link>
      </div>
    </article>
  );
}

// Behind the header: a warm light, plus each project's own texture.
function HeaderBackdrop({ project }: { project: Project }) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_30rem_at_90%_20%,rgba(255,106,61,0.12),transparent_65%)]"
      />
      {project.slug === "zitto-e-corri" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] opacity-30 [mask-composite:intersect] [mask-image:linear-gradient(100deg,transparent_25%,black_80%),linear-gradient(to_bottom,transparent,black_35%)] lg:h-[75%] lg:opacity-60 lg:[mask-image:linear-gradient(100deg,transparent_58%,black_88%),linear-gradient(to_bottom,transparent,black_35%)]"
        >
          <PaceTrace variant="header" />
        </div>
      )}
      {project.slug === "tiger" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(143,179,201,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(143,179,201,0.07)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black,transparent)] bg-[size:32px_32px]"
        />
      )}
    </>
  );
}

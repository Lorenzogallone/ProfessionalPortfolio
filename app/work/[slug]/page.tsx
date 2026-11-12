import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Flow } from "@/components/Flow";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/icons";
import { projects } from "@/lib/content";

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

  return (
    <article>
      <header className="border-b border-line/60 bg-gradient-to-br from-night-950 to-night-800">
        <div className="mx-auto max-w-4xl px-4 pt-10 pb-16 sm:px-6 sm:pt-14 sm:pb-20">
          <Link href="/#work" className="mb-12 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-teal">
            <ArrowLeft /> All work
          </Link>
          <p className="eyebrow mb-4 animate-rise font-mono text-teal">{project.tag}</p>
          <h1 className="animate-rise text-4xl font-semibold tracking-tight text-ink [animation-delay:60ms] sm:text-6xl">
            {project.name}
          </h1>
          <p className="mt-3 animate-rise font-mono text-sm text-muted [animation-delay:100ms]">
            {project.context} · {project.period}
          </p>
          <p className="mt-8 max-w-3xl animate-rise text-lg leading-relaxed text-body [animation-delay:140ms] sm:text-xl">
            {project.intro}
          </p>
          {project.links.length > 0 && (
            <div className="mt-9 flex flex-wrap items-center gap-3">
              {project.links.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm transition-colors ${
                    i === 0
                      ? "bg-teal font-semibold text-teal-deep hover:bg-ink"
                      : "border border-line-strong font-medium text-ink hover:border-teal hover:text-teal"
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
      </header>

      <div className="mx-auto max-w-4xl space-y-16 px-4 py-16 sm:px-6 sm:py-20">
        <dl className="grid gap-3 sm:grid-cols-3">
          {project.facts.map((f) => (
            <div key={f.label} className="rounded-xl border border-line bg-night-800/60 p-5">
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="block text-3xl font-semibold tracking-tight text-ink">{f.value}</span>
                <span className="mt-1 block text-sm text-muted">{f.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        <Flow flow={project.flow} />

        {project.sections.map((s) => (
          <section key={s.title}>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-ink">{s.title}</h2>
            {s.body && <p className="max-w-3xl text-lg leading-relaxed text-body">{s.body}</p>}
            {s.points && (
              <ul className={s.points.some((p) => p.title) ? "grid gap-4 sm:grid-cols-2" : "space-y-3"}>
                {s.points.map((p) =>
                  p.title ? (
                    <li key={p.title} className="rounded-xl border border-line bg-night-900/70 p-5">
                      <h3 className="mb-2 font-semibold text-ink">{p.title}</h3>
                      <p className="leading-relaxed text-body">{p.text}</p>
                    </li>
                  ) : (
                    <li key={p.text} className="flex gap-3 text-lg leading-relaxed text-body">
                      <span aria-hidden className="mt-3 size-1.5 shrink-0 rounded-full bg-teal" />
                      {p.text}
                    </li>
                  ),
                )}
              </ul>
            )}
          </section>
        ))}

        <section>
          <h2 className="eyebrow mb-4 font-mono text-muted">Stack</h2>
          <p className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="rounded-md border border-line bg-night-800 px-2.5 py-1 font-mono text-xs text-sky">
                {s}
              </span>
            ))}
          </p>
        </section>

        <Link
          href={`/work/${next.slug}`}
          className="group flex items-center justify-between rounded-2xl border border-line bg-night-800/60 p-6 transition-colors hover:border-teal/50"
        >
          <span>
            <span className="eyebrow block font-mono text-muted">Next project</span>
            <span className="mt-1 block text-2xl font-semibold text-ink">{next.name}</span>
          </span>
          <ArrowRight className="size-6 text-teal transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

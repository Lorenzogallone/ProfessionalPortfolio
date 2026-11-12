import { NodeGraph } from "@/components/NodeGraph";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import { ArrowRight, FileText, GitHub, LinkedIn, Mail } from "@/components/icons";
import { about, earlierWork, education, experience, profile, projects, skills } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />
      <Section id="work" eyebrow="Selected work" title="Products where AI does real work, and tools people use.">
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} featured={i === 0} index={i === 0 ? 0 : i - 1} />
          ))}
        </div>
        <div data-reveal="list" className="mt-20">
          <h3 className="mb-5 text-base font-semibold text-sand">Earlier work · university</h3>
          <span aria-hidden className="grow-x block h-px bg-seam" />
          <ul>
            {earlierWork.map((w, i) => (
              <li
                key={w.name}
                className="step relative grid gap-1 py-5 sm:grid-cols-[12rem_1fr_auto] sm:items-baseline sm:gap-6"
                style={{ ["--d" as string]: `${150 + i * 110}ms` }}
              >
                <span className="font-semibold text-sand [font-variation-settings:'wdth'_110]">{w.name}</span>
                <span className="text-sm leading-relaxed text-body">{w.text}</span>
                <span className="font-mono text-xs text-steel">{w.stack}</span>
                <span
                  aria-hidden
                  className="grow-x absolute inset-x-0 bottom-0 h-px bg-seam"
                  style={{ ["--d" as string]: `${200 + i * 110}ms` }}
                />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <div className="relative border-y border-seam/60 bg-carbon">
        <Section id="experience" eyebrow="Experience" title="From requirements to production.">
          <div data-reveal="timeline" className="relative">
            <span aria-hidden className="grow-y absolute top-2 bottom-2 left-0 w-px bg-seam-strong" />
            <ol className="space-y-14 pl-8 sm:pl-12">
              {experience.map((job, i) => (
                <li key={job.company} className="step relative" style={{ ["--d" as string]: `${200 + i * 250}ms` }}>
                  <span
                    aria-hidden
                    className={`absolute top-2 -left-[calc(2rem+5px)] size-2.5 rounded-full sm:-left-[calc(3rem+5px)] ${
                      i === 0 ? "bg-signal" : "bg-steel/80"
                    }`}
                  />
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-xl font-semibold text-sand [font-variation-settings:'wdth'_110] sm:text-2xl">
                      {job.role} <span className="font-normal text-muted">·</span>{" "}
                      <span className="text-ember">{job.company}</span>
                    </h3>
                    <p className="text-sm text-muted">
                      {job.period} · {job.place}
                    </p>
                  </div>
                  <p className="mt-3 max-w-3xl leading-relaxed text-body">{job.text}</p>
                  <p className="mt-4 flex flex-wrap gap-2">
                    {job.stack.map((s) => (
                      <span key={s} className="chip px-2 py-0.5">
                        {s}
                      </span>
                    ))}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Section>
      </div>

      <Section id="about" eyebrow="About" title="Simple systems, shipped.">
        <div data-reveal="about" className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-5 text-lg leading-relaxed text-body">
            {about.paragraphs.map((p, i) => (
              <p key={p} className="step" style={{ ["--d" as string]: `${i * 120}ms` }}>
                {p}
              </p>
            ))}
            <p className="step relative pl-5 text-base text-muted" style={{ ["--d" as string]: "260ms" }}>
              <span aria-hidden className="absolute inset-y-1 left-0 w-0.5 bg-signal" />
              {about.offline}
            </p>
          </div>
          <div className="space-y-10">
            <div className="step" style={{ ["--d" as string]: "200ms" }}>
              <h3 className="mb-4 text-base font-semibold text-sand">Stack</h3>
              <dl className="space-y-3">
                {skills.map((s) => (
                  <div key={s.group} className="grid grid-cols-[7.5rem_1fr] gap-3 border-b border-seam/50 pb-3 text-sm">
                    <dt className="text-muted">{s.group}</dt>
                    <dd className="text-sand">{s.items.join(" · ")}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="step" style={{ ["--d" as string]: "320ms" }}>
              <h3 className="mb-4 text-base font-semibold text-sand">Education</h3>
              <ul className="space-y-4">
                {education.map((e) => (
                  <li key={e.degree + e.school}>
                    <p className="font-semibold text-sand">{e.degree}</p>
                    <p className="text-sm text-body">{e.school}</p>
                    <p className="text-sm text-muted">{e.detail}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted">{about.languages}</p>
            </div>
          </div>
        </div>
      </Section>

      <Contact />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-seam/70" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="label hero-fade mb-7 flex items-center gap-3" style={{ ["--d" as string]: "0ms" }}>
            <span aria-hidden className="h-px w-8 bg-signal" />
            {profile.eyebrow}
          </p>
          <h1 className="display-xl text-[2.6rem] sm:text-6xl lg:text-[4.3rem]">
            <span className="hero-line">
              <span style={{ ["--d" as string]: "80ms" }}>{profile.headline}</span>
            </span>
            <span className="hero-line">
              <span style={{ ["--d" as string]: "220ms" }}>
                <span className="racing-line">{profile.headlineAccent}</span>
              </span>
            </span>
          </h1>
          <p
            className="hero-fade mt-8 max-w-xl text-lg leading-relaxed text-body"
            style={{ ["--d" as string]: "450ms" }}
          >
            {profile.intro}
          </p>
          <div className="hero-fade mt-10 flex flex-wrap items-center gap-3" style={{ ["--d" as string]: "560ms" }}>
            <a
              href="#work"
              className="btn-signal inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
            >
              See my work <ArrowRight />
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-seam-strong bg-carbon-hi px-5 py-3 text-sm font-medium text-sand transition-colors hover:border-ember hover:text-ember"
            >
              <FileText className="size-4" /> Resume
            </a>
            <span className="flex items-center">
              <a
                href={profile.linkedin}
                aria-label="LinkedIn"
                className="p-2.5 text-muted transition-colors hover:text-signal"
              >
                <LinkedIn />
              </a>
              <a
                href={profile.github}
                aria-label="GitHub"
                className="p-2.5 text-muted transition-colors hover:text-signal"
              >
                <GitHub />
              </a>
            </span>
          </div>
        </div>
        <NodeGraph className="mx-auto hidden w-full max-w-md lg:block" />
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <div data-reveal="card" className="surface overflow-hidden rounded-[2rem] px-6 py-14 sm:px-14 sm:py-16">
        <NodeGraph className="pointer-events-none absolute -right-16 -bottom-20 w-80 opacity-40 sm:w-96 sm:opacity-70" />
        <div className="relative max-w-xl">
          <p className="label mb-4">Contact</p>
          <h2 id="contact-title" className="display text-[2rem] sm:text-5xl">
            Let&apos;s build something people actually use.
          </h2>
          <p className="mt-5 leading-relaxed text-body">
            Happy to talk about full-stack products, AI integration or interesting engineering problems.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="btn-signal inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
            >
              <Mail className="size-4" /> {profile.email}
            </a>
            <a
              href={profile.linkedin}
              className="inline-flex items-center gap-2 rounded-xl border border-seam-strong bg-carbon-hi px-5 py-3 text-sm font-medium text-sand transition-colors hover:border-ember hover:text-ember"
            >
              <LinkedIn className="size-4" /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

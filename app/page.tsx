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
        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} featured={i === 0} />
          ))}
        </div>
        <div className="mt-16">
          <h3 className="eyebrow mb-5 font-mono text-muted">Earlier work · university</h3>
          <ul className="divide-y divide-line border-y border-line">
            {earlierWork.map((w) => (
              <li key={w.name} className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr_auto] sm:items-baseline sm:gap-6">
                <span className="font-medium text-ink">{w.name}</span>
                <span className="text-sm leading-relaxed text-body">{w.text}</span>
                <span className="font-mono text-xs text-muted">{w.stack}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <div className="border-y border-line/60 bg-night-900/60">
        <Section id="experience" eyebrow="Experience" title="From requirements to production.">
          <ol className="relative space-y-12 border-l border-line pl-7 sm:pl-10">
            {experience.map((job, i) => (
              <li key={job.company} className="relative">
                <span
                  aria-hidden
                  className={`absolute top-1.5 -left-[calc(1.75rem+5px)] size-2.5 rounded-full sm:-left-[calc(2.5rem+5px)] ${
                    i === 0 ? "bg-teal ring-4 ring-teal/20" : "bg-sky/70"
                  }`}
                />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-xl font-semibold text-ink">
                    {job.role} <span className="font-normal text-muted">·</span>{" "}
                    <span className="text-teal">{job.company}</span>
                  </h3>
                  <p className="font-mono text-xs text-muted">
                    {job.period} · {job.place}
                  </p>
                </div>
                <p className="mt-3 max-w-3xl leading-relaxed text-body">{job.text}</p>
                <p className="mt-3 flex flex-wrap gap-2">
                  {job.stack.map((s) => (
                    <span key={s} className="rounded-md border border-line bg-night-800 px-2 py-0.5 font-mono text-xs text-sky">
                      {s}
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ol>
        </Section>
      </div>

      <Section id="about" eyebrow="About" title="Simple systems, shipped.">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-5 text-lg leading-relaxed text-body">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="border-l-2 border-teal/60 pl-4 text-base text-muted">{about.offline}</p>
          </div>
          <div className="space-y-10">
            <div>
              <h3 className="eyebrow mb-4 font-mono text-muted">Stack</h3>
              <dl className="space-y-3">
                {skills.map((s) => (
                  <div key={s.group} className="grid grid-cols-[7.5rem_1fr] gap-3 text-sm">
                    <dt className="text-muted">{s.group}</dt>
                    <dd className="text-ink">{s.items.join(" · ")}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="eyebrow mb-4 font-mono text-muted">Education</h3>
              <ul className="space-y-4">
                {education.map((e) => (
                  <li key={e.degree + e.school}>
                    <p className="font-medium text-ink">{e.degree}</p>
                    <p className="text-sm text-body">{e.school}</p>
                    <p className="font-mono text-xs text-muted">{e.detail}</p>
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
    <section className="relative overflow-hidden bg-gradient-to-br from-night-950 via-night-950 to-night-800">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <p className="eyebrow mb-6 animate-rise font-mono text-teal">{profile.eyebrow}</p>
          <h1 className="animate-rise text-balance text-[2.6rem] leading-[1.05] font-semibold tracking-tight text-ink [animation-delay:80ms] sm:text-6xl lg:text-[4.2rem]">
            {profile.headline} <span className="whitespace-nowrap text-teal">{profile.headlineAccent}</span>
          </h1>
          <p className="mt-7 max-w-xl animate-rise text-lg leading-relaxed text-body [animation-delay:160ms]">
            {profile.intro}
          </p>
          <div className="mt-10 flex animate-rise flex-wrap items-center gap-3 [animation-delay:240ms]">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-3 text-sm font-semibold text-teal-deep transition-colors hover:bg-ink"
            >
              See my work <ArrowRight />
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-teal hover:text-teal"
            >
              <FileText className="size-4" /> Resume
            </a>
            <a href={profile.linkedin} aria-label="LinkedIn" className="p-2 text-muted transition-colors hover:text-teal">
              <LinkedIn />
            </a>
            <a href={profile.github} aria-label="GitHub" className="p-2 text-muted transition-colors hover:text-teal">
              <GitHub />
            </a>
          </div>
        </div>
        <NodeGraph className="mx-auto hidden w-full max-w-md animate-rise [animation-delay:200ms] lg:block" />
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-night-800 to-night-900 px-6 py-14 sm:px-14 sm:py-16">
        <NodeGraph className="pointer-events-none absolute -right-16 -bottom-20 w-80 opacity-40 sm:opacity-60" />
        <div className="relative max-w-xl">
          <p className="eyebrow mb-3 font-mono text-teal">Contact</p>
          <h2 id="contact-title" className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Let&apos;s build something people actually use.
          </h2>
          <p className="mt-4 leading-relaxed text-body">
            Happy to talk about full-stack products, AI integration or interesting engineering problems.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-3 text-sm font-semibold text-teal-deep transition-colors hover:bg-ink"
            >
              <Mail className="size-4" /> {profile.email}
            </a>
            <a
              href={profile.linkedin}
              className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-teal hover:text-teal"
            >
              <LinkedIn className="size-4" /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

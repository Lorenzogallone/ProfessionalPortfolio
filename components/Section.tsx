import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <p className="eyebrow mb-3 font-mono text-teal">{eyebrow}</p>
      <h2 id={`${id}-title`} className="mb-12 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title ?? eyebrow}
      </h2>
      {children}
    </section>
  );
}

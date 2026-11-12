import type { ReactNode } from "react";

// A section opens like a timing sector: its name sits on a line that traces
// across the page, then the title rises out of a mask (see globals.css).
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
      <div data-reveal="sector" className="mb-12 sm:mb-14">
        <div className="mb-6 flex items-center gap-4">
          <p className="sector-label label shrink-0">{eyebrow}</p>
          <span aria-hidden className="sector-line relative h-px flex-1" />
        </div>
        <h2
          id={`${id}-title`}
          className="sector-title display max-w-3xl overflow-clip pb-1 text-balance text-[2rem] sm:text-5xl"
        >
          <span className="block">{title ?? eyebrow}</span>
        </h2>
      </div>
      {children}
    </section>
  );
}

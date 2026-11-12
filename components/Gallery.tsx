import type { Project } from "@/lib/content";
import { Phone } from "./Phone";

// The app as people use it: phone screens in a row that scrolls sideways
// on small screens and fits on one line on wide ones. They deal in one by one.
export function Gallery({ project }: { project: Project }) {
  if (!project.screens?.length) return null;
  return (
    <section aria-labelledby="screens-title" className="relative border-b border-seam/60 bg-carbon">
      <div data-reveal="gallery" className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto mb-9 lg:max-w-[1080px]">
          <h2 id="screens-title" className="label">
            The app
          </h2>
          {project.screensNote && <p className="mt-2 text-sm text-muted">{project.screensNote}</p>}
        </div>
        <ul className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:justify-center lg:overflow-visible lg:px-0">
          {project.screens.map((s, i) => (
            <li
              key={s.src}
              className="step group w-[62vw] max-w-[240px] shrink-0 snap-center lg:w-[200px]"
              style={{ ["--d" as string]: `${i * 90}ms` }}
            >
              <figure>
                <Phone
                  src={s.src}
                  alt={s.alt}
                  priority={i < 2}
                  sizes="(min-width: 1024px) 200px, 62vw"
                  className="transition-transform duration-500 ease-out group-hover:-translate-y-1.5"
                />
                <figcaption className="mt-4 text-sm leading-relaxed text-body">{s.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

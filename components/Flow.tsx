import type { Project } from "@/lib/content";

// A project's pipeline as connected nodes: a row on wide screens,
// a column on phones. An optional loop note closes the cycle.
export function Flow({ flow }: { flow: Project["flow"] }) {
  return (
    <figure className="rounded-2xl border border-line bg-night-900/70 p-5 sm:p-7">
      <figcaption className="eyebrow mb-6 font-mono text-muted">{flow.title}</figcaption>
      <ol className="flex flex-col gap-2 md:flex-row md:items-stretch md:gap-0">
        {flow.steps.map((step, i) => {
          const last = i === flow.steps.length - 1;
          return (
            <li key={step} className="flex flex-col items-start md:min-w-0 md:flex-1 md:flex-row md:items-center">
              <span
                className={`rounded-lg border px-3.5 py-2 text-sm md:flex md:h-full md:w-full md:items-center md:justify-center md:px-2 md:text-center ${
                  i === 0 || last ? "border-teal/50 bg-teal/10 text-ink" : "border-line-strong bg-night-800 text-body"
                }`}
              >
                {step}
              </span>
              {!last && (
                <span aria-hidden className="ml-5 h-4 w-px shrink-0 bg-line-strong md:mx-1 md:ml-1 md:h-px md:w-3" />
              )}
            </li>
          );
        })}
      </ol>
      {flow.loop && (
        <p className="mt-5 flex gap-2.5 text-sm text-body">
          <span aria-hidden className="font-mono text-teal">
            ↺
          </span>
          {flow.loop}
        </p>
      )}
    </figure>
  );
}

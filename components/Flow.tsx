import type { Project } from "@/lib/content";

// A project's pipeline as connected nodes: a row on wide screens,
// a column on phones. On reveal the steps light up in order, like a signal
// passing through. An optional loop note closes the cycle.
export function Flow({ flow }: { flow: Project["flow"] }) {
  const n = flow.steps.length;
  return (
    <figure data-reveal="flow" className="glass rounded-3xl p-5 sm:p-8">
      <figcaption className="mb-7 text-base font-semibold text-sand">{flow.title}</figcaption>
      <ol className="flex flex-col gap-2 md:flex-row md:items-stretch md:gap-0">
        {flow.steps.map((step, i) => {
          const last = i === n - 1;
          const ends = i === 0 || last;
          return (
            <li key={step} className="flex flex-col items-start md:min-w-0 md:flex-1 md:flex-row md:items-center">
              <span
                className={`step rounded-xl border px-3.5 py-2 text-sm md:flex md:h-full md:w-full md:items-center md:justify-center md:px-2 md:text-center ${
                  ends
                    ? "border-signal/60 bg-signal/10 text-sand shadow-[0_0_24px_-8px_rgba(255,106,61,0.6)]"
                    : "border-seam-strong bg-carbon-hi text-body"
                }`}
                style={{ ["--d" as string]: `${i * 140}ms` }}
              >
                {step}
              </span>
              {!last && (
                <span
                  aria-hidden
                  className="relative ml-5 h-4 w-px shrink-0 bg-seam-strong md:mx-1 md:ml-1 md:h-px md:w-3"
                >
                  <span
                    className="grow-x absolute inset-0 bg-signal"
                    style={{ ["--d" as string]: `${i * 140 + 120}ms` }}
                  />
                </span>
              )}
            </li>
          );
        })}
      </ol>
      {flow.loop && (
        <p className="step mt-6 flex gap-2.5 text-sm text-body" style={{ ["--d" as string]: `${n * 140}ms` }}>
          <span aria-hidden className="text-signal">
            ↺
          </span>
          {flow.loop}
        </p>
      )}
    </figure>
  );
}

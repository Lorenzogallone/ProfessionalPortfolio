import Link from "next/link";
import { ArrowLeft } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-start px-4 py-32 sm:px-6">
      <p className="eyebrow mb-4 font-mono text-teal">404</p>
      <h1 className="text-4xl font-semibold tracking-tight text-ink">This page isn&apos;t here.</h1>
      <p className="mt-4 text-body">The link may be old, or the page has moved.</p>
      <Link href="/" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-teal hover:text-ink">
        <ArrowLeft /> Back to the home page
      </Link>
    </section>
  );
}

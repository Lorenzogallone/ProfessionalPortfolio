import Image from "next/image";

// A screenshot of the installed PWA inside a minimal phone frame.
export function Phone({
  src,
  alt,
  sizes = "(min-width: 1024px) 220px, 60vw",
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[2.2rem] border border-line-strong bg-night-900 p-[7px] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.85)] ${className}`}
    >
      <div className="relative aspect-[375/812] overflow-hidden rounded-[1.75rem] bg-night-950">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      </div>
    </div>
  );
}

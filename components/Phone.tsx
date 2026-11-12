import Image from "next/image";

// A screenshot of the installed PWA inside a glass phone bezel,
// with a sheen that slides across when its card is hovered.
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
    <div className={`bezel rounded-[2.2rem] p-[7px] ${className}`}>
      <div className="relative aspect-[390/844] overflow-hidden rounded-[1.75rem] bg-asphalt">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
        <span aria-hidden className="sheen pointer-events-none absolute inset-0" />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.75rem] shadow-[inset_0_0_0_1px_rgba(236,226,211,0.08)]"
        />
      </div>
    </div>
  );
}

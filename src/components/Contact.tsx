import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/data/site";

export function Contact() {
  return (
    <section aria-labelledby="contacto" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
      <SectionHeading id="contacto" index="03" title="Contacto" />
      <div className="relative overflow-hidden rounded-2xl border border-line px-6 py-16 text-center sm:px-12 sm:py-24">
        <div aria-hidden className="grid-backdrop absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_80%_at_50%_100%,#000,transparent)]" />
        <div aria-hidden className="absolute bottom-0 left-1/2 -z-10 h-48 w-[40rem] max-w-full -translate-x-1/2 translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
        <p className="text-gradient text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          ¿Construimos algo juntos?
        </p>
        <p className="mx-auto mt-4 max-w-md text-muted">
          Cuéntame tu idea. Respondo rápido.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex h-11 items-center rounded-full bg-white px-6 text-sm font-medium text-black transition hover:bg-white/85"
          >
            {site.email}
          </a>
          {site.socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-1.5 rounded-full border border-white/15 px-6 text-sm font-medium transition hover:border-white/40 hover:bg-white/5"
            >
              {s.label} <span aria-hidden>↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

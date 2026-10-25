import { useLocale, useTranslations } from "next-intl";
import { SectionHeading } from "@/components/SectionHeading";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

// El stack se arma solo a partir de los proyectos, sin repetir.
const stack = Array.from(new Set(projects.flatMap((p) => p.stack)));

export function About() {
  const t = useTranslations("About");
  const locale = useLocale();

  return (
    <section aria-labelledby="sobre-mi" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
      <SectionHeading id="sobre-mi" index="02" title={t("title")} />
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-neutral-300 sm:text-xl">
          {site.about[locale].map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{t("stack")}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {stack.map((t) => (
              <li key={t} className="rounded-md border border-line bg-white/[0.02] px-3 py-1.5 text-sm text-neutral-300">
                {t}
              </li>
            ))}
          </ul>
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
            <div className="bg-black p-4">
              <dt className="font-mono text-xs text-muted">{t("liveProjects")}</dt>
              <dd className="mt-1 text-2xl font-semibold">{projects.filter((p) => p.url).length}</dd>
            </div>
            <div className="bg-black p-4">
              <dt className="font-mono text-xs text-muted">{t("base")}</dt>
              <dd className="mt-1 text-2xl font-semibold">{site.location}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { BrowserFrame } from "@/components/BrowserFrame";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  featured?: boolean;
  hidden?: boolean;
  onOpen: () => void;
};

// Espera un instante antes de cargar el sitio en vivo para no abrir iframes
// cuando el cursor solo pasa por encima.
const HOVER_DELAY = 250;

export function PortalCard({ project, featured, hidden, onOpen }: Props) {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const [live, setLive] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const start = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !project.url) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setLive(true), HOVER_DELAY);
  };
  const stop = () => clearTimeout(timer.current);

  const handleClick = () => {
    if (project.url) onOpen();
    else window.open(project.repo, "_blank", "noopener,noreferrer");
  };

  return (
    <SpotlightCard
      spotlightColor={project.accent}
      intensity={0.12}
      spotlightSize={420}
      className="group !rounded-2xl border border-line !bg-neutral-950/60 !p-0"
    >
      <button
        type="button"
        onClick={handleClick}
        onPointerEnter={start}
        onPointerLeave={stop}
        onFocus={() => project.url && setLive(true)}
        aria-label={t(project.url ? "openLive" : "openRepo", { title: project.title })}
        className="block w-full cursor-pointer rounded-2xl p-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:p-4"
      >
        {hidden ? (
          // Ocupa el lugar del marco mientras está abierto como portal.
          <div aria-hidden className="pt-8">
            <div className="aspect-[16/10]" />
          </div>
        ) : (
          <BrowserFrame project={project} live={live} priority={featured} />
        )}

        <div className={`flex flex-col gap-4 px-1 pt-5 pb-1 ${featured ? "md:flex-row md:items-end md:justify-between" : ""}`}>
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
              <span className="font-mono text-xs text-muted">{project.year}</span>
              {!project.url && (
                <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                  {t("pendingDeploy")}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">{project.description[locale]}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={t("stack")}>
              {project.stack.map((t) => (
                <li key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[11px] text-neutral-300">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <span
            aria-hidden
            className="inline-flex h-9 shrink-0 items-center gap-2 self-start rounded-full border border-white/15 px-4 text-sm transition group-hover:border-white group-hover:bg-white group-hover:text-black"
          >
            {project.url ? t("enter") : t("viewCode")}
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </span>
        </div>
      </button>
    </SpotlightCard>
  );
}

"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";

// Ancho del "escritorio" virtual que se escala para caber en la tarjeta.
const VIEWPORT = { width: 1280, height: 800 };

type Props = {
  project: Project;
  live: boolean;
  priority?: boolean;
};

export function hostOf(url: string) {
  return new URL(url).host;
}

// Marco de navegador con la captura del proyecto; si `live` está activo,
// carga el sitio real en un iframe escalado encima de la captura.
export function BrowserFrame({ project, live, priority }: Props) {
  const t = useTranslations("Projects");
  const bodyRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [loaded, setLoaded] = useState(false);
  const host = project.url ? hostOf(project.url) : t("comingSoon");

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / VIEWPORT.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <motion.div
      layoutId={`portal-${project.slug}`}
      transition={{ type: "spring", stiffness: 260, damping: 32 }}
      className="relative overflow-hidden rounded-xl border border-white/10 bg-neutral-950 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
    >
      <div className="flex h-8 items-center gap-3 border-b border-white/10 bg-neutral-900/80 px-3">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </span>
        <span className="mx-auto flex min-w-0 max-w-[70%] items-center gap-1.5 truncate rounded-md bg-white/5 px-3 py-0.5 font-mono text-[11px] text-muted">
          {live && project.url && (
            <span aria-hidden className={`size-1.5 shrink-0 rounded-full ${loaded ? "bg-emerald-400" : "animate-pulse bg-amber-300"}`} />
          )}
          {host}
        </span>
        <span aria-hidden className="w-[42px]" />
      </div>

      <div ref={bodyRef} className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.poster}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1024px) 1100px, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-top transition duration-700 group-hover:scale-[1.02]"
        />
        {live && project.url && (
          <iframe
            src={project.url}
            title={t("livePreview", { title: project.title })}
            aria-hidden
            tabIndex={-1}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className="pointer-events-none absolute left-0 top-0 origin-top-left border-0 bg-white transition-opacity duration-500"
            style={{
              width: VIEWPORT.width,
              height: VIEWPORT.height,
              transform: `scale(${scale})`,
              opacity: loaded ? 1 : 0,
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

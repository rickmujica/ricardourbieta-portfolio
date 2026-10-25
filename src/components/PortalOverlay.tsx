"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { hostOf } from "@/components/BrowserFrame";
import type { Project } from "@/data/projects";

type Props = { project: Project; onClose: () => void };

// El "portal": la tarjeta se expande hasta ocupar la pantalla y el sitio
// queda navegable dentro, con salida rápida (Esc) o apertura en pestaña nueva.
export function PortalOverlay({ project, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [loaded, setLoaded] = useState(false);
  const url = project.url!;

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label={project.title} className="fixed inset-0 z-50 flex">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      <motion.div
        layoutId={`portal-${project.slug}`}
        transition={{ type: "spring", stiffness: 260, damping: 32 }}
        className="relative m-2 flex flex-1 flex-col overflow-hidden rounded-xl border border-white/15 bg-neutral-950 sm:m-6"
      >
        <div className="flex h-11 shrink-0 items-center gap-3 border-b border-white/10 bg-neutral-900/90 px-3">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs text-muted transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white/60"
          >
            <span aria-hidden>←</span> Volver
            <kbd className="ml-1 hidden rounded border border-white/15 px-1 font-mono text-[10px] sm:inline">Esc</kbd>
          </button>
          <span className="mx-auto flex min-w-0 items-center gap-1.5 truncate rounded-md bg-white/5 px-3 py-1 font-mono text-xs text-muted">
            <span aria-hidden className={`size-1.5 shrink-0 rounded-full ${loaded ? "bg-emerald-400" : "animate-pulse bg-amber-300"}`} />
            {hostOf(url)}
          </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-7 items-center gap-1.5 rounded-md bg-white px-2.5 text-xs font-medium text-black transition hover:bg-white/85"
          >
            <span className="hidden sm:inline">Abrir en pestaña nueva</span>
            <span className="sm:hidden">Abrir</span>
            <span aria-hidden>↗</span>
          </a>
        </div>
        <div className="relative flex-1 bg-neutral-950">
          {/* La captura sostiene la transición hasta que el sitio real termina de cargar. */}
          <Image src={project.poster} alt="" fill sizes="100vw" className="object-cover object-top" />
          {!loaded && (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 font-mono text-xs text-muted backdrop-blur">
              Abriendo portal…
            </p>
          )}
          <motion.iframe
            src={url}
            title={project.title}
            onLoad={() => setLoaded(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 size-full border-0 bg-white"
            allow="fullscreen; clipboard-write; geolocation; xr-spatial-tracking"
          />
        </div>
      </motion.div>
    </div>
  );
}

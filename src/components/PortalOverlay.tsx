"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { hostOf } from "@/components/BrowserFrame";
import type { Project } from "@/data/projects";

type Props = { project: Project; onClose: () => void };

// El "portal": la tarjeta se expande hasta ocupar la pantalla y el sitio
// queda navegable dentro, con salida rápida (Esc) o apertura en pestaña nueva.
//
// Esc: cuando el foco está dentro del iframe, las teclas van al otro sitio y el
// navegador no deja que esta página las vea. Por eso el foco vuelve aquí cuando el
// sitio intenta tomarlo al cargar y cuando el cursor sale del sitio, y mientras el
// foco está dentro se oculta la pista "Esc" y se muestra cómo salir.
export function PortalOverlay({ project, onClose }: Props) {
  const t = useTranslations("Portal");
  const closeRef = useRef<HTMLButtonElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  // true mientras el foco del teclado está dentro del sitio embebido.
  const [inFrame, setInFrame] = useState(false);
  const url = project.url!;

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    // Al entrar el foco al iframe, la ventana pierde el foco ("blur") y
    // document.activeElement pasa a ser el iframe.
    const onBlur = () =>
      setTimeout(() => setInFrame(document.activeElement === frameRef.current), 0);
    const onFocus = () => setInFrame(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [onClose]);

  // Devuelve el foco del teclado a esta página para que Esc vuelva a funcionar.
  const reclaimFocus = () => {
    if (document.activeElement === frameRef.current) {
      closeRef.current?.focus({ preventScroll: true });
      setInFrame(false);
    }
  };

  const handleLoad = () => {
    setLoaded(true);
    // Algunos sitios toman el foco al cargar (juegos, canvas). Lo recuperamos:
    // la persona todavía no hizo clic adentro.
    requestAnimationFrame(reclaimFocus);
  };

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
            <span aria-hidden>←</span> {t("back")}
            {!inFrame && (
              <kbd className="ml-1 hidden rounded border border-white/15 px-1 font-mono text-[10px] sm:inline">Esc</kbd>
            )}
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
            <span className="hidden sm:inline">{t("openNewTab")}</span>
            <span className="sm:hidden">{t("open")}</span>
            <span aria-hidden>↗</span>
          </a>
        </div>
        <div className="relative flex-1 bg-neutral-950" onPointerLeave={reclaimFocus}>
          {/* La captura sostiene la transición hasta que el sitio real termina de cargar. */}
          <Image src={project.poster} alt="" fill sizes="100vw" className="object-cover object-top" />
          {inFrame && (
            <p
              aria-live="polite"
              className="pointer-events-none absolute right-3 top-3 z-10 hidden rounded-full bg-black/75 px-3 py-1 font-mono text-[11px] text-muted backdrop-blur sm:block"
            >
              {t("escHint")}
            </p>
          )}
          {!loaded && (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 font-mono text-xs text-muted backdrop-blur">
              {t("opening")}
            </p>
          )}
          <motion.iframe
            src={url}
            title={project.title}
            ref={frameRef}
            onLoad={handleLoad}
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

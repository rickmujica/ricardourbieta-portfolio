"use client";

import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import BlurText from "@/components/reactbits/BlurText";
import DecryptedText from "@/components/reactbits/DecryptedText";
import LightRays from "@/components/reactbits/LightRays";
import { site } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const t = useTranslations("Hero");
  const locale = useLocale();

  return (
    <section className="relative isolate flex min-h-[88dvh] flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-16 text-center sm:px-6">
      <div aria-hidden className="grid-backdrop absolute inset-0 -z-20" />
      <div aria-hidden className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000_55%,transparent)]">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.6}
          lightSpread={0.9}
          rayLength={2.2}
          intensity={0.7}
          followMouse
          mouseInfluence={0.08}
          clickPulse={false}
        />
      </div>

      {site.available && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1 font-mono text-xs text-muted backdrop-blur"
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
          </span>
          {t("available")}
        </motion.p>
      )}

      <BlurText
        as="h1"
        text={site.name}
        trigger="load"
        delay={120}
        animateBy="letters"
        className="text-gradient justify-center text-5xl font-semibold tracking-[-0.04em] sm:text-7xl md:text-8xl"
      />

      <p className="mt-6 font-mono text-sm uppercase tracking-[0.2em] text-muted">
        <DecryptedText key={locale} text={site.role[locale]} animateOn="view" sequential revealDirection="start" speed={40} />
      </p>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease }}
        className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted sm:text-xl"
      >
        {site.tagline[locale]}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease }}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <a
          href="#trabajo"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-black transition hover:bg-white/85"
        >
          {t("seeProjects")}
          <span aria-hidden>↓</span>
        </a>
        <a
          href="#contacto"
          className="inline-flex h-11 items-center rounded-full border border-white/15 px-6 text-sm font-medium transition hover:border-white/40 hover:bg-white/5"
        >
          {t("contact")}
        </a>
      </motion.div>
    </section>
  );
}

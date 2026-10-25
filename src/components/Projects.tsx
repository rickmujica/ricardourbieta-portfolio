"use client";

import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { PortalCard } from "@/components/PortalCard";
import { PortalOverlay } from "@/components/PortalOverlay";
import { SectionHeading } from "@/components/SectionHeading";
import { projects, type Project } from "@/data/projects";

// El primero va destacado a todo el ancho; si los demás quedan impares,
// el último también ocupa todo el ancho para no dejar un hueco.
const isWide = (i: number) =>
  i === 0 || (i === projects.length - 1 && (projects.length - 1) % 2 === 1);

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section aria-labelledby="trabajo" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
      <SectionHeading id="trabajo" index="01" title="Trabajo reciente">
        <span className="hidden [@media(hover:hover)]:inline">Pasa el cursor para ver cada sitio en vivo. </span>
        Haz clic en un proyecto para entrar.
      </SectionHeading>

      <ul className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <li key={project.slug} className={`min-w-0 ${isWide(i) ? "md:col-span-2" : ""}`}>
            <PortalCard
              project={project}
              featured={isWide(i)}
              hidden={active?.slug === project.slug}
              onOpen={() => setActive(project)}
            />
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {active && <PortalOverlay key={active.slug} project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}

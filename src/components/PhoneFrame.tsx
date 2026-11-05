"use client";

import { forwardRef, useEffect, useRef, useState, type ReactNode } from "react";

// Pantalla de un iPhone de referencia, en píxeles CSS.
export const PHONE = { width: 390, height: 844 };
const BEZEL = 12;
const OUTER = {
  width: PHONE.width + BEZEL * 2,
  height: PHONE.height + BEZEL * 2,
};

type Props = {
  src: string;
  title: string;
  loaded: boolean;
  onLoad: () => void;
  // Lo que se ve en la pantalla mientras la app carga.
  placeholder?: ReactNode;
};

// Marco de teléfono para las apps móviles: la app corre a tamaño de teléfono real
// y el marco entero se achica si no entra en el espacio disponible. En un teléfono
// de verdad no hace falta dibujar otro: la app ocupa toda el área.
export const PhoneFrame = forwardRef<HTMLIFrameElement, Props>(function PhoneFrame(
  { src, title, loaded, onLoad, placeholder },
  ref,
) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [bare, setBare] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setBare(window.innerWidth < 640);
      setScale(Math.min(1, width / OUTER.width, height / OUTER.height));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const iframe = (
    <iframe
      ref={ref}
      src={src}
      title={title}
      onLoad={onLoad}
      className="absolute inset-0 size-full border-0 bg-white transition-opacity duration-500"
      style={{ opacity: loaded ? 1 : 0 }}
      allow="clipboard-write"
    />
  );

  return (
    <div ref={boxRef} className="absolute inset-0 flex items-center justify-center sm:inset-6">
      {bare ? (
        <>
          {placeholder}
          {iframe}
        </>
      ) : (
        <div className="relative shrink-0" style={{ width: OUTER.width * scale, height: OUTER.height * scale }}>
          <div
            className="absolute left-0 top-0 origin-top-left rounded-[3.25rem] bg-neutral-900 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/15"
            style={{
              width: OUTER.width,
              height: OUTER.height,
              padding: BEZEL,
              transform: `scale(${scale})`,
            }}
          >
            <div className="relative size-full overflow-hidden rounded-[2.5rem] bg-black">
              {placeholder}
              {iframe}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

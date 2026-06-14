"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AboutPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const elements = contentRef.current.querySelectorAll("[data-animate]");
    gsap.fromTo(
      elements,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 py-32">
      <div ref={contentRef} className="max-w-2xl">
        <span
          data-animate
          className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.3em] text-white/40"
        >
          Proyecto
        </span>
        <h1
          data-animate
          className="text-4xl font-extralight leading-tight text-white md:text-5xl"
        >
          La belleza escondida de Barranquilla
        </h1>
        <div data-animate className="mt-12 space-y-6 text-base leading-relaxed text-white/70">
          <p>
            Barranquilla es una ciudad que rara vez es celebrada por su belleza
            visual. Este proyecto busca cambiar esa narrativa, encontrando
            fragmentos de arquitectura, color y vida cotidiana a través de
            Google Street View.
          </p>
          <p>
            Cada imagen es un hallazgo — una fachada colonial que resiste, un
            mural inesperado, una esquina donde la luz del Caribe transforma
            lo ordinario en algo extraordinario.
          </p>
          <p>
            No es un archivo histórico ni una guía turística. Es una galería
            que invita a mirar de nuevo, con otros ojos, una ciudad que tiene
            más belleza de la que le reconocen.
          </p>
        </div>
      </div>
    </main>
  );
}

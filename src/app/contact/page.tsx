"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ContactPage() {
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
      <div ref={contentRef} className="max-w-lg text-center">
        <span
          data-animate
          className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.3em] text-white/40"
        >
          Contacto
        </span>
        <h1
          data-animate
          className="text-4xl font-extralight text-white md:text-5xl"
        >
          Hablemos
        </h1>
        <p
          data-animate
          className="mt-8 text-base leading-relaxed text-white/70"
        >
          ¿Tienes una imagen de Barranquilla que quieres compartir?
          ¿Conoces una historia detrás de alguna fachada?
        </p>
        <a
          data-animate
          href="mailto:hello@barranquilla.gallery"
          className="mt-10 inline-block border border-white/20 px-8 py-3 text-sm uppercase tracking-[0.2em] text-white transition-colors hover:border-white/60"
        >
          Escríbenos
        </a>
      </div>
    </main>
  );
}

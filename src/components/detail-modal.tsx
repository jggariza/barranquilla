"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { GalleryItem } from "@/data/gallery";

interface DetailModalProps {
  item: GalleryItem;
  onClose: () => void;
}

const asiloDetails = {
  history: [
    "Construido originalmente en 1908 como asilo para ancianos desamparados.",
    "Expandido en 1911 por doña Isabel Arjona de Obregón en memoria de su esposo Evaristo Obregón.",
    "El edificio es un ejemplo de arquitectura republicana con influencias neoclásicas adaptadas al clima caribeño.",
    "Durante décadas sirvió como refugio para personas mayores sin recursos, operado por la comunidad religiosa local.",
  ],
  extraImages: [
    {
      src: "/source/10_Asilo_San_Antonio_Pre.png",
      caption: "Vista Street View — 2012",
    },
    {
      src: "/source/10_Asilo_San_Antonio_Post.png",
      caption: "Vista Street View — 2016",
    },
  ],
};

export default function DetailModal({ item, onClose }: DetailModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;

    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.4 });
    gsap.fromTo(
      panel,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.1 }
    );

    const contentEls = panel.querySelectorAll("[data-modal-anim]");
    gsap.fromTo(
      contentEls,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.06,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.3,
      }
    );

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) {
      onClose();
      return;
    }

    gsap.to(panel, {
      y: 40,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.3,
      delay: 0.1,
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/90 backdrop-blur-xl p-4 md:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-4xl rounded-2xl border border-white/10 bg-neutral-950 p-6 md:p-10 opacity-0"
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors hover:border-white/50 hover:text-white"
          aria-label="Cerrar"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <span
          data-modal-anim
          className="mb-2 inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40"
        >
          {item.location}
        </span>
        <h2
          data-modal-anim
          className="text-3xl font-semibold text-white md:text-4xl lg:text-5xl"
        >
          {item.title}
        </h2>
        <p
          data-modal-anim
          className="mt-2 text-xs tracking-wide text-white/40"
        >
          {item.address}
        </p>

        <div data-modal-anim className="mt-8 space-y-4">
          {asiloDetails.history.map((paragraph, i) => (
            <p
              key={i}
              data-modal-anim
              className="text-sm leading-relaxed text-white/70 md:text-base"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div data-modal-anim className="mt-10">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            Galería
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {asiloDetails.extraImages.map((img, i) => (
              <div key={i} data-modal-anim className="group relative overflow-hidden rounded-lg">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={img.src}
                    alt={img.caption}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                  />
                </div>
                <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-white/40">
                  {img.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

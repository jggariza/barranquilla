"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { GalleryItem } from "@/data/gallery";

interface ReadMorePanelProps {
  item: GalleryItem;
  onClose: () => void;
}

export default function ReadMorePanel({ item, onClose }: ReadMorePanelProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    if (!backdrop || !panel) return;

    gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(
      panel,
      { x: "100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 0.5, ease: "power3.out" }
    );

    const elements = panel.querySelectorAll("[data-panel-anim]");
    gsap.fromTo(
      elements,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.4,
        ease: "power2.out",
        delay: 0.25,
      }
    );

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    if (!backdrop || !panel) {
      onClose();
      return;
    }

    gsap.to(panel, {
      x: "100%",
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
    });
    gsap.to(backdrop, {
      opacity: 0,
      duration: 0.3,
      delay: 0.1,
      onComplete: onClose,
    });
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `${item.title} — Barranquilla, la belleza escondida`;

  const shareLinks = [
    {
      name: "X",
      href: `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
    },
  ];

  return (
    <div className="fixed inset-0 z-[90] flex">
      {/* Backdrop — no blur, just dim */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/30"
        onClick={handleClose}
      />

      {/* Panel — blur on the panel itself, not the background */}
      <div
        ref={panelRef}
        className="absolute right-0 top-0 bottom-0 w-full bg-neutral-900/80 backdrop-blur-2xl md:w-[460px] lg:w-[520px]"
      >
        <div className="flex h-full flex-col overflow-y-auto px-8 py-10 md:px-10 md:py-12">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="mb-8 self-end flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors hover:border-white/50 hover:text-white"
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

          {/* Content */}
          <span
            data-panel-anim
            className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40"
          >
            {item.location}
          </span>
          <h3
            data-panel-anim
            className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl"
          >
            {item.title}
          </h3>
          <p
            data-panel-anim
            className="mt-2 text-[11px] tracking-wide text-white/30"
          >
            {item.address}
          </p>

          <div
            data-panel-anim
            className="mt-8 text-[15px] leading-relaxed text-white/75"
          >
            {item.longDesc}
          </div>

          {/* Share buttons */}
          <div data-panel-anim className="mt-auto pt-10">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
              Compartir
            </span>
            <div className="mt-3 flex gap-3">
              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/60 transition-all duration-300 hover:border-white/40 hover:text-white"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

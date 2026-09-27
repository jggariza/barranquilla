"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GalleryItem } from "@/data/gallery";

gsap.registerPlugin(ScrollTrigger);

interface GallerySectionProps {
  item: GalleryItem;
  index: number;
  total: number;
  onOpenModal?: (item: GalleryItem) => void;
  onReadMore?: (item: GalleryItem) => void;
}

export default function GallerySection({
  item,
  index,
  total,
  onOpenModal,
  onReadMore,
}: GallerySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);
  const hasMultipleImages = item.images.length > 1;

  const isBackground = index % 3 === 1;

  const handleToggle = useCallback(
    (idx: number) => {
      if (idx === activeImage) return;
      const imgInner = imageInnerRef.current;
      if (!imgInner) return;

      gsap.to(imgInner, {
        opacity: 0,
        scale: 1.03,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          setActiveImage(idx);
          gsap.fromTo(
            imgInner,
            { opacity: 0, scale: 0.97 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
          );
        },
      });
    },
    [activeImage]
  );

  useEffect(() => {
    const section = sectionRef.current;
    const imageWrap = imageWrapRef.current;
    const content = contentRef.current;
    if (!section || !imageWrap || !content) return;

    const ctx = gsap.context(() => {
      if (isBackground) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          pin: imageWrap,
          pinSpacing: false,
        });

        gsap.fromTo(
          imageWrap,
          { scale: 1.05 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",
              scrub: 1.5,
            },
          }
        );
      } else {
        gsap.fromTo(
          imageWrap,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );

        gsap.fromTo(
          imageWrap,
          { scale: 1.08, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 95%",
              end: "top 20%",
              scrub: 1.2,
            },
          }
        );
      }

      // Content reveal
      const elements = content.querySelectorAll("[data-anim]");
      gsap.fromTo(
        elements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "top 10%",
            scrub: 0.8,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [isBackground]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full"
      style={{ zIndex: isBackground ? 1 : total - index + 2 }}
    >
      {/* Image container — clips its own content */}
      <div
        ref={imageWrapRef}
        className={`relative overflow-hidden ${
          isBackground
            ? "h-screen w-full"
            : "mx-auto h-[85vh] w-[95vw] rounded-sm md:h-[90vh] md:w-[90vw]"
        }`}
      >
        <div ref={imageInnerRef} className="absolute inset-0">
          {item.images.map((img, i) => (
            <div
              key={img.src}
              className={`absolute inset-0 transition-opacity duration-500 ${
                i === activeImage
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <Image
                src={img.src}
                alt={`${item.title} — ${img.label || img.year}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index < 2 && i === 0}
                quality={90}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Content — inside image, anchored at bottom */}
        <div
          ref={contentRef}
          className="absolute inset-x-0 bottom-0 z-10 px-6 pb-8 md:px-12 md:pb-12"
        >
          <span
            data-anim
            className="mb-3 inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60"
          >
            {item.location}
          </span>
          <h2
            data-anim
            className="text-4xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            {item.title}
          </h2>
          <p
            data-anim
            className="mt-4 max-w-md text-sm leading-relaxed text-white/70 md:text-base"
          >
            {item.shortDesc}{" "}
            {onReadMore && (
              <button
                onClick={() => onReadMore(item)}
                className="inline text-white/90 underline underline-offset-2 decoration-white/30 transition-colors hover:decoration-white/70"
              >
                Leer más
              </button>
            )}
          </p>
          <p
            data-anim
            className="mt-2 text-[11px] tracking-wide text-white/40"
          >
            {item.address}
          </p>

          <div data-anim className="mt-5 flex items-center gap-4">
            {hasMultipleImages && (
              <div className="flex items-center gap-2">
                {item.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => handleToggle(i)}
                    className={`rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
                      i === activeImage
                        ? "bg-white text-black shadow-lg shadow-white/10"
                        : "border border-white/25 text-white/50 hover:border-white/60 hover:text-white"
                    }`}
                  >
                    {img.label || img.year}
                  </button>
                ))}
              </div>
            )}

            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
              {item.images[activeImage].year}
            </span>

            {item.hasDetailModal && onOpenModal && (
              <button
                onClick={() => onOpenModal(item)}
                className="ml-auto flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60 transition-all duration-300 hover:border-white/50 hover:text-white"
              >
                <span>Ver más</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </button>
            )}
          </div>

          <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden text-[11px] font-medium uppercase tracking-[0.2em] text-white/30 md:block [writing-mode:vertical-rl]">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>
      </div>
    </section>
  );
}

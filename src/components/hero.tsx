"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const indicator = scrollIndicatorRef.current;
    if (!hero || !title || !subtitle || !indicator) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        title,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: "power3.out", delay: 0.3 }
      );

      gsap.fromTo(
        subtitle,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "power3.out", delay: 0.7 }
      );

      gsap.fromTo(
        indicator,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 1.5 }
      );

      gsap.to(title, {
        yPercent: -150,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(subtitle, {
        yPercent: -100,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "60% top",
          scrub: true,
        },
      });

      gsap.to(indicator, {
        opacity: 0,
        y: -20,
        scrollTrigger: {
          trigger: hero,
          start: "10% top",
          end: "30% top",
          scrub: true,
        },
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative z-10 flex h-screen items-center justify-center"
    >
      <div className="text-center">
        <h1
          ref={titleRef}
          className="text-6xl font-bold tracking-tight text-neutral-900 opacity-0 md:text-8xl lg:text-[10rem]"
        >
          Barranquilla
        </h1>
        <p
          ref={subtitleRef}
          className="mt-6 text-xs font-medium uppercase tracking-[0.4em] text-neutral-400 opacity-0"
        >
          La belleza escondida
        </p>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
            Scroll
          </span>
          <div className="h-12 w-px animate-pulse bg-gradient-to-b from-neutral-400 to-transparent" />
        </div>
      </div>
    </section>
  );
}

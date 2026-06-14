"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Interstitial } from "@/data/interstitials";

gsap.registerPlugin(ScrollTrigger);

interface InterstitialSectionProps {
  data: Interstitial;
}

export default function InterstitialSection({ data }: InterstitialSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    if (!section || !headline || !body) return;

    const ctx = gsap.context(() => {
      // Headline: parallax + fade in together in one tween
      gsap.fromTo(
        headline,
        { y: 120, opacity: 0 },
        {
          y: -60,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 30%",
            scrub: 1.5,
          },
        }
      );

      // Body text: enters later, different speed
      gsap.fromTo(
        body,
        { y: 80, opacity: 0 },
        {
          y: -40,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            end: "bottom 40%",
            scrub: 1.2,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#f5f2ed] px-6 py-[20vh]"
    >
      <div className="relative max-w-5xl text-center">
        <h2
          ref={headlineRef}
          className="text-6xl font-bold leading-none tracking-tight text-neutral-900 md:text-8xl lg:text-[9rem]"
        >
          {data.headline}
        </h2>
        <p
          ref={bodyRef}
          className="mx-auto mt-10 max-w-xl text-base leading-relaxed text-neutral-500 md:mt-14 md:text-lg"
        >
          {data.body}
        </p>
      </div>
    </section>
  );
}

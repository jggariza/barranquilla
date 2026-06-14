"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[60] mix-blend-difference transition-all duration-500`}
    >
      <div className="flex items-center justify-between px-6 py-5 md:px-12">
        <Link
          href="/"
          className="text-sm font-medium uppercase tracking-[0.2em] text-white"
        >
          BAQ
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-[70] flex flex-col gap-1.5"
          aria-label="Toggle menu"
        >
          <span
            className={`h-px w-6 bg-white transition-transform duration-300 ${
              menuOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-white transition-transform duration-300 ${
              menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-[65] flex items-center justify-center bg-neutral-900/95 backdrop-blur-lg mix-blend-normal">
          <div className="flex flex-col items-center gap-8">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-3xl font-semibold text-white transition-opacity hover:opacity-60"
            >
              Galería
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="text-3xl font-semibold text-white transition-opacity hover:opacity-60"
            >
              Proyecto
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="text-3xl font-semibold text-white transition-opacity hover:opacity-60"
            >
              Contacto
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

"use client";

import { useEffect, useState, useCallback } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloqueia scroll do body quando menu aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Fecha com Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  const navLinkClass =
    "group relative whitespace-nowrap font-[montserrat] text-[13px] font-medium text-mybeige opacity-40 no-underline transition-opacity duration-500 ease-out hover:opacity-100 md:text-lg lg:text-xl";

  const navUnderlineClass =
    "absolute -bottom-1 left-0 h-px w-0 bg-white/90 transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:w-full";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[1000] max-w-[1900px] lg:mx-auto px-4 pt-3 transition-[padding] duration-300 ease-out md:px-5 md:pt-4 lg:px-3.5 lg:pt-5">
        <div
          className={`relative isolate mx-auto flex h-11 items-center justify-between rounded-[25px] bg-black/40 px-4 backdrop-blur-[20px] backdrop-saturate-[180%] shadow-[0_4px_24px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)] [transform:translateZ(0)] transition-[width] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[width] md:h-[50px] md:rounded-[25px] md:px-5 lg:h-14 lg:rounded-[28px] lg:px-11 ${
            scrolled
              ? "w-4/5 md:w-[70%] lg:w-1/2"
              : "w-[90%] md:w-[85%] lg:w-[85%]"
          }`}
        >
          <a href="#" className="no-underline">
            <span
              className="inline-block font-[chillax] font-medium tracking-[-1.2px] text-mywhite no-underline lg:text-[19px]"
              translate="no"
            >
              @felipysantsss
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex lg:gap-8">
            <a href="#work" className={navLinkClass}>
              work
              <span className={navUnderlineClass} />
            </a>
            <a href="#about" className={navLinkClass}>
              about
              <span className={navUnderlineClass} />
            </a>
            <a href="#contact" className={navLinkClass}>
              contact
              <span className={navUnderlineClass} />
            </a>
          </nav>

          {/* Burger — mobile only */}
          <button
            type="button"
            className="relative z-[1010] flex h-8 w-8 items-center justify-center border-none bg-transparent p-1 md:hidden"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`absolute h-[1.5px] w-[18px] origin-center rounded-sm bg-mybeige transition-[transform,top] duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
                menuOpen
                  ? "top-1/2 -translate-y-1/2 rotate-45"
                  : "top-[calc(50%-3px)]"
              }`}
            />
            <span
              className={`absolute h-[1.5px] w-[18px] origin-center rounded-sm bg-mybeige transition-[transform,top] duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
                menuOpen
                  ? "top-1/2 -translate-y-1/2 -rotate-45"
                  : "top-[calc(50%+3px)]"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-[999] flex flex-col overflow-hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-[rgba(0,0,0,0.907)] backdrop-blur-3xl backdrop-saturate-[180%] transition-opacity duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
        />
        <nav className="relative z-[1] flex h-full flex-col justify-center px-11 py-15 pt-20">
          <div
            className={`h-px w-full origin-left scale-x-0 bg-white/10 transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] delay-[30ms] ${
              menuOpen ? "scale-x-100" : ""
            }`}
          />
          <a
            href="#work"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
            className={`block w-full py-[18px] font-[montserrat] text-[clamp(28px,7vw,40px)] font-semibold tracking-[-0.5px] text-mybeige no-underline transition-[opacity,transform,color] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] after:float-right after:text-[28px] after:font-light after:opacity-35 after:content-['›'] after:transition-opacity after:duration-200 hover:text-mybeige hover:after:opacity-75 ${
              menuOpen
                ? "translate-y-0 opacity-100 delay-[50ms]"
                : "translate-y-0 opacity-0"
            }`}
          >
            work
          </a>
          <div
            className={`h-px w-full origin-left scale-x-0 bg-white/10 transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] delay-[80ms] ${
              menuOpen ? "scale-x-100" : ""
            }`}
          />
          <a
            href="#about"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
            className={`block w-full py-[18px] font-[montserrat] text-[clamp(28px,7vw,40px)] font-semibold tracking-[-0.5px] text-mybeige no-underline transition-[opacity,transform,color] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] after:float-right after:text-[28px] after:font-light after:opacity-35 after:content-['›'] after:transition-opacity after:duration-200 hover:text-mybeige hover:after:opacity-75 ${
              menuOpen
                ? "translate-y-0 opacity-100 delay-[100ms]"
                : "translate-y-0 opacity-0"
            }`}
          >
            about
          </a>
          <div
            className={`h-px w-full origin-left scale-x-0 bg-white/10 transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] delay-[130ms] ${
              menuOpen ? "scale-x-100" : ""
            }`}
          />
          <a
            href="#contact"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
            className={`block w-full py-[18px] font-[montserrat] text-[clamp(28px,7vw,40px)] font-semibold tracking-[-0.5px] text-mybeige no-underline transition-[opacity,transform,color] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] after:float-right after:text-[28px] after:font-light after:opacity-35 after:content-['›'] after:transition-opacity after:duration-200 hover:text-mybeige hover:after:opacity-75 ${
              menuOpen
                ? "translate-y-0 opacity-100 delay-[150ms]"
                : "translate-y-0 opacity-0"
            }`}
          >
            contact
          </a>
          <div
            className={`h-px w-full origin-left scale-x-0 bg-white/10 transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] delay-[180ms] ${
              menuOpen ? "scale-x-100" : ""
            }`}
          />
        </nav>
      </div>
    </>
  );
}

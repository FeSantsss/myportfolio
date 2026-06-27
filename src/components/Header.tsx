"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Referências para controlar os elementos com GSAP
  const headerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const timelineMenu = useRef<gsap.core.Timeline | null>(null);

  // 1. Controle do Scroll (Mudança de tamanho do container)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Acessibilidade e Bloqueio de Scroll
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  useGSAP(
    () => {
      // A. Animação de entrada do próprio Header quando a página monta
      gsap.from(".header-container", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      // B. Criando a Linha do Tempo para o Menu Mobile (Começa pausada)
      const tl = gsap.timeline({ paused: true });

      tl.to(".menu-bg", {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      })
        .to(
          ".menu-divider",
          {
            scaleX: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.inOut",
          },
          "-=0.2", // Overlap para iniciar junto com o fundo
        )
        .from(
          ".menu-link",
          {
            y: 25,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.4", // Faz os links subirem enquanto as linhas se expandem
        );

      // Guardamos a referência da timeline para controlar no clique do botão
      timelineMenu.current = tl;
    },
    { scope: headerRef },
  );

  // ⚙️ Ativa/Reverte a timeline do GSAP baseada no estado do React
  useEffect(() => {
    if (!timelineMenu.current) return;

    if (menuOpen) {
      timelineMenu.current.play();
    } else {
      timelineMenu.current.reverse();
    }
  }, [menuOpen]);

  const navLinkClass =
    "group relative whitespace-nowrap font-[montserrat] text-[13px] font-medium text-mybeige opacity-40 no-underline transition-opacity duration-500 ease-out hover:opacity-100 md:text-lg lg:text-xl";

  const navUnderlineClass =
    "absolute -bottom-1 left-0 h-px w-0 bg-white/90 transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:w-full";

  return (
    <div ref={headerRef}>
      {/* HEADER PRINCIPAL */}
      <header className="header-container fixed top-0 left-0 right-0 z-[1000] max-w-[1900px] lg:mx-auto px-4 pt-3 transition-[padding] duration-300 ease-out md:px-5 md:pt-4 lg:px-3.5 lg:pt-5">
        <div
          className={`relative isolate mx-auto flex h-11 items-center justify-between rounded-[25px] bg-black/40 px-4 backdrop-blur-[20px] backdrop-saturate-[180%] shadow-[0_4px_24px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)] [transform:translateZ(0)] transition-[width] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[width] md:h-[50px] md:rounded-[25px] md:px-5 lg:h-14 lg:rounded-[28px] lg:px-11 ${
            scrolled
              ? "w-4/5 md:w-[70%] lg:w-1/2"
              : "w-[90%] md:w-[85%] lg:w-[85%]"
          }`}
        >
          <a href="#" className="no-underline">
            <span
              className="inline-block font-[chillax] font-medium tracking-[-1.2px] duration-700 text-mywhite no-underline lg:text-[19px] hover:opacity-80"
              translate="no"
            >
              @felipysantsss
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 md:flex lg:gap-8">
            <a translate="no" href="#work" className={navLinkClass}>
              work
              <span className={navUnderlineClass} />
            </a>
            <a translate="no" href="#about" className={navLinkClass}>
              about
              <span className={navUnderlineClass} />
            </a>
            <a translate="no" href="#contact" className={navLinkClass}>
              contact
              <span className={navUnderlineClass} />
            </a>
          </nav>

          {/* Burger Button */}
          <button
            type="button"
            className="relative z-[1010] flex h-8 w-8 items-center cursor-pointer justify-center border-none bg-transparent p-1 md:hidden"
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

      {/* FULL SCREEN MOBILE MENU */}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-[999] flex flex-col overflow-hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
        inert={!menuOpen ? true : undefined}
      >
        {/* Fundo do Menu Animado pelo GSAP */}
        <div
          className="menu-bg absolute inset-0 bg-[rgba(0,0,0,0.907)] opacity-0 backdrop-blur-3xl backdrop-saturate-[180%]"
          onClick={closeMenu}
        />

        <nav className="relative z-[1] flex h-full flex-col justify-center px-11 py-15 pt-20">
          <div className="menu-divider h-px w-full origin-left scale-x-0 bg-white/10" />
          <a
            href="#work"
            translate="no"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
            className="menu-link block w-full py-[18px] font-[montserrat] text-[clamp(28px,7vw,40px)] font-semibold tracking-[-0.5px] text-mybeige no-underline transition-colors duration-300 after:float-right after:text-[28px] after:font-light after:opacity-35 after:content-['›'] after:transition-opacity after:duration-200 hover:text-mybeige hover:after:opacity-75"
          >
            work
          </a>

          <div className="menu-divider h-px w-full origin-left scale-x-0 bg-white/10" />
          <a
            href="#about"
            translate="no"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
            className="menu-link block w-full py-[18px] font-[montserrat] text-[clamp(28px,7vw,40px)] font-semibold tracking-[-0.5px] text-mybeige no-underline transition-colors duration-300 after:float-right after:text-[28px] after:font-light after:opacity-35 after:content-['›'] after:transition-opacity after:duration-200 hover:text-mybeige hover:after:opacity-75"
          >
            about
          </a>

          <div className="menu-divider h-px w-full origin-left scale-x-0 bg-white/10" />
          <a
            href="#contact"
            translate="no"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
            className="menu-link block w-full py-[18px] font-[montserrat] text-[clamp(28px,7vw,40px)] font-semibold tracking-[-0.5px] text-mybeige no-underline transition-colors duration-300 after:float-right after:text-[28px] after:font-light after:opacity-35 after:content-['›'] after:transition-opacity after:duration-200 hover:text-mybeige hover:after:opacity-75"
          >
            contact
          </a>

          <div className="menu-divider h-px w-full origin-left scale-x-0 bg-white/10" />
        </nav>
      </div>
    </div>
  );
}

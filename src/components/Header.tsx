"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import styles from "../assets/header.module.css";

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;

      // Adiciona classe 'scrolled' quando scroll > 50px
      if (window.scrollY > 50) {
        headerRef.current.classList.add("scrolled");
      } else {
        headerRef.current.classList.remove("scrolled");
      }
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

  return (
    <>
      <header ref={headerRef}>
        <div className={styles.headerContent}>
          <a href="#">
            <span className={styles.headerIcon} translate="no">
              @felipysantsss
            </span>
          </a>

          {/* Desktop nav */}
          <nav className={styles.headerLinks}>
            <a href="#work">work</a>
            <a href="#about">about</a>
            <a href="#contact">contact</a>
          </nav>

          {/* Burger — mobile only */}
          <button
            className={`${styles.burgerBtn}${menuOpen ? ` ${styles.open}` : ""}`}
            onClick={toggleMenu}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            <span className={styles.line1} />
            <span className={styles.line2} />
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        className={`${styles.mobileMenu}${menuOpen ? ` ${styles.open}` : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileMenuBackdrop} onClick={closeMenu} />
        <nav className={styles.mobileMenuNav}>
          <div className={styles.navSep} />
          <a href="#work" onClick={closeMenu}>
            work
          </a>
          <div className={styles.navSep} />
          <a href="#about" onClick={closeMenu}>
            about
          </a>
          <div className={styles.navSep} />
          <a href="#contact" onClick={closeMenu}>
            contact
          </a>
          <div className={styles.navSep} />
        </nav>
      </div>
    </>
  );
}

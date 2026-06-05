"use client";

import { useRef } from "react";
import styles from "../assets/marquee.module.css";

const items = [
  "NEXT.JS",
  "TYPESCRIPT",
  "JAVA",
  "SPRING BOOT",
  "FAST WEB APPLICATIONS",
  "SCALABLE SYSTEMS",
  "MODERN WEB PRODUCTS",
  "AVAILABLE FOR PROJECTS",
  "REMOTE WORLDWIDE",
  "PERFORMANCE",
  "USER EXPERIENCE",
  "CLEAN ARCHITECTURE",
  "WEB SYSTEMS",
  "RELIABLE SOFTWARE",
];

export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  return (
    <div className={styles.marqueeWrapper}>
      <div className={styles.marqueeTrack} ref={trackRef}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className={styles.marqueeItem}>
            <span className={styles.marqueeSep}> • </span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

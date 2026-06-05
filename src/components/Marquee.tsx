"use client";

import { useRef } from "react";
import "../assets/marquee.css";

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
    <div className="marquee-wrapper">
      <div className="marquee-track" ref={trackRef}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-sep"> • </span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

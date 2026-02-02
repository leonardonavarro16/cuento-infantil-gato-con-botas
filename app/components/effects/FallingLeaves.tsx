"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface FallingLeavesProps {
  count?: number;
  colors?: string[];
}

export default function FallingLeaves({
  count = 20,
  colors = ["#8B4513", "#D2691E", "#CD853F", "#DEB887", "#228B22"],
}: FallingLeavesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const leaf = document.createElement("div");
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 15 + 10;

      leaf.innerHTML = `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
        </svg>
      `;

      leaf.className = "absolute";
      leaf.style.left = `${Math.random() * 100}%`;
      leaf.style.top = `-${size}px`;

      container.appendChild(leaf);

      // Animacion de caida con movimiento lateral
      const duration = Math.random() * 4 + 4;
      const xMovement = (Math.random() - 0.5) * 200;

      gsap.to(leaf, {
        y: window.innerHeight + size,
        x: xMovement,
        rotation: Math.random() * 720 - 360,
        duration,
        delay: Math.random() * 5,
        repeat: -1,
        ease: "sine.inOut",
      });
    }

    return () => {
      gsap.killTweensOf(container.children);
    };
  }, [count, colors]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    />
  );
}

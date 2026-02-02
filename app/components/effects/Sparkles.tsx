"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface SparklesProps {
  count?: number;
  colors?: string[];
}

export default function Sparkles({
  count = 30,
  colors = ["#FFD700", "#FFA500", "#FFFF00", "#FFFFFF"],
}: SparklesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement("div");
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 8 + 4;

      sparkle.innerHTML = `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
          <path d="M12,2L14.5,9.5L22,12L14.5,14.5L12,22L9.5,14.5L2,12L9.5,9.5L12,2Z"/>
        </svg>
      `;

      sparkle.className = "absolute opacity-0";
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;

      container.appendChild(sparkle);

      // Animacion de brillo parpadeante
      gsap.to(sparkle, {
        opacity: 1,
        scale: 1.5,
        duration: Math.random() * 0.5 + 0.3,
        delay: Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });

      // Movimiento sutil
      gsap.to(sparkle, {
        y: -20,
        x: (Math.random() - 0.5) * 30,
        duration: Math.random() * 2 + 2,
        repeat: -1,
        yoyo: true,
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

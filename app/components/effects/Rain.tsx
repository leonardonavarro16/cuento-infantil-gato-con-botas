"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface RainProps {
  intensity?: "light" | "medium" | "heavy";
}

export default function Rain({ intensity = "medium" }: RainProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const dropCounts = {
    light: 50,
    medium: 100,
    heavy: 200,
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Limpiar gotas anteriores
    container.innerHTML = "";

    const dropCount = dropCounts[intensity];

    for (let i = 0; i < dropCount; i++) {
      const drop = document.createElement("div");
      drop.className = "absolute bg-blue-300/60 rounded-full";

      // Tamaño aleatorio de las gotas
      const width = Math.random() * 2 + 1;
      const height = Math.random() * 15 + 10;

      drop.style.width = `${width}px`;
      drop.style.height = `${height}px`;
      drop.style.left = `${Math.random() * 100}%`;
      drop.style.top = `-${height}px`;

      container.appendChild(drop);

      // Animacion de caida
      gsap.to(drop, {
        y: window.innerHeight + height,
        duration: Math.random() * 0.5 + 0.5,
        delay: Math.random() * 2,
        repeat: -1,
        ease: "none",
      });
    }

    return () => {
      gsap.killTweensOf(container.children);
    };
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    />
  );
}

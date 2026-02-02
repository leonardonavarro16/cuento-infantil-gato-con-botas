"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LightningProps {
  frequency?: number; // segundos entre rayos
}

export default function Lightning({ frequency = 5 }: LightningProps) {
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const flash = flashRef.current;
    if (!flash) return;

    const triggerLightning = () => {
      // Flash rapido
      gsap
        .timeline()
        .to(flash, { opacity: 0.8, duration: 0.05 })
        .to(flash, { opacity: 0, duration: 0.05 })
        .to(flash, { opacity: 0.6, duration: 0.05 })
        .to(flash, { opacity: 0, duration: 0.1 })
        .to(flash, { opacity: 0.4, duration: 0.05 })
        .to(flash, { opacity: 0, duration: 0.2 });
    };

    // Intervalo aleatorio para los rayos
    const scheduleNextLightning = () => {
      const randomDelay = frequency * 1000 + Math.random() * 3000;
      setTimeout(() => {
        triggerLightning();
        scheduleNextLightning();
      }, randomDelay);
    };

    scheduleNextLightning();
    triggerLightning(); // Primer rayo inmediato

    return () => {
      gsap.killTweensOf(flash);
    };
  }, [frequency]);

  return (
    <div
      ref={flashRef}
      className="absolute inset-0 pointer-events-none bg-white opacity-0 z-50"
    />
  );
}

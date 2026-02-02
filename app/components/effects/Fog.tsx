"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface FogProps {
  intensity?: "light" | "medium" | "heavy";
  color?: string;
}

export default function Fog({
  intensity = "medium",
  color = "rgba(255, 255, 255, 0.6)",
}: FogProps) {
  const fogRef = useRef<HTMLDivElement>(null);

  const opacityMap = {
    light: 0.3,
    medium: 0.5,
    heavy: 0.7,
  };

  useEffect(() => {
    const fog = fogRef.current;
    if (!fog) return;

    // Animacion continua de la niebla
    gsap.to(fog, {
      x: "10%",
      duration: 8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    gsap.to(fog, {
      opacity: opacityMap[intensity] * 0.7,
      duration: 4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, [intensity]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        ref={fogRef}
        className="absolute inset-0 w-[120%] h-full -left-[10%]"
        style={{
          background: `
            radial-gradient(ellipse 100% 100% at 50% 100%, ${color} 0%, transparent 70%),
            radial-gradient(ellipse 80% 50% at 20% 80%, ${color} 0%, transparent 60%),
            radial-gradient(ellipse 80% 50% at 80% 70%, ${color} 0%, transparent 60%)
          `,
          opacity: opacityMap[intensity],
        }}
      />
    </div>
  );
}

"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Section, DialogBubble, Narrator } from "../ui";

export default function Section4River() {
  const waterRef = useRef<HTMLDivElement>(null);
  const rippleContainerRef = useRef<HTMLDivElement>(null);
  const masterRef = useRef<HTMLDivElement>(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const water = waterRef.current;
    if (!water) return;

    // Animacion continua del agua
    gsap.to(water, {
      backgroundPosition: "200% 0",
      duration: 3,
      ease: "none",
      repeat: -1,
    });

    // Mostrar dialogo al entrar
    const trigger = gsap.timeline({
      scrollTrigger: {
        trigger: water,
        start: "top 50%",
        onEnter: () => setShowDialog(true),
        onLeaveBack: () => setShowDialog(false),
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const handleWaterTouch = (e: React.MouseEvent | React.TouchEvent) => {
    const container = rippleContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    let x, y;

    if ("touches" in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    // Crear onda
    const ripple = document.createElement("div");
    ripple.className =
      "absolute w-4 h-4 border-2 border-white/50 rounded-full pointer-events-none";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.transform = "translate(-50%, -50%)";
    container.appendChild(ripple);

    gsap.to(ripple, {
      width: 100,
      height: 100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      onComplete: () => ripple.remove(),
    });
  };

  return (
    <Section
      id="river"
      className="bg-gradient-to-b from-sky-400 via-sky-500 to-blue-600"
    >
      {/* Cielo */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-sky-300 to-sky-400" />

      {/* Orilla */}
      <div className="absolute bottom-[40%] left-0 w-full h-8 bg-amber-600" />

      {/* Agua interactiva */}
      <div
        ref={waterRef}
        className="absolute bottom-0 left-0 w-full h-[40%] cursor-pointer"
        style={{
          background:
            "linear-gradient(90deg, #1e40af 0%, #3b82f6 25%, #1e40af 50%, #3b82f6 75%, #1e40af 100%)",
          backgroundSize: "200% 100%",
        }}
        onClick={handleWaterTouch}
        onTouchStart={handleWaterTouch}
      >
        <div
          ref={rippleContainerRef}
          className="absolute inset-0 overflow-hidden"
        />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/70 text-sm">
          Toca el agua
        </span>
      </div>

      {showDialog && (
        <DialogBubble
          text="¡Socorro! ¡Han robado la ropa del Marques de Carabas!"
          position="left"
          character="Gato"
          delay={0.3}
        />
      )}

      {/* Amo en el agua */}
      <div
        ref={masterRef}
        className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-24 h-32 md:w-32 md:h-40 bg-amber-200/60 rounded-lg flex items-center justify-center"
      >
        <span className="text-amber-900 text-center text-xs p-1">
          [Amo en agua]
        </span>
      </div>

      <Narrator text="El astuto gato hizo que su amo se banara en el rio, justo cuando pasaba el carruaje del Rey." />
    </Section>
  );
}

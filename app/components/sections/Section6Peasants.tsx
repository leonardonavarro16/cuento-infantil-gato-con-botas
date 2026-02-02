"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Section, DialogBubble, Narrator } from "../ui";

export default function Section6Peasants() {
  const wheatFieldRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wheatField = wheatFieldRef.current;
    if (!wheatField) return;

    // Animacion continua del trigo meciendose
    gsap.to(wheatField.children, {
      skewX: 5,
      duration: 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.1,
    });
  }, []);

  const handleWheatTouch = () => {
    const wheatField = wheatFieldRef.current;
    if (!wheatField) return;

    // Agitar el trigo mas fuerte
    gsap.to(wheatField.children, {
      skewX: 15,
      duration: 0.3,
      ease: "power2.out",
      yoyo: true,
      repeat: 3,
      stagger: 0.05,
    });
  };

  return (
    <Section
      id="peasants"
      className="bg-gradient-to-b from-sky-400 via-sky-300 to-amber-400"
    >
      {/* Cielo */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-sky-400 to-sky-300" />

      {/* Campo de trigo interactivo */}
      <div
        ref={wheatFieldRef}
        className="absolute bottom-0 left-0 w-full h-[50%] cursor-pointer overflow-hidden"
        onClick={handleWheatTouch}
        onTouchStart={handleWheatTouch}
      >
        {/* Tallos de trigo */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-full"
            style={{
              left: `${(i / 30) * 100}%`,
              width: "4%",
              height: `${60 + Math.random() * 30}%`,
              transformOrigin: "bottom center",
            }}
          />
        ))}
        <span className="absolute bottom-[60%] left-1/2 -translate-x-1/2 text-white/80 text-sm z-10">
          Toca el trigo
        </span>
      </div>

      {/* Gato */}
      <div
        ref={catRef}
        className="absolute bottom-[45%] left-[10%] w-28 h-36 md:w-36 md:h-44 bg-orange-500/60 rounded-lg flex items-center justify-center z-10"
      >
        <span className="text-white text-center text-xs p-2">
          [Gato]
        </span>
      </div>

      <DialogBubble
        text="¡Estas tierras son del Marques de Carabas!"
        position="left"
        character="Gato"
        delay={0.5}
      />

      {/* Campesinos */}
      <div className="absolute bottom-[45%] right-[10%] md:right-[15%] flex gap-2 z-10">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-16 h-24 md:w-20 md:h-28 bg-amber-700/60 rounded-lg flex items-center justify-center"
          >
            <span className="text-white text-xs">[Camp. {i}]</span>
          </div>
        ))}
      </div>

      <Narrator text="El gato corrio adelante y convencio a los campesinos de decir que las tierras pertenecian al Marques." />
    </Section>
  );
}

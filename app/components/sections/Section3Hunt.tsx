"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Section, Narrator } from "../ui";
import { FallingLeaves } from "../effects";

export default function Section3Hunt() {
  const bushRef = useRef<HTMLDivElement>(null);
  const rabbitRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const [rabbitVisible, setRabbitVisible] = useState(false);

  useEffect(() => {
    const cat = catRef.current;
    if (!cat) return;

    gsap.from(cat, {
      x: -300,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: cat,
        start: "top 80%",
      },
    });
  }, []);

  const handleBushClick = () => {
    const bush = bushRef.current;
    const rabbit = rabbitRef.current;

    if (!bush || !rabbit) return;

    // Agitar arbusto
    gsap.to(bush, {
      rotation: 5,
      duration: 0.1,
      yoyo: true,
      repeat: 5,
      onComplete: () => {
        setRabbitVisible(true);
        // Conejo salta
        gsap.fromTo(
          rabbit,
          { y: 50, opacity: 0, scale: 0.5 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }
        );
      },
    });
  };

  return (
    <Section
      id="hunt"
      className="bg-gradient-to-b from-green-800 via-green-700 to-green-600"
    >
      <FallingLeaves count={15} />

      {/* Arboles de fondo */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-[5%] w-16 h-48 bg-green-900/70 rounded-t-full" />
        <div className="absolute bottom-0 left-[20%] w-20 h-56 bg-green-800/70 rounded-t-full" />
        <div className="absolute bottom-0 right-[10%] w-24 h-64 bg-green-900/70 rounded-t-full" />
        <div className="absolute bottom-0 right-[30%] w-18 h-52 bg-green-800/70 rounded-t-full" />
      </div>

      {/* Arbusto interactivo */}
      <div
        ref={bushRef}
        className="absolute bottom-[20%] right-[20%] w-32 h-24 md:w-40 md:h-32 bg-green-600 rounded-full cursor-pointer hover:bg-green-500 transition-colors flex items-center justify-center"
        onClick={handleBushClick}
        onTouchStart={handleBushClick}
      >
        <span className="text-white text-xs text-center">
          ¡Toca el arbusto!
        </span>
      </div>

      {/* Conejo que aparece */}
      <div
        ref={rabbitRef}
        className={`absolute bottom-[35%] right-[22%] w-16 h-20 md:w-20 md:h-24 bg-gray-300 rounded-lg flex items-center justify-center ${
          rabbitVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-gray-700 text-xs text-center">
          [Conejo]
        </span>
      </div>

      {/* Gato cazando */}
      <div
        ref={catRef}
        className="absolute bottom-[10%] left-[10%] md:left-[20%] w-36 h-44 md:w-48 md:h-56 bg-orange-500/60 rounded-lg flex items-center justify-center"
      >
        <span className="text-white text-center text-sm p-2">
          [Gato con saco]
          <br />
          <span className="text-xs opacity-70">cat-hunting.jpg</span>
        </span>
      </div>

      <Narrator text="El gato cazo conejos y perdices, y los llevo al Rey como regalo del Marques de Carabas." />
    </Section>
  );
}

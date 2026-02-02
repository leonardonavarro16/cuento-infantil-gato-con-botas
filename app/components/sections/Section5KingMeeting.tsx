"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Section, Narrator } from "../ui";

export default function Section5KingMeeting() {
  const sunRaysRef = useRef<HTMLDivElement>(null);
  const princessRef = useRef<HTMLDivElement>(null);
  const masterRef = useRef<HTMLDivElement>(null);
  const [princessBlushing, setPrincessBlushing] = useState(false);

  useEffect(() => {
    const sunRays = sunRaysRef.current;
    if (!sunRays) return;

    // Animacion de rayos de sol girando
    gsap.to(sunRays, {
      rotation: 360,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    // Entrada de personajes
    if (masterRef.current) {
      gsap.from(masterRef.current, {
        x: 300,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: masterRef.current,
          start: "top 80%",
        },
      });
    }

    if (princessRef.current) {
      gsap.from(princessRef.current, {
        x: -300,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: princessRef.current,
          start: "top 80%",
        },
      });
    }
  }, []);

  const handlePrincessHover = () => {
    setPrincessBlushing(true);
    if (princessRef.current) {
      gsap.to(princessRef.current, {
        scale: 1.1,
        duration: 0.3,
      });
    }
  };

  const handlePrincessLeave = () => {
    setPrincessBlushing(false);
    if (princessRef.current) {
      gsap.to(princessRef.current, {
        scale: 1,
        duration: 0.3,
      });
    }
  };

  return (
    <Section
      id="king-meeting"
      className="bg-gradient-to-b from-yellow-300 via-amber-400 to-orange-400"
    >
      {/* Rayos de sol */}
      <div
        ref={sunRaysRef}
        className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[200%] h-[200%] opacity-30 pointer-events-none"
        style={{
          background:
            "repeating-conic-gradient(from 0deg, transparent 0deg 10deg, rgba(255,255,255,0.3) 10deg 20deg)",
        }}
      />

      {/* Sol */}
      <div className="absolute top-[5%] right-[10%] w-24 h-24 md:w-32 md:h-32 bg-yellow-200 rounded-full shadow-lg shadow-yellow-400/50" />

      {/* Camino */}
      <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-amber-700 to-amber-600" />

      {/* Princesa */}
      <div
        ref={princessRef}
        className={`absolute bottom-[25%] left-[15%] md:left-[25%] w-32 h-44 md:w-40 md:h-52 rounded-lg flex items-center justify-center cursor-pointer transition-all ${
          princessBlushing ? "bg-pink-400/70" : "bg-pink-300/60"
        }`}
        onMouseEnter={handlePrincessHover}
        onMouseLeave={handlePrincessLeave}
        onTouchStart={handlePrincessHover}
        onTouchEnd={handlePrincessLeave}
      >
        <span className="text-white text-center text-sm p-2">
          [Princesa]
          <br />
          <span className="text-xs opacity-70">princess.jpg</span>
          {princessBlushing && (
            <span className="block text-xs mt-1">sonrojada</span>
          )}
        </span>
      </div>

      {/* Amo elegante */}
      <div
        ref={masterRef}
        className="absolute bottom-[25%] right-[15%] md:right-[25%] w-32 h-44 md:w-40 md:h-52 bg-purple-500/60 rounded-lg flex items-center justify-center"
      >
        <span className="text-white text-center text-sm p-2">
          [Amo elegante]
          <br />
          <span className="text-xs opacity-70">master-elegant.jpg</span>
        </span>
      </div>

      <Narrator text="El Rey, impresionado, vistio al joven con ropas elegantes. La princesa quedo encantada con el apuesto Marques." />
    </Section>
  );
}

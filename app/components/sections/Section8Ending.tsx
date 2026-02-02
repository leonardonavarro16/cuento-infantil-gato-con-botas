"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Section, Narrator } from "../ui";
import { Sparkles } from "../effects";

export default function Section8Ending() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const charactersRef = useRef<HTMLDivElement>(null);
  const confettiRef = useRef<HTMLDivElement>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const title = titleRef.current;
    const characters = charactersRef.current;

    if (title) {
      gsap.from(title, {
        scale: 0,
        rotation: -180,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          onEnter: () => setShowConfetti(true),
        },
      });
    }

    if (characters) {
      gsap.from(characters.children, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: characters,
          start: "top 80%",
        },
      });
    }
  }, []);

  const createConfetti = () => {
    const container = confettiRef.current;
    if (!container) return;

    const colors = [
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#ffff00",
      "#ff00ff",
      "#00ffff",
      "#ffa500",
      "#ff69b4",
    ];

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div");
      const color = colors[Math.floor(Math.random() * colors.length)];

      confetti.className = "absolute w-3 h-3 rounded-sm";
      confetti.style.backgroundColor = color;
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = "-20px";

      container.appendChild(confetti);

      gsap.to(confetti, {
        y: window.innerHeight + 20,
        x: (Math.random() - 0.5) * 200,
        rotation: Math.random() * 720,
        duration: Math.random() * 2 + 2,
        delay: Math.random() * 0.5,
        ease: "power1.out",
        onComplete: () => confetti.remove(),
      });
    }
  };

  useEffect(() => {
    if (showConfetti) {
      createConfetti();
      const interval = setInterval(createConfetti, 2000);
      return () => clearInterval(interval);
    }
  }, [showConfetti]);

  return (
    <Section
      id="ending"
      className="bg-gradient-to-b from-pink-400 via-purple-400 to-indigo-500"
    >
      <Sparkles count={40} />

      {/* Confetti */}
      <div
        ref={confettiRef}
        className="absolute inset-0 pointer-events-none overflow-hidden z-20"
      />

      {/* Castillo de fondo */}
      <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-[80%] max-w-lg">
        <div className="relative">
          {/* Torres */}
          <div className="absolute -left-4 -top-20 w-12 h-32 bg-gray-300 rounded-t-full" />
          <div className="absolute -right-4 -top-20 w-12 h-32 bg-gray-300 rounded-t-full" />
          {/* Cuerpo principal */}
          <div className="w-full h-24 bg-gray-200 rounded-t-lg" />
          {/* Puerta */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-20 bg-amber-700 rounded-t-full" />
        </div>
      </div>

      {/* Titulo Fin */}
      <h2
        ref={titleRef}
        className="absolute top-[8%] left-1/2 -translate-x-1/2 text-5xl md:text-8xl font-bold text-yellow-300 z-10"
        style={{
          textShadow: "4px 4px 8px rgba(0,0,0,0.5)",
          fontFamily: "serif",
        }}
      >
        ¡Fin!
      </h2>

      {/* Personajes finales */}
      <div
        ref={charactersRef}
        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 flex gap-4 md:gap-8 z-10"
      >
        {/* Gato */}
        <div className="w-24 h-32 md:w-32 md:h-40 bg-orange-500/70 rounded-lg flex items-center justify-center">
          <span className="text-white text-center text-xs p-1">
            [Gato feliz]
          </span>
        </div>

        {/* Pareja */}
        <div className="w-32 h-40 md:w-44 md:h-52 bg-gradient-to-r from-purple-500/70 to-pink-400/70 rounded-lg flex items-center justify-center">
          <span className="text-white text-center text-xs p-1">
            [Pareja feliz]
          </span>
        </div>

        {/* Rey */}
        <div className="w-24 h-32 md:w-32 md:h-40 bg-yellow-500/70 rounded-lg flex items-center justify-center">
          <span className="text-white text-center text-xs p-1">[Rey]</span>
        </div>
      </div>

      {/* Boton reiniciar */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-full shadow-lg transition-colors z-30"
      >
        Volver al inicio
      </button>

      <Narrator text="Y asi, el hijo del molinero se convirtio en Marques, se caso con la princesa, y el gato con botas vivio feliz para siempre." />
    </Section>
  );
}

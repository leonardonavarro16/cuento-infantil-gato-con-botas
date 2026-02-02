"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Section, Narrator } from "../ui";
import { Fog } from "../effects";

export default function Section1Intro() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const masterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const cat = catRef.current;
    const master = masterRef.current;

    if (title) {
      // Animacion del titulo
      gsap.from(title, {
        y: -100,
        opacity: 0,
        duration: 1.5,
        ease: "bounce.out",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
        },
      });
    }

    if (cat) {
      gsap.from(cat, {
        x: -200,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cat,
          start: "top 80%",
        },
      });
    }

    if (master) {
      gsap.from(master, {
        x: 200,
        opacity: 0,
        duration: 1,
        delay: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: master,
          start: "top 80%",
        },
      });
    }
  }, []);

  return (
    <Section
      id="intro"
      className="bg-gradient-to-b from-gray-600 via-gray-500 to-amber-900"
    >
      <Fog intensity="heavy" color="rgba(200, 200, 200, 0.5)" />

      {/* Titulo principal */}
      <h1
        ref={titleRef}
        className="absolute top-[10%] left-1/2 -translate-x-1/2 text-4xl md:text-7xl font-bold text-amber-400 text-center z-10"
        style={{
          textShadow: "3px 3px 6px rgba(0,0,0,0.7)",
          fontFamily: "serif",
        }}
      >
        El Gato con Botas
      </h1>

      {/* Gato triste - placeholder hasta que tengas la imagen */}
      <div
        ref={catRef}
        className="absolute bottom-[15%] left-[15%] md:left-[25%] w-32 h-40 md:w-48 md:h-60 bg-amber-700/50 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
        onClick={() => {
          gsap.to(catRef.current, {
            rotation: 10,
            duration: 0.2,
            yoyo: true,
            repeat: 3,
          });
        }}
      >
        <span className="text-white text-center text-sm p-2">
          [Gato triste]
          <br />
          <span className="text-xs opacity-70">cat-sad.jpg</span>
        </span>
      </div>

      {/* Amo pobre - placeholder */}
      <div
        ref={masterRef}
        className="absolute bottom-[15%] right-[15%] md:right-[25%] w-32 h-40 md:w-48 md:h-60 bg-amber-800/50 rounded-lg flex items-center justify-center"
      >
        <span className="text-white text-center text-sm p-2">
          [Amo pobre]
          <br />
          <span className="text-xs opacity-70">master-poor.jpg</span>
        </span>
      </div>

      <Narrator text="Habia una vez un molinero que, al morir, dejo a su hijo menor solo un gato..." />
    </Section>
  );
}

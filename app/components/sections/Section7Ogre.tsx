"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Section, DialogBubble, Narrator } from "../ui";
import { Lightning, Rain } from "../effects";

export default function Section7Ogre() {
  const ogreRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const [ogreState, setOgreState] = useState<"ogre" | "transforming" | "mouse">(
    "ogre"
  );
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    // Mostrar dialogo al entrar
    const timer = setTimeout(() => setShowDialog(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleOgreClick = () => {
    if (ogreState !== "ogre") return;

    const ogre = ogreRef.current;
    const mouse = mouseRef.current;
    const cat = catRef.current;

    if (!ogre || !mouse || !cat) return;

    setOgreState("transforming");

    // Animacion de transformacion
    gsap
      .timeline()
      .to(ogre, {
        scale: 1.3,
        duration: 0.3,
        ease: "power2.out",
      })
      .to(ogre, {
        scale: 0.1,
        rotation: 720,
        duration: 0.8,
        ease: "power4.in",
        onComplete: () => setOgreState("mouse"),
      })
      .to(
        mouse,
        {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(2)",
        },
        "-=0.2"
      )
      .to(
        cat,
        {
          x: 100,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.1"
      )
      .to(mouse, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        delay: 0.5,
      });
  };

  return (
    <Section
      id="ogre"
      className="bg-gradient-to-b from-gray-800 via-gray-700 to-gray-900"
    >
      <Rain intensity="medium" />
      <Lightning frequency={4} />

      {/* Interior castillo oscuro */}
      <div className="absolute inset-0">
        {/* Ventanas con rayos */}
        <div className="absolute top-[20%] left-[10%] w-16 h-24 bg-gray-600/50 rounded-t-lg" />
        <div className="absolute top-[20%] right-[10%] w-16 h-24 bg-gray-600/50 rounded-t-lg" />
        {/* Antorchas */}
        <div className="absolute top-[30%] left-[25%] w-4 h-12 bg-orange-500/80 rounded-full blur-sm animate-pulse" />
        <div className="absolute top-[30%] right-[25%] w-4 h-12 bg-orange-500/80 rounded-full blur-sm animate-pulse" />
      </div>

      {showDialog && ogreState === "ogre" && (
        <DialogBubble
          text="¿Que puedes convertirte en cualquier animal? ¡No te creo! ¿Puedes ser un raton?"
          position="right"
          character="Gato"
          delay={0.3}
        />
      )}

      {/* Ogro */}
      <div
        ref={ogreRef}
        className={`absolute bottom-[15%] left-[20%] md:left-[30%] w-40 h-56 md:w-52 md:h-72 bg-green-700/70 rounded-lg flex items-center justify-center cursor-pointer transition-all hover:bg-green-600/70 ${
          ogreState !== "ogre" ? "pointer-events-none" : ""
        }`}
        onClick={handleOgreClick}
        onTouchStart={handleOgreClick}
        style={{
          opacity: ogreState === "mouse" ? 0 : 1,
        }}
      >
        <span className="text-white text-center text-sm p-2">
          [Ogro]
          <br />
          <span className="text-xs opacity-70">ogre.png</span>
          <br />
          <span className="text-xs mt-2 block">¡Toca para transformar!</span>
        </span>
      </div>

      {/* Raton (aparece despues de la transformacion) */}
      <div
        ref={mouseRef}
        className="absolute bottom-[20%] left-[35%] md:left-[40%] w-12 h-12 bg-gray-400/70 rounded-full flex items-center justify-center"
        style={{ opacity: 0, scale: 0 }}
      >
        <span className="text-gray-800 text-xs">🐭</span>
      </div>

      {/* Gato */}
      <div
        ref={catRef}
        className="absolute bottom-[15%] right-[15%] md:right-[25%] w-32 h-40 md:w-40 md:h-48 bg-orange-500/60 rounded-lg flex items-center justify-center"
      >
        <span className="text-white text-center text-sm p-2">
          [Gato]
          <br />
          <span className="text-xs opacity-70">cat-heroic.jpg</span>
        </span>
      </div>

      <Narrator
        text={
          ogreState === "mouse"
            ? "¡El ogro cayo en la trampa! El astuto gato se lo comio de un bocado."
            : "El gato llego al castillo del terrible ogro, que podia transformarse en cualquier criatura..."
        }
      />
    </Section>
  );
}

"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Section, DialogBubble, Narrator } from "../ui";

export default function Section2CatTalks() {
  const catRef = useRef<HTMLDivElement>(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const cat = catRef.current;
    if (!cat) return;

    gsap.from(cat, {
      scale: 0,
      rotation: -180,
      duration: 1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: cat,
        start: "top 80%",
        onEnter: () => setShowDialog(true),
        onLeaveBack: () => setShowDialog(false),
      },
    });
  }, []);

  const handleCatClick = () => {
    const cat = catRef.current;
    if (!cat) return;

    // Animacion de hablar
    gsap
      .timeline()
      .to(cat, { scaleY: 1.1, duration: 0.1 })
      .to(cat, { scaleY: 1, duration: 0.1 })
      .to(cat, { scaleY: 1.1, duration: 0.1 })
      .to(cat, { scaleY: 1, duration: 0.1 });
  };

  return (
    <Section
      id="cat-talks"
      className="bg-gradient-to-b from-amber-800 via-amber-700 to-amber-600"
    >
      {/* Fondo interior casa - placeholder */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-amber-900" />
        <div className="absolute top-[20%] right-[10%] w-20 h-32 bg-yellow-200/50 rounded-t-lg" />
      </div>

      {showDialog && (
        <DialogBubble
          text="¡Dame unas botas y un saco, y te hare el hombre mas rico del reino!"
          position="right"
          character="Gato"
          delay={0.5}
        />
      )}

      {/* Gato heroico */}
      <div
        ref={catRef}
        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-40 h-52 md:w-56 md:h-72 bg-orange-500/60 rounded-lg flex items-center justify-center cursor-pointer hover:brightness-110 transition-all"
        onClick={handleCatClick}
        onTouchStart={handleCatClick}
      >
        <span className="text-white text-center text-sm p-2">
          [Gato heroico]
          <br />
          <span className="text-xs opacity-70">cat-heroic.jpg</span>
          <br />
          <span className="text-xs mt-2 block">Toca para hablar</span>
        </span>
      </div>

      <Narrator text="Pero este no era un gato cualquiera... ¡Era un gato que podia hablar!" />
    </Section>
  );
}

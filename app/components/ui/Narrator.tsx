"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface NarratorProps {
  text: string;
  delay?: number;
  className?: string;
}

export default function Narrator({
  text,
  delay = 0,
  className = "",
}: NarratorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const textElement = textRef.current;
    if (!container || !textElement) return;

    // Entrada del contenedor
    gsap.from(container, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });

    // Animacion del texto palabra por palabra
    const words = text.split(" ");
    textElement.innerHTML = words
      .map((word) => `<span class="inline-block opacity-0 mr-2">${word}</span>`)
      .join("");

    const spans = textElement.querySelectorAll("span");
    gsap.to(spans, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      stagger: 0.08,
      delay: delay + 0.3,
      scrollTrigger: {
        trigger: container,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  }, [text, delay]);

  return (
    <div
      ref={containerRef}
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] md:w-[70%] max-w-3xl ${className}`}
    >
      <div className="bg-gradient-to-r from-amber-900/90 to-amber-800/90 backdrop-blur-sm rounded-xl px-6 py-4 md:px-8 md:py-5 shadow-2xl border-2 border-amber-600/50">
        <p
          ref={textRef}
          className="text-white text-lg md:text-2xl font-serif text-center leading-relaxed"
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

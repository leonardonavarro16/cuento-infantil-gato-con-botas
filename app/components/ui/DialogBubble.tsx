"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface DialogBubbleProps {
  text: string;
  position?: "left" | "right";
  character?: string;
  delay?: number;
  className?: string;
}

export default function DialogBubble({
  text,
  position = "left",
  character,
  delay = 0,
  className = "",
}: DialogBubbleProps) {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const bubble = bubbleRef.current;
    const textElement = textRef.current;
    if (!bubble || !textElement) return;

    // Animacion de entrada del bocadillo
    gsap.from(bubble, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      delay,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: bubble,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Animacion del texto letra por letra (efecto maquina de escribir)
    const chars = text.split("");
    textElement.innerHTML = chars
      .map((char) => `<span class="inline-block opacity-0">${char === " " ? "&nbsp;" : char}</span>`)
      .join("");

    const spans = textElement.querySelectorAll("span");
    gsap.to(spans, {
      opacity: 1,
      duration: 0.05,
      stagger: 0.03,
      delay: delay + 0.5,
      scrollTrigger: {
        trigger: bubble,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }, [text, delay]);

  const positionStyles = {
    left: "left-[5%] md:left-[15%]",
    right: "right-[5%] md:right-[15%]",
  };

  const tailPosition = {
    left: "left-8 -bottom-4 border-l-transparent border-r-white border-t-white border-b-transparent",
    right: "right-8 -bottom-4 border-r-transparent border-l-white border-t-white border-b-transparent",
  };

  return (
    <div
      ref={bubbleRef}
      className={`absolute top-[10%] md:top-[15%] ${positionStyles[position]} max-w-[280px] md:max-w-md ${className}`}
    >
      {character && (
        <span className="block text-sm font-bold text-amber-700 mb-1 px-4">
          {character}
        </span>
      )}
      <div className="relative bg-white rounded-2xl px-6 py-4 shadow-lg border-4 border-amber-400">
        <p
          ref={textRef}
          className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed"
        >
          {text}
        </p>
        {/* Cola del bocadillo */}
        <div
          className={`absolute w-0 h-0 border-8 ${tailPosition[position]}`}
        />
      </div>
    </div>
  );
}

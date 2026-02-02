"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface CharacterProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  position?: "left" | "center" | "right";
  className?: string;
  animation?: "fadeIn" | "slideLeft" | "slideRight" | "slideUp" | "bounce";
  delay?: number;
  onClick?: () => void;
  onHover?: () => void;
}

export default function Character({
  src,
  alt,
  width = 300,
  height = 400,
  position = "center",
  className = "",
  animation = "fadeIn",
  delay = 0,
  onClick,
  onHover,
}: CharacterProps) {
  const characterRef = useRef<HTMLDivElement>(null);

  const positionClasses = {
    left: "left-[10%]",
    center: "left-1/2 -translate-x-1/2",
    right: "right-[10%]",
  };

  useEffect(() => {
    const element = characterRef.current;
    if (!element) return;

    const animations = {
      fadeIn: { opacity: 0, duration: 1 },
      slideLeft: { x: -200, opacity: 0, duration: 1 },
      slideRight: { x: 200, opacity: 0, duration: 1 },
      slideUp: { y: 100, opacity: 0, duration: 1 },
      bounce: { y: -50, opacity: 0, duration: 0.8, ease: "bounce.out" },
    };

    gsap.from(element, {
      ...animations[animation],
      delay,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }, [animation, delay]);

  const handleHover = () => {
    if (!characterRef.current) return;

    // Animacion al hover - pequeño rebote
    gsap.to(characterRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });

    onHover?.();
  };

  const handleHoverEnd = () => {
    if (!characterRef.current) return;

    gsap.to(characterRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={characterRef}
      className={`absolute bottom-0 ${positionClasses[position]} ${className}`}
      onClick={onClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
      onTouchStart={handleHover}
      onTouchEnd={handleHoverEnd}
      style={{ cursor: onClick || onHover ? "pointer" : "default" }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-contain select-none pointer-events-none"
        draggable={false}
      />
    </div>
  );
}

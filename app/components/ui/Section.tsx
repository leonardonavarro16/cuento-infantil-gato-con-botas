"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
  id: string;
  children: React.ReactNode;
  background?: string;
  className?: string;
}

export default function Section({
  id,
  children,
  background,
  className = "",
}: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Snap scroll - se detiene en cada sección
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      snap: {
        snapTo: 1,
        duration: { min: 0.2, max: 0.6 },
        ease: "power1.inOut",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative w-screen h-screen overflow-hidden ${className}`}
      style={{
        backgroundImage: background ? `url(${background})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {children}
    </section>
  );
}

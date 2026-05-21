"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: "fadeInUp" | "fadeIn" | "slideLeft" | "slideRight";
  delay?: number;
  threshold?: number;
}

export default function AnimateOnScroll({
  children,
  animation = "fadeInUp",
  delay = 0,
  threshold = 0.15,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const animations: Record<string, { from: React.CSSProperties; to: React.CSSProperties }> = {
    fadeInUp: {
      from: { opacity: 0, transform: "translateY(40px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    slideLeft: {
      from: { opacity: 0, transform: "translateX(-40px)" },
      to: { opacity: 1, transform: "translateX(0)" },
    },
    slideRight: {
      from: { opacity: 0, transform: "translateX(40px)" },
      to: { opacity: 1, transform: "translateX(0)" },
    },
  };

  const anim = animations[animation] ?? animations.fadeInUp;

  return (
    <div
      ref={ref}
      style={{
        ...(visible ? anim.to : anim.from),
        transition: `all 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

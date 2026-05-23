"use client";

import { useEffect, useState, useMemo } from "react";

const STAR_COUNT = 80;

interface Star {
  id: number;
  style: React.CSSProperties;
}

function generateStars(): Star[] {
  return Array.from({ length: STAR_COUNT }, (_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 2.5 + 0.5}px`,
      height: `${Math.random() * 2.5 + 0.5}px`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      opacity: Math.random() * 0.6 + 0.2,
    } as React.CSSProperties,
  }));
}

export function Stars() {
  const [mounted, setMounted] = useState(false);
  const stars = useMemo(() => generateStars(), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 pointer-events-none z-0" />;

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-twinkle"
          style={star.style}
        />
      ))}
    </div>
  );
}

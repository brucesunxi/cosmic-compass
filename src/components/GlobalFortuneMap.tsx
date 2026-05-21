"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

interface RegionData {
  name: string;
  x: number;
  y: number;
  energy: "high" | "medium" | "low";
  topTheme: string;
  color: string;
}

const regions: RegionData[] = [
  { name: "North America", x: 18, y: 30, energy: "high", topTheme: "Love & Career", color: "#FF6B9D" },
  { name: "Europe", x: 45, y: 25, energy: "medium", topTheme: "Self Discovery", color: "#C084FC" },
  { name: "Asia", x: 70, y: 30, energy: "high", topTheme: "Wealth & Family", color: "#FFD700" },
  { name: "India", x: 72, y: 40, energy: "high", topTheme: "Spiritual Growth", color: "#FF8C00" },
  { name: "South America", x: 28, y: 55, energy: "medium", topTheme: "Relationships", color: "#2DD4BF" },
  { name: "Africa", x: 50, y: 50, energy: "low", topTheme: "Career Changes", color: "#FFB38A" },
  { name: "Australia", x: 82, y: 65, energy: "medium", topTheme: "Travel", color: "#4DD0E1" },
];

export function GlobalFortuneMap() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="glow-card h-80">
        <div className="glow-card-content flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-cosmic-400 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="glow-card">
      <div className="glow-card-content">
        <div className="relative w-full aspect-[2/1] bg-black/30 rounded-xl overflow-hidden">
          {/* Grid background */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }} />
          </div>

          {/* Energy flow lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 70">
            <defs>
              <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
                <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
              </linearGradient>
            </defs>
            {regions.map((r, i) => (
              <circle
                key={r.name}
                cx={r.x}
                cy={r.y}
                r={3 + Math.random()}
                fill="none"
                stroke={r.color}
                strokeWidth="0.3"
                opacity="0.5"
                className="animate-pulse-slow"
                style={{ animationDelay: `${i * 0.5}s` }}
              />
            ))}
            {/* Connecting lines */}
            {regions.slice(0, -1).map((r, i) => (
              <line
                key={i}
                x1={r.x}
                y1={r.y}
                x2={regions[i + 1].x}
                y2={regions[i + 1].y}
                stroke="url(#flowGrad)"
                strokeWidth="0.5"
                opacity="0.2"
              />
            ))}
          </svg>

          {/* Region dots */}
          {regions.map((region) => (
            <button
              key={region.name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${region.x}%`, top: `${region.y}%` }}
              onMouseEnter={() => setActiveRegion(region.name)}
              onMouseLeave={() => setActiveRegion(null)}
            >
              {/* Pulse ring */}
              <div
                className={`map-pulse w-6 h-6 ${
                  region.energy === "high" ? "bg-fortune-rose" :
                  region.energy === "medium" ? "bg-fortune-lavender" : "bg-fortune-peach"
                }`}
                style={{ animationDuration: `${2 + Math.random() * 2}s` }}
              />
              {/* Dot */}
              <div
                className={`relative w-4 h-4 rounded-full border-2 border-white/30 transition-all duration-300 ${
                  region.energy === "high" ? "bg-fortune-rose shadow-lg shadow-fortune-rose/50" :
                  region.energy === "medium" ? "bg-fortune-lavender shadow-lg shadow-fortune-lavender/50" :
                  "bg-fortune-peach shadow-lg shadow-fortune-peach/50"
                } ${activeRegion === region.name ? "scale-150" : "scale-100"}`}
              />
              {/* Label */}
              <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 ${
                activeRegion === region.name ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
              }`}>
                <div className="bg-black/80 backdrop-blur-md rounded-lg px-2 py-1 text-xs border border-white/10">
                  <p className="text-white font-medium">{region.name}</p>
                  <p className="text-white/50">{region.topTheme}</p>
                </div>
              </div>
            </button>
          ))}

          {/* Tooltip */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs text-white/40">
            <MapPin className="w-3 h-3" />
            Hover to see regional insights
          </div>

          {/* Legend */}
          <div className="absolute top-3 right-3 flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-fortune-rose" />
              <span className="text-white/50">High Energy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-fortune-lavender" />
              <span className="text-white/50">Medium</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-fortune-peach" />
              <span className="text-white/50">Calm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

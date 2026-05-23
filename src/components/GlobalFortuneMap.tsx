"use client";

import { useState, memo } from "react";
import { MapPin } from "lucide-react";

interface RegionData {
  name: string;
  x: number;
  y: number;
  energy: "high" | "medium" | "low";
  topTheme: string;
  color: string;
}

const REGIONS: RegionData[] = [
  { name: "North America", x: 18, y: 30, energy: "high", topTheme: "Love & Career", color: "#FF6B9D" },
  { name: "Europe", x: 45, y: 25, energy: "medium", topTheme: "Self Discovery", color: "#C084FC" },
  { name: "Asia", x: 70, y: 30, energy: "high", topTheme: "Wealth & Family", color: "#FFD700" },
  { name: "India", x: 72, y: 40, energy: "high", topTheme: "Spiritual Growth", color: "#FF8C00" },
  { name: "South America", x: 28, y: 55, energy: "medium", topTheme: "Relationships", color: "#2DD4BF" },
  { name: "Africa", x: 50, y: 50, energy: "low", topTheme: "Career Changes", color: "#FFB38A" },
  { name: "Australia", x: 82, y: 65, energy: "medium", topTheme: "Travel", color: "#4DD0E1" },
];

const energyColors: Record<string, string> = {
  high: "bg-fortune-rose",
  medium: "bg-fortune-lavender",
  low: "bg-fortune-peach",
};

const pulsColors: Record<string, string> = {
  high: "shadow-fortune-rose/50 bg-fortune-rose",
  medium: "shadow-fortune-lavender/50 bg-fortune-lavender",
  low: "shadow-fortune-peach/50 bg-fortune-peach",
};

function RegionDot({ region, activeRegion, onHover, onLeave }: {
  region: RegionData;
  activeRegion: string | null;
  onHover: (name: string) => void;
  onLeave: () => void;
}) {
  const isActive = activeRegion === region.name;

  return (
    <button
      className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
      style={{ left: `${region.x}%`, top: `${region.y}%` }}
      onMouseEnter={() => onHover(region.name)}
      onMouseLeave={onLeave}
      aria-label={`${region.name}: ${region.topTheme} (${region.energy} energy)`}
    >
      <div
        className={`absolute rounded-full animate-ping opacity-20 w-6 h-6 ${energyColors[region.energy]}`}
        style={{ animationDuration: `${2 + Math.random() * 2}s` }}
      />
      <div
        className={`relative w-4 h-4 rounded-full border-2 border-white/30 transition-all duration-300 ${
          pulsColors[region.energy]
        } ${isActive ? "scale-150" : "scale-100"}`}
      />
      <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 ${
        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"
      }`}>
        <div className="bg-black/80 backdrop-blur-md rounded-lg px-2 py-1 text-xs border border-white/10">
          <p className="text-white font-medium">{region.name}</p>
          <p className="text-white/50">{region.topTheme}</p>
        </div>
      </div>
    </button>
  );
}

const RegionDotMemo = memo(RegionDot);

export function GlobalFortuneMap() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  return (
    <div className="glow-card">
      <div className="glow-card-content">
        <div className="relative w-full aspect-[2/1] bg-black/30 rounded-xl overflow-hidden">
          {/* Grid background */}
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }} />
          </div>

          {/* Region dots */}
          {REGIONS.map((region) => (
            <RegionDotMemo
              key={region.name}
              region={region}
              activeRegion={activeRegion}
              onHover={setActiveRegion}
              onLeave={() => setActiveRegion(null)}
            />
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

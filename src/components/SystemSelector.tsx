"use client";

import Link from "next/link";
import { Star, Moon, Sun, Diamond, Sparkles } from "lucide-react";

const systems = [
  {
    id: "western",
    name: "Western Astrology",
    description: "Sun signs, planets, houses & transits",
    icon: Sun,
    gradient: "from-fortune-gold to-fortune-peach",
    href: "/reading/western",
    color: "#FFD700",
  },
  {
    id: "bazi",
    name: "Chinese BaZi",
    description: "Four Pillars of Destiny & elements",
    icon: Star,
    gradient: "from-fortune-rose to-fortune-lavender",
    href: "/reading/bazi",
    color: "#FF6B9D",
  },
  {
    id: "vedic",
    name: "Vedic Astrology",
    description: "Ancient Indian wisdom & Nakshatras",
    icon: Moon,
    gradient: "from-fortune-lavender to-aurora-400",
    href: "/reading/vedic",
    color: "#C084FC",
  },
  {
    id: "tarot",
    name: "Tarot",
    description: "AI-powered card spreads & meanings",
    icon: Diamond,
    gradient: "from-aurora-400 to-fortune-teal",
    href: "/reading/tarot",
    color: "#2DD4BF",
  },
];

export function SystemSelector() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {systems.map((sys) => {
        const Icon = sys.icon;
        return (
          <Link
            key={sys.id}
            href={sys.href}
            className="glow-card group"
          >
            <div className="glow-card-content">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sys.gradient} p-2.5 mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-full h-full text-white" />
              </div>
              <h3 className="text-white font-semibold mb-1 text-lg">{sys.name}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{sys.description}</p>
              <div className="mt-4 flex items-center gap-1 text-sm text-cosmic-300 group-hover:gap-2 transition-all">
                <span>Try now</span>
                <Sparkles className="w-3 h-3" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

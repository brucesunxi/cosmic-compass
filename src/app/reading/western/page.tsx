"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { calculateBirthChart, getWesternHoroscope } from "@/lib/astrology";
import type { BirthChart } from "@/lib/astrology";
import { Sun, Moon, Star, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

function WesternContent() {
  const searchParams = useSearchParams();
  const [chart, setChart] = useState<BirthChart | null>(null);
  const [horoscope, setHoroscope] = useState<{ daily: string; love: string; career: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const year = parseInt(searchParams.get("year") || "1995");
    const month = parseInt(searchParams.get("month") || "6");
    const day = parseInt(searchParams.get("day") || "15");
    const hour = parseInt(searchParams.get("hour") || "12");
    const min = parseInt(searchParams.get("min") || "0");

    const birthChart = calculateBirthChart(year, month, day, hour, min);
    setChart(birthChart);
    setHoroscope(getWesternHoroscope(birthChart));
  }, [searchParams]);

  if (!mounted || !chart || !horoscope) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-cosmic-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const planets = [
    { name: "Sun", data: chart.sun, icon: Sun, color: "text-yellow-400" },
    { name: "Moon", data: chart.moon, icon: Moon, color: "text-blue-300" },
    { name: "Mercury", data: chart.mercury, icon: Star, color: "text-purple-300" },
    { name: "Venus", data: chart.venus, icon: Star, color: "text-pink-300" },
    { name: "Mars", data: chart.mars, icon: Star, color: "text-red-400" },
    { name: "Jupiter", data: chart.jupiter, icon: Star, color: "text-amber-400" },
    { name: "Saturn", data: chart.saturn, icon: Star, color: "text-gray-400" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <Link href="/reading" className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to readings
      </Link>

      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">
          Western <span className="text-gradient">Astrology</span>
        </h1>
        <p className="text-white/50">Your Birth Chart & Daily Horoscope</p>
      </div>

      {/* Ascendant */}
      <div className="glow-card">
        <div className="glow-card-content text-center">
          <p className="text-sm text-white/40 mb-1">Ascendant (Rising Sign)</p>
          <p className="text-3xl font-bold text-gradient">{chart.ascendant}</p>
          <p className="text-white/50 text-sm mt-1">Midheaven: {chart.midheaven}</p>
        </div>
      </div>

      {/* Planet Positions */}
      <div>
        <h2 className="text-xl font-bold font-display text-gradient mb-4">Planet Positions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {planets.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.name} className="glow-card">
                <div className="glow-card-content flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${p.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{p.name}</p>
                    <p className="text-white/50 text-sm">
                      {p.data.sign} {p.data.degree}°{p.data.retrograde ? " ℞" : ""}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Houses */}
      <div>
        <h2 className="text-xl font-bold font-display text-gradient mb-4">Houses</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {chart.houses.map((h) => (
            <div key={h.number} className="glow-card">
              <div className="glow-card-content py-2 px-3 text-center">
                <p className="text-xs text-white/30">House {h.number}</p>
                <p className="text-white font-medium text-sm">{h.sign}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Horoscope Readings */}
      <div>
        <h2 className="text-xl font-bold font-display text-gradient mb-4">Your Horoscope</h2>
        <div className="space-y-4">
          {[
            { title: "Daily Insight", content: horoscope.daily, icon: Sparkles },
            { title: "Love & Romance", content: horoscope.love, icon: Sparkles },
            { title: "Career & Purpose", content: horoscope.career, icon: Sparkles },
          ].map((section) => (
            <div key={section.title} className="glow-card">
              <div className="glow-card-content">
                <h3 className="text-white font-semibold mb-2">{section.title}</h3>
                <p className="text-white/60 leading-relaxed">{section.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WesternPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-cosmic-400 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <WesternContent />
    </Suspense>
  );
}

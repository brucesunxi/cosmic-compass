"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { calculateVedicChart } from "@/lib/astrology";
import type { VedicChart } from "@/lib/astrology";
import { ArrowLeft, Star, Moon, Sun } from "lucide-react";
import Link from "next/link";

function VedicContent() {
  const searchParams = useSearchParams();
  const [chart, setChart] = useState<VedicChart | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const year = parseInt(searchParams.get("year") || "1995");
    const month = parseInt(searchParams.get("month") || "6");
    const day = parseInt(searchParams.get("day") || "15");
    const hour = parseInt(searchParams.get("hour") || "12");
    const min = parseInt(searchParams.get("min") || "0");

    const vedic = calculateVedicChart(year, month, day, hour, min);
    setChart(vedic);
  }, [searchParams]);

  if (!mounted || !chart) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-cosmic-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <Link href="/reading" className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to readings
      </Link>

      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">
          Vedic <span className="text-gradient">Astrology</span>
        </h1>
        <p className="text-white/50">Jyotish · Ancient Indian Celestial Wisdom</p>
      </div>

      {/* Lagna */}
      <div className="glow-card">
        <div className="glow-card-content text-center">
          <p className="text-sm text-white/40 mb-1">Lagna (Ascendant)</p>
          <p className="text-3xl font-bold text-gradient mb-2">{chart.lagna}</p>
          <p className="text-white/50 text-sm">Lord: {chart.lagnaLord}</p>
        </div>
      </div>

      {/* Graha Positions */}
      <div>
        <h2 className="text-xl font-bold font-display text-gradient mb-4">Graha (Planetary) Positions</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {chart.grahas.map((graha) => (
            <div key={graha.name} className="glow-card">
              <div className="glow-card-content flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${
                  graha.isBenefic ? "text-emerald-400" : "text-red-400"
                }`}>
                  {graha.name === "Sun" ? <Sun className="w-5 h-5" /> :
                   graha.name === "Moon" ? <Moon className="w-5 h-5" /> :
                   <Star className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-white font-medium">{graha.name}</p>
                    {graha.isRetrograde && (
                      <span className="text-xs text-amber-400">℞</span>
                    )}
                    {graha.isBenefic ? (
                      <span className="text-xs text-emerald-400">Benefic</span>
                    ) : (
                      <span className="text-xs text-red-400">Malefic</span>
                    )}
                  </div>
                  <p className="text-white/50 text-sm">
                    {graha.rashi} · {graha.degree}° · House {graha.house}
                  </p>
                  <p className="text-white/30 text-xs">
                    Nakṣatra: {graha.nakshatra} ({graha.pada})
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Houses */}
      <div>
        <h2 className="text-xl font-bold font-display text-gradient mb-4">Bhava (Houses)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {chart.houses.map((h) => (
            <div key={h.number} className="glow-card">
              <div className="glow-card-content py-2 px-3">
                <p className="text-xs text-white/30">House {h.number}</p>
                <p className="text-white font-medium text-sm">{h.rashi.split(" ")[0]}</p>
                <p className="text-white/40 text-xs">{h.lord}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dasha */}
      <div>
        <h2 className="text-xl font-bold font-display text-gradient mb-4">Mahadasha Periods</h2>
        <div className="glow-card">
          <div className="glow-card-content">
            <div className="grid gap-2">
              {chart.dashas.map((d, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-white font-medium">{d.planet}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-white/50 text-sm">{d.period}</span>
                    <span className="text-white/30 text-xs">Starts age {d.startAge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-4">
        <div className="glow-card">
          <div className="glow-card-content">
            <h3 className="text-white font-semibold mb-2">Your Nature</h3>
            <p className="text-white/60 leading-relaxed text-sm">{chart.summary.personality}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glow-card">
            <div className="glow-card-content">
              <h3 className="text-white font-semibold mb-2 text-emerald-400">Strengths</h3>
              <ul className="space-y-2">
                {chart.summary.strengths.map((s, i) => (
                  <li key={i} className="text-white/60 text-sm flex gap-2">
                    <span className="text-emerald-400 mt-0.5">✦</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="glow-card">
            <div className="glow-card-content">
              <h3 className="text-white font-semibold mb-2 text-amber-400">Challenges</h3>
              <ul className="space-y-2">
                {chart.summary.challenges.map((c, i) => (
                  <li key={i} className="text-white/60 text-sm flex gap-2">
                    <span className="text-amber-400 mt-0.5">✦</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="glow-card">
          <div className="glow-card-content">
            <h3 className="text-white font-semibold mb-2">Career Path</h3>
            <p className="text-white/60 leading-relaxed text-sm">{chart.summary.careerPath}</p>
          </div>
        </div>
        <div className="glow-card">
          <div className="glow-card-content">
            <h3 className="text-white font-semibold mb-2">Relationships</h3>
            <p className="text-white/60 leading-relaxed text-sm">{chart.summary.relationships}</p>
          </div>
        </div>
        <div className="glow-card border-cosmic-500/20">
          <div className="glow-card-content">
            <h3 className="text-white font-semibold mb-2 text-fortune-gold">Spiritual Guidance</h3>
            <p className="text-white/60 leading-relaxed text-sm">{chart.summary.spiritual}</p>
            <div className="mt-3 p-3 rounded-xl bg-cosmic-500/10 border border-cosmic-500/20">
              <p className="text-xs text-cosmic-300 font-medium">Suggested Remedy</p>
              <p className="text-white/50 text-sm mt-1">{chart.summary.remedy}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VedicPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-cosmic-400 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <VedicContent />
    </Suspense>
  );
}

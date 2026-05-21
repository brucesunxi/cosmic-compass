"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { calculateBaZi } from "@/lib/astrology";
import type { BaZiChart, BaZiPillar } from "@/lib/astrology";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function BaZiContent() {
  const searchParams = useSearchParams();
  const [chart, setChart] = useState<BaZiChart | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const year = parseInt(searchParams.get("year") || "1995");
    const month = parseInt(searchParams.get("month") || "6");
    const day = parseInt(searchParams.get("day") || "15");
    const hour = parseInt(searchParams.get("hour") || "12");
    const min = parseInt(searchParams.get("min") || "0");
    const gender = searchParams.get("gender") || "other";

    const bazi = calculateBaZi(year, month, day, hour, gender);
    setChart(bazi);
  }, [searchParams]);

  if (!mounted || !chart) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-cosmic-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const pillars: Array<{ label: string; pillar: BaZiPillar; period: string }> = [
    { label: "Year Pillar", pillar: chart.yearPillar, period: "Ancestors & Early Life" },
    { label: "Month Pillar", pillar: chart.monthPillar, period: "Parents & Career" },
    { label: "Day Pillar", pillar: chart.dayPillar, period: "Self & Marriage" },
    { label: "Hour Pillar", pillar: chart.hourPillar, period: "Children & Later Life" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <Link href="/reading" className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to readings
      </Link>

      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">
          Chinese <span className="text-gradient">BaZi</span>
        </h1>
        <p className="text-white/50">Four Pillars of Destiny · 生辰八字</p>
      </div>

      {/* Day Master */}
      <div className="glow-card">
        <div className="glow-card-content text-center">
          <p className="text-sm text-white/40 mb-1">Day Master (日主)</p>
          <p className="text-4xl font-bold text-gradient mb-2">{chart.dayMaster}</p>
          <p className="text-white/50 text-sm">The core of your being in Chinese metaphysics</p>
        </div>
      </div>

      {/* Four Pillars */}
      <div>
        <h2 className="text-xl font-bold font-display text-gradient mb-4">Four Pillars</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {pillars.map((p) => (
            <div key={p.label} className="glow-card text-center">
              <div className="glow-card-content">
                <p className="text-xs text-white/40 mb-1">{p.period}</p>
                <div className="text-2xl mb-1">{p.pillar.heavenlyStem}{p.pillar.earthlyBranch}</div>
                <p className="text-white text-sm font-medium">{p.pillar.heavenlyStem} · {p.pillar.earthlyBranch}</p>
                <p className="text-white/40 text-xs mt-1">{p.pillar.element}</p>
                {p.pillar.hiddenStems.length > 0 && (
                  <p className="text-white/30 text-xs mt-1">
                    Hidden: {p.pillar.hiddenStems.join(" ")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Personality */}
      <div className="glow-card">
        <div className="glow-card-content">
          <h2 className="text-xl font-bold font-display text-gradient mb-3">Your Destiny Portrait</h2>
          <p className="text-white/70 leading-relaxed">{chart.summary.personality}</p>
        </div>
      </div>

      {/* Element Balance */}
      <div className="glow-card">
        <div className="glow-card-content">
          <h2 className="text-xl font-bold font-display text-gradient mb-3">Five Elements Balance</h2>
          <p className="text-white/70 leading-relaxed">{chart.summary.elementBalance}</p>
          <div className="flex gap-3 mt-4">
            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm">
              Lucky: {chart.summary.luckyElement}
            </span>
            <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-sm">
              Nurture: {chart.summary.weakElement}
            </span>
          </div>
        </div>
      </div>

      {/* Career & Love */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="glow-card">
          <div className="glow-card-content">
            <h3 className="text-white font-semibold mb-2">Career Path</h3>
            <p className="text-white/60 leading-relaxed text-sm">{chart.summary.careerAdvice}</p>
          </div>
        </div>
        <div className="glow-card">
          <div className="glow-card-content">
            <h3 className="text-white font-semibold mb-2">Love & Relationships</h3>
            <p className="text-white/60 leading-relaxed text-sm">{chart.summary.loveAdvice}</p>
          </div>
        </div>
      </div>

      {/* Lucky Directions & Colors */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="glow-card">
          <div className="glow-card-content">
            <h3 className="text-white font-semibold mb-2">Lucky Directions</h3>
            <div className="flex flex-wrap gap-2">
              {chart.summary.luckyDirections.map((d) => (
                <span key={d} className="px-3 py-1 rounded-full bg-cosmic-500/20 text-cosmic-300 text-sm">
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="glow-card">
          <div className="glow-card-content">
            <h3 className="text-white font-semibold mb-2">Lucky Colors</h3>
            <div className="flex flex-wrap gap-2">
              {chart.summary.luckyColors.map((c) => (
                <span key={c} className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm border border-white/10">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BaZiPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-cosmic-400 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <BaZiContent />
    </Suspense>
  );
}

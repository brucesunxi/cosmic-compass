"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { calculateBirthChart, getWesternHoroscope, calculateBaZi, calculateVedicChart } from "@/lib/astrology";
import type { BirthChart, BaZiChart, VedicChart } from "@/lib/astrology";
import { ArrowLeft, Sparkles, Globe2 } from "lucide-react";
import Link from "next/link";

function CompareContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<{
    western: BirthChart;
    horoscope: ReturnType<typeof getWesternHoroscope>;
    bazi: BaZiChart;
    vedic: VedicChart;
  } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const year = parseInt(searchParams.get("year") || "1995");
    const month = parseInt(searchParams.get("month") || "6");
    const day = parseInt(searchParams.get("day") || "15");
    const hour = parseInt(searchParams.get("hour") || "12");
    const min = parseInt(searchParams.get("min") || "0");
    const gender = searchParams.get("gender") || "other";

    const western = calculateBirthChart(year, month, day, hour, min);
    const horoscope = getWesternHoroscope(western);
    const bazi = calculateBaZi(year, month, day, hour, gender);
    const vedic = calculateVedicChart(year, month, day, hour, min);

    setData({ western, horoscope, bazi, vedic });
  }, [searchParams]);

  if (!mounted || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-cosmic-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <Link href="/reading" className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to readings
      </Link>

      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cosmic-500/20 border border-cosmic-500/30 text-cosmic-300 text-sm mb-4">
          <Globe2 className="w-4 h-4" /> Cross-Cultural Analysis
        </div>
        <h1 className="text-3xl md:text-5xl font-bold font-display mb-4">
          Multi-System <span className="text-gradient">Comparison</span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          See your fortune through the lens of three ancient wisdom traditions.
          Notice how each system illuminates different facets of your life.
        </p>
      </div>

      {/* Identity Across Systems */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="glow-card border-fortune-gold/30">
          <div className="glow-card-content text-center">
            <p className="text-xs text-fortune-gold mb-1">Western</p>
            <p className="text-2xl font-bold text-white">{data.western.sun.sign}</p>
            <p className="text-white/40 text-sm">Sun Sign</p>
          </div>
        </div>
        <div className="glow-card border-fortune-rose/30">
          <div className="glow-card-content text-center">
            <p className="text-xs text-fortune-rose mb-1">Chinese BaZi</p>
            <p className="text-2xl font-bold text-white">{data.bazi.dayMaster}</p>
            <p className="text-white/40 text-sm">Day Master</p>
          </div>
        </div>
        <div className="glow-card border-fortune-lavender/30">
          <div className="glow-card-content text-center">
            <p className="text-xs text-fortune-lavender mb-1">Vedic</p>
            <p className="text-2xl font-bold text-white">{data.vedic.lagna.split(" ")[0]}</p>
            <p className="text-white/40 text-sm">Lagna (Ascendant)</p>
          </div>
        </div>
      </div>

      {/* Daily Insights Comparison */}
      <div>
        <h2 className="text-xl font-bold font-display text-gradient mb-4">Today's Guidance</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="glow-card border-fortune-gold/20">
            <div className="glow-card-content">
              <h3 className="text-fortune-gold font-semibold mb-3">☉ Western Astrology</h3>
              <p className="text-white/60 text-sm leading-relaxed">{data.horoscope.daily}</p>
            </div>
          </div>
          <div className="glow-card border-fortune-rose/20">
            <div className="glow-card-content">
              <h3 className="text-fortune-rose font-semibold mb-3">☯ Chinese BaZi</h3>
              <p className="text-white/60 text-sm leading-relaxed">{data.bazi.summary.personality.slice(0, 120)}...</p>
            </div>
          </div>
          <div className="glow-card border-fortune-lavender/20">
            <div className="glow-card-content">
              <h3 className="text-fortune-lavender font-semibold mb-3">🕉 Vedic Astrology</h3>
              <p className="text-white/60 text-sm leading-relaxed">{data.vedic.summary.personality.slice(0, 120)}...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Career */}
      <div>
        <h2 className="text-xl font-bold font-display text-gradient mb-4">Career Insights</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="glow-card">
            <div className="glow-card-content">
              <h3 className="text-white font-semibold mb-2">Western</h3>
              <p className="text-white/50 text-sm">{data.horoscope.career}</p>
            </div>
          </div>
          <div className="glow-card">
            <div className="glow-card-content">
              <h3 className="text-white font-semibold mb-2">BaZi</h3>
              <p className="text-white/50 text-sm">{data.bazi.summary.careerAdvice}</p>
            </div>
          </div>
          <div className="glow-card">
            <div className="glow-card-content">
              <h3 className="text-white font-semibold mb-2">Vedic</h3>
              <p className="text-white/50 text-sm">{data.vedic.summary.careerPath}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Love */}
      <div>
        <h2 className="text-xl font-bold font-display text-gradient mb-4">Love & Relationships</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="glow-card">
            <div className="glow-card-content">
              <h3 className="text-white font-semibold mb-2">Western</h3>
              <p className="text-white/50 text-sm">{data.horoscope.love}</p>
            </div>
          </div>
          <div className="glow-card">
            <div className="glow-card-content">
              <h3 className="text-white font-semibold mb-2">BaZi</h3>
              <p className="text-white/50 text-sm">{data.bazi.summary.loveAdvice}</p>
            </div>
          </div>
          <div className="glow-card">
            <div className="glow-card-content">
              <h3 className="text-white font-semibold mb-2">Vedic</h3>
              <p className="text-white/50 text-sm">{data.vedic.summary.relationships}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cross-Cultural Wisdom */}
      <div className="glow-card border-cosmic-500/30">
        <div className="glow-card-content">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-fortune-gold" />
            <h2 className="text-xl font-bold text-gradient">Cross-Cultural Wisdom</h2>
          </div>
          <p className="text-white/60 leading-relaxed">
            Each wisdom tradition offers a unique lens on your life. Western astrology speaks to your
            personality and self-expression. Chinese BaZi reveals the elemental energies and cycles
            shaping your destiny. Vedic astrology illuminates your karmic path and soul's purpose.
            Together, they paint a multidimensional portrait of who you are and where you're going.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-cosmic-400 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CompareContent />
    </Suspense>
  );
}

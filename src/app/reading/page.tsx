"use client";

import { useState } from "react";
import Link from "next/link";
import { SystemSelector } from "@/components/SystemSelector";
import { BirthChartForm } from "@/components/BirthChartForm";
import { getDailyFortune } from "@/lib/astrology";
import { Sparkles, ArrowRight, Star } from "lucide-react";

export default function ReadingPage() {
  const [fortune] = useState(getDailyFortune);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
          Choose Your <span className="text-gradient">Fortune Path</span>
        </h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto">
          Four ancient wisdom systems, one modern AI-powered platform. Pick your path or try them all.
        </p>
      </div>

      {/* Daily Fortune */}
      <div className="glow-card">
        <div className="glow-card-content">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{fortune.sign}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-fortune-gold" />
                <span className="text-sm text-fortune-gold font-medium">Daily Cosmic Message</span>
              </div>
              <p className="text-white/80 text-lg">{fortune.message}</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-white/40">Lucky #</div>
              <div className="text-2xl font-bold text-gradient">{fortune.lucky}</div>
            </div>
          </div>
        </div>
      </div>

      {/* System Selector */}
      <div>
        <h2 className="text-2xl font-bold font-display text-gradient mb-6">
          Fortune Systems
        </h2>
        <SystemSelector />
      </div>

      {/* Full Chart Analysis */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold font-display text-gradient">
              Full Birth Chart Analysis
            </h2>
            <p className="text-white/50 text-sm">
              Enter your birth details for a complete multi-system reading
            </p>
          </div>
        </div>
        <BirthChartForm />
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link
          href="/chat"
          className="glow-card group text-left"
        >
          <div className="glow-card-content flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-fortune-rose to-fortune-lavender flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Ask the Universe</p>
              <p className="text-white/40 text-sm">AI fortune chat</p>
            </div>
            <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
          </div>
        </Link>
        <Link
          href="/social"
          className="glow-card group text-left"
        >
          <div className="glow-card-content flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-fortune-teal to-aurora-400 flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Compatibility</p>
              <p className="text-white/40 text-sm">Compare charts</p>
            </div>
            <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
          </div>
        </Link>
        <Link
          href="/profile"
          className="glow-card group text-left"
        >
          <div className="glow-card-content flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-fortune-gold to-fortune-peach flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">My Fortune Profile</p>
              <p className="text-white/40 text-sm">Save & track readings</p>
            </div>
            <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
          </div>
        </Link>
      </div>
    </div>
  );
}

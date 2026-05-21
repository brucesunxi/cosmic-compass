"use client";

import { useState } from "react";
import { drawTarotReading, SPREADS } from "@/lib/astrology";
import type { TarotReading } from "@/lib/astrology";
import { ArrowLeft, Sparkles, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function TarotPage() {
  const [reading, setReading] = useState<TarotReading | null>(null);
  const [selectedSpread, setSelectedSpread] = useState(SPREADS[0].name);
  const [isDrawing, setIsDrawing] = useState(false);

  const drawCards = () => {
    setIsDrawing(true);
    // Simulate a mystical delay
    setTimeout(() => {
      const newReading = drawTarotReading(selectedSpread);
      setReading(newReading);
      setIsDrawing(false);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <Link href="/reading" className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to readings
      </Link>

      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">
          AI <span className="text-gradient">Tarot</span>
        </h1>
        <p className="text-white/50">Let the cards reveal what the universe wants you to know</p>
      </div>

      {/* Spread Selector */}
      <div className="flex flex-wrap gap-3 justify-center">
        {SPREADS.map((spread) => (
          <button
            key={spread.name}
            onClick={() => { setSelectedSpread(spread.name); setReading(null); }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              selectedSpread === spread.name
                ? "bg-cosmic-500/20 text-cosmic-200 border border-cosmic-500/30"
                : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
            }`}
          >
            {spread.name}
          </button>
        ))}
      </div>

      {/* Draw Button */}
      <div className="text-center">
        <button
          onClick={drawCards}
          disabled={isDrawing}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cosmic-500 to-cosmic-600 text-white font-semibold text-lg hover:from-cosmic-400 hover:to-cosmic-500 transition-all duration-300 shadow-lg shadow-cosmic-500/25 disabled:opacity-50"
        >
          {isDrawing ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              The cards are being drawn...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              {reading ? "Draw Again" : "Draw the Cards"}
            </>
          )}
        </button>
        {reading && (
          <p className="text-white/40 text-sm mt-2">{reading.spread.description}</p>
        )}
      </div>

      {/* Reading Result */}
      {reading && (
        <>
          <div className="space-y-4">
            {reading.cards.map((card, i) => (
              <div
                key={i}
                className="glow-card animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="glow-card-content">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-cosmic-500/20 text-cosmic-300 border border-cosmic-500/20">
                        {card.position}
                      </span>
                      <h3 className="text-lg font-bold text-white mt-2">
                        {card.card.name}
                      </h3>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      card.reversed
                        ? "bg-red-500/10 text-red-300 border border-red-500/20"
                        : "bg-green-500/10 text-green-300 border border-green-500/20"
                    }`}>
                      {card.reversed ? "Reversed" : "Upright"}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{card.interpretation}</p>
                  <div className="flex gap-2 mt-3">
                    {card.card.keywords.slice(0, 3).map((kw) => (
                      <span key={kw} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/40">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Overall Message */}
          <div className="glow-card animate-fade-in">
            <div className="glow-card-content">
              <h2 className="text-xl font-bold font-display text-gradient mb-3">The Universe Says</h2>
              <p className="text-white/70 leading-relaxed text-lg">{reading.overallMessage}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

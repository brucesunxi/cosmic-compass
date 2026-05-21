"use client";

import { Sparkles } from "lucide-react";

export function QuickReadingCard() {
  return (
    <div className="glow-card group cursor-pointer">
      <div className="glow-card-content flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cosmic-400 to-cosmic-600 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-semibold">Daily Fortune</h3>
          <p className="text-white/50 text-sm">What the stars say today</p>
        </div>
        <div className="text-cosmic-300 text-sm font-medium group-hover:translate-x-1 transition-transform">
          Open →
        </div>
      </div>
    </div>
  );
}

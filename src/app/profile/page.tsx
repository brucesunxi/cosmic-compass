"use client";

import { useState } from "react";
import { ArrowLeft, Settings, Crown, Sparkles, Clock, Star, Heart, LogOut } from "lucide-react";
import Link from "next/link";

const readingHistory = [
  { type: "Western Astrology", date: "Today", preview: "Venus enters your 7th house..." },
  { type: "Chinese BaZi", date: "Yesterday", preview: "Your Day Master is Yin Wood..." },
  { type: "AI Tarot", date: "3 days ago", preview: "Three Card Spread: Past..." },
  { type: "Vedic Astrology", date: "1 week ago", preview: "Your Lagna is Karka..." },
];

export default function ProfilePage() {
  const [isPro, setIsPro] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Home
      </Link>

      {/* Profile Header */}
      <div className="glow-card">
        <div className="glow-card-content">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cosmic-400 to-cosmic-600 flex items-center justify-center text-3xl font-bold text-white border-2 border-cosmic-300/30">
              🌙
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">Cosmic Seeker</h1>
                {isPro ? (
                  <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-fortune-gold/20 text-fortune-gold border border-fortune-gold/30">
                    <Crown className="w-3 h-3" /> PRO
                  </span>
                ) : (
                  <button
                    onClick={() => setIsPro(true)}
                    className="text-xs px-2 py-0.5 rounded-full bg-cosmic-500/20 text-cosmic-300 border border-cosmic-500/30 hover:bg-cosmic-500/30 transition-colors cursor-pointer"
                  >
                    Upgrade
                  </button>
                )}
              </div>
              <p className="text-white/50 text-sm">Joined March 2026 · 12 readings</p>
            </div>
            <Settings className="w-5 h-5 text-white/30 hover:text-white/60 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Readings", value: "12", icon: Star },
          { label: "Verifications", value: "8", icon: Sparkles },
          { label: "Streak", value: "5 days", icon: Clock },
          { label: "Matches", value: "3", icon: Heart },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glow-card text-center">
              <div className="glow-card-content py-3">
                <Icon className="w-4 h-4 mx-auto text-cosmic-300 mb-1" />
                <p className="text-lg font-bold text-white">{stat.value}</p>
                <p className="text-white/40 text-xs">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subscription */}
      {!isPro && (
        <div className="glow-card border-fortune-gold/30 bg-gradient-to-br from-fortune-gold/5 to-transparent">
          <div className="glow-card-content">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-5 h-5 text-fortune-gold" />
                  <h2 className="text-xl font-bold text-white">Cosmic Compass Premium</h2>
                </div>
                <p className="text-white/50 text-sm mb-4">
                  Unlock unlimited readings, detailed comparisons, fortune pet, and AI chat with all characters
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-3xl font-bold text-gradient">$9.99</span>
                  <span className="text-white/40">/month</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {[
                    "Unlimited multi-system readings",
                    "Full Birth Chart Comparison (Western + BaZi + Vedic)",
                    "AI Chat with all cosmic guides",
                    "Fortune Pet companion",
                    "Prediction verification tracking",
                    "Ad-free experience",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-white/60">
                      <Sparkles className="w-3 h-3 text-fortune-gold" /> {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setIsPro(true)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-fortune-gold to-fortune-peach text-cosmic-950 font-bold hover:opacity-90 transition-all duration-300"
                >
                  Start Premium Journey
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reading History */}
      <div>
        <h2 className="text-xl font-bold font-display text-gradient mb-4">Reading History</h2>
        <div className="space-y-2">
          {readingHistory.map((r, i) => (
            <div key={i} className="glow-card group cursor-pointer">
              <div className="glow-card-content flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{r.type}</p>
                  <p className="text-white/40 text-sm">{r.preview}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/30 text-xs">{r.date}</span>
                  <span className="text-white/20 group-hover:text-white/50 transition-colors">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold font-display text-gradient mb-4">Settings</h2>
        <div className="glow-card">
          <div className="glow-card-content space-y-4">
            {[
              { label: "Email Notifications", desc: "Daily horoscope & prediction reminders" },
              { label: "Share Reading History", desc: "Let friends see your verified predictions" },
              { label: "Language", desc: "English (US)" },
            ].map((setting) => (
              <div key={setting.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-white text-sm">{setting.label}</p>
                  <p className="text-white/40 text-xs">{setting.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-9 h-5 bg-white/10 rounded-full peer peer-checked:bg-cosmic-500 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logout */}
      <button className="flex items-center gap-2 text-white/30 hover:text-red-400 transition-colors text-sm mx-auto">
        <LogOut className="w-4 h-4" /> Sign Out
      </button>
    </div>
  );
}

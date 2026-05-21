"use client";

import { useState } from "react";
import { ArrowLeft, Heart, Users, MessageCircle, Share2, Sparkles, Star } from "lucide-react";
import Link from "next/link";

const trendingReadings = [
  {
    user: "Luna",
    sign: "♋ Cancer",
    reading: "The tarot revealed I'd meet someone at a coffee shop... and it happened! ☕✨",
    likes: 342,
    comments: 28,
    time: "2h ago",
    verified: true,
  },
  {
    user: "Alex",
    sign: "♐ Sagittarius",
    reading: "My BaZi said this would be my year for career growth. Got promoted yesterday! 🙏",
    likes: 256,
    comments: 15,
    time: "5h ago",
    verified: true,
  },
  {
    user: "Priya",
    sign: "♍ Virgo",
    reading: "Vedic chart predicted a spiritual awakening. Been meditating daily and feeling so connected 🕉️",
    likes: 189,
    comments: 22,
    time: "8h ago",
    verified: false,
  },
  {
    user: "Kai",
    sign: "♌ Leo",
    reading: "Western astrology said a creative project would flourish. My art exhibition sold out! 🎨",
    likes: 167,
    comments: 19,
    time: "12h ago",
    verified: true,
  },
];

const topDiscussions = [
  { topic: "Best love compatibility: Western vs Vedic?", replies: 89, likes: 234 },
  { topic: "Mercury retrograde survival stories", replies: 67, likes: 178 },
  { topic: "What's your BaZi Day Master?", replies: 156, likes: 312 },
  { topic: "AI Tarot predictions that actually came true", replies: 92, likes: 456 },
];

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState<"feed" | "discussions">("feed");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Home
      </Link>

      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">
          Cosmic <span className="text-gradient">Community</span>
        </h1>
        <p className="text-white/50">Share readings, verify predictions, and connect with fellow seekers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active Today", value: "12.4K", icon: Users },
          { label: "Verified Predictions", value: "8.7K", icon: Sparkles },
          { label: "Community Matches", value: "3.2K", icon: Heart },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glow-card text-center">
              <div className="glow-card-content py-4">
                <Icon className="w-5 h-5 mx-auto text-cosmic-300 mb-1" />
                <p className="text-2xl font-bold text-gradient">{stat.value}</p>
                <p className="text-white/40 text-xs">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("feed")}
          className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === "feed"
              ? "bg-cosmic-500/20 text-cosmic-200 border border-cosmic-500/30"
              : "bg-white/5 text-white/50 border border-white/10"
          }`}
        >
          Prediction Feed
        </button>
        <button
          onClick={() => setActiveTab("discussions")}
          className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === "discussions"
              ? "bg-cosmic-500/20 text-cosmic-200 border border-cosmic-500/30"
              : "bg-white/5 text-white/50 border border-white/10"
          }`}
        >
          Discussions
        </button>
      </div>

      {activeTab === "feed" ? (
        <div className="space-y-4">
          {trendingReadings.map((post, i) => (
            <div key={i} className="glow-card animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="glow-card-content">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cosmic-400 to-cosmic-600 flex items-center justify-center text-white font-bold">
                      {post.user[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-white font-medium text-sm">{post.user}</p>
                        {post.verified && (
                          <span className="flex items-center gap-1 text-xs text-emerald-400">
                            <Sparkles className="w-3 h-3" /> Verified
                          </span>
                        )}
                      </div>
                      <p className="text-white/40 text-xs">{post.sign} · {post.time}</p>
                    </div>
                  </div>
                  <Share2 className="w-4 h-4 text-white/30 hover:text-white/60 cursor-pointer transition-colors" />
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-3">{post.reading}</p>
                <div className="flex items-center gap-4 text-sm">
                  <button className="flex items-center gap-1.5 text-white/40 hover:text-fortune-rose transition-colors">
                    <Heart className="w-4 h-4" /> {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 text-white/40 hover:text-cosmic-300 transition-colors">
                    <MessageCircle className="w-4 h-4" /> {post.comments}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {topDiscussions.map((d, i) => (
            <div key={i} className="glow-card group cursor-pointer">
              <div className="glow-card-content flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-fortune-gold" />
                  <p className="text-white/80 group-hover:text-white transition-colors">{d.topic}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-white/40">
                  <span>{d.replies} replies</span>
                  <span>♥ {d.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Compatibility CTA */}
      <div className="glow-card border-cosmic-500/30">
        <div className="glow-card-content text-center">
          <h2 className="text-xl font-bold font-display text-gradient mb-2">
            Find Your Cosmic Match
          </h2>
          <p className="text-white/50 text-sm mb-4">
            Compare birth charts and discover your compatibility with friends, partners, or crushes
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cosmic-500 to-cosmic-600 text-white font-semibold hover:from-cosmic-400 hover:to-cosmic-500 transition-all duration-300">
            <Heart className="w-4 h-4" />
            Compare Charts
          </button>
        </div>
      </div>
    </div>
  );
}

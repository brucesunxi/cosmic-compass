import Link from "next/link";
import { GlobalFortuneMap } from "@/components/GlobalFortuneMap";
import { QuickReadingCard } from "@/components/QuickReadingCard";
import { SystemSelector } from "@/components/SystemSelector";
import { TrendingInsights } from "@/components/TrendingInsights";
import { ArrowRight, Sparkles, Globe2, MessageCircle, Star } from "lucide-react";

const features = [
  {
    icon: Globe2,
    title: "Multi-Cultural Wisdom",
    description: "Western astrology, Chinese BaZi, Vedic, and Tarot — compare perspectives",
    gradient: "from-fortune-gold to-fortune-peach",
  },
  {
    icon: MessageCircle,
    title: "AI Fortune Chat",
    description: "Talk with ancient sages, mystics, and cosmic AI guides",
    gradient: "from-fortune-rose to-fortune-lavender",
  },
  {
    icon: Star,
    title: "Fortune Pet",
    description: "Nurture your cosmic companion as your luck evolves",
    gradient: "from-fortune-lavender to-aurora-400",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative pt-16 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 mb-6">
            <Sparkles className="w-4 h-4 text-fortune-gold" />
            The first multi-culture fortune platform
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 leading-tight">
            Your Destiny
            <br />
            <span className="text-gradient">Across Cultures</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-8 leading-relaxed">
            One question, four answers. Compare Western astrology, Chinese BaZi,
            Vedic wisdom, and Tarot — all powered by AI.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/reading"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-cosmic-500 to-cosmic-600 text-white font-semibold text-lg hover:from-cosmic-400 hover:to-cosmic-500 transition-all duration-300 shadow-lg shadow-cosmic-500/25"
            >
              Get Your Reading
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 text-white/80 font-semibold text-lg hover:bg-white/5 transition-all duration-300"
            >
              Talk to AI
              <MessageCircle className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Global Fortune Map */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold font-display text-gradient">Live Global Fortune Map</h2>
            <p className="text-white/50 text-sm">Real-time collective energy across the world</p>
          </div>
          <Link
            href="/social"
            className="text-sm text-cosmic-300 hover:text-cosmic-200 flex items-center gap-1"
          >
            Explore <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <GlobalFortuneMap />
      </section>

      {/* Quick Reading Tools */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold font-display text-gradient">Quick Reading</h2>
            <p className="text-white/50 text-sm">Choose your fortune system</p>
          </div>
        </div>
        <SystemSelector />
      </section>

      {/* Daily Insight */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold font-display text-gradient">Today's Cosmic Pulse</h2>
            <p className="text-white/50 text-sm">What the universe is saying right now</p>
          </div>
        </div>
        <TrendingInsights />
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="glow-card group cursor-pointer">
                <div className="glow-card-content">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-2.5 mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

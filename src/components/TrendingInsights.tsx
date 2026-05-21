"use client";

const insights = [
  {
    type: "Love",
    sign: "Libra ♎",
    content: "Venus entering your 7th house brings unexpected romance. Someone from your past may reappear.",
    time: "2m ago",
    likes: "234",
    region: "Global",
  },
  {
    type: "Career",
    sign: "Capricorn ♑",
    content: "Saturn's transit suggests a major career shift. An opportunity from overseas looks promising.",
    time: "8m ago",
    likes: "189",
    region: "Asia",
  },
  {
    type: "Wealth",
    sign: "Taurus ♉",
    content: "Jupiter's alignment indicates financial growth. Consider investments in creative ventures.",
    time: "15m ago",
    likes: "156",
    region: "Europe",
  },
];

export function TrendingInsights() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {insights.map((insight, i) => (
        <div
          key={i}
          className="glow-card"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className="glow-card-content">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-cosmic-500/20 text-cosmic-300 border border-cosmic-500/20">
                {insight.type}
              </span>
              <span className="text-xs text-white/30">{insight.time}</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-3">
              {insight.content}
            </p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/40">{insight.sign}</span>
              <span className="text-white/30">{insight.region} · ♥ {insight.likes}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

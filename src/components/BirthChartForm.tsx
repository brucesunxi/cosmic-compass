"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function BirthChartForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    year: "1995",
    month: "6",
    day: "15",
    hour: "12",
    min: "0",
    gender: "other",
  });
  const [system, setSystem] = useState<string>("all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(formData);
    if (system === "all") {
      router.push(`/reading/compare?${params.toString()}`);
    } else {
      router.push(`/reading/${system}?${params.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glow-card">
      <div className="glow-card-content">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <div>
            <label className="block text-sm text-white/50 mb-1.5">Year</label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cosmic-400 transition-colors"
              placeholder="1995"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-white/50 mb-1.5">Month</label>
            <input
              type="number"
              min={1}
              max={12}
              value={formData.month}
              onChange={(e) => setFormData({ ...formData, month: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cosmic-400 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-white/50 mb-1.5">Day</label>
            <input
              type="number"
              min={1}
              max={31}
              value={formData.day}
              onChange={(e) => setFormData({ ...formData, day: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cosmic-400 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-white/50 mb-1.5">Hour (24h)</label>
            <input
              type="number"
              min={0}
              max={23}
              value={formData.hour}
              onChange={(e) => setFormData({ ...formData, hour: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cosmic-400 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-white/50 mb-1.5">Minute</label>
            <input
              type="number"
              min={0}
              max={59}
              value={formData.min}
              onChange={(e) => setFormData({ ...formData, min: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cosmic-400 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-white/50 mb-1.5">System</label>
            <select
              value={system}
              onChange={(e) => setSystem(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cosmic-400 transition-colors"
            >
              <option value="all">All Systems 🔄</option>
              <option value="western">Western</option>
              <option value="bazi">Chinese BaZi</option>
              <option value="vedic">Vedic</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-cosmic-500 to-cosmic-600 text-white font-semibold hover:from-cosmic-400 hover:to-cosmic-500 transition-all duration-300 shadow-lg shadow-cosmic-500/25"
        >
          Reveal My Fortune
        </button>
      </div>
    </form>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Sparkles } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Compass },
  { href: "/reading", label: "Readings", icon: Sparkles },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="relative z-20 border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-fortune-gold to-fortune-rose rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-cosmic-400 to-cosmic-600 flex items-center justify-center">
              <Compass className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gradient">Cosmic Compass</h1>
            <p className="text-[10px] text-white/40 -mt-1">Universal Fortune Guide</p>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-cosmic-500/20 text-cosmic-200 border border-cosmic-500/30"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ScrollText, MessageCircle, Users, User } from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/reading", icon: ScrollText, label: "Reading" },
  { href: "/chat", icon: MessageCircle, label: "Chat" },
  { href: "/social", icon: Users, label: "Social" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function FloatingNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-black/80 backdrop-blur-2xl border-t border-white/10">
        <div className="flex items-center justify-around py-2 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-cosmic-300"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

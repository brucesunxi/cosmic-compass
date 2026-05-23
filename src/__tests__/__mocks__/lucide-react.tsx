import React from "react";

// Create mock icon components for all possible lucide-react icons
const iconNames = [
  "ArrowRight", "Sparkles", "Globe2", "MessageCircle", "Star", "MapPin",
  "Compass", "Sun", "Moon", "Diamond", "Send", "Bot", "User", "RefreshCw",
  "Home", "ScrollText", "Users", "Heart", "Share2", "Settings", "Crown",
  "Clock", "LogOut", "ArrowLeft", "Scroll", "Map", "Search", "Menu", "X",
  "ChevronRight", "ChevronLeft", "ChevronDown", "Plus", "Minus", "Check",
  "Copy", "ExternalLink", "Loader2", "AlertCircle", "Info", "Trash2",
];

const iconMap: Record<string, React.ComponentType> = {};

iconNames.forEach((name) => {
  iconMap[name] = () =>
    React.createElement("div", { "data-testid": `icon-${name.toLowerCase()}` });
});

// Named exports for every icon (what the components actually import)
export const ArrowRight = iconMap.ArrowRight;
export const Sparkles = iconMap.Sparkles;
export const Globe2 = iconMap.Globe2;
export const MessageCircle = iconMap.MessageCircle;
export const Star = iconMap.Star;
export const MapPin = iconMap.MapPin;
export const Compass = iconMap.Compass;
export const Sun = iconMap.Sun;
export const Moon = iconMap.Moon;
export const Diamond = iconMap.Diamond;
export const Send = iconMap.Send;
export const Bot = iconMap.Bot;
export const User = iconMap.User;
export const RefreshCw = iconMap.RefreshCw;
export const Home = iconMap.Home;
export const ScrollText = iconMap.ScrollText;
export const Users = iconMap.Users;
export const Heart = iconMap.Heart;
export const Share2 = iconMap.Share2;
export const Settings = iconMap.Settings;
export const Crown = iconMap.Crown;
export const Clock = iconMap.Clock;
export const LogOut = iconMap.LogOut;
export const ArrowLeft = iconMap.ArrowLeft;

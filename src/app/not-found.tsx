import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4 max-w-md mx-auto px-4">
        <p className="text-6xl">🌙</p>
        <h1 className="text-3xl font-bold font-display text-gradient">
          Lost in the Cosmos
        </h1>
        <p className="text-white/50 leading-relaxed">
          This star chart doesn't exist. The universe must have redirected you for a reason.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-cosmic-500 to-cosmic-600 text-white font-semibold hover:from-cosmic-400 hover:to-cosmic-500 transition-all duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

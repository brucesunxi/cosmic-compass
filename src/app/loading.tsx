export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-2 border-cosmic-400 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-white/40 text-sm animate-pulse">Consulting the cosmos...</p>
      </div>
    </div>
  );
}

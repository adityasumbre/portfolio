import { cn } from "@/lib/utils";

/**
 * A pure-CSS stand-in for the WebGL hero scene.
 *
 * It renders while the 3D bundle loads, and stays permanently if WebGL is
 * unavailable (older devices, disabled hardware acceleration, etc.). It is
 * designed to look deliberate rather than like a missing asset.
 */
export function SceneFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      {/* Ambient glow */}
      <div className="absolute h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle,rgba(255,61,36,0.30),transparent_68%)] blur-3xl" />
      <div className="absolute h-[42%] w-[42%] translate-y-[18%] rounded-full bg-[radial-gradient(circle,rgba(255,176,32,0.20),transparent_70%)] blur-2xl" />

      {/* Orbit rings */}
      <div className="absolute h-[86%] w-[86%] rounded-full border border-white/[0.055]" />
      <div className="absolute h-[86%] w-[86%] animate-[spin_34s_linear_infinite] rounded-full border border-gold/20 [transform:rotateX(62deg)]" />
      <div className="absolute h-[66%] w-[66%] animate-[spin_22s_linear_infinite_reverse] rounded-full border border-wine/25 [transform:rotateX(68deg)_rotateZ(28deg)]" />
      <div className="absolute h-[50%] w-[50%] rounded-full border border-ember/20 [transform:rotateX(72deg)_rotateZ(-18deg)]" />

      {/* Orbit nodes */}
      <span className="absolute top-[16%] left-[26%] h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_12px_2px_rgba(255,176,32,0.8)]" />
      <span className="absolute right-[22%] bottom-[24%] h-1 w-1 rounded-full bg-wine shadow-[0_0_10px_2px_rgba(200,30,74,0.8)]" />
      <span className="absolute top-[30%] right-[18%] h-1 w-1 rounded-full bg-ember-soft shadow-[0_0_10px_2px_rgba(255,125,69,0.8)]" />

      {/* Core orb */}
      <div className="relative h-[34%] w-[34%] min-h-[110px] min-w-[110px]">
        <div className="absolute inset-0 animate-[drift_9s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle_at_32%_26%,#8a3418_0%,#33130c_46%,#0a0403_100%)] shadow-[inset_0_0_50px_rgba(255,176,32,0.22),inset_0_-20px_40px_rgba(0,0,0,0.6),0_0_90px_rgba(255,61,36,0.35)]" />
        <div className="absolute inset-[6%] rounded-full border border-gold/25" />
        <div className="absolute inset-[18%] rounded-full border border-white/[0.07]" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_70%_78%,rgba(200,30,74,0.35),transparent_55%)] mix-blend-screen" />
      </div>

      {/* Faint grid to tie it to the page */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(circle_at_center,#000_20%,transparent_72%)]" />
    </div>
  );
}

import { useEffect, useState } from 'react';

const BOOT_LINES = [
  'initializing comet-wm...',
  'loading stardust particles... ok',
  'mounting /dev/nebula... ok',
  'calibrating constellations... ok',
  'warming up pixels... done',
  'welcome, astronaut 🚀',
];

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setShown((s) => {
        if (s >= BOOT_LINES.length) {
          clearInterval(t);
          setTimeout(onDone, 450);
          return s;
        }
        return s + 1;
      });
    }, 320);
    return () => clearInterval(t);
  }, [onDone]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#050510] text-white">
      <div className="anim-float mb-4 text-7xl">🪐</div>
      <h1 className="mb-6 text-3xl font-bold tracking-tight">
        Stardust<span className="text-amber-300">OS</span>
      </h1>
      <div className="mb-6 h-1.5 w-64 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-400 to-amber-300"
          style={{ animation: 'boot-bar 2.3s ease-out forwards' }}
        />
      </div>
      <div className="h-36 w-72 font-mono text-[11px] leading-relaxed text-emerald-300/80">
        {BOOT_LINES.slice(0, shown).map((l, i) => (
          <div key={i}>&gt; {l}</div>
        ))}
        {shown < BOOT_LINES.length && <span className="anim-blink">▋</span>}
      </div>
    </div>
  );
}

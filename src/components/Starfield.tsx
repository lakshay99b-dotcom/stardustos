import { useMemo } from 'react';

export default function Starfield() {
  const stars = useMemo(
    () =>
      [...Array(70)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2.2 + 1,
        delay: Math.random() * 4,
        dur: Math.random() * 3 + 2,
        gold: Math.random() < 0.15,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: s.gold ? '#fcd34d' : '#ffffff',
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            boxShadow: s.gold ? '0 0 6px 1px rgba(252,211,77,0.6)' : '0 0 4px rgba(255,255,255,0.4)',
          }}
        />
      ))}
    </div>
  );
}

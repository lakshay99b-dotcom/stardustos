export default function About() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 overflow-y-auto bg-[#13132a]/95 p-6 text-center text-white">
      <div className="anim-float text-6xl">🪐</div>
      <h1 className="text-2xl font-bold tracking-tight">
        Stardust<span className="text-amber-300">OS</span>
      </h1>
      <p className="font-mono text-xs text-white/50">version 1.0 "Comet" · built for WebOS 1</p>
      <p className="max-w-sm text-sm leading-relaxed text-white/70">
        A tiny operating system that lives entirely in your browser. Drag the windows around, paint
        a masterpiece, hack away in the terminal, and discover your own constellation. Everything
        runs locally — no password, no servers, just stardust. ✨
      </p>
      <div className="mt-2 grid grid-cols-2 gap-2 text-left text-xs">
        <div className="rounded-lg bg-white/5 px-3 py-2">
          <div className="text-white/40">Kernel</div>
          <div className="font-mono text-emerald-300">react 19 + vite</div>
        </div>
        <div className="rounded-lg bg-white/5 px-3 py-2">
          <div className="text-white/40">Shell</div>
          <div className="font-mono text-emerald-300">stardust-sh</div>
        </div>
        <div className="rounded-lg bg-white/5 px-3 py-2">
          <div className="text-white/40">Window manager</div>
          <div className="font-mono text-emerald-300">comet-wm</div>
        </div>
        <div className="rounded-lg bg-white/5 px-3 py-2">
          <div className="text-white/40">Uptime</div>
          <div className="font-mono text-emerald-300">since the big bang</div>
        </div>
      </div>
      <p className="mt-2 text-[11px] text-white/30">Made with 💜 for the Stardance WebOS mission</p>
    </div>
  );
}

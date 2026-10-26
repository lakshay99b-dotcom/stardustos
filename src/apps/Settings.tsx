import type { OsApi } from '../os/types';
import { ACCENTS, WALLOPERS } from '../os/types';

export default function Settings({ os }: { os: OsApi }) {
  return (
    <div className="h-full overflow-y-auto bg-[#13132a]/95 p-4 text-white">
      <h2 className="mb-1 text-lg font-bold">⚙️ Settings</h2>
      <p className="mb-4 text-xs text-white/50">Make StardustOS truly yours.</p>

      <section className="mb-5">
        <h3 className="mb-2 text-xs font-bold tracking-widest text-white/60 uppercase">Wallpaper</h3>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {WALLPAPERS.map((w) => (
            <button
              key={w.id}
              onClick={() => os.setWallpaper(w)}
              className={`group overflow-hidden rounded-xl border-2 transition ${
                os.wallpaper.id === w.id ? 'border-amber-300' : 'border-white/10 hover:border-white/40'
              }`}
            >
              <div className="h-14 w-full" style={{ background: w.swatch }} />
              <div className="bg-black/40 px-1 py-1 text-center text-[10px] font-semibold text-white/80">
                {w.name}
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="mb-5">
        <h3 className="mb-2 text-xs font-bold tracking-widest text-white/60 uppercase">Accent color</h3>
        <div className="flex gap-3">
          {ACCENTS.map((a) => (
            <button
              key={a.id}
              onClick={() => os.setAccent(a.color)}
              className={`h-9 w-9 rounded-full border-2 transition ${
                os.accent === a.color ? 'scale-110 border-white' : 'border-white/20 hover:scale-105'
              }`}
              style={{ background: a.color }}
              title={a.id}
            />
          ))}
        </div>
      </section>

      <section className="mb-5">
        <h3 className="mb-2 text-xs font-bold tracking-widest text-white/60 uppercase">Effects</h3>
        <label className="flex cursor-pointer items-center justify-between rounded-xl bg-white/5 px-3 py-2.5 hover:bg-white/10">
          <div>
            <div className="text-sm font-semibold">Twinkling stars</div>
            <div className="text-[11px] text-white/50">Animated stars on the desktop background</div>
          </div>
          <button
            onClick={() => os.setStarsEnabled(!os.starsEnabled)}
            className={`relative h-6 w-11 rounded-full transition ${
              os.starsEnabled ? '' : 'bg-white/15'
            }`}
            style={os.starsEnabled ? { background: os.accent } : undefined}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                os.starsEnabled ? 'left-[22px]' : 'left-0.5'
              }`}
            />
          </button>
        </label>
      </section>

      <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-[11px] text-white/40">
        Tip: your wallpaper, accent and notes are saved in your browser — they'll still be here next
        time you boot up. 🚀
      </div>
    </div>
  );
}

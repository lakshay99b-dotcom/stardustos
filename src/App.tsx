import { useCallback, useEffect, useRef, useState } from 'react';
import type { OsApi, Wallpaper, WindowState } from './os/types';
import { WALLOPERS } from './os/types';
import { APPS, getApp } from './os/registry';
import Window from './components/Window';
import Taskbar from './components/Taskbar';
import Starfield from './components/Starfield';
import BootScreen from './components/BootScreen';

let nextId = 1;
let nextZ = 10;

export default function App() {
  const [booted, setBooted] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [focusedId, setFocusedId] = useState<number | null>(null);
  const [wallpaper, setWallpaperState] = useState<Wallpaper>(() => {
    const saved = localStorage.getItem('stardust-wallpaper');
    return WALLPAPERS.find((w) => w.id === saved) ?? WALLPAPERS[0];
  });
  const [accent, setAccentState] = useState<string>(
    () => localStorage.getItem('stardust-accent') ?? '#a78bfa'
  );
  const [starsEnabled, setStarsEnabledState] = useState<boolean>(
    () => localStorage.getItem('stardust-stars') !== 'off'
  );
  const openedOnce = useRef(false);

  const setWallpaper = (w: Wallpaper) => {
    setWallpaperState(w);
    localStorage.setItem('stardust-wallpaper', w.id);
  };
  const setAccent = (a: string) => {
    setAccentState(a);
    localStorage.setItem('stardust-accent', a);
  };
  const setStarsEnabled = (b: boolean) => {
    setStarsEnabledState(b);
    localStorage.setItem('stardust-stars', b ? 'on' : 'off');
  };

  const focusWindow = (id: number) => {
    setFocusedId(id);
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, z: ++nextZ, minimized: false } : w)));
  };

  const openApp = useCallback((appId: string) => {
    const app = getApp(appId);
    if (!app) return;
    setWindows((ws) => {
      // if already open, just focus/restore it
      const existing = ws.find((w) => w.appId === appId);
      if (existing) {
        setFocusedId(existing.id);
        return ws.map((w) =>
          w.id === existing.id ? { ...w, z: ++nextZ, minimized: false } : w
        );
      }
      const id = nextId++;
      const offset = (ws.length % 6) * 32;
      const vw = window.innerWidth;
      const vh = window.innerHeight - 58;
      const w = Math.min(app.defaultSize.w, vw - 24);
      const h = Math.min(app.defaultSize.h, vh - 24);
      const win: WindowState = {
        id,
        appId,
        x: Math.max(8, (vw - w) / 2 + offset - 60),
        y: Math.max(8, (vh - h) / 2 + offset - 40),
        w,
        h,
        z: ++nextZ,
        minimized: false,
        maximized: false,
      };
      setFocusedId(id);
      return [...ws, win];
    });
  }, []);

  const os: OsApi = {
    openApp,
    wallpaper,
    setWallpaper,
    accent,
    setAccent,
    starsEnabled,
    setStarsEnabled,
  };

  // open Terminal once after boot
  useEffect(() => {
    if (booted && !openedOnce.current) {
      openedOnce.current = true;
      setTimeout(() => openApp('terminal'), 400);
    }
  }, [booted, openApp]);

  if (!booted) {
    return <BootScreen onDone={() => setBooted(true)} />;
  }

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: wallpaper.css }}
    >
      {starsEnabled && <Starfield />}

      {/* Desktop icons */}
      <div className="absolute left-4 top-4 z-0 flex flex-col gap-3">
        {APPS.map((app) => (
          <button
            key={app.id}
            onDoubleClick={() => openApp(app.id)}
            className="group flex w-20 flex-col items-center gap-1 rounded-xl p-2 transition hover:bg-white/10 focus:bg-white/15 focus:outline-none"
            title={`Double-click to open ${app.name}`}
          >
            <span className="text-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] transition group-hover:scale-110 group-active:scale-95">
              {app.icon}
            </span>
            <span className="text-center text-[11px] leading-tight font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              {app.name}
            </span>
          </button>
        ))}
      </div>

      {/* Hint when nothing is open */}
      {windows.length === 0 && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white/30">
            <div className="mb-2 text-5xl">★</div>
            <div className="text-sm font-semibold">Double-click an icon or hit Start to launch an app</div>
          </div>
        </div>
      )}

      {/* Windows */}
      {windows.map((win) => (
        <Window
          key={win.id}
          win={win}
          os={os}
          focused={focusedId === win.id}
          onFocus={() => focusWindow(win.id)}
          onClose={() => {
            setWindows((ws) => ws.filter((w) => w.id !== win.id));
            if (focusedId === win.id) setFocusedId(null);
          }}
          onMinimize={() =>
            setWindows((ws) => ws.map((w) => (w.id === win.id ? { ...w, minimized: true } : w)))
          }
          onToggleMaximize={() =>
            setWindows((ws) =>
              ws.map((w) => (w.id === win.id ? { ...w, maximized: !w.maximized, z: ++nextZ } : w))
            )
          }
          onMove={(x, y) =>
            setWindows((ws) => ws.map((w) => (w.id === win.id ? { ...w, x, y } : w)))
          }
          onResize={(wd, h) =>
            setWindows((ws) => ws.map((w) => (w.id === win.id ? { ...w, w: wd, h } : w)))
          }
        />
      ))}

      <Taskbar
        os={os}
        windows={windows}
        focusedId={focusedId}
        onTaskClick={(id) => {
          const win = windows.find((w) => w.id === id);
          if (!win) return;
          if (win.minimized || focusedId !== id) {
            focusWindow(id);
          } else {
            setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
          }
        }}
      />
    </div>
  );
}

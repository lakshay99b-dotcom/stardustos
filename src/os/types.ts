export interface WindowState {
  id: number;
  appId: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
}

export interface Wallpaper {
  id: string;
  name: string;
  css: string; // background css value
  swatch: string;
}

export interface OsApi {
  openApp: (appId: string) => void;
  wallpaper: Wallpaper;
  setWallpaper: (w: Wallpaper) => void;
  accent: string;
  setAccent: (a: string) => void;
  starsEnabled: boolean;
  setStarsEnabled: (b: boolean) => void;
}

export const WALLPAPERS: Wallpaper[] = [
  {
    id: 'nebula',
    name: 'Nebula',
    css: 'radial-gradient(ellipse at 20% 10%, #3b1d60 0%, transparent 55%), radial-gradient(ellipse at 85% 85%, #11336b 0%, transparent 55%), radial-gradient(ellipse at 70% 20%, #5b2a86 0%, transparent 45%), linear-gradient(160deg, #0a0a1f 0%, #141432 50%, #0b0b22 100%)',
    swatch: 'linear-gradient(135deg, #3b1d60, #141432)',
  },
  {
    id: 'aurora',
    name: 'Aurora',
    css: 'radial-gradient(ellipse at 15% 90%, #0f5e4f 0%, transparent 55%), radial-gradient(ellipse at 80% 15%, #14746f 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, #1b3a4b 0%, transparent 70%), linear-gradient(170deg, #040d12 0%, #0a1f24 100%)',
    swatch: 'linear-gradient(135deg, #14746f, #0a1f24)',
  },
  {
    id: 'solar',
    name: 'Solar Flare',
    css: 'radial-gradient(ellipse at 80% 85%, #7a2714 0%, transparent 50%), radial-gradient(ellipse at 20% 20%, #5e1a4e 0%, transparent 55%), linear-gradient(150deg, #170a0a 0%, #2a0f1e 60%, #1a0a14 100%)',
    swatch: 'linear-gradient(135deg, #7a2714, #2a0f1e)',
  },
  {
    id: 'void',
    name: 'Deep Void',
    css: 'radial-gradient(ellipse at 50% 120%, #1b1b3a 0%, transparent 65%), linear-gradient(180deg, #030308 0%, #0a0a18 100%)',
    swatch: 'linear-gradient(135deg, #1b1b3a, #030308)',
  },
  {
    id: 'comet',
    name: 'Comet Ice',
    css: 'radial-gradient(ellipse at 10% 15%, #10456b 0%, transparent 55%), radial-gradient(ellipse at 90% 80%, #2a6f97 0%, transparent 45%), linear-gradient(165deg, #06111f 0%, #0b2135 100%)',
    swatch: 'linear-gradient(135deg, #2a6f97, #06111f)',
  },
];

export const ACCENTS = [
  { id: 'violet', color: '#a78bfa' },
  { id: 'cyan', color: '#67e8f9' },
  { id: 'emerald', color: '#6ee7b7' },
  { id: 'amber', color: '#fcd34d' },
  { id: 'rose', color: '#fda4af' },
];

<div align="center">

# 🪐 StardustOS

**A tiny operating system that lives entirely in your browser.**

Built for the ★ **STARDANCE WebOS 1** mission — no password, no servers, just stardust.

![version](https://img.shields.io/badge/version-1.0_%22Comet%22-a78bfa?style=flat-square)
![build](https://img.shields.io/badge/build-passing-6ee7b7?style=flat-square)
![license](https://img.shields.io/badge/license-MIT-fcd34d?style=flat-square)
![windows](https://img.shields.io/badge/draggable_windows-yes_✨-67e8f9?style=flat-square)

<!-- Replace these with your own screenshots: public/screenshots/desktop.png etc. -->
![StardustOS desktop](public/screenshots/desktop.png)

</div>

---

## ✨ What is this?

StardustOS is a web-based operating system written in **React + TypeScript + Tailwind CSS**. It has a
real window manager, a working terminal, seven apps, theming, and a boot sequence — all client-side
in a single page.

Try it live: **`npm run dev`**, or just open the deployed build. There is deliberately **no login
screen** so anyone can poke at it.

---

## 📸 Screenshots

```
|                           |                                                |
| ------------------------- | ---------------------------------------------- |
| 🖥️ Terminal (`neofetch`) | ![terminal](public/screenshots/terminal.png)   |
| 🔭 Stargazer              | ![stargazer](public/screenshots/stargazer.png) |
| 🎨 Nebula Paint           | ![paint](public/screenshots/paint.png)         |
| ⚙️ Settings & wallpapers  | ![settings](public/screenshots/settings.png)   |
```

---

## 🚀 Features

### Window manager — `comet-wm`

- [x] Multiple windows, freely **draggable** by the title bar
- [x] **Resizable** from the bottom-right corner (min 260×180)
- [x] Minimize / maximize / restore / close (macOS-style traffic lights)
- [x] Click-to-focus with z-index stacking + dimmed unfocused windows
- [x] Taskbar with active-window indicator and live clock
- [x] Start menu launcher
- [x] Double-click desktop icons to open apps
- [x] Smooth open animation

### Apps

```
| Icon | App              | What it does                                                                                                                                           |
| ---- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 🖥️  | **Terminal**     | Real shell: `help`, `neofetch`, `cowsay`, `echo`, `date`, `star`, `apps`, `open <app>` (launches actual windows!), `clear`. Arrow-key command history. |
| 📝   | **Star Notes**   | Colourful sticky notes, auto-saved to `localStorage`                                                                                                   |
| 🎨   | **Nebula Paint** | Canvas drawing, 8-colour palette, brush size, eraser, PNG export                                                                                       |
| 🧮   | **Calculator**   | Expression evaluator with parentheses                                                                                                                  |
| 🔭   | **Stargazer**    | Procedurally generated, animated constellations with silly names                                                                                       |
| ⚙️   | **Settings**     | 5 wallpapers, 5 accent colours, starfield toggle — all persisted                                                                                       |
| 🪐   | **About**        | System info page                                                                                                                                       |
```

### Extras beyond the mission guide

- Animated **boot screen** with fake kernel logs and a progress bar
- **Stargazer** constellation generator
- **Terminal can launch apps** (`open paint`)
- Twinkling starfield desktop effect (togglable)
- Wallpaper + accent theming saved across sessions

---

## 🛠️ Getting started

```bash
git clone https://github.com/lakshay99b-dotcom/stardustos.git
cd stardustos
npm install
npm run dev      # start the dev server
npm run build    # production build → dist/index.html
```

Requires **Node 18+**.

---

## 🗂️ Project structure

```
src/
├── App.tsx                 # desktop shell + window manager state
├── index.css               # Tailwind + fonts + keyframe animations
├── os/
│   ├── types.ts            # WindowState, OsApi, wallpapers, accents
│   └── registry.tsx        # the app table: id → icon, name, component, size
├── components/
│   ├── Window.tsx          # draggable / resizable window chrome
│   ├── Taskbar.tsx         # taskbar + start menu + clock
│   ├── BootScreen.tsx      # animated boot sequence
│   └── Starfield.tsx       # twinkling background stars
└── apps/
    ├── Terminal.tsx
    ├── Notes.tsx
    ├── Paint.tsx
    ├── Calculator.tsx
    ├── Stargazer.tsx
    ├── Settings.tsx
    └── About.tsx
```

### Adding your own app

1. Create `src/apps/MyApp.tsx` — a component that optionally takes `{ os }: { os: OsApi }`.
2. Register it in `src/os/registry.tsx`:

```tsx
{
  id: 'myapp',
  name: 'My App',
  icon: '🛰️',
  component: MyApp,
  defaultSize: { w: 480, h: 360 },
}
```

That's it — it appears in the Start menu, on the desktop, in the taskbar, and via `open myapp` in
the terminal.

---

## 🧠 How it works

Windows are plain React state objects in `App.tsx`:

```ts
interface WindowState {
  id: number; appId: string;
  x: number; y: number; w: number; h: number;
  z: number; minimized: boolean; maximized: boolean;
}
```

Dragging uses Pointer Events (works with mouse *and* touch) with `setPointerCapture` so the drag
doesn't drop when the cursor leaves the title bar. Focus bumps a monotonically increasing `z`
counter. Theme + notes are persisted to `localStorage`, so your desktop looks the same next boot.

---

## 🙏 Credits

Built for the **[Stardance](https://stardance.hackclub.com/) WebOS 1** mission.

Wallpapers are pure CSS gradients; all icons are emoji; fonts are
[Space Grotesk](https://fonts.google.com/specimen/Space_Grotesk) +
[JetBrains Mono](https://fonts.google.com/specimen/JetBrains_Mono).

## 📄 License

MIT — take it, fork it, make it yours. Just leave a star ✨

<div align="center">

**made with 💜 and an unreasonable number of gradients**

</div>

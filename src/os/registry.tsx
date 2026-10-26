import type { ComponentType } from 'react';
import type { OsApi } from './types';
import Terminal from '../apps/Terminal';
import Notes from '../apps/Notes';
import Calculator from '../apps/Calculator';
import Paint from '../apps/Paint';
import Stargazer from '../apps/Stargazer';
import Settings from '../apps/Settings';
import About from '../apps/About';

export interface AppDef {
  id: string;
  name: string;
  icon: string;
  component: ComponentType<{ os: OsApi }>;
  defaultSize: { w: number; h: number };
  minSize?: { w: number; h: number };
}

export const APPS: AppDef[] = [
  {
    id: 'terminal',
    name: 'Terminal',
    icon: '🖥️',
    component: Terminal,
    defaultSize: { w: 560, h: 380 },
  },
  {
    id: 'notes',
    name: 'Star Notes',
    icon: '📝',
    component: Notes,
    defaultSize: { w: 460, h: 420 },
  },
  {
    id: 'paint',
    name: 'Nebula Paint',
    icon: '🎨',
    component: Paint,
    defaultSize: { w: 560, h: 440 },
  },
  {
    id: 'calc',
    name: 'Calculator',
    icon: '🧮',
    component: Calculator,
    defaultSize: { w: 300, h: 420 },
  },
  {
    id: 'stargazer',
    name: 'Stargazer',
    icon: '🔭',
    component: Stargazer,
    defaultSize: { w: 540, h: 400 },
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: '⚙️',
    component: Settings,
    defaultSize: { w: 520, h: 460 },
  },
  {
    id: 'about',
    name: 'About',
    icon: '🪐',
    component: About,
    defaultSize: { w: 440, h: 520 },
  },
];

export const getApp = (id: string) => APPS.find((a) => a.id === id);

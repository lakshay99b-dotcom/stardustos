import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [expr, setExpr] = useState('');

  const press = (k: string) => {
    if (k === 'C') {
      setDisplay('0');
      setExpr('');
      return;
    }
    if (k === '⌫') {
      setDisplay((d) => (d.length > 1 ? d.slice(0, -1) : '0'));
      return;
    }
    if (k === '=') {
      try {
        const safe = display.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
        if (!/^[\d+\-*/.() ]+$/.test(safe)) throw new Error('bad');
        // eslint-disable-next-line no-new-func
        const result = Function(`"use strict"; return (${safe})`)();
        setExpr(display + ' =');
        setDisplay(
          Number.isFinite(result) ? String(Math.round(result * 1e10) / 1e10) : '∞ (black hole)'
        );
      } catch {
        setDisplay('Error');
      }
      return;
    }
    setDisplay((d) => (d === '0' || d === 'Error' ? k : d + k));
  };

  const keys = [
    'C', '(', ')', '÷',
    '7', '8', '9', '×',
    '4', '5', '6', '−',
    '1', '2', '3', '+',
    '0', '.', '⌫', '=',
  ];

  return (
    <div className="flex h-full flex-col bg-[#13132a]/95 p-3">
      <div className="mb-3 rounded-xl bg-black/40 px-4 py-3 text-right">
        <div className="h-4 truncate font-mono text-xs text-white/40">{expr || '\u00a0'}</div>
        <div className="truncate font-mono text-3xl font-semibold text-amber-200">{display}</div>
      </div>
      <div className="grid flex-1 grid-cols-4 gap-2">
        {keys.map((k) => (
          <button
            key={k}
            onClick={() => press(k)}
            className={`rounded-xl text-lg font-semibold transition active:scale-95 ${
              k === '='
                ? 'bg-violet-400 text-black hover:bg-violet-300'
                : '÷×−+'.includes(k)
                  ? 'bg-white/15 text-amber-200 hover:bg-white/25'
                  : k === 'C'
                    ? 'bg-rose-400/30 text-rose-200 hover:bg-rose-400/50'
                    : 'bg-white/8 text-white hover:bg-white/15'
            }`}
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}

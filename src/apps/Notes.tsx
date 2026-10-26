import { useEffect, useState } from 'react';

const KEY = 'stardust-notes';

interface Note {
  id: number;
  text: string;
  color: string;
}

const COLORS = ['#fcd34d', '#fda4af', '#a78bfa', '#6ee7b7', '#67e8f9'];

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      /* ignore */
    }
    return [{ id: 1, text: 'Welcome to Star Notes! ✨\nYour notes are saved automatically.', color: '#fcd34d' }];
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = () =>
    setNotes((n) => [
      { id: Date.now(), text: '', color: COLORS[n.length % COLORS.length] },
      ...n,
    ]);

  return (
    <div className="flex h-full flex-col bg-[#13132a]/95">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <span className="text-xs font-semibold tracking-wider text-white/60 uppercase">
          {notes.length} note{notes.length === 1 ? '' : 's'} · saved locally
        </span>
        <button
          onClick={addNote}
          className="rounded-lg bg-amber-300/90 px-3 py-1 text-xs font-bold text-black transition hover:bg-amber-200"
        >
          + New note
        </button>
      </div>
      <div className="grid flex-1 content-start gap-3 overflow-y-auto p-3 sm:grid-cols-2">
        {notes.map((note) => (
          <div
            key={note.id}
            className="group relative flex min-h-32 flex-col rounded-xl p-3 shadow-lg"
            style={{ background: note.color, transform: `rotate(${((note.id % 3) - 1) * 0.8}deg)` }}
          >
            <textarea
              value={note.text}
              onChange={(e) =>
                setNotes((all) => all.map((n) => (n.id === note.id ? { ...n, text: e.target.value } : n)))
              }
              placeholder="Write something..."
              className="h-full w-full flex-1 resize-none bg-transparent text-sm font-medium text-black/80 placeholder-black/40 outline-none"
              style={{ userSelect: 'text' }}
            />
            <button
              onClick={() => setNotes((all) => all.filter((n) => n.id !== note.id))}
              className="absolute top-1.5 right-1.5 hidden h-5 w-5 items-center justify-center rounded-full bg-black/15 text-xs text-black/60 group-hover:flex hover:bg-black/30"
              title="Delete note"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

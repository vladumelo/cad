'use client';

import { useCadStore } from '@/store/useCadStore';
import { DisplayMode } from '@/types/domain';

const tabs: Array<{ id: DisplayMode; label: string }> = [
  { id: 'constructor', label: 'Конструктор' },
  { id: 'materials', label: 'Материалы' },
  { id: 'assembly', label: 'Сборка' },
  { id: 'cutting', label: 'Раскрой' },
  { id: 'specification', label: 'Спецификация' },
  { id: 'export', label: 'Экспорт' },
];

export const TopBar = () => {
  const { displayMode, setDisplayMode, undo, redo, sceneMode, setSceneMode } = useCadStore();

  return (
    <header className="flex items-center justify-between border-b border-border bg-panel px-4 py-3">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setDisplayMode(tab.id)}
            className={`rounded-md px-3 py-1.5 text-sm ${displayMode === tab.id ? 'bg-accent text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button className="rounded bg-slate-100 px-3 py-1" onClick={undo}>Undo</button>
        <button className="rounded bg-slate-100 px-3 py-1" onClick={redo}>Redo</button>
        <button className="rounded bg-slate-100 px-3 py-1" onClick={() => setSceneMode(sceneMode === 'beauty' ? 'technical' : 'beauty')}>
          {sceneMode === 'beauty' ? 'Beauty' : 'Technical'}
        </button>
      </div>
    </header>
  );
};

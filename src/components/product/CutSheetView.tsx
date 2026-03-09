'use client';

import { useCadStore } from '@/store/useCadStore';

export const CutSheetView = () => {
  const { cutSheets } = useCadStore();
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold">Карта раскроя фанеры</h3>
      {cutSheets.map((sheet) => {
        const waste = 100 - (sheet.usedArea / (sheet.width * sheet.height)) * 100;
        return (
          <div key={sheet.sheetIndex} className="rounded border border-border bg-white p-2">
            <div className="mb-1 text-xs">Лист #{sheet.sheetIndex}, отход {waste.toFixed(1)}%</div>
            <svg viewBox={`0 0 ${sheet.width} ${sheet.height}`} className="h-40 w-full rounded bg-slate-50">
              <rect x={0} y={0} width={sheet.width} height={sheet.height} fill="#f8fafc" stroke="#64748b" strokeWidth="4" />
              {sheet.placements.map((p, i) => (
                <g key={`${p.partId}-${i}`}>
                  <rect x={p.x} y={p.y} width={p.width} height={p.height} fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2" />
                  <text x={p.x + 8} y={p.y + 16} fontSize="22">{p.partId}</text>
                </g>
              ))}
            </svg>
          </div>
        );
      })}
    </div>
  );
};

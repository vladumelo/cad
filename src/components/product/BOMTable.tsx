'use client';

import { useCadStore } from '@/store/useCadStore';

export const BOMTable = () => {
  const { parts } = useCadStore();
  return (
    <div className="rounded border border-border bg-white p-3">
      <h3 className="mb-2 text-sm font-semibold">Список деталей</h3>
      <div className="max-h-80 overflow-auto text-xs">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50">
              <th className="p-1 text-left">Код</th><th className="p-1 text-left">Наименование</th><th>Дл.</th><th>Шир.</th><th>Кол-во</th>
            </tr>
          </thead>
          <tbody>
            {parts.map((p) => (
              <tr key={p.id} className="border-b border-slate-100">
                <td className="p-1">{p.code}</td>
                <td className="p-1">{p.name}</td>
                <td className="text-center">{p.length || '-'}</td>
                <td className="text-center">{p.width || '-'}</td>
                <td className="text-center">{p.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

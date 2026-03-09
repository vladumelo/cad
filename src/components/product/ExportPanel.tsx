'use client';

import { jsPDF } from 'jspdf';
import { useCadStore } from '@/store/useCadStore';

export const ExportPanel = () => {
  const { activeProduct, parts } = useCadStore();

  const exportJson = () => {
    const blob = new Blob([JSON.stringify({ activeProduct, parts }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${activeProduct.name}.json`;
    a.click();
  };

  const exportCsv = () => {
    const rows = ['code,name,qty,length,width,height', ...parts.map((p) => [p.code, p.name, p.qty, p.length || '', p.width || '', p.height || ''].join(','))];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${activeProduct.name}.csv`;
    a.click();
  };

  const exportPdf = () => {
    const doc = new jsPDF();
    doc.text(`Спецификация: ${activeProduct.name}`, 10, 10);
    parts.slice(0, 30).forEach((p, i) => doc.text(`${p.code} ${p.name} x${p.qty}`, 10, 20 + i * 6));
    doc.save(`${activeProduct.name}.pdf`);
  };

  return (
    <div className="rounded border border-border bg-white p-3 text-xs">
      <h3 className="mb-2 text-sm font-semibold">Экспорт</h3>
      <div className="flex gap-2">
        <button className="rounded bg-slate-100 px-3 py-1" onClick={exportJson}>JSON</button>
        <button className="rounded bg-slate-100 px-3 py-1" onClick={exportCsv}>CSV</button>
        <button className="rounded bg-slate-100 px-3 py-1" onClick={exportPdf}>PDF</button>
      </div>
    </div>
  );
};

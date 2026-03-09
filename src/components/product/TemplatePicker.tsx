'use client';

import { templates } from '@/data/templates';
import { useCadStore } from '@/store/useCadStore';

export const TemplatePicker = () => {
  const { activeProduct, selectTemplate } = useCadStore();

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">Шаблоны изделий</h3>
      <div className="grid grid-cols-2 gap-2">
        {templates.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => selectTemplate(tpl.id)}
            className={`rounded border p-2 text-left text-xs ${activeProduct.name === tpl.name ? 'border-accent bg-blue-50' : 'border-border bg-white'}`}
          >
            <div className="font-medium">{tpl.name}</div>
            <div className="text-slate-500">{tpl.width}×{tpl.height}×{tpl.depth}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

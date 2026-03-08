'use client';

import { useCadStore } from '@/store/useCadStore';

export const MaterialSelector = () => {
  const { activeProduct, materials, updateProduct } = useCadStore();
  const frame = materials.filter((m) => m.kind === 'metal_profile');
  const shelves = materials.filter((m) => m.kind === 'plywood');

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">Материалы</h3>
      <label className="flex flex-col text-xs">
        Каркас
        <select
          className="rounded border border-border p-1"
          value={activeProduct.frameMaterialId}
          onChange={(e) => {
            const material = frame.find((m) => m.id === e.target.value);
            updateProduct({ frameMaterialId: e.target.value, frameProfile: material?.section });
          }}
        >
          {frame.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </label>
      <label className="flex flex-col text-xs">
        Полки
        <select
          className="rounded border border-border p-1"
          value={activeProduct.shelfMaterialId}
          onChange={(e) => updateProduct({ shelfMaterialId: e.target.value })}
        >
          {shelves.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </label>
    </div>
  );
};

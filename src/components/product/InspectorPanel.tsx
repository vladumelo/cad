'use client';

import { useCadStore } from '@/store/useCadStore';
import { TemplatePicker } from '@/components/product/TemplatePicker';
import { DimensionsPanel } from '@/components/product/DimensionsPanel';
import { MaterialSelector } from '@/components/product/MaterialSelector';
import { ValidationAlerts } from '@/components/product/ValidationAlerts';

export const InspectorPanel = () => {
  const { parts, selectedPartId } = useCadStore();
  const selected = parts.find((p) => p.id === selectedPartId);

  return (
    <aside className="h-full space-y-4 overflow-y-auto rounded-xl border border-border bg-panel p-3">
      <TemplatePicker />
      <DimensionsPanel />
      <MaterialSelector />
      {selected && (
        <div className="rounded border border-accent/30 bg-blue-50 p-2 text-xs">
          <div className="font-semibold">Выбрано: {selected.name}</div>
          <div>Код: {selected.code}</div>
          <div>Количество: {selected.qty}</div>
        </div>
      )}
      <ValidationAlerts />
    </aside>
  );
};

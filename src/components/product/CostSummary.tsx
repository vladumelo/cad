'use client';

import { useCadStore } from '@/store/useCadStore';

export const CostSummary = () => {
  const { bom } = useCadStore();
  return (
    <div className="rounded border border-border bg-white p-3 text-xs">
      <h3 className="mb-2 text-sm font-semibold">Сводка материалов и стоимости</h3>
      <div>Профиль: {Object.entries(bom.metalLengthByProfile).map(([k, v]) => `${k}: ${v.toFixed(2)} м`).join(', ')}</div>
      <div>Фанера: {bom.plywoodArea.toFixed(2)} м²</div>
      <div>Масса: {bom.massKg.toFixed(1)} кг</div>
      <div className="font-semibold">Итого: {bom.totalCost.toFixed(0)} ₽</div>
    </div>
  );
};

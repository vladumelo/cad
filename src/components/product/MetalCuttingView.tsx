'use client';

import { useCadStore } from '@/store/useCadStore';

export const MetalCuttingView = () => {
  const { metalCutting } = useCadStore();
  return (
    <div className="rounded border border-border bg-white p-3 text-xs">
      <h3 className="mb-2 text-sm font-semibold">Раскрой профиля (хлыст 6000 мм)</h3>
      {metalCutting.map((plan) => (
        <div key={plan.profile} className="mb-2">
          <div className="font-semibold">{plan.profile}</div>
          {plan.bars.map((bar) => <div key={bar.index}>Хлыст {bar.index}: {bar.cuts.join(' + ')} = {bar.used} мм</div>)}
        </div>
      ))}
    </div>
  );
};

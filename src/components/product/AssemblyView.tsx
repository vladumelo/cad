'use client';

import { useCadStore } from '@/store/useCadStore';

export const AssemblyView = () => {
  const { assemblySteps } = useCadStore();
  return (
    <div className="rounded border border-border bg-white p-3">
      <h3 className="mb-2 text-sm font-semibold">Схема сборки</h3>
      <ol className="space-y-2 text-xs">
        {assemblySteps.map((step) => (
          <li key={step.id} className="rounded border border-slate-200 p-2">
            <div className="font-semibold">Шаг {step.order}: {step.title}</div>
            <div>{step.description}</div>
            <div className="text-slate-500">Детали: {step.parts.join(', ')}</div>
          </li>
        ))}
      </ol>
    </div>
  );
};

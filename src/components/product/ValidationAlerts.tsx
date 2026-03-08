'use client';

import { useCadStore } from '@/store/useCadStore';

export const ValidationAlerts = () => {
  const { validationMessages } = useCadStore();
  if (!validationMessages.length) return null;

  return (
    <div className="space-y-2">
      {validationMessages.map((v) => (
        <div key={v.id} className="rounded border border-amber-200 bg-amber-50 p-2 text-xs">
          <div className="font-semibold text-amber-700">{v.title}</div>
          <div>{v.message}</div>
          <div className="text-amber-700">→ {v.suggestion}</div>
        </div>
      ))}
    </div>
  );
};

import { MetalCutPlan, Part } from '@/types/domain';

export const STOCK_LENGTH = 6000;

export const generateMetalCutting = (parts: Part[]): MetalCutPlan[] => {
  const grouped: Record<string, number[]> = {};
  parts
    .filter((p) => p.category === 'frame' && p.length)
    .forEach((p) => {
      const profile = String(p.meta?.profile || '40x20x2');
      grouped[profile] = grouped[profile] || [];
      for (let i = 0; i < p.qty; i += 1) grouped[profile].push(p.length || 0);
    });

  return Object.entries(grouped).map(([profile, lengths]) => {
    const cuts = [...lengths].sort((a, b) => b - a);
    const bars: MetalCutPlan['bars'] = [];

    cuts.forEach((cut) => {
      let target = bars.find((b) => b.used + cut <= STOCK_LENGTH);
      if (!target) {
        target = { index: bars.length + 1, cuts: [], used: 0 };
        bars.push(target);
      }
      target.cuts.push(cut);
      target.used += cut;
    });

    return { profile, stockLength: STOCK_LENGTH, bars };
  });
};

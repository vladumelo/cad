import { Material, Part, BomSummary } from '@/types/domain';
import { mmToM } from '@/lib/utils/profile';

export const buildBomSummary = (parts: Part[], materialList: Material[]): BomSummary => {
  const materialById = new Map(materialList.map((m) => [m.id, m]));
  const metalLengthByProfile: Record<string, number> = {};
  let plywoodArea = 0;
  let hardwareCount = 0;
  let massKg = 0;
  let totalCost = 0;

  parts.forEach((part) => {
    const material = materialById.get(part.materialId);
    if (!material) return;

    if (material.kind === 'metal_profile' && part.length) {
      const lengthM = mmToM(part.length) * part.qty;
      const profile = material.section || 'unknown';
      metalLengthByProfile[profile] = (metalLengthByProfile[profile] || 0) + lengthM;
      totalCost += lengthM * material.costPerUnit;
      massKg += lengthM * (material.density || 2);
    }

    if (material.kind === 'plywood') {
      const area = part.area || ((part.width || 0) * (part.height || 0)) / 1_000_000;
      plywoodArea += area * part.qty;
      totalCost += area * part.qty * material.costPerUnit;
      massKg += area * part.qty * (material.thickness || 18) * 0.00065;
    }

    if (material.kind === 'hardware') {
      hardwareCount += part.qty;
      totalCost += part.qty * material.costPerUnit;
    }
  });

  return { metalLengthByProfile, plywoodArea, hardwareCount, massKg, totalCost };
};

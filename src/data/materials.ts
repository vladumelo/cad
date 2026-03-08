import { Material } from '@/types/domain';

export const materials: Material[] = [
  {
    id: 'metal-40x20x2',
    name: 'Профиль 40x20x2',
    kind: 'metal_profile',
    section: '40x20x2',
    density: 2.3,
    costPerUnit: 290,
    unit: 'm',
    color: '#475569',
  },
  {
    id: 'metal-40x40x2',
    name: 'Профиль 40x40x2',
    kind: 'metal_profile',
    section: '40x40x2',
    density: 2.8,
    costPerUnit: 360,
    unit: 'm',
    color: '#334155',
  },
  {
    id: 'plywood-18',
    name: 'Фанера ФК 18 мм',
    kind: 'plywood',
    thickness: 18,
    costPerUnit: 1450,
    unit: 'm2',
    texture: 'plywood',
    color: '#c9a66b',
  },
  {
    id: 'hardware-m8',
    name: 'Комплект крепежа M8',
    kind: 'hardware',
    costPerUnit: 12,
    unit: 'pcs',
  },
];

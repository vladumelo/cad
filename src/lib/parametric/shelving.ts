import { ProductCalculation, ProductConfig, Part, MeshPart, AssemblyStep } from '@/types/domain';
import { parseProfile } from '@/lib/utils/profile';
import { validateShelving } from '@/lib/validation/rules';

const part = (data: Part): Part => data;

export const generateShelving = (config: ProductConfig): ProductCalculation => {
  const profile = parseProfile(config.frameProfile);
  const frameMaterialId = config.frameMaterialId || 'metal-40x20x2';
  const shelfMaterialId = config.shelfMaterialId || 'plywood-18';
  const sectionsX = config.sectionsX || 1;
  const shelfCount = config.shelfCount || 4;

  const parts: Part[] = [];
  const meshes: MeshPart[] = [];

  const verticalQty = (sectionsX + 1) * 2;
  parts.push(
    part({
      id: 'frame-vertical',
      code: 'F-001',
      name: 'Стойка вертикальная',
      materialId: frameMaterialId,
      category: 'frame',
      length: config.height,
      qty: verticalQty,
      meta: { profile: config.frameProfile },
    }),
  );

  const railQty = shelfCount * 2 * 2;
  const railLength = config.width;
  const depthRailLength = config.depth;
  parts.push(
    part({
      id: 'frame-rail-front-back',
      code: 'F-002',
      name: 'Поперечина фронт/тыл',
      materialId: frameMaterialId,
      category: 'frame',
      length: railLength,
      qty: shelfCount * 2,
      meta: { profile: config.frameProfile },
    }),
    part({
      id: 'frame-rail-side',
      code: 'F-003',
      name: 'Поперечина боковая',
      materialId: frameMaterialId,
      category: 'frame',
      length: depthRailLength,
      qty: shelfCount * 2,
      meta: { profile: config.frameProfile },
    }),
  );

  const clearWidth = config.width - profile.width * 2;
  const shelfWidth = clearWidth / sectionsX;
  const shelfDepth = config.depth - profile.height * 2;

  for (let i = 0; i < shelfCount * sectionsX; i += 1) {
    parts.push(
      part({
        id: `shelf-${i}`,
        code: `S-${String(i + 1).padStart(3, '0')}`,
        name: 'Полка фанерная',
        materialId: shelfMaterialId,
        category: 'shelf',
        width: shelfWidth,
        height: shelfDepth,
        thickness: 18,
        qty: 1,
        area: (shelfWidth * shelfDepth) / 1_000_000,
      }),
    );
  }

  const xStart = -config.width / 2 + profile.width / 2;
  const zStart = -config.depth / 2 + profile.height / 2;

  for (let xi = 0; xi <= sectionsX; xi += 1) {
    const x = xStart + (config.width / sectionsX) * xi;
    meshes.push(
      {
        id: `leg-front-${xi}`,
        partId: 'frame-vertical',
        kind: 'box',
        size: [profile.width, config.height, profile.height],
        position: [x, config.height / 2, zStart],
        color: '#4b5563',
      },
      {
        id: `leg-back-${xi}`,
        partId: 'frame-vertical',
        kind: 'box',
        size: [profile.width, config.height, profile.height],
        position: [x, config.height / 2, -zStart],
        color: '#4b5563',
      },
    );
  }

  for (let si = 0; si < shelfCount; si += 1) {
    const y = (config.height / (shelfCount - 1 || 1)) * si + profile.height;
    meshes.push(
      {
        id: `rail-front-${si}`,
        partId: 'frame-rail-front-back',
        kind: 'box',
        size: [config.width, profile.height, profile.width],
        position: [0, y, zStart],
        color: '#374151',
      },
      {
        id: `rail-back-${si}`,
        partId: 'frame-rail-front-back',
        kind: 'box',
        size: [config.width, profile.height, profile.width],
        position: [0, y, -zStart],
        color: '#374151',
      },
      {
        id: `shelf-panel-${si}`,
        partId: `shelf-${si * sectionsX}`,
        kind: 'box',
        size: [config.width - profile.width * 2, 18, shelfDepth],
        position: [0, y + 12, 0],
        color: '#d1ad72',
      },
    );
  }

  const assemblySteps: AssemblyStep[] = [
    {
      id: 'step-1',
      order: 1,
      title: 'Собрать нижнюю раму',
      description: 'Соедините переднюю, заднюю и боковые поперечины в прямоугольник.',
      parts: ['frame-rail-front-back', 'frame-rail-side'],
    },
    {
      id: 'step-2',
      order: 2,
      title: 'Установить стойки',
      description: 'Закрепите вертикальные стойки по углам и на межсекционных узлах.',
      parts: ['frame-vertical'],
    },
    {
      id: 'step-3',
      order: 3,
      title: 'Смонтировать уровни и полки',
      description: 'Установите поперечины на всех уровнях и уложите фанерные полки.',
      parts: ['frame-rail-front-back', 'frame-rail-side', 'shelf-0'],
    },
  ];

  return {
    parts,
    meshes,
    assemblySteps,
    validationMessages: validateShelving(config),
  };
};

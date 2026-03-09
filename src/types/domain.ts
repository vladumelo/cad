export type MaterialKind = 'metal_profile' | 'plywood' | 'sheet_metal' | 'hardware';

export type Material = {
  id: string;
  name: string;
  kind: MaterialKind;
  thickness?: number;
  width?: number;
  height?: number;
  section?: string;
  density?: number;
  costPerUnit: number;
  unit: 'm' | 'm2' | 'sheet' | 'pcs' | 'kg';
  color?: string;
  texture?: string;
};

export type ProductType = 'shelving' | 'workbench' | 'cabinet' | 'frame_module';

export type ProductConfig = {
  id: string;
  type: ProductType;
  name: string;
  width: number;
  height: number;
  depth: number;
  sectionsX?: number;
  sectionsY?: number;
  shelfCount?: number;
  supportType?: 'legs' | 'frame' | 'plinth' | 'wall_mount';
  frameProfile?: string;
  shelfMaterialId?: string;
  frameMaterialId?: string;
  panelMaterialId?: string;
  backPanel?: boolean;
  doors?: boolean;
  drawers?: boolean;
  adjustableFeet?: boolean;
  wallFixing?: boolean;
};

export type PartCategory = 'frame' | 'panel' | 'shelf' | 'door' | 'drawer' | 'hardware';

export type Part = {
  id: string;
  code: string;
  name: string;
  materialId: string;
  category: PartCategory;
  length?: number;
  width?: number;
  height?: number;
  thickness?: number;
  qty: number;
  area?: number;
  volume?: number;
  perimeterEdge?: number;
  holes?: Array<{ x: number; y: number; diameter: number; depth?: number }>;
  meta?: Record<string, unknown>;
};

export type AssemblyStep = {
  id: string;
  title: string;
  description: string;
  parts: string[];
  order: number;
};

export type ValidationMessage = {
  id: string;
  level: 'warning' | 'error';
  title: string;
  message: string;
  suggestion: string;
};

export type SceneMode = 'beauty' | 'technical';
export type DisplayMode = 'constructor' | 'materials' | 'assembly' | 'cutting' | 'specification' | 'export';

export type MeshPart = {
  id: string;
  partId: string;
  kind: 'box' | 'cylinder';
  size: [number, number, number];
  position: [number, number, number];
  rotation?: [number, number, number];
  color: string;
};

export type ProductCalculation = {
  parts: Part[];
  meshes: MeshPart[];
  assemblySteps: AssemblyStep[];
  validationMessages: ValidationMessage[];
};

export type BomSummary = {
  metalLengthByProfile: Record<string, number>;
  plywoodArea: number;
  hardwareCount: number;
  massKg: number;
  totalCost: number;
};

export type CutPlacement = {
  partId: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type CutSheet = {
  sheetIndex: number;
  width: number;
  height: number;
  placements: CutPlacement[];
  usedArea: number;
};

export type MetalCutPlan = {
  profile: string;
  stockLength: number;
  bars: Array<{ index: number; cuts: number[]; used: number }>;
};

'use client';

import { create } from 'zustand';
import { materials } from '@/data/materials';
import { templates } from '@/data/templates';
import {
  AssemblyStep,
  BomSummary,
  CutSheet,
  DisplayMode,
  MeshPart,
  Part,
  ProductConfig,
  SceneMode,
  ValidationMessage,
} from '@/types/domain';
import { calculateProduct } from '@/lib/parametric/engine';
import { buildBomSummary } from '@/lib/costing/bom';
import { generatePlywoodCutSheets } from '@/features/cutting/plywoodCutting';
import { generateMetalCutting } from '@/features/cutting/metalCutting';

const STORAGE_KEY = 'cad-mvp-state';

type Snapshot = {
  activeProduct: ProductConfig;
  selectedPartId: string | null;
};

type CadState = {
  activeProduct: ProductConfig;
  selectedPartId: string | null;
  displayMode: DisplayMode;
  sceneMode: SceneMode;
  materials: typeof materials;
  parts: Part[];
  meshes: MeshPart[];
  bom: BomSummary;
  cutSheets: CutSheet[];
  metalCutting: ReturnType<typeof generateMetalCutting>;
  assemblySteps: AssemblyStep[];
  validationMessages: ValidationMessage[];
  history: Snapshot[];
  future: Snapshot[];
  selectTemplate: (templateId: string) => void;
  updateProduct: (patch: Partial<ProductConfig>) => void;
  setDisplayMode: (mode: DisplayMode) => void;
  setSceneMode: (mode: SceneMode) => void;
  selectPart: (partId: string | null) => void;
  undo: () => void;
  redo: () => void;
  recalc: () => void;
};

const initialProduct = templates[0];
const initialCalc = calculateProduct(initialProduct);

const snapshot = (state: CadState): Snapshot => ({
  activeProduct: state.activeProduct,
  selectedPartId: state.selectedPartId,
});

export const useCadStore = create<CadState>((set, get) => ({
  activeProduct: initialProduct,
  selectedPartId: null,
  displayMode: 'constructor',
  sceneMode: 'beauty',
  materials,
  parts: initialCalc.parts,
  meshes: initialCalc.meshes,
  bom: buildBomSummary(initialCalc.parts, materials),
  cutSheets: generatePlywoodCutSheets(initialCalc.parts),
  metalCutting: generateMetalCutting(initialCalc.parts),
  assemblySteps: initialCalc.assemblySteps,
  validationMessages: initialCalc.validationMessages,
  history: [],
  future: [],
  selectTemplate: (templateId) => {
    const tpl = templates.find((t) => t.id === templateId);
    if (!tpl) return;
    set((state) => ({
      history: [...state.history, snapshot(state)],
      future: [],
      activeProduct: { ...tpl, id: crypto.randomUUID() },
    }));
    get().recalc();
  },
  updateProduct: (patch) => {
    set((state) => ({
      history: [...state.history, snapshot(state)],
      future: [],
      activeProduct: { ...state.activeProduct, ...patch },
    }));
    get().recalc();
  },
  setDisplayMode: (mode) => set({ displayMode: mode }),
  setSceneMode: (mode) => set({ sceneMode: mode }),
  selectPart: (partId) => set({ selectedPartId: partId }),
  undo: () => {
    const state = get();
    const prev = state.history[state.history.length - 1];
    if (!prev) return;
    set({
      activeProduct: prev.activeProduct,
      selectedPartId: prev.selectedPartId,
      history: state.history.slice(0, -1),
      future: [snapshot(state), ...state.future],
    });
    get().recalc();
  },
  redo: () => {
    const state = get();
    const next = state.future[0];
    if (!next) return;
    set({
      activeProduct: next.activeProduct,
      selectedPartId: next.selectedPartId,
      future: state.future.slice(1),
      history: [...state.history, snapshot(state)],
    });
    get().recalc();
  },
  recalc: () => {
    const state = get();
    const calc = calculateProduct(state.activeProduct);
    const bom = buildBomSummary(calc.parts, state.materials);
    const cutSheets = generatePlywoodCutSheets(calc.parts);
    const metalCutting = generateMetalCutting(calc.parts);
    set({
      parts: calc.parts,
      meshes: calc.meshes,
      bom,
      cutSheets,
      metalCutting,
      assemblySteps: calc.assemblySteps,
      validationMessages: calc.validationMessages,
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ activeProduct: state.activeProduct, sceneMode: state.sceneMode, displayMode: state.displayMode }),
      );
    }
  },
}));

if (typeof window !== 'undefined') {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Partial<CadState>;
      useCadStore.setState((state) => ({
        ...state,
        activeProduct: parsed.activeProduct || state.activeProduct,
        displayMode: parsed.displayMode || state.displayMode,
        sceneMode: parsed.sceneMode || state.sceneMode,
      }));
      useCadStore.getState().recalc();
    } catch {
      // ignore corrupted state
    }
  }
}

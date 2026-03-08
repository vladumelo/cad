'use client';

import { TopBar } from '@/components/layout/TopBar';
import { InspectorPanel } from '@/components/product/InspectorPanel';
import { ProductCanvas3D } from '@/components/three/ProductCanvas3D';
import { BOMTable } from '@/components/product/BOMTable';
import { CostSummary } from '@/components/product/CostSummary';
import { CutSheetView } from '@/components/product/CutSheetView';
import { MetalCuttingView } from '@/components/product/MetalCuttingView';
import { AssemblyView } from '@/components/product/AssemblyView';
import { ExportPanel } from '@/components/product/ExportPanel';
import { useCadStore } from '@/store/useCadStore';

export default function HomePage() {
  const { displayMode } = useCadStore();

  return (
    <main className="flex h-screen flex-col">
      <TopBar />
      <div className="grid flex-1 grid-cols-[1fr_340px] gap-3 p-3">
        <div className="grid grid-rows-[1fr_auto] gap-3">
          <div className="min-h-0">
            <ProductCanvas3D />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {(displayMode === 'constructor' || displayMode === 'specification' || displayMode === 'materials') && <BOMTable />}
            {(displayMode === 'constructor' || displayMode === 'materials' || displayMode === 'specification') && <CostSummary />}
            {displayMode === 'cutting' && <CutSheetView />}
            {displayMode === 'cutting' && <MetalCuttingView />}
            {displayMode === 'assembly' && <AssemblyView />}
            {displayMode === 'export' && <ExportPanel />}
          </div>
        </div>
        <InspectorPanel />
      </div>
    </main>
  );
}

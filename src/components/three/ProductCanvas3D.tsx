'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Edges, Environment, Bounds } from '@react-three/drei';
import { useCadStore } from '@/store/useCadStore';

const MeshItem = ({ id, partId, size, position, color }: { id: string; partId: string; size: [number, number, number]; position: [number, number, number]; color: string }) => {
  const { selectedPartId, selectPart, sceneMode } = useCadStore();
  const selected = selectedPartId === partId;
  return (
    <mesh position={position} onClick={(e) => { e.stopPropagation(); selectPart(partId); }}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={selected ? '#f97316' : color} metalness={sceneMode === 'beauty' ? 0.35 : 0.1} roughness={0.45} />
      {sceneMode === 'technical' && <Edges color="#1e293b" />}
    </mesh>
  );
};

export const ProductCanvas3D = () => {
  const { meshes, sceneMode, selectPart } = useCadStore();

  return (
    <div className="h-full w-full overflow-hidden rounded-xl border border-border bg-slate-100">
      <Canvas camera={{ position: [1800, 1500, 1800], fov: 35 }} onPointerMissed={() => selectPart(null)} shadows>
        <color attach="background" args={[sceneMode === 'beauty' ? '#edf1f7' : '#f8fafc']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[800, 1000, 400]} intensity={1.1} castShadow />
        <Bounds fit clip observe margin={1.2}>
          {meshes.map((mesh) => <MeshItem key={mesh.id} {...mesh} />)}
        </Bounds>
        <Grid args={[5000, 5000]} cellSize={100} sectionSize={500} fadeDistance={8000} />
        <OrbitControls makeDefault enablePan enableZoom />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
};

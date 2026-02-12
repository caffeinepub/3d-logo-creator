import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { ThreeTextLogo } from './logo/ThreeTextLogo';
import { LightingRig } from './scene/LightingRig';
import { Background } from './scene/Background';
import { PostProcessing } from './scene/PostProcessing';
import { Particles } from './scene/Particles';
import { useEditorState } from './state/editorState';
import { DragDropTextureTarget } from './texture/DragDropTextureTarget';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export function LogoViewport() {
  const { state } = useEditorState();

  return (
    <div className="relative h-full w-full bg-background">
      <DragDropTextureTarget>
        <Canvas
          gl={{ 
            preserveDrawingBuffer: true, 
            antialias: true, 
            alpha: state.backgroundMode === 'Transparent',
            autoClear: !state.bloomEnabled
          }}
          shadows
        >
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
          <OrbitControls enableDamping dampingFactor={0.05} />

          <Suspense fallback={null}>
            <Background />
            <LightingRig />
            <ThreeTextLogo />
            {state.particlesEnabled && <Particles />}
            {state.bloomEnabled && <PostProcessing />}
          </Suspense>
        </Canvas>

        {/* Loading Indicator */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0">
          <div className="rounded-lg bg-card/80 p-4 backdrop-blur-sm">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        </div>
      </DragDropTextureTarget>
    </div>
  );
}

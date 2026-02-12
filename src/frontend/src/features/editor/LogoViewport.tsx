import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { ThreeTextLogo } from './logo/ThreeTextLogo';
import { LightingRig } from './scene/LightingRig';
import { Background } from './scene/Background';
import { SafePostProcessing } from './scene/SafePostProcessing';
import { Particles } from './scene/Particles';
import { useEditorState } from './state/editorState';
import { DragDropTextureTarget } from './texture/DragDropTextureTarget';
import { Suspense, useMemo, useEffect, useRef, useState } from 'react';
import { Loader2, AlertTriangle, Info } from 'lucide-react';
import { isWebGLAvailable } from './webgl/isWebGLAvailable';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { ViewportErrorBoundary } from './components/ViewportErrorBoundary';
import { toast } from 'sonner';

export function LogoViewport() {
  const { state } = useEditorState();
  const webglAvailable = useMemo(() => isWebGLAvailable(), []);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [contextLost, setContextLost] = useState(false);

  // Show toast notification when post-processing is disabled
  useEffect(() => {
    if (state.postProcessingDisabled && state.postProcessingError) {
      toast.info('Effects Disabled', {
        description: state.postProcessingError,
        duration: 5000,
      });
    }
  }, [state.postProcessingDisabled, state.postProcessingError]);

  // Handle WebGL context loss/restoration
  useEffect(() => {
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.warn('WebGL context lost');
      setContextLost(true);
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored');
      setContextLost(false);
    };

    // Find the canvas element
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost);
      canvas.addEventListener('webglcontextrestored', handleContextRestored);

      return () => {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      };
    }
  }, []);

  // If WebGL is not available, show a clear message in viewport
  if (!webglAvailable) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-background p-6">
        <Card className="w-full max-w-md border-warning/50">
          <CardContent className="pt-6">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>WebGL Required</AlertTitle>
              <AlertDescription>
                The 3D Logo Creator requires WebGL to render 3D graphics. Please ensure:
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                  <li>Your browser supports WebGL (Chrome, Firefox, Safari, or Edge recommended)</li>
                  <li>WebGL is enabled in your browser settings</li>
                  <li>Your graphics drivers are up to date</li>
                </ul>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If WebGL context is lost, show a clear message in viewport
  if (contextLost) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-background p-6">
        <Card className="w-full max-w-md border-warning/50">
          <CardContent className="pt-6">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>WebGL Context Lost</AlertTitle>
              <AlertDescription>
                The WebGL context was lost. This can happen due to:
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                  <li>GPU driver issues or crashes</li>
                  <li>Too many browser tabs using WebGL</li>
                  <li>System resource constraints</li>
                </ul>
                <p className="mt-3 font-semibold">Please reload the page to continue.</p>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <DragDropTextureTarget>
        {/* Wrap Canvas in viewport-scoped error boundary */}
        <ViewportErrorBoundary>
          <Canvas
            ref={canvasRef}
            gl={{
              preserveDrawingBuffer: true,
              antialias: true,
              alpha: state.backgroundMode === 'Transparent',
            }}
            shadows
            dpr={[1, 2]}
          >
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              minDistance={2}
              maxDistance={10}
            />

            <Suspense
              fallback={
                <mesh>
                  <boxGeometry args={[1, 1, 1]} />
                  <meshBasicMaterial color="#666" />
                </mesh>
              }
            >
              <Background />
              <LightingRig />
              <ThreeTextLogo />
              {state.particlesEnabled && <Particles />}
              
              {/* Use SafePostProcessing wrapper */}
              <SafePostProcessing />
            </Suspense>
          </Canvas>
        </ViewportErrorBoundary>
      </DragDropTextureTarget>

      {/* Loading indicator */}
      {false && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading 3D scene...</span>
          </div>
        </div>
      )}

      {/* Post-processing disabled notification */}
      {state.postProcessingDisabled && (
        <div className="absolute bottom-4 left-4 right-4">
          <Alert className="border-warning/50 bg-background/95">
            <Info className="h-4 w-4" />
            <AlertTitle>Effects Disabled</AlertTitle>
            <AlertDescription className="text-xs">
              {state.postProcessingError || 'Post-processing effects have been disabled.'}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}

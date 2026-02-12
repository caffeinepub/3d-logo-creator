import { useEditorState } from '../state/editorState';
import { useMemo } from 'react';

export function LightingRig() {
  const { state } = useEditorState();

  const lightPosition = useMemo(() => {
    const angleX = (state.lightAngleX * Math.PI) / 180;
    const angleY = (state.lightAngleY * Math.PI) / 180;
    const distance = 10;
    return [
      Math.sin(angleY) * Math.cos(angleX) * distance,
      Math.sin(angleX) * distance,
      Math.cos(angleY) * Math.cos(angleX) * distance,
    ] as [number, number, number];
  }, [state.lightAngleX, state.lightAngleY]);

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={lightPosition}
        intensity={state.lightIntensity}
        castShadow={state.shadowEnabled}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
      />
      {state.rimLightEnabled && (
        <pointLight position={[-5, 0, -5]} intensity={state.rimLightIntensity} color="#4488ff" />
      )}
    </>
  );
}

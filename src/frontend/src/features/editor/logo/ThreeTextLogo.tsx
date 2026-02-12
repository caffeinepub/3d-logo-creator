import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';
import { useEditorState } from '../state/editorState';
import { getMaterial } from './materials';

export function ThreeTextLogo() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { state } = useEditorState();

  const material = useMemo(() => {
    return getMaterial(state);
  }, [state.style, state.materialPreset, state.roughness, state.metalness, state.customTexture]);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = (state.rotationX * Math.PI) / 180;
      meshRef.current.rotation.y = (state.rotationY * Math.PI) / 180;
      meshRef.current.rotation.z = (state.rotationZ * Math.PI) / 180;
    }
  }, [state.rotationX, state.rotationY, state.rotationZ]);

  useFrame(() => {
    if (meshRef.current && state.isAnimating) {
      meshRef.current.rotation.y += 0.01 * state.animationSpeed;
    }
  });

  return (
    <Center>
      <Text3D
        ref={meshRef}
        font="/fonts/helvetiker_bold.typeface.json"
        size={1}
        height={state.extrusionDepth}
        curveSegments={12}
        bevelEnabled={state.bevelSize > 0}
        bevelThickness={state.bevelSize}
        bevelSize={state.bevelSize}
        bevelSegments={state.bevelSegments}
        castShadow
        receiveShadow
      >
        {state.brandName || 'BRAND'}
        <primitive object={material} attach="material" />
      </Text3D>
    </Center>
  );
}

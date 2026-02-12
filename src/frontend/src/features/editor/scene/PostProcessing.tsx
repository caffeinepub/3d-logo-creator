import { useEditorState } from '../state/editorState';
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export function PostProcessing() {
  const { state } = useEditorState();
  const { gl, scene, camera, size } = useThree();

  const composer = useMemo(() => {
    const effectComposer = new EffectComposer(gl);
    effectComposer.setSize(size.width, size.height);
    return effectComposer;
  }, [gl, size.width, size.height]);

  useEffect(() => {
    composer.removePass(composer.passes[0]);
    composer.removePass(composer.passes[0]);

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    if (state.bloomEnabled) {
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(size.width, size.height),
        state.bloomIntensity * 2,
        0.4,
        0.85
      );
      composer.addPass(bloomPass);
    }
  }, [composer, scene, camera, state.bloomEnabled, state.bloomIntensity, size.width, size.height]);

  useFrame(() => {
    if (state.bloomEnabled) {
      composer.render();
    }
  }, 1);

  return null;
}

import { useEditorState } from '../state/editorState';
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export function PostProcessing() {
  const { state, disablePostProcessing } = useEditorState();
  const { gl, scene, camera, size } = useThree();
  const composerRef = useRef<EffectComposer | null>(null);
  const hasErrorRef = useRef(false);

  // Create composer with comprehensive error handling
  const composer = useMemo(() => {
    if (hasErrorRef.current || state.postProcessingDisabled) {
      return null;
    }

    try {
      // Validate prerequisites
      if (!gl || !scene || !camera) {
        console.warn('PostProcessing: Missing required Three.js objects');
        return null;
      }

      if (size.width <= 0 || size.height <= 0) {
        console.warn('PostProcessing: Invalid viewport size');
        return null;
      }

      const effectComposer = new EffectComposer(gl);
      effectComposer.setSize(size.width, size.height);
      console.log('EffectComposer initialized successfully');
      return effectComposer;
    } catch (error) {
      console.error('Failed to initialize EffectComposer:', error);
      hasErrorRef.current = true;
      disablePostProcessing('Post-processing effects could not be initialized');
      return null;
    }
  }, [gl, scene, camera, size.width, size.height, state.postProcessingDisabled, disablePostProcessing]);

  // Store composer in ref for cleanup
  useEffect(() => {
    composerRef.current = composer;
    
    return () => {
      // Clean up composer on unmount
      if (composerRef.current) {
        try {
          composerRef.current.dispose?.();
        } catch (e) {
          console.warn('Error disposing composer:', e);
        }
        composerRef.current = null;
      }
    };
  }, [composer]);

  // Configure passes with comprehensive error handling
  useEffect(() => {
    if (!composer || hasErrorRef.current || state.postProcessingDisabled) {
      return;
    }

    try {
      // Validate prerequisites
      if (!scene || !camera) {
        console.warn('PostProcessing: Missing scene or camera for pass configuration');
        return;
      }

      // Safely clear existing passes
      try {
        while (composer.passes.length > 0) {
          const pass = composer.passes[0];
          composer.removePass(pass);
          // Dispose pass if possible
          if (pass && typeof (pass as any).dispose === 'function') {
            try {
              (pass as any).dispose();
            } catch (e) {
              console.warn('Error disposing pass:', e);
            }
          }
        }
      } catch (e) {
        console.warn('Error clearing passes:', e);
      }

      // Add render pass
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      // Add bloom pass if enabled
      if (state.bloomEnabled) {
        // Validate bloom parameters
        const bloomIntensity = Math.max(0, Math.min(10, state.bloomIntensity * 2));
        
        if (size.width > 0 && size.height > 0) {
          const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(size.width, size.height),
            bloomIntensity,
            0.4,
            0.85
          );
          composer.addPass(bloomPass);
          console.log('Bloom pass configured successfully');
        } else {
          console.warn('Invalid size for bloom pass');
        }
      }
    } catch (error) {
      console.error('Failed to configure post-processing passes:', error);
      hasErrorRef.current = true;
      disablePostProcessing('Post-processing effects encountered an error');
    }
  }, [composer, scene, camera, state.bloomEnabled, state.bloomIntensity, size.width, size.height, state.postProcessingDisabled, disablePostProcessing]);

  // Render with comprehensive error handling
  useFrame(() => {
    if (!composer || hasErrorRef.current || state.postProcessingDisabled || !state.bloomEnabled) {
      return;
    }

    try {
      // Validate before rendering
      if (size.width <= 0 || size.height <= 0) {
        return;
      }

      composer.render();
    } catch (error) {
      console.error('Post-processing render error:', error);
      hasErrorRef.current = true;
      disablePostProcessing('Post-processing effects encountered a rendering error');
    }
  }, 1);

  return null;
}

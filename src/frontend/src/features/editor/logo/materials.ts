import * as THREE from 'three';
import type { EditorState } from '../state/editorState';

interface StyleConfig {
  color: number;
  metalness: number;
  roughness: number;
  transparent?: boolean;
  opacity?: number;
  emissive?: number;
  emissiveIntensity?: number;
}

export function getMaterial(state: EditorState): THREE.Material {
  const { style, materialPreset, roughness, metalness, customTexture } = state;

  let texture: THREE.Texture | null = null;
  if (customTexture) {
    const loader = new THREE.TextureLoader();
    texture = loader.load(customTexture);
  }

  // Style-based material configuration
  const styleConfigs: Record<string, StyleConfig> = {
    Metal: { color: 0x888888, metalness: 0.9, roughness: 0.3 },
    Gold: { color: 0xffd700, metalness: 1, roughness: 0.2 },
    Chrome: { color: 0xffffff, metalness: 1, roughness: 0.1 },
    Glass: { color: 0xffffff, metalness: 0, roughness: 0, transparent: true, opacity: 0.6 },
    Neon: { color: 0x00ffff, metalness: 0.5, roughness: 0.2, emissive: 0x00ffff, emissiveIntensity: 0.5 },
    Cinematic: { color: 0xcccccc, metalness: 0.8, roughness: 0.3 },
  };

  // Material preset colors
  const materialColors: Record<string, number> = {
    Gold: 0xffd700,
    Silver: 0xc0c0c0,
    Matte: 0x666666,
    CarbonFiber: 0x1a1a1a,
    Marble: 0xf5f5dc,
  };

  const config = styleConfigs[style];
  const baseColor = materialColors[materialPreset] || config.color;

  const material = new THREE.MeshStandardMaterial({
    color: baseColor,
    metalness: metalness,
    roughness: roughness,
    map: texture,
    emissive: config.emissive !== undefined ? new THREE.Color(config.emissive) : undefined,
    emissiveIntensity: config.emissiveIntensity,
    transparent: config.transparent,
    opacity: config.opacity,
  });

  return material;
}

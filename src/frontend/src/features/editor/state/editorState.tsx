import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type StylePreset = 'Metal' | 'Gold' | 'Chrome' | 'Glass' | 'Neon' | 'Cinematic';
export type MaterialPreset = 'Gold' | 'Silver' | 'Matte' | 'CarbonFiber' | 'Marble';
export type BackgroundMode = 'Studio' | 'DarkStage' | 'Gradient' | 'Transparent';
export type BrandPreset = 'Luxury' | 'Tech' | 'Spiritual' | 'Gaming' | 'Corporate';

export interface EditorState {
  // Text & Style
  brandName: string;
  style: StylePreset;

  // Geometry
  extrusionDepth: number;
  bevelSize: number;
  bevelSegments: number;

  // Transform
  rotationX: number;
  rotationY: number;
  rotationZ: number;

  // Lighting
  lightIntensity: number;
  lightAngleX: number;
  lightAngleY: number;
  shadowEnabled: boolean;
  shadowStrength: number;
  shadowSoftness: number;

  // Material
  materialPreset: MaterialPreset;
  roughness: number;
  metalness: number;
  customTexture: string | null;

  // Effects
  bloomEnabled: boolean;
  bloomIntensity: number;
  rimLightEnabled: boolean;
  rimLightIntensity: number;
  particlesEnabled: boolean;
  particleIntensity: number;

  // Camera Effects
  dofEnabled: boolean;
  dofFocus: number;
  dofAperture: number;
  motionBlurEnabled: boolean;
  motionBlurStrength: number;

  // Background
  backgroundMode: BackgroundMode;

  // Animation
  isAnimating: boolean;
  animationSpeed: number;
}

const defaultState: EditorState = {
  brandName: 'BRAND',
  style: 'Cinematic',
  extrusionDepth: 0.5,
  bevelSize: 0.02,
  bevelSegments: 5,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  lightIntensity: 1.5,
  lightAngleX: 45,
  lightAngleY: 45,
  shadowEnabled: true,
  shadowStrength: 0.5,
  shadowSoftness: 0.5,
  materialPreset: 'Gold',
  roughness: 0.3,
  metalness: 0.8,
  customTexture: null,
  bloomEnabled: true,
  bloomIntensity: 0.5,
  rimLightEnabled: true,
  rimLightIntensity: 0.8,
  particlesEnabled: false,
  particleIntensity: 0.5,
  dofEnabled: false,
  dofFocus: 5,
  dofAperture: 0.02,
  motionBlurEnabled: false,
  motionBlurStrength: 0.5,
  backgroundMode: 'DarkStage',
  isAnimating: false,
  animationSpeed: 1,
};

interface EditorContextValue {
  state: EditorState;
  updateState: (updates: Partial<EditorState>) => void;
  resetTransform: () => void;
  applyBrandPreset: (preset: BrandPreset) => void;
}

const EditorContext = createContext<EditorContextValue | undefined>(undefined);

export function EditorStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EditorState>(defaultState);

  const updateState = useCallback((updates: Partial<EditorState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetTransform = useCallback(() => {
    setState((prev) => ({
      ...prev,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
    }));
  }, []);

  const applyBrandPreset = useCallback((preset: BrandPreset) => {
    const presets: Record<BrandPreset, Partial<EditorState>> = {
      Luxury: {
        style: 'Gold',
        materialPreset: 'Gold',
        roughness: 0.2,
        metalness: 1,
        bloomEnabled: true,
        bloomIntensity: 0.7,
        rimLightEnabled: true,
        rimLightIntensity: 1,
        backgroundMode: 'DarkStage',
        lightIntensity: 2,
      },
      Tech: {
        style: 'Chrome',
        materialPreset: 'Silver',
        roughness: 0.1,
        metalness: 1,
        bloomEnabled: true,
        bloomIntensity: 0.4,
        rimLightEnabled: true,
        rimLightIntensity: 0.6,
        backgroundMode: 'Gradient',
        lightIntensity: 1.8,
      },
      Spiritual: {
        style: 'Glass',
        materialPreset: 'Marble',
        roughness: 0.4,
        metalness: 0.3,
        bloomEnabled: true,
        bloomIntensity: 0.8,
        rimLightEnabled: true,
        rimLightIntensity: 0.9,
        backgroundMode: 'Studio',
        lightIntensity: 1.2,
      },
      Gaming: {
        style: 'Neon',
        materialPreset: 'CarbonFiber',
        roughness: 0.5,
        metalness: 0.6,
        bloomEnabled: true,
        bloomIntensity: 1,
        rimLightEnabled: true,
        rimLightIntensity: 1,
        particlesEnabled: true,
        particleIntensity: 0.7,
        backgroundMode: 'DarkStage',
        lightIntensity: 1.5,
      },
      Corporate: {
        style: 'Metal',
        materialPreset: 'Silver',
        roughness: 0.4,
        metalness: 0.7,
        bloomEnabled: false,
        rimLightEnabled: false,
        backgroundMode: 'Studio',
        lightIntensity: 1.3,
      },
    };

    setState((prev) => ({ ...prev, ...presets[preset] }));
  }, []);

  return (
    <EditorContext.Provider value={{ state, updateState, resetTransform, applyBrandPreset }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditorState() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditorState must be used within EditorStateProvider');
  }
  return context;
}

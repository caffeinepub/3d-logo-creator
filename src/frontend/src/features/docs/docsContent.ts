export const docsContent = {
  architecture: `
    <h3>System Overview</h3>
    <p>The 3D Logo Creator is a client-side React application built with Three.js for real-time 3D rendering. The architecture follows a modular design with clear separation of concerns:</p>
    
    <h4>Core Layers</h4>
    <ul>
      <li><strong>Presentation Layer:</strong> React components using shadcn/ui for consistent UI</li>
      <li><strong>State Management:</strong> React Context API for centralized editor state</li>
      <li><strong>3D Rendering:</strong> Three.js with React Three Fiber for declarative 3D scenes</li>
      <li><strong>Export Pipeline:</strong> Canvas-based capture for images and MediaRecorder for video</li>
    </ul>

    <h4>Component Structure</h4>
    <ul>
      <li><strong>EditorScreen:</strong> Main editor container with state provider</li>
      <li><strong>EditorLayout:</strong> DaVinci-inspired layout with resizable panels</li>
      <li><strong>PresetsPanel:</strong> Brand preset selection (left sidebar)</li>
      <li><strong>LogoViewport:</strong> 3D canvas with orbit controls (center)</li>
      <li><strong>InspectorPanel:</strong> Parameter controls (right sidebar)</li>
      <li><strong>TimelineStrip:</strong> Animation controls (bottom)</li>
    </ul>

    <h4>Data Flow</h4>
    <p>User interactions → State updates → React re-render → Three.js scene update → Real-time preview</p>
  `,

  pipeline: `
    <h3>Rendering Pipeline</h3>
    <p>The 3D rendering pipeline processes the logo through multiple stages:</p>

    <h4>1. Geometry Generation</h4>
    <ul>
      <li>Text3D component converts brand name to 3D geometry</li>
      <li>Extrusion depth and bevel parameters shape the mesh</li>
      <li>Font: Helvetiker Bold (included with Three.js)</li>
    </ul>

    <h4>2. Material Application</h4>
    <ul>
      <li>Style preset determines base material properties</li>
      <li>Material preset overrides color</li>
      <li>Roughness and metalness control surface appearance</li>
      <li>Custom textures can be applied via texture loader</li>
    </ul>

    <h4>3. Lighting Setup</h4>
    <ul>
      <li>Ambient light provides base illumination</li>
      <li>Directional light with shadows (configurable angle/intensity)</li>
      <li>Optional rim light for edge highlights</li>
      <li>Shadow mapping with 2048×2048 resolution</li>
    </ul>

    <h4>4. Post-Processing</h4>
    <ul>
      <li>Bloom effect for glow using Three.js UnrealBloomPass</li>
      <li>Particle system for smoke/sparks effects</li>
      <li>Additional effects planned for future updates</li>
    </ul>

    <h4>5. Export Rendering</h4>
    <ul>
      <li>Canvas.toDataURL() for PNG/JPG static exports</li>
      <li>SVG generation with gradient fills</li>
      <li>MediaRecorder API for video animation capture</li>
    </ul>
  `,

  styling: `
    <h3>Style Preset System</h3>
    <p>The app uses deterministic style presets instead of AI generation. Each preset is a predefined configuration:</p>

    <h4>Style Presets</h4>
    <ul>
      <li><strong>Metal:</strong> Gray base, high metalness (0.9), medium roughness (0.3)</li>
      <li><strong>Gold:</strong> Gold color (#FFD700), max metalness (1.0), low roughness (0.2)</li>
      <li><strong>Chrome:</strong> White base, max metalness (1.0), minimal roughness (0.1)</li>
      <li><strong>Glass:</strong> Transparent material, low metalness, smooth surface</li>
      <li><strong>Neon:</strong> Cyan emissive color, medium metalness, bloom-friendly</li>
      <li><strong>Cinematic:</strong> Balanced gray, high metalness (0.8), medium roughness</li>
    </ul>

    <h4>Brand Presets</h4>
    <p>Brand presets combine multiple settings for one-click styling:</p>
    <ul>
      <li><strong>Luxury:</strong> Gold style + high bloom + rim light + dark stage</li>
      <li><strong>Tech:</strong> Chrome style + moderate bloom + gradient background</li>
      <li><strong>Spiritual:</strong> Glass style + high bloom + studio lighting</li>
      <li><strong>Gaming:</strong> Neon style + particles + max bloom + dark stage</li>
      <li><strong>Corporate:</strong> Metal style + minimal effects + studio background</li>
    </ul>

    <h4>Material Presets</h4>
    <p>Override base colors while preserving style characteristics:</p>
    <ul>
      <li>Gold: #FFD700</li>
      <li>Silver: #C0C0C0</li>
      <li>Matte: #666666</li>
      <li>Carbon Fiber: #1A1A1A</li>
      <li>Marble: #F5F5DC</li>
    </ul>
  `,

  codeExamples: {
    materials: `// materials.ts - Dynamic material generation
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
  const styleConfigs: Record<string, StyleConfig> = {
    Gold: { color: 0xffd700, metalness: 1, roughness: 0.2 },
    Chrome: { color: 0xffffff, metalness: 1, roughness: 0.1 },
    Glass: { color: 0xffffff, metalness: 0, roughness: 0, 
             transparent: true, opacity: 0.6 },
    // ... more styles
  };

  const config = styleConfigs[state.style];
  return new THREE.MeshStandardMaterial({
    color: config.color,
    metalness: state.metalness,
    roughness: state.roughness,
    emissive: config.emissive ? new THREE.Color(config.emissive) : undefined,
  });
}`,

    state: `// editorState.tsx - Centralized state management
export function EditorStateProvider({ children }) {
  const [state, setState] = useState<EditorState>(defaultState);

  const applyBrandPreset = useCallback((preset: BrandPreset) => {
    const presets = {
      Luxury: {
        style: 'Gold',
        materialPreset: 'Gold',
        bloomEnabled: true,
        bloomIntensity: 0.7,
        backgroundMode: 'DarkStage',
      },
      // ... more presets
    };
    setState(prev => ({ ...prev, ...presets[preset] }));
  }, []);

  return <EditorContext.Provider value={{ state, updateState, applyBrandPreset }}>
    {children}
  </EditorContext.Provider>;
}`,

    export: `// exporters.ts - Multi-format export pipeline
export async function exportPNG(canvas: HTMLCanvasElement, state: EditorState) {
  const dataUrl = canvas.toDataURL('image/png');
  downloadFile(dataUrl, \`logo-\${state.brandName}.png\`);
}

export async function exportAnimation(canvas: HTMLCanvasElement) {
  const stream = canvas.captureStream(30);
  const recorder = new MediaRecorder(stream, {
    mimeType: 'video/webm;codecs=vp9',
    videoBitsPerSecond: 8000000,
  });
  
  recorder.start();
  setTimeout(() => recorder.stop(), 5000); // 5 second animation
}`,
  },
};

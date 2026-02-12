/**
 * Checks if WebGL is available in the current browser environment.
 * Tries WebGL2 first, then falls back to WebGL1.
 * @returns true if WebGL2 or WebGL1 is supported, false otherwise
 */
export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    
    // Try WebGL2 first
    let gl: WebGLRenderingContext | WebGL2RenderingContext | null = canvas.getContext('webgl2');
    
    // Fall back to WebGL1
    if (!gl) {
      gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    }
    
    const isAvailable = !!gl;
    
    if (isAvailable) {
      console.log('WebGL detected:', gl instanceof WebGL2RenderingContext ? 'WebGL2' : 'WebGL1');
    } else {
      console.warn('WebGL is not available in this browser');
    }
    
    return isAvailable;
  } catch (e) {
    console.warn('WebGL availability check failed:', e);
    return false;
  }
}

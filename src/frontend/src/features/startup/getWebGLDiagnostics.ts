/**
 * Collects WebGL diagnostics information for troubleshooting.
 * Returns a formatted string with WebGL context details when available.
 * This function is hardened to never throw and always return meaningful output.
 */
export function getWebGLDiagnostics(): string {
  const diagnostics: string[] = [];
  
  try {
    // Browser info first (always available)
    try {
      diagnostics.push(`User Agent: ${navigator.userAgent}`);
      diagnostics.push(`Platform: ${navigator.platform}`);
    } catch (e) {
      diagnostics.push('Browser info: unavailable');
    }
    
    // Try to create a canvas and get WebGL context
    const canvas = document.createElement('canvas');
    
    // Try WebGL2 first
    let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
    let version = '';
    
    try {
      gl = canvas.getContext('webgl2');
      if (gl) {
        version = 'WebGL2';
      }
    } catch (e) {
      diagnostics.push(`WebGL2 context creation failed: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
    
    // Fall back to WebGL1
    if (!gl) {
      try {
        gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
        if (gl) {
          version = 'WebGL1';
        }
      } catch (e) {
        diagnostics.push(`WebGL1 context creation failed: ${e instanceof Error ? e.message : 'Unknown error'}`);
      }
    }
    
    if (gl && version) {
      diagnostics.push(`WebGL Version: ${version}`);
      
      // Get renderer info
      try {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          diagnostics.push(`Vendor: ${vendor}`);
          diagnostics.push(`Renderer: ${renderer}`);
        } else {
          diagnostics.push('Renderer info: extension not available');
        }
      } catch (e) {
        diagnostics.push(`Renderer info error: ${e instanceof Error ? e.message : 'Unknown error'}`);
      }
      
      // Get max texture size
      try {
        const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        diagnostics.push(`Max Texture Size: ${maxTextureSize}`);
      } catch (e) {
        diagnostics.push(`Max texture size: unavailable`);
      }
      
      // Get max viewport dimensions
      try {
        const maxViewport = gl.getParameter(gl.MAX_VIEWPORT_DIMS);
        diagnostics.push(`Max Viewport: ${maxViewport[0]}x${maxViewport[1]}`);
      } catch (e) {
        diagnostics.push(`Max viewport: unavailable`);
      }
      
      // Check for important extensions
      try {
        const extensions = gl.getSupportedExtensions();
        if (extensions) {
          diagnostics.push(`Extensions: ${extensions.length} available`);
        } else {
          diagnostics.push('Extensions: none available');
        }
      } catch (e) {
        diagnostics.push(`Extensions: unavailable`);
      }
    } else {
      diagnostics.push('WebGL: Not available');
      diagnostics.push('Context creation failed for both WebGL2 and WebGL1');
      diagnostics.push('Possible causes: WebGL disabled, outdated drivers, or unsupported hardware');
    }
    
  } catch (error) {
    diagnostics.push(`WebGL diagnostics collection error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
  
  // Always return something, even if empty
  return diagnostics.length > 0 
    ? diagnostics.join('\n') 
    : 'WebGL diagnostics could not be collected.';
}

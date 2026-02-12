import type { EditorState } from '../state/editorState';

export async function exportPNG(
  canvas: HTMLCanvasElement,
  state: EditorState,
  width: number,
  height: number
): Promise<void> {
  try {
    console.log('Exporting PNG from canvas with preserveDrawingBuffer');
    const dataUrl = canvas.toDataURL('image/png');
    if (!dataUrl || dataUrl === 'data:,') {
      throw new Error('Canvas export failed - empty data URL');
    }
    downloadFile(dataUrl, `logo-${state.brandName.toLowerCase()}.png`);
  } catch (error) {
    console.error('PNG export failed:', error);
    throw error;
  }
}

export async function exportJPG(
  canvas: HTMLCanvasElement,
  state: EditorState,
  width: number,
  height: number
): Promise<void> {
  try {
    console.log('Exporting JPG from canvas with preserveDrawingBuffer');
    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    if (!dataUrl || dataUrl === 'data:,') {
      throw new Error('Canvas export failed - empty data URL');
    }
    downloadFile(dataUrl, `logo-${state.brandName.toLowerCase()}.jpg`);
  } catch (error) {
    console.error('JPG export failed:', error);
    throw error;
  }
}

export async function exportSVG(state: EditorState): Promise<void> {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffd700;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ff8c00;stop-opacity:1" />
    </linearGradient>
  </defs>
  <text x="400" y="200" font-family="Arial, sans-serif" font-size="120" font-weight="bold" 
        text-anchor="middle" fill="url(#grad)" stroke="#000" stroke-width="2">
    ${state.brandName}
  </text>
</svg>`;

  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  downloadFile(url, `logo-${state.brandName.toLowerCase()}.svg`);
  URL.revokeObjectURL(url);
}

export async function exportAnimation(canvas: HTMLCanvasElement, state: EditorState): Promise<void> {
  try {
    console.log('Starting animation export with canvas stream');
    const stream = canvas.captureStream(30);
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9',
      videoBitsPerSecond: 8000000,
    });

    const chunks: Blob[] = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      downloadFile(url, `logo-${state.brandName.toLowerCase()}-animation.webm`);
      URL.revokeObjectURL(url);
      console.log('Animation export completed');
    };

    mediaRecorder.start();

    setTimeout(() => {
      mediaRecorder.stop();
    }, 5000);
  } catch (error) {
    console.error('Animation export failed:', error);
    throw error;
  }
}

function downloadFile(url: string, filename: string): void {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

import { useCallback, useState, type ReactNode } from 'react';
import { useEditorState } from '../state/editorState';
import { Upload } from 'lucide-react';

interface DragDropTextureTargetProps {
  children: ReactNode;
}

export function DragDropTextureTarget({ children }: DragDropTextureTargetProps) {
  const { updateState } = useEditorState();
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          updateState({ customTexture: event.target?.result as string });
        };
        reader.readAsDataURL(file);
      }
    },
    [updateState]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      className="relative h-full w-full"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {children}
      {isDragging && (
        <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 rounded-lg border-2 border-dashed border-primary bg-card p-8">
            <Upload className="h-12 w-12 text-primary" />
            <p className="text-sm font-medium">Drop texture image here</p>
          </div>
        </div>
      )}
    </div>
  );
}

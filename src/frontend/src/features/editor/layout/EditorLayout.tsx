import { PresetsPanel } from '../presets/PresetsPanel';
import { LogoViewport } from '../LogoViewport';
import { InspectorPanel } from '../inspector/InspectorPanel';
import { TimelineStrip } from '../timeline/TimelineStrip';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

export function EditorLayout() {
  return (
    <div className="flex h-full flex-col">
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Left: Presets Panel */}
        <ResizablePanel defaultSize={18} minSize={15} maxSize={25}>
          <PresetsPanel />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Center: 3D Viewport */}
        <ResizablePanel defaultSize={52} minSize={40}>
          <LogoViewport />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right: Inspector Panel */}
        <ResizablePanel defaultSize={30} minSize={25} maxSize={40}>
          <InspectorPanel />
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Bottom: Timeline Strip */}
      <div className="border-t border-border bg-card">
        <TimelineStrip />
      </div>
    </div>
  );
}

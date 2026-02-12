import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GeometryControls } from './GeometryControls';
import { TransformControls } from './TransformControls';
import { LightingControls } from './LightingControls';
import { MaterialControls } from './MaterialControls';
import { EffectsControls } from './EffectsControls';
import { CameraEffectsControls } from './CameraEffectsControls';
import { BackgroundControls } from './BackgroundControls';
import { ExportPanel } from './ExportPanel';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEditorState } from '../state/editorState';

export function InspectorPanel() {
  const { state, updateState } = useEditorState();

  return (
    <div className="flex h-full flex-col bg-card">
      <div className="border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold">Inspector</h2>
        <p className="text-xs text-muted-foreground">Customize your logo</p>
      </div>

      <div className="border-b border-border p-4">
        <Label htmlFor="brandName" className="text-xs">
          Brand Name
        </Label>
        <Input
          id="brandName"
          value={state.brandName}
          onChange={(e) => updateState({ brandName: e.target.value.toUpperCase() })}
          placeholder="Enter brand name"
          className="mt-1"
          maxLength={20}
        />
      </div>

      <ScrollArea className="flex-1">
        <Tabs defaultValue="geometry" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent p-0">
            <TabsTrigger value="geometry" className="rounded-none data-[state=active]:border-b-2">
              Geometry
            </TabsTrigger>
            <TabsTrigger value="material" className="rounded-none data-[state=active]:border-b-2">
              Material
            </TabsTrigger>
            <TabsTrigger value="effects" className="rounded-none data-[state=active]:border-b-2">
              Effects
            </TabsTrigger>
            <TabsTrigger value="export" className="rounded-none data-[state=active]:border-b-2">
              Export
            </TabsTrigger>
          </TabsList>

          <TabsContent value="geometry" className="space-y-4 p-4">
            <GeometryControls />
            <TransformControls />
          </TabsContent>

          <TabsContent value="material" className="space-y-4 p-4">
            <MaterialControls />
            <LightingControls />
            <BackgroundControls />
          </TabsContent>

          <TabsContent value="effects" className="space-y-4 p-4">
            <EffectsControls />
            <CameraEffectsControls />
          </TabsContent>

          <TabsContent value="export" className="p-4">
            <ExportPanel />
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  );
}

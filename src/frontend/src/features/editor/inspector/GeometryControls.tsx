import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useEditorState } from '../state/editorState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function GeometryControls() {
  const { state, updateState } = useEditorState();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Geometry</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Extrusion Depth</Label>
            <span className="text-xs text-muted-foreground">{state.extrusionDepth.toFixed(2)}</span>
          </div>
          <Slider
            value={[state.extrusionDepth]}
            onValueChange={([value]) => updateState({ extrusionDepth: value })}
            min={0.1}
            max={2}
            step={0.1}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Bevel Size</Label>
            <span className="text-xs text-muted-foreground">{state.bevelSize.toFixed(3)}</span>
          </div>
          <Slider
            value={[state.bevelSize]}
            onValueChange={([value]) => updateState({ bevelSize: value })}
            min={0}
            max={0.1}
            step={0.005}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Bevel Smoothness</Label>
            <span className="text-xs text-muted-foreground">{state.bevelSegments}</span>
          </div>
          <Slider
            value={[state.bevelSegments]}
            onValueChange={([value]) => updateState({ bevelSegments: Math.round(value) })}
            min={1}
            max={10}
            step={1}
          />
        </div>
      </CardContent>
    </Card>
  );
}

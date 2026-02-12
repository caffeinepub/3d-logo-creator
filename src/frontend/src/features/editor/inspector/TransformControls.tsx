import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useEditorState } from '../state/editorState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw } from 'lucide-react';

export function TransformControls() {
  const { state, updateState, resetTransform } = useEditorState();

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Rotation</CardTitle>
          <Button variant="ghost" size="sm" onClick={resetTransform} className="h-7 px-2">
            <RotateCcw className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs">X Axis</Label>
            <span className="text-xs text-muted-foreground">{state.rotationX}°</span>
          </div>
          <Slider
            value={[state.rotationX]}
            onValueChange={([value]) => updateState({ rotationX: value })}
            min={-180}
            max={180}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Y Axis</Label>
            <span className="text-xs text-muted-foreground">{state.rotationY}°</span>
          </div>
          <Slider
            value={[state.rotationY]}
            onValueChange={([value]) => updateState({ rotationY: value })}
            min={-180}
            max={180}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Z Axis</Label>
            <span className="text-xs text-muted-foreground">{state.rotationZ}°</span>
          </div>
          <Slider
            value={[state.rotationZ]}
            onValueChange={([value]) => updateState({ rotationZ: value })}
            min={-180}
            max={180}
            step={1}
          />
        </div>
      </CardContent>
    </Card>
  );
}

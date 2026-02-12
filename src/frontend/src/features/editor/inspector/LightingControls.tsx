import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useEditorState } from '../state/editorState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function LightingControls() {
  const { state, updateState } = useEditorState();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Lighting & Shadows</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Light Intensity</Label>
            <span className="text-xs text-muted-foreground">{state.lightIntensity.toFixed(1)}</span>
          </div>
          <Slider
            value={[state.lightIntensity]}
            onValueChange={([value]) => updateState({ lightIntensity: value })}
            min={0}
            max={3}
            step={0.1}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Light Angle X</Label>
            <span className="text-xs text-muted-foreground">{state.lightAngleX}°</span>
          </div>
          <Slider
            value={[state.lightAngleX]}
            onValueChange={([value]) => updateState({ lightAngleX: value })}
            min={0}
            max={90}
            step={5}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Light Angle Y</Label>
            <span className="text-xs text-muted-foreground">{state.lightAngleY}°</span>
          </div>
          <Slider
            value={[state.lightAngleY]}
            onValueChange={([value]) => updateState({ lightAngleY: value })}
            min={0}
            max={360}
            step={5}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-xs">Shadows</Label>
          <Switch checked={state.shadowEnabled} onCheckedChange={(checked) => updateState({ shadowEnabled: checked })} />
        </div>

        {state.shadowEnabled && (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Shadow Strength</Label>
                <span className="text-xs text-muted-foreground">{state.shadowStrength.toFixed(2)}</span>
              </div>
              <Slider
                value={[state.shadowStrength]}
                onValueChange={([value]) => updateState({ shadowStrength: value })}
                min={0}
                max={1}
                step={0.05}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Shadow Softness</Label>
                <span className="text-xs text-muted-foreground">{state.shadowSoftness.toFixed(2)}</span>
              </div>
              <Slider
                value={[state.shadowSoftness]}
                onValueChange={([value]) => updateState({ shadowSoftness: value })}
                min={0}
                max={1}
                step={0.05}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

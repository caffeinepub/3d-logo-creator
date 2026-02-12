import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useEditorState } from '../state/editorState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProMode } from '../../pro/ProModeContext';

export function EffectsControls() {
  const { state, updateState } = useEditorState();
  const { isPro } = useProMode();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Cinematic Effects</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-xs">Bloom / Glow</Label>
          <Switch checked={state.bloomEnabled} onCheckedChange={(checked) => updateState({ bloomEnabled: checked })} />
        </div>

        {state.bloomEnabled && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Bloom Intensity</Label>
              <span className="text-xs text-muted-foreground">{state.bloomIntensity.toFixed(2)}</span>
            </div>
            <Slider
              value={[state.bloomIntensity]}
              onValueChange={([value]) => updateState({ bloomIntensity: value })}
              min={0}
              max={1}
              step={0.05}
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <Label className="text-xs">Rim Light</Label>
          <Switch
            checked={state.rimLightEnabled}
            onCheckedChange={(checked) => updateState({ rimLightEnabled: checked })}
          />
        </div>

        {state.rimLightEnabled && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Rim Intensity</Label>
              <span className="text-xs text-muted-foreground">{state.rimLightIntensity.toFixed(2)}</span>
            </div>
            <Slider
              value={[state.rimLightIntensity]}
              onValueChange={([value]) => updateState({ rimLightIntensity: value })}
              min={0}
              max={2}
              step={0.1}
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label className="text-xs">Particles</Label>
            {!isPro && <Badge variant="secondary" className="text-[10px] px-1 py-0">PRO</Badge>}
          </div>
          <Switch
            checked={state.particlesEnabled}
            onCheckedChange={(checked) => updateState({ particlesEnabled: checked })}
            disabled={!isPro}
          />
        </div>

        {state.particlesEnabled && isPro && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Particle Intensity</Label>
              <span className="text-xs text-muted-foreground">{state.particleIntensity.toFixed(2)}</span>
            </div>
            <Slider
              value={[state.particleIntensity]}
              onValueChange={([value]) => updateState({ particleIntensity: value })}
              min={0}
              max={1}
              step={0.05}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

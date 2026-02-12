import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEditorState, type MaterialPreset, type StylePreset } from '../state/editorState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, X } from 'lucide-react';
import { useRef } from 'react';

export function MaterialControls() {
  const { state, updateState } = useEditorState();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateState({ customTexture: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Material & Style</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-xs">Style Preset</Label>
          <Select value={state.style} onValueChange={(value: StylePreset) => updateState({ style: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Metal">Metal</SelectItem>
              <SelectItem value="Gold">Gold</SelectItem>
              <SelectItem value="Chrome">Chrome</SelectItem>
              <SelectItem value="Glass">Glass</SelectItem>
              <SelectItem value="Neon">Neon</SelectItem>
              <SelectItem value="Cinematic">Cinematic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs">Material Preset</Label>
          <Select
            value={state.materialPreset}
            onValueChange={(value: MaterialPreset) => updateState({ materialPreset: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Gold">Gold</SelectItem>
              <SelectItem value="Silver">Silver</SelectItem>
              <SelectItem value="Matte">Matte</SelectItem>
              <SelectItem value="CarbonFiber">Carbon Fiber</SelectItem>
              <SelectItem value="Marble">Marble</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Roughness</Label>
            <span className="text-xs text-muted-foreground">{state.roughness.toFixed(2)}</span>
          </div>
          <Slider
            value={[state.roughness]}
            onValueChange={([value]) => updateState({ roughness: value })}
            min={0}
            max={1}
            step={0.05}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Metalness</Label>
            <span className="text-xs text-muted-foreground">{state.metalness.toFixed(2)}</span>
          </div>
          <Slider
            value={[state.metalness]}
            onValueChange={([value]) => updateState({ metalness: value })}
            min={0}
            max={1}
            step={0.05}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs">Custom Texture</Label>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-2 h-3 w-3" />
              Upload
            </Button>
            {state.customTexture && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateState({ customTexture: null })}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleTextureUpload}
          />
        </div>
      </CardContent>
    </Card>
  );
}

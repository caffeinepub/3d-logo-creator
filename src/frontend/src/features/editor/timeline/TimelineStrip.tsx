import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useEditorState } from '../state/editorState';

export function TimelineStrip() {
  const { state, updateState, resetTransform } = useEditorState();

  return (
    <div className="flex items-center gap-4 px-4 py-2">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => updateState({ isAnimating: !state.isAnimating })}
        >
          {state.isAnimating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="sm" onClick={resetTransform}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-1 items-center gap-3">
        <span className="text-xs text-muted-foreground">Speed</span>
        <Slider
          value={[state.animationSpeed]}
          onValueChange={([value]) => updateState({ animationSpeed: value })}
          min={0.1}
          max={3}
          step={0.1}
          className="w-32"
        />
        <span className="text-xs text-muted-foreground">{state.animationSpeed.toFixed(1)}x</span>
      </div>

      <div className="text-xs text-muted-foreground">
        {state.isAnimating ? 'Playing' : 'Paused'}
      </div>
    </div>
  );
}

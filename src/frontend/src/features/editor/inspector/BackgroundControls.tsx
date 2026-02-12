import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEditorState, type BackgroundMode } from '../state/editorState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function BackgroundControls() {
  const { state, updateState } = useEditorState();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Background</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Label className="text-xs">Scene Mode</Label>
        <Select
          value={state.backgroundMode}
          onValueChange={(value: BackgroundMode) => updateState({ backgroundMode: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Studio">Studio</SelectItem>
            <SelectItem value="DarkStage">Dark Stage</SelectItem>
            <SelectItem value="Gradient">Gradient</SelectItem>
            <SelectItem value="Transparent">Transparent</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}

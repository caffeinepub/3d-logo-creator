import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useEditorState } from '../state/editorState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProMode } from '../../pro/ProModeContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export function CameraEffectsControls() {
  const { state, updateState } = useEditorState();
  const { isPro } = useProMode();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Camera Effects</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Advanced camera effects like depth of field and motion blur are planned for future updates.
          </AlertDescription>
        </Alert>

        <div className="flex items-center justify-between opacity-50">
          <div className="flex items-center gap-2">
            <Label className="text-xs">Depth of Field</Label>
            <Badge variant="secondary" className="text-[10px] px-1 py-0">Coming Soon</Badge>
          </div>
          <Switch
            checked={false}
            disabled
          />
        </div>

        <div className="flex items-center justify-between opacity-50">
          <div className="flex items-center gap-2">
            <Label className="text-xs">Motion Blur</Label>
            <Badge variant="secondary" className="text-[10px] px-1 py-0">Coming Soon</Badge>
          </div>
          <Switch
            checked={false}
            disabled
          />
        </div>
      </CardContent>
    </Card>
  );
}

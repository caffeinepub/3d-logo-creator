import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Download, Film } from 'lucide-react';
import { useState } from 'react';
import { exportPNG, exportJPG, exportSVG, exportAnimation } from '../export/exporters';
import { useEditorState } from '../state/editorState';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { useProMode } from '../../pro/ProModeContext';

export function ExportPanel() {
  const { state } = useEditorState();
  const { isPro } = useProMode();
  const [resolution, setResolution] = useState<'1080p' | '4k'>('1080p');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: 'png' | 'jpg' | 'svg' | 'animation') => {
    if ((format === 'animation' || resolution === '4k') && !isPro) {
      toast.error('This feature requires Pro');
      return;
    }

    setIsExporting(true);
    try {
      const canvas = document.querySelector('canvas');
      if (!canvas) throw new Error('Canvas not found');

      const width = resolution === '4k' ? 3840 : 1920;
      const height = resolution === '4k' ? 2160 : 1080;

      switch (format) {
        case 'png':
          await exportPNG(canvas, state, width, height);
          toast.success('PNG exported successfully');
          break;
        case 'jpg':
          await exportJPG(canvas, state, width, height);
          toast.success('JPG exported successfully');
          break;
        case 'svg':
          await exportSVG(state);
          toast.success('SVG exported successfully');
          break;
        case 'animation':
          await exportAnimation(canvas, state);
          toast.success('Animation export started');
          break;
      }
    } catch (error) {
      toast.error('Export failed: ' + (error as Error).message);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Export Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-xs">Resolution</Label>
          <Select value={resolution} onValueChange={(value: '1080p' | '4k') => setResolution(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1080p">1080p (1920×1080)</SelectItem>
              <SelectItem value="4k">
                <div className="flex items-center gap-2">
                  4K (3840×2160)
                  {!isPro && <Badge variant="secondary" className="text-[10px] px-1 py-0">PRO</Badge>}
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs">Static Exports</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport('png')}
              disabled={isExporting}
            >
              <Download className="mr-2 h-3 w-3" />
              PNG
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport('jpg')}
              disabled={isExporting}
            >
              <Download className="mr-2 h-3 w-3" />
              JPG
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => handleExport('svg')}
            disabled={isExporting}
          >
            <Download className="mr-2 h-3 w-3" />
            SVG (Vector)
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Animation Export</Label>
            {!isPro && <Badge variant="secondary" className="text-[10px] px-1 py-0">PRO</Badge>}
          </div>
          <Button
            variant="default"
            size="sm"
            className="w-full"
            onClick={() => handleExport('animation')}
            disabled={isExporting || !isPro}
          >
            <Film className="mr-2 h-3 w-3" />
            Export Video (WebM)
          </Button>
          <p className="text-[10px] text-muted-foreground">
            Exports a 5-second rotating logo animation
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

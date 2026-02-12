import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEditorState, type BrandPreset } from '../state/editorState';
import { Crown, Cpu, Sparkles, Gamepad2, Briefcase } from 'lucide-react';

const presets: Array<{ name: BrandPreset; icon: typeof Crown; description: string }> = [
  { name: 'Luxury', icon: Crown, description: 'Premium gold finish with dramatic lighting' },
  { name: 'Tech', icon: Cpu, description: 'Sleek chrome with modern aesthetics' },
  { name: 'Spiritual', icon: Sparkles, description: 'Ethereal glass with soft glow' },
  { name: 'Gaming', icon: Gamepad2, description: 'Bold neon with particle effects' },
  { name: 'Corporate', icon: Briefcase, description: 'Professional metal finish' },
];

export function PresetsPanel() {
  const { applyBrandPreset } = useEditorState();

  return (
    <div className="flex h-full flex-col bg-card">
      <div className="border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold">Brand Presets</h2>
        <p className="text-xs text-muted-foreground">One-click professional styles</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-2 p-4">
          {presets.map((preset) => {
            const Icon = preset.icon;
            return (
              <Card
                key={preset.name}
                className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
                onClick={() => applyBrandPreset(preset.name)}
              >
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary" />
                    <CardTitle className="text-sm">{preset.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <CardDescription className="text-xs">{preset.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

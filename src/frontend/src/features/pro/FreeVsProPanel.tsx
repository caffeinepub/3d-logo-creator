import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Check, X } from 'lucide-react';
import { useProMode } from './ProModeContext';

export function FreeVsProPanel() {
  const { isPro, togglePro } = useProMode();

  const features = [
    { name: 'Basic 3D Logo Creation', free: true, pro: true },
    { name: '6 Style Presets', free: true, pro: true },
    { name: '5 Brand Presets', free: true, pro: true },
    { name: 'Geometry Controls', free: true, pro: true },
    { name: 'Material & Lighting', free: true, pro: true },
    { name: 'Bloom & Rim Light', free: true, pro: true },
    { name: '1080p Export (PNG/JPG)', free: true, pro: true },
    { name: 'SVG Vector Export', free: true, pro: true },
    { name: 'Particle Effects', free: false, pro: true },
    { name: 'Depth of Field', free: false, pro: true },
    { name: 'Motion Blur', free: false, pro: true },
    { name: '4K Export', free: false, pro: true },
    { name: 'Animation Export (Video)', free: false, pro: true },
    { name: 'Priority Support', free: false, pro: true },
  ];

  return (
    <div className="container mx-auto max-w-6xl space-y-8 p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Choose Your Plan</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Start free, upgrade when you need advanced features
        </p>
      </div>

      {/* Demo Toggle */}
      <Card className="border-primary">
        <CardHeader>
          <CardTitle>Demo Mode Toggle</CardTitle>
          <CardDescription>
            For demonstration purposes, toggle Pro features on/off without payment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Switch id="pro-mode" checked={isPro} onCheckedChange={togglePro} />
            <Label htmlFor="pro-mode" className="text-sm font-medium">
              {isPro ? 'Pro Mode Active' : 'Free Mode Active'}
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className={!isPro ? 'border-primary' : ''}>
          <CardHeader>
            <CardTitle className="text-2xl">Free</CardTitle>
            <CardDescription>Perfect for getting started</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent>
            <Button 
              variant={!isPro ? 'default' : 'outline'} 
              className="w-full" 
              onClick={() => {
                if (isPro) {
                  togglePro();
                }
              }}
            >
              {!isPro ? 'Current Plan' : 'Switch to Free'}
            </Button>
          </CardContent>
        </Card>

        <Card className={isPro ? 'border-primary' : ''}>
          <CardHeader>
            <CardTitle className="text-2xl">Pro</CardTitle>
            <CardDescription>For professional creators</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$19</span>
              <span className="text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant={isPro ? 'default' : 'outline'} className="w-full" disabled={isPro} onClick={togglePro}>
              {isPro ? 'Current Plan' : 'Upgrade to Pro'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Feature Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-4 border-b pb-2 font-semibold">
              <div>Feature</div>
              <div className="text-center">Free</div>
              <div className="text-center">Pro</div>
            </div>
            {features.map((feature) => (
              <div key={feature.name} className="grid grid-cols-3 gap-4 border-b py-2 text-sm">
                <div>{feature.name}</div>
                <div className="flex justify-center">
                  {feature.free ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex justify-center">
                  {feature.pro ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Info */}
      <Card>
        <CardHeader>
          <CardTitle>Monetization Model</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            <strong>Free Tier:</strong> Provides full access to core 3D logo creation features, perfect for
            individuals and small projects. Export up to 1080p resolution with basic cinematic effects.
          </p>
          <p>
            <strong>Pro Tier ($19/month):</strong> Unlocks advanced cinematic effects (particles, depth of field,
            motion blur), 4K export resolution, and video animation export. Ideal for professional designers,
            agencies, and content creators who need premium quality outputs.
          </p>
          <p>
            <strong>Future Expansion:</strong> Potential for team plans, custom branding removal, API access, and
            enterprise licensing for high-volume users.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

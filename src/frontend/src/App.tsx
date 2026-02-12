import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EditorScreen } from './features/editor/EditorScreen';
import { ArchitecturePipelineScreen } from './features/docs/ArchitecturePipelineScreen';
import { FreeVsProPanel } from './features/pro/FreeVsProPanel';
import { ProModeProvider } from './features/pro/ProModeContext';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { Film } from 'lucide-react';
import { StartupErrorBoundary } from './features/startup/StartupErrorBoundary';
import { StartupFallbackScreen } from './features/startup/StartupFallbackScreen';

function AppContent() {
  const [activeTab, setActiveTab] = useState('editor');

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
            <Film className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">3D Logo Creator</h1>
            <p className="text-xs text-muted-foreground">Cinematic Brand Design Studio</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="docs">Architecture</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
          </TabsList>
        </Tabs>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <Tabs value={activeTab} className="h-full">
          <TabsContent value="editor" className="h-full m-0">
            <EditorScreen />
          </TabsContent>
          <TabsContent value="docs" className="h-full m-0 overflow-auto">
            <ArchitecturePipelineScreen />
          </TabsContent>
          <TabsContent value="pricing" className="h-full m-0 overflow-auto">
            <FreeVsProPanel />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-6 py-2 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} · Built with ❤️ using{' '}
        <a
          href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
            typeof window !== 'undefined' ? window.location.hostname : 'logo-creator'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}

function App() {
  return (
    <StartupErrorBoundary fallback={(error, componentStack) => <StartupFallbackScreen error={error} componentStack={componentStack} />}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <ProModeProvider>
          <AppContent />
          <Toaster />
        </ProModeProvider>
      </ThemeProvider>
    </StartupErrorBoundary>
  );
}

export default App;

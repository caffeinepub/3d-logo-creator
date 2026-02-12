import { AlertCircle, RefreshCw, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState, useEffect } from 'react';
import { getWebGLDiagnostics } from './getWebGLDiagnostics';

interface StartupFallbackScreenProps {
  error?: Error | null;
  componentStack?: string;
}

export function StartupFallbackScreen({ error, componentStack }: StartupFallbackScreenProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [webglDiagnostics, setWebglDiagnostics] = useState<string>('');

  useEffect(() => {
    // Collect WebGL diagnostics when component mounts
    const diagnostics = getWebGLDiagnostics();
    setWebglDiagnostics(diagnostics);
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  const handleClearCache = () => {
    // Clear local storage and reload
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.error('Failed to clear storage:', e);
    }
    window.location.reload();
  };

  const handleCopyDetails = async () => {
    let details = '=== Error Details ===\n\n';
    
    if (error) {
      details += `Error Message: ${error.message || 'Unknown error'}\n\n`;
      
      if (error.stack) {
        details += `Stack Trace:\n${error.stack}\n\n`;
      }
      
      if (componentStack) {
        details += `Component Stack:\n${componentStack}\n\n`;
      }
    } else {
      details += 'No error details available.\n\n';
    }
    
    details += '=== WebGL Diagnostics ===\n\n';
    details += webglDiagnostics || 'WebGL diagnostics not available.';
    
    try {
      await navigator.clipboard.writeText(details);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy to clipboard:', e);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg border-destructive/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <CardTitle className="text-2xl">Application Error</CardTitle>
              <CardDescription>The app encountered a startup problem</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>
              The 3D Logo Creator failed to initialize properly. This might be due to a temporary issue or browser compatibility.
            </AlertDescription>
          </Alert>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Try these steps:</p>
            <ul className="list-inside list-disc space-y-1 pl-2">
              <li>Reload the page to restart the application</li>
              <li>Clear your browser cache and reload</li>
              <li>Try using a different browser (Chrome, Firefox, or Safari recommended)</li>
              <li>Ensure WebGL is enabled in your browser settings</li>
            </ul>
          </div>

          {/* Technical Details Section */}
          <Collapsible open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between" size="sm">
                <span className="text-sm font-medium">Technical details</span>
                {isDetailsOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-3">
              <div className="rounded-md border border-border bg-muted/50 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-semibold text-foreground">Diagnostic Information:</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyDetails}
                    className="h-7 px-2 text-xs"
                  >
                    {isCopied ? (
                      <>
                        <Check className="mr-1 h-3 w-3" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="mr-1 h-3 w-3" />
                        Copy details
                      </>
                    )}
                  </Button>
                </div>
                
                {/* Error Details */}
                {error ? (
                  <>
                    <p className="text-xs font-semibold text-foreground mb-1">Error Message:</p>
                    <p className="text-xs font-mono text-muted-foreground break-words mb-3">
                      {error.message || 'No error message available.'}
                    </p>
                    
                    {error.stack && (
                      <>
                        <p className="text-xs font-semibold text-foreground mb-1">Stack Trace:</p>
                        <pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap break-words max-h-32 overflow-y-auto mb-3">
                          {error.stack}
                        </pre>
                      </>
                    )}
                    
                    {componentStack && (
                      <>
                        <p className="text-xs font-semibold text-foreground mb-1">Component Stack:</p>
                        <pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap break-words max-h-32 overflow-y-auto mb-3">
                          {componentStack}
                        </pre>
                      </>
                    )}
                  </>
                ) : (
                  <p className="text-xs text-muted-foreground italic mb-3">
                    No error details available.
                  </p>
                )}
                
                {/* WebGL Diagnostics */}
                <p className="text-xs font-semibold text-foreground mb-1">WebGL Diagnostics:</p>
                {webglDiagnostics ? (
                  <pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap break-words max-h-32 overflow-y-auto">
                    {webglDiagnostics}
                  </pre>
                ) : (
                  <p className="text-xs text-muted-foreground italic">
                    WebGL diagnostics not available.
                  </p>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
        <CardFooter className="flex gap-3">
          <Button onClick={handleReload} className="flex-1">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reload Page
          </Button>
          <Button onClick={handleClearCache} variant="outline" className="flex-1">
            Clear Cache & Reload
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

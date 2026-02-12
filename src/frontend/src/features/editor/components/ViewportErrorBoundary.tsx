import React, { Component, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Viewport-scoped error boundary that catches errors from Canvas/Three.js/post-processing
 * and renders an in-viewport fallback without affecting the global app startup boundary.
 */
export class ViewportErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    console.error('ViewportErrorBoundary caught error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Viewport error details:', {
      message: error?.message || 'Unknown viewport error',
      stack: error?.stack || 'No stack trace available',
      componentStack: errorInfo?.componentStack || 'No component stack available'
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-background p-6">
          <Card className="w-full max-w-md border-destructive/50">
            <CardContent className="pt-6">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>3D Viewport Error</AlertTitle>
                <AlertDescription className="space-y-3">
                  <p>
                    The 3D viewport encountered an error and cannot render. This may be due to:
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    <li>WebGL context issues</li>
                    <li>Graphics driver problems</li>
                    <li>Insufficient GPU resources</li>
                  </ul>
                  <div className="mt-4">
                    <Button onClick={this.handleReload} className="w-full">
                      Reload Application
                    </Button>
                  </div>
                  {this.state.error && (
                    <details className="mt-3 text-xs">
                      <summary className="cursor-pointer font-semibold">Technical details</summary>
                      <pre className="mt-2 whitespace-pre-wrap break-words font-mono">
                        {this.state.error.message}
                      </pre>
                    </details>
                  )}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

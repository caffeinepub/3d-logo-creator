import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback: (error: Error | null, componentStack?: string) => ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  componentStack?: string;
}

// Known non-fatal errors that should not trigger startup failure
const NON_FATAL_ERROR_PATTERNS = [
  /ResizeObserver loop/i,
  /ResizeObserver loop completed with undelivered notifications/i,
  /Script error/i, // Generic cross-origin script errors
];

function isNonFatalError(message: string): boolean {
  return NON_FATAL_ERROR_PATTERNS.some(pattern => pattern.test(message));
}

export class StartupErrorBoundary extends Component<Props, State> {
  private cleanup?: () => void;
  private startupWindowMs = 5000; // Only listen for startup errors for 5 seconds
  private startupTimer?: number;
  private isStartupPhase = true;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    console.error('StartupErrorBoundary caught error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Startup error details:', {
      message: error?.message || 'Unknown error',
      stack: error?.stack || 'No stack trace available',
      componentStack: errorInfo?.componentStack || 'No component stack available'
    });
    
    // Capture component stack for diagnostics, handling null case
    this.setState({
      componentStack: errorInfo?.componentStack || undefined
    });
  }

  componentDidMount() {
    // Set timer to exit startup phase
    this.startupTimer = window.setTimeout(() => {
      this.isStartupPhase = false;
      console.log('Startup phase complete, removing global error listeners');
      if (this.cleanup) {
        this.cleanup();
        this.cleanup = undefined;
      }
    }, this.startupWindowMs);

    // Listen for global errors during startup
    const handleError = (event: ErrorEvent) => {
      // Ignore if we're past startup phase
      if (!this.isStartupPhase) return;
      
      // Ignore if already in error state
      if (this.state.hasError) return;

      const message = event.message || event.error?.message || 'Unknown error';
      
      // Filter out non-fatal errors
      if (isNonFatalError(message)) {
        console.log('Ignoring non-fatal error during startup:', message);
        return;
      }

      const error = event.error || new Error(message);
      console.error('Global error during startup:', {
        message: error.message,
        stack: error.stack,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
      
      this.setState({ hasError: true, error });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Ignore if we're past startup phase
      if (!this.isStartupPhase) return;
      
      // Ignore if already in error state
      if (this.state.hasError) return;

      const reason = event.reason;
      const message = reason instanceof Error ? reason.message : String(reason);
      
      // Filter out non-fatal errors
      if (isNonFatalError(message)) {
        console.log('Ignoring non-fatal promise rejection during startup:', message);
        return;
      }

      const error = reason instanceof Error 
        ? reason 
        : new Error(typeof reason === 'string' ? reason : 'Unhandled promise rejection');
      
      console.error('Unhandled promise rejection during startup:', {
        message: error.message,
        stack: error.stack,
        reason: reason
      });
      
      this.setState({ 
        hasError: true, 
        error
      });
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Store cleanup function
    this.cleanup = () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }

  componentWillUnmount() {
    if (this.startupTimer) {
      clearTimeout(this.startupTimer);
    }
    if (this.cleanup) {
      this.cleanup();
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback(this.state.error, this.state.componentStack);
    }

    return this.props.children;
  }
}

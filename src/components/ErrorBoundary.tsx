import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Job Sarkari Hub Uncaught Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    try {
      window.location.href = '/';
    } catch {
      this.setState({ hasError: false, error: null, errorInfo: null });
    }
  };

  private handleClearCacheAndReload = () => {
    try {
      localStorage.removeItem('sarkari_jobs');
      localStorage.removeItem('sarkari_admit_cards');
      localStorage.removeItem('sarkari_results');
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div id="error-boundary-fallback" className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-6 text-center space-y-5">
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-amber-50">
              <AlertTriangle className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-800">
                Something went wrong / कुछ गलत हो गया
              </h2>
              <p className="text-sm text-slate-600">
                The portal encountered a momentary display issue. You can refresh or return to the home view.
              </p>
            </div>

            {this.state.error?.message && (
              <div className="p-3 bg-slate-100 rounded-lg text-left overflow-auto max-h-32 text-xs font-mono text-slate-700">
                {this.state.error.message}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                id="error-boundary-reload-btn"
                onClick={this.handleReload}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                Reload Portal
              </button>
              <button
                id="error-boundary-home-btn"
                onClick={this.handleGoHome}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4" />
                Home
              </button>
            </div>

            <button
              onClick={this.handleClearCacheAndReload}
              className="text-[11px] text-slate-400 hover:text-slate-700 underline block mx-auto cursor-pointer"
            >
              Reset Saved Data & Reload / डेटा रीसेट करें
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

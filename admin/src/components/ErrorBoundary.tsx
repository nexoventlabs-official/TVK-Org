import React, { ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary: catches React errors in child components
 * and displays a fallback UI instead of crashing the whole app.
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Caught error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '2rem',
            minHeight: '100vh',
            display: 'grid',
            placeItems: 'center',
            background: '#f9fafb',
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              maxWidth: '500px',
              textAlign: 'center',
            }}
          >
            <h1 style={{ color: '#dc2626', marginBottom: '1rem' }}>
              Something went wrong
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              An unexpected error occurred. Please try refreshing the page or contact support.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details
                style={{
                  textAlign: 'left',
                  background: '#f3f4f6',
                  padding: '1rem',
                  borderRadius: '0.375rem',
                  marginBottom: '1rem',
                  fontSize: '0.875rem',
                }}
              >
                <summary style={{ cursor: 'pointer', fontWeight: '600' }}>
                  Error details (dev only)
                </summary>
                <pre
                  style={{
                    marginTop: '0.5rem',
                    overflow: 'auto',
                    color: '#374151',
                  }}
                >
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#2563eb',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

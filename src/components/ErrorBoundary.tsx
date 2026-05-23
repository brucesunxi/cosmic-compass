"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="glow-card">
            <div className="glow-card-content text-center py-12">
              <p className="text-4xl mb-4">🌌</p>
              <h2 className="text-xl font-bold text-white mb-2">Cosmic Disturbance</h2>
              <p className="text-white/50 text-sm mb-4">
                The stars encountered an unexpected alignment. Please try again.
              </p>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="px-6 py-2 rounded-xl bg-cosmic-500 text-white hover:bg-cosmic-400 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

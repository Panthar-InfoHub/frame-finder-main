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

export class FilterErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    console.error("❌ [FilterErrorBoundary] Error caught:", error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("❌ [FilterErrorBoundary] Error details:", {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
            <p className="text-red-600 font-semibold mb-2">Filter Error</p>
            <p className="text-sm text-red-500">
              {this.state.error?.message || "An error occurred while loading filters"}
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-2 text-sm text-red-600 underline hover:text-red-700"
            >
              Try again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

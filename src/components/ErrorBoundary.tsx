import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary] Uncaught runtime error:", error, info);
    try {
      sessionStorage.setItem(
        "lastError",
        JSON.stringify({
          message: error.message,
          stack: error.stack,
          componentStack: info.componentStack,
        }),
      );
    } catch {
      // ignore sessionStorage errors
    }
  }

  render() {
    if (this.state.hasError) {
      // Redirect to /500 page — use a hard navigate so Router picks it up
      window.location.replace("/500");
      return null;
    }
    return this.props.children;
  }
}

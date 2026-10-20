import { Component } from "react";

/** Last line of defence: a render error shows a message instead of a blank page. */
export default class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    // Hook for an error-tracking service (e.g. Sentry) if one is added later.
    console.error("Unhandled UI error", error, info?.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div role="alert" style={{ maxWidth: 560, margin: "20vh auto", padding: 24, fontFamily: "system-ui, sans-serif" }}>
        <h1 style={{ fontSize: 24 }}>Something went wrong</h1>
        <p>Please refresh the page. If the problem continues, contact us directly using the details in the footer.</p>
        <button type="button" onClick={() => window.location.reload()}>
          Refresh
        </button>
      </div>
    );
  }
}

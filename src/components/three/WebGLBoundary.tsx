"use client";

import { Component, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  fallback: ReactNode;
};

type State = { failed: boolean };

/**
 * Catches WebGL / canvas initialisation errors so a failure in the 3D layer
 * can never take down the rest of the page. Renders the CSS fallback instead.
 */
export class WebGLBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch() {
    // Intentionally quiet: the CSS fallback is a valid experience, so we don't
    // spam the console. Remove this comment if you want to log to an service.
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}

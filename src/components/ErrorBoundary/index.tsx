/* eslint-disable require-jsdoc */
import React, { Component, ErrorInfo, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Có lỗi xảy ra, xin vui lòng tải lại trang.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

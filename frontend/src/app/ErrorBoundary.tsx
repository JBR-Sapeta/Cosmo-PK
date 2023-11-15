import {
  Component,
  ErrorInfo,
  PropsWithChildren,
  type ReactElement,
} from 'react';

type Props = PropsWithChildren<{ fallback: ReactElement }>;

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, ErrorBoundaryState> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

import React, { ReactNode } from 'react';
import { ErrorMessage } from '../../types/constant';
import Error from './Error';

export interface Props {
  fallback?: React.ElementType;
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  info: Error | null;
}

const initialState: State = {
  hasError: false,
  info: null,
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, info: error };
  }

  render() {
    const { hasError, info } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <Error message={ErrorMessage[404]} />
      );
    }
    return children;
  }
}

export default ErrorBoundary;

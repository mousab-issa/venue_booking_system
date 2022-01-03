import React, { Component } from "react";

type TypeErrorHandlerProps = {};
type TypeErrorHandlerState = {
  error: boolean;
};

// This Compoonent is used to handle errors to prevent app from crashing
const withErrorHandler = (WrappedComponent: React.ComponentType) => {
  return class extends Component<TypeErrorHandlerProps, TypeErrorHandlerState> {
    constructor(props: {}) {
      super(props);
      this.state = {
        error: false, 
      };
    }

    static getDerivedStateFromError(error: Error) {
      return { error: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      // TODO: Add a modal
      console.error("🔥 something went wrong.", error, errorInfo);
    }

    render() {
      if (this.state.error) {
        return (
          <div className="error-handler">
            <h1>Something went wrong.</h1>
          </div>
        );
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withErrorHandler;

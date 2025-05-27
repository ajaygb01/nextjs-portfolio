import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/material';

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
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
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    // Attempt to reload the component tree or the page
    // For a simple reset, we might just reload the page, but this could be more sophisticated.
    // window.location.reload(); 
    // For now, just resetting state to allow children to re-render if they can recover
  };

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh', 
            p: 3,
            textAlign: 'center',
            // Assuming a dark theme, provide light text
            color: '#fff', 
            backgroundColor: '#333' 
          }}
        >
          <Typography variant="h5" gutterBottom>
            {this.props.fallbackMessage || "Something went wrong in the 3D universe."}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            An unexpected error occurred. You can try resetting the view or reloading the page.
          </Typography>
          {this.state.error && (
            <Typography variant="caption" sx={{ mb: 2, color: '#ccc' }}>
              Error: {this.state.error.toString()}
            </Typography>
          )}
          <Button variant="contained" onClick={() => window.location.reload()}>
            Reload Page
          </Button>
          {/* The button below would only work if the children can recover by just remounting */}
          {/* <Button variant="outlined" onClick={this.handleReset} sx={{ ml: 1}}>
            Try to Reset View
          </Button> */}
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

import React, { Component, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import './styles/global.css';

class ApplicationErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error('COL Application Error:', error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <main
          role="alert"
          aria-live="assertive"
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            background: '#FFF8FC',
            color: '#292039',
            fontFamily: 'DM Sans, sans-serif',
            textAlign: 'center'
          }}
        >
          <section style={{ maxWidth: '420px' }}>
            <div
              aria-hidden="true"
              style={{
                fontSize: '52px',
                marginBottom: '16px'
              }}
            >
              💜
            </div>

            <h1>Something went wrong</h1>

            <p>
              We encountered an unexpected problem.
              Please reload Celebration of Life to continue.
            </p>

            <button
              type="button"
              onClick={this.handleReload}
              style={{
                border: 0,
                borderRadius: '12px',
                padding: '13px 24px',
                background: '#7C3AED',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Reload application
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    'COL initialization failed: root element was not found.'
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <ApplicationErrorBoundary>
      <App />
    </ApplicationErrorBoundary>
  </StrictMode>
);

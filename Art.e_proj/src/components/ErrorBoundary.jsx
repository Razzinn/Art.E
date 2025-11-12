import { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * ErrorBoundary - Cattura errori React e previene crash dell'app
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '2rem',
            textAlign: 'center',
            minHeight: '50vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2 style={{ color: '#e74c3c', marginBottom: '1rem' }}>
            Oops! Qualcosa è andato storto
          </h2>
          <p style={{ color: '#555', marginBottom: '1.5rem' }}>
            Ci scusiamo per l&apos;inconveniente. Prova a ricaricare la pagina.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#2563EB',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Ricarica Pagina
          </button>
          {import.meta.env.DEV && this.state.error && (
            <details
              style={{
                marginTop: '2rem',
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '0.5rem',
                textAlign: 'left',
                maxWidth: '600px',
              }}
            >
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                Dettagli errore (development)
              </summary>
              <pre
                style={{
                  marginTop: '1rem',
                  whiteSpace: 'pre-wrap',
                  fontSize: '0.875rem',
                  color: '#e74c3c',
                }}
              >
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;

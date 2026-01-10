'use client';

import { useState } from 'react';

export default function Home() {
  const [helloData, setHelloData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const testHelloAPI = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/hello');
      const data = await res.json();
      setHelloData(data);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const testDataAPI = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/data');
      const data = await res.json();
      setUserData(data);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>⚡ Serverless Next.js Demo</h1>
        <p style={styles.subtitle}>
          Workshop UBSI - Vercel Deployment
        </p>

        <div style={styles.buttonGroup}>
          <button 
            onClick={testHelloAPI}
            disabled={loading}
            style={styles.button}
          >
            Test /api/hello
          </button>
          <button 
            onClick={testDataAPI}
            disabled={loading}
            style={styles.button}
          >
            Test /api/data
          </button>
        </div>

        {loading && <p style={styles.loading}>Loading...</p>}

        {helloData && (
          <div style={styles.resultCard}>
            <h3>Response dari /api/hello:</h3>
            <pre style={styles.code}>
              {JSON.stringify(helloData, null, 2)}
            </pre>
          </div>
        )}

        {userData && (
          <div style={styles.resultCard}>
            <h3>Response dari /api/data:</h3>
            <pre style={styles.code}>
              {JSON.stringify(userData, null, 2)}
            </pre>
          </div>
        )}

        <div style={styles.footer}>
          <p>🚀 Deployed on Vercel</p>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            API routes run as serverless functions
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    padding: '40px',
    maxWidth: '600px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  title: {
    fontSize: '2.5rem',
    margin: '0 0 10px 0',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#666',
    textAlign: 'center',
    marginBottom: '30px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
  },
  button: {
    flex: 1,
    padding: '15px 20px',
    fontSize: '1rem',
    fontWeight: '600',
    color: 'white',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  loading: {
    textAlign: 'center',
    color: '#667eea',
    fontStyle: 'italic',
  },
  resultCard: {
    background: '#f7fafc',
    borderRadius: '12px',
    padding: '20px',
    marginTop: '20px',
  },
  code: {
    background: '#1a202c',
    color: '#a0aec0',
    padding: '15px',
    borderRadius: '8px',
    overflow: 'auto',
    fontSize: '0.9rem',
  },
  footer: {
    marginTop: '30px',
    textAlign: 'center',
    color: '#333',
  },
};

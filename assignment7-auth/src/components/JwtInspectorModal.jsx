import React from 'react';
import { useAuth } from '../context/AuthContext';

const JwtInspectorModal = ({ isOpen, onClose }) => {
  const { token, tokenDetails, rememberMe } = useAuth();

  if (!isOpen || !tokenDetails) return null;

  // Split token into its 3 cryptographic parts
  const tokenParts = token ? token.split('.') : [];

  return (
    <div className="tm-jwt-modal-overlay" onClick={onClose}>
      <div className="tm-jwt-modal-box" onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
            borderBottom: '1px solid var(--border-glass)',
            paddingBottom: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.4rem' }}>🔐</span>
            <div>
              <h3 style={{ margin: 0, color: '#ffffff', fontSize: '1.25rem', fontFamily: 'var(--font-display)' }}>
                Live JWT Cryptographic Inspector
              </h3>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                Coursework Assignment 7: Simulated Token Engine
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--border-glass)',
              color: '#cbd5e1',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: 'var(--radius-full)',
            padding: '0.35rem 0.85rem',
            fontSize: '0.8rem',
            marginBottom: '1.25rem'
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38bdf8' }} />
          <span style={{ color: '#e2e8f0' }}>Storage Target:</span>
          <strong style={{ color: '#38bdf8' }}>
            {rememberMe ? 'localStorage (Permanent / Remembered)' : 'sessionStorage (Single Browser Tab)'}
          </strong>
        </div>

        <div>
          {/* Encoded Token */}
          <div style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 700, marginBottom: '0.4rem' }}>
            1. Encoded Token String (<span style={{ color: '#fb7185' }}>Header</span>.
            <span style={{ color: '#c084fc' }}>Payload</span>.
            <span style={{ color: '#67e8f9' }}>Signature</span>)
          </div>
          <div
            className="tm-jwt-section"
            style={{
              wordBreak: 'break-all',
              lineHeight: 1.6,
              background: 'rgba(2, 6, 23, 0.85)',
              border: '1px solid var(--border-glass-bright)'
            }}
          >
            {tokenParts.length === 3 ? (
              <>
                <span style={{ color: '#fb7185' }}>{tokenParts[0]}</span>
                <span style={{ color: '#94a3b8' }}>.</span>
                <span style={{ color: '#c084fc' }}>{tokenParts[1]}</span>
                <span style={{ color: '#94a3b8' }}>.</span>
                <span style={{ color: '#67e8f9' }}>{tokenParts[2]}</span>
              </>
            ) : (
              token
            )}
          </div>

          {/* Decoded Header */}
          <div style={{ fontSize: '0.82rem', color: '#fb7185', fontWeight: 700, marginBottom: '0.4rem' }}>
            2. Decoded Header (Algorithm & Token Type)
          </div>
          <div className="tm-jwt-section header">
            <pre style={{ margin: 0 }}>{JSON.stringify(tokenDetails.header, null, 2)}</pre>
          </div>

          {/* Decoded Payload */}
          <div style={{ fontSize: '0.82rem', color: '#c084fc', fontWeight: 700, marginBottom: '0.4rem' }}>
            3. Decoded Payload Claims (Subject, Role, Expiry)
          </div>
          <div className="tm-jwt-section payload">
            <pre style={{ margin: 0 }}>{JSON.stringify(tokenDetails.payload, null, 2)}</pre>
          </div>
        </div>

        <div style={{ textAlign: 'right', marginTop: '1.5rem', borderTop: '1px solid var(--border-glass)', paddingTop: '1.25rem' }}>
          <button
            type="button"
            onClick={onClose}
            className="tm-btn-primary"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};

export default JwtInspectorModal;

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberUser, setRememberUser] = useState(false);
  const [errors, setErrors] = useState({});

  // Where to redirect after login (defaults to dashboard)
  const from = location.state?.from?.pathname || '/dashboard';

  const validate = () => {
    const errs = {};
    if (!username.trim()) {
      errs.username = 'Username is required.';
    }
    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 4) {
      errs.password = 'Password must be at least 4 characters long.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      login(username.trim(), password, rememberUser);
      navigate(from, { replace: true });
    }
  };

  const handleQuickDemoLogin = () => {
    setUsername('biswajit.dey');
    setPassword('React2026!Secure');
    setRememberUser(true);
    login('biswajit.dey', 'React2026!Secure', true);
    navigate(from, { replace: true });
  };

  return (
    <div className="tm-auth-wrapper">
      <div className="tm-auth-header">
        <div className="tm-auth-badge">
          <span>🛡️</span> Route Guard Active • Assignment 7
        </div>
        <h2 className="tm-auth-title">Authentication Portal</h2>
        <p className="tm-auth-desc">
          Sign in to generate simulated JWT bearer tokens, inspect cryptographic claims, and access protected routes.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="tm-auth-field">
          <label htmlFor="login-username">Username *</label>
          <input
            id="login-username"
            type="text"
            placeholder="e.g. biswajit.dey or student_admin"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (errors.username) setErrors({ ...errors, username: null });
            }}
          />
          {errors.username && (
            <span style={{ color: '#fb7185', fontSize: '0.8rem', marginTop: '0.2rem' }}>
              {errors.username}
            </span>
          )}
        </div>

        <div className="tm-auth-field">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label htmlFor="login-password">Password *</label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                background: 'none',
                border: 'none',
                color: '#38bdf8',
                fontSize: '0.78rem',
                cursor: 'pointer',
                fontWeight: 600,
                padding: 0
              }}
            >
              {showPassword ? 'Hide 👁️' : 'Show 👁️'}
            </button>
          </div>
          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password..."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: null });
            }}
          />
          {errors.password && (
            <span style={{ color: '#fb7185', fontSize: '0.8rem', marginTop: '0.2rem' }}>
              {errors.password}
            </span>
          )}

          {/* Interactive Password Strength Meter */}
          <PasswordStrengthMeter password={password} />
        </div>

        <label className="tm-auth-remember">
          <input
            type="checkbox"
            checked={rememberUser}
            onChange={(e) => setRememberUser(e.target.checked)}
            style={{ width: '16px', height: '16px', accentColor: '#3b82f6', cursor: 'pointer' }}
          />
          <div>
            <div>Remember User</div>
            <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
              Persist session in localStorage across browser restarts
            </div>
          </div>
        </label>

        <button type="submit" className="tm-auth-btn-submit">
          Sign In to Protected Dashboard →
        </button>
      </form>

      <div
        style={{
          marginTop: '1.5rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-glass)',
          textAlign: 'center'
        }}
      >
        <button
          type="button"
          onClick={handleQuickDemoLogin}
          style={{
            background: 'rgba(56, 189, 248, 0.08)',
            border: '1px dashed rgba(56, 189, 248, 0.35)',
            padding: '0.65rem 1rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.84rem',
            color: '#7dd3fc',
            cursor: 'pointer',
            fontWeight: 700,
            width: '100%',
            transition: 'var(--transition)'
          }}
        >
          ⚡ 1-Click Quick Demo Sign In (biswajit.dey)
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

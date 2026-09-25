import React from 'react';

export const calculatePasswordStrength = (password) => {
  if (!password) {
    return { score: 0, label: 'None', color: '#64748b', percent: 0, criteria: {} };
  }

  const criteria = {
    hasLength: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password)
  };

  let score = 0;
  if (criteria.hasLength) score += 1;
  if (criteria.hasUpper) score += 1;
  if (criteria.hasLower) score += 1;
  if (criteria.hasNumber) score += 1;
  if (criteria.hasSpecial) score += 1;

  let label = 'Weak';
  let color = '#f43f5e';
  let percent = 20;

  if (score >= 5) {
    label = 'Strong';
    color = '#10b981';
    percent = 100;
  } else if (score >= 4) {
    label = 'Good';
    color = '#06b6d4';
    percent = 75;
  } else if (score >= 3) {
    label = 'Fair';
    color = '#f59e0b';
    percent = 50;
  } else {
    label = 'Weak';
    color = '#f43f5e';
    percent = 25;
  }

  return { score, label, color, percent, criteria };
};

const PasswordStrengthMeter = ({ password }) => {
  const { label, color, percent, criteria } = calculatePasswordStrength(password);

  if (!password) return null;

  return (
    <div className="tm-pw-strength-wrapper">
      <div className="tm-pw-bar-track">
        <div
          className="tm-pw-bar-fill"
          style={{
            width: `${percent}%`,
            background: color,
            boxShadow: `0 0 10px ${color}`
          }}
        />
      </div>

      <div className="tm-pw-strength-label">
        <span style={{ color, fontWeight: 700 }}>Strength: {label}</span>
        <span style={{ color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>{percent}% Secure</span>
      </div>

      <div className="tm-pw-criteria">
        <span style={{ color: criteria.hasLength ? '#34d399' : '#64748b' }}>
          {criteria.hasLength ? '✓' : '○'} 8+ Characters
        </span>
        <span style={{ color: criteria.hasUpper ? '#34d399' : '#64748b' }}>
          {criteria.hasUpper ? '✓' : '○'} Uppercase Letter
        </span>
        <span style={{ color: criteria.hasLower ? '#34d399' : '#64748b' }}>
          {criteria.hasLower ? '✓' : '○'} Lowercase Letter
        </span>
        <span style={{ color: criteria.hasNumber ? '#34d399' : '#64748b' }}>
          {criteria.hasNumber ? '✓' : '○'} Number (0-9)
        </span>
        <span style={{ color: criteria.hasSpecial ? '#34d399' : '#64748b' }}>
          {criteria.hasSpecial ? '✓' : '○'} Special Symbol (!@#$)
        </span>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;

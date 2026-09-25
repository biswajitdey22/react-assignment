import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import JwtInspectorModal from './JwtInspectorModal';

const Navigation = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [showJwtModal, setShowJwtModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <nav className="tm-navbar">
        <NavLink to="/dashboard" className="tm-brand">
          <span style={{ fontSize: '1.4rem' }}>🛡️</span>
          <span className="logo-text">AuthShield</span>
          <span className="tm-brand-tag">Assignment 7: JWT Auth</span>
        </NavLink>

        {isAuthenticated && (
          <ul className="tm-nav-links">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => `tm-nav-link ${isActive ? 'active' : ''}`}
              >
                📊 Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tasks"
                className={({ isActive }) => `tm-nav-link ${isActive ? 'active' : ''}`}
              >
                📋 All Tasks
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-task"
                className={({ isActive }) => `tm-nav-link ${isActive ? 'active' : ''}`}
              >
                ➕ Add Task
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/completed"
                className={({ isActive }) => `tm-nav-link ${isActive ? 'active' : ''}`}
              >
                🏆 Completed
              </NavLink>
            </li>
          </ul>
        )}

        <div className="tm-user-controls">
          {isAuthenticated ? (
            <>
              <button
                type="button"
                className="tm-jwt-btn"
                onClick={() => setShowJwtModal(true)}
                title="View Simulated JWT Claims and Token"
              >
                🔑 Inspect JWT
              </button>
              <span className="tm-user-pill">
                👤 {user?.username}
              </span>
              <button
                type="button"
                className="tm-logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="tm-btn-primary">
              Sign In →
            </NavLink>
          )}
        </div>
      </nav>

      <JwtInspectorModal
        isOpen={showJwtModal}
        onClose={() => setShowJwtModal(false)}
      />
    </>
  );
};

export default Navigation;

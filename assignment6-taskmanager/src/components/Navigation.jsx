import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="tm-navbar">
      <NavLink to="/dashboard" className="tm-brand">
        <span style={{ fontSize: '1.4rem' }}>⚡</span>
        <span className="logo-text">TaskFlow Pro</span>
        <span className="tm-brand-tag">Assignment 6: React Router</span>
      </NavLink>

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

      <div className="tm-user-controls">
        <NavLink to="/add-task" className="tm-btn-primary">
          <span>+</span> New Task
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;

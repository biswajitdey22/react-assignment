import React, { useState } from 'react';

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
  'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
  'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  'linear-gradient(135deg, #ec4899 0%, #be185d 100%)'
];

const DEPT_ICONS = {
  'Crop Production': '🌱',
  'Dairy Farming': '🥛',
  'Livestock & Poultry': '🐔',
  'Agronomy & Soil': '🧪',
  'Farm Logistics': '🚜',
  'Farm Operations': '⚙️'
};

const getInitials = (str) => {
  if (!str) return 'EM';
  const parts = str.trim().split(' ');
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return str.slice(0, 2).toUpperCase();
};

const getAvatarGradient = (str) => {
  if (!str) return AVATAR_GRADIENTS[0];
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
};

const EmployeeTable = ({ employees, onEdit, onDelete, viewMode = 'table', onAddClick }) => {
  if (employees.length === 0) {
    return (
      <div className="emp-empty-state">
        <div className="emp-empty-icon-glow">
          <span className="emp-empty-icon">🌾</span>
        </div>
        <h3 className="emp-empty-title">Farm Workforce Directory is Empty</h3>
        <p className="emp-empty-desc">
          No employee records found. Click below to enroll your farm employees and manage their department assignments.
        </p>
        <div className="emp-empty-actions">
          {onAddClick && (
            <button type="button" className="emp-empty-btn-add" onClick={onAddClick}>
              <span>➕</span> Add First Employee
            </button>
          )}
        </div>
      </div>
    );
  }

  // Grid Card View
  if (viewMode === 'grid') {
    return (
      <div className="emp-cards-grid">
        {employees.map((emp) => (
          <div key={emp.id} className="emp-card-item">
            <div className="emp-card-header">
              <div className="emp-card-avatar-wrapper">
                {emp.photo ? (
                  <img src={emp.photo} alt={emp.name} className="emp-card-avatar-img" />
                ) : (
                  <div
                    className="emp-card-avatar-initials"
                    style={{ background: getAvatarGradient(emp.name) }}
                  >
                    {getInitials(emp.name)}
                  </div>
                )}
              </div>
              <div className="emp-card-titles">
                <h4 className="emp-card-name">{emp.name}</h4>
                <div className="emp-card-meta-row">
                  <span className="emp-id-tag">{emp.id}</span>
                  <span className={`emp-gender-pill ${emp.gender.toLowerCase()}`}>
                    {emp.gender === 'Female' ? '♀' : '♂'} {emp.gender}
                  </span>
                </div>
              </div>
            </div>

            <div className="emp-card-body">
              <div className="emp-card-dept-badge">
                <span>{DEPT_ICONS[emp.department] || '🌿'}</span>
                <span>{emp.department}</span>
              </div>

              <div className="emp-card-info-row">
                <span className="emp-card-label">📞 Phone</span>
                <span className="emp-card-val mono">{emp.phone}</span>
              </div>

              <div className="emp-card-info-row">
                <span className="emp-card-label">🏠 Farm Quarters</span>
                <span className="emp-card-val">{emp.localAddress}</span>
              </div>

              <div className="emp-card-info-row">
                <span className="emp-card-label">📍 Native Town</span>
                <span className="emp-card-val">{emp.permanentAddress}</span>
              </div>
            </div>

            <div className="emp-card-actions">
              <button
                type="button"
                className="emp-btn-action edit"
                onClick={() => onEdit(emp)}
                title="Edit Employee details"
              >
                ✏️ Edit
              </button>
              <button
                type="button"
                className="emp-btn-action delete"
                onClick={() => onDelete(emp.id, emp.name)}
                title="Delete Employee"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Table View
  return (
    <div className="emp-table-container">
      <table className="emp-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>ID Code</th>
            <th>Department</th>
            <th>Contact Phone</th>
            <th>Local Address</th>
            <th>Permanent Address</th>
            <th style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="emp-table-row">
              <td>
                <div className="emp-user-cell">
                  <div className="emp-cell-avatar">
                    {emp.photo ? (
                      <img src={emp.photo} alt={emp.name} className="emp-cell-avatar-img" />
                    ) : (
                      <div
                        className="emp-cell-avatar-initials"
                        style={{ background: getAvatarGradient(emp.name) }}
                      >
                        {getInitials(emp.name)}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="emp-cell-name">{emp.name}</div>
                    <span className={`emp-gender-pill ${emp.gender.toLowerCase()}`}>
                      {emp.gender === 'Female' ? '♀' : '♂'} {emp.gender}
                    </span>
                  </div>
                </div>
              </td>
              <td>
                <span className="emp-id-tag">{emp.id}</span>
              </td>
              <td>
                <span className="emp-dept-badge">
                  <span style={{ marginRight: '0.35rem' }}>{DEPT_ICONS[emp.department] || '🌿'}</span>
                  {emp.department}
                </span>
              </td>
              <td>
                <span className="emp-phone-chip">{emp.phone}</span>
              </td>
              <td>
                <div className="emp-address-box" title={emp.localAddress}>
                  {emp.localAddress}
                </div>
              </td>
              <td>
                <div className="emp-address-box" title={emp.permanentAddress}>
                  {emp.permanentAddress}
                </div>
              </td>
              <td>
                <div className="emp-actions">
                  <button
                    type="button"
                    className="emp-btn-action edit"
                    onClick={() => onEdit(emp)}
                    title="Edit details"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    type="button"
                    className="emp-btn-action delete"
                    onClick={() => onDelete(emp.id, emp.name)}
                    title="Remove employee"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;

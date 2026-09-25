import React from 'react';

const DEPT_ICONS = {
  'Crop Production': '🌱',
  'Dairy Farming': '🥛',
  'Livestock & Poultry': '🐔',
  'Agronomy & Soil': '🧪',
  'Farm Logistics': '🚜',
  'Farm Operations': '⚙️'
};

const EmployeeStats = ({ totalCount, filteredCount, departmentCounts }) => {
  return (
    <div className="emp-stats-wrapper">
      <div className="emp-stats-grid">
        <div className="emp-stat-card total">
          <div className="stat-icon-wrapper total">
            <span className="stat-icon">🌾</span>
          </div>
          <div className="stat-content">
            <div className="emp-stat-title">Total Farm Staff</div>
            <div className="emp-stat-count">{totalCount}</div>
            <div className="stat-subtext">Active Workforce</div>
          </div>
        </div>

        <div className="emp-stat-card filtered">
          <div className="stat-icon-wrapper filtered">
            <span className="stat-icon">👥</span>
          </div>
          <div className="stat-content">
            <div className="emp-stat-title">Currently Displayed</div>
            <div className="emp-stat-count">{filteredCount}</div>
            <div className="stat-subtext">Filtered Records</div>
          </div>
        </div>

        {Object.entries(departmentCounts).slice(0, 3).map(([dept, count]) => (
          <div key={dept} className="emp-stat-card dept">
            <div className="stat-icon-wrapper dept">
              <span className="stat-icon">{DEPT_ICONS[dept] || '🌿'}</span>
            </div>
            <div className="stat-content">
              <div className="emp-stat-title">{dept}</div>
              <div className="emp-stat-count">{count}</div>
              <div className="stat-subtext">Dept Staff</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeStats;

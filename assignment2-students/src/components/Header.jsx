import React from 'react';

const Header = (props) => {
  const { title, totalCount, averageCgpa } = props;

  return (
    <header className="student-header">
      <div className="student-header-inner">
        <div className="student-header-brand">
          <div className="student-brand-icon-wrapper">
            <span className="student-brand-icon">🎓</span>
          </div>
          <div>
            <div className="student-header-badge-row">
              <span className="student-live-dot" />
              <span className="student-badge-text">StudentOS Registry • Props Architecture</span>
            </div>
            <h1 className="student-header-title">{title}</h1>
            <p className="student-header-subtitle">
              Manage student enrollment, monitor academic CGPA rankings, and update student profiles in real-time.
            </p>
          </div>
        </div>

        <div className="student-header-metrics">
          <div className="student-metric-card">
            <div className="metric-icon-box total">
              <span>👥</span>
            </div>
            <div className="metric-details">
              <span className="val">{totalCount}</span>
              <span className="lbl">Total Enrolled</span>
            </div>
          </div>

          <div className="student-metric-card">
            <div className="metric-icon-box cgpa">
              <span>⭐</span>
            </div>
            <div className="metric-details">
              <span className="val">{averageCgpa}</span>
              <span className="lbl">Average CGPA</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

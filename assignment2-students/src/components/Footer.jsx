import React from 'react';

const Footer = (props) => {
  const { totalStudents, displayedCount, topPerformer } = props;

  return (
    <footer className="student-footer">
      <div className="student-footer-inner">
        <div className="footer-left">
          <span className="footer-stat-chip">
            Filtered: <strong>{displayedCount}</strong> / <strong>{totalStudents}</strong>
          </span>
          {topPerformer && (
            <div className="footer-top-performer">
              <span className="top-performer-icon">🏆</span>
              <span>
                Top Scholar: <strong>{topPerformer.name}</strong>
                <span className="top-score-badge">{topPerformer.cgpa.toFixed(2)} CGPA</span>
              </span>
            </div>
          )}
        </div>

        <div className="footer-right">
          <span className="footer-tech-tag">React 18</span>
          <span className="footer-tech-tag">Props Driven</span>
          <span className="footer-tech-tag">Full CRUD</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

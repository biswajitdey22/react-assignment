import React, { useState } from 'react';

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
  'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
  'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)'
];

const StudentCard = (props) => {
  const { id, name, rollNumber, department, semester, cgpa, photo, onEdit, onDelete } = props;
  const [imgError, setImgError] = useState(false);

  // Compute distinction badge
  const numCgpa = parseFloat(cgpa) || 0;
  const isHighDistinction = numCgpa >= 9.0;
  const isFirstClass = numCgpa >= 8.0 && numCgpa < 9.0;

  const getInitials = (str) => {
    if (!str) return 'ST';
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

  const hasPhoto = Boolean(photo) && !imgError;
  const cgpaPercentage = Math.min(100, Math.max(0, (numCgpa / 10) * 100));

  return (
    <article className="student-card">
      <div className="student-card-top">
        <div className="student-photo-wrapper">
          {hasPhoto ? (
            <img
              src={photo}
              alt={name}
              className="student-photo"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="student-avatar-initials"
              style={{ background: getAvatarGradient(name) }}
            >
              {getInitials(name)}
            </div>
          )}
          <span
            className={`student-cgpa-badge ${isHighDistinction ? 'excellent' : isFirstClass ? 'good' : 'pass'}`}
            title="CGPA Score"
          >
            ★ {numCgpa.toFixed(2)}
          </span>
        </div>
        <h3 className="student-name">{name}</h3>
        <span className="student-roll">Roll: {rollNumber}</span>
      </div>

      <div className="student-card-body">
        <div className="student-info-row">
          <span className="student-info-label">Department</span>
          <span className="student-dept-tag">{department}</span>
        </div>

        <div className="student-info-row">
          <span className="student-info-label">Semester</span>
          <span className="student-info-value">{semester}</span>
        </div>

        <div className="student-info-row">
          <span className="student-info-label">Academic Standing</span>
          <span className={`student-class-badge ${isHighDistinction ? 'distinction' : isFirstClass ? 'first-class' : 'pass'}`}>
            {isHighDistinction ? '🏆 Distinction' : isFirstClass ? '✨ First Class' : '📘 Pass'}
          </span>
        </div>

        {/* Visual CGPA Progress Meter */}
        <div className="student-cgpa-meter-section">
          <div className="student-meter-labels">
            <span className="student-meter-title">CGPA Progress</span>
            <span className="student-meter-score">
              <strong>{numCgpa.toFixed(2)}</strong> / 10.0
            </span>
          </div>
          <div className="student-cgpa-meter-track">
            <div
              className={`student-cgpa-meter-fill ${isHighDistinction ? 'excellent' : isFirstClass ? 'good' : 'pass'}`}
              style={{ width: `${cgpaPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="student-card-actions">
        <button
          type="button"
          className="student-card-btn-action student-btn-edit"
          onClick={() => onEdit && onEdit({ id, name, rollNumber, department, semester, cgpa: numCgpa, photo })}
          title="Edit student profile"
        >
          <span>✏️</span> Edit
        </button>
        <button
          type="button"
          className="student-card-btn-action student-btn-delete"
          onClick={() => onDelete && onDelete(id, name)}
          title="Remove student record"
        >
          <span>🗑️</span> Remove
        </button>
      </div>
    </article>
  );
};

export default StudentCard;

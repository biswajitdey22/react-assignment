import React from 'react';
import StudentCard from './StudentCard';

const StudentList = (props) => {
  const { students, onEdit, onDelete, onAddClick } = props;

  if (!students || students.length === 0) {
    return (
      <div className="student-empty-state">
        <div className="empty-icon-glow">
          <span className="empty-icon">🎓</span>
        </div>
        <h3 className="empty-title">Student Registry is Empty</h3>
        <p className="empty-description">
          No student records found. Click below to add your first student profile and monitor their academic performance.
        </p>
        {onAddClick && (
          <button
            type="button"
            className="empty-cta-btn"
            onClick={onAddClick}
          >
            <span>➕</span> Add First Student Profile
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="student-grid-wrapper">
      <div className="student-grid-header">
        <span className="grid-count-badge">
          Showing <strong>{students.length}</strong> {students.length === 1 ? 'student record' : 'student records'}
        </span>
      </div>
      <section className="student-grid">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            id={student.id}
            name={student.name}
            rollNumber={student.rollNumber}
            department={student.department}
            semester={student.semester}
            cgpa={student.cgpa}
            photo={student.photo}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </section>
    </div>
  );
};

export default StudentList;

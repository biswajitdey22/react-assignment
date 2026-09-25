import React, { useState } from 'react';
import './students.css';
import { initialStudents } from './studentsData';
import Header from './components/Header';
import StudentList from './components/StudentList';
import Footer from './components/Footer';

const StudentApp = () => {
  const [students, setStudents] = useState(initialStudents);
  const [sortOrder, setSortOrder] = useState('none'); // 'none', 'desc', 'asc'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [toast, setToast] = useState(null);

  // Add modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    rollNumber: '',
    department: 'Bachelor of Computer Applications (BCA)',
    semester: 'Semester 7',
    cgpa: '',
    photo: ''
  });

  // Edit modal state
  const [editingStudent, setEditingStudent] = useState(null);

  // Trigger feedback toast
  const triggerToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((curr) => (curr && curr.message === message ? null : curr));
    }, 3200);
  };

  // File upload reader helper
  const handleImageFileChange = (e, callback) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, WebP, etc.)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image file size should be less than 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      callback(event.target.result);
      triggerToast('📷 Photo loaded into preview!', 'info');
    };
    reader.readAsDataURL(file);
  };

  // Add student handler
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.rollNumber || newStudent.cgpa === '') return;

    const studentToAdd = {
      id: Date.now(),
      name: newStudent.name.trim(),
      rollNumber: newStudent.rollNumber.trim(),
      department: newStudent.department.trim(),
      semester: newStudent.semester,
      cgpa: parseFloat(newStudent.cgpa) || 0.0,
      photo: newStudent.photo ? newStudent.photo.trim() : null
    };

    setStudents([studentToAdd, ...students]);
    setNewStudent({
      name: '',
      rollNumber: '',
      department: 'Bachelor of Computer Applications (BCA)',
      semester: 'Semester 7',
      cgpa: '',
      photo: ''
    });
    setShowAddModal(false);
    triggerToast(`✨ Successfully enrolled ${studentToAdd.name}!`, 'success');
  };

  // Open edit modal
  const handleOpenEdit = (student) => {
    setEditingStudent({
      ...student,
      photo: student.photo || ''
    });
  };

  // Update existing student
  const handleUpdateStudent = (e) => {
    e.preventDefault();
    if (!editingStudent || !editingStudent.name || !editingStudent.rollNumber || editingStudent.cgpa === '') return;

    const updated = {
      ...editingStudent,
      name: editingStudent.name.trim(),
      rollNumber: editingStudent.rollNumber.trim(),
      department: editingStudent.department.trim(),
      semester: editingStudent.semester,
      cgpa: parseFloat(editingStudent.cgpa) || 0.0,
      photo: editingStudent.photo ? editingStudent.photo.trim() : null
    };

    setStudents(students.map((s) => (s.id === updated.id ? updated : s)));
    setEditingStudent(null);
    triggerToast(`✏️ Profile for ${updated.name} updated!`, 'info');
  };

  // Delete student
  const handleDeleteStudent = (id, name) => {
    const confirmPrompt = name
      ? `Are you sure you want to remove the record for "${name}"?`
      : 'Are you sure you want to remove this student?';
    if (window.confirm(confirmPrompt)) {
      setStudents(students.filter((s) => s.id !== id));
      triggerToast(`🗑️ Student record removed.`, 'delete');
    }
  };

  // Filter students based on search query and department
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'ALL' || student.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  // Sort students mechanism by CGPA
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortOrder === 'desc') return b.cgpa - a.cgpa;
    if (sortOrder === 'asc') return a.cgpa - b.cgpa;
    return 0;
  });

  // Compute metrics for props
  const avgCgpa = (
    students.reduce((acc, curr) => acc + (parseFloat(curr.cgpa) || 0), 0) / (students.length || 1)
  ).toFixed(2);

  const topStudent = [...students].sort((a, b) => b.cgpa - a.cgpa)[0];

  const departments = ['ALL', ...new Set(students.map((s) => s.department))];

  return (
    <div className="student-portal-container">
      {/* Toast Feedback Notification */}
      {toast && (
        <aside className={`student-toast ${toast.type}`}>
          <span>{toast.message}</span>
        </aside>
      )}

      {/* Header receives data via Props */}
      <Header
        title="Student Information Portal"
        totalCount={students.length}
        averageCgpa={avgCgpa}
      />

      {/* Toolbar / Controls for sorting and filtering */}
      <section className="student-toolbar">
        <div className="student-toolbar-card">
          <div className="student-sort-group">
            <span className="student-sort-label">Sort CGPA:</span>
            <button
              type="button"
              className={`student-btn ${sortOrder === 'desc' ? 'active' : ''}`}
              onClick={() => setSortOrder('desc')}
              title="Rank highest CGPA first"
            >
              ▼ Highest First
            </button>
            <button
              type="button"
              className={`student-btn ${sortOrder === 'asc' ? 'active' : ''}`}
              onClick={() => setSortOrder('asc')}
              title="Rank lowest CGPA first"
            >
              ▲ Lowest First
            </button>
            {sortOrder !== 'none' && (
              <button
                type="button"
                className="student-btn student-btn-reset"
                onClick={() => setSortOrder('none')}
                title="Reset order"
              >
                Reset
              </button>
            )}
            <button
              type="button"
              className="student-btn student-btn-add"
              onClick={() => setShowAddModal(true)}
            >
              <span style={{ fontSize: '1rem' }}>➕</span> Add Student
            </button>
          </div>

          <div className="student-filter-group">
            <div className="student-dept-select-wrapper">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="student-dept-select"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === 'ALL' ? '🏛️ All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="student-search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by name or roll..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="student-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: StudentList receives students, onEdit, onDelete, onAddClick via Props */}
      <main className="student-main">
        <StudentList
          students={sortedStudents}
          onEdit={handleOpenEdit}
          onDelete={handleDeleteStudent}
          onAddClick={() => setShowAddModal(true)}
        />
      </main>

      {/* Footer receives stats via Props */}
      <Footer
        totalStudents={students.length}
        displayedCount={sortedStudents.length}
        topPerformer={topStudent}
      />

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="student-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="student-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="student-modal-header">
              <div className="modal-header-title-box">
                <span className="modal-icon-badge">➕</span>
                <div>
                  <h3>Enroll New Student</h3>
                  <p className="modal-subtitle">Add a student profile to the active registry</p>
                </div>
              </div>
              <button
                type="button"
                className="student-modal-close"
                onClick={() => setShowAddModal(false)}
                title="Close modal"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddStudent} className="student-modal-form">
              {/* Photo Input & Preview */}
              <div className="student-form-group">
                <label>Student Photo (File or URL)</label>
                <div className="student-photo-input-container">
                  <div className="student-photo-preview-circle">
                    {newStudent.photo ? (
                      <img src={newStudent.photo} alt="Preview" className="student-photo-preview-img" />
                    ) : (
                      <span className="student-photo-preview-placeholder">📷</span>
                    )}
                  </div>
                  <div className="student-photo-actions">
                    <label className="student-file-upload-btn">
                      📁 Choose Image File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageFileChange(e, (dataUrl) =>
                            setNewStudent((prev) => ({ ...prev, photo: dataUrl }))
                          )
                        }
                        style={{ display: 'none' }}
                      />
                    </label>
                    <input
                      type="url"
                      placeholder="Or paste web image URL..."
                      value={newStudent.photo && newStudent.photo.startsWith('http') ? newStudent.photo : ''}
                      onChange={(e) => setNewStudent({ ...newStudent, photo: e.target.value })}
                      className="student-photo-url-input"
                    />
                    {newStudent.photo && (
                      <button
                        type="button"
                        className="student-remove-photo-btn"
                        onClick={() => setNewStudent({ ...newStudent, photo: '' })}
                      >
                        ✕ Remove photo (use monogram initials)
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="student-form-group">
                <label>Student Full Name <span className="req">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. Biswajit Dey"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  required
                />
              </div>

              <div className="student-form-group">
                <label>Roll Number <span className="req">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. TIU-BCA-2023-01"
                  value={newStudent.rollNumber}
                  onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })}
                  required
                />
              </div>

              <div className="student-form-group">
                <label>Department / Course <span className="req">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. Bachelor of Computer Applications (BCA)"
                  value={newStudent.department}
                  onChange={(e) => setNewStudent({ ...newStudent, department: e.target.value })}
                  required
                />
              </div>

              <div className="student-form-row">
                <div className="student-form-group">
                  <label>Semester</label>
                  <select
                    value={newStudent.semester}
                    onChange={(e) => setNewStudent({ ...newStudent, semester: e.target.value })}
                  >
                    <option value="Semester 1">Semester 1</option>
                    <option value="Semester 2">Semester 2</option>
                    <option value="Semester 3">Semester 3</option>
                    <option value="Semester 4">Semester 4</option>
                    <option value="Semester 5">Semester 5</option>
                    <option value="Semester 6">Semester 6</option>
                    <option value="Semester 7">Semester 7</option>
                    <option value="Semester 8">Semester 8</option>
                  </select>
                </div>

                <div className="student-form-group">
                  <label>CGPA (0.00 - 10.00) <span className="req">*</span></label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    placeholder="e.g. 9.15"
                    value={newStudent.cgpa}
                    onChange={(e) => setNewStudent({ ...newStudent, cgpa: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="student-modal-actions">
                <button
                  type="button"
                  className="student-modal-btn student-btn-cancel"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="student-modal-btn student-btn-save">
                  Save Student Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="student-modal-overlay" onClick={() => setEditingStudent(null)}>
          <div className="student-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="student-modal-header">
              <div className="modal-header-title-box">
                <span className="modal-icon-badge edit">✏️</span>
                <div>
                  <h3>Edit Student Profile</h3>
                  <p className="modal-subtitle">Modify details and academic score for {editingStudent.name}</p>
                </div>
              </div>
              <button
                type="button"
                className="student-modal-close"
                onClick={() => setEditingStudent(null)}
                title="Close modal"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleUpdateStudent} className="student-modal-form">
              {/* Photo Input & Preview */}
              <div className="student-form-group">
                <label>Student Photo</label>
                <div className="student-photo-input-container">
                  <div className="student-photo-preview-circle">
                    {editingStudent.photo ? (
                      <img src={editingStudent.photo} alt="Preview" className="student-photo-preview-img" />
                    ) : (
                      <span className="student-photo-preview-placeholder">📷</span>
                    )}
                  </div>
                  <div className="student-photo-actions">
                    <label className="student-file-upload-btn">
                      📁 Change Photo from Device
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageFileChange(e, (dataUrl) =>
                            setEditingStudent((prev) => ({ ...prev, photo: dataUrl }))
                          )
                        }
                        style={{ display: 'none' }}
                      />
                    </label>
                    <input
                      type="url"
                      placeholder="Or paste web image URL..."
                      value={editingStudent.photo && editingStudent.photo.startsWith('http') ? editingStudent.photo : ''}
                      onChange={(e) => setEditingStudent({ ...editingStudent, photo: e.target.value })}
                      className="student-photo-url-input"
                    />
                    {editingStudent.photo && (
                      <button
                        type="button"
                        className="student-remove-photo-btn"
                        onClick={() => setEditingStudent({ ...editingStudent, photo: '' })}
                      >
                        ✕ Remove photo (use monogram initials)
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="student-form-group">
                <label>Student Full Name <span className="req">*</span></label>
                <input
                  type="text"
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                  required
                />
              </div>

              <div className="student-form-group">
                <label>Roll Number <span className="req">*</span></label>
                <input
                  type="text"
                  value={editingStudent.rollNumber}
                  onChange={(e) => setEditingStudent({ ...editingStudent, rollNumber: e.target.value })}
                  required
                />
              </div>

              <div className="student-form-group">
                <label>Department / Course <span className="req">*</span></label>
                <input
                  type="text"
                  value={editingStudent.department}
                  onChange={(e) => setEditingStudent({ ...editingStudent, department: e.target.value })}
                  required
                />
              </div>

              <div className="student-form-row">
                <div className="student-form-group">
                  <label>Semester</label>
                  <select
                    value={editingStudent.semester}
                    onChange={(e) => setEditingStudent({ ...editingStudent, semester: e.target.value })}
                  >
                    <option value="Semester 1">Semester 1</option>
                    <option value="Semester 2">Semester 2</option>
                    <option value="Semester 3">Semester 3</option>
                    <option value="Semester 4">Semester 4</option>
                    <option value="Semester 5">Semester 5</option>
                    <option value="Semester 6">Semester 6</option>
                    <option value="Semester 7">Semester 7</option>
                    <option value="Semester 8">Semester 8</option>
                  </select>
                </div>

                <div className="student-form-group">
                  <label>CGPA (0.00 - 10.00) <span className="req">*</span></label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={editingStudent.cgpa}
                    onChange={(e) => setEditingStudent({ ...editingStudent, cgpa: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="student-modal-actions">
                <button
                  type="button"
                  className="student-modal-btn student-btn-cancel"
                  onClick={() => setEditingStudent(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="student-modal-btn student-btn-save">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentApp;

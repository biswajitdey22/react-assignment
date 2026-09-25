import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { getTaskById, updateTask, deleteTask } = useTasks();

  const task = getTaskById(taskId);
  const [isEditing, setIsEditing] = useState(false);
  const [editHeader, setEditHeader] = useState(task ? task.header : '');
  const [editDesc, setEditDesc] = useState(task ? task.description : '');
  const [editPriority, setEditPriority] = useState(task ? task.priority : 'Medium');
  const [editCategory, setEditCategory] = useState(task ? task.category : 'Academic');
  const [editDueDate, setEditDueDate] = useState(task ? task.dueDate : '2026-08-28');
  const [editStatus, setEditStatus] = useState(task ? task.status : 'Raised');

  // Direct manual due date editing on sidebar
  const [isEditingDueDate, setIsEditingDueDate] = useState(false);
  const [quickDueDate, setQuickDueDate] = useState(task ? task.dueDate : '28 Aug 2026');

  if (!task) {
    return (
      <div className="tm-empty-state">
        <div className="tm-empty-icon">⚠️</div>
        <h2 className="tm-empty-title">Task Not Found</h2>
        <p className="tm-empty-desc">
          No work item exists with the identifier: <code style={{ color: '#38bdf8' }}>{taskId}</code>
        </p>
        <Link to="/tasks" className="tm-btn-primary">
          ← Return to All Tasks
        </Link>
      </div>
    );
  }

  const handleSaveEdit = (e) => {
    e.preventDefault();
    updateTask(task.id, {
      header: editHeader,
      description: editDesc,
      priority: editPriority,
      category: editCategory,
      dueDate: editDueDate,
      status: editStatus
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${task.header}"?`)) {
      deleteTask(task.id);
      navigate('/tasks');
    }
  };

  const priorityClass = `tm-priority-badge ${task.priority.toLowerCase()}`;
  const statusClass = `tm-status-badge ${task.status.toLowerCase()}`;

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.88rem',
          color: 'var(--text-muted)',
          marginBottom: '1.25rem'
        }}
      >
        <Link to="/tasks" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 600 }}>
          Tasks
        </Link>
        <span>/</span>
        <span style={{ fontFamily: 'var(--font-mono)', color: '#cbd5e1' }}>{task.id}</span>
      </div>

      {/* Page Header */}
      <div className="tm-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
            <span className="tm-task-id-badge">{task.id}</span>
            <span className={priorityClass}>{task.priority} Priority</span>
            <span className={statusClass}>{task.status}</span>
          </div>
          <h2 className="tm-page-title">{task.header}</h2>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => {
              setIsEditing(!isEditing);
              setEditHeader(task.header);
              setEditDesc(task.description);
              setEditPriority(task.priority);
              setEditCategory(task.category);
              setEditDueDate(task.dueDate);
              setEditStatus(task.status);
            }}
            className="tm-btn-secondary"
          >
            {isEditing ? '✕ Cancel Edit' : '✏️ Edit Task'}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="tm-btn-danger"
          >
            🗑️ Delete
          </button>
        </div>
      </div>

      {isEditing ? (
        /* Edit Form Card */
        <div className="tm-form-card">
          <h3 style={{ margin: '0 0 1.5rem', color: '#ffffff', fontFamily: 'var(--font-display)' }}>
            Edit Task Details
          </h3>
          <form onSubmit={handleSaveEdit}>
            <div className="tm-form-group">
              <label>Task Header *</label>
              <input
                type="text"
                value={editHeader}
                onChange={(e) => setEditHeader(e.target.value)}
                required
              />
            </div>

            <div className="tm-form-group">
              <label>Description *</label>
              <textarea
                rows="4"
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                required
              />
            </div>

            <div className="tm-form-row">
              <div className="tm-form-group">
                <label>Priority *</label>
                <div className="tm-pill-selector">
                  <button
                    type="button"
                    onClick={() => setEditPriority('High')}
                    className={`tm-pill-choice ${editPriority === 'High' ? 'selected-high' : ''}`}
                  >
                    🔴 High
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditPriority('Medium')}
                    className={`tm-pill-choice ${editPriority === 'Medium' ? 'selected-medium' : ''}`}
                  >
                    🟡 Medium
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditPriority('Low')}
                    className={`tm-pill-choice ${editPriority === 'Low' ? 'selected-low' : ''}`}
                  >
                    🟢 Low
                  </button>
                </div>
              </div>

              <div className="tm-form-group">
                <label>Category *</label>
                <div className="tm-pill-selector">
                  <button
                    type="button"
                    onClick={() => setEditCategory('Academic')}
                    className={`tm-pill-choice ${editCategory === 'Academic' ? 'selected-academic' : ''}`}
                  >
                    🎓 Academic
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditCategory('Personal')}
                    className={`tm-pill-choice ${editCategory === 'Personal' ? 'selected-personal' : ''}`}
                  >
                    👤 Personal
                  </button>
                </div>
              </div>
            </div>

            <div className="tm-form-row">
              <div className="tm-form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label>Target Due Date (Editable) *</label>
                  <button
                    type="button"
                    onClick={() => setEditDueDate('28 Aug 2026')}
                    style={{
                      background: 'rgba(56, 189, 248, 0.1)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      color: '#7dd3fc',
                      fontSize: '0.72rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    28 Aug 2026
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="e.g. 28 Aug 2026 or 2026-08-28"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                    style={{ flex: 1 }}
                    required
                  />
                  <input
                    type="date"
                    value={editDueDate.match(/^\d{4}-\d{2}-\d{2}$/) ? editDueDate : ''}
                    onChange={(e) => {
                      if (e.target.value) setEditDueDate(e.target.value);
                    }}
                    style={{
                      width: '46px',
                      padding: '0.8rem 0.4rem',
                      cursor: 'pointer',
                      background: 'var(--bg-input)'
                    }}
                    title="Choose from calendar"
                  />
                </div>
                <span style={{ fontSize: '0.76rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                  ✏️ Type manually or choose using the calendar picker
                </span>
              </div>

              <div className="tm-form-group">
                <label>Lifecycle Status *</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                >
                  <option value="Raised">⚡ Raised</option>
                  <option value="Pending">⏳ Pending / In Progress</option>
                  <option value="Closed">✅ Closed / Completed</option>
                </select>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '0.85rem',
                marginTop: '1.5rem',
                borderTop: '1px solid var(--border-glass)',
                paddingTop: '1.25rem'
              }}
            >
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="tm-btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="tm-btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Detailed View */
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.75rem', alignItems: 'start' }}>
          {/* Main Column */}
          <div className="tm-glass-panel">
            <h3
              style={{
                margin: '0 0 1rem',
                fontSize: '1.2rem',
                color: '#ffffff',
                fontFamily: 'var(--font-display)'
              }}
            >
              Description & Objectives
            </h3>
            <p
              style={{
                fontSize: '1.02rem',
                color: '#cbd5e1',
                lineHeight: '1.7',
                margin: '0 0 2rem',
                whiteSpace: 'pre-wrap'
              }}
            >
              {task.description}
            </p>

            {/* Quick Status Transition */}
            <div
              style={{
                padding: '1.25rem',
                background: 'rgba(2, 6, 23, 0.6)',
                borderRadius: '10px',
                border: '1px solid var(--border-glass)'
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '0.75rem',
                  fontSize: '0.92rem'
                }}
              >
                ⚡ Quick Status Switcher:
              </div>
              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => updateTask(task.id, { status: 'Raised' })}
                  className="tm-status-badge raised"
                  style={{
                    cursor: 'pointer',
                    opacity: task.status === 'Raised' ? 1 : 0.6,
                    transform: task.status === 'Raised' ? 'scale(1.05)' : 'none',
                    boxShadow: task.status === 'Raised' ? '0 0 12px rgba(6, 182, 212, 0.4)' : 'none'
                  }}
                >
                  ⚡ Set to Raised
                </button>
                <button
                  type="button"
                  onClick={() => updateTask(task.id, { status: 'Pending' })}
                  className="tm-status-badge pending"
                  style={{
                    cursor: 'pointer',
                    opacity: task.status === 'Pending' ? 1 : 0.6,
                    transform: task.status === 'Pending' ? 'scale(1.05)' : 'none',
                    boxShadow: task.status === 'Pending' ? '0 0 12px rgba(245, 158, 11, 0.4)' : 'none'
                  }}
                >
                  ⏳ Move to In Progress
                </button>
                <button
                  type="button"
                  onClick={() => updateTask(task.id, { status: 'Closed' })}
                  className="tm-status-badge closed"
                  style={{
                    cursor: 'pointer',
                    opacity: task.status === 'Closed' ? 1 : 0.6,
                    transform: task.status === 'Closed' ? 'scale(1.05)' : 'none',
                    boxShadow: task.status === 'Closed' ? '0 0 12px rgba(16, 185, 129, 0.4)' : 'none'
                  }}
                >
                  ✅ Mark as Completed
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <aside className="tm-glass-panel">
            <h3
              style={{
                margin: '0 0 1.25rem',
                fontSize: '1.15rem',
                color: '#ffffff',
                fontFamily: 'var(--font-display)'
              }}
            >
              Task Metadata
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', fontSize: '0.92rem' }}>
              <div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.76rem', textTransform: 'uppercase', fontWeight: 700 }}>
                  Unique Task ID
                </div>
                <div style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#38bdf8', marginTop: '0.2rem' }}>
                  {task.id}
                </div>
              </div>

              <div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.76rem', textTransform: 'uppercase', fontWeight: 700 }}>
                  Category
                </div>
                <div style={{ marginTop: '0.25rem' }}>
                  <span className="tm-category-badge">{task.category}</span>
                </div>
              </div>

              <div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.76rem', textTransform: 'uppercase', fontWeight: 700 }}>
                  Priority Level
                </div>
                <div style={{ marginTop: '0.25rem' }}>
                  <span className={priorityClass}>{task.priority} Priority</span>
                </div>
              </div>

              <div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.76rem', textTransform: 'uppercase', fontWeight: 700 }}>
                  Raised Date & Time
                </div>
                <div style={{ color: '#cbd5e1', fontFamily: 'var(--font-mono)', fontSize: '0.86rem', marginTop: '0.2rem' }}>
                  📅 {task.raisedAt}
                </div>
              </div>

              {/* Target Due Date with manual instant edit */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ color: 'var(--text-dim)', fontSize: '0.76rem', textTransform: 'uppercase', fontWeight: 700 }}>
                    Target Due Date
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingDueDate(!isEditingDueDate);
                      setQuickDueDate(task.dueDate);
                    }}
                    style={{
                      background: 'rgba(56, 189, 248, 0.12)',
                      border: '1px solid rgba(56, 189, 248, 0.35)',
                      color: '#7dd3fc',
                      fontSize: '0.74rem',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 700
                    }}
                    title="Change due date manually"
                  >
                    {isEditingDueDate ? 'Cancel' : '✏️ Change'}
                  </button>
                </div>

                {isEditingDueDate ? (
                  <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <input
                        type="text"
                        value={quickDueDate}
                        onChange={(e) => setQuickDueDate(e.target.value)}
                        placeholder="e.g. 28 Aug 2026"
                        style={{
                          flex: 1,
                          padding: '0.45rem 0.65rem',
                          fontSize: '0.86rem',
                          background: 'var(--bg-input)',
                          border: '1px solid var(--border-glass-bright)',
                          borderRadius: '6px',
                          color: '#ffffff'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (quickDueDate.trim()) {
                            updateTask(task.id, { dueDate: quickDueDate.trim() });
                            setIsEditingDueDate(false);
                          }
                        }}
                        style={{
                          background: '#2563eb',
                          color: 'white',
                          border: 'none',
                          padding: '0.45rem 0.8rem',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Save
                      </button>
                    </div>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      <button
                        type="button"
                        onClick={() => setQuickDueDate('28 Aug 2026')}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px dashed var(--border-glass)',
                          color: '#94a3b8',
                          fontSize: '0.72rem',
                          padding: '0.15rem 0.4rem',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        28 Aug 2026
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const today = new Date();
                          const formatted = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                          setQuickDueDate(formatted);
                        }}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px dashed var(--border-glass)',
                          color: '#94a3b8',
                          fontSize: '0.72rem',
                          padding: '0.15rem 0.4rem',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Today
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      color: task.priority === 'High' ? '#fb7185' : '#cbd5e1',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.94rem',
                      marginTop: '0.25rem'
                    }}
                  >
                    ⏰ {task.dueDate}
                  </div>
                )}
              </div>

              <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                <Link
                  to="/tasks"
                  className="tm-btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  ← All Tasks
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default TaskDetailsPage;

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

const AddTaskPage = () => {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('High');
  const [category, setCategory] = useState('Academic');
  // Default Due Date requested in assignment: 28 Aug 2026
  const [dueDate, setDueDate] = useState('2026-08-28');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!header.trim() || !description.trim()) {
      alert('Please provide both Task Header and Task Description.');
      return;
    }

    const createdTask = addTask({
      header: header.trim(),
      description: description.trim(),
      priority,
      category,
      dueDate
    });

    navigate(`/tasks/${createdTask.id}`);
  };

  return (
    <div>
      <div className="tm-page-header">
        <div>
          <h2 className="tm-page-title">
            <span>➕</span> Create New Task
          </h2>
          <p className="tm-page-desc">
            Define objectives, priority levels, categories, and target deadlines.
          </p>
        </div>
        <Link to="/tasks" className="tm-btn-secondary">
          ← Back to Tasks
        </Link>
      </div>

      <div className="tm-form-card">
        <form onSubmit={handleSubmit}>
          <div className="tm-form-group">
            <label htmlFor="task-header">Task Header *</label>
            <input
              id="task-header"
              type="text"
              placeholder="e.g. Implement Redux store with slices"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              required
            />
          </div>

          <div className="tm-form-group">
            <label htmlFor="task-desc">Task Description *</label>
            <textarea
              id="task-desc"
              rows="4"
              placeholder="Detailed explanation of work requirements and deliverables..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="tm-form-row">
            <div className="tm-form-group">
              <label>Priority Level *</label>
              <div className="tm-pill-selector">
                <button
                  type="button"
                  onClick={() => setPriority('High')}
                  className={`tm-pill-choice ${priority === 'High' ? 'selected-high' : ''}`}
                >
                  🔴 High Priority
                </button>
                <button
                  type="button"
                  onClick={() => setPriority('Medium')}
                  className={`tm-pill-choice ${priority === 'Medium' ? 'selected-medium' : ''}`}
                >
                  🟡 Medium
                </button>
                <button
                  type="button"
                  onClick={() => setPriority('Low')}
                  className={`tm-pill-choice ${priority === 'Low' ? 'selected-low' : ''}`}
                >
                  🟢 Low
                </button>
              </div>
            </div>

            <div className="tm-form-group">
              <label>Work Category *</label>
              <div className="tm-pill-selector">
                <button
                  type="button"
                  onClick={() => setCategory('Academic')}
                  className={`tm-pill-choice ${category === 'Academic' ? 'selected-academic' : ''}`}
                >
                  🎓 Academic
                </button>
                <button
                  type="button"
                  onClick={() => setCategory('Personal')}
                  className={`tm-pill-choice ${category === 'Personal' ? 'selected-personal' : ''}`}
                >
                  👤 Personal
                </button>
              </div>
            </div>
          </div>

          <div className="tm-form-row">
            <div className="tm-form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label htmlFor="task-duedate">Target Due Date *</label>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button
                    type="button"
                    onClick={() => setDueDate('28 Aug 2026')}
                    style={{
                      background: 'rgba(56, 189, 248, 0.1)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      color: '#7dd3fc',
                      fontSize: '0.72rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                    title="Set to syllabus default: 28 Aug 2026"
                  >
                    28 Aug 2026
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const today = new Date();
                      const formatted = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                      setDueDate(formatted);
                    }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-glass)',
                      color: '#cbd5e1',
                      fontSize: '0.72rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                    title="Set to today's date"
                  >
                    Today
                  </button>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  id="task-duedate"
                  type="text"
                  placeholder="e.g. 28 Aug 2026 or 2026-08-28"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  style={{ flex: 1 }}
                  required
                />
                <input
                  type="date"
                  aria-label="Pick date from calendar"
                  value={dueDate.match(/^\d{4}-\d{2}-\d{2}$/) ? dueDate : ''}
                  onChange={(e) => {
                    if (e.target.value) setDueDate(e.target.value);
                  }}
                  style={{
                    width: '46px',
                    padding: '0.8rem 0.4rem',
                    cursor: 'pointer',
                    background: 'var(--bg-input)'
                  }}
                  title="Choose from calendar picker"
                />
              </div>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                ✏️ Type any date manually (e.g. <strong>28 Aug 2026</strong>) or pick from the calendar
              </span>
            </div>

            <div className="tm-form-group">
              <label>Raised Timestamp (System Auto-Pick)</label>
              <input
                type="text"
                value={currentTime}
                disabled
                style={{
                  background: 'rgba(2, 6, 23, 0.5)',
                  color: '#94a3b8',
                  cursor: 'not-allowed',
                  fontFamily: 'var(--font-mono)'
                }}
              />
              <span style={{ fontSize: '0.78rem', color: '#34d399', marginTop: '0.2rem' }}>
                ✓ Live system clock stamped automatically upon submission
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '0.85rem',
              marginTop: '1.5rem',
              borderTop: '1px solid var(--border-glass)',
              paddingTop: '1.5rem'
            }}
          >
            <button
              type="button"
              onClick={() => navigate('/tasks')}
              className="tm-btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="tm-btn-primary">
              <span>+</span> Save & Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskPage;

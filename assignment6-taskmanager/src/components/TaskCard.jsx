import React from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

const TaskCard = ({ task }) => {
  const { markComplete, deleteTask } = useTasks();

  const priorityClass = `tm-priority-badge ${task.priority.toLowerCase()}`;
  const statusClass = `tm-status-badge ${task.status.toLowerCase()}`;

  return (
    <article className="tm-task-card">
      <div className="tm-task-card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="tm-task-id-badge">{task.id}</span>
          <span className="tm-category-badge">{task.category}</span>
        </div>
        <span className={priorityClass}>{task.priority}</span>
      </div>

      <h4 className="tm-task-title">{task.header}</h4>
      <p className="tm-task-desc">{task.description}</p>

      <div className="tm-task-metadata">
        <div className="tm-meta-row">
          <span>📅 Raised At:</span>
          <span>{task.raisedAt}</span>
        </div>
        <div className="tm-meta-row">
          <span>⏰ Due Date:</span>
          <span style={{ color: task.priority === 'High' ? '#fb7185' : '#cbd5e1', fontWeight: 600 }}>
            {task.dueDate}
          </span>
        </div>
        <div className="tm-meta-row" style={{ marginTop: '0.2rem' }}>
          <span>Status:</span>
          <span className={statusClass}>{task.status}</span>
        </div>
      </div>

      <div className="tm-task-card-actions">
        <Link to={`/tasks/${task.id}`} className="tm-btn-view">
          Inspect Details →
        </Link>

        <div style={{ display: 'flex', gap: '0.45rem' }}>
          {task.status !== 'Closed' && (
            <button
              type="button"
              onClick={() => markComplete(task.id)}
              style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                color: '#6ee7b7',
                padding: '0.45rem 0.8rem',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
              title="Mark as completed/closed"
            >
              ✓ Done
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              if (window.confirm(`Delete task "${task.header}"?`)) {
                deleteTask(task.id);
              }
            }}
            style={{
              background: 'rgba(244, 63, 94, 0.15)',
              border: '1px solid rgba(244, 63, 94, 0.35)',
              color: '#fda4af',
              padding: '0.45rem 0.7rem',
              borderRadius: '6px',
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;

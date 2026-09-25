import React from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';

const CompletedTasksPage = () => {
  const { tasks } = useTasks();

  const completedTasks = tasks.filter((t) => t.status === 'Closed');

  return (
    <div>
      <div className="tm-page-header">
        <div>
          <h2 className="tm-page-title">
            <span>🏆</span> Completed Tasks Archive
          </h2>
          <p className="tm-page-desc">
            Review resolved milestones, finished deliverables, and completed objectives.
          </p>
        </div>
        <Link to="/tasks" className="tm-btn-secondary">
          ← View All Tasks
        </Link>
      </div>

      {completedTasks.length === 0 ? (
        <div className="tm-empty-state">
          <div className="tm-empty-icon">🏆</div>
          <h3 className="tm-empty-title">No completed tasks yet</h3>
          <p className="tm-empty-desc">
            Mark active tasks as "Closed" from the Tasks or Dashboard page to see your completed accomplishments archived here.
          </p>
          <Link to="/tasks" className="tm-btn-primary">
            Explore Active Tasks
          </Link>
        </div>
      ) : (
        <>
          <div
            style={{
              padding: '1rem 1.25rem',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            <span style={{ fontSize: '1.4rem' }}>🎉</span>
            <div>
              <strong style={{ color: '#6ee7b7' }}>Milestone History:</strong>{' '}
              <span style={{ color: '#cbd5e1', fontSize: '0.92rem' }}>
                You have successfully delivered <strong>{completedTasks.length}</strong> task
                {completedTasks.length === 1 ? '' : 's'} to completion!
              </span>
            </div>
          </div>

          <div className="tm-tasks-grid">
            {completedTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CompletedTasksPage;

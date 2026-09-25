import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import JwtInspectorModal from '../components/JwtInspectorModal';

const DashboardPage = () => {
  const { tasks } = useTasks();
  const { user } = useAuth();
  const [showJwtModal, setShowJwtModal] = useState(false);

  const total = tasks.length;
  const raised = tasks.filter((t) => t.status === 'Raised').length;
  const pending = tasks.filter((t) => t.status === 'Pending').length;
  const closed = tasks.filter((t) => t.status === 'Closed').length;

  const academic = tasks.filter((t) => t.category === 'Academic').length;
  const personal = tasks.filter((t) => t.category === 'Personal').length;

  const highPriority = tasks.filter((t) => t.priority === 'High').length;
  const recentTasks = tasks.slice(0, 5);

  return (
    <div>
      {/* Verified Session Banner (Assignment 7 Hero Feature) */}
      <div
        style={{
          background: 'linear-gradient(90deg, rgba(37, 99, 235, 0.15), rgba(168, 85, 247, 0.15))',
          border: '1px solid rgba(168, 85, 247, 0.35)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1.25rem',
          marginBottom: '1.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.3rem' }}>🛡️</span>
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>
              Authenticated Session Verified: <span style={{ color: '#38bdf8' }}>{user?.username}</span>
            </div>
            <div style={{ fontSize: '0.76rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
              Protected Route Active • Simulated JWT Bearer Token Generated
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowJwtModal(true)}
          className="tm-jwt-btn"
        >
          🔑 Inspect Active JWT Claims
        </button>
      </div>

      {/* Page Header */}
      <div className="tm-page-header">
        <div>
          <h2 className="tm-page-title">
            <span>📊</span> Executive Dashboard
          </h2>
          <p className="tm-page-desc">
            Welcome back, <strong style={{ color: '#ffffff' }}>{user?.username}</strong>! Live workload analytics and milestone tracking.
          </p>
        </div>
        <Link to="/add-task" className="tm-btn-primary">
          <span>+</span> Create New Task
        </Link>
      </div>

      {/* KPI Stats */}
      <section className="tm-dashboard-stats">
        <div className="tm-stat-card primary">
          <div className="tm-stat-top">
            <span className="tm-stat-lbl">Total Work Items</span>
            <span className="tm-stat-icon">📁</span>
          </div>
          <div className="tm-stat-num">{total}</div>
          <div className="tm-stat-sub">Across all categories</div>
        </div>

        <div className="tm-stat-card info">
          <div className="tm-stat-top">
            <span className="tm-stat-lbl">Status: Raised</span>
            <span className="tm-stat-icon" style={{ color: '#06b6d4' }}>⚡</span>
          </div>
          <div className="tm-stat-num" style={{ color: '#38bdf8' }}>{raised}</div>
          <div className="tm-stat-sub">Awaiting assignment</div>
        </div>

        <div className="tm-stat-card warning">
          <div className="tm-stat-top">
            <span className="tm-stat-lbl">Status: In Progress</span>
            <span className="tm-stat-icon" style={{ color: '#f59e0b' }}>⏳</span>
          </div>
          <div className="tm-stat-num" style={{ color: '#fbbf24' }}>{pending}</div>
          <div className="tm-stat-sub">Currently active</div>
        </div>

        <div className="tm-stat-card success">
          <div className="tm-stat-top">
            <span className="tm-stat-lbl">Status: Completed</span>
            <span className="tm-stat-icon" style={{ color: '#10b981' }}>✅</span>
          </div>
          <div className="tm-stat-num" style={{ color: '#34d399' }}>{closed}</div>
          <div className="tm-stat-sub">Resolved milestones</div>
        </div>
      </section>

      {/* Distribution Insights */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}
      >
        {/* Category Breakdown */}
        <div className="tm-glass-panel">
          <h3
            style={{
              margin: '0 0 1.25rem',
              fontSize: '1.15rem',
              color: '#ffffff',
              fontFamily: 'var(--font-display)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span>🏷️</span> Category Distribution
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.88rem',
                  marginBottom: '0.45rem'
                }}
              >
                <span style={{ color: '#cbd5e1' }}>🎓 Academic Tasks</span>
                <strong style={{ color: '#93c5fd' }}>
                  {academic} ({total ? Math.round((academic / total) * 100) : 0}%)
                </strong>
              </div>
              <div
                style={{
                  height: '8px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    width: `${total ? (academic / total) * 100 : 0}%`,
                    background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                    height: '100%',
                    borderRadius: '4px',
                    transition: 'width 0.4s ease'
                  }}
                />
              </div>
            </div>

            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.88rem',
                  marginBottom: '0.45rem'
                }}
              >
                <span style={{ color: '#cbd5e1' }}>👤 Personal Tasks</span>
                <strong style={{ color: '#c084fc' }}>
                  {personal} ({total ? Math.round((personal / total) * 100) : 0}%)
                </strong>
              </div>
              <div
                style={{
                  height: '8px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    width: `${total ? (personal / total) * 100 : 0}%`,
                    background: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
                    height: '100%',
                    borderRadius: '4px',
                    transition: 'width 0.4s ease'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Priority & Quick Actions */}
        <div className="tm-glass-panel">
          <h3
            style={{
              margin: '0 0 1.25rem',
              fontSize: '1.15rem',
              color: '#ffffff',
              fontFamily: 'var(--font-display)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span>🚨</span> Priority & Fast Actions
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', margin: '0 0 1.2rem', lineHeight: 1.5 }}>
            You have <strong style={{ color: '#fb7185' }}>{highPriority}</strong> High Priority tasks requiring attention before target deadlines.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link
              to="/tasks"
              className="tm-btn-secondary"
              style={{
                background: 'rgba(244, 63, 94, 0.12)',
                borderColor: 'rgba(244, 63, 94, 0.35)',
                color: '#fda4af'
              }}
            >
              Filter High Priority ({highPriority}) →
            </Link>
            <Link
              to="/completed"
              className="tm-btn-secondary"
              style={{
                background: 'rgba(16, 185, 129, 0.12)',
                borderColor: 'rgba(16, 185, 129, 0.35)',
                color: '#a7f3d0'
              }}
            >
              View Completed ({closed}) →
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <section className="tm-glass-panel">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.25rem'
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: '1.2rem',
              color: '#ffffff',
              fontFamily: 'var(--font-display)'
            }}
          >
            Recent Activity
          </h3>
          {total > 0 && (
            <Link
              to="/tasks"
              style={{
                fontSize: '0.88rem',
                color: '#38bdf8',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              View All ({total}) →
            </Link>
          )}
        </div>

        {recentTasks.length === 0 ? (
          <div className="tm-empty-state" style={{ padding: '3.5rem 1.5rem', margin: 0 }}>
            <div className="tm-empty-icon">📝</div>
            <h4 className="tm-empty-title">No tasks recorded yet</h4>
            <p className="tm-empty-desc">
              Your workspace is currently clear. Create your first task to start organizing assignments and personal milestones.
            </p>
            <Link to="/add-task" className="tm-btn-primary">
              <span>+</span> Create First Task
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {recentTasks.map((task) => (
              <div
                key={task.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem 1.25rem',
                  background: 'rgba(2, 6, 23, 0.55)',
                  borderRadius: '10px',
                  border: '1px solid var(--border-glass)',
                  transition: 'var(--transition)'
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: '#ffffff',
                      fontSize: '0.98rem',
                      marginBottom: '0.35rem'
                    }}
                  >
                    {task.header}
                  </div>
                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      gap: '0.6rem',
                      alignItems: 'center'
                    }}
                  >
                    <span className="tm-category-badge">{task.category}</span>
                    <span>•</span>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>Due: {task.dueDate}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <span className={`tm-status-badge ${task.status.toLowerCase()}`}>
                    {task.status}
                  </span>
                  <Link to={`/tasks/${task.id}`} className="tm-btn-view">
                    Inspect →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <JwtInspectorModal
        isOpen={showJwtModal}
        onClose={() => setShowJwtModal(false)}
      />
    </div>
  );
};

export default DashboardPage;

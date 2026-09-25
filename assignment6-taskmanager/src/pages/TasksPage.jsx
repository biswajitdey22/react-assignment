import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';

const TasksPage = () => {
  const { tasks } = useTasks();

  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredTasks = tasks.filter((task) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      task.header.toLowerCase().includes(q) ||
      task.description.toLowerCase().includes(q);
    const matchesPriority = priorityFilter === 'ALL' || task.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'ALL' || task.category === categoryFilter;
    const matchesStatus = statusFilter === 'ALL' || task.status === statusFilter;

    return matchesSearch && matchesPriority && matchesCategory && matchesStatus;
  });

  const isFiltered =
    searchQuery.trim() !== '' ||
    priorityFilter !== 'ALL' ||
    categoryFilter !== 'ALL' ||
    statusFilter !== 'ALL';

  const handleResetFilters = () => {
    setSearchQuery('');
    setPriorityFilter('ALL');
    setCategoryFilter('ALL');
    setStatusFilter('ALL');
  };

  return (
    <div>
      {/* Page Header */}
      <div className="tm-page-header">
        <div>
          <h2 className="tm-page-title">
            <span>📋</span> All Tasks Workspace
          </h2>
          <p className="tm-page-desc">
            Organize, search, filter, and inspect coursework tasks and personal deadlines.
          </p>
        </div>
        <Link to="/add-task" className="tm-btn-primary">
          <span>+</span> Add New Task
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <section className="tm-filter-toolbar">
        <div className="tm-filter-group">
          <input
            type="text"
            className="tm-filter-input"
            placeholder="🔍 Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className="tm-filter-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="ALL">All Priorities</option>
            <option value="High">🔴 High Priority</option>
            <option value="Medium">🟡 Medium Priority</option>
            <option value="Low">🟢 Low Priority</option>
          </select>

          <select
            className="tm-filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="ALL">All Categories</option>
            <option value="Academic">🎓 Academic</option>
            <option value="Personal">👤 Personal</option>
          </select>

          <select
            className="tm-filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="Raised">⚡ Raised</option>
            <option value="Pending">⏳ In Progress / Pending</option>
            <option value="Closed">✅ Closed</option>
          </select>

          {isFiltered && (
            <button
              type="button"
              onClick={handleResetFilters}
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                color: '#fca5a5',
                padding: '0.6rem 0.95rem',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                fontSize: '0.84rem',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              ✕ Reset Filters
            </button>
          )}
        </div>

        <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: 600 }}>
          Showing <span style={{ color: '#38bdf8' }}>{filteredTasks.length}</span> of {tasks.length} tasks
        </div>
      </section>

      {/* Task Grid / Empty States */}
      {tasks.length === 0 ? (
        <div className="tm-empty-state">
          <div className="tm-empty-icon">📝</div>
          <h3 className="tm-empty-title">No tasks created yet</h3>
          <p className="tm-empty-desc">
            Your task board is ready and waiting! Click the button below to add your first task.
          </p>
          <Link to="/add-task" className="tm-btn-primary">
            <span>+</span> Create First Task
          </Link>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="tm-empty-state">
          <div className="tm-empty-icon">🔍</div>
          <h3 className="tm-empty-title">No matching tasks found</h3>
          <p className="tm-empty-desc">
            No items matched your current search filters. Try adjusting your search query or reset the filters.
          </p>
          <button type="button" onClick={handleResetFilters} className="tm-btn-secondary">
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="tm-tasks-grid">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TasksPage;

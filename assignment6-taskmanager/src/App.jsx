import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './taskmanager.css';
import { TaskProvider } from './context/TaskContext';
import Navigation from './components/Navigation';

import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import AddTaskPage from './pages/AddTaskPage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import CompletedTasksPage from './pages/CompletedTasksPage';

const TaskManagerApp = () => {
  return (
    <TaskProvider>
      <Router>
        <div className="tm-app-container">
          <Navigation />
          <main className="tm-main">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/tasks/:taskId" element={<TaskDetailsPage />} />
              <Route path="/add-task" element={<AddTaskPage />} />
              <Route path="/completed" element={<CompletedTasksPage />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </TaskProvider>
  );
};

export default TaskManagerApp;

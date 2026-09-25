import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './taskmanager.css';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import AddTaskPage from './pages/AddTaskPage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import CompletedTasksPage from './pages/CompletedTasksPage';

const TaskManagerApp = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <div className="tm-app-container">
            <Navigation />
            <main className="tm-main">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tasks"
                  element={
                    <ProtectedRoute>
                      <TasksPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tasks/:taskId"
                  element={
                    <ProtectedRoute>
                      <TaskDetailsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/add-task"
                  element={
                    <ProtectedRoute>
                      <AddTaskPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/completed"
                  element={
                    <ProtectedRoute>
                      <CompletedTasksPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
};

export default TaskManagerApp;

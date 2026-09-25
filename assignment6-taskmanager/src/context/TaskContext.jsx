import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

const INITIAL_TASKS = [];

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    try {
      // Clear legacy sample tasks from localStorage if present
      localStorage.removeItem('tm_tasks_list');
      const saved = localStorage.getItem('tm_tasks_list_v2');
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tm_tasks_list_v2', JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to persist tasks', e);
    }
  }, [tasks]);

  const addTask = ({ header, description, priority, category, dueDate }) => {
    const newId = `TASK-${Date.now().toString().slice(-4)}${Math.floor(10 + Math.random() * 90)}`;
    const now = new Date();
    const formattedRaisedAt = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newTask = {
      id: newId,
      header,
      description,
      priority: priority || 'Medium',
      category: category || 'Academic',
      raisedAt: formattedRaisedAt,
      dueDate: dueDate || '2026-08-28',
      status: 'Raised'
    };

    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  const updateTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const markComplete = (id) => {
    updateTask(id, { status: 'Closed' });
  };

  const getTaskById = (id) => {
    return tasks.find((t) => t.id === id);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        markComplete,
        getTaskById
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

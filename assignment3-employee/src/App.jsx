import React, { useState } from 'react';
import './employee.css';
import { initialEmployees, DEPARTMENTS } from './employeeData';
import EmployeeStats from './components/EmployeeStats';
import EmployeeTable from './components/EmployeeTable';
import EmployeeModal from './components/EmployeeModal';

const EmployeeApp = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedGender, setSelectedGender] = useState('ALL');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [toast, setToast] = useState(null);

  // Trigger toast feedback
  const triggerToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((curr) => (curr && curr.message === message ? null : curr));
    }, 3200);
  };

  // Filter employees by Search, Department, and Gender
  const filteredEmployees = employees.filter((emp) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      emp.name.toLowerCase().includes(query) ||
      emp.id.toLowerCase().includes(query) ||
      emp.phone.toLowerCase().includes(query);
    const matchesDept = selectedDept === 'ALL' || emp.department === selectedDept;
    const matchesGender = selectedGender === 'ALL' || emp.gender === selectedGender;
    return matchesSearch && matchesDept && matchesGender;
  });

  // Calculate department-wise counts
  const departmentCounts = DEPARTMENTS.reduce((acc, dept) => {
    acc[dept] = employees.filter((e) => e.department === dept).length;
    return acc;
  }, {});

  // Handlers for Add, Edit, Delete
  const handleOpenAddModal = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleSaveEmployee = (employeeData) => {
    if (editingEmployee) {
      // Edit existing
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === employeeData.id ? employeeData : emp))
      );
      triggerToast(`✏️ Updated record for ${employeeData.name}!`, 'info');
    } else {
      // Add new
      setEmployees((prev) => [employeeData, ...prev]);
      triggerToast(`✨ Successfully enrolled ${employeeData.name}!`, 'success');
    }
  };

  const handleDeleteEmployee = (employeeId, employeeName) => {
    const confirmDelete = window.confirm(
      employeeName
        ? `Are you sure you want to remove the record for "${employeeName}" (${employeeId})?`
        : `Are you sure you want to delete employee ${employeeId}?`
    );
    if (confirmDelete) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== employeeId));
      triggerToast(`🗑️ Removed employee record (${employeeId}).`, 'delete');
    }
  };

  return (
    <div className="emp-container">
      {/* Toast Notification */}
      {toast && (
        <aside className={`emp-toast ${toast.type}`}>
          <span>{toast.message}</span>
        </aside>
      )}

      {/* Header */}
      <header className="emp-header">
        <div className="emp-header-inner">
          <div className="emp-header-brand">
            <div className="emp-brand-icon-box">
              <span className="emp-brand-icon">🌾</span>
            </div>
            <div>
              <div className="emp-badge-row">
                <span className="emp-live-pulse" />
                <span className="emp-badge-text">AgriCore StaffOS • State & Events Architecture</span>
              </div>
              <h1 className="emp-header-title">Farm Employee Directory</h1>
              <p className="emp-header-subtitle">
                Workforce registry, department allocation, and contact records for agricultural operations.
              </p>
            </div>
          </div>
          <div className="emp-header-cta-group">
            <button
              type="button"
              className="emp-btn-add"
              onClick={handleOpenAddModal}
            >
              <span>➕</span> Add New Employee
            </button>
          </div>
        </div>
      </header>

      {/* Employee Statistics / Count Widget */}
      <EmployeeStats
        totalCount={employees.length}
        filteredCount={filteredEmployees.length}
        departmentCounts={departmentCounts}
      />

      {/* Main Content Area */}
      <main className="emp-content">
        {/* Search & Department Filter Toolbar */}
        <section className="emp-toolbar">
          <div className="emp-filters">
            {/* Search Box */}
            <div className="emp-search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search name, ID, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="emp-input-search"
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

            {/* Department Filter */}
            <div className="emp-select-wrapper">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="emp-select"
              >
                <option value="ALL">🏛️ All Departments ({employees.length})</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept} ({departmentCounts[dept] || 0})
                  </option>
                ))}
              </select>
            </div>

            {/* Gender Filter */}
            <div className="emp-gender-filter-group">
              {['ALL', 'Male', 'Female'].map((gender) => (
                <button
                  key={gender}
                  type="button"
                  className={`emp-gender-tab ${selectedGender === gender ? 'active' : ''}`}
                  onClick={() => setSelectedGender(gender)}
                >
                  {gender === 'ALL' ? 'All Genders' : gender}
                </button>
              ))}
            </div>

            {(searchQuery || selectedDept !== 'ALL' || selectedGender !== 'ALL') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDept('ALL');
                  setSelectedGender('ALL');
                }}
                className="emp-clear-filters-btn"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* View Mode Switcher (Table vs Grid) */}
          <div className="emp-toolbar-right">
            <span className="emp-count-chip">
              Showing <strong>{filteredEmployees.length}</strong> of <strong>{employees.length}</strong>
            </span>
            <div className="emp-view-switcher">
              <button
                type="button"
                className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
                title="Table View"
              >
                ☰ Table
              </button>
              <button
                type="button"
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid Card View"
              >
                ⊞ Cards
              </button>
            </div>
          </div>
        </section>

        {/* Employee Table or Card View */}
        <EmployeeTable
          employees={filteredEmployees}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteEmployee}
          viewMode={viewMode}
          onAddClick={handleOpenAddModal}
        />
      </main>

      {/* Modal for Add / Edit */}
      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEmployee}
        editingEmployee={editingEmployee}
      />
    </div>
  );
};

export default EmployeeApp;

import React, { useState, useEffect } from 'react';
import { DEPARTMENTS } from '../employeeData';

const EmployeeModal = ({ isOpen, onClose, onSave, editingEmployee }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    department: DEPARTMENTS[0],
    gender: 'Male',
    phone: '',
    localAddress: '',
    permanentAddress: '',
    photo: ''
  });

  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        ...editingEmployee,
        photo: editingEmployee.photo || ''
      });
    } else {
      // Auto-generate fresh ID for new employee
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      setFormData({
        id: `EMP-${randomSuffix}`,
        name: '',
        department: DEPARTMENTS[0],
        gender: 'Male',
        phone: '',
        localAddress: '',
        permanentAddress: '',
        photo: ''
      });
    }
  }, [editingEmployee, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, WebP, etc.)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image file size should be less than 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prev) => ({ ...prev, photo: event.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.id.trim() || !formData.phone.trim()) {
      alert('Please fill out all required fields.');
      return;
    }
    onSave({
      ...formData,
      name: formData.name.trim(),
      id: formData.id.trim(),
      phone: formData.phone.trim(),
      localAddress: formData.localAddress.trim(),
      permanentAddress: formData.permanentAddress.trim(),
      photo: formData.photo ? formData.photo.trim() : null
    });
    onClose();
  };

  return (
    <div className="emp-modal-overlay" onClick={onClose}>
      <div className="emp-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="emp-modal-header">
          <div className="modal-title-group">
            <span className={`modal-badge-icon ${editingEmployee ? 'edit' : 'add'}`}>
              {editingEmployee ? '✏️' : '➕'}
            </span>
            <div>
              <h3 className="emp-modal-title">
                {editingEmployee ? 'Edit Staff Profile' : 'Enroll Farm Employee'}
              </h3>
              <p className="emp-modal-subtitle">
                {editingEmployee ? `Update records for ${formData.name || formData.id}` : 'Add a new member to the farm workforce'}
              </p>
            </div>
          </div>
          <button type="button" className="emp-modal-close" onClick={onClose} title="Close">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="emp-modal-form">
          <div className="emp-modal-body">
            {/* Photo Uploader */}
            <div className="emp-form-field">
              <label>Staff Photograph (Optional)</label>
              <div className="emp-photo-zone">
                <div className="emp-photo-preview-circle">
                  {formData.photo ? (
                    <img src={formData.photo} alt="Preview" className="emp-photo-preview-img" />
                  ) : (
                    <span className="emp-photo-placeholder">👤</span>
                  )}
                </div>
                <div className="emp-photo-inputs">
                  <label className="emp-file-btn">
                    📁 Choose Photo File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <input
                    type="url"
                    name="photo"
                    placeholder="Or paste web photo URL..."
                    value={formData.photo && formData.photo.startsWith('http') ? formData.photo : ''}
                    onChange={handleChange}
                    className="emp-url-input"
                  />
                  {formData.photo && (
                    <button
                      type="button"
                      className="emp-remove-photo-btn"
                      onClick={() => setFormData((prev) => ({ ...prev, photo: '' }))}
                    >
                      ✕ Remove photo (use monogram)
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="emp-form-row">
              <div className="emp-form-field">
                <label>Employee ID <span className="req">*</span></label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  required
                  placeholder="e.g. EMP-1001"
                />
              </div>

              <div className="emp-form-field">
                <label>Full Name <span className="req">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Ramesh Patel"
                  required
                />
              </div>
            </div>

            <div className="emp-form-row">
              <div className="emp-form-field">
                <label>Department <span className="req">*</span></label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div className="emp-form-field">
                <label>Gender <span className="req">*</span></label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="emp-form-field">
              <label>Phone Number <span className="req">*</span></label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +91 98450 11223"
                required
              />
            </div>

            <div className="emp-form-field">
              <label>Local Address (Quarters / Farm Residence) <span className="req">*</span></label>
              <textarea
                name="localAddress"
                rows="2"
                value={formData.localAddress}
                onChange={handleChange}
                placeholder="Farm Quarter #4, North Gate..."
                required
              />
            </div>

            <div className="emp-form-field">
              <label>Permanent Address (Hometown / Native Place) <span className="req">*</span></label>
              <textarea
                name="permanentAddress"
                rows="2"
                value={formData.permanentAddress}
                onChange={handleChange}
                placeholder="Village Navli, Anand District, Gujarat - 388355"
                required
              />
            </div>
          </div>

          <div className="emp-modal-footer">
            <button type="button" className="emp-btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="emp-btn-submit">
              {editingEmployee ? 'Save Changes' : 'Enroll Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;

import React, { useState } from 'react';
import DepartmentForm from './DepartmentForm';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('employees');

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('employees')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'employees' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
          >
            Manage Employees
          </button>
          <button
            onClick={() => setActiveTab('departments')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'departments' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
          >
            Manage Departments
          </button>
        </div>

        {activeTab === 'employees' && (
          <div className="space-y-6">
            <EmployeeForm />
            <EmployeeList />
          </div>
        )}

        {activeTab === 'departments' && <DepartmentForm />}
      </div>
    </div>
  );
}
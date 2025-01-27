import React, { useState, useEffect } from 'react';
import LeaveBalance from './LeaveBalance';
import LeaveApplicationForm from './LeaveApplicationForm';
import LeaveHistory from './LeaveHistory';
import { supabase } from '../supabaseClient';

export default function EmployeeDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {user.email}</h1>
          <LeaveBalance />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Apply for Leave</h2>
            <LeaveApplicationForm />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Leave History</h2>
            <LeaveHistory />
          </div>
        </div>
      </div>
    </div>
  );
}
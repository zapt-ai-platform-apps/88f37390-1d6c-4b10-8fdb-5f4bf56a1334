import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthComponent from './components/Auth';
import EmployeeDashboard from './components/EmployeeDashboard';
import AdminPanel from './components/AdminPanel';
import Navbar from './components/Navbar';
import { supabase } from './supabaseClient';

export default function App() {
  const [session, setSession] = React.useState(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar session={session} />
        
        <Routes>
          <Route path="/" element={session ? <EmployeeDashboard /> : <AuthComponent />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/dashboard" element={<EmployeeDashboard />} />
        </Routes>

        <footer className="mt-12 py-4 bg-white border-t">
          <div className="text-center text-sm text-gray-600">
            Made on <a href="https://www.zapt.ai" target="_blank" rel="noopener" className="text-blue-600 hover:underline">ZAPT</a>
          </div>
        </footer>
      </div>
    </Router>
  );
}
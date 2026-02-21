import React, { useEffect } from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './src/pages/Home';
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import AdminDashboard from './src/pages/AdminDashboard';
import TeacherDashboard from './src/pages/TeacherDashboard';
import StudentDashboard from './src/pages/StudentDashboard';
import NotFound from './src/pages/NotFound';

const ProtectedRoute: React.FC<{ children: React.ReactNode; requiredRole?: string }> = ({
  children,
  requiredRole,
}) => {
  const authToken = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRole');

  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  useEffect(() => {
    // keep title consistent
    document.title = 'HS LearnPath+ Educational Platform';
  }, []);

  return (
    <Theme appearance="dark" radius="large" scaling="100%">
      <Router>
        <main className="min-h-screen font-sans bg-background text-foreground">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/users" element={<NotFound />} />
            <Route path="/admin/analytics" element={<NotFound />} />
            <Route path="/admin/settings" element={<NotFound />} />

            {/* Teacher Routes */}
            <Route
              path="/teacher/dashboard"
              element={
                <ProtectedRoute requiredRole="teacher">
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/teacher/upload" element={<NotFound />} />
            <Route path="/teacher/attendance" element={<NotFound />} />
            <Route path="/teacher/meetings" element={<NotFound />} />
            <Route path="/teacher/analytics" element={<NotFound />} />

            {/* Student Routes */}
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/student/materials" element={<NotFound />} />
            <Route path="/student/quizzes" element={<NotFound />} />
            <Route path="/student/meetings" element={<NotFound />} />

            {/* Settings */}
            <Route path="/settings" element={<NotFound />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            newestOnTop
            closeOnClick
            pauseOnHover
          />
        </main>
      </Router>
    </Theme>
  );
};

export default App;
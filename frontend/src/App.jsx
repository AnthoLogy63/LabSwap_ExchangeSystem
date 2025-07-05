import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';

import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import CoursesPage from './pages/USER/CoursesPage';
import EditStudentCourses from './pages/USER/EditStudentCourses';
import ContactSwap from './pages/USER/ContactSwap';
import StudentProfile from './pages/USER/StudentProfile';

import AdminCoursesPanel from './pages/ADMIN/AdminCoursesPanel';
import AdminHistoryPanel from './pages/ADMIN/AdminHistoryPanel';

import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;
  
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Rutas para usuarios */}
        <Route
          path="/inicio"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <MainLayout><HomePage /></MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cursos"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <MainLayout><CoursesPage /></MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/mis-cursos"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <MainLayout><EditStudentCourses /></MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <MainLayout><StudentProfile /></MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/intercambio/:exchangeCode"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <MainLayout><ContactSwap /></MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Rutas para admins */}
        <Route
          path="/admin/panel-cursos"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <MainLayout><AdminCoursesPanel /></MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/historial"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <MainLayout><AdminHistoryPanel /></MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

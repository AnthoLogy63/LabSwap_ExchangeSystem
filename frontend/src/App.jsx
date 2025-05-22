import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout'

import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import CoursesPage from './pages/USER/CoursesPage';
import EditStudentCourses from './pages/USER/EditStudentCourses';
import ContactSwap from './pages/USER/ContactSwap';
import StudentProfile from './pages/USER/StudentProfile';

import AdminCoursesPanel from './pages/ADMIN/AdminCoursesPanel';
import AdminHistoryPanel from './pages/ADMIN/AdminHistoryPanel';


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/cursos" element={<MainLayout><CoursesPage /></MainLayout>} />
        <Route path="/mis-cursos" element={<MainLayout><EditStudentCourses /></MainLayout>} />
        <Route path="/perfil" element={<MainLayout><StudentProfile /></MainLayout>} />
        <Route path="/intercambio" element={<MainLayout><ContactSwap /></MainLayout>} />
        <Route path="/admin/panel-cursos" element={<MainLayout><AdminCoursesPanel /></MainLayout>} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;

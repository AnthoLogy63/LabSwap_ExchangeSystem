import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout'

import InicioDeSesion from "./pages/InicioDeSesion"
import PaginaDeInicio from "./pages/PaginaDeInicio"
import PaginaDeCursos from './pages/USER/PaginaDeCursos';
import EdicionCursosEstudiante from './pages/USER/EdicionCursosEstudiante'
import ContactarIntercambio from './pages/USER/ContactarIntercambio'
import PerfilDelEstudiante from './pages/USER/PerfilDelEstudiante'

import PaneldeCursos_Admin from './pages/ADMIN/PaneldeCursos_Admin'
import PanelHistorial_Admin from './pages/ADMIN/PanelHistorial-Admin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InicioDeSesion />} />

        {/* Rutas protegidas envueltas en MainLayout */}
        <Route
          path="/inicio"
          element={
            <MainLayout>
              <PaginaDeInicio />
            </MainLayout>
          }
        />
        <Route
          path="/cursos"
          element={
            <MainLayout>
              <PaginaDeCursos />
            </MainLayout>
          }
        />
        <Route
          path="/mis-cursos"
          element={
            <MainLayout>
              <EdicionCursosEstudiante />
            </MainLayout>
          }
        />
        <Route
          path="/perfil"
          element={
            <MainLayout>
              <PerfilDelEstudiante />
            </MainLayout>
          }
        />
        <Route
          path="/intercambio"
          element={
            <MainLayout>
              <ContactarIntercambio />
            </MainLayout>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin/panel-cursos"
          element={
            <MainLayout>
              <PaneldeCursos_Admin />
            </MainLayout>
          }
        />
        <Route
          path="/admin/historial"
          element={
            <MainLayout>
              <PanelHistorial_Admin />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App

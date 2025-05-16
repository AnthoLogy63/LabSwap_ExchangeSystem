import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from "./layouts/Navbar"
import UserBar from "./layouts/UserBar"
import InicioDeSesion from "./pages/InicioDeSesion"
import PaginaDeInicio from "./pages/PaginaDeInicio"
import PaginaDeCursos from './pages/PaginaDeCursos';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
        <Navbar />
        <div className="flex-1 flex flex-col">
          <UserBar />
          <div className="p-6 flex-1">
            <Routes>
              <Route path="/" element={<InicioDeSesion />} />
              <Route path="/inicio" element={<PaginaDeInicio />} />
              <Route path="/cursos" element={<PaginaDeCursos />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App

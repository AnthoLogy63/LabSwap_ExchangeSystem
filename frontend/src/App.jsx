// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from "./layouts/Navbar"
import InicioDeSesion from "./pages/InicioDeSesion"
import PaginaDeInicio from "./pages/PaginaDeInicio"

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Navbar/>
        
        <main className="flex-1 p-6 ml-64">
          <Routes>
            <Route path="/" element={<InicioDeSesion />} />
            <Route path="/inicio" element={<PaginaDeInicio />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
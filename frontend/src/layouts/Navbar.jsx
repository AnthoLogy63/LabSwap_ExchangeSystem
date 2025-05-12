import { Link } from 'react-router-dom'
import { FaHome, FaBook, FaClipboardList } from 'react-icons/fa'

function Navbar() {
  return (
    <div className="w-64 h-screen bg-teal-800 text-white p-6 shadow-xl rounded-r-3xl fixed top-0 left-0 z-10 flex flex-col">
      <h2 className="text-2xl font-bold mb-10">LAB SWAP</h2>
      <nav className="flex flex-col gap-6">
        <Link to="/inicio" className="flex items-center gap-2 hover:text-teal-300">
          <FaHome />
          Inicio
        </Link>
        <Link to="/panel" className="flex items-center gap-2 hover:text-teal-300">
          <FaClipboardList />
          Lista de Cursos
        </Link>
        <Link to="/mis-cursos" className="flex items-center gap-2 hover:text-teal-300">
          <FaBook />
          Mis Cursos
        </Link>
      </nav>
    </div>
  )
}

export default Navbar

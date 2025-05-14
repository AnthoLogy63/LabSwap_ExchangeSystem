import { Link, useLocation } from 'react-router-dom'
import { Home, BookOpen, GraduationCap } from 'lucide-react'  // o el ícono que uses

const Navbar = () => {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-[#0E6F79] text-white w-60 min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-10 tracking-wide">LAB SWAP</h1>

      <ul className="flex flex-col gap-3">
        <li>
          <Link
            to="/inicio"
            className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-colors ${
              isActive('/inicio') ? 'bg-white text-[#0E6F79] font-semibold' : 'hover:bg-[#0C5E6A]'
            }`}
          >
            <Home
              size={20}
              className={isActive('/inicio') ? 'fill-[#0E6F79]' : ''}
            />
            Inicio
          </Link>
        </li>

        <li>
          <Link
            to="/cursos"
            className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-colors ${
              isActive('/cursos') ? 'bg-white text-[#0E6F79] font-semibold' : 'hover:bg-[#0C5E6A]'
            }`}
          >
            <BookOpen
              size={20}
              className={isActive('/cursos') ? 'fill-[#0E6F79]' : ''}
            />
            Lista de Cursos
          </Link>
        </li>

        <li>
          <Link
            to="/mis-cursos"
            className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-colors ${
              isActive('/mis-cursos') ? 'bg-white text-[#0E6F79] font-semibold' : 'hover:bg-[#0C5E6A]'
            }`}
          >
            <GraduationCap
              size={20}
              className={isActive('/mis-cursos') ? 'fill-[#0E6F79]' : ''}
            />
            Mis Cursos
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar

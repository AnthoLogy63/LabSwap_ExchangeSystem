import { Link, useLocation } from 'react-router-dom'
import { Home, BookOpen, GraduationCap, ClipboardList, History} from 'lucide-react'  // o el ícono que uses
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const location = useLocation()
  const { userRole } = useAuth();

  const isActive = (paths) => {
    if (Array.isArray(paths)) {
      return paths.some((path) => location.pathname.startsWith(path));
    }
    return location.pathname === paths; 
  };

  return (
    <nav className="bg-[#0E6F79] text-white w-60 min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-10 tracking-wide">LAB SWAP</h1>
      <ul className="flex flex-col gap-3">
        {userRole === "user" && (
          <>
            <li>
              <Link
                to="/inicio"
                className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-colors ${
                  isActive("/inicio")
                    ? "bg-white text-[#0E6F79] font-semibold"
                    : "hover:bg-[#0C5E6A]"
                }`}
              >
                <Home size={20} />
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/cursos"
                className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-colors ${
                  isActive(["/cursos", "/intercambio"])
                    ? "bg-white text-[#0E6F79] font-semibold"
                    : "hover:bg-[#0C5E6A]"
                }`}
              >
                <BookOpen size={20} />
                Lista de Cursos
              </Link>
            </li>
            <li>
              <Link
                to="/mis-cursos"
                className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-colors ${
                  isActive("/mis-cursos")
                    ? "bg-white text-[#0E6F79] font-semibold"
                    : "hover:bg-[#0C5E6A]"
                }`}
              >
                <GraduationCap size={20} />
                Mis Cursos
              </Link>
            </li>
          </>
        )}

        {userRole === "admin" && (
          <>
            <li>
              <Link
                to="/admin/panel-cursos"
                className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-colors ${
                  isActive("/admin/panel-cursos")
                    ? "bg-white text-[#0E6F79] font-semibold"
                    : "hover:bg-[#0C5E6A]"
                }`}
              >
                <ClipboardList size={20} />
                Panel de Cursos
              </Link>
            </li>
            <li>
              <Link
                to="/admin/historial"
                className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-colors ${
                  isActive("/admin/historial")
                    ? "bg-white text-[#0E6F79] font-semibold"
                    : "hover:bg-[#0C5E6A]"
                }`}
              >
                <History size={20} />
                Historial
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar

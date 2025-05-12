import { Link, useLocation } from "react-router-dom"
import { Home, BookOpen, Users } from "lucide-react"

function Sidebar() {
  const location = useLocation()

  return (
    <div className="w-64 bg-teal-700 text-white">
      <div className="p-6">
        <h1 className="text-3xl font-bold">Lab Swap</h1>
      </div>
      <nav className="mt-6">
        <Link
          to="/"
          className={`flex items-center gap-3 p-4 text-white ${location.pathname === "/" ? "bg-teal-600/50" : "hover:bg-teal-600/30"}`}
        >
          <Home className="h-5 w-5" />
          <span>Inicio</span>
        </Link>
        <Link
          to="/cursos"
          className={`flex items-center gap-3 p-4 text-white ${location.pathname === "/cursos" ? "bg-teal-600/50" : "hover:bg-teal-600/30"}`}
        >
          <BookOpen className="h-5 w-5" />
          <span>Lista de Cursos</span>
        </Link>
        <Link
          to="/mis-cursos"
          className={`flex items-center gap-3 p-4 text-white ${location.pathname === "/mis-cursos" ? "bg-teal-600/50" : "hover:bg-teal-600/30"}`}
        >
          <Users className="h-5 w-5" />
          <span>Mis Cursos</span>
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar

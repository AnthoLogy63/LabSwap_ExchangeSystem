import { Home, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext"; // Ajusta la ruta si es diferente

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <div className="w-64 bg-teal-700 text-white">
        <div className="p-6">
          <h1 className="text-3xl font-bold">Lab Swap</h1>
        </div>
        <nav className="mt-6">
          <Link to="/" className="flex items-center gap-3 bg-teal-600/50 p-4 text-white">
            <Home className="h-5 w-5" />
            <span>Inicio</span>
          </Link>
          <Link to="/cursos" className="flex items-center gap-3 p-4 text-white hover:bg-teal-600/30">
            <BookOpen className="h-5 w-5" />
            <span>Lista de Cursos</span>
          </Link>
          <Link to="/mis-cursos" className="flex items-center gap-3 p-4 text-white hover:bg-teal-600/30">
            <Users className="h-5 w-5" />
            <span>Mis Cursos</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white p-8">
        <div className="flex justify-end mb-6">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-red-900 flex items-center justify-center text-white">
              <Users className="h-5 w-5" />
            </div>
            <span className="text-red-900 font-medium">{user?.name || "Invitado"}</span>
          </div>
        </div>

        {/* El resto igual... */}
      </div>
    </div>
  );
}

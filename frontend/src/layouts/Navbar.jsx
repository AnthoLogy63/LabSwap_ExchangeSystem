import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  GraduationCap,
  ClipboardList,
  History,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../context/authContext';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  // Componente reutilizable para enlaces de navegación
  const navLink = (to, icon, label) => (
    <li>
      <Link
        to={to}
        className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-colors ${
          isActive(to)
            ? 'bg-white text-[#0E6F79] font-semibold'
            : 'hover:bg-[#0C5E6A]'
        }`}
      >
        {icon}
        {label}
      </Link>
    </li>
  );

  return (
    <nav className="bg-[#0E6F79] text-white w-60 min-h-screen p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-bold mb-10 tracking-wide">LAB SWAP</h1>
        <ul className="flex flex-col gap-3">
          {user?.role === 'user' && (
            <>
              {navLink('/inicio', <Home size={20} />, 'Inicio')}
              {navLink('/cursos', <BookOpen size={20} />, 'Lista de Cursos')}
              {navLink('/mis-cursos', <GraduationCap size={20} />, 'Mis Cursos')}
            </>
          )}

          {user?.role === 'admin' && (
            <>
              {navLink('/admin/panel-cursos', <ClipboardList size={20} />, 'Panel de Cursos')}
              {navLink('/admin/historial', <History size={20} />, 'Historial')}
            </>
          )}
        </ul>
      </div>

      {/* Siempre visible mientras el usuario esté logueado */}
      {user && (
        <button
          onClick={logout}
          className="mt-10 flex items-center gap-2 text-white hover:text-red-400 transition-colors"
        >
          <LogOut size={20} />
          Cerrar sesión
        </button>
      )}
    </nav>
  );
};

export default Navbar;

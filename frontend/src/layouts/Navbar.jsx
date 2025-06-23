import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  GraduationCap,
  ClipboardList,
  History,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // controla visibilidad del navbar en móvil

  const isActive = (paths) => {
    if (Array.isArray(paths)) {
      return paths.some((path) => location.pathname.startsWith(path));
    }
    return location.pathname === paths;
  };

  const navLink = (to, icon, label, activePaths = to) => (
    <li>
      <Link
        to={to}
        onClick={() => setIsOpen(false)} // Cierra el menú al navegar
        className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-colors ${
          isActive(activePaths)
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
    <>
      {/* Botón hamburguesa (solo visible en móviles) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`md:hidden fixed top-4 left-4 z-50 bg-[#0E6F79] text-white p-2 rounded-md shadow-md transition-opacity duration-200 ${
    isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
  }`}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navbar */}
      <nav
        className={`bg-[#0E6F79] text-white w-60 min-h-screen p-4 flex flex-col justify-between 
        fixed top-0 left-0 z-40 transition-transform duration-300 ease-in-out 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static md:flex`}
        
      >
        <div>
          <h1 className="text-3xl font-bold mb-10 tracking-wide">LAB SWAP</h1>
          <ul className="flex flex-col gap-3">
            {user?.role === 'student' && (
              <>
                {navLink('/inicio', <Home size={20} />, 'Inicio')}
                {navLink('/cursos', <BookOpen size={20} />, 'Lista de Cursos', ['/cursos', '/intercambio'])}
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

      {/* Fondo semitransparente al abrir menú en móvil */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        />
      )}
    </>
  );
};

export default Navbar;

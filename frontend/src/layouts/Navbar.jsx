import { Link } from 'react-router-dom';
import { Home, BookOpen, GraduationCap } from 'lucide-react';

function Navbar() {
  return (
    <div className="w-64 bg-cyan-900 text-white h-screen p-6 flex flex-col justify-start">
      <h1 className="text-3xl font-bold mb-10 tracking-widest">LAB SWAP</h1>
      
      <nav className="flex flex-col space-y-4">
        <Link to="/inicio" className="flex items-center p-3 bg-cyan-600 rounded-lg hover:bg-cyan-700">
          <Home className="mr-2" /> Inicio
        </Link>
        <Link to="/cursos" className="flex items-center p-3 hover:bg-cyan-700 rounded-lg">
          <BookOpen className="mr-2" /> Lista de Cursos
        </Link>
        <Link to="/miscursos" className="flex items-center p-3 hover:bg-cyan-700 rounded-lg">
          <GraduationCap className="mr-2" /> Mis Cursos
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;

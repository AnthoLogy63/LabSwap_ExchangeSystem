import { Link } from 'react-router-dom';
import { Pencil, UserCircle2 } from 'lucide-react';
import { useAuth } from '../../src/context/AuthContext';

function UserBar() {
  const { user } = useAuth();

  return (
    <div className="flex justify-end items-center p-6">
      <Link to="/perfil" className="flex items-center space-x-2 hover:underline hover:text-red-700 transition">
        <div className="bg-[#761A11] p-1 rounded-full">
          <UserCircle2 className="text-white w-8 h-8" />
        </div>
        <span className="text-xl text-red-900 font-medium pr-10 pl-2">
          {user?.name || 'Invitado'}
        </span>
      </Link>
    </div>
  );
}

export default UserBar;

import { Link } from 'react-router-dom';
import { UserCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function UserBar() {
  const { user } = useAuth();

  return (
    <div className="w-full px-4 py-4">
      <div className="flex justify-end items-center">
        <Link
          to="/perfil"
          className="flex items-center gap-2 hover:underline hover:text-red-700 transition max-w-full"
        >
          <div className="bg-[#761A11] p-1 rounded-full shrink-0">
            <UserCircle2 className="text-white w-8 h-8" />
          </div>
          <span className="font-medium text-red-900 text-sm sm:text-base md:text-lg lg:text-xl truncate max-w-[180px]">
            {user?.name || 'Invitado'}
          </span>
        </Link>
      </div>
    </div>
  );
}

export default UserBar;

import { Link } from 'react-router-dom';
import { UserCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function UserBar() {
  const { user } = useAuth();

  const fullName = (() => {
    if (!user?.name) return 'Invitado';
    const parts = user.name.split(' ');
    return `${parts[0] || ''} ${parts[2] || ''}`;
  })();

  const profileImageUrl = user?.profileImageName
    ? `http://localhost:8080/uploads/profile-images/${user.profileImageName}`
    : null;

  return (
    <div className="w-full px-4 py-4">
      <div className="flex justify-end items-center">
        <Link
          to="/perfil"
          className="flex items-center gap-2 hover:underline hover:text-red-700 transition max-w-full md:ml-2 lg:ml-4"
        >
          <div className="bg-[#761A11] rounded-full overflow-hidden w-10 h-10 flex items-center justify-center">
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="Perfil"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/default-profile.png'; // Imagen fallback
                }}
              />
            ) : (
              <UserCircle2 className="text-white w-8 h-8" />
            )}
          </div>

          <span className="font-medium text-red-900 text-sm sm:text-base md:text-lg lg:text-xl truncate max-w-[180px] sm:max-w-[200px] md:max-w-none overflow-visible">
            {fullName}
          </span>
        </Link>
      </div>
    </div>
  );
}

export default UserBar;

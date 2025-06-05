import { useAuth } from '../../../src/context/AuthContext';
import { Pencil, UserCircle2 } from 'lucide-react';


function StudentProfile() {
  const { user } = useAuth();

  if (!user) {
    return <div className="p-10 text-center">Inicia sesión con tu cuenta @unsa.edu.pe para ver tu perfil.</div>;
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex items-start pt-10">
      <div className="ml-50 w-full flex justify-center">
        <div className="bg-white p-12 max-w-4xl w-[100%] mx-auto rounded-xl shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="bg-red-800 p-5 rounded-full">
              <UserCircle2 className="text-white w-12 h-12" />
            </div>
          </div>

          <h2 className="text-center text-2xl font-bold text-red-800 mb-6">
            {user.name}
          </h2>

          <div className="grid grid-cols-3 gap-4 text-base mb-8">
            <div className="font-semibold text-right">Año:</div>
            <div className="col-span-1 border-l pl-4">5to</div>
            <Pencil className="w-4 h-4 mt-1 text-gray-500 cursor-pointer" />

            <div className="font-semibold text-right">Número:</div>
            <div className="col-span-1 border-l pl-4">-</div>
            <Pencil className="w-4 h-4 mt-1 text-gray-500 cursor-pointer" />

            <div className="font-semibold text-right">Correo UNSA:</div>
            <div className="col-span-2 border-l pl-4">{user.email}</div>

            <div className="font-semibold text-right">Correo adicional:</div>
            <div className="col-span-1 border-l pl-4">-</div>
            <Pencil className="w-4 h-4 mt-1 text-gray-500 cursor-pointer" />
          </div>

          <div className="flex justify-end">
            <button className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-700 transition">
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;

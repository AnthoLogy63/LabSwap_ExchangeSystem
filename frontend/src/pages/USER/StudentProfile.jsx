import { useEffect, useState } from "react";
import { Pencil, UserCircle2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function StudentProfile() {
  const { user } = useAuth();
  const [student, setStudent] = useState(null);

  // Obtener info del estudiante desde la base de datos
  const fetchStudent = async () => {
    try {
      const res = await fetch(`http://localhost:8080/students/by-email/${user.email}`);
      const data = await res.json();
      setStudent(data);
    } catch (error) {
      console.error("Error al cargar datos del estudiante:", error);
    }
  };

  useEffect(() => {
    if (user) fetchStudent();
  }, [user]);

  if (!user) {
    return (
      <div className="p-10 text-center">
        Inicia sesión con tu cuenta @unsa.edu.pe para ver tu perfil.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex items-start pt-10">
      <div className="ml-50 w-full flex justify-center">
        <div className="bg-white p-12 max-w-4xl w-[100%] mx-auto rounded-xl shadow-2xl">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="bg-red-800 p-5 rounded-full">
              <UserCircle2 className="text-white w-12 h-12" />
            </div>
          </div>

          {/* Nombre */}
          <h2 className="text-center text-2xl font-bold text-red-800 mb-6">
            {user.name}
          </h2>

          {/* AVISO de datos faltantes */}
          {student &&
            (!student.studentPhone || !student.altEmail || !student.yearStudy) && (
              <div className="mb-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg shadow">
                <p className="font-semibold">⚠️ Por favor completa tus datos antes de continuar.</p>
                <p className="text-sm mt-1">
                  Faltan campos como teléfono, año de estudio o correo alternativo.
                </p>
              </div>
            )}

          {/* Info del perfil */}
          <div className="grid grid-cols-3 gap-4 text-base mb-8">
            <div className="font-semibold text-right">Año:</div>
            <div className="col-span-1 border-l pl-4">
              {student?.yearStudy || "No definido"}
            </div>
            <Pencil className="w-4 h-4 mt-1 text-gray-500 cursor-pointer" />

            <div className="font-semibold text-right">Número:</div>
            <div className="col-span-1 border-l pl-4">
              {student?.studentPhone || "No definido"}
            </div>
            <Pencil className="w-4 h-4 mt-1 text-gray-500 cursor-pointer" />

            <div className="font-semibold text-right">Correo UNSA:</div>
            <div className="col-span-2 border-l pl-4 break-words text-wrap">{user.email}</div>

            <div className="font-semibold text-right">Correo adicional:</div>
            <div className="col-span-1 border-l pl-4">
              {student?.altEmail || "No definido"}
            </div>
            <Pencil className="w-4 h-4 mt-1 text-gray-500 cursor-pointer" />
          </div>

          {/* Botón para guardar cambios (a futuro editable) */}
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

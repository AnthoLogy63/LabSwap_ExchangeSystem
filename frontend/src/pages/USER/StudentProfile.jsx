import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Pencil, UserCircle2 } from "lucide-react";

function StudentProfile() {
  const { user } = useAuth();
  const [student, setStudent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    studentPhone: "",
    altEmail: "",
    yearStudy: "",
    studentEmail: user.email,
  });

  // 🔁 Esta función ahora está fuera del useEffect para poder reutilizarla
  const fetchStudentData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/students/by-email?email=${user.email}`);
      if (!response.ok) throw new Error("No se pudo cargar el estudiante");
      const data = await response.json();
      setStudent(data);
      setForm({
        studentPhone: data.studentPhone || "",
        altEmail: data.studentAltEmail || "",
        yearStudy: data.yearStudy || "",
        studentEmail: data.studentEmail || user.email,
      });

      // ✅ Solo forzamos edición si los campos están vacíos
      if (!data.studentPhone || !data.studentAltEmail || !data.yearStudy) {
        alert("Por favor, completa tus datos antes de continuar.");
        setEditMode(true);
      }
    } catch (err) {
      console.error("Error al cargar datos del estudiante", err);
    }
  };

  // 👇 Llamada inicial
  useEffect(() => {
    if (user?.email) {
      fetchStudentData();
    }
  }, [user.email]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      if (!form.studentPhone || !form.altEmail || !form.yearStudy) {
        alert("Por favor, completa todos los campos antes de guardar.");
        return;
      }

      const res = await fetch(`http://localhost:8080/students/${student.studentCode}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...student,
          studentPhone: form.studentPhone,
          studentAltEmail: form.altEmail,
          yearStudy: form.yearStudy,
        }),
      });

      if (!res.ok) throw new Error("Error al guardar cambios");

      alert("Datos actualizados con éxito");
      setEditMode(false);
      await fetchStudentData(); // 🔁 Carga los datos actualizados
    } catch (err) {
      alert("Error al guardar datos");
      console.error(err);
    }
  };

  if (!user) {
    return (
      <div className="p-10 text-center">
        Inicia sesión con tu cuenta @unsa.edu.pe para ver tu perfil.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-start pt-10">
      <div className="w-full flex justify-center">
        <div className="bg-white p-12 max-w-4xl w-full mx-auto rounded-xl shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="bg-red-800 p-5 rounded-full">
              <UserCircle2 className="text-white w-12 h-12" />
            </div>
          </div>

          <h2 className="text-center text-2xl font-bold text-red-800 mb-6">{user.name}</h2>

          <div className="grid grid-cols-3 gap-4 text-base mb-8">
            <div className="font-semibold text-right">Año:</div>
            <div className="col-span-1 border-l pl-4">
              {editMode ? (
                <input
                  type="text"
                  name="yearStudy"
                  value={form.yearStudy}
                  onChange={handleChange}
                  className="border px-2 py-1 w-full"
                />
              ) : (
                student?.yearStudy || "-"
              )}
            </div>
            <Pencil className="w-4 h-4 mt-1 text-gray-500" />

            <div className="font-semibold text-right">Número:</div>
            <div className="col-span-1 border-l pl-4">
              {editMode ? (
                <input
                  type="text"
                  name="studentPhone"
                  value={form.studentPhone}
                  onChange={handleChange}
                  className="border px-2 py-1 w-full"
                />
              ) : (
                student?.studentPhone || "-"
              )}
            </div>
            <Pencil className="w-4 h-4 mt-1 text-gray-500" />

            <div className="font-semibold text-right">Correo UNSA:</div>
            <div className="col-span-2 border-l pl-4">{user.email}</div>

            <div className="font-semibold text-right">Correo adicional:</div>
            <div className="col-span-1 border-l pl-4">
              {editMode ? (
                <input
                  type="email"
                  name="altEmail"
                  value={form.altEmail}
                  onChange={handleChange}
                  className="border px-2 py-1 w-full"
                />
              ) : (
                student?.studentAltEmail || "-"
              )}
            </div>
            <Pencil className="w-4 h-4 mt-1 text-gray-500" />
          </div>

          <div className="flex justify-end gap-4">
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Guardar Cambios
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Editar Perfil
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;

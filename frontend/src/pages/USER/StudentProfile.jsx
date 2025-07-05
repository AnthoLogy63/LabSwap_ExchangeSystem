import { useEffect, useState, useRef } from "react";
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

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const tempUrlRef = useRef(null); // ⬅️ para limpiar URL.createObjectURL

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

      if (data.profileImageName) {
        setImagePreview(`http://localhost:8080/uploads/profile-images/${data.profileImageName}`);
      }

      if (!data.studentPhone || !data.studentAltEmail || !data.yearStudy) {
        alert("Por favor, completa tus datos antes de continuar.");
        setEditMode(true);
      }
    } catch (err) {
      console.error("Error al cargar datos del estudiante", err);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchStudentData();
    }
    return () => {
      if (tempUrlRef.current) URL.revokeObjectURL(tempUrlRef.current); // limpiar URL temporal al desmontar
    };
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
      await fetchStudentData(); // ⬅️ para actualizar imagen si se subió también
    } catch (err) {
      alert("Error al guardar datos");
      console.error(err);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      setImagePreview(tempUrl);
      tempUrlRef.current = tempUrl;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch(`http://localhost:8080/students/${student.studentCode}/upload-image`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Error al subir imagen");

        await fetchStudentData();
        URL.revokeObjectURL(tempUrl); // limpia preview temporal después de cargar real
        tempUrlRef.current = null;
      } catch (err) {
        alert("Error al subir imagen");
        console.error(err);
      }
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
          <div className="flex justify-center mb-6 relative">
            <div
              className="w-28 h-28 rounded-full bg-red-800 border-4 border-white overflow-hidden relative cursor-pointer hover:opacity-90 transition"
              onClick={() => fileInputRef.current.click()}
              title="Cambiar foto de perfil"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Foto de perfil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <UserCircle2 className="text-white w-12 h-12" />
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition">
                <Pencil className="text-white w-6 h-6" />
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
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

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ConfirmSwapModal from "../../components/ConfirmSwapModal";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; 

const ContactSwap = () => {
  const { user } = useAuth();
  const { exchangeCode } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [exchange, setExchange] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);


  // Cargar datos reales del intercambio
  useEffect(() => {
    if (!exchangeCode) return;
    setLoading(true);
    axios.get(`http://localhost:8080/exchanges/${exchangeCode}`)
      .then(res => {  
        setExchange(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al obtener el intercambio:", err);
        setLoading(false);
      });
  }, [exchangeCode]);

  const handleConfirm = async (dniFile) => {
    setError("");
    setUploading(true);

    try {
      // 1. Crear la confirmación del estudiante (POST /student-confirmations)
      const confirmPayload = {
        confirmationStatus: 1,
        student: { studentCode: user.studentCode }
      };

      const confirmRes = await axios.post(
        "http://localhost:8080/student-confirmations",
        confirmPayload
      );

      const studentConfirmationCode = confirmRes.data.studentConfirmationCode;

      // 2. Actualizar el intercambio para asignar el código de confirmación 2 (PUT /exchanges/{exchangeCode}/student2)
      await axios.put(
        `http://localhost:8080/exchanges/${exchange.exchangeCode}/student2`,
        { student2: { studentCode: user.studentCode } } 
      );  

      // 3. Subir el archivo del DNI (POST /confirmation-documents/{confirmationCode})
       const formData = new FormData();
      formData.append("file", dniFile);

      await axios.post(
        `http://localhost:8080/confirmation-documents/${studentConfirmationCode}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // 4. Mostrar éxito y limpiar modal
      setSuccessMessage("¡Intercambio confirmado correctamente! Espera la validación del laboratorio.");
      setShowModal(false);

    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Hubo un error al confirmar el intercambio. Intenta de nuevo."
      );
    }

    setUploading(false);
  };


  // Si está cargando o no encontró el intercambio
  if (loading) {
    return <div className="p-10 text-center text-lg">Cargando intercambio...</div>;
  }
  if (!exchange) {
    return <div className="p-10 text-center text-red-700">No se encontró el intercambio.</div>;
  }

  // Extraer los datos del estudiante y cursos
  const student = exchange.student1 || {};
  const year = student.yearStudy ? `${student.yearStudy}º` : "-";
  const phone = student.studentPhone || "-";
  const emailUnsa = student.studentEmail || "-";
  const altEmail = student.altEmail || "-";
  const offer = exchange.offeredCourseGroup
    ? `${exchange.offeredCourseGroup.course.courseName} - ${exchange.offeredCourseGroup.groupName}`
    : "-";
  const need = exchange.desiredCourseGroup
    ? `${exchange.desiredCourseGroup.course.courseName} - ${exchange.desiredCourseGroup.groupName}`
    : "-";

  return (
    <div className="p-6 w-full overflow-x-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-5xl font-bold text-teal-800">
          Contactar para el Intercambio
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-black"
        >
          <ArrowLeft className="mr-1" size={20} />
          Regresar
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center text-center mb-8 gap-4">
        <div className="bg-red-500 rounded-full p-4 mr-4">
          <svg
            className="w-9 h-9 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="4 4 16 16"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.121 17.804A4 4 0 0110 14h4a4 4 0 014.879 3.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <h2 className="text-5xl text-teal-900 font-medium text-center">
          {student.studentName || "Estudiante"}
        </h2>
      </div>

      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-6 border p-4 sm:p-6 rounded-2xl shadow-md bg-white min-h-[450px]">

        <div className="w-full md:w-[60%] flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-x-6 text-base text-gray-800">
            <div className="space-y-8 text-left font-semibold text-2xl">
              <div>Año:</div>
              <div>Número:</div>
              <div>Correo UNSA:</div>
              <div>Correo adicional:</div>
            </div>
            <div className="space-y-8 text-left text-2xl break-all">
              <div>{year}</div>
              <div>{phone}</div>
              <div>{emailUnsa}</div>
              <div>{altEmail}</div>
            </div>
          </div>

          <div className="mt-6 bg-cyan-100 p-4 rounded-md flex flex-col md:flex-row text-2xl">
            <div className="flex-1 md:pr-4 mb-4 md:mb-0">
              <span className="text-teal-700 font-semibold">Ofrezco:</span><br />
              {offer}
            </div>
            <div className="hidden md:block border-l border-gray-400 mx-2"></div>
            <div className="flex-1 md:pl-4">
              <span className="text-red-700 font-semibold">Necesito:</span><br />
              {need}
            </div>
          </div>
        </div>

        <div className="w-full md:w-[40%] flex flex-col justify-between text-xl sm:text-2xl">
          <div>
            <h3 className="font-semibold mb-2">Confirmar Intercambio de curso:</h3>
            <div className="bg-gray-100 p-4 rounded-md text-xl mb-4">
              Luego de presionar “Confirmar Intercambio” necesitarás subir una copia
              de tu DNI de las dos caras, para validar el intercambio de cursos. Dicha
              información será enviada al encargado de laboratorio para su validación.
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-[#b12a2a] text-white text-xl px-6 py-3 rounded-md"
              onClick={() => setShowModal(true)}
            >
              Enviar Solicitud
            </button>
          </div>
        </div>
      </div>

      {/* Modal separado */}
      {showModal && (
        <ConfirmSwapModal
          exchange={exchange} 
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirm}
        />
      )}
      {/* Mensaje de éxito */}
      {successMessage && (
        <div className="mt-8 text-green-700 text-xl text-center font-semibold">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default ContactSwap;

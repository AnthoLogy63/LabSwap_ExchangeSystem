import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ContactSwap = () => {
  const navigate = useNavigate();

  // Datos simulados, en la práctica esto vendría de props o del backend
  const student = {
    nombre: "José Carlos Quispe Zapata",
    anio: "5to",
    numero: "923423419",
    correoUnsa: "pcarrilla@unsa.edu.pe",
    correoAdicional: "pcarrilla@gmail.com",
    ofrece: "Investigación de Operaciones - C",
    necesita: "Investigación de Operaciones - A",
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-teal-800">
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

      <div className="flex items-center mb-4">
        <div className="bg-red-500 rounded-full p-4 mr-4">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.121 17.804A4 4 0 0110 14h4a4 4 0 014.879 3.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl text-teal-900 font-semibold">
          {student.nombre}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border p-6 rounded-md shadow-md bg-white">
        <div>
          <p>
            <strong>Año:</strong> {student.anio}
          </p>
          <p>
            <strong>Número:</strong> {student.numero}
          </p>
          <p>
            <strong>Correo UNSA:</strong> {student.correoUnsa}
          </p>
          <p>
            <strong>Correo adicional:</strong> {student.correoAdicional}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Confirmar Intercambio de curso:</h3>
          <div className="bg-gray-100 p-4 rounded-md text-sm mb-4">
            Luego de presionar “Confirmar Intercambio” necesitarás subir una copia
            de tu DNI de las dos caras, para validar el intercambio de cursos. Dicha
            información será enviada al encargado de laboratorio para su validación.
          </div>
          <button className="bg-[#b12a2a] text-white text-sm px-4 py-2 rounded-md">
            Enviar Solicitud
          </button>
        </div>
      </div>

      <div className="mt-6 bg-cyan-100 p-4 rounded-md flex justify-around text-lg">
        <div>
          <span className="text-teal-700 font-semibold">Ofrezco:</span>{" "}
          {student.ofrece}
        </div>
        <div className="border-l border-gray-400 mx-4 h-auto"></div>
        <div>
          <span className="text-red-700 font-semibold">Necesito:</span>{" "}
          {student.necesita}
        </div>
      </div>
    </div>
  );
};

export default ContactSwap;

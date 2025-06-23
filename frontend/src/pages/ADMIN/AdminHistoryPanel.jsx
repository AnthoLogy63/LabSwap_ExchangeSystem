import React, { useEffect, useState } from "react";

const mockHistoryData = [
  {
    id: 1,
    offeredCourse: "Investigación de operaciones C",
    desiredCourse: "Investigación de operaciones A",
    studentName: "Pedro Pascadffdl Quispe Juan",
    studentEmail: "juan@arequipa.unsa.edu.pe",
    status: "ACEPTADO",
  },
  {
    id: 2,
    offeredCourse: "Investigación de operaciones C",
    desiredCourse: "Investigación de operaciones A",
    studentName: "Pedro Pascadffdl Quispe Juan",
    studentEmail: "juan@arequipa.unsa.edu.pe",
    status: "ACEPTADO",
  },
  {
    id: 3,
    offeredCourse: "Investigación de operaciones C",
    desiredCourse: "Investigación de operaciones A",
    studentName: "Pedro Pascadffdl Quispe Juan",
    studentEmail: "juan@arequipa.unsa.edu.pe",
    status: "RECHAZADO",
  },
];

const AdminHistoryPanel = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Reemplazar con la conexion a la bd cuando esté disponible
    // Aquí luego puedes reemplazar esto con una llamada axios:
    // axios.get("/api/history").then(res => setHistory(res.data));
    setHistory(mockHistoryData);
  }, []);

  return (
    <div className="px-[60px] py-[40px] bg-white min-h-screen">
      <h1 className="text-6xl font-bold text-[#08484F] mb-8">Historial</h1>

      {history.map((entry) => (
        <div
          key={entry.id}
          className="flex flex-col md:flex-row justify-between items-center bg-[#e9fbff] rounded-2xl px-8 py-6 mb-6"
        >
          <div className="flex flex-col md:flex-row w-full md:w-[60%]">
            {/* Columna Izquierda */}
            <div className="md:w-1/2 border-r border-black pr-6 mb-4 md:mb-0">
              <p className="text-2xl font-semibold text-[#08484F] mb-4">{entry.offeredCourse}</p>
              <p className="text-lg">
                <span className="font-bold">Alumno:</span> {entry.studentName}
              </p>
              <p className="text-lg">
                <span className="font-bold">Correo Electrónico:</span> {entry.studentEmail}
              </p>
            </div>

            {/* Columna Derecha */}
            <div className="md:w-1/2 pl-6">
              <p className="text-2xl font-semibold text-[#b12a2a] mb-4">{entry.desiredCourse}</p>
              <p className="text-lg">
                <span className="font-bold">Alumno:</span> {entry.studentName}
              </p>
              <p className="text-lg">
                <span className="font-bold">Correo Electrónico:</span> {entry.studentEmail}
              </p>
            </div>

            <div>

            </div>
          </div>

          {/* Botón */}
          <div className="flex flex-col md:flex-row w-full md:w-[15%]">
            <button className="bg-[#1db4c4] text-white px-10 py-2 font-medium text-xl rounded-xl hover:bg-[#168d9b] transition">
              Revisar Datos
            </button>
          </div>

            
          {/* Estado */}
          <div className="flex flex-col md:flex-row w-full md:w-[15%]">
            <p className="text-4xl mt-1">
              <span className="font-bold">Estado:<br></br></span>{" "}
              <span
                className={
                  entry.status === "ACEPTADO"
                    ? "text-[#1db4c4] font-semibold"
                    : "text-[#b12a2a] font-semibold"
                }
              >
                {entry.status}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminHistoryPanel;

import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminHistoryPanel = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/exchanges")
      .then((res) => {
        console.log("👉 Datos del backend:", res.data);
        setHistory(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener historial:", err);
      });
  }, []);

  return (
    <div className="px-[60px] py-[40px] pb-[100px] bg-white min-h-screen overflow-y-auto h-screen">
      <h1 className="text-6xl font-bold text-[#08484F] mb-8">Historial</h1>

      {history.map((entry) => (
        <div
          key={entry.exchangeCode}
          className="flex flex-col md:flex-row justify-between items-center bg-[#e9fbff] rounded-2xl px-8 py-6 mb-6"
        >
          <div className="flex flex-col md:flex-row w-full md:w-[60%]">
            {/* Columna Izquierda */}
            <div className="md:w-1/2 border-r border-black pr-6 mb-4 md:mb-0">
              <p className="text-2xl font-semibold text-[#08484F] mb-4">
                {entry.offeredCourseGroup.course.courseName}<br></br>Grupo {entry.offeredCourseGroup.groupName}
              </p>
              <p className="text-lg">
                <span className="font-bold">Alumno:</span> {entry.student1.studentName}
              </p>
              <p className="text-lg">
                <span className="font-bold">Correo Electrónico:</span> {entry.student1.studentEmail}
              </p>
            </div>

            {/* Columna Derecha */}
            <div className="md:w-1/2 pl-6">
              <p className="text-2xl font-semibold text-[#b12a2a] mb-4">
                {entry.desiredCourseGroup.course.courseName}<br></br>Grupo {entry.desiredCourseGroup.groupName}
              </p>
              <p className="text-lg">
                <span className="font-bold">Alumno:</span> {entry.student2.studentName}
              </p>
              <p className="text-lg">
                <span className="font-bold">Correo Electrónico:</span> {entry.student2.studentEmail}
              </p>
            </div>
          </div>

          {/* Botón */}
          <div className="flex flex-col md:flex-row w-full md:w-[15%] mt-4 md:mt-0">
            <button className="bg-[#1db4c4] text-white px-10 py-2 font-medium text-xl rounded-xl hover:bg-[#168d9b] transition">
              Revisar Datos
            </button>
          </div>

          {/* Estado */}
          <div className="flex flex-col md:flex-row w-full md:w-[15%] mt-4 md:mt-0">
            <p className="text-4xl mt-1">
              <span className="font-bold">Estado:<br /></span>{" "}
              <span
                className={
                  entry.adminConfirmation?.confirmationStatus === 1
                    ? "text-[#1db4c4] font-semibold"
                    : "text-[#b12a2a] font-semibold"
                }
              >
                {entry.adminConfirmation?.confirmationStatus === 1 ? "ACEPTADO" : "RECHAZADO"}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminHistoryPanel;

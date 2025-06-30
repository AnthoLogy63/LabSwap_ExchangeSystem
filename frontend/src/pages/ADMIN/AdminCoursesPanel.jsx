import React, { useEffect, useState } from "react";

const AdminCoursesPanel = () => {
  const [exchanges, setExchanges] = useState([]);

  const fetchExchanges = async () => {
    try {
      const res = await fetch("http://localhost:8080/exchanges/pendientes");
      const data = await res.json();
      setExchanges(data);
    } catch (err) {
      console.error("Error al obtener intercambios:", err);
    }
  };

  useEffect(() => {
    fetchExchanges();
  }, []);

  const handleStatusUpdate = async (exchangeCode, status) => {
    try {
      const res = await fetch(`http://localhost:8080/exchanges/${exchangeCode}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: status }),
      });

      if (!res.ok) throw new Error("No se pudo actualizar el estado");
      alert(`Intercambio ${status.toLowerCase()} correctamente`);
      setExchanges((prev) => prev.filter((e) => e.exchangeCode !== exchangeCode));
    } catch (err) {
      console.error("Error al actualizar:", err);
      alert("Error al actualizar el estado del intercambio");
    }
  };

  return (
    <div className="h-screen overflow-y-auto px-[60px] py-[40px] bg-white scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      <h1 className="text-6xl font-bold text-[#08484F] mb-8">Intercambios Pendientes</h1>

      {exchanges.length === 0 ? (
        <p className="text-gray-600">No hay intercambios pendientes.</p>
      ) : (
        exchanges.map((exchange, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between items-center bg-[#e9fbff] rounded-2xl px-8 py-6 mb-6 shadow-sm"
          >
            <div className="flex flex-col md:flex-row w-full md:w-[60%]">
              {/* Ofrecido */}
              <div className="md:w-1/2 border-r border-black pr-6 mb-4 md:mb-0">
                <p className="text-2xl font-semibold text-[#08484F] mb-4">
                  {exchange.offeredCourseName}
                </p>
                <p className="text-lg">
                  <span className="font-bold">Alumno:</span> {exchange.offeringStudentName}
                </p>
                <p className="text-lg">
                  <span className="font-bold">Correo:</span> {exchange.offeringStudentEmail}
                </p>
              </div>

              {/* Deseado */}
              <div className="md:w-1/2 pl-6">
                <p className="text-2xl font-semibold text-[#b12a2a] mb-4">
                  {exchange.desiredCourseName}
                </p>
                <p className="text-lg">
                  <span className="font-bold">Alumno:</span> {exchange.receivingStudentName}
                </p>
                <p className="text-lg">
                  <span className="font-bold">Correo:</span> {exchange.receivingStudentEmail}
                </p>
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col md:flex-row w-full md:w-[30%] mt-4 md:mt-0 gap-4 justify-center items-center">
              <button
                className="bg-[#1db4c4] text-white px-8 py-2 text-lg rounded-xl hover:bg-[#168d9b] transition"
                onClick={() => alert(JSON.stringify(exchange, null, 2))}
              >
                Revisar Datos
              </button>
              <div className="flex gap-2">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-semibold"
                  onClick={() => handleStatusUpdate(exchange.exchangeCode, "ACEPTADO")}
                >
                  ✓ Aceptar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold"
                  onClick={() => handleStatusUpdate(exchange.exchangeCode, "RECHAZADO")}
                >
                  ✗ Rechazar
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminCoursesPanel;

// src/pages/ADMIN/AdminCoursesPanel.jsx

import React, { useEffect, useState } from "react";

const AdminCoursesPanel = () => {
  const [exchanges, setExchanges] = useState([]);

  // Obtener intercambios pendientes
  const fetchExchanges = async () => {
    try {
      const response = await fetch("http://localhost:8080/exchanges/pendientes");
      const data = await response.json();
      setExchanges(data);
    } catch (error) {
      console.error("Error al obtener intercambios:", error);
    }
  };

  useEffect(() => {
    fetchExchanges();
  }, []);

  // Aceptar o rechazar
  const handleStatusUpdate = async (exchangeCode, status) => {
    try {
      const response = await fetch(`http://localhost:8080/exchanges/${exchangeCode}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado: status }),
      });

      if (!response.ok) throw new Error("No se pudo actualizar el estado");

      const updatedExchange = await response.json();
      alert(`Intercambio ${status.toLowerCase()} correctamente`);

      // Actualizar lista eliminando el intercambio procesado
      setExchanges((prev) =>
        prev.filter((exchange) => exchange.exchangeCode !== exchangeCode)
      );
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar el estado del intercambio");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-[#761A11]">Intercambios Pendientes</h1>

      {exchanges.length === 0 ? (
        <p>No hay intercambios pendientes.</p>
      ) : (
        exchanges.map((exchange) => (
          <div key={exchange.exchangeCode} className="bg-white shadow p-4 mb-4 rounded-lg border border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Curso Ofrecido</h2>
                <p>{exchange.offeredCourseName}</p>
                <p>{exchange.offeringStudentName}</p>
                <p>{exchange.offeringStudentEmail}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Curso Deseado</h2>
                <p>{exchange.desiredCourseName}</p>
                <p>{exchange.receivingStudentName}</p>
                <p>{exchange.receivingStudentEmail}</p>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => handleStatusUpdate(exchange.exchangeCode, "RECHAZADO")}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Rechazar Intercambio
              </button>
              <button
                onClick={() => handleStatusUpdate(exchange.exchangeCode, "ACEPTADO")}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Confirmar Intercambio
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminCoursesPanel;

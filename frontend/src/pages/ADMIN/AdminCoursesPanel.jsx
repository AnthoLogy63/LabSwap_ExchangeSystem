// src/pages/ADMIN/AdminCoursesPanel.jsx

import React, { useEffect, useState } from "react";

const AdminCoursesPanel = () => {
  const [exchanges, setExchanges] = useState([]);

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

      await response.json();
      alert(`Intercambio ${status.toLowerCase()} correctamente`);

      setExchanges((prev) =>
        prev.filter((exchange) => exchange.exchangeCode !== exchangeCode)
      );
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar el estado del intercambio");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-[#2B4B66] mb-6">Intercambios</h1>
      {exchanges.length === 0 ? (
        <p className="text-gray-500">No hay intercambios pendientes.</p>
      ) : (
        exchanges.map((exchange) => (
          <div
            key={exchange.exchangeCode}
            className="bg-[#E8FBFF] rounded-xl shadow-lg p-6 mb-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-4 shadow border">
                <h2 className="text-[#03647A] font-semibold text-lg mb-2">
                  {exchange.offeredCourseName}
                </h2>
                <p>
                  <strong>Alumno:</strong> {exchange.offeringStudentName}
                </p>
                <p>
                  <strong>Correo Electrónico:</strong> {exchange.offeringStudentEmail}
                </p>
              </div>
              <div className="bg-[#FFF1F1] rounded-xl p-4 shadow border">
                <h2 className="text-[#E03A3E] font-semibold text-lg mb-2">
                  {exchange.desiredCourseName}
                </h2>
                <p>
                  <strong>Alumno:</strong> {exchange.receivingStudentName}
                </p>
                <p>
                  <strong>Correo Electrónico:</strong> {exchange.receivingStudentEmail}
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="bg-[#00BCD4] text-white px-4 py-2 rounded hover:bg-[#0097A7] transition"
                onClick={() => alert("Revisar Datos de: " + exchange.exchangeCode)}
              >
                Revisar Datos
              </button>
              <button
                onClick={() => handleStatusUpdate(exchange.exchangeCode, "RECHAZADO")}
                className="bg-[#00BCD4] text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Rechazar Intercambio ✗
              </button>
              <button
                onClick={() => handleStatusUpdate(exchange.exchangeCode, "ACEPTADO")}
                className="bg-[#00BCD4] text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Confirmar Intercambio ✓
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminCoursesPanel;

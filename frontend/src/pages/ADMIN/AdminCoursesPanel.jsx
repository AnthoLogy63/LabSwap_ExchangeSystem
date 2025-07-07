import React, { useEffect, useState } from "react";
import ConfirmExchangeModal from "../../components/ConfirmExchangeModal";
import RejectExchangeModal from "../../components/RejectExchangeModal";

const AdminCoursesPanel = () => {
  const [exchanges, setExchanges] = useState([]);
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);

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

  const handleStatusUpdate = async (exchangeCode, status, reason = "") => {
    try {
      const res = await fetch(`http://localhost:8080/exchanges/${exchangeCode}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: status, motivo: reason }),
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
    <div className="h-screen overflow-y-auto px-4 sm:px-8 md:px-[60px] py-[40px] bg-white scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      <h1 className="text-4xl md:text-6xl font-bold text-[#08484F] mb-8 text-center sm:text-left">
        Intercambios Pendientes
      </h1>

      {exchanges.length === 0 ? (
        <p className="text-gray-600 text-center">No hay intercambios pendientes.</p>
      ) : (
        exchanges.map((exchange, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between items-center bg-[#e9fbff] rounded-2xl px-4 sm:px-6 md:px-8 py-6 mb-6 shadow-sm gap-6"
          >
            <div className="flex flex-col md:flex-row w-full md:w-[60%] gap-4">
              {/* Ofrecido */}
              <div className="md:w-1/2 border-b md:border-b-0 md:border-r border-black pr-0 md:pr-6 pb-4 md:pb-0">
                <p className="text-2xl font-semibold text-[#08484F] mb-2">
                  {exchange.offeredCourseName}
                </p>
                <p className="text-base md:text-lg">
                  <span className="font-bold">Alumno:</span> {exchange.offeringStudentName}
                </p>
                <p className="text-base md:text-lg break-all">
                  <span className="font-bold">Correo:</span> {exchange.offeringStudentEmail}
                </p>
              </div>

              {/* Deseado */}
              <div className="md:w-1/2 pl-0 md:pl-6">
                <p className="text-2xl font-semibold text-[#b12a2a] mb-2">
                  {exchange.desiredCourseName}
                </p>
                <p className="text-base md:text-lg">
                  <span className="font-bold">Alumno:</span> {exchange.receivingStudentName}
                </p>
                <p className="text-base md:text-lg break-all">
                  <span className="font-bold">Correo:</span> {exchange.receivingStudentEmail}
                </p>
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col md:flex-row w-full md:w-[30%] gap-2 justify-center items-center mt-4 md:mt-0">
              <button
                className="bg-[#1db4c4] text-white px-6 py-2 text-base md:text-lg rounded-xl hover:bg-[#168d9b] transition w-full md:w-auto"
                onClick={() => alert(JSON.stringify(exchange, null, 2))}
              >
                Revisar Datos
              </button>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-semibold text-base md:text-lg"
                  onClick={() => {
                    setSelectedExchange(exchange);
                    setConfirmOpen(true);
                  }}
                >
                  ✓ Aceptar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold text-base md:text-lg"
                  onClick={() => {
                    setSelectedExchange(exchange);
                    setRejectOpen(true);
                  }}
                >
                  ✗ Rechazar
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Modal Confirmar */}
      <ConfirmExchangeModal
        visible={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          handleStatusUpdate(selectedExchange.exchangeCode, "ACEPTADO");
          setConfirmOpen(false);
        }}
        courseA={selectedExchange?.offeredCourseName}
        courseB={selectedExchange?.desiredCourseName}
      />

      {/* Modal Rechazar */}
      <RejectExchangeModal
        visible={rejectOpen}
        onClose={() => setRejectOpen(false)}
        onReject={(reason) => {
          handleStatusUpdate(selectedExchange.exchangeCode, "RECHAZADO", reason);
          setRejectOpen(false);
        }}
        courseA={selectedExchange?.offeredCourseName}
        courseB={selectedExchange?.desiredCourseName}
      />
    </div>
  );
};

export default AdminCoursesPanel;

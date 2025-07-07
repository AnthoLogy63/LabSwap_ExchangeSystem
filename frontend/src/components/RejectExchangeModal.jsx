import React, { useState } from "react";

const RejectExchangeModal = ({ visible, onClose, onReject, courseA, courseB }) => {
  const [reason, setReason] = useState("");

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-3xl p-12 sm:p-16 rounded-3xl shadow-xl border-4 border-teal-800 text-teal-900">
        <h2 className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-8 text-center">
          Confirmación Para Rechazar<br className="hidden sm:block" /> Intercambio de Curso
        </h2>
        <p className="text-lg sm:text-2xl mb-6 sm:mb-10 text-center">
          Estas por rechazar el intercambio de los cursos seleccionados:
        </p>
        <div className="text-center text-xl sm:text-2xl font-semibold text-teal-700 mb-6">
          <p>{courseA}</p>
          <p>{courseB}</p>
        </div>
        <textarea
          placeholder="Motivo del rechazo..."
          className="w-full border border-gray-400 rounded-lg p-3 mb-6 text-base sm:text-lg"
          rows={4}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="flex justify-center gap-10 sm:gap-20 text-lg sm:text-xl">
          <button
            onClick={onClose}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md"
          >
            Cancelar
          </button>
          <button
            onClick={() => onReject(reason)}
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-md"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectExchangeModal;

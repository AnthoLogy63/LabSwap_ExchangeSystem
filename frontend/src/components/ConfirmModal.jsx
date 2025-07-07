import React from 'react';

export default function ConfirmModal({ message, onConfirm, onCancel, title = "Confirmación Para Borrar Oferta de Intercambio" }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-[90%] max-w-md border-4 border-cyan-900">
        <h2 className="text-2xl font-bold text-teal-900 text-center mb-4">{title}</h2>
        <p className="text-lg text-gray-700 text-center mb-6">{message}</p>
        <div className="flex justify-center gap-6">
          <button
            onClick={onCancel}
            className="bg-teal-700 hover:bg-teal-800 text-white px-5 py-2 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#b12a2a] hover:bg-red-800 text-white px-5 py-2 rounded-lg transition-colors"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

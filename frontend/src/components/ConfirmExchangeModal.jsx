import React from "react";

const ConfirmExchangeModal = ({ visible, onClose, onConfirm, courseA, courseB }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-3xl p-12 sm:p-16 rounded-3xl shadow-xl border-4 border-teal-800 text-teal-900">
        <h2 className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-8 text-center">
          Confirmación Para Aprobar<br className="hidden sm:block" /> Intercambio de Curso
        </h2>
        <p className="text-lg sm:text-2xl mb-6 sm:mb-10 text-center">
          Estas por aprobar el intercambio de los cursos seleccionados:
        </p>
        <div className="text-center text-xl sm:text-2xl font-semibold text-teal-700 mb-8">
          <p>{courseA}</p>
          <p>{courseB}</p>
        </div>
        <div className="flex justify-center gap-10 sm:gap-20 text-lg sm:text-xl">
          <button
            onClick={onClose}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-md"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmExchangeModal;
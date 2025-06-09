// src/components/ConfirmDeleteModal.jsx
import React from "react";

const ConfirmDeleteModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 border-1">
      <div className="bg-white w-full max-w-3xl p-16 rounded-3xl shadow-xl border-4 border-teal-800 text-teal-900">
        <h2 className="text-5xl font-bold mb-8 text-center">Confirmacion para borrar<br></br> oferta de curso</h2>
        <p className="text-2xl mb-10 text-center">Estas por borrar tu oferta del curso,<br></br> necesitas confirmar la acción.</p>
        <div className="flex justify-center gap-20 text-xl">
          <button
            onClick={onCancel}
            className=" bg-teal-600 hover:bg-teal-700 text-white px-7 py-2 rounded-md"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white hover:bg-red-700 px-7 py-2 rounded-md"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;

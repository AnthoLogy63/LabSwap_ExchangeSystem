import React, { useState } from 'react';
import ConfirmModal from '../../components/ConfirmModal';

const ConfirmSwapAlert = () => {
  const [showModal, setShowModal] = useState(false);

  const handleConfirmSwap = () => {
    // Aquí va la lógica para confirmar el intercambio
    console.log('Intercambio confirmado.');
    setShowModal(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">¿Deseas confirmar este intercambio?</h1>

      <button
        onClick={() => setShowModal(true)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Confirmar Intercambio
      </button>

      {showModal && (
        <ConfirmModal
          message="¿Estás seguro de confirmar este intercambio de cursos?"
          onConfirm={handleConfirmSwap}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ConfirmSwapAlert;

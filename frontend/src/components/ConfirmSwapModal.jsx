import React from "react";

const ConfirmSwapModal = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-3xl rounded-lg p-8 border-4 border-teal-700 shadow-xl relative overflow-y-auto max-h-[90vh]">
        <h2 className="text-3xl font-bold text-center text-teal-900 mb-6">
          Confirmación de intercambio
        </h2>

        <div className="text-lg space-y-4">
          <div>
            <span className="font-semibold text-teal-800">Intercambiarás cursos con:</span> Jorge Renato Quispe Huallpa
          </div>
          <div>
            <span className="font-semibold text-teal-800">Estas Ofreciendo (Perderás) el curso de:</span> Programación de Sistemas - Grupo A
          </div>
          <div>
            <span className="font-semibold text-teal-800">Estas Solicitando (Obtendrás) el curso de:</span> Programación de Sistemas - Grupo B
          </div>
          <p className="text-sm italic text-gray-600 mt-2 text-center">
            Nota: El estado del intercambio de curso se verá en el apartado de “Mis cursos”, es necesaria la verificación del encargado de Laboratorio y el otro Estudiante.
          </p>
          <div>
            <h3 className="font-semibold text-teal-800">Términos y Condiciones:</h3>
            <p className="text-sm text-gray-700">
              Cualquier intento de falsificación, alteración de información o acción que vulnere la integridad del sistema de intercambio será sancionado conforme a las disposiciones y medidas disciplinarias determinadas por las autoridades institucionales de la Universidad Nacional de San Agustín (UNSA).
              <br /><br />
              El uso de este sistema implica el compromiso de actuar con responsabilidad y veracidad en todo momento. Cada estudiante acepta los términos al continuar.
            </p>
          </div>
          <div className="mt-4">
            <label className="font-semibold">Subir DNI:</label>
            <input type="file" className="ml-2 text-sm" />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
            onClick={onConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSwapModal;

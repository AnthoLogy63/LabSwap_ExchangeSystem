import React, { useState } from "react";

const ConfirmSwapModal = ({ onClose, onConfirm, exchange, student2Name }) => {
  const [dniFile, setDniFile] = useState(null);
  const [fileError, setFileError] = useState("");

  // Para mostrar nombre de estudiantes/cursos dinámico
  const otherStudent =
    student2Name ||
    (exchange?.student1?.studentName ?? "Otro estudiante");
  const offer =
    exchange?.offeredCourseGroup
      ? `${exchange.offeredCourseGroup.course.courseName} - ${exchange.offeredCourseGroup.groupName}`
      : "—";
  const need =
    exchange?.desiredCourseGroup
      ? `${exchange.desiredCourseGroup.course.courseName} - ${exchange.desiredCourseGroup.groupName}`
      : "—";

  const handleFileChange = (e) => {
    setFileError("");
    setDniFile(e.target.files[0] || null);
  };

  const handleConfirmClick = () => {
    if (!dniFile) {
      setFileError("Debes subir el archivo de tu DNI para continuar.");
      return;
    }
    onConfirm(dniFile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-3xl rounded-3xl p-8 border-4 border-teal-700 shadow-xl relative overflow-y-auto max-h-[90vh]">
        <h2 className="text-3xl font-bold text-center text-teal-900 mb-6">
          Confirmación de intercambio
        </h2>

        <div className="text-lg space-y-4">
          <div>
            <span className="font-semibold text-teal-800">Intercambiarás cursos con:</span>{" "}
            {otherStudent}
          </div>
          <div>
            <span className="font-semibold text-teal-800">Estas Ofreciendo (Perderás) el curso de:</span>{" "}
            {offer}
          </div>
          <div>
            <span className="font-semibold text-teal-800">Estas Solicitando (Obtendrás) el curso de:</span>{" "}
            {need}
          </div>
          <p className="text-sm italic text-gray-600 mt-2 text-center">
            Nota: El estado del intercambio de curso se verá en el apartado de “Mis intercambios”,<br />
            es necesaria la verificación del encargado de Laboratorio y el otro Estudiante.
          </p>
          <div>
            <h3 className="font-semibold text-teal-800">Términos y Condiciones:</h3>
            <p className="text-sm text-gray-700">
              Cualquier intento de falsificación, alteración de información o acción que vulnere la integridad del sistema de intercambio será sancionado conforme a las disposiciones y medidas disciplinarias determinadas por las autoridades institucionales de la Universidad Nacional de San Agustín (UNSA).
              <br /><br />
              El uso de este sistema implica el compromiso de actuar con responsabilidad y veracidad en todo momento. Cada estudiante acepta los términos al continuar.
            </p>
          </div>
          <div className="mt-8 ">
            <label className="font-semibold text-teal-800">Subir DNI:</label>
            <input
              type="file"
              className="ml-2 text-sm"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
            />
            {dniFile && (
              <span className="ml-3 text-green-700 text-sm">
                Archivo seleccionado: {dniFile.name}
              </span>
            )}
            {fileError && (
              <div className="text-red-600 text-sm mt-1">{fileError}</div>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-10 mt-8">
          <button
            className="px-4 py-2 rounded-md bg-teal-600 hover:bg-teal-700 text-white"
            onClick={onClose}
            type="button"
          >
            Cancelar
          </button>
          <button
            className={`px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 ${
              !dniFile ? "opacity-60 cursor-not-allowed" : ""
            }`}
            onClick={handleConfirmClick}
            disabled={!dniFile}
            type="button"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSwapModal;

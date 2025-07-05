import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminHistoryPanel = () => {
  const [history, setHistory] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/exchanges")
      .then((res) => {
        const confirmed = res.data.filter(e =>
          e.adminConfirmation?.confirmationStatus === 1 ||
          e.adminConfirmation?.confirmationStatus === 2
        );
        setHistory(confirmed);
      })
      .catch(console.error);
  }, []);

  const generarPDFBlob = (entry) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Detalles del Intercambio', 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [['Rol', 'Curso', 'Grupo', 'Alumno', 'Correo']],
      body: [
        ['Ofrece',
          entry.offeredCourseGroup.course.courseName,
          entry.offeredCourseGroup.groupName,
          entry.student1.studentName,
          entry.student1.studentEmail],
        ['Desea',
          entry.desiredCourseGroup.course.courseName,
          entry.desiredCourseGroup.groupName,
          entry.student2.studentName,
          entry.student2.studentEmail],
      ],
    });

    const estado = entry.adminConfirmation?.confirmationStatus === 1 ? 'ACEPTADO' : 'RECHAZADO';
    doc.text(`Estado del Intercambio: ${estado}`, 14, doc.lastAutoTable.finalY + 10);

    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
    setModalOpen(true);
  };

  return (
    <div className="px-[20px] sm:px-[60px] py-[40px] pb-[100px] bg-white min-h-screen overflow-y-auto h-screen">
      <h1 className="text-4xl sm:text-6xl font-bold text-[#08484F] mb-8">Historial</h1>

      {history.map((entry) => (
        <div key={entry.exchangeCode} className="flex flex-col md:flex-row justify-between items-center bg-[#e9fbff] rounded-2xl px-4 sm:px-8 py-6 mb-6">
          <div className="flex flex-col md:flex-row w-full md:w-[60%]">
            <div className="md:w-1/2 border-b md:border-b-0 md:border-r border-black pb-4 md:pb-0 pr-0 md:pr-6 mb-4 md:mb-0">
              <p className="text-xl sm:text-2xl font-semibold text-[#08484F] mb-4 break-words">
                {entry.offeredCourseGroup.course.courseName}<br />
                Grupo {entry.offeredCourseGroup.groupName}
              </p>
              <p className="text-base sm:text-lg break-words">
                <span className="font-bold">Alumno:</span> {entry.student1.studentName}
              </p>
              <p className="text-base sm:text-lg break-words">
                <span className="font-bold">Correo:</span> {entry.student1.studentEmail}
              </p>
            </div>

            <div className="md:w-1/2 md:pl-6">
              <p className="text-xl sm:text-2xl font-semibold text-[#b12a2a] mb-4 break-words">
                {entry.desiredCourseGroup.course.courseName}<br />
                Grupo {entry.desiredCourseGroup.groupName}
              </p>
              <p className="text-base sm:text-lg break-words">
                <span className="font-bold">Alumno:</span> {entry.student2.studentName}
              </p>
              <p className="text-base sm:text-lg break-words">
                <span className="font-bold">Correo:</span> {entry.student2.studentEmail}
              </p>
            </div>
          </div>

          <div className="w-full md:w-[15%] mt-4 md:mt-0 flex justify-center md:justify-end">
            <button
              onClick={() => generarPDFBlob(entry)}
              className="w-full md:w-auto bg-[#1db4c4] text-white px-8 py-2 font-medium text-lg sm:text-xl rounded-xl hover:bg-[#168d9b] transition"
            >
              Revisar Datos
            </button>
          </div>

          <div className="w-full md:w-[15%] mt-4 md:mt-0 flex justify-center md:justify-end">
            <p className="text-2xl sm:text-4xl text-center mt-1">
              <span className="font-bold">Estado:<br /></span>
              <span
                className={entry.adminConfirmation?.confirmationStatus === 1
                  ? "text-[#1db4c4] font-semibold"
                  : "text-[#b12a2a] font-semibold"}>
                {entry.adminConfirmation?.confirmationStatus === 1 ? "ACEPTADO" : "RECHAZADO"}
              </span>
            </p>
          </div>
        </div>
      ))}

      {/* Modal del PDF */}
      {modalOpen && pdfUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[80%] h-[90%] relative p-5 shadow-lg">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-0 right-1.5 text-red-500 font-bold text-xl hover:text-red-700"
            >
              ✕
            </button>
            <iframe
              src={pdfUrl}
              title="PDF del Intercambio"
              className="w-full h-full border rounded-md"
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminHistoryPanel;

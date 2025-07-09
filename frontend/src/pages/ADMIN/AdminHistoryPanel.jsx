import jsPDF from 'jspdf';
import { PDFDocument } from 'pdf-lib'; // <--- Agrega esto
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

  const generarPDFBlob = async (entry) => {
    const doc = new jsPDF();

    // Título en dos líneas
    doc.setFont(undefined, 'bold');
    doc.setFontSize(35);
    doc.setTextColor(13, 84, 79); // Verde oscuro
    doc.text('Información del', 105, 25, { align: 'center' });
    doc.text('intercambio', 105, 40, { align: 'center' }); // Segunda línea, un poco más abajo

    // Subtítulo
    doc.setTextColor(13, 84, 79);
    doc.setFontSize(16);
    doc.text('Datos del Intercambio:', 20, 55);

    // Info principal
    doc.setFontSize(13);
    let y = 67;
    const lineSpacing = 10;
    doc.setFont(undefined, 'normal');

    
    doc.setTextColor(13, 84, 79);
    doc.text('Estudiante que ofrece el curso:', 20, y);
    doc.setTextColor(0, 0, 0);
    doc.text(`${entry.student1.studentName} (${entry.student1.studentEmail})`, 90, y);

    y += lineSpacing;
    doc.setTextColor(13, 84, 79);
    doc.text('Estudiante que recibe el curso:', 20, y);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');
    doc.text(`${entry.student2.studentName} (${entry.student2.studentEmail})`, 90, y);

    y += lineSpacing;
    doc.setTextColor(13, 84, 79);
    doc.text('Curso ofrecido:', 20, y);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');
    doc.text(`${entry.offeredCourseGroup.course.courseName} - Grupo ${entry.offeredCourseGroup.groupName}`, 57, y);

    y += lineSpacing;
    doc.setTextColor(13, 84, 79);
    doc.text('Curso solicitado:', 20, y);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');
    doc.text(`${entry.desiredCourseGroup.course.courseName} - Grupo ${entry.desiredCourseGroup.groupName}`, 60, y);

    y += lineSpacing;
    y += lineSpacing;
    y += lineSpacing;
    y += lineSpacing;
    doc.setFont(undefined, 'bold');
    doc.setTextColor(13, 84, 79);
    doc.text('Estado del intercambio:', 20, y);
    doc.setTextColor(0, 0, 0);
    const estado = entry.adminConfirmation?.confirmationStatus === 1 ? 'ACEPTADO' : 'RECHAZADO';
    doc.text(estado, 75, y);

    // Guardar el PDF generado como ArrayBuffer
    const mainPdfBytes = doc.output('arraybuffer');

    // --- INICIO: Insertar PDF del DNI ---
    let finalPdfBytes = mainPdfBytes;

    // Busca el código de confirmación del estudiante 2
    const studentConfirmationCode = entry.studentConfirmation2?.studentConfirmationCode;
    if (studentConfirmationCode) {
      try {
        // 1. Pide los metadatos del documento
        const metaRes = await fetch(`http://localhost:8080/confirmation-documents/by-confirmation/${studentConfirmationCode}`);
        if (metaRes.ok) {
          const meta = await metaRes.json();
          // 2. Obtén el filePath
          const filePath = meta.filePath;
          if (filePath) {
            // 3. Descarga el PDF real
            const dniRes = await fetch(filePath);
            if (dniRes.ok) {
              const dniPdfBytes = await dniRes.arrayBuffer();

              // 4. Fusiona ambos PDFs usando pdf-lib
              const mainPdfDoc = await PDFDocument.load(mainPdfBytes);
              const dniPdfDoc = await PDFDocument.load(dniPdfBytes);

              const dniPages = await mainPdfDoc.copyPages(dniPdfDoc, dniPdfDoc.getPageIndices());
              dniPages.forEach((page) => mainPdfDoc.addPage(page));

              finalPdfBytes = await mainPdfDoc.save();
            }
          }
        }
      } catch (e) {
        // Si falla, solo muestra el PDF principal
        console.error("No se pudo adjuntar el PDF del DNI:", e);
      }
    }
    // --- FIN: Insertar PDF del DNI ---

    // Mostrar el PDF final
    const blob = new Blob([finalPdfBytes], { type: "application/pdf" });
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
              {entry.student2 ? (
                <>
                  <p className="text-base sm:text-lg break-words">
                    <span className="font-bold">Alumno:</span> {entry.student2.studentName}
                  </p>
                  <p className="text-base sm:text-lg break-words">
                    <span className="font-bold">Correo:</span> {entry.student2.studentEmail}
                  </p>
                </>
              ) : (
                <p className="text-base sm:text-lg text-gray-400 italic">
                  Alumno aún no asignado
                </p>
              )}
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

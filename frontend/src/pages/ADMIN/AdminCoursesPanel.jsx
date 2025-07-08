import React, { useEffect, useState } from "react";
import ConfirmExchangeModal from "../../components/ConfirmExchangeModal";
import RejectExchangeModal from "../../components/RejectExchangeModal";
import CustomAlert from "../../components/CustomAlert";
import jsPDF from "jspdf";

const AdminCoursesPanel = () => {
  const [exchanges, setExchanges] = useState([]);
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [alert, setAlert] = useState({ visible: false, message: '', type: 'success' });

  const [pdfUrl, setPdfUrl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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

      setAlert({ visible: true, message: `Intercambio ${status.toLowerCase()} correctamente`, type: 'success' });
      setExchanges((prev) => prev.filter((e) => e.exchangeCode !== exchangeCode));
    } catch (err) {
      console.error("Error al actualizar:", err);
      setAlert({ visible: true, message: "Error al actualizar el estado del intercambio", type: 'error' });
    }
  };

  const generarPDFBlob = (exchange) => {
    const doc = new jsPDF();

    doc.setFont(undefined, 'bold');
    doc.setFontSize(35);
    doc.setTextColor(13, 84, 79);
    doc.text('Información del', 105, 25, { align: 'center' });
    doc.text('intercambio', 105, 40, { align: 'center' });

    doc.setFontSize(16);
    doc.setTextColor(13, 84, 79);
    doc.text('Datos del Intercambio:', 20, 55);

    doc.setFontSize(13);
    let y = 67;
    const lineSpacing = 10;
    doc.setFont(undefined, 'normal');

    doc.setTextColor(13, 84, 79);
    doc.text('Estudiante que ofrece el curso:', 20, y);
    doc.setTextColor(0, 0, 0);
    doc.text(`${exchange.offeringStudentName} (${exchange.offeringStudentEmail})`, 90, y);

    y += lineSpacing;
    doc.setTextColor(13, 84, 79);
    doc.text('Estudiante que recibe el curso:', 20, y);
    doc.setTextColor(0, 0, 0);
    doc.text(`${exchange.receivingStudentName} (${exchange.receivingStudentEmail})`, 90, y);

    y += lineSpacing;
    doc.setTextColor(13, 84, 79);
    doc.text('Curso ofrecido:', 20, y);
    doc.setTextColor(0, 0, 0);
    doc.text(`${exchange.offeredCourseName}`, 57, y);

    y += lineSpacing;
    doc.setTextColor(13, 84, 79);
    doc.text('Curso solicitado:', 20, y);
    doc.setTextColor(0, 0, 0);
    doc.text(`${exchange.desiredCourseName}`, 60, y);

    y += lineSpacing * 4;
    doc.setFont(undefined, 'bold');
    doc.setTextColor(13, 84, 79);
    doc.text('Estado del intercambio:', 20, y);
    doc.setTextColor(0, 0, 0);
    doc.text('PENDIENTE', 75, y);

    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
    setModalOpen(true);
  };

  return (
    <div className="h-screen overflow-y-auto px-4 sm:px-8 md:px-[60px] py-[40px] bg-white scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      <h1 className="text-4xl md:text-6xl font-bold text-[#08484F] mb-8 text-center sm:text-left">
        Intercambios Pendientes
      </h1>

      {alert.visible && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, visible: false })}
        />
      )}

      {exchanges.length === 0 ? (
        <p className="text-gray-600 text-center">No hay intercambios pendientes.</p>
      ) : (
        exchanges.map((exchange, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between items-center bg-[#e9fbff] rounded-2xl px-4 sm:px-6 md:px-8 py-6 mb-6 shadow-sm gap-6"
          >
            <div className="flex flex-col md:flex-row w-full md:w-[60%] gap-4">
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

            <div className="flex flex-col md:flex-row w-full md:w-[30%] gap-2 justify-center items-center mt-4 md:mt-0">
              <button
                className="bg-[#1db4c4] text-white px-6 py-2 text-base md:text-lg rounded-xl hover:bg-[#168d9b] transition w-full md:w-auto"
                onClick={() => generarPDFBlob(exchange)}
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

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

const courses = [
  "Investigación de Operaciones",
  "Programación de Sistemas",
  "Estructura de Datos",
  "Fundamentos de la Programación 1",
  "Sistemas Operativos",
  "Métodos Numéricos",
  "Programación Web",
  "Organización y Métodos"
];

const groups = ["A", "B", "C", "D", "E", "F", "G", "Z"];

const statusMessages = {
    confirmation_required: "Es necesaria tu confirmación para el intercambio",
    waiting_acceptance: "Es necesario que alguien acepte tu intercambio.",
    under_review: "En revisión para el encargado de Laboratorio."
};

const EditStudentCourses = () => {
    // Estado para la lista de cursos ofrecidos
    const [studentCourses, setStudentCourses] = useState([
      {
        id: 1,
        offerCourse: "Investigación de Operaciones",
        offerGroup: "C",
        needCourse: "Investigación de Operaciones",
        needGroup: "A",
        status: "confirmation_required",
      },
      {
        id: 2,
        offerCourse: "Investigación de Operaciones",
        offerGroup: "C",
        needCourse: "Investigación de Operaciones",
        needGroup: "A",
        status: "waiting_acceptance",
      },
      {
        id: 3,
        offerCourse: "Investigación de Operaciones",
        offerGroup: "C",
        needCourse: "Investigación de Operaciones",
        needGroup: "A",
        status: "under_review",
      },
    ]);

    // Estados para el formulario
    const [offerCourse, setOfferCourse] = useState(courses[0]);
    const [offerGroup, setOfferGroup] = useState(groups[0]);
    const [needCourse, setNeedCourse] = useState(courses[0]);
    const [needGroup, setNeedGroup] = useState(groups[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);


    // Handler para eliminar un curso ofrecido
    const handleDelete = (id) => {
      setStudentCourses(studentCourses.filter((c) => c.id !== id));
    };

    // Handler para confirmar intercambio (simulación de cambio de estado)
    const handleConfirm = (id) => {
      setStudentCourses(
        studentCourses.map((c) =>
          c.id === id ? { ...c, status: "waiting_acceptance" } : c
        )
      );
    };

    // Handler para guardar nuevo curso ofrecido
    const handleSave = () => {
      const newId =
        studentCourses.length > 0
          ? Math.max(...studentCourses.map((c) => c.id)) + 1
          : 1;

      const newCourse = {
        id: newId,
        offerCourse,
        offerGroup,
        needCourse,
        needGroup,
        status: "confirmation_required",
      };

      setStudentCourses([...studentCourses, newCourse]);
    };

    return (
  <div className="px-8">
    <h1 className="text-5xl font-bold text-[#08484F] mb-6 text-left">Mis cursos ofrecidos</h1>
    <div className="flex gap-10 max-h-[600px] overflow-y-auto">
      
      {/* Lista de cursos ofrecidos */}
      <div className="w-[50%] p-4 rounded-md space-y-6 max-h-[600px] overflow-y-auto">
        {studentCourses.map(
          ({ id, offerCourse, offerGroup, needCourse, needGroup, status }) => (
            <div
              key={id}
              className="bg-[#d9f0f6] rounded-md p-6 relative"
              style={{ minWidth: "400px" }}
            >
              <button
                onClick={() => {
                  setSelectedCourseId(id);
                  setIsModalOpen(true);
                }}
                className="absolute top-3 right-3 bg-[#0e8a99] p-2 rounded-md text-white"
                title="Eliminar curso"
              >
                <Trash2 size={24} />
              </button>
              <div className="flex justify-between border-b border-gray-400 pb-3 mb-3">
                <div>
                  <p className="text-teal-700 font-semibold text-2xl">Ofreces:</p>
                  <p className="text-xl">{`${offerCourse} - ${offerGroup}`}</p>
                </div>
                <div className="border-l border-gray-600 px-8">
                  <p className="text-red-700 font-semibold text-2xl">Necesitas:</p>
                  <p className="text-xl">{`${needCourse} - ${needGroup}`}</p>
                </div>
              </div>
              <p className="text-base">
                <b>Estado: </b>
                {statusMessages[status]}
              </p>
              {status === "confirmation_required" && (
                <button
                  onClick={() => handleConfirm(id)}
                  className="mt-4 bg-red-700 text-white px-6 py-2 rounded-md text-lg"
                >
                  Confirmar Intercambio
                </button>
              )}
            </div>
          )
        )}
      </div>

      {/* Formulario de agregar curso */}
      <div className="w-[50%] flex flex-col gap-6 min-w-[240px] max-w-[320px]">
        <h2 className="text-3xl font-bold text-[#08484F] mb-3">Agregar Curso</h2>

        <div className="flex gap-6">
          <div className="flex flex-col gap-3 flex-1">
            <label className="text-xl font-semibold text-[#08484F]">Lo que ofrecerás</label>
            <select
              className="border border-gray-400 p-3 rounded text-lg"
              value={offerCourse}
              onChange={(e) => setOfferCourse(e.target.value)}
            >
              {courses.map((course, idx) => (
                <option key={idx} value={course}>
                  {course}
                </option>
              ))}
            </select>
            <select
              className="border border-gray-400 p-3 rounded text-lg"
              value={offerGroup}
              onChange={(e) => setOfferGroup(e.target.value)}
            >
              {groups.map((group, idx) => (
                <option key={idx} value={group}>
                  Grupo {group}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <label className="text-xl font-semibold text-[#08484F]">Lo que necesitas</label>
            <select
              className="border border-gray-400 p-3 rounded text-lg"
              value={needCourse}
              onChange={(e) => setNeedCourse(e.target.value)}
            >
              {courses.map((course, idx) => (
                <option key={idx} value={course}>
                  {course}
                </option>
              ))}
            </select>
            <select
              className="border border-gray-400 p-3 rounded text-lg"
              value={needGroup}
              onChange={(e) => setNeedGroup(e.target.value)}
            >
              {groups.map((group, idx) => (
                <option key={idx} value={group}>
                  Grupo {group}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-6 bg-[#b12a2a] text-white px-8 py-3 rounded-md text-xl"
        >
          Guardar Curso
        </button>

        <div className="mt-14">
          <h3 className="text-[#08484F] font-semibold text-xl mb-3">
            Ver Horario de los Diferentes Cursos:
          </h3>
          <p className="text-base mb-4">
            Este horario muestra los cursos de laboratorio por año y nombre.
          </p>
          <button
            onClick={() => window.open('https://docs.google.com/spreadsheets/d/1xTh5I9-Sku6mKflHPA82tWTzKQb80P5e/edit?gid=21586119#gid=21586119', '_blank')}
            className="bg-[#b12a2a] text-white px-8 py-3 rounded-md text-xl"
          >
            Abrir Horario Digital
          </button>
        </div>
      </div>
    </div>
    <ConfirmDeleteModal
      isOpen={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      onConfirm={() => {
        handleDelete(selectedCourseId);
        setIsModalOpen(false);
      }}
    />

  </div>
  );
};

export default EditStudentCourses;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

const statusMessages = {
  confirmation_required: "Es necesaria tu confirmación para el intercambio",
  waiting_acceptance: "Es necesario que alguien acepte tu intercambio.",
  under_review: "En revisión para el encargado de Laboratorio."
};

const EditStudentCourses = () => {
  const [studentCourses, setStudentCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [offerCourse, setOfferCourse] = useState("");
  const [offerGroup, setOfferGroup] = useState("");
  const [needGroup, setNeedGroup] = useState("");
  const [availableGroups, setAvailableGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const [errorCurso, setErrorCurso] = useState(false);
  const [errorGrupoActual, setErrorGrupoActual] = useState(false);
  const [errorGrupoDeseado, setErrorGrupoDeseado] = useState(false);
  const [errorGruposIguales, setErrorGruposIguales] = useState(false);

  const isFormInvalid =
    !offerCourse || !offerGroup || !needGroup || offerGroup === needGroup;

  useEffect(() => {
    axios.get("http://localhost:8080/courses")
      .then((res) => {
        const sorted = res.data.sort((a, b) => a.courseName.localeCompare(b.courseName));
        setCourses(sorted);
      })
      .catch((err) => console.error("Error al obtener cursos:", err));
  }, []);

  useEffect(() => {
    if (!offerCourse) {
      setAvailableGroups([]);
      setOfferGroup("");
      setNeedGroup("");
      return;
    }
    const selected = courses.find((c) => c.courseName === offerCourse);
    if (selected) {
      axios.get(`http://localhost:8080/course-groups/groups-by-course/${selected.courseCode}`)
        .then((res) => {
          setAvailableGroups(res.data);
        })
        .catch((err) => console.error("Error al obtener grupos:", err));
    }
  }, [offerCourse, courses]);

  const handleDelete = (id) => {
    setStudentCourses(studentCourses.filter((c) => c.id !== id));
  };

  const handleConfirm = (id) => {
    setStudentCourses(
      studentCourses.map((c) =>
        c.id === id ? { ...c, status: "waiting_acceptance" } : c
      )
    );
  };

  const handleSave = () => {
    const newId = studentCourses.length > 0 ? Math.max(...studentCourses.map(c => c.id)) + 1 : 1;

    const newCourse = {
      id: newId,
      offerCourse,
      offerGroup,
      needCourse: offerCourse,
      needGroup,
      status: "confirmation_required"
    };

    setStudentCourses([...studentCourses, newCourse]);
    setOfferCourse("");
    setOfferGroup("");
    setNeedGroup("");
    setAvailableGroups([]);
    setErrorCurso(false);
    setErrorGrupoActual(false);
    setErrorGrupoDeseado(false);
    setErrorGruposIguales(false);
  };

  const validateForm = () => {
    setErrorCurso(!offerCourse);
    setErrorGrupoActual(!offerGroup);
    setErrorGrupoDeseado(!needGroup);
    setErrorGruposIguales(offerGroup && needGroup && offerGroup === needGroup);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 overflow-x-hidden">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#08484F] mb-6">
        Mis intercambios ofrecidos
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-[50%] p-4 rounded-md space-y-6 max-h-[600px] overflow-y-auto pr-4 lg:pr-8">
          {studentCourses.map(({ id, offerCourse, offerGroup, needGroup, status }) => (
            <div key={id} className="bg-[#d9f0f6] rounded-md p-6 relative">
              <button
                onClick={() => {
                  setSelectedCourseId(id);
                  setIsModalOpen(true);
                }}
                className="absolute top-3 right-3 bg-[#0e8a99] p-2 rounded-md text-white"
                title="Eliminar intercambio"
              >
                <Trash2 size={24} />
              </button>

              <div className="flex flex-col sm:flex-row justify-between border-b border-gray-400 pb-3 mb-3 gap-4">
                <div className="flex-1">
                  <p className="text-teal-700 font-semibold text-2xl">Ofreces:</p>
                  <p className="text-xl">{`${offerCourse} - ${offerGroup}`}</p>
                </div>
                <div className="sm:border-l sm:border-gray-600 sm:px-8 flex-1">
                  <p className="text-red-700 font-semibold text-2xl">Necesitas:</p>
                  <p className="text-xl">{`${offerCourse} - ${needGroup}`}</p>
                </div>
              </div>

              <p className="text-base"><b>Estado: </b>{statusMessages[status]}</p>

              {status === "confirmation_required" && (
                <button
                  onClick={() => handleConfirm(id)}
                  className="mt-4 bg-red-700 text-white px-6 py-2 rounded-md text-lg"
                >
                  Confirmar Intercambio
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="w-full lg:w-[50%] flex flex-col gap-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#08484F]">Agregar Intercambio</h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-3 flex-1">
              <label className="text-lg font-semibold text-[#08484F]">Curso de laboratorio</label>
              <select
                className="border border-gray-400 p-2 rounded text-xl"
                value={offerCourse}
                onChange={(e) => setOfferCourse(e.target.value)}
                onBlur={validateForm}
              >
                <option value="">-- Selecciona un curso --</option>
                {courses.map((course) => (
                  <option key={course.courseCode} value={course.courseName}>
                    {course.courseName}
                  </option>
                ))}
              </select>
              {errorCurso && <p className="text-red-600 text-sm font-medium">Debes seleccionar un curso.</p>}

              <label className="text-lg font-semibold text-[#08484F]">Tu grupo actual</label>
              <select
                className="border border-gray-400 p-2 rounded text-xl"
                value={offerGroup}
                onChange={(e) => setOfferGroup(e.target.value)}
                onBlur={validateForm}
                disabled={!availableGroups.length}
              >
                <option value="">-- Selecciona tu grupo --</option>
                {availableGroups.map((g, i) => (
                  <option key={i} value={g}>{`Grupo ${g}`}</option>
                ))}
              </select>
              {errorGrupoActual && <p className="text-red-600 text-sm font-medium">Debes seleccionar tu grupo actual.</p>}

              <label className="text-lg font-semibold text-[#08484F]">Grupo que deseas</label>
              <select
                className="border border-gray-400 p-2 rounded text-xl"
                value={needGroup}
                onChange={(e) => setNeedGroup(e.target.value)}
                onBlur={validateForm}
                disabled={!availableGroups.length}
              >
                <option value="">-- Selecciona grupo deseado --</option>
                {availableGroups.map((g, i) => (
                  <option key={i} value={g}>{`Grupo ${g}`}</option>
                ))}
              </select>
              {errorGrupoDeseado && <p className="text-red-600 text-sm font-medium">Debes seleccionar un grupo al que deseas cambiarte.</p>}
              {errorGruposIguales && <p className="text-red-600 text-sm font-medium">No puedes seleccionar el mismo grupo para intercambiar.</p>}
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={isFormInvalid}
            onMouseEnter={validateForm}
            className={`mt-1 px-8 py-3 rounded-md text-xl w-full sm:w-auto self-start ${isFormInvalid ? "bg-gray-400 text-white cursor-not-allowed" : "bg-[#b12a2a] text-white hover:bg-[#911f1f]"}`}
          >
            Guardar Intercambio
          </button>

          <div className="mt-10">
            <h3 className="text-[#08484F] font-semibold text-lg mb-2">
              Consulta los Horarios de Laboratorio:
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              Revisa aquí los horarios actuales de los cursos de laboratorio, organizados por año y grupo.
            </p>
            <button
              onClick={() =>
                window.open(
                  "https://docs.google.com/spreadsheets/d/1xTh5I9-Sku6mKflHPA82tWTzKQb80P5e/edit?gid=21586119#gid=21586119",
                  "_blank"
                )
              }
              className="bg-[#b12a2a] text-white px-8 py-3 rounded-md text-lg"
            >
              Ver Horarios en Google Sheets
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
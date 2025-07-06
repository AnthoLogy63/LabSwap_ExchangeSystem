import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserCircle2, RefreshCcw } from 'lucide-react';
import { useAuth } from "../../context/AuthContext";

const yearOptions = [
  "Todos los años",
  "Primer Año",
  "Segundo Año",
  "Tercer Año",
  "Cuarto Año",
  "Quinto Año",
];

const groupOptions = [
  "Todos los grupos",
  "Grupo A",
  "Grupo B",
  "Grupo C",
  "Grupo D",
  "Grupo E",
  "Grupo F",
  "Grupo G",
  "Grupo H"
];

const ExchangeCard = ({ exchangeCode, name, offer, need }) => (
  <div className="border-[1.5px] border-[#08484F] rounded-md px-4 py-4 shadow-sm bg-white">
    <div className="flex items-center gap-4 mb-4">
      <div className="bg-[#761A11] p-1 rounded-full shrink-0">
        <UserCircle2 className="text-white w-8 h-8" />
      </div>
      <h3 className="text-lg sm:text-xl md:text-2xl">{name}</h3>
    </div>

    <div className="flex flex-col sm:flex-row items-start justify-between border-y border-gray-300 py-3 mb-4 text-base sm:text-lg">
      <div className="w-full sm:w-1/2 sm:pr-2 sm:pl-2 mb-4 sm:mb-0">
        <p className="text-xl text-[#2e8ba5] font-semibold">Ofrezco:</p>
        <p>{offer}</p>
      </div>

      <div className="hidden sm:block w-[2px] bg-gray-600 self-stretch mx-2"></div>

      <div className="w-full sm:w-1/2 sm:pl-6">
        <p className="text-xl text-[#b12a2a] font-semibold">Necesito:</p>
        <p>{need}</p>
      </div>
    </div>

    <div className="flex justify-end">
      <Link to={`/intercambio/${exchangeCode}`}>
        <button className="text-base bg-[#b12a2a] text-white px-4 py-2 rounded-xl">
          Contactar
        </button>
      </Link>
    </div>
  </div>
);

const CourseFilters = () => {
  const { user } = useAuth();
  const [courseNameFilter, setCourseNameFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("Todos los años");
  const [groupFilter, setGroupFilter] = useState("Todos los grupos");
  const [exchanges, setExchanges] = useState([]);

  const fetchExchanges = () => {
    axios
      .get("http://localhost:8080/exchanges")
      .then((res) => setExchanges(res.data))
      .catch((err) => console.error("Error al obtener intercambios:", err));
  };

  useEffect(() => {
    fetchExchanges();
  }, []);

  const filteredExchanges = exchanges.filter((ex) => {
    if (!ex.student1 || ex.student1.studentCode === user?.studentCode) return false;

    const offerCourse = ex.offeredCourseGroup?.course?.courseName?.toLowerCase() || "";
    const offerGroup = ex.offeredCourseGroup?.groupName || "";
    const courseYear = ex.offeredCourseGroup?.course?.courseYear || "";

    const nameMatch = offerCourse.includes(courseNameFilter.toLowerCase());
    const yearMatch =
      yearFilter === "Todos los años" ||
      (yearFilter.includes("Primer") && courseYear === 1) ||
      (yearFilter.includes("Segundo") && courseYear === 2) ||
      (yearFilter.includes("Tercer") && courseYear === 3) ||
      (yearFilter.includes("Cuarto") && courseYear === 4) ||
      (yearFilter.includes("Quinto") && courseYear === 5);
    const groupMatch = groupFilter === "Todos los grupos" || offerGroup === groupFilter.split(" ")[1];

    return nameMatch && yearMatch && groupMatch;
  });

  return (
    <div className="px-4 sm:px-8 md:px-12 py-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#08484F] mb-6">
        Lista de intercambios
      </h1>

      <div className="relative border-[1.5px] border-[#08484F] shadow-md px-4 sm:px-6 py-6 mb-10 rounded-md bg-white">
        {/* Botón de actualizar en esquina superior derecha */}
        <button
          onClick={fetchExchanges}
          title="Actualizar lista"
          className="absolute top-4 right-4 hover:bg-[#08484F]/10 transition-colors"
          style={{
            backgroundColor: "transparent",
            color: "#08484F",
            border: "none"
          }}
        >
          <RefreshCcw size={22} strokeWidth={2.5} />
        </button>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col w-full">
            <label className="text-xl sm:text-2xl font-semibold mb-2 text-black">Filtros</label>
            <input
              type="text"
              placeholder="Buscar por nombre del curso"
              className="w-full text-base sm:text-xl border-b-2 border-gray-500 placeholder-gray-400 focus:outline-none focus:border-[#08484F] py-1 bg-transparent"
              value={courseNameFilter}
              onChange={(e) => setCourseNameFilter(e.target.value)}
            />
          </div>

          <div className="flex flex-col w-full sm:w-1/2 lg:w-1/4">
            <label className="text-lg sm:text-xl text-black mb-2">Por año:</label>
            <select
              className="text-left text-base sm:text-lg border border-gray-400 rounded-md px-4 py-2 bg-transparent"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              {yearOptions.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col w-full sm:w-1/2 lg:w-1/4">
            <label className="text-lg sm:text-xl text-black mb-2">Por grupo:</label>
            <select
              className="text-left text-base sm:text-lg border border-gray-400 rounded-md px-4 py-2 bg-transparent"
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value)}
            >
              {groupOptions.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-[#08484F] mb-4">Resultados</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[550px] overflow-y-auto custom-scrollbar pr-1">
        {filteredExchanges.length > 0 ? (
          filteredExchanges.map((ex, idx) => (
            <ExchangeCard
              key={ex.exchangeCode || idx}
              exchangeCode={ex.exchangeCode}
              name={ex.student1.studentName}
              offer={`${ex.offeredCourseGroup.course.courseName} - ${ex.offeredCourseGroup.groupName}`}
              need={`${ex.desiredCourseGroup.course.courseName} - ${ex.desiredCourseGroup.groupName}`}
            />
          ))
        ) : (
          <p className="text-gray-500 text-xl col-span-3">
            No se encontraron intercambios.
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseFilters;

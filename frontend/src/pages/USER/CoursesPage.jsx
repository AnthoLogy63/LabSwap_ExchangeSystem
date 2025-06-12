import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
];

const ExchangeCard = ({ name, offer, need }) => (
    <div className="border-[1.5px] border-[#08484F] rounded-md px-4 py-4 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 bg-[#a02828] rounded-full flex items-center justify-center text-white text-xl">
            👤
        </div>
        <h3 className="text-2xl">{name}</h3>
        </div>
        <div className="flex items-start justify-between border-y border-gray-300 py-3 mb-4 text-lg">
        <div className="w-1/2 pr-2 pl-2">
            <p className="text-2xl text-[#2e8ba5] font-semibold">Ofrezco:</p>
            <p className="text-xl">{offer}</p>
        </div>

        <div className="w-[3px] bg-gray-600 self-stretch"></div>

        <div className="w-1/2 pl-6">
            <p className="text-2xl text-[#b12a2a] font-semibold">Necesito:</p>
            <p className="text-xl">{need}</p>
        </div>
        </div>
        <div className="flex justify-end">
        <Link to="/intercambio">
            <button className="text-xl bg-[#b12a2a] text-white text-sm px-4 py-1 rounded-xl">
            Contactar
            </button>
        </Link>
        </div>
    </div>
);

const CourseFilters = () => {
    const [courseNameFilter, setCourseNameFilter] = useState("");
    const [yearFilter, setYearFilter] = useState("Todos los años");
    const [groupFilter, setGroupFilter] = useState("Todos los grupos");
    const [exchanges, setExchanges] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/exchanges")
        .then((res) => {
            setExchanges(res.data);
        })
        .catch((err) => {
            console.error("Error al obtener intercambios:", err);
        });
    }, []);

    const filteredExchanges = exchanges.filter((ex) => {
        const name = ex.student1?.studentName?.toLowerCase() || "";
        const offerCourse = ex.offeredCourseGroup?.course?.courseName?.toLowerCase() || "";
        const offerGroup = ex.offeredCourseGroup?.groupName || "";
        const courseYear = ex.offeredCourseGroup?.course?.courseYear || "";

        const nameMatch = offerCourse.includes(courseNameFilter.toLowerCase());
        const yearMatch = yearFilter === "Todos los años" || (
        yearFilter.includes("Primer") && courseYear === 1 ||
        yearFilter.includes("Segundo") && courseYear === 2 ||
        yearFilter.includes("Tercer") && courseYear === 3 ||
        yearFilter.includes("Cuarto") && courseYear === 4 ||
        yearFilter.includes("Quinto") && courseYear === 5
        );
        const groupMatch = groupFilter === "Todos los grupos" || offerGroup === groupFilter.split(" ")[1];

        return nameMatch && yearMatch && groupMatch;
    });

    return (
        <div className="px-[40px]">
        <h1 className="text-5xl font-bold text-[#08484F] mb-4">Lista de cursos</h1>

        <div className="border-[1.5px] border-[#08484F] shadow-md px-6 py-4 mb-10">
            <div className="flex items-end gap-10">
            <div className="flex flex-col w-full max-w-[50%] min-w-[250px]">
                <label className="text-3xl font-semibold mb-2 text-black">Filtros</label>
                <input
                type="text"
                placeholder="Buscar por nombre del curso"
                className="input-ph w-full text-2xl border-b-2 border-gray-500 placeholder-gray-400 focus:outline-none focus:border-[#08484F] py-1 bg-transparent"
                value={courseNameFilter}
                onChange={(e) => setCourseNameFilter(e.target.value)}
                />
            </div>

            <div className="flex flex-col min-w-[150px]">
                <label className="text-2xl text-black mb-2 ml-9">Por año:</label>
                <select
                className="text-left text-xl border border-gray-400 rounded-sm ml-9 px-9 py-2 bg-transparent placeholder-gray-400"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                >
                {yearOptions.map((option, idx) => (
                    <option key={idx} value={option}>
                    {option}
                    </option>
                ))}
                </select>
            </div>

            <div className="flex flex-col min-w-[150px]">
                <label className="text-2xl text-black mb-2 ml-5">Por grupo:</label>
                <select
                className="text-left text-xl border border-gray-400 rounded-sm ml-5 px-9 py-2 bg-transparent placeholder-gray-400"
                value={groupFilter}
                onChange={(e) => setGroupFilter(e.target.value)}
                >
                {groupOptions.map((option, idx) => (
                    <option key={idx} value={option}>
                    {option}
                    </option>
                ))}
                </select>
            </div>
            </div>
        </div>

        <h1 className="text-3xl font-bold text-[#08484F] mb-4">Resultados</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[550px] overflow-y-auto custom-scrollbar pr-4">
            {filteredExchanges.length > 0 ? (
            filteredExchanges.map((ex, idx) => (
                <ExchangeCard
                key={ex.exchangeCode || idx}
                name={ex.student1.studentName}
                offer={`${ex.offeredCourseGroup.course.courseName} - ${ex.offeredCourseGroup.groupName}`}
                need={`${ex.desiredCourseGroup.course.courseName} - ${ex.desiredCourseGroup.groupName}`}
                />
            ))
            ) : (
            <p className="text-gray-500 text-xl col-span-3">No se encontraron intercambios.</p>
            )}
        </div>
        </div>
    );
};

export default CourseFilters;
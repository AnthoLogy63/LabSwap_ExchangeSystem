import React from "react";

const yearOptions = [
    "Todos los años",
    "Primer Año",
    "Segundo Año",
    "Tercer Año",
    "Cuarto Año",
    "Quinto Año"
];

const groupOptions = [
    "Todos los grupos",
    "Grupo A",
    "Grupo B",
    "Grupo Z"
];

const CourseFilters = ({
    courseNameFilter,
    setCourseNameFilter,
    yearFilter,
    setYearFilter,
    groupFilter,
    setGroupFilter
}) => {
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
                        className="w-full text-2xl border-b-2 border-gray-500 placeholder-gray-400 focus:outline-none focus:border-[#08484F] py-1 bg-transparent"
                        value={courseNameFilter}
                        onChange={(e) => setCourseNameFilter(e.target.value)}
                    />
                </div>
                
                {/* Por año */}
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

                {/* Por grupo */}
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
        </div>
    );
};

export default CourseFilters;
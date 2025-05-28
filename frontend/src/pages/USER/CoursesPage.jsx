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
        <button className="text-xl bg-[#b12a2a] text-white text-sm px-4 py-1 rounded-xl">Contactar</button>
        </div>
    </div>
);

const sampleExchanges = [
    {
        id: 1,
        name: "José Carlos",
        offer: "Investigación de Operaciones - D",
        need: "Investigación de Operaciones - C",
    },
    {
        id: 2,
        name: "Pedro Castillo",
        offer: "Programación de Sistemas - B",
        need: "Programación de Sistemas - A",
    },
    {
        id: 3,
        name: "Manuel Merino",
        offer: "Estructura de Datos y Algoritmos - B",
        need: "Estructura de Datos y Algoritmos - E",
    },
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleExchanges.map(({ id, name, offer, need }) => (
                    <ExchangeCard key={id} name={name} offer={offer} need={need} />
                ))}
            </div>
        </div>
    );
};

export default CourseFilters;
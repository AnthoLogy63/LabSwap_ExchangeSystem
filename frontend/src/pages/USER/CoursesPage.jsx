

const CoursesPage = ({ filtroNombre, setFiltroNombre, filtroYear, setFiltroYear, filtroGrupo, setFiltroGrupo }) => {
    return (
        <div className="flex flex-wrap gap-4 p-4 border border-gray-300 rounded mb-6">
            <input
                type="text"
                placeholder="Buscar por nombre del curso"
                className="border border-gray-400 rounded px-3 py-2 flex-1 min-w-[250px]"
                value={filtroNombre}
                onChange={(e) => setFiltroNombre(e.target.value)}
            />
            <select
                className="border border-gray-400 rounded px-3 py-2"
                value={filtroYear}
                onChange={(e) => setFiltroYear(e.target.value)}
            >
                <option>Todos los años</option>
                <option>Primer Año</option>
                <option>Segundo Año</option>
                <option>Tercer Año</option>
                <option>Cuarto Año</option>
                <option>Quinto Año</option>
            </select>
            <select
                className="border border-gray-400 rounded px-3 py-2"
                value={filtroGrupo}
                onChange={(e) => setFiltroGrupo(e.target.value)}
            >
                <option>Todos los grupos</option>
                <option>Grupo A</option>
                <option>Grupo B</option>
                <option>Grupo Z</option>
            </select>
        </div>
    );
};

export default CoursesPage;
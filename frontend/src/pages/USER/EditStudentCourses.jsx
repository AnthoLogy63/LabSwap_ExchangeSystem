import { useState } from 'react';

function EditStudentCourses() {
  const [ofrecido, setOfrecido] = useState({ curso: '', grupo: '' });
  const [necesitado, setNecesitado] = useState({ curso: '', grupo: '' });

  const handleGuardar = () => {
    // Aquí podrías hacer un POST al backend
    console.log('Curso ofrecido:', ofrecido);
    console.log('Curso necesario:', necesitado);
    // Enviar al backend por fetch o axios si está listo
  };

  return (
    <div className="p-10 flex justify-center">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl">

        <h2 className="text-2xl font-bold mb-6 text-center text-[#124c4c]">Agregar Curso</h2>

        <div className="grid grid-cols-2 gap-6">
          {/* Lo que ofrece */}
          <div>
            <h3 className="font-semibold mb-2 text-[#0f2d2d]">Lo que ofrecerás</h3>
            <select
              value={ofrecido.curso}
              onChange={(e) => setOfrecido({ ...ofrecido, curso: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">Selecciona curso</option>
              <option value="Investigación de Operaciones">Investigación de Operaciones</option>
              <option value="Algoritmos">Algoritmos</option>
              {/* Agrega más opciones */}
            </select>
            <select
              value={ofrecido.grupo}
              onChange={(e) => setOfrecido({ ...ofrecido, grupo: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="">Selecciona grupo</option>
              <option value="A">Grupo A</option>
              <option value="B">Grupo B</option>
              <option value="C">Grupo C</option>
            </select>
          </div>

          {/* Lo que necesita */}
          <div>
            <h3 className="font-semibold mb-2 text-[#0f2d2d]">Lo que necesitas</h3>
            <select
              value={necesitado.curso}
              onChange={(e) => setNecesitado({ ...necesitado, curso: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">Selecciona curso</option>
              <option value="Investigación de Operaciones">Investigación de Operaciones</option>
              <option value="Algoritmos">Algoritmos</option>
              {/* Agrega más opciones */}
            </select>
            <select
              value={necesitado.grupo}
              onChange={(e) => setNecesitado({ ...necesitado, grupo: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="">Selecciona grupo</option>
              <option value="A">Grupo A</option>
              <option value="B">Grupo B</option>
              <option value="C">Grupo C</option>
            </select>
          </div>
        </div>

        {/* Botón */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleGuardar}
            className="bg-red-800 text-white px-6 py-2 rounded hover:bg-red-700 transition"
          >
            Guardar Curso
          </button>
        </div>

      </div>
    </div>
  );
}

export default EditStudentCourses;

const PaginaDeInicio = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-slate-800">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a Lab-Swap</h1>
      <p className="text-lg mb-12">Una página para intercambiar los cursos que necesitas</p>

      <h2 className="text-2xl font-bold mb-6">Solo con 3 pasos:</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { title: "Publica", desc: "Lorem Ipsum es simplemente el texto de relleno..." },
          { title: "Busca", desc: "Lorem Ipsum es simplemente el texto de relleno..." },
          { title: "Cambia", desc: "Lorem Ipsum es simplemente el texto de relleno..." }
        ].map((step, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <img src="https://via.placeholder.com/60" alt={step.title} className="mb-4" />
            <h3 className="font-bold">{step.title}</h3>
            <p className="text-sm text-slate-600 max-w-xs">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaginaDeInicio;

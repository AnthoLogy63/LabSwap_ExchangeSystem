// src/pages/PaginaDeInicio.jsx
import publicaImg from '../../assets/PaginaDeInicio/padoru.jpg';
import buscaImg from '../../assets/PaginaDeInicio/padoru.jpg';
import cambiaImg from '../../assets/PaginaDeInicio/padoru.jpg';

const PaginaDeInicio = () => {
  const pasos = [
    { img: publicaImg, title: "Publica", desc: "Lorem ipsum..." },
    { img: buscaImg, title: "Busca", desc: "Lorem ipsum..." },
    { img: cambiaImg, title: "Cambia", desc: "Lorem ipsum..." },
  ];

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a Lab-Swap</h1>
      <p className="mb-8">Una página para intercambiar los cursos que necesitas</p>

      <h2 className="text-2xl font-bold mb-6">Solo con 3 pasos:</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {pasos.map((paso, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <img src={paso.img} alt={paso.title} className="mb-3 w-16 h-16" />
            <h3 className="font-bold">{paso.title}</h3>
            <p className="text-sm text-slate-600 max-w-xs">{paso.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaginaDeInicio;

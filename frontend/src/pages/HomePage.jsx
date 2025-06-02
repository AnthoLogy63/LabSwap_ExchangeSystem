// src/pages/PaginaDeInicio.jsx
import publicaImg from '../assets/PaginaDeInicio/generic.jpg';
import buscaImg from '../assets/PaginaDeInicio/generic.jpg';
import cambiaImg from '../assets/PaginaDeInicio/generic.jpg';

const HomePage = () => {
  const pasos = [
    { img: publicaImg, title: "Publica", desc: "Sube tu informacion y cupos que puedes intercambiar" },
    { img: buscaImg, title: "Busca", desc: "Mira los cursos en los que estas interesado" },
    { img: cambiaImg, title: "Cambia", desc: "Intercambia cupos con otra persona y consigue el horario que quieres" },
  ];

  return (
    <div className="text-left ml-20">
      <h1 className="text-8xl font-bold mb-8">Bienvenido a <br />Lab-Swap</h1>
      <p className="text-3xl mb-12">Una página para intercambiar los cursos que necesitas</p>

      <h2 className="text-3xl font-bold mb-6">Solo con 3 pasos:</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {pasos.map((paso, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <h3 className="font-bold text-3xl mb-2">{paso.title}</h3>
            <img src={paso.img} alt={paso.title} className="mb-3 w-70" />
            <p className="text-2xl text-slate-600 max-w-xs text-center">{paso.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

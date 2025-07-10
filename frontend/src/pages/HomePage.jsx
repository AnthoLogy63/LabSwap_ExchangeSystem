// src/pages/PaginaDeInicio.jsx
import publicaImg from '../assets/PaginaDeInicio/publica.png';
import buscaImg from '../assets/PaginaDeInicio/busca.png';
import cambiaImg from '../assets/PaginaDeInicio/cambia.png';

const HomePage = () => {
  const pasos = [
    { img: publicaImg, title: "Publica", desc: "Sube tu información y los cupos que puedes intercambiar" },
    { img: buscaImg, title: "Busca", desc: "Mira los cursos en los que estás interesado" },
    { img: cambiaImg, title: "Cambia", desc: "Intercambia cupos con otra persona y consigue el horario que quieres" },
  ];

  return (
    <div className="px-6 md:px-20 py-10">
      <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6">
        Bienvenido a <br />Lab-Swap
      </h1>
      <p className="text-xl md:text-2xl lg:text-3xl mb-10">
        Una página para intercambiar los cursos que necesitas
      </p>

      <h2 className="text-2xl md:text-3xl font-bold mb-6">Solo con 3 pasos:</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {pasos.map((paso, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <h3 className="font-bold text-2xl md:text-3xl mb-2">{paso.title}</h3>
            <img
              src={paso.img}
              alt={paso.title}
              className="mb-3 w-full max-w-[300px] md:max-w-[700px]"
            />
            <p className="text-base md:text-lg lg:text-xl text-slate-600 max-w-xs">
              {paso.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

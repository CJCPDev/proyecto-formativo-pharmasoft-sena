import { useEffect, useState } from "react";

export default function Carousel() {
  const [index, setIndex] = useState(0);

  const slides = [
    {
      title: "Promociones",
      text: "¡Descuentos hasta del 30% en medicamentos esenciales!",
      img: "/images/descuentos.jpg",
      bg: "bg-secondar",
    },
    {
      title: "Asesoría Profesional",
      text: "Tienes una duda?. Preguntanos!!",
      img: "/images/farmaceuta.png",
      bg: "bg-primary",
    },
    {
      title: "Domicilios",
      text: "Recibe tus productos rápido y seguro en casa",
      img: "/images/domicilio.png",
      bg: "bg-secondaryv2",
    },
    {
      title: "Productos",
      text: "Encuentra todo en salud, belleza y cuidado personal",
      img: "/images/products.png",
      bg: "bg-primaryv2",
    },
  ];

  // Este efecto permite hacer el movimiento del slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-dvw h-72 -mx-4 overflow-hidden relative shadow-lg">
      
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`min-w-full h-72 flex items-center justify-center ${slide.bg} text-white`}
          >
            <div className="flex items-center gap-10 px-10">

              {/* enderizado del mapeo de la info del card */}
              <div>
                <h2 className="text-6xl font-bold">{slide.title}</h2>
                <p className="text-lg mt-2">{slide.text}</p>
              </div>

              {/* Renderiza la imagen */}
              <img
                src={slide.img}
                alt={slide.title}
                className="h-50 w-60 object-fill rounded-xl shadow-md"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-3 w-full flex justify-center gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === i ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
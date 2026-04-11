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

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="w-full max-w-full overflow-hidden relative shadow-lg">
      {/* Contenedor del slider */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`min-w-full h-72 sm:h-80 md:h-72 flex items-center justify-center ${slide.bg} text-white overflow-hidden`}
          >
            <div
              className="
                w-full
                max-w-7xl
                flex
                flex-col md:flex-row
                items-center
                justify-center
                gap-4 md:gap-10
                px-4 sm:px-6 md:px-10
                mx-auto
              "
            >
              {/* Texto */}
              <div className="flex-1 min-w-0 text-center md:text-left">
                <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold break-words">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg mt-2 break-words">
                  {slide.text}
                </p>
              </div>

              {/* Imagen */}
              <div className="flex-1 min-w-0 flex justify-center">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="
                    h-28 sm:h-36 md:h-52
                    w-auto
                    max-w-full
                    object-contain
                    rounded-xl
                    shadow-md
                  "
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-3 w-full flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
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

export default function Carousel(){

    return(
        <div className="w-full h-60 overflow-hidden mt-4">

  <div className="flex w-max animate-slide">

    {/* ORIGINAL */}
    <div className="min-w-full h-60 bg-blue-600 flex flex-col items-center justify-center text-white text-4xl font-bold">
      1
      <span className="text-lg">Slide Azul</span>
    </div>

    <div className="min-w-full h-60 bg-green-600 flex flex-col items-center justify-center text-white text-4xl font-bold">
      2
      <span className="text-lg">Slide Verde</span>
    </div>

    <div className="min-w-full h-60 bg-gray-700 flex flex-col items-center justify-center text-white text-4xl font-bold">
      3
      <span className="text-lg">Slide Gris</span>
    </div>

    <div className="min-w-full h-60 bg-red-600 flex flex-col items-center justify-center text-white text-4xl font-bold">
      4
      <span className="text-lg">Slide Rojo</span>
    </div>

    {/* DUPLICADOS */}
    <div className="min-w-full h-60 bg-amber-700 flex flex-col items-center justify-center text-white text-4xl font-bold">
      1
      <span className="text-lg">Slide Azul</span>
    </div>

    <div className="min-w-full h-60 bg-green-600 flex flex-col items-center justify-center text-white text-4xl font-bold">
      2
      <span className="text-lg">Slide Verde</span>
    </div>

    <div className="min-w-full h-60 bg-gray-700 flex flex-col items-center justify-center text-white text-4xl font-bold">
      3
      <span className="text-lg">Slide Gris</span>
    </div>

    <div className="min-w-full h-60 bg-red-600 flex flex-col items-center justify-center text-white text-4xl font-bold">
      4
      <span className="text-lg">Slide Rojo</span>
    </div>

  </div>

  <style>
    {`
      @keyframes slide {
    0%   { transform: translateX(0); }
    49.999% { transform: translateX(-50%); }
    50% { transform: translateX(-51%); }
    100% { transform: translateX(-130%); }
    }

      .animate-slide {
        animation: slide 12s linear infinite;
      }
    `}
  </style>

</div>
    )
}
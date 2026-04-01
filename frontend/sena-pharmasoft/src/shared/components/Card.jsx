import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Card({ product }) {
  const { title, image, price, description } = product;
  const navigate = useNavigate();

  return (
    <div
      className="
        w-72
        h-auto
        bg-white
        shadow-sm
        border border-gray-200
        rounded-2xl
        overflow-hidden
        hover:shadow-lg hover:-translate-y-1
        transition-all duration-300
        p-4
        cursor-pointer
      "
      onClick={() => navigate(`/ver-card/${product.id}`)}
    >
      {/* IMAGEN */}
      <div className="flex justify-center mb-3 bg-gray-200/50 rounded-xl p-3">
        <img
          src={image}
          alt={title}
          className="w-32 h-32 object-contain"
        />
      </div>

      {/* INFO */}
      <div className="grid gap-1">
        <h2 className="text-base font-semibold text-gray-800 line-clamp-2">
          {title}
        </h2>

        <p className="text-sm text-gray-500 line-clamp-2">
          {description}
        </p>

        <p className="text-xl font-bold text-brand-hover mt-1">
          ${price.toLocaleString()}
        </p>
      </div>

      {/* BOTÓN */}
      <div
        className="
          flex items-center justify-center gap-2
          mt-4
          bg-brand-hoverv2
          text-white
          w-full h-10
          rounded-lg
          hover:bg-brand-fort
          transition
          font-semibold
        "
        onClick={(e) => e.stopPropagation()}
      >
        <ShoppingCart className="w-4 h-4" />
        <button
          onClick={(e) => e.stopPropagation()}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
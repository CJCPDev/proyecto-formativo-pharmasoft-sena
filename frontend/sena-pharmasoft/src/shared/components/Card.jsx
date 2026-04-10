import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getUsuarioActual } from "@/features/auth/services/authService";
import { agregarAlCarrito } from "@/features/home/services/carritoService";

export default function Card({ product, onProductoAgregado }) {
  const { title, image, price, description } = product;
  const navigate = useNavigate();

  const handleAgregarAlCarrito = async (e) => {
    e.stopPropagation();

    // El suaurio debe estar autenticado para cargar al carrito
    const usuarioActual = getUsuarioActual();
    if (!usuarioActual) {
      navigate("/login");
      return;
    }

    try {
      await agregarAlCarrito(usuarioActual.id, product.id, 1, product.price);

      // Notificamos al componente padre que se agregó un producto
      // para actualizar el contador del carrito
      if (onProductoAgregado) {
        onProductoAgregado();
      }

      alert(`${title} agregado al carrito ✅`);
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      alert("Error al agregar el producto al carrito");
    }
  };

  return (
    <div
      className="
        w-70
        h-auto
        dark:bg-white/60
        backdrop-blur-lg
        shadow-lg
        border
        border-brand-hover/10
        rounded-2xl
        overflow-hidden
        hover:shadow-brand-hover/50
        transition-shadow
        duration-700
        p-6
        cursor-pointer
      "
      onClick={() => navigate(`/ver-card/${product.id}`)}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-42 object-contain bg-white rounded-2xl"
      />

      <div className="grid">
        <h2 className="text-xl text-secondary font-light text-black">
          {title}
        </h2>
        <p className="text-small-label text-black">{description}</p>
        <p className="text-3xl font-medium text-brand-hover">
          ${price.toLocaleString()}
        </p>
      </div>

      <div className="flex mt-2 justify-between bg-brand-hover/90 w-full h-10 rounded-full cursor-pointer hover:bg-brand-hover/80 z-20 px-auto">
        <ShoppingCart
          className="stroke-brand-soft ml-4 my-auto"
          onClick={handleAgregarAlCarrito}
        />
        <button
          className="text-white font-extrabold text-xl cursor-pointer pr-4"
          onClick={handleAgregarAlCarrito}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

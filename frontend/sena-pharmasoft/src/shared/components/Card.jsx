import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getUsuarioActual } from "@/features/auth/services/authService";
import { agregarAlCarrito } from "@/features/home/services/carritoService";

export default function Card({ product, onProductoAgregado }) {
  const { nombre_medicamento, imagen_url, precio_venta, descripcion } = product;
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
      await agregarAlCarrito(
        usuarioActual.id,
        product.id_medicamento,
        1,
        product.precio_venta,
      );

      // Notificamos al componente padre que se agregó un producto
      // para actualizar el contador del carrito
      if (onProductoAgregado) {
        onProductoAgregado();
      }

      alert(`${nombre_medicamento} agregado al carrito ✅`);
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      alert("Error al agregar el producto al carrito");
    }
  };

  const imagenSrc = imagen_url
    ? imagen_url.startsWith("http")
      ? imagen_url
      : `http://localhost:8000${imagen_url}`
    : "http://placehold.co/300x200?text=Sin+imagen";

  return (
    <div
      className="
        flex flex-col
        w-70
        h-90
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
      onClick={() => navigate(`/ver-card/${product.id_medicamento}`)}
    >
      <img
        src={imagenSrc}
        alt={nombre_medicamento}
        className="w-full h-42 object-contain bg-white rounded-2xl"
      />

      <div className="grid">
        <h2 className="text-xl text-secondary font-light text-black">
          {nombre_medicamento}
        </h2>
        <p className="h-8 text-small-label text-black">{descripcion}</p>
        <p className="text-3xl font-medium text-brand-hover">
          ${Number(precio_venta).toLocaleString("es-CO")}
        </p>
      </div>

      <div className="flex mt-auto justify-between bg-brand-hover/90 w-full h-10 rounded-full cursor-pointer hover:bg-brand-hover/80 z-20 px-auto">
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

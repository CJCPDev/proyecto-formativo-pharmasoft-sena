import { useState, useEffect } from "react";
import { ShoppingCart, Undo2, Package, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "@/features/products/services/productService.js";
import { Card } from "@/shared/components";

export default function DetailCard({ product }) {
  const {
    nombre_medicamento,
    imagen,
    precio_venta,
    descripcion,
    nombre_laboratorio,
    concentracion,
    stock,
  } = product;
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  const stockDisponible = stock - quantity;
  const sinStock = stock === 0;

  const aumentar = () => {
    if (quantity < stock) setQuantity((q) => q + 1);
  };

  const disminuir = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const stockColor =
    stockDisponible === 0
      ? "bg-red-50 text-red-600 border-red-200"
      : stockDisponible <= 3
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-green-50 text-green-700 border-green-200";

  // Productos de la misma nombre_laboratorio, excluyendo el actual
  const relacionados = products.filter(
    (p) =>
      p.nombre_laboratorio === nombre_laboratorio &&
      p.id_medicamento !== product.id_medicamento,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllProducts().then((data) => {
      setProducts(data);
    });
  }, []);
  return (
    <div className="font-main w-full max-w-5xl mx-auto px-4 py-10">
      {/* Card principal */}
      <div
        className="
          relative grid grid-cols-1 md:grid-cols-2 gap-0
          dark:bg-white/60 bg-white
          backdrop-blur-lg shadow-xl
          border border-brand-hover/10
          rounded-3xl overflow-hidden
        "
      >
        {/* Botón volver */}
        <button
          onClick={() => navigate(-1)}
          className="
            absolute top-4 left-4 z-10
            flex items-center gap-1.5 px-3 py-2 rounded-xl
            bg-white/80 backdrop-blur-sm
            border border-brand-hover/10
            text-sm font-semibold text-black shadow-sm
            hover:bg-brand-softv2 hover:shadow-md
            transition-all duration-200
          "
        >
          <Undo2 className="size-4" />
          Volver
        </button>

        {/* Imagen */}
        <div className="bg-gray-50 flex items-center justify-center p-10 min-h-80">
          <img
            src={imagen}
            alt={nombre_medicamento}
            className="object-contain w-full max-h-80 drop-shadow-md"
          />
        </div>

        {/* Contenido */}
        <div className="flex flex-col justify-between p-8 gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-brand-hover font-bold mb-1 opacity-70">
              {nombre_laboratorio}
            </p>
            <h1 className="text-2xl font-bold text-black leading-snug mb-4">
              {nombre_medicamento}
            </h1>
            <div className="h-px bg-brand-hover/10 mb-4" />
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <div>
                <span className="block text-xs uppercase tracking-wider font-bold text-black mb-0.5">
                  Descripción
                </span>
                {descripcion}
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider font-bold text-black mb-0.5">
                  Concentración
                </span>
                {concentracion}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-px bg-brand-hover/10" />

            {/* Precio y badge de stock */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-4xl font-bold text-brand-hover tracking-tight">
                  ${Number(precio_venta * quantity).toLocaleString()}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  ${Number(precio_venta).toLocaleString()} por unidad
                </p>
              </div>
              <span
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors duration-300 ${stockColor} `}
              >
                <Package className="size-3.5" />
                {stockDisponible === 0
                  ? "Sin stock"
                  : `${stockDisponible} restantes`}
              </span>
            </div>

            {/* Selector de cantidad */}
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-wider font-bold text-black">
                Cantidad
              </span>
              <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-2 py-1">
                <button
                  onClick={disminuir}
                  disabled={quantity <= 1}
                  className="size-8 flex items-center justify-center rounded-lg text-black font-bold hover:bg-brand-softv2 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-black">
                  {quantity}
                </span>
                <button
                  onClick={aumentar}
                  disabled={quantity >= stock}
                  className="size-8 flex items-center justify-center rounded-lg text-black font-bold hover:bg-brand-softv2 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
              {quantity >= stock && !sinStock && (
                <span className="text-xs text-amber-600 font-semibold">
                  Máximo disponible
                </span>
              )}
            </div>

            {/* Botones */}
            <div className="flex flex-col gap-3">
              <button
                disabled={sinStock}
                className="w-full h-12 flex items-center justify-center gap-2 bg-brand-hover text-white font-bold rounded-xl hover:bg-brand-hover/90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 shadow-sm"
              >
                Comprar ahora
              </button>
              <button
                disabled={sinStock}
                className="w-full h-12 flex items-center justify-center gap-2 bg-brand-softv2 text-black font-semibold rounded-xl border border-brand-hover/15 hover:bg-brand-softv2/80 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
              >
                <ShoppingCart className="size-4" />
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de productos relacionados */}
      {relacionados.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-bold text-black mb-1">
            Más productos de{" "}
            <span className="text-brand-hover">{nombre_laboratorio}</span>
          </h2>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-6">
            {relacionados.length} producto{relacionados.length !== 1 ? "s" : ""}{" "}
            disponible{relacionados.length !== 1 ? "s" : ""}
          </p>

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-brand-hover/20 scrollbar-track-transparent">
            {relacionados.map((p) => (
              <div key={p.id_medicamento} className="shrink-0">
                <Card product={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

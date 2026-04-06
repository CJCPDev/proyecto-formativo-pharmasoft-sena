// ─────────────────────────────────────────────
// CartModal.jsx
// Modal del carrito de compras
// Se conecta con la API de Django
// Solo funciona si el cliente está autenticado
// ─────────────────────────────────────────────

import { useState, useEffect } from "react";
import { Button } from "@/shared/components";
import { X, Plus, Minus } from "lucide-react";
import { getUsuarioActual } from "@/features/auth/services/authService";
import {
  obtenerCarrito,
  actualizarCantidad,
  eliminarDelCarrito,
  vaciarCarrito
} from "@/features/home/services/carritoService";
import { useNavigate } from "react-router-dom";

export default function CartModal({ isOpen, onClose }) {

  const [success, setSuccess] = useState(false);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const usuarioActual = getUsuarioActual();

  // Carga el carrito desde la API cuando se abre el modal
  useEffect(() => {
    if (isOpen && usuarioActual) {
      cargarCarrito();
    }
  }, [isOpen]);

  const cargarCarrito = async () => {
    try {
      setLoading(true);
      const data = await obtenerCarrito(usuarioActual.id);
      setCart(data);
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Si el usuario no está autenticado lo redirige al login
  if (!usuarioActual) {
    navigate("/login");
    return null;
  }

  const increase = async (item) => {
    try {
      await actualizarCantidad(item.id_carrito, item.cantidad + 1);
      cargarCarrito();
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
    }
  };

  const decrease = async (item) => {
    if (item.cantidad <= 1) return;
    try {
      await actualizarCantidad(item.id_carrito, item.cantidad - 1);
      cargarCarrito();
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
    }
  };

  const remove = async (idCarrito) => {
    try {
      await eliminarDelCarrito(idCarrito);
      cargarCarrito();
    } catch (error) {
      console.error("Error al eliminar del carrito:", error);
    }
  };

  const total = cart.reduce(
    (acc, item) => acc + parseFloat(item.subtotal),
    0
  );

  const handleCheckout = async () => {
    try {
      await vaciarCarrito(usuarioActual.id);
      setSuccess(true);
      setCart([]);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error al finalizar compra:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-end z-50">
      <div className="bg-white w-90 h-full p-5 flex flex-col">
        {success ? (
          <div className="bg-green-100 text-green-700 p-2 rounded mb-3 text-center">
            ✅ Compra realizada con éxito
          </div>
        ) : (
          <div className="flex flex-col h-full">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-brand-hover">Productos Seleccionados</h2>
              <button className="cursor-pointer hover:text-red-600" onClick={onClose}>
                <X />
              </button>
            </div>

            {/* Cargando */}
            {loading && (
              <p className="text-center text-gray-500 py-4">Cargando carrito...</p>
            )}

            {/* Carrito vacío */}
            {!loading && cart.length === 0 && (
              <p className="text-center text-gray-500 py-4">No hay productos en el carrito</p>
            )}

            {/* Productos del carrito */}
            <div className="flex flex-col gap-6 overflow-y-auto flex-1">
              {cart.map(item => (
                <div
                  key={item.id_carrito}
                  className="flex gap-8 border-b border-brand-hover pb-3"
                >
                  {/* Imagen del medicamento */}
                  {item.imagen_medicamento && (
                    <img
                      src={item.imagen_medicamento}
                      alt={item.nombre_medicamento}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  )}

                  <div className="flex flex-col flex-1">
                    {/* Nombre del medicamento desde la BD */}
                    <p className="font-semibold">{item.nombre_medicamento}</p>
                    <p className="text-sm text-brand-hover font-bold">
                      ${parseFloat(item.precio_unitario).toLocaleString()}
                    </p>

                    <div className="flex items-center gap-4 mt-2">
                      <button onClick={() => decrease(item)}>
                        <Minus size={12} className="stroke-brand-hover" />
                      </button>
                      <span>{item.cantidad}</span>
                      <button onClick={() => increase(item)}>
                        <Plus size={12} className="stroke-brand-hover" />
                      </button>
                      <button
                        onClick={() => remove(item.id_carrito)}
                        className="text-red-500 ml-auto cursor-pointer"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t">
              <h3 className="font-bold mb-3">
                Total: ${total.toLocaleString()}
              </h3>
              <Button
                className="w-full cursor-pointer hover:text-brand-fort z-10"
                onClick={handleCheckout}
                disabled={cart.length === 0}
              >
                Finalizar compra
              </Button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
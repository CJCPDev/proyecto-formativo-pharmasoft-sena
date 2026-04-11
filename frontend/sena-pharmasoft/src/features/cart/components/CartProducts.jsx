// ─────────────────────────────────────────────
// CartProducts.jsx
// Tabla de medicamentos del carrito
// ─────────────────────────────────────────────

import { Title, Button } from "@/shared/components";
import { Trash } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { agregarAlCarrito } from "@/features/home/services/carritoService";

export default function CartProducts({ products = [], setProducts, cartData }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showConfirmarEliminar, setShowConfirmarEliminar] = useState(false);
  const [itemAEliminar, setItemAEliminar] = useState(null);

  const handleConfirmarEliminar = (id) => {
    setItemAEliminar(id);
    setShowConfirmarEliminar(true);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleEliminarConfirmado = () => {
    handleDelete(itemAEliminar);
    setShowConfirmarEliminar(false);
    setItemAEliminar(null);
  };

  const total = useMemo(() => {
    return products.reduce((acc, item) => acc + item.subtotal, 0);
  }, [products]);

  const handleGuardarCarrito = async () => {
    if (products.length === 0) {
      alert("No hay medicamentos en el carrito");
      return;
    }

    if (!cartData?.id_cliente) {
      alert("Debes seleccionar un cliente");
      return;
    }

    setLoading(true);
    try {
      for (const product of products) {
        await agregarAlCarrito(
          cartData.id_cliente,
          product.id_medicamento,
          product.cantidad,
          product.precio_unitario,
          cartData.estado || 'activo'
        );
      }
      alert("Carrito guardado correctamente");
      navigate("/carritos");
    } catch (error) {
      console.error("Error al guardar carrito:", error);
      const mensajeError = error.response?.data?.error || "Error al guardar el carrito";
      alert(mensajeError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-full h-full p-4 rounded-lg font-main flex flex-col">
      <Title title="Medicamentos del carrito" />

      {/* Tabla con scroll horizontal en móvil */}
      <div className="overflow-x-auto flex-1">
        <div className="min-w-[600px] flex flex-col h-full">

          {/* Header */}
          <div className="grid grid-cols-6 w-full text-center bg-brand-hover mt-2">
            <span className="border text-white py-2 text-sm">Medicamento</span>
            <span className="border text-white py-2 text-sm">Cantidad</span>
            <span className="border text-white py-2 text-sm">Precio unitario</span>
            <span className="border text-white py-2 text-sm">Subtotal</span>
            <span className="border text-white py-2 text-sm">Estado</span>
            <span className="border text-white py-2 text-sm">Acciones</span>
          </div>

          {/* Lista */}
          <div className="flex-1 overflow-y-auto">
            {products.length === 0 ? (
              <p className="text-center mt-4 text-black/40">
                No hay medicamentos agregados
              </p>
            ) : (
              products.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-6 text-center items-stretch w-full min-h-16 border-b"
                >
                  <span className="border flex justify-center items-center p-2 text-sm">
                    {item.nombre_medicamento}
                  </span>
                  <span className="border flex justify-center items-center z-10">
                    <input
                      type="number"
                      min="1"
                      value={item.cantidad}
                      onChange={(e) => {
                        const valor = parseInt(e.target.value);
                        if (valor < 1) return;
                        setProducts((prev) => prev.map(p =>
                          p.id === item.id
                            ? { ...p, cantidad: valor, subtotal: valor * p.precio_unitario }
                            : p
                        ));
                      }}
                      className="w-16 text-center rounded-lg p-1 focus:outline-none focus:border-brand-hover bg-transparent"
                    />
                  </span>
                  <span className="border flex justify-center items-center text-sm">
                    ${item.precio_unitario.toLocaleString()}
                  </span>
                  <span className="border flex justify-center items-center text-sm">
                    ${item.subtotal.toLocaleString()}
                  </span>
                  <span className="border flex justify-center items-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      cartData?.estado === 'activo' ? 'bg-green-100 text-green-700' :
                      cartData?.estado === 'confirmado' ? 'bg-blue-100 text-blue-700' :
                      cartData?.estado === 'cancelado' ? 'bg-red-100 text-red-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {cartData?.estado || "activo"}
                    </span>
                  </span>
                  <div className="border flex justify-center items-center z-10">
                    <button onClick={() => handleConfirmarEliminar(item.id)}>
                      <Trash className="w-5 h-5 stroke-red-600" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>

      {/* Footer — fuera del scroll */}
      <div className="mt-3 border-t pt-3 flex flex-col gap-3">
        <div className="flex justify-end">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-brand-hover">Total</label>
            <input
              disabled
              value={`$${total.toLocaleString()}`}
              className="w-48 h-12 text-center border rounded-xl bg-brand-soft/60 px-4 text-base"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-end gap-2">
          <Button variant="secondary" onClick={() => setProducts([])}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardarCarrito} disabled={loading}>
            {loading ? "Guardando..." : "Guardar carrito"}
          </Button>
        </div>
      </div>

      {/* Modal de confirmación eliminar */}
      {showConfirmarEliminar && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80 flex flex-col gap-4">
            <h2 className="text-center font-bold text-brand-hover text-lg">
              ¿Eliminar medicamento?
            </h2>
            <p className="text-center text-gray-500 text-sm">
              Esta acción eliminará el medicamento de la lista. ¿Estás seguro?
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setShowConfirmarEliminar(false);
                  setItemAEliminar(null);
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleEliminarConfirmado}
              >
                Sí, eliminar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
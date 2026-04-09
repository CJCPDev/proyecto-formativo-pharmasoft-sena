// ─────────────────────────────────────────────
// DetailCartPage.jsx
// Página para ver el detalle de un carrito
// Incluye acciones de editar y eliminar medicamentos
// ─────────────────────────────────────────────

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Title, Input, Select, Button } from "@/shared/components";
import { getCarrito } from "../services/cartService";
import { actualizarCantidad, eliminarDelCarrito } from "@/features/home/services/carritoService";
import { Trash, Pencil } from "lucide-react";

export default function DetailCartPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmarEliminar, setShowConfirmarEliminar] = useState(false);
  const [itemAEliminar, setItemAEliminar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    cargarCarrito();
  }, [id]);

  const cargarCarrito = async () => {
    try {
      const data = await getCarrito(id);
      setCarrito(data);
    } catch (err) {
      console.error("Error al cargar carrito:", err);
      setError("No se pudo cargar el carrito");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmarEliminar = (idCarrito) => {
    setItemAEliminar(idCarrito);
    setShowConfirmarEliminar(true);
  };

  const handleEliminarConfirmado = async () => {
    try {
      await eliminarDelCarrito(itemAEliminar);
      await cargarCarrito();
      setShowConfirmarEliminar(false);
      setItemAEliminar(null);
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const handleActualizarMedicamento = async () => {
    try {
      await actualizarCantidad(selectedProduct.id_carrito, selectedProduct.cantidad);
      await cargarCarrito();
      setIsModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  const total = carrito?.items?.reduce((acc, item) => acc + item.subtotal, 0) || 0;

  return (
    <div className="w-full min-h-screen p-6 flex justify-center">
      <div className="w-full flex gap-6">

        {/* Información general — izquierda */}
        <div className="w-95 flex flex-col gap-2">
          <div>
            <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
              Atrás
            </Button>
          </div>

          {loading && <p className="text-center text-gray-500">Cargando...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {carrito && (
            <div className="bg-white border border-brand-hover/20 rounded-lg p-4 grid gap-4">
              <Title title="Detalle del Carrito" />

              <Input
                label="ID Carrito"
                value={carrito.id_carrito}
                readOnly
              />
              <Input
                label="N° Factura"
                value={carrito.id_factura || "Sin factura"}
                readOnly
              />
              <Input
                label="Cliente"
                value={carrito.nombre_cliente}
                readOnly
              />
              <Input
                label="Aprobado por"
                value={carrito.nombre_aprobado_por}
                readOnly
              />
              <Select
                label="Estado"
                value={carrito.estado}
                disabled
                options={[
                  { label: "Activo", value: "activo" },
                  { label: "Confirmado", value: "confirmado" },
                  { label: "Cancelado", value: "cancelado" },
                ]}
              />
            </div>
          )}
        </div>

        {/* Tabla de medicamentos — derecha */}
        {carrito && (
          <div className="flex-1 mt-11">
            <div className="bg-white border border-brand-hover/20 rounded-lg p-4 h-full flex flex-col">
              <Title title="Medicamentos del carrito" />

              {/* Header tabla */}
              <div className="grid grid-cols-6 w-full text-center bg-brand-hover mt-2">
                <span className="border text-white py-2">Medicamento</span>
                <span className="border text-white py-2">Cantidad</span>
                <span className="border text-white py-2">Precio unitario</span>
                <span className="border text-white py-2">Subtotal</span>
                <span className="border text-white py-2">Estado</span>
                <span className="border text-white py-2">Acciones</span>
              </div>

              {/* Lista de medicamentos */}
              <div className="flex-1 overflow-y-auto">
                {carrito.items?.length === 0 ? (
                  <p className="text-center mt-4 text-black/40">
                    No hay medicamentos en este carrito
                  </p>
                ) : (
                  carrito.items?.map((item) => (
                    <div
                      key={item.id_carrito}
                      className="grid grid-cols-6 text-center items-stretch w-full min-h-16 border-b"
                    >
                      <span className="border flex justify-center items-center gap-2 p-2">
                        {item.imagen ? (
                          <img
                            src={item.imagen}
                            alt={item.nombre_medicamento}
                            className="w-10 h-10 object-cover rounded"
                          />
                        ) : null}
                        {item.nombre_medicamento}
                      </span>
                      <span className="border flex justify-center items-center">
                        {item.cantidad}
                      </span>
                      <span className="border flex justify-center items-center">
                        ${item.precio_unitario.toLocaleString()}
                      </span>
                      <span className="border flex justify-center items-center">
                        ${item.subtotal.toLocaleString()}
                      </span>
                      <span className="border flex justify-center items-center">
                        <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                          item.estado === 'activo' ? 'bg-green-100 text-green-700' :
                          item.estado === 'confirmado' ? 'bg-blue-100 text-blue-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {item.estado}
                        </span>
                      </span>
                      <div className="border flex justify-center items-center gap-3">
                        <button
                          className="z-10"
                          onClick={() => {
                            setSelectedProduct({ ...item });
                            setIsModalOpen(true);
                          }}
                        >
                          <Pencil className="w-5 h-5 stroke-brand-fort" />
                        </button>
                        <button 
                          className="z-10"
                          onClick={() => handleConfirmarEliminar(item.id_carrito)}>
                          <Trash className="w-5 h-5 stroke-red-600" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer con total */}
              <div className="mt-3 border-t pt-3 flex justify-end">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-brand-hover">Total</label>
                  <input
                    disabled
                    value={`$${total.toLocaleString()}`}
                    className="w-48 h-12 text-center border rounded-xl bg-brand-soft/60 px-4 text-base"
                  />
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Modal editar medicamento */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96 flex flex-col gap-4">
            <h2 className="text-center font-bold text-brand-hover text-lg">
              Editar medicamento
            </h2>
            <Input
              label="Medicamento"
              value={selectedProduct.nombre_medicamento}
              disabled
            />
            <Input
              label="Cantidad"
              type="number"
              min="1"
              value={selectedProduct.cantidad}
              onChange={(e) => {
                const valor = parseInt(e.target.value);
                if (valor < 1) return;
                setSelectedProduct((prev) => ({
                  ...prev,
                  cantidad: valor,
                  subtotal: valor * prev.precio_unitario
                }));
              }}
            />
            <Input
              label="Precio unitario"
              type="number"
              min="0"
              value={selectedProduct.precio_unitario}
              onChange={(e) => {
                const valor = parseFloat(e.target.value);
                if (valor < 0) return;
                setSelectedProduct((prev) => ({
                  ...prev,
                  precio_unitario: valor,
                  subtotal: prev.cantidad * valor
                }));
              }}
            />
            <Input
              label="Subtotal"
              value={`$${(selectedProduct.cantidad * selectedProduct.precio_unitario).toLocaleString()}`}
              disabled
            />
            <div className="flex justify-center gap-4">
              <Button
                variant="secondary"
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedProduct(null);
                }}
              >
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleActualizarMedicamento}>
                Actualizar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación eliminar */}
      {showConfirmarEliminar && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80 flex flex-col gap-4">
            <h2 className="text-center font-bold text-brand-hover text-lg">
              ¿Eliminar medicamento?
            </h2>
            <p className="text-center text-gray-500 text-sm">
              Esta acción eliminará el medicamento del carrito. ¿Estás seguro?
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
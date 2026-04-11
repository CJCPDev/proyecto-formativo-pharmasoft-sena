// ─────────────────────────────────────────────
// EditCartPage.jsx
// Página para editar un carrito — admin y farmaceuta
// Solo editable cuando el estado es activo
// ─────────────────────────────────────────────

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Title, Input, Select, Button } from "@/shared/components";
import { getCarrito, updateCarrito } from "../services/cartService";
import { agregarAlCarrito, actualizarCantidad, eliminarDelCarrito } from "@/features/home/services/carritoService";
import { getUsuarioActual } from "@/features/auth/services/authService";
import { Trash } from "lucide-react";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

export default function EditCartPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const usuarioActual = getUsuarioActual();

  const [carrito, setCarrito] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmarEliminar, setShowConfirmarEliminar] = useState(false);
  const [itemAEliminar, setItemAEliminar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [todosMedicamentos, setTodosMedicamentos] = useState([]);
  const [medicamentosEncontrados, setMedicamentosEncontrados] = useState([]);
  const [busquedaMedicamento, setBusquedaMedicamento] = useState("");
  const [medicamentoSeleccionado, setMedicamentoSeleccionado] = useState(null);

  const [formData, setFormData] = useState({
    id_factura: "",
    estado: "activo",
  });

  const [nuevoMedicamento, setNuevoMedicamento] = useState({
    id_medicamento: "",
    cantidad: "",
    precio_unitario: "",
  });

  useEffect(() => {
    cargarCarrito();
  }, [id]);

  useEffect(() => {
    const cargarMedicamentos = async () => {
      try {
        const response = await axios.get(`${API_URL}/medicamentos/`);
        setTodosMedicamentos(response.data);
      } catch (error) {
        console.error("Error al cargar medicamentos:", error);
      }
    };
    cargarMedicamentos();
  }, []);

  useEffect(() => {
    if (!busquedaMedicamento.trim()) {
      setMedicamentosEncontrados([]);
      return;
    }
    const filtrados = todosMedicamentos.filter((m) =>
      m.nombre_medicamento.toLowerCase().includes(busquedaMedicamento.toLowerCase())
    );
    setMedicamentosEncontrados(filtrados);
  }, [busquedaMedicamento, todosMedicamentos]);

  const handleSeleccionarMedicamento = (medicamento) => {
    setMedicamentoSeleccionado(medicamento);
    setBusquedaMedicamento("");
    setMedicamentosEncontrados([]);
    setNuevoMedicamento((prev) => ({
      ...prev,
      id_medicamento: medicamento.id_medicamento,
      precio_unitario: medicamento.precio_venta,
    }));
  };

  const cargarCarrito = async () => {
    try {
      const data = await getCarrito(id);
      if (data.estado !== 'activo') {
        alert("Solo se pueden editar carritos en estado activo");
        navigate("/carritos");
        return;
      }
      setCarrito(data);
      setFormData({
        id_factura: data.id_factura || "",
        estado: data.estado || "activo",
      });
    } catch (err) {
      console.error("Error al cargar carrito:", err);
      setError("No se pudo cargar el carrito");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNuevoMedicamentoChange = (e) => {
    const { name, value } = e.target;
    if (name === "cantidad") {
      const valor = parseInt(value);
      if (valor < 1) return;
      setNuevoMedicamento((prev) => ({ ...prev, [name]: valor }));
    } else if (name === "precio_unitario") {
      const valor = parseFloat(value);
      if (valor < 0) return;
      setNuevoMedicamento((prev) => ({ ...prev, [name]: value }));
    } else {
      setNuevoMedicamento((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAgregarMedicamento = async () => {
    const { id_medicamento, cantidad, precio_unitario } = nuevoMedicamento;
    if (!id_medicamento || !cantidad || !precio_unitario) return;

    try {
      await agregarAlCarrito(
        carrito.id_usuario,
        id_medicamento,
        cantidad,
        precio_unitario,
        carrito.estado
      );
      await cargarCarrito();
      setNuevoMedicamento({ id_medicamento: "", cantidad: "", precio_unitario: "" });
      setMedicamentoSeleccionado(null);
    } catch (error) {
      const mensajeError = error.response?.data?.error || "Error al agregar el medicamento";
      alert(mensajeError);
    }
  };

  const handleEliminar = async (idCarrito) => {
    try {
      await eliminarDelCarrito(idCarrito);
      await cargarCarrito();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const handleConfirmarEliminar = (idCarrito) => {
    setItemAEliminar(idCarrito);
    setShowConfirmarEliminar(true);
  };

  const handleEliminarConfirmado = async () => {
    await handleEliminar(itemAEliminar);
    setShowConfirmarEliminar(false);
    setItemAEliminar(null);
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

  const handleGuardar = async () => {
    setSaving(true);
    try {
      for (const item of carrito.items) {
        await updateCarrito(item.id_carrito, {
          estado: formData.estado,
          id_factura: formData.id_factura || null,
          aprobado_por: usuarioActual.id,
        });
      }
      alert("Carrito actualizado correctamente");
      navigate("/carritos");
    } catch (error) {
      const mensajeError = error.response?.data?.error || "Error al guardar el carrito";
      alert(mensajeError);
    } finally {
      setSaving(false);
    }
  };

  const total = carrito?.items?.reduce((acc, item) => acc + item.subtotal, 0) || 0;

  return (
    <div className="w-full min-h-screen p-4 sm:p-6">
      <div className="w-full flex flex-col lg:flex-row gap-6">

        {/* Formulario izquierda */}
        <div className="w-full lg:w-96 flex flex-col gap-2">
          <div>
            <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
              Atrás
            </Button>
          </div>

          {loading && <p className="text-center text-gray-500">Cargando...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {carrito && (
            <div className="bg-white border border-brand-hover/20 rounded-lg p-4 grid gap-4">
              <Title title="Editar Carrito" />

              <Input label="ID Carrito" value={carrito.id_carrito} readOnly />
              <Input label="Cliente" value={carrito.nombre_cliente} readOnly />
              <Input
                label="N° Factura"
                name="id_factura"
                value={formData.id_factura}
                onChange={handleChange}
                placeholder="Número de factura"
              />
              <div className="relative z-50">
                <Select
                  label="Estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  options={[
                    { label: "Activo", value: "activo" },
                    { label: "Confirmado", value: "confirmado" },
                    { label: "Cancelado", value: "cancelado" },
                  ]}
                />
              </div>

              {/* Agregar nuevo medicamento */}
              <div className="border rounded-lg p-3 grid gap-3">
                <h3 className="font-semibold text-brand-hover">Agregar medicamento</h3>

                {medicamentoSeleccionado ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-green-700">{medicamentoSeleccionado.nombre_medicamento}</p>
                      <p className="text-sm text-gray-500">Precio: ${parseFloat(medicamentoSeleccionado.precio_venta).toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => {
                        setMedicamentoSeleccionado(null);
                        setNuevoMedicamento({ id_medicamento: "", cantidad: "", precio_unitario: "" });
                      }}
                      className="text-red-500 text-sm hover:text-red-700"
                    >
                      Cambiar
                    </button>
                  </div>
                ) : (
                  <>
                    <Input
                      label="Buscar medicamento"
                      placeholder="Escriba el nombre del medicamento..."
                      value={busquedaMedicamento}
                      onChange={(e) => setBusquedaMedicamento(e.target.value)}
                    />
                    {medicamentosEncontrados.length > 0 && (
                      <div className="border rounded-lg overflow-hidden max-h-40 overflow-y-auto">
                        {medicamentosEncontrados.map((med) => (
                          <button
                            key={med.id_medicamento}
                            onClick={() => handleSeleccionarMedicamento(med)}
                            className="w-full text-left px-4 py-2 hover:bg-brand-soft/30 border-b flex justify-between"
                          >
                            <span className="font-medium">{med.nombre_medicamento}</span>
                            <span className="text-sm text-gray-500">${parseFloat(med.precio_venta).toLocaleString()}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    {busquedaMedicamento && medicamentosEncontrados.length === 0 && (
                      <p className="text-sm text-gray-500 text-center">No se encontraron medicamentos</p>
                    )}
                  </>
                )}

                <Input
                  label="Cantidad"
                  type="number"
                  name="cantidad"
                  placeholder="Cantidad"
                  min="1"
                  value={nuevoMedicamento.cantidad}
                  onChange={handleNuevoMedicamentoChange}
                />
                <Input
                  label="Precio unitario"
                  name="precio_unitario"
                  placeholder="Precio unitario"
                  min="0"
                  value={nuevoMedicamento.precio_unitario}
                  readOnly
                />
                <Button variant="primary" type="button" onClick={handleAgregarMedicamento}>
                  Agregar
                </Button>
              </div>

              {/* Botones guardar */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <Button variant="secondary" onClick={() => navigate("/carritos")}>
                  Cancelar
                </Button>
                <Button variant="primary" onClick={handleGuardar} disabled={saving}>
                  {saving ? "Guardando..." : "Guardar cambios"}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Tabla derecha */}
        {carrito && (
          <div className="flex-1 lg:mt-11">
            <div className="bg-white border border-brand-hover/20 rounded-lg p-4 h-full flex flex-col">
              <Title title="Medicamentos del carrito" />

              {/* Tabla con scroll drag */}
              <div
                className="overflow-x-auto flex-1 cursor-grab active:cursor-grabbing"
                onMouseDown={(e) => {
                  const ele = e.currentTarget;
                  const startX = e.pageX - ele.offsetLeft;
                  const scrollLeft = ele.scrollLeft;
                  const onMouseMove = (e) => {
                    const x = e.pageX - ele.offsetLeft;
                    ele.scrollLeft = scrollLeft - (x - startX);
                  };
                  document.addEventListener('mousemove', onMouseMove);
                  document.addEventListener('mouseup', () => {
                    document.removeEventListener('mousemove', onMouseMove);
                  }, { once: true });
                }}
              >
                <div className="min-w-[500px]">
                  {/* Header */}
                  <div className="grid grid-cols-5 w-full text-center bg-brand-hover mt-2">
                    <span className="border text-white py-2 text-sm">Medicamento</span>
                    <span className="border text-white py-2 text-sm">Cantidad</span>
                    <span className="border text-white py-2 text-sm">Precio unitario</span>
                    <span className="border text-white py-2 text-sm">Subtotal</span>
                    <span className="border text-white py-2 text-sm">Acciones</span>
                  </div>

                  {/* Lista */}
                  <div className="overflow-y-auto">
                    {carrito.items?.length === 0 ? (
                      <p className="text-center mt-4 text-black/40">
                        No hay medicamentos en este carrito
                      </p>
                    ) : (
                      carrito.items?.map((item) => (
                        <div
                          key={item.id_carrito}
                          className="grid grid-cols-5 text-center items-stretch w-full min-h-16 border-b"
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
                                actualizarCantidad(item.id_carrito, valor)
                                  .then(() => cargarCarrito())
                                  .catch((err) => console.error("Error:", err));
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
                          <div className="border flex justify-center items-center gap-3">
                            <button
                              className="z-10"
                              onClick={() => handleConfirmarEliminar(item.id_carrito)}
                            >
                              <Trash className="w-5 h-5 stroke-red-600" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Footer total */}
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
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm mx-4 flex flex-col gap-4">
            <h2 className="text-center font-bold text-brand-hover text-lg">
              Editar medicamento
            </h2>
            <Input label="Medicamento" value={selectedProduct.nombre_medicamento} disabled />
            <Input
              label="Cantidad"
              type="number"
              min="1"
              value={selectedProduct.cantidad}
              onChange={(e) => {
                const valor = parseInt(e.target.value);
                if (valor < 1) return;
                setSelectedProduct((prev) => ({ ...prev, cantidad: valor, subtotal: valor * prev.precio_unitario }));
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
                setSelectedProduct((prev) => ({ ...prev, precio_unitario: valor, subtotal: prev.cantidad * valor }));
              }}
            />
            <Input
              label="Subtotal"
              value={`$${(selectedProduct.cantidad * selectedProduct.precio_unitario).toLocaleString()}`}
              disabled
            />
            <div className="flex justify-center gap-4">
              <Button variant="secondary" onClick={() => { setIsModalOpen(false); setSelectedProduct(null); }}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleActualizarMedicamento}>
                Actualizar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal confirmación eliminar */}
      {showConfirmarEliminar && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-xs mx-4 flex flex-col gap-4">
            <h2 className="text-center font-bold text-brand-hover text-lg">
              ¿Eliminar medicamento?
            </h2>
            <p className="text-center text-gray-500 text-sm">
              Esta acción eliminará el medicamento del carrito. ¿Estás seguro?
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="secondary" size="sm" onClick={() => { setShowConfirmarEliminar(false); setItemAEliminar(null); }}>
                Cancelar
              </Button>
              <Button variant="primary" size="sm" onClick={handleEliminarConfirmado}>
                Sí, eliminar
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
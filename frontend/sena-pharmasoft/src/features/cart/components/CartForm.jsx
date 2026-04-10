// ─────────────────────────────────────────────
// CartForm.jsx
// Formulario con información general del carrito
// Búsqueda de cliente en tiempo real
// ─────────────────────────────────────────────

import { useState, useEffect } from "react";
import { Title, Input, Select, Button } from "@/shared/components";
import { useNavigate, useParams } from "react-router-dom";
import { getUsuarioActual } from "@/features/auth/services/authService";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

export default function CartForm({ onAddProduct, onCartDataChange, products = [] }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const usuarioActual = getUsuarioActual();

  const [formData, setFormData] = useState({
    id_factura: "",
    estado: "activo",
  });

  const [busquedaCliente, setBusquedaCliente] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [clientesEncontrados, setClientesEncontrados] = useState([]);
  const [todosLosClientes, setTodosLosClientes] = useState([]);

  const [nuevoMedicamento, setNuevoMedicamento] = useState({
    id_medicamento: "",
    cantidad: "",
    precio_unitario: "",
  });

  // Al inicio del componente agrega estos estados
const [todosMedicamentos, setTodosMedicamentos] = useState([]);
const [medicamentosEncontrados, setMedicamentosEncontrados] = useState([]);
const [busquedaMedicamento, setBusquedaMedicamento] = useState("");
const [medicamentoSeleccionado, setMedicamentoSeleccionado] = useState(null);

// Carga todos los medicamentos al montar
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

// Filtra medicamentos mientras el usuario escribe
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
  // Seteamos el precio automáticamente desde la BD
  setNuevoMedicamento((prev) => ({
    ...prev,
    id_medicamento: medicamento.id_medicamento,
    precio_unitario: medicamento.precio_venta,
  }));
};

  // Carga todos los clientes al montar el componente
  useEffect(() => {
    const cargarClientes = async () => {
      try {
        const response = await axios.get(`${API_URL}/usuarios/?rol=2`);
        setTodosLosClientes(response.data);
      } catch (error) {
        console.error("Error al cargar clientes:", error);
      }
    };
    cargarClientes();
  }, []);

  // Filtra los clientes mientras el usuario escribe
  useEffect(() => {
    if (!busquedaCliente.trim()) {
      setClientesEncontrados([]);
      return;
    }
    const filtrados = todosLosClientes.filter((u) =>
      u.name.toLowerCase().includes(busquedaCliente.toLowerCase()) ||
      String(u.documentNumber).includes(busquedaCliente)
    );
    setClientesEncontrados(filtrados);
  }, [busquedaCliente, todosLosClientes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nuevosData = { ...formData, [name]: value };
    setFormData(nuevosData);
    if (onCartDataChange) onCartDataChange({ ...nuevosData, id_cliente: clienteSeleccionado?.id_tipo_usuario });
  };

  const handleSeleccionarCliente = (cliente) => {
    setClienteSeleccionado(cliente);
    setClientesEncontrados([]);
    setBusquedaCliente("");
    if (onCartDataChange) onCartDataChange({ ...formData, id_cliente: cliente.id_tipo_usuario });
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

  // const handleAgregarProducto = () => {
  //   const { id_medicamento, cantidad, precio_unitario } = nuevoMedicamento;
  //   if (!id_medicamento || !cantidad || !precio_unitario) return;

  //   const subtotal = parseFloat(cantidad) * parseFloat(precio_unitario);
  //   const listaProductos = Array.isArray(products) ? products : [];
  //   const existente = listaProductos.find(p => String(p.id_medicamento) === String(id_medicamento));

  //   if (existente) {
  //     onAddProduct({
  //       ...existente,
  //       cantidad: existente.cantidad + parseInt(cantidad),
  //       subtotal: (existente.cantidad + parseInt(cantidad)) * parseFloat(precio_unitario),
  //       _actualizar: true
  //     });
  //   } else {
  //     onAddProduct({
  //       id: Date.now(),
  //       id_medicamento,
  //       nombre_medicamento: `Medicamento #${id_medicamento}`,
  //       cantidad: parseInt(cantidad),
  //       precio_unitario: parseFloat(precio_unitario),
  //       subtotal,
  //     });
  //   }

  //   setNuevoMedicamento({ id_medicamento: "", cantidad: "", precio_unitario: "" });
  // };

  const handleAgregarProducto = () => {
    const { id_medicamento, cantidad, precio_unitario } = nuevoMedicamento;
    if (!id_medicamento || !cantidad || !precio_unitario) return;

    const subtotal = parseFloat(cantidad) * parseFloat(precio_unitario);
    const listaProductos = Array.isArray(products) ? products : [];
    const existente = listaProductos.find(p => String(p.id_medicamento) === String(id_medicamento));

    if (existente) {
      onAddProduct({
        ...existente,
        cantidad: existente.cantidad + parseInt(cantidad),
        subtotal: (existente.cantidad + parseInt(cantidad)) * parseFloat(precio_unitario),
        _actualizar: true
      });
    } else {
      onAddProduct({
        id: Date.now(),
        id_medicamento,
        nombre_medicamento: medicamentoSeleccionado?.nombre_medicamento || `Medicamento #${id_medicamento}`, // 👈 usar nombre real
        cantidad: parseInt(cantidad),
        precio_unitario: parseFloat(precio_unitario),
        subtotal,
      });
    }

    // Limpiamos todo después de agregar
    setNuevoMedicamento({ id_medicamento: "", cantidad: "", precio_unitario: "" });
    setMedicamentoSeleccionado(null); // limpiar medicamento seleccionado
  };

  return (
    <div className="font-main bg-white grid gap-4 w-full p-4 rounded-lg">
      <Title title={isEdit ? "Editar Carrito" : "Crear Carrito"} />

      {/* Búsqueda de cliente */}
      <div className="border rounded-lg p-3 grid gap-3">
        <h3 className="font-semibold text-brand-hover">Buscar cliente</h3>

        {/* Cliente seleccionado */}
        {clienteSeleccionado && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex justify-between items-center">
            <div>
              <p className="font-semibold text-green-700">{clienteSeleccionado.name}</p>
              <p className="text-sm text-gray-500">Doc: {clienteSeleccionado.documentNumber}</p>
            </div>
            <button
              onClick={() => setClienteSeleccionado(null)}
              className="text-red-500 text-sm hover:text-red-700"
            >
              Cambiar
            </button>
          </div>
        )}

        {/* Input de búsqueda */}
        {!clienteSeleccionado && (
          <>
            <Input
              label="Nombre o documento"
              placeholder="Buscar cliente..."
              value={busquedaCliente}
              onChange={(e) => setBusquedaCliente(e.target.value)}
            />

            {/* Resultados en tiempo real */}
            {clientesEncontrados.length > 0 && (
              <div className="border rounded-lg overflow-hidden max-h-40 overflow-y-auto">
                {clientesEncontrados.map((cliente) => (
                  <button
                    key={cliente.id_tipo_usuario}
                    onClick={() => handleSeleccionarCliente(cliente)}
                    className="w-full text-left px-4 py-2 hover:bg-brand-soft/30 border-b flex justify-between"
                  >
                    <span className="font-medium">{cliente.name}</span>
                    <span className="text-sm text-gray-500">{cliente.documentNumber}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Sin resultados */}
            {busquedaCliente && clientesEncontrados.length === 0 && (
              <p className="text-sm text-gray-500 text-center">No se encontraron clientes</p>
            )}
          </>
        )}
      </div>

      {/* Datos generales */}
      <div className="grid gap-4">
        <Input
          label="N° Factura"
          name="id_factura"
          placeholder="Número de factura"
          value={formData.id_factura}
          onChange={handleChange}
        />
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

      {/* Agregar medicamento */}
      <div className="border rounded-lg p-3 grid gap-3">
        <h3 className="font-semibold text-brand-hover">Agregar medicamento</h3>

        {/* Medicamento seleccionado */}
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
          // type="number"
          name="precio_unitario"
          placeholder="Precio unitario"
          min="0"
          value={nuevoMedicamento.precio_unitario}
          onChange={handleNuevoMedicamentoChange}
          readOnly
        />
        <Button type="button" variant="primary" onClick={handleAgregarProducto}>
          Agregar
        </Button>
      </div>
    </div>
  );
}

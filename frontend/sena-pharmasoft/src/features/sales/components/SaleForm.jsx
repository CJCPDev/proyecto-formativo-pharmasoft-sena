import { Title, Input, Select, Button } from "@/shared/components";
import sellStates from "../../../data/selects/sellStates.json";
import paymentStates from "../../../data/selects/paymenStates.json";
import { useState, useEffect } from "react";
import { saleSchema } from "../schemas/saleSchema";
import { useParams } from "react-router-dom";
import { getSalesById } from "../services/getSalesById";
import { createSale } from "../services/saleService";

export default function SaleForm({ onAddProduct }) {
  const params = useParams();
  const isEdit = Boolean(params.id);

  // ================== STATES ==================
  const [formData, setFormData] = useState({
    numeroFactura: "",
    fecha: "",
    usuario: "",
    farmaceuta: "",
    sellStates: "",
    paymentStates: "",
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(!isEdit);
  const [search, setSearch] = useState("");

  // ================== LOAD DATA ==================
  useEffect(() => {
    const fetchData = async () => {
      if (isEdit) {
        try {
          const sales = await getSalesById(params.id);

          setFormData({
            numeroFactura: sales?.numeroFactura || "",
            fecha: sales?.fechaHora || "",
            usuario: sales?.usuario || "",
            farmaceuta: sales?.farmaceuta || "",
            sellStates: sales?.sellStates || "",
            paymentStates: sales?.paymentStates || "",
          });
        } catch (error) {
          console.error("Error cargando venta:", error);
        }
      }
    };

    fetchData();
  }, [isEdit, params.id]);

  // prueba mientras cargan productos
  const fakeProducts = [
    {
      id: 1,
      name: "Acetaminofén",
      price: 2000,
      image:
        "https://beta1.cruzverde.com.co/on/demandware.static/-/Sites-masterCatalog_Colombia/default/dwa87e0ae1/images/large/125834_1_PROT_SOLAR_GL_CREM_OIL_FPS_50_EUCERIN_FCO_X_50ML_DIC_2025.jpg",
    },
    {
      id: 2,
      name: "Ibuprofeno",
      price: 3000,
      image: "https://via.placeholder.com/50",
    },
  ];

  // ================== HANDLE CHANGE ==================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = saleSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    try {
      const response = await createSale(result.data);

      console.log("Venta guardada en BD:", response);

      setIsEditing(false);

      // opcional: limpiar formulario o redirigir
    } catch (error) {
      console.error("Error al guardar venta:", error);
    }
  };

  // esto, esta pendiente apenas esten los productos se apunta al backend
  const handleAddProduct = () => {
    if (!search.trim()) return;

    const selected = fakeProducts.find(
      (p) => p.name.toLowerCase() === search.toLowerCase(),
    );

    if (!selected) return;

    onAddProduct({
      id: Date.now(),
      name: selected.name,
      quantity: 1,
      price: selected.price,
      image: selected.image,
    });

    setSearch("");
  };

  // ================== RENDER ==================
  return (
    <div className="font-main bg-white grid gap-4 w-full h-120 p-2 rounded-lg">
      {/* ================= Inicia el FORM los estilos son predeterminados a mi gusto por si los piensan usar================= */}
      <form onSubmit={handleSubmit} className="w-full px-6 rounded-xl">
        {isEdit ? (
          <Title title="Editar venta" />
        ) : (
          <Title title="Crear venta" />
        )}

        <div className="grid grid-cols-2 w-full gap-2">
          <Input
            className="
      w-full
      h-10
      text-black/20
      rounded-xl
      bg-brand-soft/60
      border
      border-background
      text-base"
            label="Numero de factura"
            disabled
            value={formData.numeroFactura}
          />

          <Input
            className="w-full h-10"
            label="Fecha y hora"
            type="datetime-local"
            name="fecha"
            disabled
            value={formData.fecha}
          />

          <div className="col-span-2 -mt-5">
            <Input
              label="Usuario"
              name="usuario"
              disabled={!isEditing}
              value={formData.usuario}
              onChange={handleChange}
              error={errors.usuario}
            />
          </div>

          <div className="col-span-2 -mt-1">
            <Input
              label="Vendedor"
              name="farmaceuta"
              disabled={!isEditing}
              value={formData.farmaceuta}
              onChange={handleChange}
              error={errors.farmaceuta}
            />
          </div>

          <Select
            label="Estado"
            name="sellStates"
            options={sellStates}
            disabled={!isEditing}
            value={formData.sellStates}
            onChange={handleChange}
            error={errors.sellStates}
          />

          <Select
            label="Tipo de pago"
            name="paymentStates"
            options={paymentStates}
            disabled={!isEditing}
            value={formData.paymentStates}
            onChange={handleChange}
            error={errors.paymentStates}
          />
        </div>

        <div className="flex py-4 justify-center">
          {isEdit && !isEditing && (
            <Button type="button" onClick={() => setIsEditing(true)}>
              Editar
            </Button>
          )}

          {isEditing && <Button type="submit">Guardar</Button>}
        </div>
      </form>

      <div className="mt-10 p-4 border rounded-lg">
        <h3>Agregar productos</h3>

        <div className="flex gap-2">
          <Input
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={isEditing} // 🔥 solo cuando ya guardaste
          />

          <Button type="button" disabled={isEditing} onClick={handleAddProduct}>
            Agregar
          </Button>
        </div>
      </div>
    </div>
  );
}

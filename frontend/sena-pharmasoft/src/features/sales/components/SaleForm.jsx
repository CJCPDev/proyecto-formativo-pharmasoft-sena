import { Title, Input, Select, Button } from "@/shared/components";
import sellStates from "../../../data/selects/sellStates.json";
import paymentStates from "../../../data/selects/paymenStates.json";
import { useState, useEffect } from "react";
import { saleSchema } from "../schemas/saleSchema";
import { useParams } from "react-router-dom";
import { getSalesById } from "../services/getSalesById";

export default function SaleForm({
  onAddProduct,
  setSaleData,
  saleData
}) {
  const params = useParams();
  const isEdit = Boolean(params.id);

  const [formData, setFormData] = useState({
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
      if (!isEdit) return;

      try {
        const sales = await getSalesById(params.id);

        // 🔥 NORMALIZAR DATOS BACKEND → FRONTEND
        setSaleData((prev) => ({
          ...prev,
          numeroFactura: sales?.numero_factura || sales?.numeroFactura || "",
          fecha:  sales?.fecha_hora || sales?.fechaHora || "",
          usuario: sales?.usuario || "",
          farmaceuta: sales?.farmaceuta || "",
          productos: sales?.productos || [],
          subtotal: sales?.subtotal_venta || 0,
          iva: sales?.iva || 0,
          total: sales?.total || 0,
        }));

        setFormData({
          usuario: sales?.usuario || "",
          farmaceuta: sales?.farmaceuta || "",
          sellStates: sales?.estado_venta || "",
          paymentStates: sales?.tipo_pago || "",
        });

      } catch (error) {
        console.error("Error cargando venta:", error);
      }
    };

    fetchData();
  }, [isEdit, params.id]);

  // ================== HANDLE CHANGE ==================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================== SUBMIT ==================
  const handleSubmit = (e) => {
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

    setSaleData((prev) => ({
      ...prev,
      usuario: formData.usuario,
      farmaceuta: formData.farmaceuta,
      estado_venta: formData.sellStates,
      tipo_pago: formData.paymentStates,
    }));

    setIsEditing(false);
  };

  // ================== PRODUCTOS ==================
  const fakeProducts = [
    {
      id: 1,
      name: "Acetaminofén",
      price: 2000,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Ibuprofeno",
      price: 3000,
      image: "https://via.placeholder.com/50",
    },
  ];

  const handleAddProduct = () => {
    if (!search.trim()) return;

    const selected = fakeProducts.find(
      (p) => p.name.toLowerCase() === search.toLowerCase()
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

      <form onSubmit={handleSubmit} className="w-full px-6 rounded-xl">

        <Title title={isEdit ? "Editar venta" : "Crear venta"} />

        <div className="grid grid-cols-2 w-full gap-2">

          {/* FACTURA */}
          <Input
            label="Número de factura"
            disabled
            value={saleData?.numeroFactura || ""}
          />

          <Input
            label="Fecha y hora"
            disabled
            value={saleData?.fecha || ""}
          />

          <div className="col-span-2">
            <Input
              label="Usuario"
              name="usuario"
              disabled={!isEditing}
              value={formData.usuario}
              onChange={handleChange}
              error={errors.usuario}
            />
          </div>

          <div className="col-span-2">
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
          />

          <Select
            label="Tipo de pago"
            name="paymentStates"
            options={paymentStates}
            disabled={!isEditing}
            value={formData.paymentStates}
            onChange={handleChange}
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

      {/* PRODUCTOS */}
      <div className="mt-10 p-4 border rounded-lg">

        <h3>Agregar productos</h3>

        <div className="flex gap-2">

          <Input
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={isEditing}
          />

          <Button
            type="button"
            disabled={isEditing}
            onClick={handleAddProduct}
          >
            Agregar
          </Button>

        </div>

      </div>

    </div>
  );
}
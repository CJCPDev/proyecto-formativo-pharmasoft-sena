import { Title, Input, Select, Button } from "@/shared/components";
import { useState } from "react";
import { saleSchema } from "../schemas/saleSchema";
import { createSale } from "../services/saleService";
import sellStates from "../../../data/selects/sellStates.json";
import paymentStates from "../../../data/selects/paymenStates.json";
import { useNavigate } from "react-router-dom";



export default function SaleForm() {
const navigate = useNavigate();
 

  const [formData, setFormData] = useState({
  numeroFactura: "",
  fechaHora: "",
    usuario: "",
    farmaceuta: "",
    sellStates: "",
    paymentStates: "",
  });

  const [errors, setErrors] = useState({});



  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // SUBMIT
  // =========================
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

  try {
    await createSale(result.data); // 🔥 AQUÍ GUARDAS EN BACKEND
navigate("/listar-ventas", { state: { reload: true } });
    console.log("Venta guardada");

    // opcional: limpiar form
    setFormData({
      numeroFactura: "",
      fechaHora: "",
      usuario: "",
      farmaceuta: "",
      sellStates: "",
      paymentStates: "",
    });

  } catch (error) {
    console.error("Error creando venta:", error);
  }
};


  return (
    <div className="font-main bg-white grid gap-2 w-full h-132 p-6 rounded-lg">
      <form onSubmit={handleSubmit} className="w-full px-6 rounded-xl z-10">

        <Title title="Crear venta" />

        <div className="grid grid-cols-2 gap-6 w-full">

          {/* LEFT */}
          <div className="flex flex-col gap-3">

            <Input
              label="Numero de factura"
              name="numeroFactura"
              disabled
              value={formData.numeroFactura}
            />

            <Input
              label="Usuario"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              error={errors.usuario}
            />

            <Input
              label="Farmaceuta"
              name="farmaceuta"
              value={formData.farmaceuta}
              onChange={handleChange}
              error={errors.farmaceuta}
            />
<Select
  label="Estado"
  name="sellStates"
  options={sellStates}
  value={formData.sellStates}
  onChange={handleChange}
/>

          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-3">

            <Input
              label="Fecha y hora"
              name="fechaHora"
              type="datetime-local"
              disabled
              value={formData.fechaHora}
            />

            <Select
              label="Tipo de pago"
              name="paymentStates"
              options={paymentStates}
              value={formData.paymentStates}
              onChange={handleChange}
              error={errors.paymentStates}
            />

          </div>
        </div>

        {/* PRODUCT INPUT */}
        <div className="pt-5">
          <Input
            placeholder="Producto"

          />
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 py-2 justify-center">

            <Button type="submit">
              Guardar
            </Button>

        </div>

      </form>
    </div>
  );
}
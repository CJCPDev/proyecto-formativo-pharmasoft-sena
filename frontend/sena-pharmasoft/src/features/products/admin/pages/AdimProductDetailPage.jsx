// src/modules/products/pages/ProductDetailPage.jsx
import Input from "../../../../shared/components/Input";
import { Title, Button } from "@/shared/components";
import { useNavigate, useParams } from "react-router-dom"; 
import { useEffect, useState } from "react";

export default function ProductDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // capturamos el id de la URL
  const [medicamento, setMedicamento] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/medicamentos/${id}/`)
      .then(res => res.json())
      .then(data => setMedicamento(data))
      .catch(err => console.error("Error cargando medicamento:", err));
  }, [id]);

  if (!medicamento) {
    return <p>Cargando detalle del medicamento...</p>;
  }

  return (
    <div>
      <Title title="Detalle del medicamento" />
      <form className="flex flex-col gap-10">
        <div className="flex gap-12">
          {/* Columna 1 */}
          <div className="flex flex-col gap-6 flex-1">
            <Input label="Nombre" value={medicamento.nombre_medicamento} readOnly />
            <Input label="Forma farmacéutica" value={medicamento.id_forma_farmaceutica?.nombre_forma_farmaceutica} readOnly />
            <Input label="Vía de administración" value={medicamento.id_via_administracion?.nombre_via_administracion} readOnly />
            <Input label="Laboratorio" value={medicamento.id_laboratorio?.nombre_laboratorio} readOnly />
            <Input label="Concentración" value={medicamento.concentracion} readOnly />
            <Input label="Proveedor" value={medicamento.id_proveedor?.nombre_proveedor} readOnly />
          </div>

          {/* Columna 2 */}
          <div className="flex flex-col gap-6 flex-1">
            <Input label="Lote" value={medicamento.lote} readOnly />
            <Input label="Fecha fabricación" type="date" value={medicamento.fecha_fabricacion} readOnly />
            <Input label="Fecha vencimiento" type="date" value={medicamento.fecha_vencimiento} readOnly />
            <Input label="Stock" value={medicamento.stock} readOnly />
            <Input label="Precio costo" value={medicamento.precio_compra} readOnly />
            <Input label="Precio venta" value={medicamento.precio_venta} readOnly />
          </div>

          {/* Columna 3 */}
          <div className="flex flex-col gap-6 flex-1">
            <Input label="Requiere fórmula" value={medicamento.requiere_formula} readOnly />
            <Input label="Estado" value={medicamento.id_estado?.nombre_estado} readOnly />
            <Input label="Descripción" value={medicamento.descripcion} readOnly />
          </div>
        </div>

        <div className="col-span-full flex justify-center gap-4 py-4">
          <Button variant="primary" size="sm" onClick={() => navigate("/medicamentos")}>
            Regresar
          </Button>
        </div>
      </form>
    </div>
  );
}

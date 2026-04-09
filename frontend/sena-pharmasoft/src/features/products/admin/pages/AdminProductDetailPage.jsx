import Input from "../../../../shared/components/Input";
import { Title, Button } from "@/shared/components";
import { useNavigate, useParams } from "react-router-dom"; 
import { useEffect, useState } from "react";

export default function AdminProductDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [medicamento, setMedicamento] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/medicamentos/${id}/`)
      .then(res => {
        if (!res.ok) throw new Error("Medicamento no encontrado");
        return res.json();
      })
      .then(data => {
        console.log("Medicamento cargado:", data);
        setMedicamento(data);
      })
      .catch(err => setError(err.message));
  }, [id]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!medicamento) return <p>Cargando detalle del medicamento...</p>;

  return (
    <div>
      <Title title="Detalle del medicamento" />
      <form className="flex flex-col gap-10">
        <div className="flex gap-12">

          {/* Columna 1 */}
          <div className="flex flex-col gap-6 flex-1">
            <Input label="Nombre" value={medicamento.nombre_medicamento ?? ""} readOnly />
            <Input label="Forma farmacéutica" value={medicamento.nombre_forma_farmaceutica ?? ""} readOnly />
            <Input label="Vía de administración" value={medicamento.nombre_via_administracion ?? ""} readOnly />
            <Input label="Laboratorio" value={medicamento.nombre_laboratorio ?? ""} readOnly />
            <Input label="Concentración" value={medicamento.concentracion ?? ""} readOnly />
            <Input label="Proveedor" value={medicamento.nombre_proveedor ?? ""} readOnly />
          </div>

          {/* Columna 2 */}
          <div className="flex flex-col gap-6 flex-1">
            <Input label="Lote" value={medicamento.lote ?? ""} readOnly />
            <Input label="Fecha fabricación" type="date" value={medicamento.fecha_fabricacion ?? ""} readOnly />
            <Input label="Fecha vencimiento" type="date" value={medicamento.fecha_vencimiento ?? ""} readOnly />
            <Input label="Stock" value={medicamento.stock ?? ""} readOnly />
            <Input label="Precio costo" value={medicamento.precio_compra ?? ""} readOnly />
            <Input label="Precio venta" value={medicamento.precio_venta ?? ""} readOnly />
          </div>

          {/* Columna 3 */}
          <div className="flex flex-col gap-6 flex-1">
            <Input label="Requiere fórmula" value={medicamento.requiere_formula ?? ""} readOnly />
            <Input label="Estado" value={medicamento.nombre_estado ?? ""} readOnly />
            <Input label="Descripción" value={medicamento.descripcion ?? ""} readOnly />

            {/* ✅ Imagen */}
            {medicamento.imagen_url && (
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700">Imagen</span>
                <img
                  src={medicamento.imagen_url}
                  alt="Imagen del medicamento"
                  className="w-full rounded-lg object-contain max-h-48 border border-gray-200"
                />
              </div>
            )}
          </div>

        </div>

        <div className="col-span-full flex justify-center gap-4 py-4">
          <Button variant="primary" size="sm" onClick={() => navigate("/medicamentos")}>
            Regresar
          </Button>
          <Button variant="secondary" size="sm" onClick={() => navigate(`/editar-medicamento/${medicamento.id_medicamento}`)}>
            Editar
          </Button>
        </div>
      </form>
    </div>
  );
}
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/shared/components";

export default function AdminProductDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [medicamento, setMedicamento] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/medicamentos/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Medicamento no encontrado");
        return res.json();
      })
      .then((data) => setMedicamento(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!medicamento) return <p>Cargando detalle del medicamento...</p>;

  return (
    <div className="relative bg-white rounded-xl shadow-2xl p-6 max-w-2xl mx-auto w-full">
      <h1 className="text-2xl font-bold text-brand-hover text-center mb-2">
        Detalle del medicamento
      </h1>
      <hr className="border-brand-hover mb-6" />

      {/* Grilla de 3 columnas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Columna 1: información general */}
        <div className="flex flex-col gap-2 text-sm">
          <h2 className="text-sm font-semibold text-gray-500 mb-1">
            Información general
          </h2>
          <p>
            <span className="font-semibold">Nombre:</span>{" "}
            {medicamento.nombre_medicamento ?? ""}
          </p>
          <p>
            <span className="font-semibold">Forma farmacéutica:</span>{" "}
            {medicamento.nombre_forma_farmaceutica ?? ""}
          </p>
          <p>
            <span className="font-semibold">Presentación:</span>{" "}
            {medicamento.nombre_subforma_farmaceutica ?? ""}
          </p>
          <p>
            <span className="font-semibold">Vía de administración:</span>{" "}
            {medicamento.nombre_via_administracion ?? ""}
          </p>
          <p>
            <span className="font-semibold">Laboratorio:</span>{" "}
            {medicamento.nombre_laboratorio ?? ""}
          </p>
          <p>
            <span className="font-semibold">Concentración:</span>{" "}
            {medicamento.concentracion ?? ""}
          </p>
          <p>
            <span className="font-semibold">Proveedor:</span>{" "}
            {medicamento.nombre_proveedor ?? ""}
          </p>
        </div>

        {/* Columna 2: inventario y precios */}
        <div className="flex flex-col gap-2 text-sm">
          <h2 className="text-sm font-semibold text-gray-500 mb-1">
            Inventario y precios
          </h2>
          <p>
            <span className="font-semibold">Lote:</span>{" "}
            {medicamento.lote ?? ""}
          </p>
          <p>
            <span className="font-semibold">Fecha fabricación:</span>{" "}
            {medicamento.fecha_fabricacion ?? ""}
          </p>
          <p>
            <span className="font-semibold">Fecha vencimiento:</span>{" "}
            {medicamento.fecha_vencimiento ?? ""}
          </p>
          <p>
            <span className="font-semibold">Stock:</span>{" "}
            {medicamento.stock ?? ""}
          </p>
          <p>
            <span className="font-semibold">Precio costo:</span> $
            {medicamento.precio_compra ?? ""}
          </p>
          <p>
            <span className="font-semibold">Precio venta:</span> $
            {medicamento.precio_venta ?? ""}
          </p>
        </div>

        {/* Columna 3: estado, descripción e imagen */}
        <div className="flex flex-col gap-2 text-sm">
          <h2 className="text-sm font-semibold text-gray-500 mb-1">Estado</h2>
          <div>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                medicamento.nombre_estado === "Activo"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {medicamento.nombre_estado}
            </span>
          </div>
          <p>
            <span className="font-semibold">Requiere fórmula:</span>{" "}
            {medicamento.requiere_formula ?? ""}
          </p>
          <p>
            <span className="font-semibold">Descripción:</span>{" "}
            {medicamento.descripcion ?? ""}
          </p>

          {/* Imagen del medicamento */}
          <div className="mt-2 w-36 h-36 rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden">
            {medicamento.imagen_url ? (
              <img
                src={medicamento.imagen_url}
                alt="Imagen del medicamento"
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-gray-400 text-xs">Sin imagen</span>
            )}
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-center gap-4 mt-8">
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate("/medicamentos")}
        >
          Regresar
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            navigate(`/editar-medicamento/${medicamento.id_medicamento}`)
          }
        >
          Editar
        </Button>
      </div>
    </div>
  );
}

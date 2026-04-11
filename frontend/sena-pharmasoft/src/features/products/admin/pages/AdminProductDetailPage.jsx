
// Componente Input reutilizable para mostrar campos de solo lectura
import Input from "../../../../shared/components/Input";

// Title muestra el encabezado de la página, Button es el botón reutilizable
import { Title, Button } from "@/shared/components";

// useNavigate permite redirigir al usuario, useParams lee el id de la URL
import { useNavigate, useParams } from "react-router-dom";

// useState almacena el medicamento y los errores, useEffect dispara la petición al montar
import { useEffect, useState } from "react";

export default function AdminProductDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // id del medicamento tomado desde la URL

  // Almacena los datos del medicamento una vez que la API responde
  const [medicamento, setMedicamento] = useState(null);

  // Almacena el mensaje de error si la petición falla
  const [error, setError] = useState(null);

  // Carga el medicamento desde la API cuando el componente se monta o cambia el id
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/medicamentos/${id}/`)
      .then(res => {
        // Si el servidor responde con un código de error lanzamos una excepción
        if (!res.ok) throw new Error("Medicamento no encontrado");
        return res.json();
      })
      .then(data => {
        console.log("Medicamento cargado:", data);
        setMedicamento(data); // Guardamos los datos en el estado
      })
      .catch(err => setError(err.message)); // Guardamos el mensaje de error en el estado
  }, [id]);

  // Mientras los datos no lleguen mostramos estados intermedios al usuario
  if (error) return <p className="text-red-600">{error}</p>;
  if (!medicamento) return <p>Cargando detalle del medicamento...</p>;

  return (
    <div className="relative grid gap-6 bg-white rounded-xl shadow-2xl p-4 w-[1128px]">

      {/* El formulario es solo de lectura, no tiene onSubmit porque no envía datos */}
      <form className="flex flex-col gap-10 z-20">

          <Title title="Detalle del medicamento" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {/* Columna 1: datos de identificación del medicamento */}
          <div className="flex flex-col gap-6">
            {/* ?? "" evita que el input muestre "null" o "undefined" si el campo no tiene valor */}
            <Input label="Nombre" value={medicamento.nombre_medicamento ?? ""} readOnly />
            <Input label="Forma farmacéutica" value={medicamento.nombre_forma_farmaceutica ?? ""} readOnly />
            <Input label="Presentación" value={medicamento.nombre_subforma_farmaceutica ?? ""} readOnly />
            <Input label="Vía de administración" value={medicamento.nombre_via_administracion ?? ""} readOnly />
            <Input label="Laboratorio" value={medicamento.nombre_laboratorio ?? ""} readOnly />
            <Input label="Concentración" value={medicamento.concentracion ?? ""} readOnly />
            <Input label="Proveedor" value={medicamento.nombre_proveedor ?? ""} readOnly />
          </div>

          {/* Columna 2: datos de inventario y precios */}
          <div className="flex flex-col gap-6">
            <Input label="Lote" value={medicamento.lote ?? ""} readOnly />
            <Input label="Fecha fabricación" type="date" value={medicamento.fecha_fabricacion ?? ""} readOnly />
            <Input label="Fecha vencimiento" type="date" value={medicamento.fecha_vencimiento ?? ""} readOnly />
            <Input label="Stock" value={medicamento.stock ?? ""} readOnly />
            <Input label="Precio costo" value={medicamento.precio_compra ?? ""} readOnly />
            <Input label="Precio venta" value={medicamento.precio_venta ?? ""} readOnly />
          </div>

          {/* Columna 3: estado, prescripción, descripción e imagen */}
          <div className="flex flex-col gap-6">
            <Input label="Requiere fórmula" value={medicamento.requiere_formula ?? ""} readOnly />
            <Input label="Estado" value={medicamento.nombre_estado ?? ""} readOnly />
            <Input label="Descripción" value={medicamento.descripcion ?? ""} readOnly />

            {/* La imagen solo se renderiza si el backend devolvió una URL válida */}
            {medicamento.imagen_url && (
              <div className="flex flex-col gap-6">
                <span className="text-sm font-medium text-brand-hover px-1">Imagen</span>
                {/* La URL base del servidor se concatena con la ruta relativa de la imagen */}
                <img
                  src={`http://localhost:8000${medicamento.imagen_url}`}
                  alt="Imagen del medicamento"
                  className="w-48 h-48 object-contain rounded-xl border border-gray-200 mx-auto"
                />
              </div>
            )}
          </div>
        </div>

        {/* Botones de acción centrados al pie de la página */}
        <div className="col-span-full flex justify-center gap-4 py-4">
          {/* Regresa al listado general de medicamentos */}
          <Button variant="primary" size="sm" onClick={() => navigate("/medicamentos")}>
            Regresar
          </Button>
          {/* Redirige al formulario de edición pasando el id del medicamento en la URL */}
          <Button variant="secondary" size="sm" onClick={() => navigate(`/editar-medicamento/${medicamento.id_medicamento}`)}>
            Editar
          </Button>
        </div>
      </form>
    </div>
  );
}
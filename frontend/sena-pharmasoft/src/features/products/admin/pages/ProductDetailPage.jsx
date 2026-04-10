// import { useState, useEffect } from "react"
// import Input from "../../../../shared/components/Input"
// import { Title, Button } from "@/shared/components"
// import { useNavigate, useParams } from "react-router-dom";

// export default function ProductDetailPage() {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const [products, setProducts] = useState(null);

//     useEffect(() => {
//         fetch(`http://127.0.0.1:8000/api/medicamentos/${id}/`)
//             .then(res => res.json())
//             .then(data => setProducts(data))
//             .catch(err => console.error("Error:", err));
//     }, [id]);

//     if (!products) return <p>Cargando...</p>

//     return (
//         <div>
//             <Title title="Detalle del medicamento" />
//             <form className="flex flex-col gap-10">
//                 <div className="flex gap-12">
//                     {/* Columna 1 */}
//                     <div className="flex flex-col gap-6 flex-1">
//                         <Input label="Nombre" value={products.nombreMedicamento || ""} readOnly />
//                         <Input label="Forma farmacéutica" value={products.formaFarmaceuticaNombre || ""} readOnly />
//                         <Input label="Vía de administración" value={products.viaAdministracionNombre || ""} readOnly />
//                         <Input label="Laboratorio" value={products.laboratorioNombre || ""} readOnly />
//                         <Input label="Concentración" value={products.concentracion || ""} readOnly />
//                         <Input label="Proveedor" value={products.proveedorNombre || ""} readOnly />
//                     </div>

//                     {/* Columna 2 */}
//                     <div className="flex flex-col gap-6 flex-1">
//                         <Input label="Lote" value={products.lote || ""} readOnly />
//                         <Input label="Fecha fabricación" value={products.fechaFabricacion || ""} type="date" readOnly />
//                         <Input label="Fecha vencimiento" value={products.fechaVencimiento || ""} type="date" readOnly />
//                         <Input label="Stock" value={products.stock || ""} readOnly />
//                         <Input label="Precio costo" value={products.precioCosto || ""} readOnly />
//                         <Input label="Precio venta" value={products.precioVenta || ""} readOnly />
//                     </div>

//                     {/* Columna 3 */}
//                     <div className="flex flex-col gap-6 flex-1">
//                         <Input label="Requiere fórmula" value={products.requiresPrescription || ""} readOnly />
//                         <Input label="Estado" value={products.estadoNombre || ""} readOnly />
//                         <Input label="Descripción" value={products.description || ""} readOnly />
//                         <div className="flex justify-center items-start">
//                             <img
//                                 src="/images/desloratadina.jpg"
//                                 alt="Imagen de medicamento"
//                                 className="h-60 mt-6 border-4 border-brand-soft z-20"
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="flex justify-center gap-4 py-4">
//                     <Button variant="secondary" size="sm" onClick={() => navigate("/medicamentos")}>Regresar</Button>
//                     <Button variant="primary" onClick={() => navigate(`/editar-medicamento/${id}`)}>Editar</Button>
//                 </div>
//             </form>
//         </div>
//     );
// }







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
            <Input label="Presentación" value={medicamento.nombre_subforma_farmaceutica ?? ""} readOnly />
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
                <span className="text-sm font-medium text-brand-hover px-1">Imagen</span>
                <img
                  src={`http://localhost:8000${medicamento.imagen_url}`}
                  alt="Imagen del medicamento"
                  className="w-48 h-48 object-contain rounded-xl border border-gray-200 mx-auto"
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
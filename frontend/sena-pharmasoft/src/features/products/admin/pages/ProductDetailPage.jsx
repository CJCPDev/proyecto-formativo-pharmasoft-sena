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
// useState almacena los datos del medicamento, useEffect dispara la petición al montar
import { useState, useEffect } from "react"

// Componente Input reutilizable usado en modo solo lectura para mostrar los datos
import Input from "../../../../shared/components/Input"

// Title muestra el encabezado de la página, Button es el botón reutilizable
import { Title, Button } from "@/shared/components"

// useNavigate permite redirigir programáticamente, useParams lee el id de la URL
import { useNavigate, useParams } from "react-router-dom";

export default function ProductDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams(); // id del medicamento tomado desde la URL

    // Almacena los datos del medicamento una vez que la API responde
    const [products, setProducts] = useState(null);

    // Carga el medicamento desde la API cuando el componente se monta o cambia el id
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/medicamentos/${id}/`)
            .then(res => res.json())
            .then(data => setProducts(data)) // Guardamos los datos en el estado
            .catch(err => console.error("Error:", err));
    }, [id]);

    // Mientras los datos no lleguen mostramos un mensaje de carga al usuario
    if (!products) return <p>Cargando...</p>

    return (
        <div>
            <Title title="Detalle del medicamento" />

            {/* El formulario es solo de lectura, no tiene onSubmit porque no envía datos */}
            <form className="flex flex-col gap-10">
                <div className="flex gap-12">

                    {/* Columna 1: datos de identificación del medicamento */}
                    <div className="flex flex-col gap-6 flex-1">
                        {/* || "" evita que el input muestre "null" o "undefined" si el campo no tiene valor */}
                        <Input label="Nombre" value={products.nombreMedicamento || ""} readOnly />
                        <Input label="Forma farmacéutica" value={products.formaFarmaceuticaNombre || ""} readOnly />
                        <Input label="Vía de administración" value={products.viaAdministracionNombre || ""} readOnly />
                        <Input label="Laboratorio" value={products.laboratorioNombre || ""} readOnly />
                        <Input label="Concentración" value={products.concentracion || ""} readOnly />
                        <Input label="Proveedor" value={products.proveedorNombre || ""} readOnly />
                    </div>

                    {/* Columna 2: datos de inventario y precios */}
                    <div className="flex flex-col gap-6 flex-1">
                        <Input label="Lote" value={products.lote || ""} readOnly />
                        <Input label="Fecha fabricación" value={products.fechaFabricacion || ""} type="date" readOnly />
                        <Input label="Fecha vencimiento" value={products.fechaVencimiento || ""} type="date" readOnly />
                        <Input label="Stock" value={products.stock || ""} readOnly />
                        <Input label="Precio costo" value={products.precioCosto || ""} readOnly />
                        <Input label="Precio venta" value={products.precioVenta || ""} readOnly />
                    </div>

                    {/* Columna 3: estado, prescripción, descripción e imagen */}
                    <div className="flex flex-col gap-6 flex-1">
                        <Input label="Requiere fórmula" value={products.requiresPrescription || ""} readOnly />
                        <Input label="Estado" value={products.estadoNombre || ""} readOnly />
                        <Input label="Descripción" value={products.description || ""} readOnly />

                        {/* Imagen estática del medicamento centrada al pie de la columna */}
                        <div className="flex justify-center items-start">
                            <img
                                src="/images/desloratadina.jpg"
                                alt="Imagen de medicamento"
                                className="h-60 mt-6 border-4 border-brand-soft z-20"
                            />
                        </div>
                    </div>
                </div>

                {/* Botones de acción centrados al pie de la página */}
                <div className="flex justify-center gap-4 py-4">
                    {/* Regresa al listado general de medicamentos */}
                    <Button variant="secondary" size="sm" onClick={() => navigate("/medicamentos")}>Regresar</Button>
                    {/* Redirige al formulario de edición pasando el id en la URL */}
                    <Button variant="primary" onClick={() => navigate(`/editar-medicamento/${id}`)}>Editar</Button>
                </div>
            </form>
        </div>
    );
}
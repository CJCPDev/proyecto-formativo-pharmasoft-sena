import { useState, useEffect } from "react"
import Input from "../../../../shared/components/Input"
import { Title, Button } from "@/shared/components"
import { useNavigate, useParams } from "react-router-dom";

export default function ProductDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [products, setProducts] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/medicamentos/${id}/`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Error:", err));
    }, [id]);

    if (!products) return <p>Cargando...</p>

    return (
        <div>
            <Title title="Detalle del medicamento" />
            <form className="flex flex-col gap-10">
                <div className="flex gap-12">
                    {/* Columna 1 */}
                    <div className="flex flex-col gap-6 flex-1">
                        <Input label="Nombre" value={products.nombreMedicamento || ""} readOnly />
                        <Input label="Forma farmacéutica" value={products.formaFarmaceuticaNombre || ""} readOnly />
                        <Input label="Vía de administración" value={products.viaAdministracionNombre || ""} readOnly />
                        <Input label="Laboratorio" value={products.laboratorioNombre || ""} readOnly />
                        <Input label="Concentración" value={products.concentracion || ""} readOnly />
                        <Input label="Proveedor" value={products.proveedorNombre || ""} readOnly />
                    </div>

                    {/* Columna 2 */}
                    <div className="flex flex-col gap-6 flex-1">
                        <Input label="Lote" value={products.lote || ""} readOnly />
                        <Input label="Fecha fabricación" value={products.fechaFabricacion || ""} type="date" readOnly />
                        <Input label="Fecha vencimiento" value={products.fechaVencimiento || ""} type="date" readOnly />
                        <Input label="Stock" value={products.stock || ""} readOnly />
                        <Input label="Precio costo" value={products.precioCosto || ""} readOnly />
                        <Input label="Precio venta" value={products.precioVenta || ""} readOnly />
                    </div>

                    {/* Columna 3 */}
                    <div className="flex flex-col gap-6 flex-1">
                        <Input label="Requiere fórmula" value={products.requiresPrescription || ""} readOnly />
                        <Input label="Estado" value={products.estadoNombre || ""} readOnly />
                        <Input label="Descripción" value={products.description || ""} readOnly />
                        <div className="flex justify-center items-start">
                            <img
                                src="/images/desloratadina.jpg"
                                alt="Imagen de medicamento"
                                className="h-60 mt-6 border-4 border-brand-soft z-20"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-4 py-4">
                    <Button variant="secondary" size="sm" onClick={() => navigate("/medicamentos")}>Regresar</Button>
                    <Button variant="primary" onClick={() => navigate(`/editar-medicamento/${id}`)}>Editar</Button>
                </div>
            </form>
        </div>
    );
}
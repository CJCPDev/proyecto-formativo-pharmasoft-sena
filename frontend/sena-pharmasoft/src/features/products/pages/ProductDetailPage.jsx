import Input from "../../../shared/components/Input"
import { Button } from "@/shared/components/"
import { useNavigate } from "react-router-dom"; 

export default function ProductDetailPage() {
    const navigate = useNavigate();
    const medicamento = {
        nombre: "Paracetamol",
        formaFarmaceutica: "Tableta",
        viaAdministracion: "Oral",
        laboratorio: "Bayer S.A.",
        concentracion: "500mg",
        proveedor: "Bayer",
        lote: "L12345",
        fechaFabricacion: "2025-01-10",
        fechaVencimiento: "2027-01-10",
        stock: 200,
        precioCosto: "$100.000",
        precioVenta: "$150.000",
        requiereFormula: "No",
        estado: "Activo",
        descripcion: "Analgésico y antipirético"
    };

    return (
        <div>
            <div>
            <h2 className="text-2xl font-bold mb-8 text-center">
                Detalle del Medicamento
            </h2>

            <form className="flex flex-col gap-10">
                <div className="flex gap-12">
                {/* Columna 1 */}
                <div className="flex flex-col gap-6 flex-1">
                    <Input
                    label="Nombre"
                    name="nombre"
                    value={medicamento.nombre}
                    readOnly
                    />
                    <Input
                    label="Forma farmacéutica"
                    name="formaFarmaceutica"
                    value={medicamento.formaFarmaceutica}
                    readOnly
                    />
                    <Input
                    label="Vía de administración"
                    name="viaAdministracion"
                    value={medicamento.viaAdministracion}
                    readOnly
                    />
                    <Input
                    label="Laboratorio"
                    name="laboratorio"
                    value={medicamento.laboratorio}
                    readOnly
                    />
                    <Input
                    label="Concentración"
                    name="concentracion"
                    value={medicamento.concentracion}
                    readOnly
                    />
                    <Input
                    label="Proveedor"
                    name="proveedor"
                    value={medicamento.proveedor}
                    readOnly
                    />
                </div>

                {/* Columna 2 */}
                <div className="flex flex-col gap-6 flex-1">
                    <Input
                    label="Lote"
                    name="lote"
                    value={medicamento.lote}
                    readOnly
                    />
                    <Input
                    label="Fecha fabricación"
                    name="fechaFabricacion"
                    type="date"
                    value={medicamento.fechaFabricacion}
                    readOnly
                    />
                    <Input
                    label="Fecha vencimiento"
                    name="fechaVencimiento"
                    type="date"
                    value={medicamento.fechaVencimiento}
                    readOnly
                    />
                    <Input
                    label="Stock"
                    name="stock"
                    value={medicamento.stock}
                    readOnly
                    />
                    <Input
                    label="Precio costo"
                    name="precioCosto"
                    value={medicamento.precioCosto}
                    readOnly
                    />
                    <Input
                    label="Precio venta"
                    name="precioVenta"
                    value={medicamento.precioVenta}
                    readOnly
                    />
                </div>

                {/* Columna 3 */}
                <div className="flex flex-col gap-6 flex-1">
                    <Input
                    label="Requiere fórmula"
                    name="requiresPrescription"
                    value={medicamento.requiereFormula}
                    readOnly
                    />
                    <Input
                    label="Estado"
                    name="estado"
                    value={medicamento.estado}
                    readOnly
                    />
                    <Input
                    label="Descripción"
                    name="description"
                    value={medicamento.descripcion}
                    readOnly
                    />
                </div>
                </div>
                <div className="col-span-full flex justify-center gap-4 py-4">
                <Button
                variant="secondary"
                size="md"
                onClick={() => navigate("/medi")}
                >
                    Regresar
                </Button>

                {/* Botón secundario → “Cancelar” */}
                <Button
                    variant="primary"
                    size="sm"
                    onClick={() => console.log("Cancelar")}
                >
                    Editar
                </Button>
                </div>
            </form>
            </div>
        </div>
    );
}

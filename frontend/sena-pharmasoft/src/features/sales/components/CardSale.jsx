import { Button, Title } from "@/shared/components";
import { useNavigate, useParams } from "react-router-dom";
import { getSalesById } from "../services/getSalesById";

const CardSales = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    // Obtener proveedor directamente
    const ventas = id ? getSalesById(id) : null;

    // Manejo de seguridad
    if (!ventas) {
        return <p>Venta no encontrada</p>;
    }

    const {
        numeroFactura,
        cliente,
        farmaceuta,
        estado,

    } = ventas;

    return(
        <section className="flex flex-col gap-6 w-175 px-4 py-6 font-main">

            <Title title="Ver Venta" />

            <div className="grid grid-cols-2 gap-y-4 gap-x-6 font-main">
                <div>
                    <dt className="px-4 text-xs text-text-mute">Numero de Factura</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {numeroFactura || "-"}
                    </dd>
                </div>
                <div>
                    <dt className="px-4 text-xs text-text-mute">Cliente</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {cliente || "-"}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Farmaceuta</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {farmaceuta || "-"}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Estado de venta</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {estado || "-"}
                    </dd>
                </div>

            </div>

            <div className="flex gap-6 justify-center items-center">
                <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => navigate(-1)}
                >
                    Regresar
                </Button>

                <Button 
                    variant="primary"
                    onClick={() => {
                        navigate(`/ver-venta/${id}/editar`)
                    }}
                >
                    Editar
                </Button>
            </div>

        </section>
    )
}

export default CardSales;
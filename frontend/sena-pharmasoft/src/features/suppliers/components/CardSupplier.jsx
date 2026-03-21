import { Button, Title } from "@/shared/components";
import { useNavigate, useParams } from "react-router-dom";
import { getSupplierById } from "../services/getSupplierById";

const CardSupplier = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    // Obtener proveedor directamente
    const supplier = id ? getSupplierById(id) : null;

    // Manejo de seguridad
    if (!supplier) {
        return <p>Proveedor no encontrado</p>;
    }

    const {
        nit,
        nombre,
        razonSocial,
        direccion,
        correo,
        telContacto,
        estado,
        ciudad,
        nombreContacto
    } = supplier;

    return(
        <section className="flex flex-col gap-6 w-175 px-4 py-6 font-main">

            <Title title="Ver Proveedor" />

            <div className="grid grid-cols-2 gap-y-4 gap-x-6 font-main">

                <div>
                    <dt className="px-4 text-xs text-text-mute">NIT</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {nit || "-"}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Nombre</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {nombre || "-"}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Razón Social</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {razonSocial || "-"}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Dirección</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {direccion || "-"}
                    </dd>
                </div>

                <div className="col-span-2">
                    <dt className="px-4 text-xs text-text-mute">Correo</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {correo || "-"}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Teléfono de Contacto</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {telContacto || "-"}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Estado</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {estado || "-"}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Ciudad</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {ciudad || "-"}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Nombre de Contacto</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {nombreContacto || "-"}
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
                        navigate(`/ver-proveedor/${id}/editar`)
                    }}
                >
                    Editar
                </Button>
            </div>

        </section>
    )
}

export default CardSupplier;
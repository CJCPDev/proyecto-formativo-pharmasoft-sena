import Button from "@/shared/components/Button";
const CardSupplier = ({supplier}) => {

    const {nit, nombre, razonSocial, direccion, correo, telContacto, estado, ciudad, nombreContacto} = supplier; 


    return(
        <section className="flex flex-col gap-6 w-175 px-4 py-6 font-main">

            <h1 className="text-5xl text-center">
                Ver Proveedor
            </h1>

            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 font-main">

                <div>
                    <dt className="px-4 text-xs text-text-mute">NIT</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {nit}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Nombre</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {nombre}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Razón Social</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {razonSocial}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Dirección</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {direccion}
                    </dd>
                </div>

                <div className="col-span-2">
                    <dt className="px-4 text-xs text-text-mute">Correo</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {correo}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Teléfono de Contacto</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {telContacto}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Estado</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {estado}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Ciudad</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {ciudad}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Nombre de Contacto</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {nombreContacto}
                    </dd>
                </div>

            </dl>

            <div className="flex gap-6 justify-center items-center">
                <Button variant="secondary" Size="sm">Regresar</Button>
                <Button variant="primary">Editar</Button>
            </div>

        </section>

    )
}

export default CardSupplier;
import { Title, Button } from "@/shared/components"
import { useNavigate } from "react-router-dom";

const Card = ({ user }) => {
  const navigate = useNavigate();
  const {
    nombre_completo,
    tipo_identificacion,
    numero_documento,
    rol,
    telefono,
    correo,
    direccion,
    estado,
    image,
  } = user;

  return (

            <section className="flex flex-col gap-6 w-175 px-4 py-6 font-main">

            <Title
                title = "Ver Usuario"
            />

            <div className="flex justify-between items-start gap-6">

            <dl className="grid grid-cols-2 gap-2 font-main">
                
                <div>
                    <dt className="px-4 text-xs text-text-mute">Nombre completo</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {nombre_completo}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Tipo de documento</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {tipo_identificacion}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Numero de documento</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {numero_documento}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Rol</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {rol}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Correo electronico</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {correo}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Teléfono</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {telefono}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Dirección</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {direccion}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Estado</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {estado}
                    </dd>
                </div>
            </dl>

            <div className="flex justify-end items-start">
              <img
              src={image}
              alt={nombre_completo}
              className="w-60 h-60 object-cover border-4 border-brand-soft"
            />
          </div>
        </div>

            <div className="flex gap-6 justify-center items-center">
                <Button
                variant="secondary"
                Size="sm"
                onClick={() => navigate("/usuarios")}
                >
                  Regresar
                </Button>
                <Button
                variant="primary"
                onClick={() => navigate("/editar-usuarios/id:")}
                >
                  Editar
                </Button>
            </div>

        </section>










    // <div className="max-w-6xl w-full bg-surface shadow-lg rounded-xl overflow-hidden">
    //   <div className="text-text-primary text-center py-4">
      //    <Title 
      //</div>      title="Perfil de Usuario"
      //     />
      //   </div>

      //   <div className="grid grid-cols-3 gap-8 p-8">
      //     <div className="space-y-4">
      //       <div className="w-80">
      //         <label className="block text-small-label font-semibold">Nombre</label>
      //         <div className="bg-surface-v2 px-3 rounded-md h-12 flex items-center">{nombre_completo}</div>
      //       </div>
      //       <div className="w-80">
      //         <label className="block text-small-label font-semibold">Tipo de Documento</label>
      //         <div className="bg-surface-v2 px-3 rounded-md h-12 flex items-center">{tipo_identificacion}</div>
      //       </div>
      //       <div className="w-80">
      //         <label className="block text-small-label font-semibold">Número de documento</label>
      //         <div className="bg-surface-v2 px-3 rounded-md h-12 flex items-center">{numero_documento}</div>
      //       </div>
      //       <div className="w-80">
      //         <label className="block text-small-label font-semibold">Rol</label>
      //         <div className="bg-surface-v2 px-3 rounded-md h-12 flex items-center">{rol}</div>
      //       </div>
      //     </div>

      //     <div className="space-y-4">
      //       <div className="w-80">
      //         <label className="block text-small-label font-semibold">Correo electrónico</label>
      //         <div className="bg-surface-v2 px-3 rounded-md h-12 flex items-center">{correo}</div>
      //       </div>
      //       <div className="w-80">
      //         <label className="block text-small-label font-semibold">Teléfono</label>
      //         <div className="bg-surface-v2 px-3 rounded-md h-12 flex items-center">{telefono}</div>
      //       </div>
      //       <div className="w-80">
      //         <label className="block text-small-label font-semibold">Dirección</label>
      //         <div className="bg-surface-v2 px-3 rounded-md h-12 flex items-center">{direccion}</div>
      //       </div>
      //       <div className="w-80">
      //         <label className="block text-small-label font-semibold">Estado</label>
      //         <div className="bg-surface-v2 px-3 rounded-md h-12 flex items-center">{estado}</div>
      //       </div>
      //     </div>

      //     <div className="flex justify-center items-start">
      //       <img
      //         src={image}
      //         alt={nombre_completo}
      //         className="w-60 h-60 object-cover border-4 border-brand-soft"
      //       />
      //     </div>
      //   </div>
        
        // <div className="col-span-full flex justify-center gap-4 py-4">
        //   <Button
        //     variant="secondary"
        //     size="md"
        //     // onClick={() => console.log("Oprimió cancelar")}>
        //   >Regresar
        //   </Button>
        //   <Button
        //     variant='primary'
        //     size="md"
        //     type= "submit"
        //     onMouseEnter={() => console.log('entro')}>
        //     Editar
        //   </Button>
        // </div>
      // </div>
  );
};

export default Card;

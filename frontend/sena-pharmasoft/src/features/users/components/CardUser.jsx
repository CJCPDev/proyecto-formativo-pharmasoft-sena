<<<<<<< HEAD
import { Title, Button } from "@/shared/components"
import { useNavigate } from "react-router-dom";

const Card = ({ user }) => {
    const navigate = useNavigate();
    const {
        name,
        documentType,
        documentNumber,
        userGroup,
        phone,
        userEmail,
        direccion,
        // estado,
        image,
    } = user;

    const userGroupMap = {
        "1": "Administrador",
        "2": "Cliente",
        "3": "Farmaceuta",
    };

    const documentTypeMap = {
        "NIT": "Número de identificación tributaria",
        "C.C": "Cédula de ciudadanía",
        "T.I": "Tarjeta de identidad",
        "PPT": "Permiso por Protección Temporal",
        "PEP": "Permiso Especial de Permanencia",
        "C.E": "Cédula de extranjería",
    };

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
                        {name}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Tipo de documento</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {documentTypeMap[documentType] ?? documentType}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Numero de documento</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {documentNumber}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Rol</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {userGroupMap[userGroup] ?? userGroup}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Correo electronico</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {userEmail}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Teléfono</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {phone}
                    </dd>
                </div>

                <div>
                    <dt className="px-4 text-xs text-text-mute">Dirección</dt>
                    <dd className="h-12 w-full bg-brand-soft p-4 rounded-xl flex items-center">
                        {direccion}
                    </dd>
                </div>
            </dl>

          <div className="flex justify-center items-start ">
            <img
              src={image}
              alt={name}
              className="w-60 h-60 object-fill border-4 border-brand-soft rounded-full"
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
=======
// ─────────────────────────────────────────────
// CardUser.jsx
// Tarjeta que muestra el detalle de un usuario
// Los datos vienen directamente desde la API de Django
// ─────────────────────────────────────────────

import { Title, Button } from "@/shared/components"
import { useNavigate } from "react-router-dom";

const CardUser = ({ user }) => {
  const navigate = useNavigate();

  const {
    id_tipo_usuario,
    name,
    documentTypeNombre,  // nombre del tipo de documento desde la API
    documentNumber,
    userGroupNombre,     // nombre del rol desde la API
    phone,
    userEmail,
    direccion,
    avatarUrl,
  } = user;

  return (
    <section className="flex flex-col gap-6 w-175 px-4 py-6 font-main">

      <Title title="Ver Usuario" />

      <div className="flex justify-between items-start gap-6">

        <dl className="grid grid-cols-2 gap-2 font-main">

          <div>
            <dt className="px-4 text-xs text-text-mute">Nombre completo</dt>
            <dd className="min-h-12 h-auto w-full bg-brand-soft p-4 rounded-xl flex items-center flex-wrap break-all">
              {name}
            </dd>
          </div>

          <div>
            <dt className="px-4 text-xs text-text-mute">Tipo de documento</dt>
            <dd className="min-h-12 h-auto w-full bg-brand-soft p-4 rounded-xl flex items-center flex-wrap break-all">
              {/* Viene directo de la API, no necesita mapeo */}
              {documentTypeNombre}
            </dd>
          </div>

          <div>
            <dt className="px-4 text-xs text-text-mute">Numero de documento</dt>
            <dd className="min-h-12 h-auto w-full bg-brand-soft p-4 rounded-xl flex items-center flex-wrap break-all">
              {documentNumber}
            </dd>
          </div>

          <div>
            <dt className="px-4 text-xs text-text-mute">Rol</dt>
            <dd className="min-h-12 h-auto w-full bg-brand-soft p-4 rounded-xl flex items-center flex-wrap break-all">
              {/* Viene directo de la API, no necesita mapeo */}
              {userGroupNombre}
            </dd>
          </div>

          <div>
            <dt className="px-4 text-xs text-text-mute">Correo electronico</dt>
            <dd className="min-h-12 h-auto w-full bg-brand-soft p-4 rounded-xl flex items-center flex-wrap break-all">
              {userEmail}
            </dd>
          </div>

          <div>
            <dt className="px-4 text-xs text-text-mute">Teléfono</dt>
            <dd className="min-h-12 h-auto w-full bg-brand-soft p-4 rounded-xl flex items-center flex-wrap break-all">
              {phone}
            </dd>
          </div>

          <div>
            <dt className="px-4 text-xs text-text-mute">Dirección</dt>
            <dd className="min-h-12 h-auto w-full bg-brand-soft p-4 rounded-xl flex items-center flex-wrap break-all">
              {direccion}
            </dd>
          </div>

        </dl>

{/* Avatar del usuario */}
<div className="flex justify-center items-start">
  {avatarUrl ? (
    <img
      // Si la URL es relativa, le agregamos el host de Django
      src={avatarUrl.startsWith('/media') ? `http://localhost:8000${avatarUrl}` : avatarUrl}
      alt={name}
      className="w-60 h-60 object-fill border-4 border-brand-soft rounded-full"
    />
  ) : (
    // Placeholder si no tiene avatar
    <div className="w-60 h-60 border-4 border-brand-soft rounded-full bg-brand-soft flex items-center justify-center text-4xl text-brand-hover font-bold">
      {name?.charAt(0).toUpperCase()}
    </div>
  )}
</div>

      </div>

      <div className="flex gap-6 justify-center items-center">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate("/usuarios")}
        >
          Regresar
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate(`/editar-usuarios/${id_tipo_usuario}`)}
        >
          Editar
        </Button>
      </div>

    </section>
  );
};

export default CardUser;
>>>>>>> piloto_backend

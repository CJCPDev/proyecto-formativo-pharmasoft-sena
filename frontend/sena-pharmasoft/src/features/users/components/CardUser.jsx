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
// ─────────────────────────────────────────────
// CardUser.jsx
// Tarjeta que muestra el detalle de un usuario
// Los datos vienen directamente desde la API de Django
// ─────────────────────────────────────────────

import { Title, Button } from "@/shared/components";
import { useNavigate } from "react-router-dom";

const CardUser = ({ user }) => {
  const navigate = useNavigate();

  const {
    id_tipo_usuario,
    name,
    documentTypeNombre,
    documentNumber,
    userGroupNombre,
    phone,
    userEmail,
    direccion,
    avatarUrl,
  } = user;

  const inicial = name?.charAt(0).toUpperCase();

  return (
    <section className="flex flex-col gap-6 w-full max-w-2xl mx-auto px-4 py-6 font-main">

      <Title title="Ver Usuario" />

      {/* ── Header: avatar + nombre + rol ── */}
      <div className="flex items-center gap-4 pb-5 border-b border-brand-soft">
        {avatarUrl ? (
          <img
            src={avatarUrl.startsWith("/media") ? `http://localhost:8000${avatarUrl}` : avatarUrl}
            alt={name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-brand-soft flex-shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-brand-soft flex items-center justify-center text-2xl font-semibold text-brand-hover flex-shrink-0">
            {inicial}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold text-text-main leading-tight">{name}</p>
          <span className="text-xs font-medium px-3 py-0.5 rounded-full bg-brand-soft text-brand-hover w-fit">
            {userGroupNombre}
          </span>
        </div>
      </div>

      {/* ── Grid de campos ── */}
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 font-main">

        <div className="flex flex-col gap-1">
          <dt className="px-1 text-xs uppercase tracking-wide text-text-mute">Tipo de documento</dt>
          <dd className="min-h-10 h-auto w-full bg-brand-soft px-4 py-2.5 rounded-xl flex items-center text-sm">
            {documentTypeNombre}
          </dd>
        </div>

        <div className="flex flex-col gap-1">
          <dt className="px-1 text-xs uppercase tracking-wide text-text-mute">Número de documento</dt>
          <dd className="min-h-10 h-auto w-full bg-brand-soft px-4 py-2.5 rounded-xl flex items-center text-sm">
            {documentNumber}
          </dd>
        </div>

        <div className="flex flex-col gap-1">
          <dt className="px-1 text-xs uppercase tracking-wide text-text-mute">Correo electrónico</dt>
          <dd className="min-h-10 h-auto w-full bg-brand-soft px-4 py-2.5 rounded-xl flex items-center text-sm break-all">
            {userEmail}
          </dd>
        </div>

        <div className="flex flex-col gap-1">
          <dt className="px-1 text-xs uppercase tracking-wide text-text-mute">Teléfono</dt>
          <dd className="min-h-10 h-auto w-full bg-brand-soft px-4 py-2.5 rounded-xl flex items-center text-sm">
            {phone}
          </dd>
        </div>

        {/* Dirección ocupa las 2 columnas */}
        <div className="flex flex-col gap-1 col-span-1 sm:col-span-2">
          <dt className="px-1 text-xs uppercase tracking-wide text-text-mute">Dirección</dt>
          <dd className="min-h-10 h-auto w-full bg-brand-soft px-4 py-2.5 rounded-xl flex items-center text-sm">
            {direccion}
          </dd>
        </div>

      </dl>

      {/* ── Acciones ── */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
        <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
          Regresar
        </Button>
        <Button variant="primary" size="sm" onClick={() => navigate(`/editar-usuarios/${id_tipo_usuario}`)}>
          Editar
        </Button>
      </div>

    </section>
  );
};

export default CardUser;
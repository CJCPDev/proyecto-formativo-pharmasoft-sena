// // ─────────────────────────────────────────────
// // CardUser.jsx
// // Tarjeta que muestra el detalle de un usuario
// // Los datos vienen directamente desde la API de Django
// // ─────────────────────────────────────────────

// import { Title, Button } from "@/shared/components"
// import { useNavigate } from "react-router-dom";

// const CardUser = ({ user }) => {
//   const navigate = useNavigate();

//   const {
//     id_tipo_usuario,
//     name,
//     documentTypeNombre,  // nombre del tipo de documento desde la API
//     documentNumber,
//     userGroupNombre,     // nombre del rol desde la API
//     phone,
//     userEmail,
//     direccion,
//     avatarUrl,
//   } = user;

//   return (
//     <section className="flex flex-col gap-6 w-175 px-4 py-6 font-main">

//       <Title title="Ver Usuario" />

//       <div className="flex justify-between items-start gap-6">

//         <dl className="grid grid-cols-2 gap-2 font-main">

//           <div>
//             <dt className="px-4 text-xs text-text-mute">Nombre completo</dt>
//             <dd className="min-h-12 h-auto w-full bg-brand-soft p-4 rounded-xl flex items-center flex-wrap break-all">
//               {name}
//             </dd>
//           </div>

//           <div>
//             <dt className="px-4 text-xs text-text-mute">Tipo de documento</dt>
//             <dd className="min-h-12 h-auto w-full bg-brand-soft p-4 rounded-xl flex items-center flex-wrap break-all">
//               {/* Viene directo de la API, no necesita mapeo */}
//               {documentTypeNombre}
//             </dd>
//           </div>

//           <div>
//             <dt className="px-4 text-xs text-text-mute">Numero de documento</dt>
//             <dd className="min-h-12 h-auto w-full bg-brand-soft p-4 rounded-xl flex items-center flex-wrap break-all">
//               {documentNumber}
//             </dd>
//           </div>

//           <div>
//             <dt className="px-4 text-xs text-text-mute">Rol</dt>
//             <dd className="min-h-12 h-auto w-full bg-brand-soft p-4 rounded-xl flex items-center flex-wrap break-all">
//               {/* Viene directo de la API, no necesita mapeo */}
//               {userGroupNombre}
//             </dd>
//           </div>

//           <div>
//             <dt className="px-4 text-xs text-text-mute">Correo electronico</dt>
//             <dd className="min-h-12 h-auto w-full bg-brand-soft p-4 rounded-xl flex items-center flex-wrap break-all">
//               {userEmail}
//             </dd>
//           </div>

//           <div>
//             <dt className="px-4 text-xs text-text-mute">Teléfono</dt>
//             <dd className="min-h-12 h-auto w-full bg-brand-soft p-4 rounded-xl flex items-center flex-wrap break-all">
//               {phone}
//             </dd>
//           </div>

//           <div>
//             <dt className="px-4 text-xs text-text-mute">Dirección</dt>
//             <dd className="min-h-12 h-auto w-full bg-brand-soft p-4 rounded-xl flex items-center flex-wrap break-all">
//               {direccion}
//             </dd>
//           </div>

//         </dl>

// {/* Avatar del usuario */}
// <div className="flex justify-center items-start">
//   {avatarUrl ? (
//     <img
//       // Si la URL es relativa, le agregamos el host de Django
//       src={avatarUrl.startsWith('/media') ? `http://localhost:8000${avatarUrl}` : avatarUrl}
//       alt={name}
//       className="w-60 h-60 object-fill border-4 border-brand-soft rounded-full"
//     />
//   ) : (
//     // Placeholder si no tiene avatar
//     <div className="w-60 h-60 border-4 border-brand-soft rounded-full bg-brand-soft flex items-center justify-center text-4xl text-brand-hover font-bold">
//       {name?.charAt(0).toUpperCase()}
//     </div>
//   )}
// </div>

//       </div>

//       <div className="flex gap-6 justify-center items-center">
//         <Button
//           variant="secondary"
//           size="sm"
//           onClick={() => navigate(-1)}
//         >
//           Regresar
//         </Button>
//         <Button
//           variant="primary"
//           size="sm"
//           onClick={() => navigate(`/editar-usuarios/${id_tipo_usuario}`)}
//         >
//           Editar
//         </Button>
//       </div>

//     </section>
//   );
// };

// export default CardUser;


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
    <section className="flex flex-col gap-6 w-175 px-4 py-6 font-main">

      <Title title="Ver Usuario" />

      {/* ── Header: avatar + nombre + rol ── */}
      <div className="flex items-center gap-4 pb-5 border-b border-brand-soft">
        {avatarUrl ? (
          <img
            src={avatarUrl.startsWith("/media") ? `http://localhost:8000${avatarUrl}` : avatarUrl}
            alt={name}
            className="w-24 h-24 rounded-full object-cover border-2 border-brand-soft flex-shrink-0"
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
      <dl className="grid grid-cols-2 gap-x-4 gap-y-4 font-main">

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
        <div className="flex flex-col gap-1 col-span-2">
          <dt className="px-1 text-xs uppercase tracking-wide text-text-mute">Dirección</dt>
          <dd className="min-h-10 h-auto w-full bg-brand-soft px-4 py-2.5 rounded-xl flex items-center text-sm">
            {direccion}
          </dd>
        </div>

      </dl>

      {/* ── Acciones ── */}
      <div className="flex gap-4 justify-center items-center pt-2">
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
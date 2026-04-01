// ─────────────────────────────────────────────
// EditUserPage.jsx
// Página para editar un usuario existente
// Pasa el ID de la URL al formulario UserForm
// ─────────────────────────────────────────────

import UserForm from "../components/UserForm"

export default function EditUserPage() {
  return (
    <div className="relative bg-white rounded-xl shadow-2xl">
      {/* UserForm detecta el :id de la URL automáticamente con useParams */}
      <UserForm />
    </div>
  );
}
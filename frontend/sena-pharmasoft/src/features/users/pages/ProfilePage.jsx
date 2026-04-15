// ─────────────────────────────────────────────
// ProfilePage.jsx
// Página de perfil del usuario autenticado
// Carga los datos desde la API usando el ID del token
// ─────────────────────────────────────────────

import { useState, useEffect } from "react";
import { CardUser } from "@/features/users";
import { getUsuarioActual } from "@/features/auth/services/authService";
import { getUsuario } from "@/features/users/services/usuarioService";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        // Obtenemos el ID del usuario autenticado desde localStorage
        const usuarioActual = getUsuarioActual();

        if (!usuarioActual) {
          setError("No hay usuario autenticado");
          return;
        }

        // Cargamos los datos completos del usuario desde la API
        const data = await getUsuario(usuarioActual.id);
        setUser(data);
      } catch (err) {
        console.error("Error al cargar el perfil:", err);
        setError("No se pudo cargar el perfil");
      } finally {
        setLoading(false);
      }
    };

    cargarPerfil();
  }, []);

  return (
    <div className="relative rounded-xl">
      {loading && (
        <p className="text-center p-8 text-gray-500">Cargando perfil...</p>
      )}
      {error && <p className="text-center p-8 text-red-500">{error}</p>}
      {user && <CardUser user={user} />}
    </div>
  );
}

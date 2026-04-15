// ─────────────────────────────────────────────
// ProfileUserPage.jsx
// Página que muestra el detalle de un usuario
// Carga los datos desde la API de Django
// ─────────────────────────────────────────────

import { CardUser } from "@/features/users";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUsuario } from "../services/usuarioService";

export default function ProfileUserPage() {
  const { id } = useParams();

  // Estado para guardar los datos del usuario
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carga el usuario desde la API al montar el componente
  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const data = await getUsuario(id);
        setUser(data);
      } catch (err) {
        console.error("Error al cargar el usuario:", err);
        setError("No se pudo cargar el usuario");
      } finally {
        setLoading(false);
      }
    };
    cargarUsuario();
  }, [id]);

  return (
    <div className="relative bg-white rounded-xl shadow-2xl p-4 max-w-7xl mx-auto">
      {loading && (
        <p className="text-center p-8 text-gray-500">Cargando usuario...</p>
      )}
      {error && <p className="text-center p-8 text-red-500">{error}</p>}
      {user && <CardUser user={user} />}
    </div>
  );
}

// ─────────────────────────────────────────────
// ProfileUserPage.jsx (EXPRESS)
// ─────────────────────────────────────────────

import { CardUser } from "@/features/users"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getUsuario } from "../services/usuarioService"

export default function ProfileUserPage() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="relative bg-white rounded-xl shadow-2xl">
      {loading && <p className="text-center p-8 text-gray-500">Cargando usuario...</p>}
      {error && <p className="text-center p-8 text-red-500">{error}</p>}
      {user && <CardUser user={user} />}
    </div>
  );
}
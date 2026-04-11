// ─────────────────────────────────────────────
// ClientProfilePage.jsx
// Página de perfil del cliente
// Permite editar correo, teléfono y dirección
// ─────────────────────────────────────────────
import HomeNavbar from "../components/HomeNavbar";
import { CardsMedicine } from "@/features/dashboard";
import Footer from "../../../shared/layout/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Title, Input, Button } from "@/shared/components";
import { getUsuarioActual } from "@/features/auth/services/authService";
import {
  getUsuario,
  updateUsuario,
} from "@/features/users/services/usuarioService";

export default function ClientProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    userEmail: "",
    phone: "",
    direccion: "",
  });

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const usuarioActual = getUsuarioActual();
        if (!usuarioActual) {
          setError("No hay usuario autenticado");
          return;
        }
        const data = await getUsuario(usuarioActual.id);
        setUser(data);
        setFormData({
          userEmail: data.userEmail || "",
          phone: data.phone || "",
          direccion: data.direccion || "",
        });
      } catch (err) {
        console.error("Error al cargar el perfil:", err);
        setError("No se pudo cargar el perfil");
      } finally {
        setLoading(false);
      }
    };
    cargarPerfil();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = async () => {
    setSaving(true);
    setError(null);
    try {
      const usuarioActual = getUsuarioActual();
      await updateUsuario(usuarioActual.id, formData);
      setExito(true);
      setIsEditing(false);
      setTimeout(() => setExito(false), 3000);
    } catch (error) {
      setError("Ups... ha ocurrido un error actualizando tu perfil intenta de nuevo", error);
    } finally {
      setSaving(false);
    }
  };

  const inicial = user?.name?.charAt(0).toUpperCase();

  return (
    <div className="grid w-full items-start">
        <div className="mb-2">
          <HomeNavbar />
        </div>
          {error && 
          <div className="relative">
              <p className=" absolute p-3 bg-brand-soft w-120 h-12 right-0 text-center font-main text-current rounded-4xl text-brand-fort">{error}</p>

          </div>
          
          }
      <div className="grid mx-auto bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg gap-6 mt-8">
        {/* Modal de autenticación */}

        <div>
          {/* Botón regresar y título */}
          <div className="flex items-center gap-4 justify-center">

            <Title title="Mi perfil" />
          </div>

          {loading && (
            <p className="text-center text-gray-500">Cargando perfil...</p>
          )}

          {user && (
            <>
              {/* Avatar y nombre */}
              <div className="flex items-center gap-4 pb-4 border-b border-brand-soft">
                {user.avatarUrl ? (
                  <img
                    src={
                      user.avatarUrl.startsWith("/media")
                        ? `http://localhost:8000${user.avatarUrl}`
                        : user.avatarUrl
                    }
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-brand-soft"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-brand-soft flex items-center justify-center text-3xl font-semibold text-brand-hover">
                    {inicial}
                  </div>
                )}
                <div>
                  <p className="text-lg font-semibold">{user.name}</p>
                  <span className="text-xs px-3 py-0.5 rounded-full bg-brand-soft text-brand-hover">
                    {user.userGroupNombre}
                  </span>
                </div>
              </div>

              {/* Campos no editables */}
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Tipo de documento"
                  value={user.documentTypeNombre}
                  readOnly
                />
                <Input
                  label="N° de documento"
                  value={user.documentNumber}
                  readOnly
                />
              </div>

              {/* Campos editables */}
              <Input
                label="Correo electrónico"
                type="email"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <Input
                label="Teléfono"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <Input
                label="Dirección"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                disabled={!isEditing}
              />

              {/* Mensaje de éxito */}
              {exito && (
                <p className="text-green-500 text-sm text-center">
                  Perfil actualizado correctamente
                </p>
              )}

              {/* Botones */}
              <div className="flex justify-center gap-4 pt-2">
                {!isEditing ? (
                  <Button variant="primary" onClick={() => setIsEditing(true)}>
                    Editar perfil
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          userEmail: user.userEmail || "",
                          phone: user.phone || "",
                          direccion: user.direccion || "",
                        });
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleGuardar}
                      disabled={saving}
                    >
                      {saving ? "Guardando..." : "Guardar cambios"}
                    </Button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex pt-8"></div>
      <Footer />
    </div>
  );
}

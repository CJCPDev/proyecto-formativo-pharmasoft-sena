// ─────────────────────────────────────────────
// CambiarContrasenaModal.jsx
// Modal para cambiar la contraseña del usuario
// Se abre desde el perfil del usuario autenticado
// ─────────────────────────────────────────────

import { useState } from "react";
import { Button, Input } from "@/shared/components";
import { cambiarContrasena } from "../services/usuarioService";
import { getUsuarioActual } from "@/features/auth/services/authService";

export default function CambiarContrasenaModal({ isOpen, onClose }) {

  const [formData, setFormData] = useState({
    contrasena_actual: "",
    nueva_contrasena: "",
    confirmar_contrasena: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exito, setExito] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validamos que las contraseñas coincidan antes de enviar
    if (formData.nueva_contrasena !== formData.confirmar_contrasena) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Validamos longitud mínima
    if (formData.nueva_contrasena.length < 6) {
      setError("La contraseña debe tener mínimo 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      // Obtenemos el ID del usuario autenticado
      const usuarioActual = getUsuarioActual();
      await cambiarContrasena(usuarioActual.id, formData);
      setExito(true);

      // Cerramos el modal después de 2 segundos
      setTimeout(() => {
        setExito(false);
        setFormData({
          contrasena_actual: "",
          nueva_contrasena: "",
          confirmar_contrasena: "",
        });
        onClose();
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.error || "Error al cambiar la contraseña");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-96 flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-brand-hover">
            Cambiar contraseña
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl font-bold">✕</button>
        </div>

        {/* Contenido */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">

          <Input
            label="Contraseña actual"
            type="password"
            name="contrasena_actual"
            placeholder="Ingresa tu contraseña actual"
            value={formData.contrasena_actual}
            onChange={handleChange}
          />

          <Input
            label="Nueva contraseña"
            type="password"
            name="nueva_contrasena"
            placeholder="Ingresa la nueva contraseña"
            value={formData.nueva_contrasena}
            onChange={handleChange}
          />

          <Input
            label="Confirmar nueva contraseña"
            type="password"
            name="confirmar_contrasena"
            placeholder="Confirma la nueva contraseña"
            value={formData.confirmar_contrasena}
            onChange={handleChange}
          />

          {/* Mensaje de error */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Mensaje de éxito */}
          {exito && (
            <p className="text-green-500 text-sm text-center">
              ✅ Contraseña actualizada correctamente
            </p>
          )}

          {/* Botones */}
          <div className="flex justify-end gap-4 pt-2">
            <Button variant="secondary" size="sm" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="primary" size="md" type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Cambiar contraseña"}
            </Button>
          </div>

        </form>

      </div>
    </div>
  );
}
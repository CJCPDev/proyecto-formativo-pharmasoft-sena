// ─────────────────────────────────────────────
// CambiarContrasenaModal.jsx
// Modal para cambiar la contraseña del usuario
// Se abre desde el perfil del usuario autenticado
// ─────────────────────────────────────────────

import { useState } from "react";
import { z } from "zod";
import { Button, Input } from "@/shared/components";
import { cambiarContrasena } from "../services/usuarioService";
import { getUsuarioActual } from "@/features/auth/services/authService";

// Schema de validación de contraseña
const contrasenaSchema = z.object({
  contrasena_actual: z.string().min(1, "La contraseña actual es requerida"),
  nueva_contrasena: z.string()
    .min(8, "La contraseña debe tener mínimo 8 caracteres")
    .regex(/[A-Z]/, "Debe tener al menos una letra mayúscula")
    .regex(/[a-z]/, "Debe tener al menos una letra minúscula")
    .regex(/[^A-Za-z0-9]/, "Debe tener al menos un carácter especial"),
  confirmar_contrasena: z.string().min(1, "Confirma tu nueva contraseña"),
}).refine((data) => data.nueva_contrasena === data.confirmar_contrasena, {
  message: "Las contraseñas no coinciden",
  path: ["confirmar_contrasena"],
});

export default function CambiarContrasenaModal({ isOpen, onClose }) {

  const [formData, setFormData] = useState({
    contrasena_actual: "",
    nueva_contrasena: "",
    confirmar_contrasena: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [exito, setExito] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpiamos el error del campo cuando el usuario escribe
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorGeneral(null);
    setErrors({});

    // Validamos con Zod
    const result = contrasenaSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      const usuarioActual = getUsuarioActual();
      await cambiarContrasena(usuarioActual.id, formData);
      setExito(true);

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
      setErrorGeneral(err.response?.data?.error || "Error al cambiar la contraseña");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 flex flex-col max-h-[90vh] overflow-y-auto">

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
            error={errors.contrasena_actual}
          />

          <Input
            label="Nueva contraseña"
            type="password"
            name="nueva_contrasena"
            placeholder="Mín. 8 caracteres, mayúscula, minúscula y carácter especial"
            value={formData.nueva_contrasena}
            onChange={handleChange}
            error={errors.nueva_contrasena}
          />

          <Input
            label="Confirmar nueva contraseña"
            type="password"
            name="confirmar_contrasena"
            placeholder="Confirma la nueva contraseña"
            value={formData.confirmar_contrasena}
            onChange={handleChange}
            error={errors.confirmar_contrasena}
          />

          {/* Indicador de requisitos */}
          <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3 grid gap-1">
            <p className={formData.nueva_contrasena.length >= 8 ? "text-green-600" : ""}>
              {formData.nueva_contrasena.length >= 8 ? "✅" : "⚪"} Mínimo 8 caracteres
            </p>
            <p className={/[A-Z]/.test(formData.nueva_contrasena) ? "text-green-600" : ""}>
              {/[A-Z]/.test(formData.nueva_contrasena) ? "✅" : "⚪"} Al menos una mayúscula
            </p>
            <p className={/[a-z]/.test(formData.nueva_contrasena) ? "text-green-600" : ""}>
              {/[a-z]/.test(formData.nueva_contrasena) ? "✅" : "⚪"} Al menos una minúscula
            </p>
            <p className={/[^A-Za-z0-9]/.test(formData.nueva_contrasena) ? "text-green-600" : ""}>
              {/[^A-Za-z0-9]/.test(formData.nueva_contrasena) ? "✅" : "⚪"} Al menos un carácter especial (!@#$...)
            </p>
          </div>

          {/* Error general */}
          {errorGeneral && (
            <p className="text-red-500 text-sm text-center">{errorGeneral}</p>
          )}

          {/* Éxito */}
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
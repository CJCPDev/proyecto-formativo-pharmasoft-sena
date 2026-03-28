// ─────────────────────────────────────────────
// PermisosModal.jsx
// Modal para asignar permisos extra a un usuario
// Se abre desde UserForm al crear o editar un usuario
// ─────────────────────────────────────────────

import { useState, useEffect } from "react";
import { Button } from "@/shared/components";
import { permissionGroups } from "@/data/permissions/permissions";
import { getPermisosPorUsuario } from "../services/permisosService";

export default function PermisosModal({ isOpen, onClose, onSave, userId }) {

  // Estado de permisos seleccionados {codigo: true/false}
  const [selectedPermissions, setSelectedPermissions] = useState({});
  const [loading, setLoading] = useState(false);

  // Si hay un userId (modo edición), carga los permisos existentes
  useEffect(() => {
    if (isOpen && userId) {
      const cargarPermisos = async () => {
        try {
          const data = await getPermisosPorUsuario(userId);
          const permisosObj = {};
          data.forEach((p) => {
            permisosObj[p.codigo] = true;
          });
          setSelectedPermissions(permisosObj);
        } catch (error) {
          console.error("Error al cargar permisos del usuario:", error);
        }
      };
      cargarPermisos();
    } else if (isOpen && !userId) {
      // Si es usuario nuevo, limpiamos los permisos
      setSelectedPermissions({});
    }
  }, [isOpen, userId]);

  // Activa o desactiva un permiso individual
  const handlePermissionToggle = (permissionId) => {
    setSelectedPermissions((prev) => ({
      ...prev,
      [permissionId]: !prev[permissionId],
    }));
  };

  // Activa o desactiva todos los permisos de un grupo
  const handleGroupToggle = (group) => {
    const allSelected = group.permissions.every((p) => selectedPermissions[p.id]);
    const updated = {};
    group.permissions.forEach((p) => {
      updated[p.id] = !allSelected;
    });
    setSelectedPermissions((prev) => ({ ...prev, ...updated }));
  };

  // Devuelve los permisos seleccionados al componente padre
  const handleSave = () => {
    onSave(selectedPermissions);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-2/3 max-h-[80vh] flex flex-col">

        {/* Header del modal */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-brand-hover">
            {userId ? "Editar permisos del usuario" : "Asignar permisos extra"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl font-bold">✕</button>
        </div>

        {/* Contenido scrolleable */}
        <div className="overflow-y-auto p-6 flex flex-col gap-4">
          {permissionGroups.map((group) => (
            <div key={group.id} className="border rounded-xl p-4">

              {/* Cabecera del grupo con checkbox para seleccionar todos */}
              <div className="flex items-center gap-2 mb-3 cursor-pointer" onClick={() => handleGroupToggle(group)}>
                <input
                  type="checkbox"
                  readOnly
                  checked={group.permissions.every((p) => selectedPermissions[p.id])}
                  className="w-4 h-4 accent-brand-hover"
                />
                <span className="font-semibold text-brand-hover">{group.label}</span>
              </div>

              {/* Lista de permisos del grupo */}
              <div className="grid grid-cols-2 gap-2 pl-4">
                {group.permissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handlePermissionToggle(permission.id)}
                  >
                    <input
                      type="checkbox"
                      readOnly
                      checked={!!selectedPermissions[permission.id]}
                      className="w-4 h-4 accent-brand-hover"
                    />
                    <span className="text-sm">{permission.label}</span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Footer con botones */}
        <div className="flex justify-end gap-4 p-6 border-t">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" size="md" onClick={handleSave} disabled={loading}>
            {loading ? "Guardando..." : "Aplicar permisos"}
          </Button>
        </div>

      </div>
    </div>
  );
}
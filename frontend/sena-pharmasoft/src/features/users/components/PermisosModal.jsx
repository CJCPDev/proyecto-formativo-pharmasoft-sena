// ─────────────────────────────────────────────
// PermisosModal.jsx
// Modal para asignar permisos extra a un usuario
// Carga los permisos del rol por defecto
// Pide confirmación si se agregan permisos extra
// ─────────────────────────────────────────────

import { useState, useEffect } from "react";
import { Button } from "@/shared/components";
import { permissionGroups } from "@/data/permissions/permissions";
import {
  getPermisosPorUsuario,
  getPermisosCombinados,
} from "../services/permisosService";
import { getRoles } from "../services/usuarioService";

export default function PermisosModal({
  isOpen,
  onClose,
  onSave,
  userId,
  userGroupId,
}) {
  // Estado de permisos seleccionados {codigo: true/false}
  const [selectedPermissions, setSelectedPermissions] = useState({});

  // Permisos base del rol — para comparar si se agregaron extras
  const [permisosDelRol, setPermisosDelRol] = useState({});

  const [loading, setLoading] = useState(false);

  // Estado para mostrar el modal de confirmación
  const [showConfirmacion, setShowConfirmacion] = useState(false);

  // Permisos extra que se están agregando
  const [permisosExtra, setPermisosExtra] = useState([]);

  useEffect(() => {
    if (!isOpen) return;

    const cargarPermisos = async () => {
      try {
        let permisosObj = {};

        if (userId) {
          // Modo edición — carga los permisos combinados del usuario
          const data = await getPermisosCombinados(userId);
          data.forEach((p) => {
            permisosObj[p.codigo] = true;
          });
        } else if (userGroupId) {
          // Modo creación — carga los permisos del rol seleccionado
          const { getPermisosPorRol } =
            await import("../services/permisosService");
          const data = await getPermisosPorRol(userGroupId);
          data.forEach((p) => {
            permisosObj[p.codigo] = true;
          });
        }

        setSelectedPermissions(permisosObj);
        // Guardamos los permisos del rol como base para comparar
        setPermisosDelRol({ ...permisosObj });
      } catch (error) {
        console.error("Error al cargar permisos:", error);
      }
    };

    cargarPermisos();
  }, [isOpen, userId, userGroupId]);

  // Activa o desactiva un permiso individual
  const handlePermissionToggle = (permissionId) => {
    setSelectedPermissions((prev) => ({
      ...prev,
      [permissionId]: !prev[permissionId],
    }));
  };

  // Activa o desactiva todos los permisos de un grupo
  const handleGroupToggle = (group) => {
    const allSelected = group.permissions.every(
      (p) => selectedPermissions[p.id],
    );
    const updated = {};
    group.permissions.forEach((p) => {
      updated[p.id] = !allSelected;
    });
    setSelectedPermissions((prev) => ({ ...prev, ...updated }));
  };

  // Verifica si hay permisos extra antes de guardar
  const handleSaveClick = () => {
    // Comparamos los permisos seleccionados con los del rol
    const extras = [];
    permissionGroups.forEach((group) => {
      group.permissions.forEach((permission) => {
        // Si está seleccionado ahora pero NO estaba en el rol es un permiso extra
        if (
          selectedPermissions[permission.id] &&
          !permisosDelRol[permission.id]
        ) {
          extras.push(permission.label);
        }
      });
    });

    if (extras.length > 0) {
      // Hay permisos extra — mostramos confirmación
      setPermisosExtra(extras);
      setShowConfirmacion(true);
    } else {
      // No hay extras — guardamos directamente
      onSave(selectedPermissions);
      onClose();
    }
  };

  // Confirma y guarda los permisos extra
  const handleConfirmar = () => {
    onSave(selectedPermissions);
    setShowConfirmacion(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-bold text-brand-hover">
              {userId ? "Editar permisos del usuario" : "Asignar permisos"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ✕
            </button>
          </div>

          {/* Contenido scrolleable */}
          <div className="overflow-y-auto p-6 flex flex-col gap-4">
            {permissionGroups.map((group) => (
              <div key={group.id} className="border rounded-xl p-4">
                {/* Cabecera del grupo */}
                <div
                  className="flex items-center gap-2 mb-3 cursor-pointer"
                  onClick={() => handleGroupToggle(group)}
                >
                  <input
                    type="checkbox"
                    readOnly
                    checked={group.permissions.every(
                      (p) => selectedPermissions[p.id],
                    )}
                    className="w-4 h-4 accent-brand-hover"
                  />
                  <span className="font-semibold text-brand-hover">
                    {group.label}
                  </span>
                </div>

                {/* Lista de permisos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4">
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
                      {/* Marca en verde los permisos del rol y en azul los extras */}
                      <span
                        className={`text-sm ${
                          selectedPermissions[permission.id] &&
                          !permisosDelRol[permission.id]
                            ? "text-blue-600 font-medium"
                            : ""
                        }`}
                      >
                        {permission.label}
                        {selectedPermissions[permission.id] &&
                          !permisosDelRol[permission.id] && (
                            <span className="ml-1 text-xs text-blue-400">
                              (extra)
                            </span>
                          )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4 p-6 border-t">
            <Button variant="secondary" size="sm" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleSaveClick}
              disabled={loading}
            >
              {loading ? "Guardando..." : "Aplicar permisos"}
            </Button>
          </div>
        </div>
      </div>

      {/* Modal de confirmación para permisos extra */}
      {showConfirmacion && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-brand-hover text-center">
              ¿Confirmar permisos extra?
            </h3>

            <p className="text-sm text-gray-600 text-center">
              Estás agregando los siguientes permisos adicionales al usuario:
            </p>

            {/* Lista de permisos extra */}
            <ul className="bg-brand-soft/40 rounded-lg p-3 flex flex-col gap-1">
              {permisosExtra.map((permiso, index) => (
                <li
                  key={index}
                  className="text-sm text-blue-600 flex items-center gap-2"
                >
                  <span>•</span> {permiso}
                </li>
              ))}
            </ul>

            <p className="text-sm text-gray-500 text-center">
              ¿Estás seguro de que deseas asignar estos permisos?
            </p>

            <div className="flex justify-center gap-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowConfirmacion(false)}
              >
                Cancelar
              </Button>
              <Button variant="primary" size="sm" onClick={handleConfirmar}>
                Sí, confirmar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

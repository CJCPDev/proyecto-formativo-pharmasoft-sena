// ─────────────────────────────────────────────
// PermissionsPage.jsx
// Página de gestión de permisos por rol y por usuario individual
// Se conecta con la API de Django a través de permisosService.js
// ─────────────────────────────────────────────

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { permissionGroups } from "@/data/permissions/permissions";
import PermissionGroup from "../permissions/components/PermissionGroup";
import { Button, StatusSwitch } from "@/shared/components";
import { Pencil, ChevronDown, ChevronUp } from "lucide-react";

import {
  getPermisos,
  getPermisosPorRol,
  guardarPermisosRol,
  getPermisosPorUsuario,
  getPermisosCombinados,
  buscarUsuarioPorDocumento,
  guardarPermisosUsuario,
} from "../services/permisosService";

import { getRoles } from "../services/usuarioService";

export default function PermissionsPage() {

  const navigate = useNavigate();

  const [selectedPermissions, setSelectedPermissions] = useState({});
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [documentSearch, setDocumentSearch] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  const [modo, setModo] = useState(null);

  useEffect(() => {
    const cargarRoles = async () => {
      try {
        const data = await getRoles();
        const rolesFormateados = data.map((r) => ({
          id: String(r.value),
          label: r.label,
          active: true,
        }));
        setGroups(rolesFormateados);
      } catch (error) {
        console.error("Error al cargar roles:", error);
      }
    };
    cargarRoles();
  }, []);

  const handleSelectGroup = async (group) => {
    setSelectedGroup(group);
    setFoundUser(null);
    setModo('rol');
    try {
      const data = await getPermisosPorRol(group.id);
      const permisosObj = {};
      data.forEach((p) => { permisosObj[p.codigo] = true; });
      setSelectedPermissions(permisosObj);
    } catch (error) {
      console.error("Error al cargar permisos del rol:", error);
    }
  };

  const handleSearchUser = async () => {
    if (!documentSearch.trim()) return;
    try {
      const data = await buscarUsuarioPorDocumento(documentSearch.trim());
      if (data.length > 0) {
        const user = data[0];
        setFoundUser(user);
        setSelectedGroup(null);
        setModo('usuario');

        //Carga los permisos combiandos (rol + extras) del usuario
        const permisos = await getPermisosCombinados(user.id_tipo_usuario);
        const permisosObj = {};
        permisos.forEach((p) => { permisosObj[p.codigo] = true; });
        setSelectedPermissions(permisosObj);
      } else {
        setFoundUser(null);
        alert("Usuario no encontrado");
      }
    } catch (error) {
      console.error("Error al buscar usuario:", error);
      alert("Error al buscar usuario");
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const todosPermisos = await getPermisos();
      const permisosSeleccionados = todosPermisos
        .filter((p) => selectedPermissions[p.codigo])
        .map((p) => p.id_permiso);

      if (modo === 'rol' && selectedGroup) {
        await guardarPermisosRol(selectedGroup.id, permisosSeleccionados);
      } else if (modo === 'usuario' && foundUser) {
        await guardarPermisosUsuario(foundUser.id_tipo_usuario, permisosSeleccionados);
      } else {
        alert("Selecciona un rol o busca un usuario antes de guardar");
        return;
      }

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error("Error al guardar permisos:", error);
      alert("Error al guardar los permisos");
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionToggle = (permissionId) => {
    setSelectedPermissions((prev) => ({
      ...prev,
      [permissionId]: !prev[permissionId],
    }));
  };

  const handleGroupToggle = (group) => {
    const allSelected = group.permissions.every((p) => selectedPermissions[p.id]);
    const updated = {};
    group.permissions.forEach((p) => { updated[p.id] = !allSelected; });
    setSelectedPermissions((prev) => ({ ...prev, ...updated }));
  };

  const handleGroupActiveToggle = (groupId) => {
    setGroups((prev) =>
      prev.map((g) => g.id === groupId ? { ...g, active: !g.active } : g)
    );
  };

  const handleEditGroup = (group) => {
    setEditingGroup(group);
    setEditingName(group.label);
  };

  const handleSaveGroupName = () => {
    setGroups((prev) =>
      prev.map((g) => g.id === editingGroup.id ? { ...g, label: editingName } : g)
    );
    setEditingGroup(null);
    setEditingName("");
  };

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return;
    const newGroup = { id: String(groups.length + 1), label: newGroupName, active: true };
    setGroups((prev) => [...prev, newGroup]);
    setNewGroupName("");
    setIsNewGroupModalOpen(false);
  };

  const getSelectedList = () => {
    const list = [];
    permissionGroups.forEach((group) => {
      group.permissions.forEach((permission) => {
        if (selectedPermissions[permission.id]) {
          list.push({ group: group.label, permission: permission.label });
        }
      });
    });
    return list;
  };

  return (
    <div className="z-10 min-h-screen bg-surface p-8">

      {editingGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-6 shadow-lg w-80 flex flex-col gap-4">
            <h2 className="text-center font-bold text-lg">Cambiar nombre del grupo</h2>
            <input
              type="text"
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              placeholder="Nombre del grupo"
              className="w-full px-4 py-2 rounded-lg border border-brand bg-brand-soft/60 focus:outline-none focus:ring-2 focus:ring-brand-hover"
            />
            <div className="flex justify-center gap-4">
              <Button variant="secondary" size="sm" onClick={() => setEditingGroup(null)}>Cancelar</Button>
              <Button variant="primary" size="sm" onClick={handleSaveGroupName}>Aceptar</Button>
            </div>
          </div>
        </div>
      )}

      {isNewGroupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-6 shadow-lg w-80 flex flex-col gap-4">
            <h2 className="text-center font-bold text-lg">Grupo de Usuarios</h2>
            <input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Nombre del nuevo grupo"
              className="w-full px-4 py-2 rounded-lg border border-brand bg-brand-soft/60 focus:outline-none focus:ring-2 focus:ring-brand-hover"
            />
            <div className="flex justify-center gap-4">
              <Button variant="secondary" size="sm" onClick={() => setIsNewGroupModalOpen(false)}>Cancelar</Button>
              <Button variant="primary" size="sm" onClick={handleCreateGroup}>Crear</Button>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-white border border-green-200 text-green-700 px-4 py-3 rounded-xl shadow-lg">
          <div className="bg-brand-hover rounded-full p-1">
            <span className="text-white text-sm">✓</span>
          </div>
          <span className="font-medium">Permisos guardados correctamente</span>
        </div>
      )}

      <Button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-6 px-4 py-2 border rounded-lg hover:bg-brand-soft">
        Volver
      </Button>

      <h1 className="text-3xl font-main text-center text-brand-hover mb-8">
        Gestión de Permisos
      </h1>

      {(selectedGroup || foundUser) && (
        <p className="text-center text-sm text-brand-hover mb-4">
          {modo === 'rol'
            ? `Editando permisos del rol: ${selectedGroup.label}`
            : `Editando permisos del usuario: ${foundUser.name}`
          }
        </p>
      )}

      <div className="flex gap-8">

        <div className="w-64 border rounded-xl p-4 bg-surface shadow h-fit">
          <h2 className="font-secondary text-center mb-4">Grupo de Usuarios</h2>
          <div className="flex flex-col gap-2 mb-6">
            <div
              className="bg-brand-soft px-3 py-2 rounded-lg flex justify-between items-center cursor-pointer hover:bg-brand-soft/80"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>Grupo de Usuarios</span>
              {isDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            {isDropdownOpen && (
              <div className="border rounded-xl shadow-md bg-white p-2 flex flex-col gap-2">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer ${selectedGroup?.id === group.id ? 'bg-brand-soft' : ''}`}
                    onClick={() => handleSelectGroup(group)}
                  >
                    <span className="text-sm font-medium">{group.label}</span>
                    <div className="flex items-center gap-2">
                      <Button className="p-1 rounded hover:bg-gray-100" onClick={(e) => { e.stopPropagation(); handleEditGroup(group); }}>
                        <Pencil size={14} />
                      </Button>
                      <StatusSwitch
                        checked={group.active}
                        onChange={() => handleGroupActiveToggle(group.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Button variant="primary" size="sm" onClick={() => setIsNewGroupModalOpen(true)}>
              Nuevo Grupo
            </Button>
          </div>

          <hr className="mb-4" />

          <h2 className="font-secondary text-center mb-4">Usuario Individual</h2>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={documentSearch}
              onChange={(e) => setDocumentSearch(e.target.value)}
              placeholder="Número de identificación"
              className="w-full px-3 py-2 rounded-lg border border-brand bg-brand-soft/60 focus:outline-none focus:ring-2 focus:ring-brand-hover text-sm"
            />
            <Button variant="primary" size="sm" onClick={handleSearchUser}>
              Buscar
            </Button>
            {foundUser && (
              <div className="bg-brand-soft/60 rounded-lg px-3 py-2 text-sm">
                <p className="font-bold text-brand-hover">{foundUser.name}</p>
                <p className="text-text-secundary">{foundUser.userGroupNombre}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <div className="border rounded-xl p-6 bg-surface shadow">
            {permissionGroups.map((group) => (
              <PermissionGroup
                key={group.id}
                group={group}
                selectedPermissions={selectedPermissions}
                onGroupToggle={handleGroupToggle}
                onPermissionToggle={handlePermissionToggle}
              />
            ))}
          </div>

          {getSelectedList().length > 0 && (
            <div className="border rounded-xl p-6 bg-surface shadow">
              <h2 className="font-main text-lg text-brand-hover mb-4">Permisos seleccionados</h2>
              <div className="flex flex-col gap-3">
                {permissionGroups.map((group) => {
                  const groupSelected = group.permissions.filter((p) => selectedPermissions[p.id]);
                  if (!groupSelected.length) return null;
                  return (
                    <div key={group.id}>
                      <p className="font-semibold text-sm text-text-secundary mb-1">{group.label}</p>
                      <div className="flex flex-wrap gap-2">
                        {groupSelected.map((p) => (
                          <span key={p.id} className="bg-brand-soft text-brand-hover text-xs px-3 py-1 rounded-full">
                            {p.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button variant="primary" size="md" onClick={handleSave} disabled={loading}>
          {loading ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </div>

    </div>
  );
}
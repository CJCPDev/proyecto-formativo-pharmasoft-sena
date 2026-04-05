// ─────────────────────────────────────────────
// PermissionsPage.jsx (SIN DJANGO)
// ─────────────────────────────────────────────

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { permissionGroups } from "@/data/permissions/permissions";
import PermissionGroup from "../permissions/components/PermissionGroup";
import { Button, StatusSwitch } from "@/shared/components";
import { Pencil, ChevronDown, ChevronUp } from "lucide-react";

export default function PermissionsPage() {

  const navigate = useNavigate();

  const [selectedPermissions, setSelectedPermissions] = useState({});
  const [groups, setGroups] = useState([]); // 🔥 ahora vacío (sin API)
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

  // 🔥 Selección de grupo (solo UI)
  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
    setModo('rol');
    setFoundUser(null);
    setSelectedPermissions({});
  };

  // 🔥 Buscar usuario (desactivado temporalmente)
  const handleSearchUser = () => {
    alert("Búsqueda de usuario desactivada temporalmente");
  };

  // 🔥 Guardar (solo visual por ahora)
  const handleSave = async () => {
    setLoading(true);

    setTimeout(() => {
      setShowToast(true);
      setLoading(false);
      setTimeout(() => setShowToast(false), 3000);
    }, 1000);
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
              className="w-full px-4 py-2 rounded-lg border"
            />
            <div className="flex justify-center gap-4">
              <Button onClick={() => setEditingGroup(null)}>Cancelar</Button>
              <Button onClick={handleSaveGroupName}>Aceptar</Button>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed top-4 right-4 bg-white px-4 py-2 rounded shadow">
          Permisos guardados (modo local)
        </div>
      )}

      <Button onClick={() => navigate(-1)}>Volver</Button>

      <h1 className="text-2xl text-center mb-6">Gestión de Permisos</h1>

      <div className="flex gap-8">

        <div className="w-64 border p-4">

          <h2>Grupos</h2>

          <div className="flex flex-col gap-2">
            {groups.map((group) => (
              <div key={group.id} onClick={() => handleSelectGroup(group)}>
                {group.label}
              </div>
            ))}
          </div>

          <Button onClick={() => setIsNewGroupModalOpen(true)}>
            Nuevo Grupo
          </Button>

          <hr />

          <h2>Usuario</h2>

          <input
            value={documentSearch}
            onChange={(e) => setDocumentSearch(e.target.value)}
            placeholder="Documento"
          />

          <Button onClick={handleSearchUser}>
            Buscar
          </Button>

        </div>

        <div className="flex-1">
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

      </div>

      <div className="flex justify-end mt-6">
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </Button>
      </div>

    </div>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { permissionGroups } from "@/data/permissions/permissions";
import PermissionGroup from "../permissions/components/PermissionGroup";
import { Button, StatusSwitch, Input } from "@/shared/components";
import { Pencil, ChevronDown, ChevronUp } from "lucide-react";
import { users } from "@/data/users/users";

// Grupos de usuarios disponibles
const userGroups = [
  { id: "1", label: "Administrador", active: true },
  { id: "2", label: "Farmaceuta", active: true },
  { id: "3", label: "Cliente", active: true },
];

export default function PermissionsPage() {
    
  const navigate = useNavigate();
  const [selectedPermissions, setSelectedPermissions] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); //controla el dropdown
  const [groups, setGroups] = useState(userGroups); //estado de los grupos
  const [editingGroup, setEditingGroup] = useState(null); // grupo que se está editando
  const [editingName, setEditingName] = useState(""); // nombre nuevo

  //Estados para el nuevo modal de crear grupo
  const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  // Controla si el toast está visible
  const [showToast, setShowToast] = useState(false);

  //Funcion que lo muestra
  const handleSave = () => {
  console.log("Permisos guardados:", selectedPermissions);
  
  setShowToast(true); // 👈 muestra el toast
  
  // Lo oculta automáticamente después de 3 segundos
  setTimeout(() => setShowToast(false), 3000);
};

  //Estado para el usuario buscado
  const [documentSearch, setDocumentSearch] = useState("");
  const [foundUser, setFoundUser] = useState(null);

  //Funcion de busqueda

const handleSearchUser = () => {
  const user = users.find(
    (u) => String(u.documentNumber) === String(documentSearch.trim())
  );
  if (user) {
    setFoundUser(user);
    // Aquí cargarías los permisos del usuario si los tuviera
    setSelectedPermissions(user.permissions || {});
  } else {
    setFoundUser(null);
    alert("Usuario no encontrado");
  }
};

  //Funcion para crear el grupo
  const handleCreateGroup = () => {
  if (!newGroupName.trim()) return;
  const newGroup = {
    id: String(groups.length + 1),
    label: newGroupName,
    active: true,
  };
  setGroups((prev) => [...prev, newGroup]);
  setNewGroupName("");
  setIsNewGroupModalOpen(false);
};

  // Abre el modal con el grupo seleccionado
const handleEditGroup = (group) => {
  setEditingGroup(group);
  setEditingName(group.label);
};

// Guarda el nuevo nombre
const handleSaveGroupName = () => {
  setGroups((prev) =>
    prev.map((g) => g.id === editingGroup.id ? { ...g, label: editingName } : g)
  );
  setEditingGroup(null);
  setEditingName("");
};

  const handlePermissionToggle = (permissionId) => {
    setSelectedPermissions((prev) => ({
      ...prev,
      [permissionId]: !prev[permissionId],
    }));
  };

  const handleGroupToggle = (group) => {
    const allSelected = group.permissions.every(
      (p) => selectedPermissions[p.id]
    );
    const updated = {};
    group.permissions.forEach((p) => {
      updated[p.id] = !allSelected;
    });
    setSelectedPermissions((prev) => ({ ...prev, ...updated }));
  };

  // Toggle activo/inactivo de un grupo
  const handleGroupActiveToggle = (groupId) => {
    setGroups((prev) =>
      prev.map((g) => g.id === groupId ? { ...g, active: !g.active } : g)
    );
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

    {/* Modal editar nombre del grupo */}
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
          <Button variant="secondary" size="sm" onClick={() => setEditingGroup(null)}>
          Cancelar
          </Button>
          <Button variant="primary" size="sm" onClick={handleSaveGroupName}>
          Aceptar
          </Button>
        </div>
      </div>
    </div>
  )}

  {/* Modal nuevo grupo */}
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
        <Button variant="secondary" size="sm" onClick={() => setIsNewGroupModalOpen(false)}>
          Cancelar
        </Button>
        <Button variant="primary" size="sm" onClick={handleCreateGroup}>
          Crear
        </Button>
      </div>
    </div>
  </div>
)}

{/* Toast — aparece arriba a la derecha */}
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

      <h1 className="text-3xl font-main text-general-title text-center text-brand-hover mb-8">
        Gestión de Permisos
      </h1>

      <div className="flex gap-8">

        {/* Panel izquierdo */}
        <div className="w-64 border rounded-xl p-4 bg-surface shadow h-fit">

          <h2 className="font-secondary text-center mb-4">Grupo de Usuarios</h2>
          <div className="flex flex-col gap-2 mb-6">

            {/* Botón dropdown */}
            <div
              className="bg-brand-soft px-3 py-2 rounded-lg flex justify-between items-center cursor-pointer hover:bg-brand-soft/80"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>Grupo de Usuarios</span>
              {isDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            {/* Lista de grupos — solo visible si dropdown está abierto */}
            {isDropdownOpen && (
              <div className="border rounded-xl shadow-md bg-white p-2 flex flex-col gap-2">
                {groups.map((group) => (
                  <div key={group.id} className="flex items-center justify-between px-2 py-1">
                    <span className="text-sm font-medium">{group.label}</span>
                    <div className="flex items-center gap-2">
                      <Button
                        className="p-1 rounded hover:bg-gray-100"
                        onClick={() => handleEditGroup(group)}
                      >
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

            <Button
            variant="primary"
            size="sm"
            onClick={() => setIsNewGroupModalOpen(true)}
            >
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

  {/* Muestra el usuario encontrado */}
  {foundUser && (
    <div className="bg-brand-soft/60 rounded-lg px-3 py-2 text-sm">
      <p className="font-bold text-brand-hover">{foundUser.name}</p>
      <p className="text-text-secundary">{foundUser.userGroup === "1" ? "Administrador" : foundUser.userGroup === "2" ? "Cliente" : "Farmaceuta"}</p>
    </div>
  )}
</div>

        </div>

        {/* Panel derecho */}
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
              <h2 className="font-main text-lg text-brand-hover mb-4">
                Permisos seleccionados
              </h2>
              <div className="flex flex-col gap-3">
                {permissionGroups.map((group) => {
                  const groupSelected = group.permissions.filter(
                    (p) => selectedPermissions[p.id]
                  );
                  if (!groupSelected.length) return null;
                  return (
                    <div key={group.id}>
                      <p className="font-semibold text-sm text-text-secundary mb-1">
                        {group.label}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {groupSelected.map((p) => (
                          <span
                            key={p.id}
                            className="bg-brand-soft text-brand-hover text-xs px-3 py-1 rounded-full"
                          >
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
        <Button variant="primary" size="md" onClick={handleSave}>
          Guardar Cambios
        </Button>
      </div>

    </div> 
  );
}
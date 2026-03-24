import { Checkbox } from "@/shared/components";

export default function PermissionGroup ({group, selectedPermissions, onGroupToggle, onPermissionToggle}) {

    const allSelected = group.permissions.every((p) => selectedPermissions[p.id]);

    return(
        <div className="mb-6">

            {/* Checkbox Padre */}
            <label className="flex items-center gap-2 text-sm font-main cursor-pointer mb-3">
                <Checkbox
                    id={`group-${group.id}`}
                    name={`group-${group.id}`}
                    label={group.label}
                    checked={allSelected}
                    onChange={() => onGroupToggle(group)}
                />
            </label>

            {/* Grid de permisos hijos */}
            <div className="grid grid-cols-4 gap-2 pl-6">
                {group.permissions.map((permission) => (
                    <Checkbox
                        key={permission.id}
                        id={`${group.id}-${permission.id}`}
                        name={`${group.id}-${permission.id}`}
                        label={permission.label}
                        checked={!!selectedPermissions[permission.id]}
                        onChange={() => onPermissionToggle(permission.id)}
                    />
                ))}
            </div>

            <hr className="mt-4 border-surface-muted"/>
        </div>
    )
}
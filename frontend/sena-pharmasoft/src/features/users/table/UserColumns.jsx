// Componente reutilizable que muestra un switch para activar o desactivar estados
import StatusSwitch from "@/shared/components/StatusSwitch";

// Componente que contiene los botones de acciones (editar y eliminar) para cada usuario
import UserRowActions from "../components/UserRowActions";

// Mapeos
const userGroupMap = {
  "1": "Administrador",
  "2": "Cliente",
  "3": "Farmaceuta",
};

const documentTypeMap = {
  "NIT": "Número de identificación tributaria",
  "C.C": "Cédula de ciudadanía",
  "T.I": "Tarjeta de identidad",
  "PPT": "Permiso por Protección Temporal",
  "PEP": "Permiso Especial de Permanencia",
  "C.E": "Cédula de extranjería",
};

export const UserColumns = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "userGroup",
    header: "Rol",
    // 👇 Convierte el id al label
    cell: ({ row }) => userGroupMap[row.original.userGroup] ?? row.original.userGroup,
  },
  {
    accessorKey: "documentType",
    header: "Tipo de identificacion",
    // 👇 Convierte la sigla al nombre completo
    cell: ({ row }) => documentTypeMap[row.original.documentType] ?? row.original.documentType,
  },
  {
    accessorKey: "documentNumber",
    header: "Numero de documento",
  },
  {
    accessorKey: "userEmail",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Telefono",
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const user = row.original;
      const handleChange = (value) => {
        console.log("Actualizar estado usuario:", user.id, value);
      };
      return <StatusSwitch checked={user.estado === "activo"} onChange={handleChange} />;
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => <UserRowActions user={row.original} />,
  },
];
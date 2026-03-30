// Componente reutilizable que muestra un switch para activar o desactivar estados
import { StatusSwitch } from "@/shared/components";

// Componente que contiene los botones de acciones (editar y eliminar) para cada usuario
import SupplierRowAction from "../components/SupplierRowAction";

// Definición de las columnas de la tabla de usuarios
// Este arreglo suele usarse en librerías de tablas como TanStack Table
export const SupplierColumns = [

  // Columna ID
  {
    accessorKey: "id", // Propiedad del objeto supplier que se mostrará en la columna
    header: "Id",      // Título de la columna
  },

  // Columna Razon social
  {
    accessorKey: "razonSocial", // Campo del objeto supplier
    header: "Razon Social",    // Encabezado visible
  },

  // Columna Email
  {
    accessorKey: "correo",
    header: "Correo",
  },

  // Columna telefono del contacto
  {
    accessorKey: "telContacto",
    header: "Telefono Contacto",
  },
  // Columna Ciudad
  {
    accessorKey: "ciudad",
    header: "Ciudad",
  },

  // Columna Estado (activo / inactivo)
  {
    accessorKey: "Estado",
    header: "Estado",

    // Render personalizado de la celda
    // Permite mostrar un componente en lugar de solo texto
    cell: ({ row }) => {

      // Se obtiene el objeto completo del usuario de la fila
      const supplier = row.original;

      // Función que se ejecuta cuando cambia el switch
      const handleChange = (value) => {

        // value representa el nuevo estado del switch (true o false)
        console.log("Actualizar estado usuario:", supplier.id, value);

        // Aquí normalmente se llamaría una API para actualizar el estado
        // updatesupplierStatus(supplier.supplier_id, value)
      };

      return (
        // Componente reutilizable para mostrar el switch
        <StatusSwitch
          checked={supplier.estado} // Estado actual del usuario
          onChange={handleChange}  // Función que maneja el cambio
        />
      );
    },
  },

  // Columna de acciones (editar / eliminar)
  {
    id: "actions", // No usa accessorKey porque no corresponde a un campo del usuario
    header: "Acciones",
    // Renderiza el componente de acciones pasando el usuario completo
    cell: ({ row }) => <SupplierRowAction supplier={row.original} />,
  },
];
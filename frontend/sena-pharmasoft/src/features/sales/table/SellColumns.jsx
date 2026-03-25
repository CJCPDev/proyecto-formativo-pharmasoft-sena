// Componente reutilizable que muestra un switch para activar o desactivar estados
import {StatusSwitch} from "@/shared/components";

// Componente que contiene los botones de acciones (editar y eliminar) para cada usuario
import SalesRowActions from "../components/SalesRowActions";

// Definición de las columnas de la tabla de usuarios
// Este arreglo suele usarse en librerías de tablas como TanStack Table
export const sellColumns = [

  // Columna ID
   {
    accessorKey: "id",
    header: "Id"
  },
   {
    accessorKey: "numeroFactura",
    header: "Número de factura"
  },
  {
    accessorKey: "fechaHora",
    header: "Fecha y hora"
  },
  {
    accessorKey: "cliente",
    header: "Cliente"
  },
  {
    accessorKey: "farmaceuta",
    header: "Farmaceuta"
  },



  // Columna Estado (activo / inactivo)
  {
    accessorKey: "is_active",
    header: "Estado",


    // Render personalizado de la celda
    // Permite mostrar un componente en lugar de solo texto
    cell: ({ row }) => {

      // Se obtiene el objeto completo del usuario de la fila
      const sales = row.original;

      // Función que se ejecuta cuando cambia el switch
      const handleChange = (value) => {

        // value representa el nuevo estado del switch (true o false)
        console.log("Actualizar estado usuario:", sales.id, value);

        // Aquí normalmente se llamaría una API para actualizar el estado
        // updateUserStatus(user.user_id, value)
      };

      return (
        // Componente reutilizable para mostrar el switch
        <StatusSwitch
          checked={sales.is_active} // Estado actual del usuario
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
    cell: ({ row }) => <SalesRowActions sales={row.original} />,
  },
];

export default sellColumns

// Componente reutilizable que muestra un switch para activar o desactivar estados
import StatusSwitch from "@/shared/components/StatusSwitch";

// Componente que contiene los botones de acciones (editar y eliminar) para cada producto
import ProductsRowActions from "../components/ProductsRowActions";

// Definición de las columnas de la tabla de productos (medicamentos)
// Este arreglo suele usarse en librerías de tablas como TanStack Table
export const ProductsColumns = [

    // Columna ID
    {
        accessorKey: "id", // Propiedad del objeto producto que se mostrará en la columna
        header: "Id",      // Título de la columna
    },

    // Columna Nombre de medicamento
    {
        accessorKey: "nombreMedicamento", // Campo del objeto producto
        header: "Nombre de medicamento",  // Encabezado visible
    },

    // Columna Forma Farmacéutica
    {
        accessorKey: "formaFarmaceutica", // Campo del objeto producto
        header: "Forma Farmacéutica",     // Encabezado visible
    },

    // Columna Concentración
    {
        accessorKey: "concentracion", // Campo del objeto producto
        header: "Concentración",      // Encabezado visible
    },

    // Columna Vía de Administración
    {
        accessorKey: "viaAdministracion", // Campo del objeto producto
        header: "Vía de Administración",  // Encabezado visible
    },

    // Columna Stock
    {
        accessorKey: "stock", // Campo del objeto producto
        header: "Stock",      // Encabezado visible
    },

    // Columna Fecha de Vencimiento
    {
        accessorKey: "fechaVencimiento", // Campo del objeto producto
        header: "Fecha de vencimiento",  // Encabezado visible
    },

    // Columna Precio de venta 
    {
        accessorKey: "precioVenta", // Campo del objeto producto
        header: "Precio de venta",  // Encabezado visible
    },

    // Columna Estado (activo / inactivo)
    {
        accessorKey: "is_active", // Campo del objeto producto
        header: "Estado",         // Encabezado visible

        // Render personalizado de la celda
        // Permite mostrar un componente en lugar de solo texto
        cell: ({ row }) => {

            // Se obtiene el objeto completo del producto de la fila
            const products = row.original;

            // Función que se ejecuta cuando cambia el switch
            const handleChange = (value) => {
                // value representa el nuevo estado del switch (true o false)
                console.log("Actualizar estado producto:", products.id, value);

                // Aquí normalmente se llamaría una API para actualizar el estado
                // updateProductStatus(product.id, value)
            };

            return (
                // Componente reutilizable para mostrar el switch
                <StatusSwitch
                    checked={products.is_active} // Estado actual del producto
                    onChange={handleChange}     // Función que maneja el cambio
                />
            );
        },
    },

    // Columna de acciones (editar / eliminar)
    {
        id: "actions",
        header: "Acciones", // No usa accessorKey porque no corresponde a un campo del producto

        // Renderiza el componente de acciones pasando el producto completo
        cell: ({ row }) => <ProductsRowActions products={row.original} />,
    },
];

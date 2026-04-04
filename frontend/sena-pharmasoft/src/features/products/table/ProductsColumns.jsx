import StatusSwitch from "@/shared/components/StatusSwitch";
import ProductsRowActions from "../components/ProductsRowActions";

export const ProductsColumns = [
    {
        accessorKey: "id_medicamento",
        header: "Id",
    },
    {
        accessorKey: "nombreMedicamento",
        header: "Nombre de medicamento",
    },
    {
        accessorKey: "formaFarmaceuticaNombre",
        header: "Forma Farmacéutica",
    },
    {
        accessorKey: "concentracion",
        header: "Concentración",
    },
    {
        accessorKey: "viaAdministracionNombre",
        header: "Vía de Administración",
    },
    {
        accessorKey: "stock",
        header: "Stock",
    },
    {
        accessorKey: "fechaVencimiento",
        header: "Fecha de vencimiento",
    },
    {
        accessorKey: "precioVenta",
        header: "Precio de venta",
    },
    {
        accessorKey: "is_active",
        header: "Estado",
        cell: ({ row }) => {
            const products = row.original;
            const handleChange = (value) => {
                console.log("Actualizar estado producto:", products.id_medicamento, value);
            };
            return <StatusSwitch checked={products.is_active} onChange={handleChange} />;
        },
    },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => <ProductsRowActions products={row.original} />,
    },
];
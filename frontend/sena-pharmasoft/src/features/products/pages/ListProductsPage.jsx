import DataTable from "@/shared/components/DataTable"
import { ProductsColumns } from "../table/ProductsColumns"
import { products } from "@/data/products/products"

export default function ListProductsPage() {

    return (
        <div className="p-6">

        <h1 className="text-xl font-semibold mb-4">
            Medicamentos
        </h1>
        <DataTable
            data={products}
            columns={ProductsColumns}
        />

        </div>
    )
}

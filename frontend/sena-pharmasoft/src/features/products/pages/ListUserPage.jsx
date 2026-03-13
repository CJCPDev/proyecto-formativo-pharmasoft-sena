import DataTable from "@/shared/components/DataTable"
import { UserColumns } from "../table/UserColumns"
import { users } from "@/data/user/users"

export default function ListUserPage() {

    return (
        <div className="p-6">

        <h1 className="text-xl font-semibold mb-4">
            Usuarios
        </h1>

        <DataTable
            data={users}
            columns={UserColumns}
        />

        </div>
    )
}

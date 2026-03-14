// Lista de usuarios con opcion de editar, desabilitar o habilitar usuarios

import { Button, Title } from "@/shared/components"
import { Link } from "react-router-dom"
// import ListUserPage from "./ListUserPage"
import { UserColumns } from "../table/UserColumns"
import { users } from "@/data/users/users"

export default function UserListPage (){
    return(
        <div
            className="relative grid gap-6 bg-white rounded-xl shadow-2xl p-4
        ">
            <Title
                title="Lista de Usuarios"
            />
            <div className="flex justify-end gap-6">
                <div className="border rounded-xl h-12 w-auto px-4 flex items-center">
                    <Link to="/crear-usuarios" className="hover:text-text-primary transition hover:underline hover:underline-offset-2">
                        Crear Usuario
                    </Link>
                </div>
                <div className="border rounded-xl h-12 w-auto px-4 flex items-center">
                    <Link to="/ver-usuarios" className="hover:text-text-primary transition hover:underline hover:underline-offset-2">
                        Ver Usuario
                    </Link>
                </div>
            </div>
            <div className="flex gap-12">
                <div className="w-100 h-52 border-2 border-black rounded-3xl">
                    <table> 

                    </table>
                </div>
                {/* <div className="w-xl h-80 border-2 border-black rounded-3xl">
                    <table> 
                        
                    </table>
                </div> */}

        <div className="w-xl h-80 border-2 border-black rounded-3xl overflow-auto">
  <table className="table-fixed w-full border-collapse">
    <thead>
      <tr>
        {UserColumns.map((col) => (
          <th
            key={col.accessorKey || col.id}
            className="border px-2 py-1 text-left"
          >
            {col.header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user.id}>
          {UserColumns.map((col) => (
            <td key={col.accessorKey || col.id} className="border px-2 py-1">
              {col.cell
                ? col.cell({ row: { original: user } }) // Render personalizado (switch, acciones)
                : user[col.accessorKey]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>





            </div>
            <div>
                <Button variant = "secondary">Regresar</Button>
            </div>
        </div>
    )
}
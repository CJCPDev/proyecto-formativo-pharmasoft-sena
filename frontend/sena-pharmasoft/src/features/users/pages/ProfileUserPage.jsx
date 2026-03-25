import {users} from "@/data/users/users.js"
import { CardUser } from "@/features/users"
import { useParams } from "react-router-dom"

export default function ProfileUserPage (){
    const { id } = useParams();
    const user = users.find((u) => u.id === Number(id))

        return(

        <div className="relative bg-white rounded-xl shadow-2xl">
            { user && <CardUser user ={user} />}
        </div>
        )
    }
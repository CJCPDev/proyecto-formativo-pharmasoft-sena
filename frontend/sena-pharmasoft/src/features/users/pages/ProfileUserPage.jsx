import {users} from "@/data/users/users.js"
import { CardUser } from "@/features/users"

export default function ProfileUserPage (){
        const user = users.find(prod => prod.id)

        return(

        <div className="relative bg-white rounded-xl shadow-2xl">
            {/* {products.map((product) => ( <Card key={product.id} product={product} />))} */}

            { user && <CardUser user ={user} />}

            </div>
        )

}
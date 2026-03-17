import users from "../../../data/user/users.js"
import { CardUser } from "@/features/users"

export default function ProfilePage (){
        const user = users.find(prod => prod.id === 1)

        return(

        <div className=" 
            relative rounded-xl
        ">
            {/* {products.map((product) => ( <Card key={product.id} product={product} />))} */}

            { user && <CardUser user ={user} />}

            </div>
        )

}

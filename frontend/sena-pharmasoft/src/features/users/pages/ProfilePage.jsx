import users from "../../../data/users/users.js"
import { CardUser } from "@/features/users"

export default function ProfilePage (){
<<<<<<< luis-creacion-formulario-usuarios
        const user = users.find(prod => prod.id === 1)
=======
        const user = users.find(prod => prod.id === 2)
>>>>>>> dev

        return(

        <div className=" 
            relative rounded-xl
        ">
            {/* {products.map((product) => ( <Card key={product.id} product={product} />))} */}

            { user && <CardUser user ={user} />}
<<<<<<< luis-creacion-formulario-usuarios

            </div>
        )

}
=======
             </div>
            )
}
>>>>>>> dev

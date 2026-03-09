import users from "../../../data/user/users.js"
import ProfileUserPage from "../../users/pages/ProfileUserPage"

export default function ProfilePage (){
        const user = users.find(prod => prod.id === 1)

        return(

            <div className=" 
            grid 
            gap-8
            sm: grid-cols-2
            lg: grid-cols-3
            xl: grid-cols-4
            justify-items-center 
        ">
            {/* {products.map((product) => ( <Card key={product.id} product={product} />))} */}

            { user && <ProfileUserPage user ={user} />}

            </div>
        )

}

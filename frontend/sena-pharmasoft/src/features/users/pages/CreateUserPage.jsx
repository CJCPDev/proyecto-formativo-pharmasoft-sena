import UserForm from "@/features/users/components/UserForm"

// export default function ProfilePage (){


//     return(
//         <section>
//             <div>
//                 <UserForm/>
//             </div>
//         </section>
//     )
// }

// import SuppliersForm from "./../componentes/SuppliersForm"
export default function CreateUserPage (){
    return(
        <div
           className="relative bg-white rounded-xl shadow-2xl p-8
        ">

            <UserForm/>
        </div>
        
    )
}
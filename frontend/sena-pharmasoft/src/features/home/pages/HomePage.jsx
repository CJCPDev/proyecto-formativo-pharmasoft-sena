import {Cards} from "@/features/dashboard"
import HomeNavbar from "../components/HomeNavbar"

export default function HomePage (){
    // const product = products.find(prod => prod.id === 1)
    return(
        <div>
            <HomeNavbar/>
            <Cards/>
        </div>
    )
}

import {Cards} from "@/features/dashboard"
import HomeNavbar from "../components/HomeNavbar"
import { SideCategory, SidebarCategory } from "../../dashboard"
import Footer from "../../../shared/layout/Footer"
import { Carousel } from "@/features/home"
import { useNavigate } from "react-router-dom"

export default function HomePage (){
    // const product = products.find(prod => prod.id === 1)
    const navigate = useNavigate()

    return(
        <div className=" grid grid-cols-1 bg-brand-soft/20">
            <HomeNavbar/>
            <Carousel/>

            <div className="flex pt-8">
                <SidebarCategory/>
                <button 
                    onClick={() => navigate("ver-medicamento/:id") }>
                    <Cards/>
                </button>
            </div>
            <Footer/>
        </div>

    )
}

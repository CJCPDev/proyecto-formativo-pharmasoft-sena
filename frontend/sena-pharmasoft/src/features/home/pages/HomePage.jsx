import {Cards} from "@/features/dashboard"
import HomeNavbar from "../components/HomeNavbar"
import { SideCategory, SidebarCategory } from "../../dashboard"
import Footer from "../../../shared/layout/Footer"
import { Carousel } from "@/features/home"

export default function HomePage (){
    // const product = products.find(prod => prod.id === 1)
    return(
        <div className=" grid bg-brand-soft/20">
            <HomeNavbar/>
            <Carousel/>

            <div className="flex pt-8">
{/*                 <SidebarCategory/> */}
                <Cards/>
            </div>
            <Footer/>
        </div>

    )
}

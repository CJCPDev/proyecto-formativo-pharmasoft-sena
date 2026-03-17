import {Cards} from "@/features/dashboard"
import HomeNavbar from "../components/HomeNavbar"
import { SideCategory, SidebarCategory } from "../../dashboard"
import Footer from "../../../shared/layout/Footer"

export default function HomePage (){
    // const product = products.find(prod => prod.id === 1)
    return(
        <div className="grid grid-cols-1 bg-brand-soft/20">
            <HomeNavbar/>
            <div className="flex pt-8">
                <SidebarCategory/>
                <Cards/>
            </div>
            <Footer/>
        </div>
    )
}

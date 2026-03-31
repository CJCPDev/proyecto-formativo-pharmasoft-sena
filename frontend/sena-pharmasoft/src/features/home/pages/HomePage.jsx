import {Cards} from "@/features/dashboard"
import HomeNavbar from "../components/HomeNavbar"
import { SideCategory, SidebarCategory } from "../../dashboard"
import Footer from "../../../shared/layout/Footer"
import { Carousel } from "@/features/home"
// import { useNavigate } from "react-router-dom"

export default function HomePage (){


    return(
        <div className="grid bg-brand-soft/10">
            <div className="mb-2">
                <HomeNavbar/>
            </div>
            <div>
                <Carousel/>
            </div>
            

            <div className="flex pt-8">
  {/*               <SidebarCategory/> */}
                <Cards/>
            </div>
            <Footer/>
        </div>

    )
}

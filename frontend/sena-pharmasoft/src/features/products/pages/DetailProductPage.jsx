import {useParams} from "react-router-dom";
import DetailCard from "../components/DetailCard"
import { products } from "@/features/home/services/products.js"
import HomeNavbar from "@/features/home/components/HomeNavbar"
<<<<<<< HEAD
import { Button } from "@/shared/components"
=======
import Footer from "../../../shared/layout/Footer"
>>>>>>> piloto_backend

export default function DetailProductPage (){
    
    const params = useParams();
    const product = products.find(prod => prod.id == params.id);
    
    return(
        <div className="min-h-screen flex flex-col">
            <HomeNavbar/>
            <section
                className="relative m-auto w-full flex items-center justify-center text-black"
            >
                <div>
                    {product && <DetailCard product = {product}/>}
                </div>
            </section>
<<<<<<< HEAD
=======
            <Footer/>
>>>>>>> piloto_backend
        </div>
    )
}
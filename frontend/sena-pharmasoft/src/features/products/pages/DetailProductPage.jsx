// import { useParams } from "react-router-dom";
// import DetailCard from "../components/DetailCard";
// import { products } from "@/features/home/services/products.js";
// import HomeNavbar from "@/features/home/components/HomeNavbar";
// import Footer from "../../../shared/layout/Footer";
// import { useState } from "react";
// import AuthModal from "@/features/home/components/AuthModal";

// export default function DetailProductPage() {
//     const params = useParams();
//     const product = products.find(prod => prod.id == params.id);

//     const [openLogin, setOpenLogin] = useState(false);
//     const [openRegister, setOpenRegister] = useState(false);
//     const [shouldOpenCart, setShouldOpenCart] = useState(false);

//     return (
//         <div className="min-h-screen flex flex-col">

//             {/* Modal de autenticación */}
//             <AuthModal
//                 openLogin={openLogin}
//                 openRegister={openRegister}
//                 setOpenLogin={setOpenLogin}
//                 setOpenRegister={setOpenRegister}
//             />

//             {/* Navbar */}
//             <HomeNavbar
//                 setOpenLogin={setOpenLogin}
//                 shouldOpenCart={shouldOpenCart}
//                 setShouldOpenCart={setShouldOpenCart}
//             />

//             {/* Contenido */}
//             <section className="relative m-auto w-full flex items-center justify-center text-black">
//                 <div>
//                     {product && <DetailCard product={product} />}
//                 </div>
//             </section>

//             <Footer />
//         </div>
//     );
// }




import {useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import DetailCard from "../components/DetailCard"
import { getAllProducts } from "@/features/products/services/productService.js";
import HomeNavbar from "@/features/home/components/HomeNavbar"
import Footer from "../../../shared/layout/Footer"

export default function DetailProductPage (){
    const [products, setProducts] = useState([]);
    const params = useParams();
    const product = products.find(prod => prod.id_medicamento == params.id_medicamento);
    
    useEffect(() => {
        getAllProducts().then(data => {
            setProducts(data);
        });
    }, []);
    return(
        <div>
            <HomeNavbar
                showSearch={false}
            />
            <div className="min-h-screen m-auto w-full flex items-center justify-center text-black">
                {product && <DetailCard product = {product}/>}
            </div>
            <Footer/>
        </div>
            
    )
}
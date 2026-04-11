// import {useParams} from "react-router-dom";
// import DetailCard from "../components/DetailCard"
// import { products } from "@/features/home/services/products.js"
// import HomeNavbar from "@/features/home/components/HomeNavbar"
// import Footer from "../../../shared/layout/Footer"

// export default function DetailProductPage (){
    
//     const params = useParams();
//     const product = products.find(prod => prod.id == params.id);
    
//     return(
//         <div className="min-h-screen flex flex-col">
//             <HomeNavbar/>
//             <section
//                 className="relative m-auto w-full flex items-center justify-center text-black"
//             >
//                 <div>
//                     {product && <DetailCard product = {product}/>}
//                 </div>
//             </section>
//             <Footer/>
//         </div>
//     )
// }
// useParams permite leer el id del producto desde la URL
import { useParams } from "react-router-dom";

// Tarjeta que muestra el detalle completo de un producto
import DetailCard from "../components/DetailCard"

// Array local de productos desde el que se busca el producto a mostrar
import { products } from "@/features/home/services/products.js"

// Barra de navegación de la sección pública de la tienda
import HomeNavbar from "@/features/home/components/HomeNavbar"

// Pie de página compartido en toda la aplicación
import Footer from "../../../shared/layout/Footer"

export default function DetailProductPage() {

    const params = useParams();

    // Buscamos en el array local el producto cuyo id coincide con el de la URL.
    // Se usa == en lugar de === porque el id de la URL siempre es string
    // y el id del array puede ser número.
    const product = products.find(prod => prod.id == params.id);

    return (
        <div className="min-h-screen flex flex-col">

            {/* Barra de navegación fija en la parte superior */}
            <HomeNavbar />

            {/* Sección principal centrada que muestra la tarjeta de detalle */}
            <section className="relative m-auto w-full flex items-center justify-center text-black">
                <div>
                    {/* Solo renderizamos la tarjeta si el producto fue encontrado en el array */}
                    {product && <DetailCard product={product} />}
                </div>
            </section>

            {/* Pie de página al final de la pantalla */}
            <Footer />
        </div>
    )
}
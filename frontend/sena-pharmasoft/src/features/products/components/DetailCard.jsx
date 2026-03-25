import { ShoppingCart, Undo2 } from "lucide-react";
import { Button } from "@/shared/components";
import { useNavigate} from "react-router-dom";

export default function DetailCard({product}) {

    const {title, image, price, description, marca } = product; 
    const navigate = useNavigate();
    return(
        <div
            className="
            grid grid-cols-3 grid-rows-4 gap-6
            font-main
            w-225
            dark:bg-white/60
            backdrop-blur-lg
            shadow-lg
            border
            border-brand-hover/10
            rounded-2xl
            overflow-hidden
            hover:shadow-brand-hover/50
            transition-shadow
            duration-700
            p-6
            "
        >
            <button className="h-10 w-12 rounded-xl bg-brand-softv2 hover:bg-brand-hover hover:text-brand-soft" onClick={() => navigate(-1)}>
                <Undo2 className="m-auto"/>
            </button>
            <div className="row-span-3 col-start-1 row-start-2 w-full h-full  ">
                <img 
                src={image}
                alt={title}
                className="object-contain bg-white rounded-2xl"
            />
            </div>
            

            <div className="col-span-2 row-span-2 col-start-2 row-start-1 ml-4">
                <h2 className="text-2xl font-bold text-black mb-4">
                    {title}
                </h2>
                <h2 className="text-secondary font-bold text-black" >
                    Marca: 
                </h2> 
                <p className="mb-2">
                    {marca}
                </p>
                <h2 className="text-secondary font-bold text-black">
                    Descripción:
                </h2>
                <p className="mb-4">
                    {description}
                </p>
            </div>
            <div className="row-span-2 col-start-2 row-start-3 ml-4">
                <p className="text-4xl font-medium text-brand-hover" >
                    ${price.toLocaleString()}
                </p>
            </div>
            <div className="row-span-2 col-start-3 row-start-3">
                <div className="w-full grid grid-cols-1 justify-items-center">
                    <Button variant="secondary">
                        Comprar ahora 
                    </Button>
                    <button className="flex gap-2 w-40 h-10 mt-4 items-center px-3 text-white font-extrabold bg-brand-hover/90 rounded-xl cursor-pointer hover:bg-brand-hover/80">
                        <ShoppingCart className="stroke-brand-soft size-4"/>
                        Agregar al carrito
                    </button>
                </div>
            </div>  
        </div>

    )
}

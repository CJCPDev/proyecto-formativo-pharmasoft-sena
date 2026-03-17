import { ShoppingCart } from "lucide-react";

export default function Card({product}) {

    const {title, image, price, description } = product; 


    return(
        <div
            className="
            w-70
            h-80
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
            p-4
            "
        >
            <img 
                src={image}
                alt={title}
                className="w-full h-42 object-contain bg-white rounded-2xl"
            />

            <div className="grid ">
                <h2 className="text-xl text-secondary font-light text-black">
                    {title}
                </h2>

                <p className="text-small-label text-black">
                    {description}
                </p>

                <p className="text-3xl font-medium text-brand-hover" >
                    ${price.toLocaleString()}
                </p>
                <div className="flex mt-2 gap-6 bg-brand-hover/90 w-full h-10 rounded-full cursor-pointer hover:bg-brand-hover/80">
                            <ShoppingCart className="stroke-brand-soft ml-6 my-auto"/>
                        <button className="text-white py-auto font-extrabold text-xl cursor-pointer">
                            Agregar al carrito
                        </button>
                </div>
            </div>
        </div>

    )
}

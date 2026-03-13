import { ShoppingCart } from "lucide-react";

export default function Card({product}) {

    const {title, image, price, description } = product; 


    return(
        <div
            className="
            w-70
            h-80
            dark:bg-brand-hover/60
            backdrop-blur-lg
            shadow-lg
            rounded-2xl
            overflow-hidden
            hover:shadow-brand-hover/60
            transition-shadow
            duration-700
            p-4
            "
        >
            <img 
                src={image}
                alt={title}
                className="w-full h-48 object-cover bg-white rounded-2xl"
            />

            <div className="grid">
                <h2 className="text-xl text-secondary font-light">
                    {title}
                </h2>

                <p className="text-small-label">
                    {description}
                </p>

                <p className="text-lg font-bold text-brand-fort" >
                    ${price.toLocaleString()}
                </p>
                <button className="mt-2 bg-brand-fort/70 w-10 h-6 rounded-sm cursor-pointer ">
                    <ShoppingCart className="stroke-brand-soft mx-auto"/>
                </button>

            </div>
        </div>

    )
}

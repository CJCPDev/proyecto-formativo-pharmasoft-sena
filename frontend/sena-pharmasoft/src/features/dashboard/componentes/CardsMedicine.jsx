import { Card } from "@/shared/components"
import { products } from "@/features/home/services/products.js"

export default function CardsMedicine (){
    // const product = products.find(prod => prod.id === 1)
    return(
        <section className="
          relative  w-full flex items-center justify-center text-black pt-8"
        >
            <div className="relative z-10 text-center text-text-inverse">
                <div className="
                    grid
                    gap-8
                    sm:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                    justify-items-center
                ">
                    {/* se renderiza la lista qie contiene todas las card */}
                    {products.map((product) => (<Card key = {product.id} product = {product}/>))}
                </div>
            </div>
        </section>
    )
}

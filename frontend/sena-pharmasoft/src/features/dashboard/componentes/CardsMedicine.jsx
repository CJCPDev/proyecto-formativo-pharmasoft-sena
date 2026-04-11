import { Card } from "@/shared/components"
import { getAllProducts, searchProducts } from "@/features/products/services/productService.js";
import { useEffect, useState } from "react";

export default function CardsMedicine ({onProductoAgregado, searchQuery}){
    // const product = products.find(prod => prod.id === 1)
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (searchQuery && searchQuery.trim() !== "") {
            searchProducts(searchQuery).then(setProducts);
        } else {
            getAllProducts().then(setProducts);
        }
    }, [searchQuery]);
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
                    {products.length > 0 ? (
                        products.map((product) => (
                            <Card
                                key={product.id_medicamento}
                                product={product}
                                onProductoAgregado={onProductoAgregado}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-4">No se encontraron productos.</p>
                    )}
                </div>
            </div>
        </section>
    )
}

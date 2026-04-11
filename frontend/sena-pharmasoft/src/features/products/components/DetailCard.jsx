
// Iconos de lucide-react: ShoppingCart para el botón del carrito, Undo2 para regresar
import { ShoppingCart, Undo2 } from "lucide-react";

// Botón reutilizable del sistema de diseño
import { Button } from "@/shared/components";

// useNavigate permite redirigir programáticamente
import { useNavigate } from "react-router-dom";

// Recibe un objeto product con todos los datos del medicamento a mostrar
export default function DetailCard({ product }) {

    // Desestructuramos las propiedades del producto para usarlas directamente
    const { title, image, price, description, marca, detail, stock } = product;
    const navigate = useNavigate();

    return (
        // Contenedor principal en grilla de 4 columnas y 2 filas
        // para organizar la imagen, la info y las acciones
        <div
            className="
            grid grid-cols-4 grid-rows-2 gap-6
            font-main
            w-225
            dark:bg-white/60
            backdrop-blur-lg
            shadow-lg
            border
            border-brand-hover/10
            rounded-2xl
            overflow-hidden
            p-6
            "
        >
            {/* Imagen del producto ocupando las 2 filas de las primeras 2 columnas */}
            <div className="row-span-2 col-span-2 col-start-1 row-start-1 w-75 h-auto">
                <img
                    src={image}
                    alt={title}
                    className="object-contain bg-white rounded-2xl"
                />
            </div>

            {/* Información del producto: nombre, marca, descripción, detalle y precio */}
            <div className="row-span-2 col-start-3 row-start-1">
                <h2 className="text-2xl font-bold text-black mb-4">
                    {title}
                </h2>
                <h2 className="text-secondary font-bold text-black">
                    Marca:
                </h2>
                <p className="mb-2">{marca}</p>

                <h2 className="text-secondary font-bold text-black">
                    Descripción:
                </h2>
                <p className="mb-2">{description}</p>

                <h2 className="text-secondary font-bold text-black">
                    Detalle:
                </h2>
                <p className="mb-2">{detail}</p>

                {/* Precio formateado con separadores de miles según la localización */}
                <p className="text-4xl font-medium text-brand-hover mt-2.5">
                    ${price.toLocaleString()}
                </p>
            </div>

            {/* Botón de regresar ubicado en la esquina superior derecha */}
            <div className="row-start-1 grid justify-end">
                {/* navigate(-1) regresa a la pantalla anterior en el historial */}
                <button
                    className="h-10 w-12 rounded-xl bg-brand-softv2 hover:bg-brand-hover hover:text-brand-soft"
                    onClick={() => navigate(-1)}
                >
                    <Undo2 className="m-auto" />
                </button>
            </div>

            {/* Sección de acciones: stock disponible y botones de compra */}
            <div className="col-start-4 row-start-2">
                <div className="w-full grid grid-cols-1 gap-4 justify-items-center">
                    <h2 className="text-secondary font-bold text-black">
                        Stock: {`${stock} unidades`}
                    </h2>

                    {/* Botón de compra directa usando el componente reutilizable */}
                    <Button variant="secondary">
                        Comprar ahora
                    </Button>

                    {/* Botón para agregar al carrito con icono y texto */}
                    <button className="flex gap-2 w-40 h-12 items-center px-3 text-white font-extrabold bg-brand-hover/90 rounded-xl cursor-pointer hover:bg-brand-hover/80">
                        <ShoppingCart className="stroke-brand-soft size-4" />
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    )
}
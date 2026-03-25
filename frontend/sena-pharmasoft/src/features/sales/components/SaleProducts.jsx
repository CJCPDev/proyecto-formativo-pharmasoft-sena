import {Title, Input, Select, Button} from "@/shared/components"
import { Trash, Pencil } from "lucide-react";
import { useState } from "react";


export default function SaleProducts(){

  const [products, setProducts] = useState([
    { id: 1, name: "Acetaminofén", quantity: 2, price: 2000 },
    { id: 2, name: "Ibuprofeno", quantity: 1, price: 3000 },
  ]);

const handleDelete = (id) => {
  setProducts(products.filter(p => p.id !== id));
};

    return(
        <div className="bg-white grid gap-2 w-full h-full p-6 rounded-lg font-main">
            <div>
                <Title
                    title="Descripcion de productos"
                ></Title>
                    <div className="grid grid-cols-6 w-full text-center bg-brand-hover ">
                        <span className="border border-l border-gray-200 text-white">Producto</span>
                        <span className="border border-l border-gray-200 text-white">Cantidad</span>
                        <span className="border border-l border-gray-200 text-white">Valor Und</span>
                        <span className="border border-l border-gray-200 text-white">Iva</span>
                        <span className="border border-l border-gray-200 text-white">Valor Total</span>
                        <span className="border border-l border-gray-200 text-white">Actions</span>
                    </div>
 <div className="h-40 overflow-auto ">
  {products.map((item) => (
    <div key={item.id} className="grid grid-cols-6 text-center">

      <span className="border border-gray-200">{item.name}</span>
      <span className="border border-gray-200">{item.quantity}</span>
      <span className="border border-gray-200">{item.price}</span>
      <span className="border border-gray-200">{(item.price * 0.19) * item.quantity}</span>
      <span className="border border-gray-200">
        {((item.price ) + (item.price * 0.19)) * (item.quantity)}
      </span>
      <div className="border border-gray-200 flex gap-4 justify-center items-center">
            <div className="relative group w-max">
                <button className="cursor-pointer ">
                    <Pencil className="w-4 h-4 stroke-brand-fort" />
                </button>
                        <span className="
                            absolute
                            top-5
                            -right-3
                            opacity-0 
                            group-hover:opacity-100
                            transition-opacity duration-700
                            bg-brand-hover
                            text-white
                            text-sm 
                            p-1
                            rounded
                            z-15
                        ">Editar
                    </span>
            </div>
            <div className="relative group w-max">
                <button className="cursor-pointer border-none"
                onClick={() => handleDelete(item.id)}>
                    <Trash className="w-4 h-4 stroke-red-600" />
                </button>
                        <span className="
                            absolute
                            top-5
                            -right-5
                            opacity-0 
                            group-hover:opacity-100
                            transition-opacity duration-700
                            bg-red-600
                            text-white
                            text-sm 
                            p-1
                            rounded
                            z-15
                        ">Eliminar
                    </span>
            </div>
        </div>
    </div>
  ))}
</div>

                <div className="grid grid-cols-4 gap-4 mx-auto">
                    <div className="col-span-2  mx-auto">
                        <Input
                        disabled
                        label = 'Subtotal'/>
                    </div>
                    <div className="col-span-2 mx-auto">
                        <Input
                        disabled
                        label = 'Iva'
                        placeholder="Iva"/>
                    </div>
                    <div className="col-span-4  mx-auto">
                        <Input
                        disabled
                        label = 'Total Venta'
                        placeholder="Total Venta"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 mx-auto pt-4 ">
                    <div className="flex col-span-1 mx-auto gap-6">
                        <Button>Cancelar</Button>
                        <Button>Crear</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
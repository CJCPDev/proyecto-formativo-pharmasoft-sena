import { Title, Input, Button } from "@/shared/components"
import { Trash, Pencil } from "lucide-react";

export default function SaleProducts({
  products,
  setProducts,
  subtotal,
  iva,
  total,
  handleSubmit
}) {

  const handleDelete = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="bg-white grid gap-2 w-full h-full p-6 rounded-lg font-main">
      <div>
        <Title title="Descripcion de productos" />

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
              <span className="border border-gray-200">
                {(item.price * 0.19) * item.quantity}
              </span>
              <span className="border border-gray-200">
                {(item.price + item.price * 0.19) * item.quantity}
              </span>

              <div className="border border-gray-200 flex gap-4 justify-center items-center">

                <button className="cursor-pointer">
                  <Pencil className="w-4 h-4 stroke-brand-fort" />
                </button>

                <button
                  className="cursor-pointer border-none"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash className="w-4 h-4 stroke-red-600" />
                </button>

              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-4 mx-auto">
          <div className="col-span-2 mx-auto">
            <Input disabled label='Subtotal' value={subtotal} />
          </div>
          <div className="col-span-2 mx-auto">
            <Input disabled label='Iva' value={iva} />
          </div>
          <div className="col-span-4 mx-auto">
            <Input disabled label='Total Venta' value={total} />
          </div>
        </div>

        <div className="grid grid-cols-1 mx-auto pt-4 ">
          <div className="flex col-span-1 mx-auto gap-6">
            <Button onClick={handleSubmit}>Crear</Button>
          </div>
        </div>

      </div>
    </div>
  )
}
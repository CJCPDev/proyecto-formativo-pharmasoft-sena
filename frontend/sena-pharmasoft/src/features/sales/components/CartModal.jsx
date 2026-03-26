import { useState } from "react";
import { Button } from "@/shared/components";
import { X, Plus, Minus  } from "lucide-react";



export default function CartModal({ isOpen, onClose }) {

  const [success, setSuccess] = useState(false);
  const [cart, setCart] = useState([
    {
      id: 1,
      nombre: "Acetaminofén",
      precio: 2000,
      cantidad: 2,
      imagen: "https://copservir.vtexassets.com/arquivos/ids/1803618-1200-auto?v=639032882890300000&width=1200&height=auto&aspect=true"
    },
    {
      id: 2,
      nombre: "Ibuprofeno",
      precio: 3000,
      cantidad: 1,
      imagen: "https://copservir.vtexassets.com/arquivos/ids/1634111-1200-auto?v=638884240968130000&width=1200&height=auto&aspect=true"
    }
  ]);

  if (!isOpen) return null;

  const increase = (id) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, cantidad: item.cantidad + 1 }
        : item
    ));
  };

  const decrease = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.cantidad > 1
        ? { ...item, cantidad: item.cantidad - 1 }
        : item
    ));
  };

  const remove = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const handleCheckout = () => {
  setSuccess(true);      // mostrar mensaje
  setCart([]);           // vaciar carrito

  setTimeout(() => {
    setSuccess(false);
    onClose();           // cerrar modal
  }, 2000); // 2 segundos
};

return (
  <div className="fixed inset-0 bg-black/30 flex justify-end z-50">
    
    <div className="bg-white w-90 h-full p-5 flex flex-col">
      {success ? (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-3 text-center">
          ✅ Compra realizada con éxito
        </div>
      ) : (
        <div className="flex flex-col h-full">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-brand-hover">Productos Seleccionados</h2>
            <button className="cursor-pointer hover:text-red-600" onClick={onClose}>
              <X/>
            </button>
          </div>

          {/* Contenedor de los productos */}
          <div className="flex flex-col gap-6 overflow-y-auto flex-1">

            {cart.map(item => (
              <div
                key={item.id}
                className="flex gap-8 border-b border-brand-hover pb-3 "
              >

                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="w-20 h-20 object-cover rounded-md"
                />

                <div className="flex flex-col flex-1">
                  <p className="font-semibold">{item.nombre}</p>
                  <p className="text-sm text-brand-hover font-bold">
                    ${item.precio}
                  </p>

                  <div className="flex items-center gap-4 mt-2">

                    <button onClick={() => decrease(item.id)}>
                      <Minus size={12} className="stroke-brand-hover"/>
                    </button>

                    <span>{item.cantidad}</span>

                    <button onClick={() => increase(item.id)}>
                      <Plus size={12} className="stroke-brand-hover"/>   
                    </button>

                    <button
                      onClick={() => remove(item.id)}
                      className="text-red-500 ml-auto cursor-pointer"
                    >
                      Eliminar
                    </button>

                  </div>
                </div>

              </div>
            ))}

          </div>

          {/* FOOTER */}
          <div className="pt-4 border-t">
            <h3 className="font-bold mb-3">
              Total: ${total}
            </h3>

            <Button
              className="w-full cursor-pointer hover:text-brand-fort z-10"
              onClick={handleCheckout}
            >
              Finalizar compra
            </Button>
          </div>

        </div>
      )}
    </div>
  </div>
)
}
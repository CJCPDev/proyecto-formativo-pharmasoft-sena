import { Title, Input, Button } from "@/shared/components";
import { Trash, Pencil } from "lucide-react";
import { useState, useMemo } from "react";
import { createSale } from "../services/saleService";

export default function SaleProducts({ products = [], setProducts, saleData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // ================== DELETE ==================
  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // ================== UPDATE PRODUCT ==================
  const handleUpdateProduct = () => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === selectedProduct.id ? selectedProduct : p
      )
    );

    setIsModalOpen(false);
  };

  // ================== CALCULOS ==================
  const subtotal = useMemo(() => {
    return products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }, [products]);

  const iva = useMemo(() => subtotal * 0.19, [subtotal]);

  const total = useMemo(() => subtotal + iva, [subtotal, iva]);

  // ================== CREATE SALE ==================
  const handleCreateSale = async () => {
    if (products.length === 0) {
      alert("No hay productos");
      return;
    }

    setLoading(true);

    try {
   
      const payload = {
        ...saleData, 
        subtotal_venta: subtotal,
        iva_venta: iva,
        descuento_venta: 0,
        total_venta: total,
        productos: products,
      };

      const response = await createSale(payload);

      console.log("Venta creada:", response);

      setProducts([]); 
    } catch (error) {
      console.error("Error creando venta:", error?.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="bg-white w-full h-190 p-8 rounded-lg font-main flex flex-col">
<div className="flex justify-between items-center mb-3">
  <Title title="Descripcion de productos" />

{/*   
    esta por diseño para mejorar 
  <Button onClick={() => {
      
      setSelectedProduct({
        id: Date.now(),
        name: "",
        price: 0,
        quantity: 1
      });
      setIsModalOpen(true);
    }}>
      + Agregar producto
    </Button> */}
</div>
      <Title title="Descripcion de productos" />

      {/* TABLA HEADER */}
      <div className="grid grid-cols-6 w-full text-center bg-brand-hover mt-2">
        <span className="border text-white">Producto</span>
        <span className="border text-white">Cantidad</span>
        <span className="border text-white">Valor Und</span>
        <span className="border text-white">Iva</span>
        <span className="border text-white">Valor Total</span>
        <span className="border text-white">Actions</span>
      </div>

      {/* LISTA */}
      <div className="flex-1 overflow-y-auto">
        {products.length === 0 ? (
          <p className="text-center mt-4 text-black/40">
            No hay productos cargados
          </p>
        ) : (
          products.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-6 text-center items-stretch w-full min-h-20"
            >
              <div className="border flex items-center gap-2 p-2">
              <img src={item.image} alt={`imagen  ${item.name}`} className="h-16 w-20" />
                <span>{item.name}</span>
              </div>

              <span className="border flex justify-center items-center">
                {item.quantity}
              </span>

              <span className="border flex justify-center items-center">
                {item.price}
              </span>

              <span className="border flex justify-center items-center">
                {(item.price * 0.19 * item.quantity).toFixed(2)}
              </span>

              <span className="border flex justify-center items-center">
                {(item.price * 1.19 * item.quantity).toFixed(2)}
              </span>

              <div className="border flex gap-4 justify-center items-center">
                <button
                  onClick={() => {
                    setSelectedProduct(item);
                    setIsModalOpen(true);
                  }}
                >
                  <Pencil className="w-6 h-6 stroke-brand-fort" />
                </button>

                <button onClick={() => handleDelete(item.id)}>
                  <Trash className="w-6 h-6 stroke-red-600" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-3 border-t pt-3 flex flex-col gap-3">

        <div className="grid grid-cols-3 gap-3">
          <Input disabled label="Subtotal" value={subtotal.toFixed(2)} />
          <Input disabled label="IVA" value={iva.toFixed(2)} />
          <Input disabled label="Total" value={total.toFixed(2)} />
        </div>

        <div className="flex justify-end gap-2">
          <Button
            className="px-3 py-1 text-xs bg-red-600/90 text-white"
            onClick={() => setProducts([])}
          >
            Cancelar
          </Button>

          <Button
            onClick={handleCreateSale}
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear venta"}
          </Button>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-100 flex flex-col gap-2">
            <h2 className="text-center font-bold">Editar producto</h2>

            <Input
              label="Producto"
              value={selectedProduct?.name || ""}
              disabled
            />

            <Input
              label="Cantidad"
              type="number"
              value={selectedProduct?.quantity || 1}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  quantity: Number(e.target.value),
                })
              }
            />

            <Input
              label="Precio"
              type="number"
              value={selectedProduct?.price || 0}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  price: Number(e.target.value),
                })
              }
            />

            <div className="flex justify-end gap-4">
              <Button onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>

              <Button onClick={handleUpdateProduct}>
                Actualizar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
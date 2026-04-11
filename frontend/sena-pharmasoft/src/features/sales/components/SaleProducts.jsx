import { Title, Input, Button } from "@/shared/components";
import { Trash, Pencil } from "lucide-react";
import { useState, useMemo } from "react";
import { createSale } from "../services/saleService";
import {FacturaPos} from "@/features/sales";

export default function SaleProducts({
  products = [],
  setProducts,
  saleData,
  setSaleData,
  saleCreated,
  setSaleCreated
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
const [showFactura, setShowFactura] = useState(false);
const [isLocked, setIsLocked] = useState(false);

const handlePrintFactura = () => {
  setShowFactura(true);

  setTimeout(() => {
    const content = document.getElementById("invoice");

    if (!content) return;

    const win = window.open("", "_blank");

    win.document.write(`
      <html>
        <body>${content.innerHTML}</body>
      </html>
    `);

    win.document.close();
    win.print();
  }, 300); // 👈 espera render
};


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
      usuario: saleData.usuario,
      farmaceuta: saleData.farmaceuta,
      subtotal_venta: subtotal,
      descuento_venta: 0,
      productos: products,
    };

    const response = await createSale(payload);
    const data = response?.data || response;

    setSaleData((prev) => ({
      ...prev,
      numeroFactura: data.numeroFactura || data.id_factura,
      fecha: data.fechaHora || data.fecha_hora,
    }));

    // 🔥 bloquear pantalla
    setIsLocked(true);
    setSaleCreated(true);
    setShowFactura(true);

    // 🔥 después de unos segundos redirigir

  } catch (error) {
    console.error("Error creando venta:", error);
  } finally {
    setLoading(false);
  }
};

  // ================== PRINT ==================
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white w-full h-190 p-8 rounded-lg font-main flex flex-col">

      <Title title="Descripción de productos" />

      {/* TABLA */}
      <div className="grid grid-cols-6 text-center bg-brand-hover mt-2">
        <span className="border text-white">Producto</span>
        <span className="border text-white">Cantidad</span>
        <span className="border text-white">Valor Und</span>
        <span className="border text-white">IVA</span>
        <span className="border text-white">Total</span>
        <span className="border text-white">Actions</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {products.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-6 text-center items-center min-h-16"
          >
            <span className="border">{item.name}</span>
            <span className="border">{item.quantity}</span>
            <span className="border">{item.price}</span>
            <span className="border">
              {(item.price * 0.19 * item.quantity).toFixed(2)}
            </span>
            <span className="border">
              {(item.price * 1.19 * item.quantity).toFixed(2)}
            </span>

            <div className="border flex justify-center gap-2">
              <button onClick={() => {
                setSelectedProduct(item);
                setIsModalOpen(true);
              }}>
                <Pencil size={18} />
              </button>

              <button onClick={() => handleDelete(item.id)}>
                <Trash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* TOTALES */}
      <div className="mt-4 border-t pt-2 flex justify-between">
        <span>Total:</span>
        <span>{total.toFixed(2)}</span>
      </div>

      {/* BOTONES */}
      <div className="flex justify-end gap-2 mt-4">

        <Button
        disabled={isLocked}
          onClick={() => setProducts([])}
          className="bg-red-600 text-white"
        >
          Cancelar
        </Button>

        <Button
          onClick={handleCreateSale}
          disabled={isLocked || loading }
        >
          {loading ? "Creando..." : "Crear venta"}
        </Button>

        {/* 👇 SOLO APARECE SI YA SE CREÓ */}
        {saleCreated && (
          <Button
            onClick={handlePrint}
            className="bg-green-600 text-white"
          >
            Imprimir factura
          </Button>
        )}
      </div>

      {/* FACTURA MODAL */}
{showFactura && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    
    <div className="bg-white p-4 rounded-lg shadow-lg relative">
      
      {/* BOTÓN CERRAR */}
      <button
        className="absolute top-2 right-2 text-red-500"
        onClick={() => setShowFactura(false)}
      >
        ✕
      </button>

      {/* FACTURA */}
      <FacturaPos
        saleData={saleData}
        products={products}
      />

      {/* BOTÓN IMPRIMIR */}
      <div className="flex justify-end mt-4 z-50">
        <Button onClick={handlePrintFactura}>
          Imprimir
        </Button>
      </div>

    </div>
    </div>

    )}
      {/* MODAL EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded">
            <h3>Editar producto</h3>

            <Input
              value={selectedProduct?.name || ""}
              disabled
            />

            <Input
              type="number"
              value={selectedProduct?.quantity || 1}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  quantity: Number(e.target.value),
                })
              }
            />

            <Button onClick={handleUpdateProduct}>
              Guardar
            </Button>
          </div>
        </div>
      )}

    
    </div>
  );
}
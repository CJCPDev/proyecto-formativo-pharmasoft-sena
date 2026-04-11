import { Title, Input, Button } from "@/shared/components";
import { Trash, Pencil, PrinterCheckIcon } from "lucide-react";
import { useState, useMemo } from "react";
import { createSale } from "../services/saleService";
import { FacturaPos } from "@/features/sales";
import { useNavigate } from "react-router-dom";

export default function SaleProducts({
  products = [],
  setProducts,
  saleData,
  setSaleData,
  saleCreated,
  setSaleCreated,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFactura, setShowFactura] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handlePrintFactura = () => {
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
    }, 300);
  };

  // ================== DELETE ==================
  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // ================== UPDATE PRODUCT ==================
  const handleUpdateProduct = () => {
    setProducts((prev) =>
      prev.map((p) => (p.id === selectedProduct.id ? selectedProduct : p)),
    );
    setIsModalOpen(false);
  };

  // ================== CALCULOS ==================
  const subtotal = useMemo(() => {
    return products.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [products]);

  const iva = useMemo(() => subtotal * 0.19, [subtotal]);

  const total = useMemo(() => subtotal + iva, [subtotal, iva]);

  // ================== CREATE SALE ==================
  const handleCreateSale = async () => {
    if (products.length === 0) {
      return;
    }

    setLoading(true);

    try {
 const payload = {
  usuario: saleData.usuario,
  farmaceuta: saleData.farmaceuta,
  subtotal_venta: subtotal,
  iva_venta: iva,
  total_venta: total,
  descuento_venta: 0,
  productos: products,
};
      console.log(payload);

      const response = await createSale(payload);
      const data = response?.data || response;

      setSaleData((prev) => ({
        ...prev,
        numeroFactura: data.numeroFactura || data.id_factura,
        fecha: data.fechaHora || data.fecha_hora,
      }));
      // Esto es para bloquear la pantalla
      setIsLocked(true);
      setSaleCreated(true);
    } catch (error) {
      console.error("Error creando venta:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================== PRINT ==================

  return (
    <div className="bg-white w-full h-190 p-8 rounded-lg font-main flex flex-col">
      {saleCreated && (
        <PrinterCheckIcon
          className="bg-brand-hover/80 stroke-white hover:bg-brand-hover rounded-full h-10 w-10 p-2 z-10 cursor-pointer"
          onClick={() => setShowFactura(true)}
        />
      )}
      <Title title="Descripción de productos" />

      {/* TABLA */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] text-center bg-brand-hover mt-2">
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
            className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] text-center items-center min-h-16"
          >
            <span className="border border-gray-300  flex items-center gap-2 px-2 h-full">
              <img
                src={item.image || "https://via.placeholder.com/40"}
                alt={item.name}
                className="w-10 h-10 object-cover rounded-md flex-shrink-0"
              />
              <span className="truncate">{item.name}</span>
            </span>
            <span className="border border-gray-300 flex items-center justify-center h-full">
              {item.quantity}
            </span>
            <span className="border border-gray-300 flex items-center justify-center h-full">
              {item.price}
            </span>
            <span className="border border-gray-300 flex items-center justify-center h-full">
              {(item.price * 0.19 * item.quantity).toFixed(2)}
            </span>
            <span className="border border-gray-300 flex items-center justify-center h-full">
              {(item.price * 1.19 * item.quantity).toFixed(2)}
            </span>

            <div className="border border-gray-300 flex items-center justify-center h-full gap-6 z-10">
              <button
                onClick={() => {
                  setSelectedProduct(item);
                  setIsModalOpen(true);
                }}
              >
                <Pencil size={20} className="cursor-pointer" />
              </button>

              <button onClick={() => handleDelete(item.id)}>
                <Trash size={20} className="cursor-pointer stroke-red-600" />
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
{!saleCreated && (
  <div className="flex justify-end gap-2 mt-4">
    
    <Button
      disabled={isLocked}
      onClick={() => {
        setProducts([]);
        navigate(-1);
      }}
      className="rounded-xl w-40 bg-gray-500 text-white hover:bg-gray-800 z-10"
    >
      Cancelar
    </Button>

    <Button
      onClick={handleCreateSale}
      disabled={isLocked || loading}
    >
      {loading ? "Creando..." : "Crear venta"}
    </Button>

  </div>
)}

      {/* FACTURA MODAL */}
      {showFactura && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-90 h-100 grid grid-cols-1">
            {/* BOTÓN CERRAR */}
<button
  className="absolute top-1 font-bold right-2 text-red-500 cursor-pointer"
  onClick={() => {
    setShowFactura(false);
    navigate("/listar-ventas");
  }}
>
  ✕
</button>

            {/* FACTURA */}
            <FacturaPos saleData={saleData} products={products} />

            {/* BOTÓN IMPRIMIR */}
            <div className="grid mx-auto justify-end mt-10 z-50">
              <Button onClick={handlePrintFactura}>Imprimir</Button>
            </div>
          </div>
        </div>
      )}
      {/* MODAL EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
            {/* HEADER */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Editar producto
              </h3>
              <p className="text-sm text-gray-500">
                Modifica la cantidad del producto seleccionado
              </p>
            </div>

            {/* CONTENIDO */}
            <div className="flex flex-col gap-4">
              {/* Producto */}
              <div>
                <label className="text-sm text-gray-600">Producto</label>
                <Input value={selectedProduct?.name || ""} disabled />
              </div>

              {/* Cantidad */}
              <div>
                <label className="text-sm text-gray-600">Cantidad</label>
                <Input
                  type="number"
                  min={1}
                  value={selectedProduct?.quantity || 1}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      quantity: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setSelectedProduct(null)}
                className="border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancelar
              </Button>

              <Button
                onClick={handleUpdateProduct}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Guardar cambios
              </Button>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl p-6 w-80 shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-2">Atención</h2>

            <p className="text-gray-600 mb-4">No hay productos seleccionados</p>

            <Button onClick={() => setShowModal(false)}>Entendido</Button>
          </div>
        </div>
      )}
    </div>
  );
}

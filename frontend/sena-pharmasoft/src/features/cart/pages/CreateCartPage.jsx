// ─────────────────────────────────────────────
// CreateCartPage.jsx
// Página para crear un nuevo carrito
// Similar al módulo de ventas
// ─────────────────────────────────────────────

import { useState } from "react";
import { Button } from "@/shared/components";
import { useNavigate } from "react-router-dom";
import CartForm from "../components/CartForm";
import CartProducts from "../components/CartProducts";

export default function CreateCartPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cartData, setCartData] = useState({});

  const handleAddProduct = (product) => {
    if (product._actualizar) {
      setProducts((prev) =>
        prev.map((p) =>
          String(p.id_medicamento) === String(product.id_medicamento)
            ? { ...product, _actualizar: undefined }
            : p,
        ),
      );
    } else {
      setProducts((prev) => [...prev, product]);
    }
  };

  return (
    <div className="w-full min-h-screen p-4 sm:p-6">
      <div className="w-full flex flex-col lg:flex-row gap-6">
        {/* Formulario izquierda */}
        <div className="w-full lg:w-96 flex flex-col gap-2">
          <div>
            <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
              Atrás
            </Button>
          </div>
          <div className="bg-white border border-brand-hover/20 rounded-lg z-10">
            <CartForm
              onAddProduct={handleAddProduct}
              onCartDataChange={setCartData}
              products={products}
            />
          </div>
        </div>

        {/* Tabla derecha */}
        <div className="flex-1 lg:mt-11">
          <div className="bg-white border border-brand-hover/20 rounded-lg p-4 h-full">
            <CartProducts
              products={products}
              setProducts={setProducts}
              cartData={cartData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

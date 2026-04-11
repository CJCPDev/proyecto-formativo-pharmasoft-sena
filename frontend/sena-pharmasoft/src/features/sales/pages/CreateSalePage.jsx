import { InformationSale, SaleForm } from "../index";
import { useState } from "react";

export default function CreateSalePage() {
  const [products, setProducts] = useState([]);
  const [saleCreated, setSaleCreated] = useState(false);
  const [saleData, setSaleData] = useState(false);

  const handleAddProduct = (product) => {
    setProducts((prev) => [...prev, product]);
  };
  return (
    <div className="w-full min-h-screen p-6 flex justify-center">
      <div className="w-full flex gap-6">
        <div className="w-95 flex flex-col gap-2 mt-11">
          <div className="bg-white border border-brand-hover/20 rounded-lg z-10">
            <SaleForm
              saleData={saleData}
              setSaleData={setSaleData}
              onAddProduct={handleAddProduct}
            />
          </div>
        </div>

        <div className="flex-1 mt-11">
          <div className="bg-white border border-brand-hover/20 rounded-lg p-4 h-full">
            <InformationSale
              products={products}
              setProducts={setProducts}
              saleData={saleData}
              setSaleData={setSaleData}
              saleCreated={saleCreated}
              setSaleCreated={setSaleCreated}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

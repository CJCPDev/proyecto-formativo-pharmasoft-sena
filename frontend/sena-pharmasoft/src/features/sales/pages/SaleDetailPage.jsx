import { InformationSale, SaleForm } from "../index";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSalesById } from "../services/getSalesById";


export default function SaleDetailPage (){
const [products, setProducts] = useState([]);
  const [saleData, setSaleData] = useState({});
  const [saleCreated, setSaleCreated] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchSale = async () => {
      const data = await getSalesById(id);

      // 🔥 setear datos
      setSaleData({
        numeroFactura: data.numeroFactura,
        fecha: data.fechaHora,
        usuario: data.usuario,
        farmaceuta: data.farmaceuta,
        subtotal: data.subtotal_venta,
        iva: data.iva_venta,
        total: data.total_venta,
      });

      setProducts(data.productos || []);
    };

    fetchSale();
  }, [id]);

  return (
    <div className="w-full min-h-screen p-6 flex justify-center">
      <div className="w-full flex gap-6">

        {/* FORM SOLO LECTURA */}
        <div className="w-95 flex flex-col gap-2 mt-11">
          <div className="bg-white border border-brand-hover/20 rounded-lg">
            <SaleForm
              saleData={saleData}
              setSaleData={setSaleData}
              isView={true} 
            />
          </div>
        </div>

        {/* INFO SOLO LECTURA */}
        <div className="flex-1 mt-11">
          <div className="bg-white border border-brand-hover/20 rounded-lg p-4 h-full">
            <InformationSale
              products={products}
              setProducts={setProducts}
              saleData={saleData}
              setSaleData={setSaleData}
              saleCreated={saleCreated}
              isView={true} 
            />
          </div>
        </div>

      </div>
    </div>
  );
}
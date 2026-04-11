import { useEffect, useState } from "react";
import { getVentas } from "../services/saleService";
import { DataTable } from "../../../shared/components";
import { sellColumns } from "../table/SellColumns";
import SaleForm from "@/features/sales/components/SaleForm";


export default function SalesPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      const res = await getVentas();
      setData(res);
    };

    cargar();
  }, []);

  return (
    <div className="w-full h-200">
      <DataTable
        data={data}
        columns={sellColumns()}
      />
    </div>
  );
}
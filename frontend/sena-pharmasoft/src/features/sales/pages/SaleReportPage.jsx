import { useEffect, useState } from "react";
import { getVentas } from "../services/saleService";
import { DataTable } from "../../../shared/components";
import { sellColumns } from "../table/SellColumns";
import SaleForm from "@/features/sales/components/SaleForm";
import { useNavigate } from "react-router-dom";


export default function SalesPage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cargar = async () => {
      const res = await getVentas();
      setData(res);
    };

    cargar();
  }, []);


  const handleView = (sale) => {
  navigate(`/ver-venta/${sale.id_factura}`);
};

const handleEdit = (sale) => {
  navigate(`/ver-venta/${sale.id_factura}/editar`);
};

  return (
    <div className="w-full h-200">
<DataTable
  data={data}
  columns={sellColumns({
    onView: handleView,
    onEdit: handleEdit,
  })}
      />
    </div>
  );
}
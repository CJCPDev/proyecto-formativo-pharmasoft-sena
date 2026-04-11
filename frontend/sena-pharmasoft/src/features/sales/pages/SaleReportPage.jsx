import { useEffect, useState } from "react";
import { Pencil, Eye } from "lucide-react";
import { getVentas } from "../services/saleService";
import { DataTable } from "../../../shared/components";
import { sellColumns } from "../table/SellColumns";
import SalesRowActions from "../components/SalesRowActions";  // Suponiendo que SaleView está en tu carpeta components


export default function SalesPage() {
  const [data, setData] = useState([]);
const [selectedSale, setSelectedSale] = useState(null);
const [mode, setMode] = useState(null);


  useEffect(() => {
    const cargar = async () => {
      const res = await getVentas();

      setData(res);
    };

    cargar();
  }, []);

    const handleView = (sale) => {
    setSelectedSale(sale);
    setMode("view");
  };

  const handleEdit = (sale) => {
    setSelectedSale(sale);
    setMode("edit");
  };



  return (
    <div className="w-full h-200 ">
<DataTable
  data={data}
  columns={sellColumns({
    onView: (handleView),
    onEdit: (handleEdit) 
  })}
/>
{mode === "view" && selectedSale && <SaleView sale={selectedSale} />}
{mode === "edit" && selectedSale && <SaleForm sale={selectedSale} />}
    </div>

  );
}

import DataTable from "@/shared/components/DataTable";
import { ProductsColumns } from "../../table/ProductsColumns";
import { Button, Title } from "@/shared/components";
import { Link } from "react-router-dom";
import { products } from "@/data/products/products";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportConfigModal from "../../reports/components/ReportConfigModal";

export default function AdminProductListPage() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const Navigate = useNavigate();

  return (
    <div
      className="relative grid gap-6 bg-white rounded-xl shadow-2xl p-4 w-350 h-150
        "
    >
      <Title title="Modulo de Medicamentos" />
      <div className="flex justify-between gap-6 items-center">
        <div className="flex justify-end gap-6">
          <Button variant="secondary" size="sm" onClick={() => Navigate(-1)}>
            Regresar
          </Button>
          <ReportConfigModal
            isOpen={isReportModalOpen}
            onClose={() => setIsReportModalOpen(false)}
          />
        </div>
        <div className="flex px-10 gap-6 items-center">
          <Button variant="primary" onClick={() => setIsReportModalOpen(true)}>
            Generar Reporte
          </Button>
          <Link
            to="/crear-medicamento"
            className="w-50 relative inline-flex items-center justify-center rounded-xl transition-colors cursor-pointer h-10 px-4 before:absolute before:content-[''] before:-inset-y-[4px] before:-inset-x-[0px] font-main text-brand-soft font-semibold text-base bg-brand-hover hover:bg-brand-soft hover:text-brand-hover"
          >
            Crear Medicamento
          </Link>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-full h-full ">
            <DataTable data={products} columns={ProductsColumns} />
        </div>
      </div>
    </div>
  );
}

import { Button, Title} from "@/shared/components";
import { Link, useNavigate } from "react-router-dom";
import SaleReportPage from "./SaleReportPage";
import { useState} from "react";
import ReportConfigModal from "../reports/components/ReportConfigModal";

export default function ListSalePage() {
  const navigate = useNavigate();
  const [IsReportModalOpen, setIsReportModalOpen] = useState(false);


  return (
    <div className="relative grid gap-6 bg-white rounded-xl shadow-2xl p-4 w-350 h-150">
      <Title title="Modulo de Ventas" />
      <div className="flex justify-between gap-6 items-center">
        <div className="flex px-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate("/DashboardMain")}
          >
            Regresar
          </Button>

          <ReportConfigModal
            isOpen={IsReportModalOpen}
            onClose={() => setIsReportModalOpen(false)}
          ></ReportConfigModal>
        </div>
        <div className="flex px-10 gap-6 items-center">
          <Button variant="primary" onClick={() => setIsReportModalOpen(true)}>
            Generar reporte
          </Button>
          <Link
            className="w-40 relative inline-flex items-center justify-center rounded-xl transition-colors cursor-pointer
                        h-10 px-4 before:absolute before:content-[''] before:-inset-y-[4px] before:-inset-x-[0px] font-main text-brand-soft font-semibold text-base bg-brand-hover hover:bg-brand-soft hover:text-brand-hover"
            to="/crear-venta"
          >
            Crear Venta
          </Link>
        </div>
      </div>
      <div className="flex gap-6">
        <SaleReportPage />
      </div>
    </div>
  );
}

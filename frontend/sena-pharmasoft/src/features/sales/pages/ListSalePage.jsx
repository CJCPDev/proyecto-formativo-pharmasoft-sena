import { Button, Title, DataTable } from "@/shared/components";
import { Link, useNavigate } from "react-router-dom";
import SaleReportPage from "./SaleReportPage";
import { useState } from "react";
import ReportConfigModal from "../reports/components/ReportConfigModal";

export default function ListSalePage() {
  const navigate = useNavigate();
  const [IsReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <div className="relative grid gap-6 bg-white rounded-xl shadow-2xl p-4 w-full max-w-7xl mx-auto">
      <Title title="Modulo de Ventas" />

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        
        {/* IZQUIERDA */}
        <div className="flex flex-wrap gap-2">
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
          />
        </div>

        {/* DERECHA */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Button
            variant="primary"
            onClick={() => setIsReportModalOpen(true)}
          >
            Generar reporte
          </Button>

          <Link
            to="/crear-venta"
            className="w-full sm:w-40 flex items-center justify-center rounded-xl h-10 px-4 font-semibold
            bg-brand-hover text-brand-soft hover:bg-brand-soft hover:text-brand-hover transition-colors"
          >
            Crear Venta
          </Link>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="overflow-x-auto">
        <SaleReportPage />
      </div>
    </div>
  );
}
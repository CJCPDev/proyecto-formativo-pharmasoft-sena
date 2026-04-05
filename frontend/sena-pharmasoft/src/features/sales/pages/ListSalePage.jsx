import { Button, Title } from "@/shared/components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SaleReportPage from "./SaleReportPage";
import { useState, useEffect } from "react";
import ReportConfigModal from "../reports/components/ReportConfigModal";
import { getSales } from "../services/saleService";

export default function ListSalePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [IsReportModalOpen, setIsReportModalOpen] = useState(false);
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔥 FUNCIÓN FUERA (CLAVE)
  const cargarVentas = async () => {
    try {
      setLoading(true);

      const data = await getSales();

      console.log("VENTAS CRUDAS 👉", data);

      const ventasFormateadas = Array.isArray(data)
        ? data.map((u) => ({
            id: u.id,
            numeroFactura: u.numerofactura,
fechaHora: new Date().toISOString(),
            usuario: u.usuario,
            farmaceuta: u.farmaceuta,
            is_active: true,
          }))
        : [];

      setVentas(ventasFormateadas);
    } catch (err) {
      console.error("Error al cargar ventas:", err);
      setError("No se pudieron cargar las ventas");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 PRIMERA CARGA
  useEffect(() => {
    cargarVentas();
  }, []);

  // 🔥 RECARGA CUANDO VIENES DE CREAR
  useEffect(() => {
    if (location.state?.reload) {
      cargarVentas();
    }
  }, [location.state]);

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
          />
        </div>

        <div className="flex px-10 gap-6 items-center">
          <Button variant="primary" onClick={() => setIsReportModalOpen(true)}>
            Generar reporte
          </Button>

          <Link
            className="w-40 relative inline-flex items-center justify-center rounded-xl transition-colors cursor-pointer
            h-10 px-4 font-main text-brand-soft font-semibold text-base bg-brand-hover hover:bg-brand-soft hover:text-brand-hover"
            to="/crear-venta"
          >
            Crear Venta
          </Link>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-full h-full">
          {loading && (
            <p className="text-center text-gray-500">
              Cargando ventas...
            </p>
          )}

          {error && (
            <p className="text-center text-red-500">{error}</p>
          )}

          {!loading && !error && (
            <SaleReportPage data={ventas} />
          )}
        </div>
      </div>
    </div>
  );
}
import DataTable from "@/shared/components/DataTable";
import { ProductsColumns } from "../../table/ProductsColumns";
import { Button, Title } from "@/shared/components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReportConfigModal from "../../reports/components/ReportConfigModal";

export default function AdminProductListPage() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const Navigate = useNavigate();

  // 👉 función para cargar medicamentos
  const cargarProductos = () => {
    fetch("http://127.0.0.1:8000/api/medicamentos/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al cargar medicamentos");
        }
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error cargando medicamentos:", err));
  };

  // 👉 cargar al montar el componente
  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <div className="relative grid gap-6 bg-white rounded-xl shadow-2xl p-4 w-350 h-150">
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

          {/* 👉 ya no pasamos funciones en el state */}
          <Link
            to="/crear-medicamento"
            className="w-50 relative inline-flex items-center justify-center rounded-xl transition-colors cursor-pointer h-10 px-4 font-main text-brand-soft font-semibold text-base bg-brand-hover hover:bg-brand-soft hover:text-brand-hover"
          >
            Crear Medicamento
          </Link>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-full h-full">
          <DataTable data={products} columns={ProductsColumns} />
        </div>
      </div>
    </div>
  );
}

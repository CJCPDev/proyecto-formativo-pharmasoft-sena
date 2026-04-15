// ─────────────────────────────────────────────
// CartListPage.jsx
// Página principal del módulo de carritos
// Lista todos los carritos desde la API
// ─────────────────────────────────────────────

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Title, Button } from "@/shared/components";
import DataTable from "@/shared/components/DataTable";
import { CartColumns } from "../table/CartColumns";
import { getCarritos } from "../services/cartService";
import { getUsuarioActual } from "@/features/auth/services/authService";
import CartReportModal from "../reports/components/CartReportModal";

export default function CartListPage() {
  const [carritos, setCarritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const usuarioActual = getUsuarioActual();
  const esAdmin = usuarioActual?.id_rol === 1;
  const esFarmaceuta = usuarioActual?.id_rol === 3;

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  useEffect(() => {
    const cargarCarritos = async () => {
      try {
        const data = await getCarritos();
        setCarritos(data);
      } catch (err) {
        console.error("Error al cargar los carritos:", err);
        setError("No se pudieron cargar los carritos");
      } finally {
        setLoading(false);
      }
    };
    cargarCarritos();
  }, []);

  return (
    <div className="relative grid gap-6 bg-white rounded-xl shadow-2xl p-4 w-full max-w-7xl mx-auto">
      <Title title="Módulo de Carritos" />

      {/* Barra de acciones */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div className="flex px-2 sm:px-4">
          <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
            Regresar
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row px-2 sm:px-10 gap-3 sm:gap-6 items-stretch sm:items-center w-full sm:w-auto">
          <Button variant="primary" onClick={() => setIsReportModalOpen(true)}>
            Generar reporte
          </Button>

          {(esAdmin || esFarmaceuta) && (
            <Button
              variant="primary"
              onClick={() => navigate("/crear-carrito")}
            >
              Crear Carrito
            </Button>
          )}
        </div>
      </div>

      <CartReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      {/* Tabla */}
      <div className="w-full overflow-x-auto">
        {loading && (
          <p className="text-center text-gray-500">Cargando carritos...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && Array.isArray(carritos) && (
          <DataTable data={carritos} columns={CartColumns} />
        )}
      </div>
    </div>
  );
}

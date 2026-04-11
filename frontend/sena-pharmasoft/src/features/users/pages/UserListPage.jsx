// ─────────────────────────────────────────────
// UserListPage.jsx
// Página principal del módulo de usuarios.
// Lista todos los usuarios obtenidos desde la API de Django
// ─────────────────────────────────────────────

import { Button, Title } from "@/shared/components"
import { Link } from "react-router-dom"
import ReportConfigModal from "../reports/components/ReportConfigModal"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserColumns } from "../table/UserColumns"
import DataTable from "@/shared/components/DataTable"
import { getUsuarios } from "../services/usuarioService"
import { getUsuarioActual } from "@/features/auth/services/authService"

export default function UserListPage() {

  const [IsReportModalOpen, setIsReportModalOpen] = useState(false)
  const navigate = useNavigate();

  const usuarioActual = getUsuarioActual();
  const esFarmaceuta = usuarioActual?.id_rol === 3

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const data = await getUsuarios(esFarmaceuta ? 2 : null);
        setUsuarios(data);
      } catch (err) {
        console.error("Error al cargar usuarios:", err);
        setError("No se pudieron cargar los usuarios");
      } finally {
        setLoading(false);
      }
    };
    cargarUsuarios();
  }, []);

  return (
    <div className="relative grid gap-6 bg-white rounded-xl shadow-2xl p-4 w-full mx-4 sm:mx-6 lg:mx-8">
      <Title title="Módulo de Usuarios" />

      {/* Barra de acciones */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div className="flex px-2 sm:px-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(-1)}
          >
            Regresar
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row px-2 sm:px-10 gap-3 sm:gap-6 items-stretch sm:items-center w-full sm:w-auto">
          <Button
            variant="primary"
            onClick={() => setIsReportModalOpen(true)}
          >
            Generar reporte
          </Button>
          <Button variant="primary" onClick={() => navigate("/crear-usuarios")}>
            Crear Usuario
          </Button>
        </div>
        <ReportConfigModal
          isOpen={IsReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
        />
      </div>

      {/* Tabla */}
      <div className="w-full overflow-x-auto">
        {loading && <p className="text-center text-gray-500">Cargando usuarios...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <DataTable
            data={usuarios}
            columns={UserColumns}
          />
        )}
      </div>
    </div>
  );
}
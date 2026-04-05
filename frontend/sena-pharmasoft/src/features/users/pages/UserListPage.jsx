// ─────────────────────────────────────────────
// UserListPage.jsx
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
  const esFarmaceuta = usuarioActual?.id_rol === 7

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const data = await getUsuarios(esFarmaceuta ? 6 : null);
        console.log("Usuarios recibidos:", data);

        // ✅ SOLO ESTO SE AGREGÓ (adaptación de datos)
        const usuariosFormateados = Array.isArray(data)
          ? data.map((u) => ({
              id: u.id || u.id,
              name: u.name || u.nombre,
              userGroup: u.userGroup || u.rol,
              documentType: u.documentType || u.tipo_documento,
              documentNumber: u.documentNumber || u.numero_documento,
              userEmail: u.userEmail || u.email,
              phone: u.phone || u.telefono,
              estado: u.estado ?? u.estado_id ?? 1,
            }))
          : [];

        setUsuarios(usuariosFormateados);

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
    <div className="relative grid gap-6 bg-white rounded-xl shadow-2xl p-4 w-350 h-150">
      <Title title="Modulo de Usuarios" />

      <div className="flex justify-between gap-6 items-center">
        <div className="flex px-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(-1)}
          >
            Regresar
          </Button>
        </div>
        <div className="flex px-10 gap-6 items-center">
          <Button
            variant="primary"
            onClick={() => setIsReportModalOpen(true)}
          >
            Generar reporte
          </Button>
          <Link to="/crear-usuarios">
            Crear Usuario
          </Link>
        </div>
        <ReportConfigModal
          isOpen={IsReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
        />
      </div>

      <div className="flex gap-6">
        <div className="w-full h-full">

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
    </div>
  );
}
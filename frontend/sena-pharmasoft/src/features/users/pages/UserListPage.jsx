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

// Importamos el servicio que se conecta con Django
import { getUsuarios } from "../services/usuarioService"

//Importamos el servicio de autentificacion para obtener el usuario actual
import { getUsuarioActual } from "@/features/auth/services/authService"

export default function UserListPage() {

  const [IsReportModalOpen, setIsReportModalOpen] = useState(false)
  const navigate = useNavigate();

  //Obtenemos el usuario autenticado y verificamos su rol
  const usuarioActual = getUsuarioActual();
  const esFarmaceuta = usuarioActual?.id_rol === 7

  // Estado para guardar la lista de usuarios que devuelve la API
  const [usuarios, setUsuarios] = useState([]);

  // Estado para mostrar un mensaje mientras carga
  const [loading, setLoading] = useState(true);

  // Estado para mostrar un mensaje si ocurre un error
  const [error, setError] = useState(null);

  // Al montar el componente, cargamos los usuarios desde Django
  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        //Si es farmaceuta solo carga clientes (id rol 6)
        const data = await getUsuarios(esFarmaceuta ? 6 : null);
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

          {/* Mientras carga mostramos un mensaje */}
          {loading && <p className="text-center text-gray-500">Cargando usuarios...</p>}

          {/* Si ocurrió un error lo mostramos */}
          {error && <p className="text-center text-red-500">{error}</p>}

          {/* Cuando ya cargó mostramos la tabla con los datos de Django */}
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
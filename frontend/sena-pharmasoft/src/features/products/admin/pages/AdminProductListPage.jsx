// Componente de tabla reutilizable que recibe datos y columnas como props
import DataTable from "@/shared/components/DataTable";

// Definición de las columnas que se mostrarán en la tabla de productos
import { getProductsColumns } from "../../table/ProductsColumns";

// Componentes de UI reutilizables del sistema de diseño
import { Button, Title } from "@/shared/components";

// Link renderiza un enlace de navegación, useNavigate permite redirigir programáticamente
import { Link, useNavigate } from "react-router-dom";

// useState almacena los datos, useEffect dispara la carga al montar el componente
import { useState, useEffect } from "react";

// Modal de configuración para generar reportes del listado de medicamentos
import ReportConfigModal from "../../reports/components/ReportConfigModal";

export default function AdminProductListPage() {
  // Controla si el modal de reportes está abierto o cerrado
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Almacena la lista de medicamentos traída desde la API
  const [products, setProducts] = useState([]);

  const Navigate = useNavigate();

  // Función separada para cargar los medicamentos desde la API.
  // Se define fuera del useEffect para poder reutilizarla si se necesita recargar la tabla.
  const cargarProductos = () => {
    fetch("http://127.0.0.1:8000/api/medicamentos/")
      .then((res) => {
        // Si el servidor responde con error lanzamos una excepción para ir al catch
        if (!res.ok) {
          throw new Error("Error al cargar medicamentos");
        }
        return res.json();
      })
      .then((data) => setProducts(data)) // Guardamos el array de medicamentos en el estado
      .catch((err) => console.error("Error cargando medicamentos:", err));
  };

  // Llama a cargarProductos una sola vez cuando el componente se monta
  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <div className="relative grid gap-6 bg-white rounded-xl shadow-2xl p-4 w-350 h-150">
      <Title title="Módulo de Medicamentos" />

      {/* Barra de acciones: botones de navegación y acciones principales */}
      <div className="flex justify-between gap-6 items-center">
        {/* Grupo izquierdo: botón para regresar y el modal de reportes */}
        <div className="flex justify-end gap-6">
          {/* navigate(-1) regresa a la pantalla anterior en el historial del navegador */}
          <Button variant="secondary" size="sm" onClick={() => Navigate(-1)}>
            Regresar
          </Button>

          {/* El modal se monta siempre pero solo se muestra cuando isReportModalOpen es true */}
          <ReportConfigModal
            isOpen={isReportModalOpen}
            onClose={() => setIsReportModalOpen(false)}
          />
        </div>

        {/* Grupo derecho: botón para abrir el modal de reportes y enlace para crear */}
        <div className="flex px-10 gap-6 items-center">
          <Button variant="primary" onClick={() => setIsReportModalOpen(true)}>
            Generar Reporte
          </Button>

          {/* Usamos Link en lugar de Button con navigate para aprovechar el prefetch
              y la semántica de enlace. Los estilos replican visualmente el botón primario. */}
          <Link
            to="/crear-medicamento"
            className="w-50 relative inline-flex items-center justify-center rounded-xl transition-colors cursor-pointer h-10 px-4 font-main text-brand-soft font-semibold text-base bg-brand-hover hover:bg-brand-soft hover:text-brand-hover"
          >
            Crear Medicamento
          </Link>
        </div>
      </div>

      {/* Contenedor de la tabla con los medicamentos cargados desde la API */}
      <div className="w-full overflow-x-auto">
        {/* <div className="w-full h-full"> */}
        {/* DataTable recibe los datos y las columnas para renderizar la tabla */}
        <DataTable
          data={products}
          columns={getProductsColumns(cargarProductos)}
        />
      </div>
      {/* </div> */}
    </div>
  );
}

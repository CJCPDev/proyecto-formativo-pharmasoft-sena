// ─────────────────────────────────────────────
// usePermisos.js
// Hook para verificar permisos del usuario
// ─────────────────────────────────────────────

import { tienePermiso } from "@/features/auth/services/authService";

export const usePermisos = () => {
    return {
        // Usuarios
        puedeListarUsuarios: tienePermiso('listar_usuarios'),
        puedeCrearUsuario: tienePermiso('crear_usuario'),
        puedeActualizarUsuario: tienePermiso('actualizar_usuario'),
        puedeVisualizarUsuario: tienePermiso('visualizar_usuario'),
        puedeReporteUsuarios: tienePermiso('reporte_usuarios'),

        // Proveedores
        puedeListarProveedores: tienePermiso('listar_proveedores'),
        puedeCrearProveedor: tienePermiso('crear_proveedor'),
        puedeActualizarProveedor: tienePermiso('actualizar_proveedor'),
        puedeVisualizarProveedor: tienePermiso('visualizar_proveedor'),
        puedeReporteProveedores: tienePermiso('reporte_proveedores'),

        // Medicamentos
        puedeListarMedicamentos: tienePermiso('listar_medicamento'),
        puedeCrearMedicamento: tienePermiso('crear_medicamento'),
        puedeActualizarMedicamento: tienePermiso('actualizar_medicamento'),
        puedeVisualizarMedicamento: tienePermiso('visualizar_medicamento'),
        puedeReporteMedicamentos: tienePermiso('reporte_medicamento'),

        // Ventas
        puedeListarVentas: tienePermiso('listar_ventas'),
        puedeCrearVenta: tienePermiso('crear_venta'),
        puedeActualizarVenta: tienePermiso('actualizar_venta'),
        puedeVisualizarVenta: tienePermiso('visualizar_venta'),
        puedeReporteVentas: tienePermiso('reporte_ventas'),

        // Carritos
        puedeListarCarritos: tienePermiso('listar_carritos'),
        puedeCrearCarrito: tienePermiso('crear_carrito'),
        puedeActualizarCarrito: tienePermiso('actualizar_carrito'),
        puedeVisualizarCarrito: tienePermiso('visualizar_carrito'),
        puedeReporteCarritos: tienePermiso('reporte_carritos'),
    };
};
export const permissionGroups = [
  {
    id: "usuarios",
    label: "Gestión de Usuarios",
    permissions: [
      { id: "crear_usuario", label: "Crear usuarios" },
      { id: "actualizar_usuario", label: "Actualizar cuenta de usuario" },
      { id: "visualizar_usuario", label: "Visualizar cuenta de usuario" },
      { id: "habilitar_usuario", label: "Habilitar o deshabilitar cuenta de usuario" },
      { id: "listar_usuarios", label: "Listar usuarios" },
      { id: "reporte_usuarios", label: "Generar reportes de usuarios" },
    ],
  },
  {
    id: "medicamentos",
    label: "Gestión de Medicamentos",
    permissions: [
      { id: "crear_medicamento", label: "Crear medicamentos" },
      { id: "actualizar_medicamento", label: "Actualizar medicamento" },
      { id: "visualizar_medicamento", label: "Visualizar medicamento" },
      { id: "estado_medicamento", label: "Cambiar estado de medicamento" },
      { id: "listar_medicamento", label: "Listar medicamento" },
      { id: "reporte_medicamento", label: "Generar reporte de medicamento" },
    ],
  },
  {
    id: "proveedores",
    label: "Gestión de Proveedores",
    permissions: [
      { id: "crear_proveedor", label: "Crear proveedores" },
      { id: "actualizar_proveedor", label: "Actualizar cuenta de proveedores" },
      { id: "visualizar_proveedor", label: "Visualizar cuenta de proveedores" },
      { id: "habilitar_proveedor", label: "Habilitar o deshabilitar cuenta de proveedores" },
      { id: "listar_proveedores", label: "Listar proveedores" },
      { id: "reporte_proveedores", label: "Generar reportes de proveedores" },
    ],
  },
  {
    id: "ventas",
    label: "Gestión de Ventas",
    permissions: [
      { id: "crear_venta", label: "Crear ventas" },
      { id: "anular_venta", label: "Cambiar estado de la venta a anulada" },
      { id: "pendiente_venta", label: "Cambiar estado de la venta a pendiente" },
      { id: "visualizar_venta", label: "Visualizar ventas" },
      { id: "actualizar_venta", label: "Actualizar ventas" },
      { id: "listar_ventas", label: "Listar ventas" },
      { id: "reporte_ventas", label: "Generar reportes de ventas" },
    ],
  },
  {
    id: "carritos",
    label: "Gestión de Carritos",
    permissions: [
      { id: "crear_carrito", label: "Crear carrito de compras" },
      { id: "cancelar_carrito", label: "Cambiar el estado del carrito a cancelado" },
      { id: "activar_carrito", label: "Cambiar el estado del carrito a activo" },
      { id: "visualizar_carrito", label: "Visualizar carrito" },
      { id: "actualizar_carrito", label: "Actualizar carrito" },
      { id: "listar_carritos", label: "Listar carritos" },
      { id: "reporte_carritos", label: "Generar reporte de carritos" },
    ],
  },
];
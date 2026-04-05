import { z } from "zod";

export const medicamentoSchema = z.object({
  // Texto obligatorio
  nombreMedicamento: z.string().min(1, "El nombre es obligatorio"),

  // Selects (TODOS como string para evitar errores con <Select />)
  formaFarmaceutica: z.string({
    required_error: "Debe seleccionar una forma farmacéutica",
  }),

  viaAdministracion: z.string({
    required_error: "Debe seleccionar una vía de administración",
  }),

  laboratorio: z.string({
    required_error: "Debe seleccionar un laboratorio",
  }),

  concentracion: z.string({
    required_error: "La concentración es obligatoria",
  }),

  proveedor: z.string({
    required_error: "Debe seleccionar un proveedor",
  }),

  // Texto obligatorio
  lote: z.string().min(1, "El lote es obligatorio"),

  // Fechas
  fechaFabricacion: z.string().min(1, "La fecha de fabricación es obligatoria"),
  fechaVencimiento: z.string().min(1, "La fecha de vencimiento es obligatoria"),

  // Números (IMPORTANTE: vienen como string del input, pero los validamos como number si conviertes antes)
  stock: z
    .string({
      required_error: "El stock es obligatorio",
    })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "El stock debe ser un número mayor a 0",
    }),

  precioCosto: z
    .string({
      required_error: "El costo es obligatorio",
    })
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "El costo no puede ser negativo",
    }),

  precioVenta: z
    .string({
      required_error: "El precio de venta es obligatorio",
    })
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "El precio de venta no puede ser negativo",
    }),

  // Booleano (RECOMENDADO manejarlo como checkbox en frontend)
  requiresPrescription: z.string({
    required_error: "Debe indicar si requiere receta",
  }),

  // Estado (Select → string)
  estado: z.string({
    required_error: "Debe seleccionar un estado",
  }),

  // Opcional
  description: z.string().optional(),

  // Imagen (ya que la estás usando en el form)
  imagen: z.string().optional(),
});
// Zod es una librería de validación de esquemas con inferencia de tipos
import { z } from "zod";

// Convierte automáticamente el valor recibido a número decimal.
// Útil para campos como precios que vienen como string desde los inputs.
const toNumber = z.coerce.number({
  invalid_type_error: "Debe ser un número",
});

// Convierte automáticamente el valor recibido a número entero.
// Útil para los ids de los selects que siempre deben ser enteros.
const toInt = z.coerce.number().int();

// Esquema de validación del formulario de medicamentos.
// Se usa con safeParse en handleSubmit para validar antes de enviar al backend.
export const medicamentoSchema = z.object({
  // Nombre del medicamento: texto obligatorio
  nombreMedicamento: z.string().min(1, "El nombre es obligatorio"),

  // Ids de los selects: deben ser enteros mayores a 0 para asegurar que
  // el usuario seleccionó una opción válida y no dejó el campo en blanco
  formaFarmaceutica: toInt.min(1, "Debe seleccionar una forma farmacéutica"),
  subformaFarmaceutica: toInt.min(1, "Debe seleccionar una forma farmacéutica"),
  viaAdministracion: toInt.min(1, "Debe seleccionar una vía de administración"),
  laboratorio: toInt.min(1, "Debe seleccionar un laboratorio"),
  proveedor: toInt.min(1, "Debe seleccionar un proveedor"),

  // Concentración: texto obligatorio (puede incluir unidades como "500mg")
  concentracion: z.string().min(1, "La concentración es obligatoria"),

  // Datos del lote y fechas: se validan como strings porque los inputs
  // de tipo date devuelven strings con formato "YYYY-MM-DD"
  lote: z.string().min(1, "El lote es obligatorio"),
  fechaFabricacion: z.string().min(1, "La fecha de fabricación es obligatoria"),
  fechaVencimiento: z.string().min(1, "La fecha de vencimiento es obligatoria"),

  // Stock: entero mayor a 0, no se permiten valores negativos ni cero
  stock: toInt.min(1, "El stock debe ser mayor a 0"),

  // Precios: decimales mayores a 0, se usa toNumber para aceptar valores con centavos
  precioCosto: toNumber.min(1, "El precio costo es obligatorio"),
  precioVenta: toNumber.min(1, "El precio venta es obligatorio"),

  // Indica si el medicamento requiere receta médica.
  // Se valida primero que no esté vacío y luego que el valor sea exactamente "Si" o "No"
  requiresPrescription: z
    .string()
    .min(1, "Debe indicar si requiere receta")
    .refine((val) => val === "Si" || val === "No", {
      message: "Solo se permite 'Si' o 'No'",
    }),

  // Id del estado del medicamento (activo, inactivo, etc.)
  estado: toInt.min(1, "Debe seleccionar un estado"),

  // Descripción del medicamento: texto obligatorio
  description: z.string().min(1, "Debe añadir descripción del medicamento"),
});

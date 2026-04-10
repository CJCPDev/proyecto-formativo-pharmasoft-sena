
import { z } from "zod";

const toNumber = z.coerce.number();
const toInt = z.coerce.number().int();

export const medicamentoSchema = z.object({
    nombreMedicamento: z.string().min(1, "El nombre es obligatorio"),

    formaFarmaceutica: toInt.min(1, "Debe seleccionar una forma farmacéutica"),
    viaAdministracion: toInt.min(1, "Debe seleccionar una vía de administración"),
    laboratorio: toInt.min(1, "Debe seleccionar un laboratorio"),
    concentracion: z.string().min(1, "La concentración es obligatoria"),
    proveedor: toInt.min(1, "Debe seleccionar un proveedor"),

    lote: z.string().min(1, "El lote es obligatorio"),
    fechaFabricacion: z.string().min(1, "La fecha de fabricación es obligatoria"),
    fechaVencimiento: z.string().min(1, "La fecha de vencimiento es obligatoria"),

    stock: toInt.min(1, "El stock debe ser mayor a 0"),
    precioCosto: toNumber.min(0, "El costo no puede ser negativo"),
    precioVenta: toNumber.min(0, "El precio de venta no puede ser negativo"),

    requiresPrescription: z.string().min(1, "Debe indicar si requiere receta"),

    estado: toInt.min(1, "Debe seleccionar un estado"),
    description: z.string().optional()
});
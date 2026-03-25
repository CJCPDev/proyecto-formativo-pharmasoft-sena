import { z } from "zod";

export const medicamentoSchema = z.object({

    nombreMedicamento: z
        .string()
        .min(3, "El nombre debe tener mínimo 3 caracteres")
        .max(60, "El nombre es demasiado largo"),

    formaFarmaceutica: z
        .string()
        .min(1, "Debe seleccionar una forma farmacéutica"),

    viaAdministracion: z
        .string()
        .min(1, "Debe seleccionar una vía de administración"),

    laboratorio: z
        .string()
        .min(1, "Debe seleccionar un laboratorio"),

    concentracion: z
        .string()
        .min(1, "Debe ingresar la concentración"),

    proveedor: z
        .string()
        .min(1, "Debe seleccionar un proveedor"),

    lote: z
        .string()
        .min(1, "Debe ingresar el lote"),

    fechaFabricacion: z
        .string()
        .min(1, "Debe ingresar la fecha de fabricación"),

    fechaVencimiento: z
        .string()
        .min(1, "Debe ingresar la fecha de vencimiento"),

    stock: z
        .string()
        .regex(/^[0-9]+$/, "El stock debe ser un número"),

    precioCosto: z
        .string()
        .regex(/^[0-9]+(\.[0-9]{1,2})?$/, "El precio de costo debe ser un número válido"),

    precioVenta: z
        .string()
        .regex(/^[0-9]+(\.[0-9]{1,2})?$/, "El precio de venta debe ser un número válido"),

    requiresPrescription: z
        .string()
        .min(1, "Debe indicar si requiere fórmula"),

    estado: z
        .string()
        .min(1, "Debe seleccionar un estado"),

    description: z
        .string()
        .min(5, "La descripción debe tener mínimo 5 caracteres")
        .max(200, "La descripción es demasiado larga"),
});

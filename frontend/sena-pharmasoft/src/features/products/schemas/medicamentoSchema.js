import { z } from "zod";

export const medicamentoSchema = z.object({
<<<<<<< HEAD
    // Texto obligatorio
    nombreMedicamento: z.string().min(1, "El nombre es obligatorio"),

    // Llaves foráneas → deben ser números (IDs)
    formaFarmaceutica: z.number({
        required_error: "Debe seleccionar una forma farmacéutica",
        invalid_type_error: "La forma farmacéutica debe ser un número"
    }).int(),

    viaAdministracion: z.number({
        required_error: "Debe seleccionar una vía de administración",
        invalid_type_error: "La vía de administración debe ser un número"
    }).int(),

    laboratorio: z.number({
        required_error: "Debe seleccionar un laboratorio",
        invalid_type_error: "El laboratorio debe ser un número"
    }).int(),

    concentracion: z.number({
        required_error: "Debe seleccionar una concentración",
        invalid_type_error: "La concentración debe ser un número"
    }).int(),

    proveedor: z.number({
        required_error: "Debe seleccionar un proveedor",
        invalid_type_error: "El proveedor debe ser un número"
    }).int(),

    // Texto obligatorio
    lote: z.string().min(1, "El lote es obligatorio"),

    // Fechas como string (puedes validar formato con regex si quieres)
    fechaFabricacion: z.string().min(1, "La fecha de fabricación es obligatoria"),
    fechaVencimiento: z.string().min(1, "La fecha de vencimiento es obligatoria"),

    // Números
    stock: z.number({
        required_error: "El stock es obligatorio",
        invalid_type_error: "El stock debe ser un número"
    }).int().min(1, "El stock debe ser mayor a 0"),

    precioCosto: z.number({
        required_error: "El costo es obligatorio",
        invalid_type_error: "El costo debe ser un número"
    }).min(0, "El costo no puede ser negativo"),

    precioVenta: z.number({
        required_error: "El precio de venta es obligatorio",
        invalid_type_error: "El precio de venta debe ser un número"
    }).min(0, "El precio de venta no puede ser negativo"),

    // Booleano
    requiresPrescription: z.boolean({
        required_error: "Debe indicar si requiere receta"
    }),

    // Estado como ID
    estado: z.number({
        required_error: "Debe seleccionar un estado",
        invalid_type_error: "El estado debe ser un número"
    }).int(),

    // Texto opcional
    description: z.string().optional()
=======

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
>>>>>>> piloto_backend
});

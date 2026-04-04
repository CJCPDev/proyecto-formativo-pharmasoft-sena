// import { z } from "zod";

// export const medicamentoSchema = z.object({
//     // Texto obligatorio
//     nombreMedicamento: z.string().min(1, "El nombre es obligatorio"),

//     // Llaves foráneas → deben ser números (IDs)
//     formaFarmaceutica: z.number({
//         required_error: "Debe seleccionar una forma farmacéutica",
//         invalid_type_error: "La forma farmacéutica debe ser un número"
//     }).int(),

//     viaAdministracion: z.number({
//         required_error: "Debe seleccionar una vía de administración",
//         invalid_type_error: "La vía de administración debe ser un número"
//     }).int(),

//     laboratorio: z.number({
//         required_error: "Debe seleccionar un laboratorio",
//         invalid_type_error: "El laboratorio debe ser un número"
//     }).int(),

//     concentracion: z.number({
//         required_error: "Debe seleccionar una concentración",
//         invalid_type_error: "La concentración debe ser un número"
//     }).int(),

//     proveedor: z.number({
//         required_error: "Debe seleccionar un proveedor",
//         invalid_type_error: "El proveedor debe ser un número"
//     }).int(),

//     // Texto obligatorio
//     lote: z.string().min(1, "El lote es obligatorio"),

//     // Fechas como string (puedes validar formato con regex si quieres)
//     fechaFabricacion: z.string().min(1, "La fecha de fabricación es obligatoria"),
//     fechaVencimiento: z.string().min(1, "La fecha de vencimiento es obligatoria"),

//     // Números
//     stock: z.number({
//         required_error: "El stock es obligatorio",
//         invalid_type_error: "El stock debe ser un número"
//     }).int().min(1, "El stock debe ser mayor a 0"),

//     precioCosto: z.number({
//         required_error: "El costo es obligatorio",
//         invalid_type_error: "El costo debe ser un número"
//     }).min(0, "El costo no puede ser negativo"),

//     precioVenta: z.number({
//         required_error: "El precio de venta es obligatorio",
//         invalid_type_error: "El precio de venta debe ser un número"
//     }).min(0, "El precio de venta no puede ser negativo"),

//     // Booleano
//     requiresPrescription: z.boolean({
//         required_error: "Debe indicar si requiere receta"
//     }),

//     // Estado como ID
//     estado: z.number({
//         required_error: "Debe seleccionar un estado",
//         invalid_type_error: "El estado debe ser un número"
//     }).int(),

//     // Texto opcional
//     description: z.string().optional()
// });
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
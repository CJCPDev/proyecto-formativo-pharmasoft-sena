// import { z } from "zod";

// const toNumber = z.coerce.number({
//     invalid_type_error: "Debe ser un número",
// });
// const toInt = z.coerce.number().int();

// export const medicamentoSchema = z.object({
//     nombreMedicamento: z.string().min(1, "El nombre es obligatorio"),

//     formaFarmaceutica: toInt.min(1, "Debe seleccionar una forma farmacéutica"),
//     subformaFarmaceutica: toInt.min(1, "Debe seleccionar una forma farmacéutica"), 
//     viaAdministracion: toInt.min(1, "Debe seleccionar una vía de administración"),
//     laboratorio: toInt.min(1, "Debe seleccionar un laboratorio"),
//     concentracion: z.string().min(1, "La concentración es obligatoria"),
//     proveedor: toInt.min(1, "Debe seleccionar un proveedor"),

//     lote: z.string().min(1, "El lote es obligatorio"),
//     fechaFabricacion: z.string().min(1, "La fecha de fabricación es obligatoria"),
//     fechaVencimiento: z.string().min(1, "La fecha de vencimiento es obligatoria"),

//     stock: toInt.min(1, "El stock debe ser mayor a 0"),
//     precioCosto: toNumber.min(1, "El precio costo es obligatorio"),
//     precioVenta: toNumber.min(1, "El precio venta es obligatorio"), 

//     requiresPrescription: z
//     .string()
//     .min(1, "Debe indicar si requiere receta")
//     .refine(
//         (val) => val === "Si" || val === "No",
//         { message: "Solo se permite 'Si' o 'No'" }
//     ),

//     estado: toInt.min(1, "Debe seleccionar un estado"),
//     description: z.string().optional(),
// });
import { z } from "zod";

const toNumber = z.coerce.number({
    invalid_type_error: "Debe ser un número",
    });

    const toInt = z.coerce.number().int();

    export const medicamentoSchema = z.object({
    nombreMedicamento: z.string().min(1, "El nombre es obligatorio"),

    formaFarmaceutica: toInt.min(1, "Debe seleccionar una forma farmacéutica"),
    subformaFarmaceutica: toInt.min(1, "Debe seleccionar una forma farmacéutica"),
    viaAdministracion: toInt.min(1, "Debe seleccionar una vía de administración"),
    laboratorio: toInt.min(1, "Debe seleccionar un laboratorio"),
    proveedor: toInt.min(1, "Debe seleccionar un proveedor"),

    concentracion: z.string().min(1, "La concentración es obligatoria"),

    lote: z.string().min(1, "El lote es obligatorio"),
    fechaFabricacion: z.string().min(1, "La fecha de fabricación es obligatoria"),
    fechaVencimiento: z.string().min(1, "La fecha de vencimiento es obligatoria"),

    stock: toInt.min(1, "El stock debe ser mayor a 0"),

    precioCosto: toNumber.min(1, "El precio costo es obligatorio"),
    precioVenta: toNumber.min(1, "El precio venta es obligatorio"),

    requiresPrescription: z
        .string()
        .min(1, "Debe indicar si requiere receta")
        .refine(
        (val) => val === "Si" || val === "No",
        { message: "Solo se permite 'Si' o 'No'" }
        ),

    estado: toInt.min(1, "Debe seleccionar un estado"),

    description: z.string() .min(1, "Debe añadir descripción del medicamento"),
});
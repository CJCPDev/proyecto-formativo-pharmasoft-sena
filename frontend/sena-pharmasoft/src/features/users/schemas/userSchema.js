// ─────────────────────────────────────────────
// userSchema.js
// Validaciones del formulario de usuario con Zod
// En modo edición los campos opcionales no son obligatorios
// ─────────────────────────────────────────────

import { z } from "zod";

export const userSchema = z.object({

    name: z
        .string()
        .min(3, "El nombre debe tener minimo 3 caracteres")
        .max(60, "El nombre es demasiado largo"),

    userEmail: z
        .string()
        .email("Debe ingresar un email valido"),

    // En edición no es obligatorio confirmar el correo
    validationEmail: z
        .string()
        .email("Debe ingresar un email valido")
        .optional()
        .or(z.literal("")),

    phone: z
        .string()
        .regex(/^[0-9]{10}$/, "El telefono debe tener 10 digitos"),

    phoneAdicional: z
        .string()
        .regex(/^[0-9]{10}$/, "El telefono debe tener 10 digitos")
        .optional()
        .or(z.literal("")),

    // Acepta tanto string como número para compatibilidad con la API
    documentType: z
        .union([z.string(), z.number()])
        .refine((val) => val !== "" && val !== null && val !== undefined, {
            message: "Debe seleccionar un tipo de documento"
        }),

    documentNumber: z
        .union([z.string(), z.number()])
        .refine((val) => String(val).length >= 5, {
            message: "Numero de documento inválido"
        }),

    // Acepta tanto string como número para compatibilidad con la API
    userGroup: z
        .union([z.string(), z.number()])
        .refine((val) => val !== "" && val !== null && val !== undefined, {
            message: "Debe seleccionar un grupo de usuario"
        }),

    direccion: z
        .string()
        .min(1, "Debe ingresar una dirección"),

    avatarUrl: z
        .any()
        .nullable()
        .optional(),

    fechaInicio: z.string().optional(),
    fechaFin:    z.string().optional(),

// ✅ Agrega esto al final del schema
/* }).refine((data) => data.userEmail === data.validationEmail, {
  message: "Los correos no coinciden",
  path: ["validationEmail"],
});
    // Campos opcionales que no son obligatorios
    phoneAdicional: z.string().optional().or(z.literal("")),
    fechaInicio: z.string().optional().or(z.literal("")),
    fechaFin: z.string().optional().or(z.literal("")), */


// ─────────────────────────────────────────────
// Validación cruzada — verifica que los dos correos sean iguales
// Solo valida si validationEmail tiene valor
// ─────────────────────────────────────────────
}).refine(
    (data) => {
        if (!data.validationEmail) return true; // si está vacío no valida
        return data.userEmail === data.validationEmail;
    },
    {
        message: "Los correos electrónicos no coinciden",
        path: ["validationEmail"], // muestra el error en el campo de confirmación
    }
);

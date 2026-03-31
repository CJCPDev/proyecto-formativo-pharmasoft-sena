<<<<<<< HEAD
import { z } from "zod";

export const userSchema = z.object ({
=======
// ─────────────────────────────────────────────
// userSchema.js
// Validaciones del formulario de usuario con Zod
// En modo edición los campos opcionales no son obligatorios
// ─────────────────────────────────────────────

import { z } from "zod";

export const userSchema = z.object({
>>>>>>> piloto_backend

    name: z
        .string()
        .min(3, "El nombre debe tener minimo 3 caracteres")
        .max(60, "El nombre es demasiado largo"),

    userEmail: z
        .string()
        .email("Debe ingresar un email valido"),

<<<<<<< HEAD
    validationEmail: z
        .string()
        .email("Debe ingresar un email valido"),
=======
    // En edición no es obligatorio confirmar el correo
    validationEmail: z
        .string()
        .email("Debe ingresar un email valido")
        .optional()
        .or(z.literal("")),
>>>>>>> piloto_backend

    phone: z
        .string()
        .regex(/^[0-9]{10}$/, "El telefono debe tener 10 digitos"),

<<<<<<< HEAD
    documentType: z
        .string()
        .min(1, "Debe seleccionar un tipo de documento"),

    documentNumber: z
        .string()
        .min(5, "Numero de documento inválido")
        .max(20, "Numero de documento demasiado largo"),

    userGroup: z
        .string()
        .min(1, "Debe seleccionar un grupo de usuario"),

    direccion: z
        .string()
        .min(1, "Debe seleccionar un tipo de documento"),

    // password: z
    //     .string()
    //     .min(8, "Contraseña debe de tener minimo 8 caracteres")
    //     .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    //     .regex(/[a-z]/, "Debe contener al menos una minúscula")
    //     .regex(/[0-9]/, "Debe contener al menos un número")
    //     .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial"),

    avatarUrl: z
        .string()
        .url("La URL del avatar no es válida")
        .nullable()
        .optional()
});
=======
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
}).refine((data) => data.userEmail === data.validationEmail, {
  message: "Los correos no coinciden",
  path: ["validationEmail"],
});
    // Campos opcionales que no son obligatorios
    phoneAdicional: z.string().optional().or(z.literal("")),
    fechaInicio: z.string().optional().or(z.literal("")),
    fechaFin: z.string().optional().or(z.literal("")),


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
>>>>>>> piloto_backend

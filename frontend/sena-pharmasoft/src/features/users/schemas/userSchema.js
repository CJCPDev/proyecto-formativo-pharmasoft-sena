import { z } from "zod";

export const userSchema = z.object ({

    name: z
        .string()
        .min(3, "El nombre debe tener minimo 3 caracteres")
        .max(60, "El nombre es demasiado largo"),

    userEmail: z
        .string()
        .email("Debe ingresar un email valido"),

    validationEmail: z
        .string()
        .email("Debe ingresar un email valido"),

    phone: z
        .string()
        .regex(/^[0-9]{10}$/, "El telefono debe tener 10 digitos"),

    phoneAdicional: z
        .string()
        .regex(/^[0-9]{10}$/, "El telefono debe tener 10 digitos")
        .optional()
        .or(z.literal("")),

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
        .optional(),

    fechaInicio: z.string().optional(),
    fechaFin:    z.string().optional(),

// ✅ Agrega esto al final del schema
}).refine((data) => data.userEmail === data.validationEmail, {
  message: "Los correos no coinciden",
  path: ["validationEmail"],
});
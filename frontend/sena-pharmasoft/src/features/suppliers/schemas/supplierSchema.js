import { z } from "zod";

export const supplierSchema = z.object({
  nit: z
    .string()
    .min(9, "El NIT debe tener minimo 9 caracteres")
    .regex(/[^A-Za-z0-9]/, "Debe contener al menos un guion medio")
    .regex(/[0-9]/, "Debe contener al menos 8 números")
    .max(13, "El Nit es demasiado largo"),

  nombre: z
    .string()
    .min(1, "El nombre es invalido")
    .max(50, "El nombre es demasiado largo"),

  razonSocial: z
    .string()
    .min(1, "Razon social invalida")
    .max(50, "Razon Social demasiada larga"),

  direccion: z
    .string()
    .min(5, "Ingrese la dirección")
    .max(100, "Direeción demasiado larga"),

  correo: z.string().email("Ingrese un email valido"),

  telefonoContacto: z
    .string()
    .regex(/^[0-9]{10}$/, "El teléfono debe tener 10 digitos"),

  estado: z.string().min(1, "Debe seleccionar un estado"),

  departamento: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.length > 0, "Debe seleccionar un departamento"),

  ciudad: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.length > 0, "Debe seleccionar una ciudad"),

  nombreContacto: z
    .string()
    .min(1, "El nombre es invalido")
    .max(50, "El nombre es demasiado largo"),
});

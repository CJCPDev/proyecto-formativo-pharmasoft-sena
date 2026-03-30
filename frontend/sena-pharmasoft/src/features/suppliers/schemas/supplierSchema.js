import { z } from "zod"

export const supplierSchema = z.object({
    nit: z
        .string()
        .min(9,"El NIT debe tener minimo 10 caracteres")
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

    correo: z
        .string()
        .email("Ingrese un email valido"),


    telContacto: z
        .string()
        .regex(/^[0-9]{10}$/, "El teléfono debe tener 10 digitos"),


    estado: z
        .string()
        .min(1, "Debe seleccionar un estado"),
    
    ciudad: z
        .string()
        .min(3, "Debe ingresar un ciudad")
        .max(50, "La ciudad es invalida"),
   
    nombreContacto: z
        .string()
        .min(1, "El nombre es invalido")
        .max(50, "El nombre es demasiado largo"),
})
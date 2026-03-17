import { z } from "zod"

export const saleSchema = z.object({
    usuario: z
        .string()
        .min(1, "Debe seleccionar un usuario"),

    farmaceuta: z
        .string()
        .min(1, "Debe seleccionar un farmaceuta"),

    sellStates: z
        .string()
        .min(1, "Debe seleccionar un estado"),

    paymentStates: z
        .string()
        .min(1, "Debe seleccionar un tipo de pago"),

})
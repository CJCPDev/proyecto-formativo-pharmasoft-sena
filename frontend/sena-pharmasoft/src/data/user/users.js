import lucho from "@/assets/images/lucho.jpg"

export const users = [
    {
        id: 1,
        nombre_completo: "Luis David Guevara Melchor",
        tipo_identificacion: "Cedula de ciudadania",
        numero_documento: 1089379683,
        rol: "Administrador",
        telefono: 3217650954,
        correo: "Luis@gmail.com",
        direccion: "Cra 12b #8-59",
        estado: "activo",
        image: lucho,
    },
    {
        id: 2,
        nombre_completo: "Camilo Jose Carmona",
        tipo_identificacion: "Cedula de ciudadania",
        numero_documento: 1088386547,
        rol: "Cliente",
        telefono: 3122315898,
        correo: "Camilo@gmail.com",
        direccion: "Cra 9 #33-16",
        estado: "activo"
        // image: laptop,
    },
    {
        id: 3,
        nombre_completo: "Federico Alarcon",
        tipo_identificacion: "Cedula de ciudadania",
        numero_documento: 15916304,
        rol: "Farmaceuta",
        telefono: 3043019448,
        correo: "Federico@gmail.com",
        direccion: "Cl 9 #15-82",
        estado: "activo"
        // image: laptop,
    },
    {
        id: 4,
        nombre_completo: "Mateo Ossa Bustamante",
        tipo_identificacion: "Cedula de ciudadania",
        numero_documento: 33916145,
        rol: "Farmaceuta",
        telefono: 3145712406,
        correo: "Mateo@gmail.com",
        direccion: "Cl 25 #2-15",
        estado: "activo"
        // image: laptop,
    }
];

export default users;
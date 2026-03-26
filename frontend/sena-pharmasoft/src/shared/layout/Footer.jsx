// Definimos las variables del footer
const footerDatos = {
    empresa: {
        nombre: "PharmaSoft",
        descripcion: "Soluciones digitales para farmacias y droguerías."
    },
    enlaces: ["Productos", "Proveedores", "Contacto"],
    contacto: {
        ciudad: "Pereira, Risaralda",
        correo: "info@pharmasoft.com",
        telefono: "+57 323 510 0106"
    }
    };

    export default function Footer() {
    return (
        <footer className="w-full bg-brand-soft/50 p-20 mt-20
        ">
        <div className="max-w-7xl m-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            
            {/* Columna 1: Información */}
            <div className="text-left">
            <h2 className="
                text-[var(--color-primary-900)]
                font-[var(--font-family-main)]
                text-[var(--text-fs-lg)]
                font-[var(--font-weight-semibold)]
            ">
                {footerDatos.empresa.nombre}
            </h2>
            <p className="
                text-[var(--color-gray-500)]
                font-[var(--font-family-secondary)]
                text-[var(--text-fs-xs)]
            ">
                {footerDatos.empresa.descripcion}
            </p>
            </div>

            {/* Columna 2: Enlaces */}
            <div className="text-left">
            <h2 className="
                text-[var(--color-primary-900)]
                font-[var(--font-family-main)]
                text-[var(--text-fs-lg)]
                font-[var(--font-weight-semibold)]
            ">
                Enlaces útiles
            </h2>
            {footerDatos.enlaces.map((enlace, index) => (
                <p 
                key={index} 
                className="
                    text-[var(--color-gray-500)]
                    font-[var(--font-family-secondary)]
                    text-[var(--text-fs-xs)]
                "
                >
                {enlace}
                </p>
            ))}
            </div>

            {/* Columna 3: Contacto */}
            <div className="text-left">
            <h2 className="
                text-[var(--color-primary-900)]
                font-[var(--font-family-main)]
                text-[var(--text-fs-lg)]
                font-[var(--font-weight-semibold)]
            ">
                Contáctanos
            </h2>
            <p className="text-[var(--color-gray-500)] font-[var(--font-family-secondary)] text-[var(--text-fs-xs)]">
                {footerDatos.contacto.ciudad}
            </p>
            <p className="text-[var(--color-gray-500)] font-[var(--font-family-secondary)] text-[var(--text-fs-xs)]">
                {footerDatos.contacto.correo}
            </p>
            <p className="text-[var(--color-gray-500)] font-[var(--font-family-secondary)] text-[var(--text-fs-xs)]">
                {footerDatos.contacto.telefono}
            </p>
            </div>
        </div>

        {/* Línea inferior */}
        <div className="
            text-[var(--color-gray-500)]
            font-[var(--font-family-secondary)]
            text-[var(--text-fs-xxs)]
            text-center
            mt-6
        ">
            © {new Date().getFullYear()} {footerDatos.empresa.nombre}. Todos los derechos reservados.
        </div>
        </footer>
    );
}

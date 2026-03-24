
    export default function Footer() {
    return (
        <footer className="w-full bg-gray-200 py-6 mt-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            
            {/* Columna 1: Información */}
            <div>
            <h2 className="text-lg font-semibold">PharmaSoft</h2>
            <p className="text-sm text-gray-600">
                Soluciones digitales para farmacias y droguerías.
            </p>
            </div>

            {/* Columna 2: Enlaces */}
            <div>
            <h2 className="text-lg font-semibold">Enlaces útiles</h2>
                <p className="text-sm text-gray-600">Productos</p>
                <p className="text-sm text-gray-600">Proveedores</p>
                <p className="text-sm text-gray-600">Contacto</p>
            </div>

            {/* Columna 3: Contacto */}
            <div>
            <h2 className="text-lg font-semibold">Contáctanos</h2>
                <p className="text-sm text-gray-600">Pereira, Risaralda</p>
                <p className="text-sm text-gray-600">info@pharmasoft.com</p>
                <p className="text-sm text-gray-600">+57 323 510 0106</p>
            </div>
        </div>

        {/* Línea inferior */}
        <div className="text-center mt-6 text-xs text-gray-500">
            © {new Date().getFullYear()} PharmaSoft. Todos los derechos reservados.
        </div>
        </footer>
    );
}
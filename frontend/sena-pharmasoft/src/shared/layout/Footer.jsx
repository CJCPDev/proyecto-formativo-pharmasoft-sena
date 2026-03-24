
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
            <ul className="space-y-1 text-sm text-gray-600">
                <li><a href="/productos" className="hover:text-blue-600">Productos</a></li>
                <li><a href="/proveedores" className="hover:text-blue-600">Proveedores</a></li>
                <li><a href="/contacto" className="hover:text-blue-600">Contacto</a></li>
            </ul>
            </div>

            {/* Columna 3: Contacto */}
            <div>
            <h2 className="text-lg font-semibold">Contáctanos</h2>
            <p className="text-sm text-gray-600">📍 Pereira, Risaralda</p>
            <p className="text-sm text-gray-600">📧 info@pharmasoft.com</p>
            <p className="text-sm text-gray-600">📞 +57 300 123 4567</p>
            </div>
        </div>

        {/* Línea inferior */}
        <div className="text-center mt-6 text-xs text-gray-500">
            © {new Date().getFullYear()} PharmaSoft. Todos los derechos reservados.
        </div>
        </footer>
    );
}
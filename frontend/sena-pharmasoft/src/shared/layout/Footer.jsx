import { Link } from "react-router-dom";

export default function Footer({showPortalEmpleados = true}) {
  return (
    // Footer principal — fondo verde corporativo
    <footer className="w-full bg-brand-hover p-6 mt-10">

      {/* Grid de 3 columnas en desktop, 1 columna en móvil */}
      <div className="max-w-7xl m-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 md:justify-items-center">
        <div>
          <h2 className="text-white font-main text-general-title font-semibold">
            PharmaSoft
          </h2>
          <p className="text-brand-soft font-secondary">
            Soluciones digitales para farmacias y droguerías.
          </p>
          {/* Enlace al portal de empleados */}
          <div className="mt-4">
            {showPortalEmpleados && (
              <Link to="/Login">
                <span className="text-brand-soft text-xl hover:underline">
                  Ingreso portal empleados
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* Columna 2: Enlaces útiles */}
        <div>
          <h2 className="text-white font-main text-general-title font-semibold">
            Enlaces útiles
          </h2>
          <div className="grid text-brand-soft gap-1 mt-1">
            <span>Productos</span>
            <span>Proveedores</span>
            <span>Contacto</span>
          </div>
        </div>

        {/* Columna 3: Información de contacto */}
        <div>
          <h2 className="text-white font-main text-general-title font-semibold">
            Contáctanos
          </h2>
          <p className="text-brand-soft font-secondary">Pereira, Risaralda</p>
          <p className="text-brand-soft font-secondary text-info-general">info@pharmasoft.com</p>
          <p className="text-brand-soft font-secondary text-info-general">+57 3235100106</p>
        </div>

      </div>

      {/* Línea de derechos reservados — centrada siempre */}
      <div className="text-brand-soft font-secondary text-info-regular text-center mt-6 border-t border-white/20 pt-4">
        {new Date().getFullYear()} PharmaSoft. Todos los derechos reservados.
      </div>

    </footer>
  );
}
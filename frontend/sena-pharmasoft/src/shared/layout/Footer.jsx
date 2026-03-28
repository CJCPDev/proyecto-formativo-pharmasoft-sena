export default function Footer() {
  return (
    <footer
      className="w-full bg-brand-soft/50 p-6 mt-10
        "
    >
      <div className="max-w-7xl m-auto grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center md:text-left">

        <div className="text-left">
          <h2
            className="
                text-brand-hover
                font-main
                text-general-title
                font-semibold
            "
          >
            <span>PharmaSoft</span>
          </h2>
          <p
            className="
                text-text-mute
                font-secondary
            "
          >
            <span>Soluciones digitales para farmacias y droguerías.</span>
          </p>
        </div>


        <div className="text-left">
          <h2
            className="
                text-brand-hover
                font-main
                text-general-title
                font-semibold
            "
          >
            Enlaces útiles
          </h2>
          <div className="grid text-text-mute">
            <span>Productos</span>
            <span>Proveedores</span>
            <span>Contacto</span>
          </div>
        </div>

        {/* Columna 3: Contacto */}
        <div className="text-left">
          <h2
            className="
                text-brand-hover
                font-main
                text-general-title
                font-semibold
            "
          >
            Contáctanos
          </h2>
          <p
            className="
                text-text-mute
                font-secondary
                "
          >
            <span>Pereira, Risaralda</span>
          </p>
          <p
            className="
                text-text-mute
                font-secondary 
                text-info-general"
          >
            <span>info@pharmasoft.com</span>
          </p>
          <p
            className="
                text-text-mute
                font-secondary 
                text-info-general"
          >
            <span>+57 3235100106</span>
          </p>
        </div>
      </div>

      {/* Línea inferior */}
      <div
        className="
            text-text-mute
            font-secondary
            text-info-regular
            text-center
            mt-6
        "
      >
        {new Date().getFullYear()} PharmaSoft. Todos los derechos reservados.
      </div>
    </footer>
  );
}

<<<<<<< HEAD
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
        <footer className="w-full bg-brand-soft/50 p-6 mt-10
        ">
        <div className="max-w-7xl m-auto grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center md:text-left">
            
            {/* Columna 1: Información */}
            <div className="text-left">
            <h2 className="
=======
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
>>>>>>> piloto_backend
                text-brand-hover
                font-main
                text-general-title
                font-semibold
<<<<<<< HEAD
            ">
                {footerDatos.empresa.nombre}
            </h2>
            <p className="
                text-text-mute
                font-secondary
            ">
                {footerDatos.empresa.descripcion}
            </p>
            </div>

            {/* Columna 2: Enlaces */}
            <div className="text-left">
            <h2 className="
                text-brand-hover
                font-main
                text-general-title
                font-semibold
            ">
                Enlaces útiles
            </h2>
            {footerDatos.enlaces.map((enlace, index) => (
                <p 
                key={index} 
                className="
                    text-text-mute
                    font-secondary
                "
                >
                {enlace}
                </p>
            ))}
            </div>

            {/* Columna 3: Contacto */}
            <div className="text-left">
            <h2 className="
                text-brand-hover
                font-main
                text-general-title
                font-semibold
            ">
                Contáctanos
            </h2>
            <p className="
                text-text-mute
                font-secondary
                ">
                {footerDatos.contacto.ciudad}
            </p>
            <p className="
                text-text-mute
                font-secondary 
                text-info-general">
                {footerDatos.contacto.correo}
            </p>
            <p className="
                text-text-mute
                font-secondary 
                text-info-general">
                {footerDatos.contacto.telefono}
            </p>
            </div>
        </div>

        {/* Línea inferior */}
        <div className="
=======
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
>>>>>>> piloto_backend
            text-text-mute
            font-secondary
            text-info-regular
            text-center
            mt-6
<<<<<<< HEAD
        ">
            {new Date().getFullYear()} {footerDatos.empresa.nombre}. Todos los derechos reservados.
        </div>
        </footer>
    );
=======
        "
      >
        {new Date().getFullYear()} PharmaSoft. Todos los derechos reservados.
      </div>
    </footer>
  );
>>>>>>> piloto_backend
}

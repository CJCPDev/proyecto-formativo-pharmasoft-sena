// // Hook para manejo de estado local en componentes funcionales
// import { useState } from "react";


// // Configuración de campos disponibles para el reporte
// import { productReportFields } from "../config/productReportFields";


// // Caso de uso que orquesta la generación del reporte
// import { generateProductReport } from "../services/generateProductReport";


// // Componentes UI reutilizables (design system)
// import { Button, Input, Select, Checkbox } from "@/shared/components";
// // import Checkbox from "@/shared/components/Checkbox";


// // Componente modal para configuración de reportes
// export default function ReportConfigModal({ isOpen, onClose }) {


//   // Estado del formato de salida
//     const [format, setFormat] = useState("pdf");


//     // Estado del alcance del reporte
//     const [scope, setScope] = useState("all");


//     // Estado para filtro por forma farmaceutica
//     const [formaFarmaceutica, setformaFarmaceutica] = useState("");


//     // Estado de campos seleccionados (inicialización lazy)
//     const [selectedFields, setSelectedFields] = useState(() =>
//         productReportFields.filter((f) => f.default) // Solo campos marcados por defecto
//     );


//     // Control de render: si el modal no está abierto, no se monta en el DOM
//     if (!isOpen) return null;


//     // Handler para activar/desactivar campos del reporte
//     const handleFieldToggle = (field) => {


//         // Verifica si el campo ya está seleccionado
//         const exists = selectedFields.find((f) => f.key === field.key);


//         if (exists) {
//         // Elimina el campo si ya existe
//         setSelectedFields(
//             selectedFields.filter((f) => f.key !== field.key)
//         );
//         } else {
//         // Agrega el campo si no existe
//         setSelectedFields([
//             ...selectedFields,
//             field
//         ]);
//         }
//     };


//     const handleGenerateReport = async () => {
//     await generateProductReport({
//         format,
//         selectedFields,
//         scope,
//         formaFarmaceutica,
//     });
//     onClose();
//     };


//     return (
//         // Overlay del modal
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">


//         {/* Contenedor del modal */}
//         <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">


//             {/* Título */}
//             <h2 className="mb-6 text-xl font-semibold">
//             Generar reporte de productos
//             </h2>

//             {/* Selección de formato */}
//             <div className="mb-4">
//             <Select
//                 label="Formato del reporte"
//                 value={format}
//                 onChange={(e) => setFormat(e.target.value)}
//                 options={[
//                 { label: "PDF", value: "pdf" },
//                 { label: "Excel", value: "excel" },
//                 ]}
//             />
//             </div>


//             {/* Selección de campos */}
//             <div className="mb-4">
//             <p className="mb-2 font-medium">Campos del reporte</p>


//             {/* Grid de checkboxes */}
//             <div className="grid grid-cols-2 gap-2">
//                 {productReportFields.map((field) => {


//                 // Determina si el campo está seleccionado
//                 const checked = selectedFields.some(
//                     (f) => f.key === field.key
//                 );


//                 return (
//                     <Checkbox
//                     key={field.key}         // Key única para renderizado
//                     id={field.key}          // Id accesible
//                     name={field.key}        // Nombre del campo
//                     label={field.label}     // Texto visible
//                     checked={checked}       // Estado controlado
//                     onChange={() => handleFieldToggle(field)} // Toggle
//                     />
//                 );
//                 })}
//             </div>
//             </div>

//             {/* Selección de alcance */}
//             <div className="mb-4">
//             <Select
//                 label="Alcance del reporte"
//                 value={scope}
//                 onChange={(e) => setScope(e.target.value)}
//                 options={[
//                 { label: "Todos los productos", value: "all" },
//                 { label: "Filtrar por Forma Farmaceutica", value: "formaFarmaceutica" },
//                 ]}
//             />
//             </div>


//             {/* Campo condicional para filtro por documento */}
//             {scope === "formaFarmaceutica" && (
//             <div className="mb-4">
//                 <Input
//                 label="Forma farmacéutica"
//                 value={formaFarmaceutica}
//                 onChange={(e) => setformaFarmaceutica(e.target.value)}
//                 placeholder="Ej: Tableta, jarabe"
//                 />
//             </div>
//             )}


//             {/* Acciones del modal */}
//             <div className="flex justify-end gap-2 mt-6">


//             {/* Botón cancelar */}
//             <Button variant="secondary" onClick={onClose}>
//                 Cancelar
//             </Button>


//             {/* Botón generar reporte */}
//             <Button variant="primary" onClick={handleGenerateReport}>
//                 Generar reporte
//             </Button>


//             </div>
//         </div>
//         </div>
//     );
// }
// useState maneja los estados del formulario de configuración del reporte
import { useState } from "react";

// Array que define todos los campos disponibles para incluir en el reporte
import { productReportFields } from "../config/productReportFields";

// Función que orquesta la generación y descarga del reporte según la configuración
import { generateProductReport } from "../services/generateProductReport";

// Componentes de UI reutilizables del sistema de diseño
import { Button, Input, Select, Checkbox } from "@/shared/components";

// Recibe isOpen para controlar su visibilidad y onClose para cerrarse desde el padre
export default function ReportConfigModal({ isOpen, onClose }) {

  // Formato de salida del reporte: "pdf" o "excel"
    const [format, setFormat] = useState("pdf");

    // Alcance del reporte: "all" para todos los productos o "formaFarmaceutica" para filtrar
    const [scope, setScope] = useState("all");

    // Valor del filtro de forma farmacéutica, solo se usa cuando scope es "formaFarmaceutica"
    const [formaFarmaceutica, setformaFarmaceutica] = useState("");

    // Campos seleccionados para incluir en el reporte.
    // La inicialización lazy evita recalcular el array en cada render:
    // solo toma los campos marcados como default en la configuración.
    const [selectedFields, setSelectedFields] = useState(() =>
        productReportFields.filter((f) => f.default)
    );

    // Si el modal está cerrado no lo montamos en el DOM para ahorrar recursos
    if (!isOpen) return null;

    // Agrega o elimina un campo de la lista de campos seleccionados
    const handleFieldToggle = (field) => {
        const exists = selectedFields.find((f) => f.key === field.key);

        if (exists) {
        // Si el campo ya estaba seleccionado lo quitamos de la lista
        setSelectedFields(selectedFields.filter((f) => f.key !== field.key));
        } else {
        // Si el campo no estaba seleccionado lo agregamos al final de la lista
        setSelectedFields([...selectedFields, field]);
        }
    };

    // Llama al servicio de generación con la configuración actual y cierra el modal al terminar
    const handleGenerateReport = async () => {
        await generateProductReport({ format, selectedFields, scope, formaFarmaceutica });
        onClose();
    };

    return (
        // Overlay oscuro que cubre toda la pantalla y centra el modal
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

        {/* Contenedor del modal */}
        <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">

            <h2 className="mb-6 text-xl font-semibold">
            Generar reporte de productos
            </h2>

            {/* Selector del formato de salida: PDF o Excel */}
            <div className="mb-4">
            <Select
                label="Formato del reporte"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                options={[
                { label: "PDF", value: "pdf" },
                { label: "Excel", value: "excel" },
                ]}
            />
            </div>

            {/* Lista de campos disponibles para incluir en el reporte */}
            <div className="mb-4">
            <p className="mb-2 font-medium">Campos del reporte</p>

            {/* Grilla de checkboxes, uno por cada campo disponible */}
            <div className="grid grid-cols-2 gap-2">
                {productReportFields.map((field) => {

                // Verificamos si este campo está en la lista de seleccionados
                const checked = selectedFields.some((f) => f.key === field.key);

                return (
                    <Checkbox
                    key={field.key}
                    id={field.key}
                    name={field.key}
                    label={field.label}
                    checked={checked}
                    onChange={() => handleFieldToggle(field)}
                    />
                );
                })}
            </div>
            </div>

            {/* Selector del alcance: todos los productos o filtrado por forma farmacéutica */}
            <div className="mb-4">
            <Select
                label="Alcance del reporte"
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                options={[
                { label: "Todos los productos", value: "all" },
                { label: "Filtrar por Forma Farmaceutica", value: "formaFarmaceutica" },
                ]}
            />
            </div>

            {/* Campo de texto que aparece solo cuando el alcance es "formaFarmaceutica" */}
            {scope === "formaFarmaceutica" && (
            <div className="mb-4">
                <Input
                label="Forma farmacéutica"
                value={formaFarmaceutica}
                onChange={(e) => setformaFarmaceutica(e.target.value)}
                placeholder="Ej: Tableta, jarabe"
                />
            </div>
            )}

            {/* Botones de acción alineados a la derecha */}
            <div className="flex justify-end gap-2 mt-6">
            <Button variant="secondary" onClick={onClose}>
                Cancelar
            </Button>
            <Button variant="primary" onClick={handleGenerateReport}>
                Generar reporte
            </Button>
            </div>

        </div>
        </div>
    );
}
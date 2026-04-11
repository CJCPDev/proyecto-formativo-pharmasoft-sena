// import React from "react";
// import AdminProductForm from "../components/AdminProductForm";
// import { useLocation } from "react-router-dom";

// export default function CreateProductPage() {
//   const location = useLocation();
//   const onCreated = location.state?.onCreated;

//   return (
//     <div className="relative grid gap-6 bg-white rounded-xl shadow-2xl p-4">
//       {/*  Pasamos la función al formulario */}
//       <AdminProductForm onCreated={onCreated} />
//     </div>
//   );
// }
// React es necesario en archivos que contienen JSX
import React from "react";

// Formulario reutilizable para crear y editar medicamentos
import AdminProductForm from "../components/AdminProductForm";

// useLocation permite leer el estado que se pasó al navegar a esta ruta
import { useLocation } from "react-router-dom";

export default function CreateProductPage() {
  const location = useLocation();

  // Recuperamos el callback onCreated que pudo haber enviado la página anterior
  // al navegar hacia aquí. Si no se envió, queda undefined y el formulario lo ignora.
  const onCreated = location.state?.onCreated;

  return (
    <div className="relative grid gap-6 bg-white rounded-xl shadow-2xl p-4">
      {/* Le pasamos el callback al formulario para que lo ejecute tras crear el medicamento */}
      <AdminProductForm onCreated={onCreated} />
    </div>
  );
}
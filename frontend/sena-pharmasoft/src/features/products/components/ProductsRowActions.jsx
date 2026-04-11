// // Iconos usados en los botones de acciones
// import { Pencil, Eye } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// // Componente que renderiza las acciones de cada fila de producto (medicamento)
// export default function ProductsRowActions({ products }) {
//   // Hook de React Router para navegar programáticamente
//   const navigate = useNavigate();

//   // Acción para editar el medicamento
//   // Redirige a la página de edición usando el id del medicamento
//   const handleEdit = () => {
//     navigate(`/editar-medicamento/${products.id_medicamento}`);
//   };

//   // Acción para visualizar el medicamento
//   // Redirige a la página de detalle usando el id del medicamento
//   const handleDetail = () => {
//     navigate(`/ver-medicamento/${products.id_medicamento}`);
//   };

//   return (
//     <div className="flex gap-4 items-center justify-center">
//       {/* Botón editar */}
//       <div className="relative group w-max">
//         <button
//           onClick={handleEdit}
//           className="py-1 rounded cursor-pointer hover:bg-gray-100 transition-colors"
//         >
//           {/* Icono de lápiz */}
//           <Pencil size={18} className="stroke-brand-fort" />
//         </button>
//         {/* Tooltip que aparece al pasar el mouse */}
//         <span
//           className="
//             absolute top-6 -right-4 opacity-0 
//             group-hover:opacity-100 transition-opacity duration-700
//             bg-brand-hover text-white text-sm p-1 rounded z-15
//           "
//         >
//           Editar
//         </span>
//       </div>

//       {/* Botón visualizar */}
//       <div className="relative group w-max">
//         <button
//           onClick={handleDetail}
//           className="py-1 rounded cursor-pointer hover:bg-gray-100 transition-colors"
//         >
//           {/* Icono de ojo */}
//           <Eye size={20} className="stroke-brand-fort" />
//         </button>
//         {/* Tooltip que aparece al pasar el mouse */}
//         <span
//           className="
//             absolute top-6 -right-6 opacity-0 
//             group-hover:opacity-100 transition-opacity duration-700
//             bg-brand-hover text-white text-sm p-1 rounded z-15
//           "
//         >
//           Visualizar
//         </span>
//       </div>
//     </div>
//   );
// }
// Iconos para los botones de acción: Pencil para editar, Eye para ver el detalle
import { Pencil, Eye } from "lucide-react";

// useNavigate permite redirigir programáticamente al hacer clic en cada acción
import { useNavigate } from "react-router-dom";

// Recibe el objeto products con los datos de la fila actual de la tabla
export default function ProductsRowActions({ products }) {
  const navigate = useNavigate();

  // Redirige a la página de edición pasando el id del medicamento en la URL
  const handleEdit = () => {
    navigate(`/editar-medicamento/${products.id_medicamento}`);
  };

  // Redirige a la página de detalle pasando el id del medicamento en la URL
  const handleDetail = () => {
    navigate(`/ver-medicamento/${products.id_medicamento}`);
  };

  return (
    <div className="flex gap-4 items-center justify-center">

      {/* Botón de edición con tooltip al hacer hover */}
      <div className="relative group w-max">
        <button
          onClick={handleEdit}
          className="py-1 rounded cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <Pencil size={18} className="stroke-brand-fort" />
        </button>
        {/* Tooltip visible solo al pasar el mouse, con retardo en la transición */}
        <span className="absolute top-6 -right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-brand-hover text-white text-sm p-1 rounded z-15">
          Editar
        </span>
      </div>

      {/* Botón de visualización con tooltip al hacer hover */}
      <div className="relative group w-max">
        <button
          onClick={handleDetail}
          className="py-1 rounded cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <Eye size={20} className="stroke-brand-fort" />
        </button>
        {/* Tooltip visible solo al pasar el mouse, con retardo en la transición */}
        <span className="absolute top-6 -right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-brand-hover text-white text-sm p-1 rounded z-15">
          Visualizar
        </span>
      </div>

    </div>
  );
}
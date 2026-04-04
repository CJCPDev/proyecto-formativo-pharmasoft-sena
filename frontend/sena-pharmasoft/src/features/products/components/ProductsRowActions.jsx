// Iconos usados en los botones de acciones
import { Pencil, Eye } from "lucide-react";

// Hook de React Router para navegar programáticamente entre rutas
import { useNavigate } from "react-router-dom";

// Componente que renderiza las acciones de cada fila de usuario
// Recibe como prop el objeto user
export default function ProductsRowActions({ products }) {

  // Hook que permite redirigir a otra ruta desde código
    const navigate = useNavigate();

    // Acción para editar el usuario
    // Redirige a la página de edición usando el id del usuario
    const handleEdit = () => {
        navigate(`/editar-medicamento/${products.id_medicamento}`);
    };

    const handleDetail = () => {
        navigate(`/ver-medicamento/${products.id_medicamento}`);
    };

    return (
        // Contenedor de los botones de acciones
        <div className="flex gap-4 items-center justify-center">

        {/* Botón editar */}
        <div className="relative group w-max">
        <button
            onClick={handleEdit} // Ejecuta la navegación a la página de edición
            className="py-1 rounded cursor-pointer"
        >
            <Pencil size={18} className="stroke-brand-fort"/> {/* Icono de editar */}
        </button>
                        <span className="
                        absolute
                        top-6
                        -right-4
                        opacity-0 
                        group-hover:opacity-100
                        transition-opacity duration-700
                        bg-brand-hover
                        text-white
                        text-sm 
                        p-1
                        rounded
                        z-15
                        ">Editar
                    </span>
</div>
        {/* Botón eliminar */}
        <div className="relative group w-max">
            <button
                onClick={handleDetail} // Ejecuta la acción de eliminación
                className="relative py-1 rounded cursor-pointer"
            >
                <Eye size={20} className="stroke-brand-fort"/> {/* Icono de eliminar */}
                    </button>
                    <span className="
                        absolute
                        top-6
                        -right-6
                        opacity-0 
                        group-hover:opacity-100
                        transition-opacity duration-700
                        bg-brand-hover
                        text-white
                        text-sm 
                        p-1
                        rounded
                        z-15
                    ">Visualizar
                </span>
            </div>
        </div>
    );
}

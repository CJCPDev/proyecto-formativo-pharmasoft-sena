
// Formulario reutilizable que funciona tanto para crear como para editar.
// Detecta internamente si está en modo edición leyendo el id de la URL con useParams.
import AdminProductForm from "../components/AdminProductForm"

export default function MedicamentosEditPage() {
    return (
        // Contenedor con fondo blanco, bordes redondeados y sombra pronunciada
        <div className="relative grid gap-6 bg-white rounded-xl shadow-2xl p-4">
            <AdminProductForm />
        </div>
    )
}
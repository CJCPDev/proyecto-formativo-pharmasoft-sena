// useState maneja el estado del switch de activación
import { useState } from "react";

// Componente reutilizable que renderiza un interruptor de estado activo/inactivo
import { StatusSwitch } from "@/shared/components";

export default function ConfigProductPage() {

  // Controla si el producto está activo o inactivo. Inicia en true (activo por defecto)
    const [isActive, setIsActive] = useState(true);

    // Recibe el nuevo valor desde el switch y actualiza el estado.
    // Aquí se conectaría la llamada a la API para persistir el cambio en el servidor.
    const handleStatusChange = (value) => {
        setIsActive(value);
        console.log("Nuevo estado:", value);
    };

    return (
        <div className="p-6 max-w-md space-y-4">

        <h2 className="text-lg font-semibold">
            Configuración de Producto
        </h2>

        {/* Fila que muestra la opción de configuración con su switch a la derecha */}
        <div className="flex items-center justify-between border p-4 rounded-lg">

            {/* Texto descriptivo de la opción */}
            <div>
            <p className="font-medium">Producto activo</p>
            <p className="text-sm text-gray-500">
                Permite que el usuario pueda iniciar sesión
            </p>
            </div>

            {/* Switch que refleja el estado actual y notifica los cambios al padre */}
            <StatusSwitch
            checked={isActive}
            onChange={handleStatusChange}
            size="md"
            />

        </div>
        </div>
    );
    }
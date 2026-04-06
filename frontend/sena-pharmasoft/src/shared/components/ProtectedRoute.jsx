// ─────────────────────────────────────────────
// ProtectedRoute.jsx
// Componente que protege las rutas del sistema
// Si el usuario no está autenticado lo redirige al login
// ─────────────────────────────────────────────

import { Navigate } from "react-router-dom";
import { estaAutenticado, getUsuarioActual } from "../../features/auth/services/authService";

export default function ProtectedRoute ({ children, rolesPermitidos}) {

    const autenticado = estaAutenticado();
    const usuario = getUsuarioActual();

    //Si no esta autenticado lo mandamos al login
    if (!autenticado) {
        return <Navigate to="/login" replace/>;
    }

    //Si se especificaron roles permitidos, verificamos que el usuario tenga el rol correcto
    if (rolesPermitidos) {
        if (!rolesPermitidos.includes(usuario?.id_rol)) {
            //Si no tiene el rol correcto lo mandamos al login
            return <Navigate to="/login" replace />;
        }
    }

    //Si está autenticado y tiene el rol correcto mostramos la página
    return children;
}
import { Button, Input, Modal } from "@/shared/components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authService";
import { loginSchema } from "../schemas/loginSchema";

export default function LoginForm() {
  const navigate = useNavigate();

  //Estado del formulario
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //Estado para mostrar errores
  const [error, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  //Estado para mostrar el loading mientas inicia sesión
  const [loading, setLoading] = useState(false);

  //Actualiza el estado cuando el usuario escribe
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = loginSchema.safeParse(formData);
      // Si la validación falla
      if (!result.success) {
        // Objeto donde se almacenarán los errores por campo
        const fieldErrors = {};
        // Zod devuelve los errores en un arreglo llamado issues
        // Se recorren para asociar cada error a su campo correspondiente
        result.error.issues.forEach((issue) => {
          // issue.path contiene la ruta del campo que falló
          const field = issue.path[0];
          // Se guarda el mensaje de error en el objeto fieldErrors
          fieldErrors[field] = issue.message;
        });
        // Se actualiza el estado de errores para mostrarlos en el formulario
        setErrors(fieldErrors);
        // Se detiene la ejecución porque el formulario tiene errores
        return;
      }
      const data = await login(formData.email, formData.password);

      //Redirigimos según el rol del usuario
      if (data.usuario.id_rol === 1) {
        //Administrador va al dashboard principal
        navigate("/DashboardMain");
      } else if (data.usuario.id_rol === 3) {
        //Farmaceuta por definir ruta
        navigate("/medicamentos");
      }
    } catch (error) {
      //Mostramos el mensaje de error que devuelve Django
      const mensaje = error.response?.data.error || "Error al iniciar sesión";
      setModalMessage(mensaje);
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="
            relative
            px-6 py-12 
            grid grid-cols-1 gap-2
            bg-white
            shadow-2xl
            ring-1
            ring-brand-soft/80
            rounded-xl
            font-main
            w-94
            h-auto
            "
      >
        <h1 className="text-general-title text-brand-fort font-extrabold text-center">
          Iniciar sesion
        </h1>
        <Input
          label="Email"
          placeholder="Ingresa tu correo"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={error.email}
        ></Input>
        <Input
          label="Contraseña"
          type="password"
          placeholder="Ingresa su contraseña"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={error.password}
        ></Input>

        <Link
          to="/forgot-password"
          className="text-info-regular text-center underline text-secondary text-brand-hover hover:font-extrabold"
        >
          ¿Olvidaste tu contraseña?
        </Link>
        <div className="flex items-center justify-center gap-12">
          <Button
            variant="secondary"
            size="md"
            type="submit"
            disabled={loading}
          >
            {loading ? "Iniciando..." : "Iniciar sesión"}
            {/* Iniciar sesion */}
          </Button>
        </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>{modalMessage}</Modal>
        )}
      </form>
    </div>
  );
}

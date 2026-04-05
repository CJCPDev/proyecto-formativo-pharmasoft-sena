
import { Title, Input, Select, Button, AvatarUploader } from "@/shared/components"
import { useState, useEffect } from "react"
import { userSchema } from "../schemas/userSchema"
import { useNavigate } from "react-router-dom"
import { Plus, Minus } from "lucide-react"
import { getDocumentTypes, getUsersGroups } from "../services/selectService";

import { createUsuario } from "../services/usuarioService"

export default function UserForm() {

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [mostrarTelefonoAdicional, setMostrarTelefonoAdicional] = useState(false);

  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [roles, setRoles] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    userEmail: "",
    validationEmail: "",
    phone: "",
    phoneAdicional: "",
    documentType: "",
    documentNumber: "",
    userGroup: "",
    direccion: "",
    avatarUrl: null,
    fechaInicio: "",
    fechaFin: "",
  });


  
  useEffect(() => {
    const cargarSelects = async () => {
      const tipos = await getDocumentTypes();
      const grupos = await getUsersGroups();

      setTiposDocumento(tipos);
      setRoles(grupos);
    };

    cargarSelects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = userSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await createUsuario(formData);

      alert("Usuario creado correctamente");
      navigate(-1);

    } catch (error) {
      console.error("Error al guardar el usuario:", error);
      alert("Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white grid gap-2 w-350 rounded-xl">

      <Title title="Crear Usuarios" />

      <form onSubmit={handleSubmit} className="w-full px-6 rounded-xl">
        <div className="grid grid-cols-3 gap-4">

          <div className="flex flex-col gap-3">

            <Select
              label="Tipo de documento"
              name="documentType"
              value={formData.documentType}
              options={tiposDocumento}
              onChange={handleChange}
              error={errors.documentType}
            />

            <Input
              label="Número de documento"
              name="documentNumber"
              value={formData.documentNumber}
              onChange={handleChange}
              error={errors.documentNumber}
            />

            <Input
              label="Nombre completo"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />

            <Input
              label="Correo electrónico"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              error={errors.userEmail}
            />

            <Input
              label="Confirmar correo"
              name="validationEmail"
              value={formData.validationEmail}
              onChange={handleChange}
              error={errors.validationEmail}
            />
          </div>

          <div className="flex flex-col gap-3">

            <Input
              label="Dirección"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              error={errors.direccion}
            />

            <Select
              label="Grupo del usuario"
              name="userGroup"
              value={formData.userGroup}
              options={roles}
              onChange={handleChange}
              error={errors.userGroup}
            />

            <div className="flex flex-col gap-2">

              <Button
                type="button"
                onClick={() =>
                  setMostrarTelefonoAdicional((prev) => !prev)
                }
              >
                {mostrarTelefonoAdicional ? <Minus /> : <Plus />}
                {mostrarTelefonoAdicional ? "Quitar Teléfono" : "Agregar Teléfono"}
              </Button>

              <Input
                label="Celular"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
              />

              {mostrarTelefonoAdicional && (
                <Input
                  label="Celular adicional"
                  name="phoneAdicional"
                  value={formData.phoneAdicional}
                  onChange={handleChange}
                  error={errors.phoneAdicional}
                />
              )}

            </div>

          </div>

          <div className="flex flex-col gap-3 p-9">
            <div className="bg-brand-soft/40 flex items-center justify-center h-full rounded-lg">
              <AvatarUploader
                onUpload={(file) =>
                  setFormData((prev) => ({ ...prev, avatarUrl: file }))
                }
              />
            </div>
          </div>

        </div>

        <div className="flex justify-center pt-6">
          <Button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Crear"}
          </Button>
        </div>

      </form>
    </div>
  );
}
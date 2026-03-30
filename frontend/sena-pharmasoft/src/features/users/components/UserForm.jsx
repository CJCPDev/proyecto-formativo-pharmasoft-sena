import "../../users/services/selectService"
import documentTypes from "../../../data/selects/documentTypes.json"
import userGroups from "../../../data/selects/userGroups.json"
import { Title, Input, Select, Button, AvatarUploader } from "@/shared/components"
import { useState } from "react"
import { userSchema } from "../schemas/userSchema"
import { useNavigate, useParams } from "react-router-dom"
import { Plus, Minus } from "lucide-react"
// import { getDocumentTypes } from "../../users/services/selectService"
import { users } from "@/data/users/users"
// import { IconButton } from "../../../shared/components"

export default function UserForm() {

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const user = isEdit ? users.find((u) => u.id === Number(id)) : null;

  const [formData, setFormData] = useState({
    name: user?.name || "",
    userEmail: user?.userEmail || "",
    validationEmail: user?.validationEmail || "",
    phone: user?.phone || "",
    phoneAdicional: user?.phoneAdicional || "",
    documentType: user?.documentType || "",
    documentNumber: user?.documentNumber || "",
    userGroup: user?.userGroup || "",
    direccion: user?.direccion || "",
    avatarUrl: user?.avatarUrl || null,
    fechaInicio: user?.fechaInicio || "",
    fechaFin: user?.fechaFin || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = userSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    console.log("Usuario válido:", result.data);
  };

  const [errors, setErrors] = useState({});
  const [mostrarTelefonoAdicional, setMostrarTelefonoAdicional] = useState(false);
  const esFarmaceuta = formData.userGroup === "3";

  return (
    <div className="bg-white grid gap-2 w-350 rounded-xl">
      {/* <Title title="Creación de Usuario" /> */}
          
      {isEdit ? <Title title="Editar Usuario"/> : <Title title="Crear Usuarios"/>}

      <form onSubmit={handleSubmit} className="w-full px-6 rounded-xl">
        <div className="grid grid-cols-3 gap-4">

          {/* ── Columna 1 ── */}
          <div className="flex flex-col gap-3">
            <Select
              label="Tipo de documento"
              name="documentType"
              value={formData.documentType}
              options={documentTypes}
              onChange={handleChange}
              error={errors.documentType}
            />
            <Input
              label="Número de documento"
              placeholder="Número de documento"
              name="documentNumber"
              value={formData.documentNumber}
              onChange={handleChange}
              error={errors.documentNumber}
            />
            <Input
              label="Nombre completo"
              placeholder="Nombre completo"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <Input
              label="Correo electrónico"
              placeholder="Correo electrónico"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              error={errors.userEmail}
            />
            <Input
              label="Confirmar correo electrónico"
              placeholder="Confirmar correo electrónico"
              name="validationEmail"
              value={formData.validationEmail}
              onChange={handleChange}
              error={errors.validationEmail}
            />
          </div>

          {/* ── Columna 2 ── */}
          <div className="flex flex-col justify-between gap-2">

            {/* Bloque superior */}
            <div className="flex flex-col gap-2">
              <Input
                label="Dirección"
                placeholder="Dirección"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                error={errors.direccion}
              />
              <Select
                label="Grupo del usuario"
                name="userGroup"
                value={formData.userGroup}
                options={userGroups}
                onChange={handleChange}
                error={errors.userGroup}
              />
              <div className="flex justify-center py-8">
                <Button
                  variant="primary"
                  size="md"
                  type="button"
                  onClick={() => navigate("/permisos")}
                  >
                    Agregar Rol
                  </Button>
              </div>
            </div>

            {/* Bloque inferior — celulares al fondo */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                {/* <span className="text-sm text-gray-500">Agregar teléfono</span> */}
                <Button
                  size="md"
                  aria-label="Adiccionar teléfono"
                  onClick={() => setMostrarTelefonoAdicional(!mostrarTelefonoAdicional)}
                >
                  {mostrarTelefonoAdicional ? <Minus /> : <Plus />}
                  {mostrarTelefonoAdicional ? "Quitar Telefono" : "Agregar Telefono"}
                </Button>
              </div>
              <div className={`grid gap-3 ${mostrarTelefonoAdicional ? "grid-cols-2" : "grid-cols-1"}`}>
                <Input
                  label="Celular"
                  type="tel"
                  name="phone"
                  placeholder="Celular"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                />
                {mostrarTelefonoAdicional && (
                  <Input
                    label="Celular adicional"
                    type="tel"
                    name="phoneAdicional"
                    placeholder="Celular adicional"
                    value={formData.phoneAdicional}
                    onChange={handleChange}
                    error={errors.phoneAdicional}
                  />
                )}
              </div>
            </div>

          </div>

          {/* ── Columna 3 — Fechas + Avatar ── */}
          <div className="flex flex-col gap-3 p-9">

            {/* Fechas — solo si es Farmaceuta, encima del avatar */}
            {esFarmaceuta && (
              <div className="grid grid-cols-2 gap-3 -mt-8.75">
                <Input
                  type="date"
                  label="Fecha Inicio"
                  name="fechaInicio"
                  value={formData.fechaInicio}
                  onChange={handleChange}
                  error={errors.fechaInicio}
                />
                <Input
                  type="date"
                  label="Fecha Fin"
                  name="fechaFin"
                  value={formData.fechaFin}
                  onChange={handleChange}
                  error={errors.fechaFin}
                />
              </div>
            )}

            {/* Avatar */}
            <div className="bg-brand-soft/40 flex text-center items-center w-full h-full rounded-lg">
              <AvatarUploader
                onUpload={(url) =>
                  setFormData((prev) => ({ ...prev, avatarUrl: url }))
                }
              />
            </div>

          </div>

        </div>

        {/* Botones */}
    <div className="flex gap-6 justify-center items-center pt-8 pb-4">
                {isEdit ? (
                    <>
                    <Button 
                        onClick={() => navigate(-1)}
                        variant="secondary" 
                        size="sm"
                    >
                        Cancelar
                    </Button>
                    <Button variant="primary" size="md" type="submit">
                        Actualizar
                    </Button>
                    </>
                ) : (
                    <>
                    <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => navigate(-1)}
                    >
                        Regresar
                    </Button>
                    <Button variant="primary" size="md" type="submit">
                        Crear
                    </Button>
                    </>
                )}
            </div>
      </form>
    </div>
  );
}
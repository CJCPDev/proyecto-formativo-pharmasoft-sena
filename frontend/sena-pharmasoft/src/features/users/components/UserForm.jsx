// ─────────────────────────────────────────────
// UserForm.jsx
// Formulario para crear y editar usuarios.
// Los tipos de documento y grupos se cargan desde la API de Django
// La imagen se sube al servidor cuando se guarda el formulario
// ─────────────────────────────────────────────

import { Title, Input, Select, Button, AvatarUploader } from "@/shared/components"
import { useState, useEffect } from "react"
import { userSchema } from "../schemas/userSchema"
import { useNavigate, useParams } from "react-router-dom"
import { Plus, Minus } from "lucide-react"

// Importamos los servicios de usuario
import {
  createUsuario,
  updateUsuario,
  getUsuario,
  getTiposDocumento,
  getRoles,
  subirAvatar
} from "../services/usuarioService"

// Importamos el modal de permisos y su servicio
import PermisosModal from "../components/PermisosModal"
import { guardarPermisosUsuario, getPermisos } from "../services/permisosService"

export default function UserForm() {

  const navigate = useNavigate();
  const { id } = useParams();

  // Si hay un ID en la URL, estamos en modo edición
  const isEdit = Boolean(id);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [mostrarTelefonoAdicional, setMostrarTelefonoAdicional] = useState(false);

  // Estado para los tipos de documento que vienen de la API
  const [tiposDocumento, setTiposDocumento] = useState([]);

  // Estado para los roles que vienen de la API
  const [roles, setRoles] = useState([]);

  // Estado para controlar la apertura del modal de permisos
  const [isPermisosModalOpen, setIsPermisosModalOpen] = useState(false);

  // Estado para guardar los permisos extra seleccionados en el modal
  const [permisosExtra, setPermisosExtra] = useState({});

  // Estado del formulario con los nombres que usa React
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

  // Carga los datos iniciales: tipos de documento y roles desde la API
  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        const [tiposDoc, rolesData] = await Promise.all([
          getTiposDocumento(),
          getRoles()
        ]);
        setTiposDocumento(tiposDoc);
        setRoles(rolesData);
      } catch (error) {
        console.error("Error al cargar datos iniciales:", error);
      }
    };
    cargarDatosIniciales();
  }, []);

  // Si estamos en modo edición, cargamos los datos del usuario desde la API
  useEffect(() => {
    if (isEdit) {
      const cargarUsuario = async () => {
        try {
          const data = await getUsuario(id);
          setFormData({
            name: data.name || "",
            userEmail: data.userEmail || "",
            validationEmail: data.userEmail || "",
            phone: data.phone || "",
            phoneAdicional: "",
            documentType: data.documentType || "",
            documentNumber: data.documentNumber || "",
            userGroup: data.userGroup || "",
            direccion: data.direccion || "",
            avatarUrl: data.avatarUrl || null,
            fechaInicio: "",
            fechaFin: "",
          });
        } catch (error) {
          console.error("Error al cargar el usuario:", error);
        }
      };
      cargarUsuario();
    }
  }, [id, isEdit]);

  // Actualiza el estado cuando el usuario escribe en un campo
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validamos los datos con zod antes de enviar
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
    setLoading(true);

    try {
      let datosFinales = { ...formData };

      // Si hay una imagen seleccionada la subimos primero
      if (formData.avatarUrl && formData.avatarUrl instanceof File) {
        const urlImagen = await subirAvatar(formData.avatarUrl);
        datosFinales.avatarUrl = urlImagen;
      }

      let usuarioId;

      if (isEdit) {
        // Actualizamos el usuario existente
        await updateUsuario(id, datosFinales);
        usuarioId = id;
      } else {
        // Creamos el usuario nuevo y obtenemos su ID
        const nuevoUsuario = await createUsuario(datosFinales);
        usuarioId = nuevoUsuario.id_tipo_usuario;
      }

      // Si hay permisos extra seleccionados en el modal los guardamos
      if (Object.keys(permisosExtra).length > 0) {
        const todosPermisos = await getPermisos();
        const permisosSeleccionados = todosPermisos
          .filter((p) => permisosExtra[p.codigo])
          .map((p) => p.id_permiso);
        if (permisosSeleccionados.length > 0) {
          await guardarPermisosUsuario(usuarioId, permisosSeleccionados);
        }
      }

      alert(isEdit ? "Usuario actualizado correctamente" : "Usuario creado correctamente");
      navigate(-1);
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
      alert("Ocurrió un error al guardar el usuario");
    } finally {
      setLoading(false);
    }
  };

  // Si el grupo es Farmaceuta (id 3), mostramos campos de fechas
  const esFarmaceuta = String(formData.userGroup) === "7";

  return (
    <div className="bg-white grid gap-2 w-350 rounded-xl">

      {isEdit ? <Title title="Editar Usuario" /> : <Title title="Crear Usuarios" />}

      {/* Modal de permisos extra */}
      <PermisosModal
        isOpen={isPermisosModalOpen}
        onClose={() => setIsPermisosModalOpen(false)}
        onSave={(permisos) => setPermisosExtra(permisos)}
        userId={isEdit ? id : null}
        userGroupId={formData.userGroup}
      />

      <form onSubmit={handleSubmit} className="w-full px-6 rounded-xl">
        <div className="grid grid-cols-3 gap-4">

          {/* ── Columna 1 ── */}
          <div className="flex flex-col gap-3">

            {/* Tipos de documento cargados desde la API */}
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

            <div className="flex flex-col gap-2">
              <Input
                label="Dirección"
                placeholder="Dirección"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                error={errors.direccion}
              />

              {/* Roles cargados desde la API */}
              <Select
                label="Grupo del usuario"
                name="userGroup"
                value={formData.userGroup}
                options={roles}
                onChange={handleChange}
                error={errors.userGroup}
              />

              {/* Botón que abre el modal de permisos extra */}
              <div className="flex justify-center items-center py-8 gap-2">
                <Button
                  variant="primary"
                  size="md"
                  type="button"
                  onClick={() => setIsPermisosModalOpen(true)}
                >
                  Agregar Permisos
                </Button>

                {/* Muestra cuántos permisos extra fueron seleccionados */}
                {Object.values(permisosExtra).filter(Boolean).length > 0 && (
                  <span className="text-sm text-brand-hover">
                    {Object.values(permisosExtra).filter(Boolean).length} permisos
                  </span>
                )}
              </div>
            </div>

            {/* Teléfonos */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
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

            {/* Fechas solo si es Farmaceuta */}
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

            {/* Avatar — opcional, se sube junto con el formulario */}
            <div className="bg-brand-soft/40 flex text-center items-center w-full h-full rounded-lg">
              <AvatarUploader
                onUpload={(file) =>
                  setFormData((prev) => ({ ...prev, avatarUrl: file }))
                }
                  currentImage={
                  // Solo pasamos la URL si es string (imagen guardada), no si es File nuevo
                  typeof formData.avatarUrl === 'string' ? formData.avatarUrl : null
                }
              />
            </div>

          </div>

        </div>

        {/* Botones — muestra loading mientras se guarda */}
        <div className="flex gap-6 justify-center items-center pt-8 pb-4">
          {isEdit ? (
            <>
              <Button onClick={() => navigate(-1)} variant="secondary" size="sm">
                Cancelar
              </Button>
              <Button variant="primary" size="md" type="submit" disabled={loading}>
                {loading ? "Actualizando..." : "Actualizar"}
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
                Regresar
              </Button>
              <Button variant="primary" size="md" type="submit" disabled={loading}>
                {loading ? "Creando..." : "Crear"}
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
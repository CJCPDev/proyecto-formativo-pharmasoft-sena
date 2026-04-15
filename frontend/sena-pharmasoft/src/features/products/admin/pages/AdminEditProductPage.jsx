import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Input from "../../../../shared/components/Input";
import { Select } from "../../../../shared/components";
import Button from "../../../../shared/components/Button";
import { Title, AvatarUploader } from "@/shared/components";

import { medicamentoSchema } from "../../schemas/medicamentoSchema";

import {
  getPharmaForm,
  getAdministrationTypes,
  getSuppliers,
  getLaboratoriesTypes,
  getStatesTypes,
} from "../../services/selectService";

export default function MedicamentosForm() {
  const navigate = useNavigate();
  const params = useParams();

  // Si hay un id en la URL el formulario está en modo edición, si no en modo creación
  const isEdit = Boolean(params.id);

  // Estado central del formulario, inicializado en vacío.
  // En modo edición los valores se cargan desde la API en el useEffect correspondiente.
  const [formData, setFormData] = useState({
    nombre: "",
    pharmaForm: "",
    viaAdministracion: "",
    laboratorio: "",
    concentracion: "",
    proveedor: "",
    lote: "",
    fechaFabricacion: "",
    fechaVencimiento: "",
    stock: "",
    precioCosto: "",
    precioVenta: "",
    requiresPrescription: "",
    estado: "",
    description: "",
    imagen: null, // Objeto File cuando el usuario sube una imagen nueva
    imagenUrl: null, // URL de la imagen ya guardada en el servidor (modo edición)
  });

  // Mensajes de error por campo, se asignan tras una validación fallida
  const [errors, setErrors] = useState({});

  // Opciones para cada uno de los selects del formulario
  const [pharmaForms, setPharmaForms] = useState([]);
  const [administrationTypes, setAdministrationTypes] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [laboratories, setLaboratories] = useState([]);
  const [states, setStates] = useState([]);

  // Carga los datos del medicamento desde la API cuando el formulario está en modo edición
  useEffect(() => {
    if (isEdit) {
      fetch(`http://127.0.0.1:8000/api/medicamentos/${params.id}/`)
        .then((res) => res.json())
        .then((data) => {
          // Mapeamos los campos del backend (snake_case) al estado del formulario (camelCase)
          setFormData({
            nombre: data.nombre_medicamento || "",
            pharmaForm: data.id_forma_farmaceutica || "",
            viaAdministracion: data.id_via_administracion || "",
            laboratorio: data.id_laboratorio || "",
            concentracion: data.concentracion || "",
            proveedor: data.id_proveedor || "",
            lote: data.lote || "",
            fechaFabricacion: data.fecha_fabricacion || "",
            fechaVencimiento: data.fecha_vencimiento || "",
            stock: data.stock || "",
            precioCosto: data.precio_compra || "",
            precioVenta: data.precio_venta || "",
            // El backend devuelve "Si" o "No" como string
            requiresPrescription: data.requiere_formula === "Si" ? "Si" : "No",
            estado: data.id_estado || "",
            description: data.descripcion || "",
            imagen: null,
            imagenUrl: data.imagen_url || null,
          });
        })
        .catch((err) => console.error("Error cargando medicamento:", err));
    }
  }, [isEdit, params.id]); // Solo se ejecuta cuando cambia el id o el modo

  // Carga las opciones de todos los selects una sola vez al montar el componente
  useEffect(() => {
    getPharmaForm().then(setPharmaForms);
    getAdministrationTypes().then(setAdministrationTypes);
    getSuppliers().then(setSuppliers);
    getLaboratoriesTypes().then(setLaboratories);
    getStatesTypes().then(setStates);
  }, []);

  // Actualiza el campo correspondiente en formData cada vez que el usuario
  // cambia el valor de un input o select
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Maneja el envío del formulario: valida los datos y los envía al backend
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el navegador recargue la página

    // Convertimos los campos de texto vacíos a 0 y los campos numéricos a Number,
    // ya que el esquema de validación y el backend los esperan en ese formato
    const parsedData = {
      ...formData,
      pharmaForm: formData.pharmaForm === "" ? 0 : Number(formData.pharmaForm),
      viaAdministracion:
        formData.viaAdministracion === ""
          ? 0
          : Number(formData.viaAdministracion),
      laboratorio:
        formData.laboratorio === "" ? 0 : Number(formData.laboratorio),
      proveedor: formData.proveedor === "" ? 0 : Number(formData.proveedor),
      estado: formData.estado === "" ? 0 : Number(formData.estado),
      stock: formData.stock === "" ? 0 : Number(formData.stock),
      precioCosto:
        formData.precioCosto === "" ? 0 : Number(formData.precioCosto),
      precioVenta:
        formData.precioVenta === "" ? 0 : Number(formData.precioVenta),
    };

    // safeParse valida sin lanzar excepciones: devuelve { success, data } o { success, error }
    const result = medicamentoSchema.safeParse(parsedData);

    if (!result.success) {
      // Convertimos el array de errores en un objeto { campo: mensaje }
      // para mostrar cada error debajo de su input correspondiente
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return; // Detenemos el envío si hay errores de validación
    }

    setErrors({});

    // URL y método HTTP según si estamos creando o editando
    const url = isEdit
      ? `http://127.0.0.1:8000/api/medicamentos/${params.id}/`
      : `http://127.0.0.1:8000/api/medicamentos/`;
    const method = isEdit ? "PUT" : "POST";

    // Usamos FormData en lugar de JSON porque el formulario puede incluir un archivo
    // de imagen, y fetch no puede enviar archivos binarios con Content-Type: application/json
    const formDataToSend = new FormData();
    formDataToSend.append("nombre_medicamento", formData.nombre);
    formDataToSend.append("lote", formData.lote);
    formDataToSend.append("fecha_fabricacion", formData.fechaFabricacion);
    formDataToSend.append("fecha_vencimiento", formData.fechaVencimiento);
    formDataToSend.append("stock", String(formData.stock));
    formDataToSend.append("precio_compra", formData.precioCosto);
    formDataToSend.append("precio_venta", formData.precioVenta);
    formDataToSend.append("requiere_formula", formData.requiresPrescription);
    formDataToSend.append("descripcion", formData.description);
    formDataToSend.append("concentracion", formData.concentracion);
    formDataToSend.append("id_forma_farmaceutica", formData.pharmaForm);
    formDataToSend.append("id_via_administracion", formData.viaAdministracion);
    formDataToSend.append("id_laboratorio", formData.laboratorio);
    formDataToSend.append("id_proveedor", formData.proveedor);
    formDataToSend.append("id_estado", formData.estado);

    // Solo enviamos la imagen si el usuario seleccionó un archivo nuevo.
    // Si no se tocó la imagen no la enviamos para no sobreescribir la existente en el servidor.
    if (formData.imagen && formData.imagen instanceof File) {
      formDataToSend.append("imagen", formData.imagen);
    }

    fetch(url, { method, body: formDataToSend })
      .then(async (res) => {
        if (!res.ok) {
          // Si el servidor responde con error leemos el cuerpo para mostrarlo en consola
          const errorData = await res.json();
          console.error("Error del backend:", errorData);
          throw new Error(JSON.stringify(errorData));
        }
        return res.json();
      })
      .then(() => {
        // Si todo salió bien notificamos al usuario y lo redirigimos al listado
        alert(
          isEdit
            ? "Medicamento actualizado exitosamente"
            : "Medicamento creado exitosamente",
        );
        navigate("/medicamentos");
      })
      .catch((error) => {
        console.error("Error guardando medicamento:", error);
        alert("Error al guardar el medicamento");
      });
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-10 z-20">
        {/* El título cambia según si se está creando o editando */}
        {isEdit ? (
          <Title title="Editar medicamento" />
        ) : (
          <Title title="Crear medicamento" />
        )}

        {/* Responsive de 3 columnas en pantallas grandes, 1 columna en móvil */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Columna 1: datos de identificación del medicamento */}
          <div className="flex flex-col gap-6">
            <Input
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              error={errors.nombre}
            />
            <Select
              label="Forma farmacéutica"
              name="pharmaForm"
              options={pharmaForms}
              value={formData.pharmaForm}
              onChange={handleChange}
              error={errors.pharmaForm}
            />
            <Select
              label="Vía de administración"
              name="viaAdministracion"
              options={administrationTypes}
              value={formData.viaAdministracion}
              onChange={handleChange}
              error={errors.viaAdministracion}
            />
            <Select
              label="Laboratorio"
              name="laboratorio"
              options={laboratories}
              value={formData.laboratorio}
              onChange={handleChange}
              error={errors.laboratorio}
            />
            <Input
              label="Concentración"
              name="concentracion"
              value={formData.concentracion}
              onChange={handleChange}
              error={errors.concentracion}
            />
            <Select
              label="Proveedor"
              name="proveedor"
              options={suppliers}
              value={formData.proveedor}
              onChange={handleChange}
              error={errors.proveedor}
            />
          </div>

          {/* Columna 2: datos de inventario y precios */}
          <div className="flex flex-col gap-5">
            <Input
              label="Lote"
              name="lote"
              value={formData.lote}
              onChange={handleChange}
              error={errors.lote}
            />
            <Input
              label="Fecha de fabricación"
              name="fechaFabricacion"
              type="date"
              value={formData.fechaFabricacion}
              onChange={handleChange}
              error={errors.fechaFabricacion}
            />
            <Input
              label="Fecha de vencimiento"
              name="fechaVencimiento"
              type="date"
              value={formData.fechaVencimiento}
              onChange={handleChange}
              error={errors.fechaVencimiento}
            />
            <Input
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              error={errors.stock}
            />
            <Input
              label="Precio costo"
              name="precioCosto"
              type="number"
              value={formData.precioCosto}
              onChange={handleChange}
              error={errors.precioCosto}
            />
            <Input
              label="Precio venta"
              name="precioVenta"
              type="number"
              value={formData.precioVenta}
              onChange={handleChange}
              error={errors.precioVenta}
            />
          </div>

          {/* Columna 3: estado, prescripción, descripción e imagen */}
          <div className="flex flex-col gap-6">
            <Input
              label="Requiere fórmula"
              name="requiresPrescription"
              placeholder="Sí / No"
              value={formData.requiresPrescription}
              onChange={handleChange}
              error={errors.requiresPrescription}
            />
            <Select
              label="Estado"
              name="estado"
              options={states}
              value={formData.estado}
              onChange={handleChange}
              error={errors.estado}
            />
            <Input
              label="Descripción"
              name="description"
              value={formData.description}
              onChange={handleChange}
              error={errors.description}
            />
            {/* En modo edición muestra la imagen actual del servidor.
                            Al subir una nueva, actualiza formData.imagen con el objeto File. */}
            <AvatarUploader
              label="Cargar foto"
              currentImage={isEdit ? formData.imagenUrl : null}
              onUpload={(file) =>
                setFormData((prev) => ({ ...prev, imagen: file }))
              }
            />
          </div>
        </div>

        {/* Botones de acción centrados al pie del formulario */}
        <div className="flex gap-6 justify-center">
          {/* navigate(-1) regresa a la pantalla anterior sin guardar cambios */}
          <Button onClick={() => navigate(-1)} variant="secondary" size="sm">
            Cancelar
          </Button>
          {/* El texto del botón cambia según el modo */}
          <Button variant="primary" size="md" type="submit">
            {isEdit ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
    </div>
  );
}

// Importación de hooks de React para manejo de estado y efectos secundarios
import { useState, useEffect } from "react";

// useParams permite leer parámetros de la URL (como el id del medicamento)
// useNavigate permite redirigir al usuario a otra ruta programáticamente
import { useParams, useNavigate } from "react-router-dom";

// Componentes reutilizables del sistema de diseño compartido
import { Select, Button, Input, Title, AvatarUploader } from "../../../../shared/components";

// Esquema de validación del formulario usando Zod (o librería similar)
import { medicamentoSchema } from "../../schemas/medicamentoSchema";

// Servicios que hacen las peticiones HTTP para obtener las opciones de los selects
import {
  getPharmaForm,
  getAdministrationTypes,
  getSuppliers,
  getLaboratoriesTypes,
  getStatesTypes,
  getSubformasFarmaceuticas,
} from "../../services/selectService";

export default function AdminProductForm() {
  const navigate = useNavigate();
  const params = useParams();

  // Si la URL contiene un id (ej: /medicamentos/5/editar), el formulario
  // está en modo edición. Si no hay id, está en modo creación.
  const isEdit = Boolean(params.id);

  // ── Estados del formulario ──────────────────────────────────────────────

  // Lista de subformas farmacéuticas disponibles según la forma seleccionada
  const [subformas, setSubformas] = useState([]);

  // Almacena temporalmente el id de la subforma al cargar un medicamento existente.
  // Se necesita porque las subformas se cargan de forma asíncrona después de
  // que se establece la forma farmacéutica, entonces no se pueden setear al mismo tiempo.
  const [subformaInicial, setSubformaInicial] = useState("");

  // Opciones para cada uno de los selects del formulario
  const [pharmaForm, setPharmaForm] = useState([]);
  const [administrationTypes, setAdministrationTypes] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [laboratoriesTypes, setLaboratoriesTypes] = useState([]);
  const [statesTypes, setStatesTypes] = useState([]);

  // Errores de validación por campo, se muestran debajo de cada input
  const [errors, setErrors] = useState({});

  // Estado central del formulario con todos los campos inicializados en vacío
  const [formData, setFormData] = useState({
    nombreMedicamento: "",
    formaFarmaceutica: "",
    subformaFarmaceutica: "",
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
    imagen: null,    // Archivo File cuando el usuario carga una imagen nueva
    imagenUrl: null, // URL de la imagen ya guardada en el servidor (modo edición)
  });

  // ── Efecto: cargar datos del medicamento en modo edición ────────────────
  useEffect(() => {
    if (isEdit) {
      // Petición a la API para obtener los datos actuales del medicamento
      fetch(`http://127.0.0.1:8000/api/medicamentos/${params.id}/`)
        .then((res) => res.json())
        .then((data) => {
          // Guardamos la subforma por separado porque su select depende de que
          // primero se cargue la forma farmacéutica. El efecto que escucha
          // [subformaInicial, subformas] se encargará de asignarla una vez
          // que las opciones del select estén disponibles.
          setSubformaInicial(data.id_subforma_farmaceutica || "");

          // Mapeamos los campos del backend (snake_case) al estado del formulario (camelCase)
          setFormData({
            nombreMedicamento: data.nombre_medicamento || "",
            formaFarmaceutica: data.id_forma_farmaceutica || "",
            subformaFarmaceutica: data.id_subforma_farmaceutica || "",
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
            imagen: data.imagen || null,
            imagenUrl: data.imagen_url || null,
          });
        })
        .catch((err) => console.error("Error cargando medicamento:", err));
    }
  }, [isEdit, params.id]); // Solo se ejecuta cuando cambia el id o el modo

  // ── Efecto: cargar las opciones de todos los selects al montar ──────────
  useEffect(() => {
    // Cada función retorna una promesa que resuelve con el array de opciones
    getPharmaForm().then(setPharmaForm);
    getAdministrationTypes().then(setAdministrationTypes);
    getSuppliers().then(setSuppliers);
    getLaboratoriesTypes().then(setLaboratoriesTypes);
    getStatesTypes().then(setStatesTypes);
  }, []); // Array vacío: se ejecuta una sola vez al montar el componente

  // ── Efecto: asignar la subforma una vez que sus opciones están cargadas ──
  // Este efecto resuelve el problema de sincronía: cuando se edita un medicamento,
  // la subforma no se puede mostrar hasta que su select tenga opciones disponibles.
  // Este efecto espera a que ambas condiciones se cumplan para asignarla.
  useEffect(() => {
    if (subformaInicial && subformas.length > 0) {
      setFormData((prev) => ({ ...prev, subformaFarmaceutica: subformaInicial }));
      // Limpiamos el valor temporal para que este efecto no vuelva a ejecutarse
      setSubformaInicial("");
    }
  }, [subformaInicial, subformas]);

  // ── Efecto: cargar subformas cuando cambia la forma farmacéutica ─────────
  useEffect(() => {
    if (formData.formaFarmaceutica) {
      // Consultamos las subformas correspondientes a la forma farmacéutica elegida
      getSubformasFarmaceuticas(formData.formaFarmaceutica).then((data) => {
        setSubformas(data);
      });
    } else {
      // Si no hay forma seleccionada, vaciamos las subformas disponibles
    setSubformas([]);
    }
  }, [formData.formaFarmaceutica]); // Se dispara cada vez que cambia la forma farmacéutica

  // ── Manejador de cambios en los inputs y selects ─────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "formaFarmaceutica") {
      // Mantienes tu lógica original
      setFormData((prev) => ({ 
        ...prev, 
        [name]: value, 
        subformaFarmaceutica: "" 
      }));
    } else if (name === "precioCosto" || name === "precioVenta") {
      // Guardas como número para poder formatear después
      setFormData((prev) => ({ 
        ...prev, 
        [name]: value === "" ? "" : parseFloat(value) 
      }));
    } else {
      // Todo lo demás igual que antes
      setFormData((prev) => ({ 
        ...prev, 
        [name]: value 
      }));
    }
  };

  // ── Manejador del envío del formulario ───────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el navegador recargue la página al enviar

    // Convertimos los campos de texto vacíos a 0 y los campos numéricos
    // a tipo Number, ya que el esquema de validación y el backend los esperan así
    const parsedData = {
      ...formData,
      formaFarmaceutica: formData.formaFarmaceutica === "" ? 0 : Number(formData.formaFarmaceutica),
      subformaFarmaceutica: formData.subformaFarmaceutica === "" ? 0 : Number(formData.subformaFarmaceutica),
      viaAdministracion: formData.viaAdministracion === "" ? 0 : Number(formData.viaAdministracion),
      laboratorio: formData.laboratorio === "" ? 0 : Number(formData.laboratorio),
      proveedor: formData.proveedor === "" ? 0 : Number(formData.proveedor),
      estado: formData.estado === "" ? 0 : Number(formData.estado),
      stock: formData.stock === "" ? 0 : Number(formData.stock),
      precioCosto: formData.precioCosto === "" ? 0 : Number(formData.precioCosto),
      precioVenta: formData.precioVenta === "" ? 0 : Number(formData.precioVenta),
      requiresPrescription: formData.requiresPrescription,
    };

    // Validamos los datos con el esquema. safeParse no lanza excepciones,
    // sino que devuelve un objeto con success:true/false y los errores si los hay
    const result = medicamentoSchema.safeParse(parsedData);

    if (!result.success) {
      // Convertimos el array de errores en un objeto { campo: mensaje }
      // para poder mostrar cada error debajo del input correspondiente
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return; // Detenemos el envío si hay errores
    }

    // Si la validación pasa, limpiamos los errores previos
    setErrors({});

    // Definimos la URL y el método HTTP según si estamos creando o editando
    const url = isEdit
      ? `http://127.0.0.1:8000/api/medicamentos/${params.id}/`
      : `http://127.0.0.1:8000/api/medicamentos/`;
    const method = isEdit ? "PUT" : "POST";

    // Usamos FormData en lugar de JSON porque el formulario puede incluir
    // un archivo de imagen, y fetch no puede enviar archivos con JSON plano
    const formDataToSend = new FormData();
    formDataToSend.append("nombre_medicamento", formData.nombreMedicamento);
    formDataToSend.append("lote", formData.lote);
    formDataToSend.append("fecha_fabricacion", formData.fechaFabricacion);
    formDataToSend.append("fecha_vencimiento", formData.fechaVencimiento);
    formDataToSend.append("stock", String(formData.stock));
    formDataToSend.append("precio_compra", formData.precioCosto);
    formDataToSend.append("precio_venta", formData.precioVenta);
    formDataToSend.append("requiere_formula", formData.requiresPrescription);
    formDataToSend.append("descripcion", formData.description);
    formDataToSend.append("concentracion", formData.concentracion);
    formDataToSend.append("id_forma_farmaceutica", formData.formaFarmaceutica);
    formDataToSend.append("id_subforma_farmaceutica", formData.subformaFarmaceutica);
    formDataToSend.append("id_via_administracion", formData.viaAdministracion);
    formDataToSend.append("id_laboratorio", formData.laboratorio);
    formDataToSend.append("id_proveedor", formData.proveedor);
    formDataToSend.append("id_estado", formData.estado);

    // Solo agregamos la imagen si el usuario seleccionó un archivo nuevo.
    // Si no se tocó la imagen, no la enviamos para evitar sobreescribir
    // la imagen existente en el servidor con un valor vacío o nulo.
    if (formData.imagen && formData.imagen instanceof File) {
      formDataToSend.append("imagen", formData.imagen);
    }

    // Enviamos la petición al backend
    fetch(url, { method, body: formDataToSend })
      .then(async (res) => {
        if (!res.ok) {
          // Si el servidor responde con error, leemos el cuerpo para mostrarlo en consola
          const errorData = await res.json();
          console.log("Error del backend:", errorData);
          throw new Error(JSON.stringify(errorData));
        }
        return res.json();
      })
      .then(() => {
        // Si todo salió bien, notificamos al usuario y lo redirigimos al listado
        alert(isEdit ? "Medicamento actualizado exitosamente" : "Medicamento creado exitosamente");
        navigate("/medicamentos");
      })
      .catch((error) => {
        console.error("Error guardando medicamento:", error);
        alert("Error al guardar el medicamento");
      });
  };

  // ── Renderizado del formulario ───────────────────────────────────────────
  return (
    <div className="p-6">
      <form className="flex flex-col gap-10 z-20" onSubmit={handleSubmit}>

        {/* El título cambia según si se está creando o editando */}
        {isEdit ? <Title title="Editar Medicamento" /> : <Title title="Crear Medicamento" />}

        {/* Grid de 3 columnas en pantallas grandes, 1 columna en móvil */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {/* Columna 1: datos de identificación del medicamento */}
          <div className="flex flex-col gap-6">
            <Input label="Nombre del medicamento" name="nombreMedicamento" value={formData.nombreMedicamento} onChange={handleChange} placeholder="Nombre del medicamento" error={errors.nombreMedicamento} />
            <Select label="Forma farmacéutica" name="formaFarmaceutica" value={formData.formaFarmaceutica} options={pharmaForm} onChange={handleChange} error={errors.formaFarmaceutica} />

            {/* El select de presentación se deshabilita si no hay forma farmacéutica seleccionada */}
            <Select label="Presentación" name="subformaFarmaceutica" value={formData.subformaFarmaceutica} options={subformas} onChange={handleChange} error={errors.subformaFarmaceutica} disabled={!formData.formaFarmaceutica} />

            <Select label="Vía de administración" name="viaAdministracion" value={formData.viaAdministracion} options={administrationTypes} onChange={handleChange} error={errors.viaAdministracion} />
            <Select label="Laboratorio" name="laboratorio" value={formData.laboratorio} options={laboratoriesTypes} onChange={handleChange} error={errors.laboratorio} />
            <Input label="Concentración" name="concentracion" value={formData.concentracion} onChange={handleChange} placeholder="Concentración" error={errors.concentracion} />
            
          </div>

          {/* Columna 2: datos de inventario y precios */}
          <div className="flex flex-col gap-5">
            <Input label="Lote" name="lote" value={formData.lote} onChange={handleChange} placeholder="Lote" error={errors.lote} />
            <Input className="z-10" label="Fecha de fabricación" type="date" name="fechaFabricacion" value={formData.fechaFabricacion} onChange={handleChange} error={errors.fechaFabricacion} />
            <Input className="z-10" label="Fecha de vencimiento" type="date" name="fechaVencimiento" value={formData.fechaVencimiento} onChange={handleChange} error={errors.fechaVencimiento} />
            <Input label="Stock" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" error={errors.stock} />
            <Input label="Precio de costo" name="precioCosto" value={formData.precioCosto} onChange={handleChange} placeholder="Precio costo" error={errors.precioCosto} />
            <Input label="Precio de venta" name="precioVenta" value={formData.precioVenta} onChange={handleChange} placeholder="Precio venta" error={errors.precioVenta} />
          </div>

          {/* Columna 3: estado, descripción e imagen */}
          <div className="flex flex-col gap-6">
            <Select label="Proveedor" name="proveedor" value={formData.proveedor} options={suppliers} onChange={handleChange} error={errors.proveedor} />
            <Input label="Requiere fórmula" name="requiresPrescription" value={formData.requiresPrescription} onChange={handleChange} placeholder="Requiere fórmula" error={errors.requiresPrescription} />
            <Select label="Estado" name="estado" value={formData.estado} options={statesTypes} onChange={handleChange} error={errors.estado} />
            <Input label="Descripción" name="description" value={formData.description} onChange={handleChange} placeholder="Descripción" error={errors.description} />

            {/* AvatarUploader muestra la imagen actual en modo edición.
                Al subir una nueva, actualiza formData.imagen con el objeto File */}
            <AvatarUploader
              label="Cargar foto"
              currentImage={isEdit ? formData.imagenUrl : null}
              onUpload={(file) => setFormData((prev) => ({ ...prev, imagen: file }))}
            />
          </div>
        </div>

        {/* Botones de acción centrados al pie del formulario */}
        <div className="flex gap-6 justify-center">
          {/* Cancelar regresa a la pantalla anterior sin guardar cambios */}
          <Button onClick={() => navigate(-1)} variant="secondary">
            Cancelar
          </Button>
          {/* El texto del botón de envío cambia según el modo */}
          <Button type="submit" variant="primary">
            {isEdit ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
    </div>
  );
}
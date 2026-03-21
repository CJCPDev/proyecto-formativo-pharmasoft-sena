import "../../users/services/selectService"
import documentTypes from "../../../data/selects/documentTypes.json"
import userGroups from "../../../data/selects/userGroups.json"
import {Title, Input, Select, Button, AvatarUploader} from "@/shared/components"
import { useState } from "react"
import { userSchema } from "../schemas/userSchema"
import { useNavigate } from "react-router-dom";

export default function UserForm() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
    name: "",
    userEmail: "",
    validationEmail: "",
    phone: "",
    documentType: "",
    documentNumber: "",
    userGroup: "",
    direccion: "",
    avatarUrl: null,
  });

    //==================HANDLE=========================
  // Función que se ejecuta cada vez que cambia el valor de un input del formulario
  const handleChange = (e) => {
    // Se obtiene el nombre del campo (name) y su valor actual (value)
    // desde el elemento que disparó el evento
    const { name, value } = e.target;
    // Se actualiza el estado del formulario
    // prev representa el estado anterior del formulario
    setFormData((prev) => ({
      // Se copian todos los valores anteriores del estado
      ...prev,
      // Se actualiza únicamente el campo que cambió
      // [name] permite usar el nombre del input como clave dinámica
      [name]: value,
    }));
  };

  //==================================================================

    //============== HANDLE SUBMIT ==============
  // Función que se ejecuta cuando se envía el formulario
  const handleSubmit = (e) => {
    // Evita que el formulario recargue la página
    e.preventDefault();
    // Se valida el objeto formData usando el esquema definido con Zod
    // safeParse devuelve un objeto indicando si la validación fue exitosa o no
    const result = userSchema.safeParse(formData);
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
    // Si la validación es exitosa se limpian los errores anteriores
    setErrors({});
    // result.data contiene los datos ya validados por Zod
    console.log("Usuario válido:", result.data);
  };

  //======================================================================

    //Estado de los errores
  const [errors, setErrors] = useState({});

  // //Estado de los tipos de documento
  // const [getDocumentTypes, setDocumentTypes] = useState([]);

  // useEffect(() => {
  //   getDocumentTypes().then(setDocumentTypes);
  // }, []);

  return (

      <div className="bg-white grid gap-2 w-350 rounded-xl">
            <Title
              title="Creación de Usuario"
            />
            <form 
            onSubmit={handleSubmit}
            className="w-full px-6 rounded-xl">
              <div className="grid grid-cols-3 gap-4">
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
                              label="Correo electronico"
                              placeholder="Correo electronico"
                              name="userEmail"
                              value={formData.userEmail}
                              onChange={handleChange}
                              error={errors.userEmail}
                            />
                          <Input
                              label="Confirmar correo electronico"
                              placeholder="Confirmar correo electronico"
                              name="validationEmail"
                              value={formData.validationEmail}
                              onChange={handleChange}
                              error={errors.validationEmail}
                            />
                    </div>
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
                          <div className="flex justify-center pt-7.5 pb-2">
                              <Button
                                variant="primary"
                                size="md">
                                  Agregar Rol
                              </Button>
                          </div>
                            <Input 
                              label="Celular"
                              type="tel"
                              name="phone"
                              placeholder="Celular"
                              value={formData.phone}
                              onChange={handleChange}
                              error={errors.phone}
                              />
                    </div>
                  <div className="grid text-center items-center justify-items-center w-full h-96 p-9">
                    <div className="bg-brand-soft/40 flex text-center items-center w-full h-full rounded-lg">
                      <AvatarUploader></AvatarUploader>
                    </div>
                  </div>
              </div>

                <div className="col-span-full flex justify-center gap-4 py-4">
                      <Button
                          variant="secondary"
                          size="md"
                          onClick = {( ) => navigate(-1)}
                          // onClick={() => console.log("Oprimió cancelar")}>
                          >Cancelar
                      </Button>
                      <Button
                          variant='primary'
                          size="md"
                          type= "submit"
                          onMouseEnter={() => console.log('entro')}>
                            Crear
                      </Button>
                </div>
            </form>
      </div>
  );
}
import Input from "./../../../shared/components/Input";
import Select from "./../../../shared/components/Select"
import Button from "./../../../shared/components/Button"
import "./../../../features/users/services/selectService"
import documentTypes from "./../../../data/selects/documentTypes.json"
import userGroups from "./../../../data/selects/usersGroups.json"
import AvatarUploader from "../../../shared/components/AvatarUploader"
import { useState } from "react";

export default function UserForm() {

  const [avatarUrl, setAvatarUrl] = useState(null);
  
  return (
      <div className="grid-grid-cols-3 justify-center items-center">
        <form className="
              w-full h-full
              px-6 py-12
              grid grid-cols-3 gap-6
              rounded-xl
                  
        ">
          <h1 className="col-span-full text-3xl text-text-primary font-main text-center mb-8"> Crear Usuarios </h1>
          {/* Formulario para crear el usuario*/}
          <div>
          <Select
            label="Tipo de documento"
            name="documentType"
            options={documentTypes}
          />

          <Input
            label="Número de documento"
            placeholder="Número de documento"
          />
          <Input
          label="Nombre completo"
          placeholder="Nombre completo" 
          />
          <Input
            label="Correo electronico"
            type="email"
            placeholder="Correo electronico"
          />
          <Input
            label="Confirmar correo electronico"
            type="email"
            placeholder="Confirmar correo electronico"
          />
          </div>
          <div>

          <Input 
          label="Dirección"
          placeholder="Dirección"
          />
          
          <Select 
          label="Grupo del usuario"
          name="userGroup"
          options={userGroups}
          />

          <div className="flex justify-center py-6">
            <Button
            variant="primary"
            size="md"
            >
              Agregar Rol
            </Button>
          </div>

          <Input 
          label="Celular"
          type="tel"
          placeholder="Celular" />
          </div>

          <div className="w-[320px] text-white">
          <AvatarUploader onChange={setAvatarUrl} />
          {avatarUrl && (
            <p className="mt-4 text-sm text-gray-400">
              URL guardada en BD: {avatarUrl}
            </p> 
          )}
          </div>

          <div className="col-span-full flex justify-center gap-6 py-6">
              <Button
                variant="secondary"
                size="md"
                // onClick={() => console.log("Oprimió cancelar")}>
                >
                Cancelar
              </Button>
            <Button
                variant='primary'
                size="md"
                type= "submit"
                onMouseEnter={() => console.log('entro')}
              //  onSubmit={() => console.log("Oprimió guardar")}>
              >
                Guardar
            </Button>
                </div>
        </form>
      </div>
  );
}

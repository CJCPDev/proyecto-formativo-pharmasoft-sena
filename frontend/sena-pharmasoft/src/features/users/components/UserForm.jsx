import Input from "./../../../shared/components/Input";
import Select from "./../../../shared/components/Select"
import Button from "./../../../shared/components/Button"
import "./../../../features/users/services/selectService"
import documentTypes from "./../../../data/selects/documentTypes.json"
import userGroups from "./../../../data/selects/usersGroups.json"

export default function UserForm() {
  return (
      <div>
        <form className="grid grid-cols-2 gap-6 w-full max-w-4xl">
          {/* Formulario para crear el usuario*/}
          <div>
          <Select
            label="tipo de documento"
            name="documentType"
            options={documentTypes}
          />

          <Input
            label="Número de documento"
            placeholder="Número de documento"
          />
          <Input
          label="Nombre completo"
          placeholder="Nombre completo" />
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

          <div className="col-span-full flex justify-center gap-6 py-6">
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


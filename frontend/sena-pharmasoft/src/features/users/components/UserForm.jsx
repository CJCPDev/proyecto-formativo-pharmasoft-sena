import "../../users/services/selectService"
import documentTypes from "../../../data/selects/documentTypes.json"
import userGroups from "../../../data/selects/userGroups.json"
import {Title, Input, Select, Button, AvatarUploader} from "@/shared/components"

export default function UserForm() {
  return (

      <div className="bg-white grid gap-2 w-350 rounded-xl">
            <Title
              title="Creación de Usuario"
            />
            <form className="w-full px-6 rounded-xl">
              <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-3">
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
                    <div className="flex flex-col gap-2">
                          <Input 
                            label="Dirección"
                            placeholder="Dirección"
                          />
                      <Select 
                        label="Grupo del usuario"
                        name="userGroup"
                        options={userGroups}
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
                              placeholder="Celular"
                              />
                    </div>
                  <div className="grid text-center items-center justify-items-center w-full h-auto p-16">
                    <div className="bg-red-200 flex items-end text-center w-full h-64">
                     <AvatarUploader></AvatarUploader>
                    </div>
                  </div>
              </div>

                <div className="col-span-full flex justify-center gap-4 py-4">
                      <Button
                          variant="secondary"
                          size="md"
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
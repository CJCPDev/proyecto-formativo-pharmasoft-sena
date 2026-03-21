import { Title, Button } from "@/shared/components"

const Card = ({ user }) => {
  const {
    nombre_completo,
    tipo_identificacion,
    numero_documento,
    rol,
    telefono,
    correo,
    direccion,
    estado,
    image,
  } = user;

  return (
      <div className="max-w-6xl w-full bg-surface shadow-lg rounded-xl overflow-hidden">
        <div className="text-text-primary text-center py-4">
          <Title 
            title="Perfil de Usuario"
          />
        </div>

        <div className="grid grid-cols-3 gap-8 p-8">
          <div className="space-y-4">
            <div className="w-80">
              <label className="block text-small-label font-semibold">Nombre</label>
              <div className="bg-surface-v2 px-3 rounded-md h-12 flex items-center">{nombre_completo}</div>
            </div>
            <div className="w-80">
              <label className="block text-small-label font-semibold">Tipo de Documento</label>
              <div className="bg-surface-v2 px-3 rounded-md h-12 flex items-center">{tipo_identificacion}</div>
            </div>
            <div className="w-80">
              <label className="block text-small-label font-semibold">Número de documento</label>
              <div className="bg-surface-v2 px-3 rounded-md h-12 flex items-center">{numero_documento}</div>
            </div>
            <div className="w-80">
              <label className="block text-small-label font-semibold">Rol</label>
              <div className="bg-surface-v2 px-3 rounded-md h-12 flex items-center">{rol}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="w-80">
              <label className="block text-small-label font-semibold">Correo electrónico</label>
              <div className="bg-surface-v2 px-3 rounded-md h-12 flex items-center">{correo}</div>
            </div>
            <div className="w-80">
              <label className="block text-small-label font-semibold">Teléfono</label>
              <div className="bg-surface-v2 px-3 rounded-md h-12 flex items-center">{telefono}</div>
            </div>
            <div className="w-80">
              <label className="block text-small-label font-semibold">Dirección</label>
              <div className="bg-surface-v2 px-3 rounded-md h-12 flex items-center">{direccion}</div>
            </div>
            <div className="w-80">
              <label className="block text-small-label font-semibold">Estado</label>
              <div className="bg-surface-v2 px-3 rounded-md h-12 flex items-center">{estado}</div>
            </div>
          </div>

          <div className="flex justify-center items-start ">
            <img
              src={image}
              alt={nombre_completo}
              className="w-60 h-60 object-fill border-4 border-brand-soft rounded-full"
            />
          </div>
        </div>
        
        <div className="col-span-full flex justify-center gap-4 py-4">
          <Button
            variant="secondary"
            size="md"
            // onClick={() => console.log("Oprimió cancelar")}>
          >Regresar
          </Button>
          <Button
            variant='primary'
            size="md"
            type= "submit"
            onMouseEnter={() => console.log('entro')}>
            Editar
          </Button>
        </div>
      </div>
  );
};

export default Card;

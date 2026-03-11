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
            title="Perfil de usuario"
          />
        </div>

        <div className="grid grid-cols-3 gap-8 p-8">
          <div className="space-y-4">
            <div className="w-80">
              <label className="block text-small-label font-semibold text-text-secondary">Nombre</label>
              <div className="bg-surface-v2 px-3 py-2 rounded-md">{nombre_completo}</div>
            </div>
            <div className="w-80">
              <label className="block text-small-label font-semibold text-text-secondary">Tipo de Documento</label>
              <div className="bg-surface-v2 px-3 py-2 rounded-md">{tipo_identificacion}</div>
            </div>
            <div className="w-80">
              <label className="block text-small-label font-semibold text-text-secondary">Número de documento</label>
              <div className="bg-surface-v2 px-3 py-2 rounded-md">{numero_documento}</div>
            </div>
            <div className="w-80">
              <label className="block text-small-label font-semibold text-text-secondary">Rol</label>
              <div className="bg-surface-v2 px-3 py-2 rounded-md">{rol}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="w-80">
              <label className="block text-small-label font-semibold text-text-secondary">Correo electrónico</label>
              <div className="bg-surface-v2 px-3 py-2 rounded-md">{correo}</div>
            </div>
            <div className="w-80">
              <label className="block text-small-label font-semibold text-text-secondary">Teléfono</label>
              <div className="bg-surface-v2 px-3 py-2 rounded-md">{telefono}</div>
            </div>
            <div className="w-80">
              <label className="block text-small-label font-semibold text-text-secondary">Dirección</label>
              <div className="bg-surface-v2 px-3 py-2 rounded-md">{direccion}</div>
            </div>
            <div className="w-80">
              <label className="block text-small-label font-semibold text-text-secondary">Estado</label>
              <div className="bg-surface-v2 px-3 py-2 rounded-md">{estado}</div>
            </div>
          </div>

          <div className="flex justify-center items-start">
            <img
              src={image}
              alt={nombre_completo}
              className="w-60 h-60 object-cover border-4 border-brand-soft"
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



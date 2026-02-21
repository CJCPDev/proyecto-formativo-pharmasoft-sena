import Input from "./../../../shared/components/Input";

export default function UserForm() {
  return (
      <div>
        <form className="grid grid-cols-2 gap-6 w-full max-w-4xl">
          {/* Formulario para crear el usuario*/}
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
          <Input 
          label="Dirección"
          placeholder="Dirección"
          />
          <Input 
          label="Celular"
          type="tel"
          placeholder="Celular" />
        </form>
      </div>
  );
}



export default function CreateCount(){

  return (
    <form className="flex flex-col gap-4">

      <input
        type="text"
        placeholder="Nombre completo"
        className="border p-3 rounded-md"
      />

      <input
        type="email"
        placeholder="Correo electrónico"
        className="border p-3 rounded-md"
      />

      <input
        type="password"
        placeholder="Contraseña"
        className="border p-3 rounded-md"
      />

      <button className="bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition">
        Registrarse
      </button>

    </form>
  );
}

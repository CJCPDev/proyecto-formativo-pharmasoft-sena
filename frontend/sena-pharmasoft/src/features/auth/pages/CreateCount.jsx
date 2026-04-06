export default function CreateCount() {
  return (
    <form className="grid gap-4 justify-center items-center w-full h-full">
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

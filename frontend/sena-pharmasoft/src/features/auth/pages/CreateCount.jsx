export default function Home() {
  return (
    <div>

      {/* Productos */}
      <section className="p-6">
        <h1 className="text-2xl font-bold">Productos</h1>
      </section>

      {/* Registro */}
      <section className="bg-green-600 text-white p-10 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Únete a nuestra farmacia
        </h2>

        <div className="flex justify-center gap-2">
          <input
            placeholder="Correo electrónico"
            className="p-3 rounded-md text-black"
          />
          <button className="bg-white text-green-600 px-4 rounded-md">
            Registrarse
          </button>
        </div>
      </section>

    </div>
  );
}
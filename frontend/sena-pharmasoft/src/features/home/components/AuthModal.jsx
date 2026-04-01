import { InputHome } from "@/features/home";


export default function AuthModal({
  openLogin,
  openRegister,
  setOpenLogin,
  setOpenRegister,
  Logo,
}) {
  return (
    <>
      {/* REGISTER */}
      {openRegister && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl w-100 p-6 relative">
            <button
              onClick={() => setOpenRegister(false)}
              className="absolute top-3 right-3 cursor-pointer hover:text-brand-fort text-brand-hover font-bold text-info-general"
            >
              ✕
            </button>

            <div className="flex justify-center mb-4">
              <img src={Logo} className="w-16" />
            </div>

            <h2 className="text-brand-hover text-general-title text-center font-bold mb-4">
              Crear cuenta
            </h2>

            <form className="grid gap-3">
              <input placeholder="Nombre" className="border p-2 rounded" />
              <input placeholder="Correo" className="border p-2 rounded" />
              <input placeholder="Contraseña" className="border p-2 rounded" />

              <button className="bg-green-600 text-white py-2 rounded">
                Ingresar
              </button>
            </form>

            <p className="text-center mt-4">
              ¿Ya tienes cuenta?{" "}
              <span
                onClick={() => {
                  setOpenRegister(false);
                  setOpenLogin(true);
                }}
                className="text-green-600 cursor-pointer"
              >
                Inicia sesión
              </span>
            </p>
          </div>
        </div>
      )}
      {/* LOGIN */}
      {openLogin && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl w-95 p-6 relative">
            <button
              onClick={() => setOpenLogin(false)}
              className="absolute top-3 right-3"
            >
              ✕
            </button>

            <h2 className="text-center text-brand-hover text-general-title font-bold mb-8">
              Iniciar sesión
            </h2>

            <form className="grid gap-8">
              <InputHome 
                type="email"
                label = "Correo Electronico"
              />
              <InputHome 
                type="password"
                label = "Contraseña"
              />
              <button className="bg-green-600 hover:bg-green-500 font-bold text-white py-2 rounded-2xl h-12 cursor-pointer">
                Ingresar
              </button>
            </form>

            <p className="text-center mt-4">
              ¿No tienes cuenta?{" "}
              <span
                onClick={() => {
                  setOpenLogin(false);
                  setOpenRegister(true);
                }}
                className="text-green-600 hover:text-green-700 hover:font-bold cursor-pointer"
              >
                Crear cuenta
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

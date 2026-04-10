import { InputHome } from "@/features/home";
import { Select, Input, Button } from "@/shared/components";
import { useState } from "react";

export default function AuthModal({
  openLogin,
  openRegister,
  setOpenLogin,
  setOpenRegister,
}) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");


  return (
    <>
      {/* REGISTER */}
      {openRegister && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl w-7xl p-6 relative">
            <div className="grid grid-cols-1">
              <h1 className="text-brand-hover text-big-title text-center font-bold">
                Crear cuenta
              </h1>
              <span className="text-center text-2xl">
                Al crear tu cuenta accedes a muchos descuentos y beneficios
              </span>
            </div>

            <form className="grid grid-cols-3 gap-6 mt-6">
              <div className="grid grid-cols-1">
                <Select label="Tipo de documento" />
                <Input type="text" label="Nombre" />
                <Input type="text" label="Apellidos" />
                <Input type="email" label="Correo electronico" />
              </div>
              <div className="grid grid-cols-1">
                <Input type="text" label="No. de documento" />
                <Input type="text" label="No. de documento" />
                <Input type="text" label="Telefono" />
                <Input type="text" label="Direccion" />
              </div>
              <div className="grid grid-cols-1">
                <Input type="text" label="Contraseña" />
                <Input type="text" label="Confirmar contraseña" />
                <Input type="text" label="revision" />
              </div>
            </form>
            <div className="flex text-center w-full gap-6 justify-center">
              <Button
                onClick={() => {
                  setOpenRegister(false);
                  setOpenLogin(true);
                }}
                variant="secondary"
              >
                Regresar
              </Button>
              <Button variant="primary">Guardar</Button>
            </div>
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

            <form onSubmit={handleLogin} className="grid gap-8">
              <InputHome
                type="email"
                label="Correo Electronico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              <InputHome
                type="password"
                label="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-500 font-bold text-white py-2 rounded-2xl h-12 cursor-pointer"
              >
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

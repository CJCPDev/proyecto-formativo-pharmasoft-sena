import { CreateCount } from "@/features/auth";
import Logot from "@/assets/images/logo-removebg-preview.png";

export default function PageCreateCount() {
  return (
    <div className="min-h-screen bg-linear-to-br from-brand-soft to-white items-center justify-center px-4 flex">
      {/* CONTENEDOR */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-brand-hover text-2xl font-bold">Crear cuenta</h1>
          <p className="text-sm text-gray-500 mt-1">
            Regístrate para comprar y acceder a beneficios
          </p>
        </div>

        <CreateCount />
      </div>
    </div>
  );
}

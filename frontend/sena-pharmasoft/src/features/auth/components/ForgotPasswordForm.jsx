import { Button, Input } from "@/shared/components";
import { LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordForm() {
  const navigate = useNavigate();

  const handleClick = () => {
    setTimeout(() => {
      navigate("/reset-password");
    }, 100);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <div className="bg-white w-102 p-6 rounded-lg shadow-2xl">
        <form>
          <div className="grid text-main justify-items-center text-main">
            <LockKeyhole className="flex items-center h-12 w-12 stroke-brand-hover" />
            <h1 className="text-brand-hover font-extrabold text-general-title">
              Recuperar contraseña
            </h1>
            <p className="text-secondary text-info-general text-center font-semibold py-6">
              Por favor ingrese el correo electrónico registrado para
              restablecer la contraseña.
            </p>
          </div>
          <div className="grid justify-items-center gap-6">
            <Input type="email" placeholder="Correo electronico" />
            {/*                         <Link
                        to = '/reset-password'
                        className="bg-brand-soft"
                        >Recuperar</Link> */}
            <Button variant="secondary" size="md" onClick={handleClick}>
              Enviar token
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

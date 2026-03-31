import { UserRoundKey } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TokenValidation from "./TokenValidation";
<<<<<<< HEAD
import  {Button} from '@/shared/components'




export default function ResetPasswordForm(){


    const navigate = useNavigate();



    const handleClick = ()=> {
        setTimeout(() => {
            navigate('/validation')
        }, 1000)
        } 

    return(
        <div className="absolute inset-0 flex items-center justify-center z-10">
            
                <div className="bg-white w-102 p-6 rounded-lg shadow-2xl">
                    <form >
                        <div className="grid text-main justify-items-center text-main">
                            <UserRoundKey className="flex items-center h-12 w-12 stroke-brand-hover"/>
                            <h1 className="text-brand-hover font-extrabold text-info-general">Restablecimiento de contraseña</h1>
                            <p className="text-secondary text-info-general text-center font-light py-6">Ingresa el <strong className="font-bold">Token</strong> enviado a tu correo electronico</p>
                        </div>
                        <div className="grid justify-items-center gap-6">
                            <TokenValidation/>
                            {<Button
                            variant = 'secondary'
                            size = 'md'
                            onClick= {handleClick}
                            >
                                Validar
                            </Button>}
                        </div>
                    </form>
                </div>

        </div>
    )
}
=======
import { Button } from "@/shared/components";

export default function ResetPasswordForm() {
  const navigate = useNavigate();

  const handleClick = () => {
    setTimeout(() => {
      navigate("/validation");
    }, 1000);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <div className="bg-white w-102 p-6 rounded-lg shadow-2xl">
        <form>
          <div className="grid text-main justify-items-center text-main">
            <UserRoundKey className="flex items-center h-12 w-12 stroke-brand-hover" />
            <h1 className="text-brand-hover font-extrabold text-info-general">
              Restablecimiento de contraseña
            </h1>
            <p className="text-secondary text-info-general text-center font-light py-6">
              Ingresa el <strong className="font-bold">Token</strong> enviado a
              tu correo electronico
            </p>
          </div>
          <div className="grid justify-items-center gap-6">
            <TokenValidation />
            {
              <Button variant="secondary" size="md" onClick={handleClick}>
                Validar
              </Button>
            }
          </div>
        </form>
      </div>
    </div>
  );
}
>>>>>>> piloto_backend

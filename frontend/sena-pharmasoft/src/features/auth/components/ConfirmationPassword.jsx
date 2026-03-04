import Input from "../../../shared/components/Input"
import Button from "../../../shared/components/Button"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../../../shared/components/Modal";
import { Check } from "lucide-react";

export default function ConfirmationPassword(){

    const navigate = useNavigate();
    const [modal, setModal] = useState(false)


const handleClick = () => {
            setModal(true)
        setTimeout(() => {
                navigate('/login')
            }, 2500)

}

        return (
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="relative justify-items-center bg-white shadow-2xl w-84 h-60 p-2 rounded-lg grid gap-2 font-main">
                    
                    <h3 className="text-info-general font-extrabold text-brand-hover">
                        Actualizar contraseña
                    </h3>

                    <div className="flex flex-col gap-4 w-full">
                        <Input
                            type="password"
                            placeholder="Nueva contraseña"
                        /> 

                        <Input
                            type="password"
                            placeholder="Confirmar contraseña"
                        /> 
                    </div>

                    <Button onClick={handleClick}>
                        Confirmar
                    </Button>
                    { modal && (
                        <div className="absolute -inset-60 inset-x-142">
                            <Modal
                            className="font-secondary text-brand-fort"
                            logo={<Check className="stroke-brand-hover"/>}
                            message = 'Actualizacion de contraseña exitosa.'
                            ></Modal>
                        </div>    
                 
                    )}       
                </div>
            </div>
        )
}
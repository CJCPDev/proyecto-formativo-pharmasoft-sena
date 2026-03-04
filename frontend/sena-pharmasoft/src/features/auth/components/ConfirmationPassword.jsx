import Input from "../../../shared/components/Input"
import Button from "../../../shared/components/Button"

export default function ConfirmationPassword(){


    return(
        <div className="bg-white shadow-2xl w-84 p-2 rounded-lg grid justify-items-center gap-2 font-main">
            <h3 className="text-small-font font-extrabold text-brand-hover">Actualizar contraseña</h3>
            <div className="grid grid-cols2 gap-4 w-full">
                <Input
                    type='password'
                    placeholder = 'Nueva contraseña'
                /> 
                    <Input
                    type='password'
                    placeholder = 'Confirmar contraseña'
                /> 
            </div>
                <Button>Confirmar</Button>
        </div>
    )
}
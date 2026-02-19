import Input from '@/shared/components/Input'
import Button from '@/shared/components/Button'


export default function UserForm(){
    return (
        <div className="justify-items-center"> 
            {/* Formulario para crear el usuarioo*/}
            <form>
                <Input
                label='Nombre'
                placeholder='Ingrese su nombre'
                />

                {/* Actions */}
                <div className='flex gap-12 items-center justify-center'>
                <Button
                    variant = 'secondary'
                    size = 'sm'
                    onClick={()=>
                        console.log('cancelar')
                    }>
                        cancelar
                    </Button>
                    

                <Button
                    variant = 'primary'
                    size = 'md'
                    onClick={()=>
                        console.log('cancelar')
                    }>
                        Guardar
                    </Button>

                </div>
            </form>
        </div>
    )
}
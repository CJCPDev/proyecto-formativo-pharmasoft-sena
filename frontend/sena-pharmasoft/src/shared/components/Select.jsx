export default function Select({
    label,
    name,
    options = []
    }
){

    return (

        <div className='w-full '>

            {/* Label si el label tiene contenido es igual a truthy, si no es falsy y no muestra el label */}
            {label && (
            <label className='block text-small-label mb-1 px-4 text-text-secundary'>
                {label}
            </label>
            )}
            <select 
                name={name}
                className='
                    bg-brand-soft
                    w-full
                    h-12
                    rounded-lg
                    border
                    border-border
                    px-4
                '
                >
                <option value="">Seleccione un tipo de documento</option>
                {options.map((option) => {

                    return(
                    <option key={option.id} value={option.id}>
                        {option.label}
                    </option>
                    )
                })
                };
            </select>




        </div>


    );
};
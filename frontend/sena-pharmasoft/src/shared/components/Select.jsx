export default function Select({
    label,
    name,
    options = []
    }
){
    return (
        <div className='w-[320px]'>

            {/* Label si el label tiene contenido es igual a truthy, si no es falsy y no muestra el label */}
            {label && (
            <label className="
                            block
                            text-[8px]
                            text-gray-500
                            font-mono
                            font-light
                            "
            >
                {label}
            </label>
            )}

            <select 
                name={name}
                className='
                    w-full
                    h-12
                    relative
                    text-gray-400
                    rounded-xl
                    bg-[#DEFBDD]
                    border
                    border-[#F1FDF0]
                    px-4
                    text-base
                    font-main
                    focus:ring-2
                    focus:ring-[#062d08]
                    focus:border-[#062d08]
                    focus:outline-none
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
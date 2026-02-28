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
                    text-text-muted
                    rounded-xl
                    bg-brand-soft
                    border
                    border-brand
                    px-4
                    text-base
                    focus:ring-2
                    focus:ring-brand-hover
                    focus:border-brand-hover
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
export default function Select({
    label,
    name,
    options = [],
    value,
    error,
    onChange,
    }
){

    return (


        <div className='font-main w-full'> 

            {/* Label si el label tiene contenido es igual a truthy, si no es falsy y no muestra el label */}
            {label && (

            <label className={`
                    block  mb-1 px-2 text-info-medium
                    font-main
                    ${error ? 'text-red-600' : 'text-brand-hover'}
                    font-bold
                    text-brand-hover
                    `}
                    >

                {label}
            </label>
            )}
            <select
                value={value}
                onChange={onChange}
                name={name}
                className={`
                    bg-brand-soft
                    w-full
                    h-10
                    bg-brand-soft/60
                    rounded-xl
                    border
                    border-brand
                    px-4
                    text-base
                    focus:ring-2
                    ${error ? 'border-red-600' : 'border border-border-strong'} 
                    focus:ring-brand-hover
                    focus:border-brand-hover
                    focus:bg-white   
                    hover:bg-white
                    hover:border-brand-hover
                `}
                >

                <option disabled value="">
                    {'Seleccione una opción'}
                </option>

                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                    )
                )
<<<<<<< HEAD
                };
=======
                }
>>>>>>> piloto_backend
            </select>
                {error && <p className="text-red-700 text-sm mt-1">{error}</p>}
        </div>
    );
};
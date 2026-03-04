export default function Select({
    label,
    name,
    string,
    options = []
    }
){
    return (
        <div className='font-main w-[320px]'>

            {/* Label si el label tiene contenido es igual a truthy, si no es falsy y no muestra el label */}
            {label && (
            <label className='block text-small-label mb-1 px-4 text-text-secondary'>
                {label}
            </label>
            )}

            <select 
                name={name}
                className='
                    bg-brand-soft
                    w-full
                    h-12
                    relative
                    text-text-muted
                    bg-brand-soft
                    rounded-xl
                    border
                    border-brand
                    px-4
                    text-base
                    focus:ring-2
                    focus:ring-brand-hover
                    focus:border-brand-hover
                    focus:bg-white   
                    hover:bg-white
                    hover:border-brand-hover
                '
                >
                <option disabled value="">{string}</option>
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
    )
}
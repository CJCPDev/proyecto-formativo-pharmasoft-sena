import { useState } from "react";

export default function Select({
    label,
    name,
    options = []
    }
){

    const [selected, setSelected] = useState("");

    return (

        <div className='w-full'>

            {/* Label si el label tiene contenido es igual a truthy, si no es falsy y no muestra el label */}
            {label && (
            <label className='block text-info-medium mb-1 px-2 text-text-secondary font-main font-extrabold'>
                {label}
            </label>
            )}
            <select 
                name={name}
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className='
                    bg-brand-soft
                    w-full
                    h-10
                    bg-brand-soft/60
                    rounded-xl
                    border
                    border-border
                    px-4
                    focus:ring-1
                    focus:ring-brand-hover
                    focus:border-brand-fort
                    focus:outline-none
                    focus:bg-white   
                    hover:bg-white
                    hover:border-brand-hover
                '
                >
                <option disabled value="">
                    {'Seleccione una opción'}
                </option>

                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.label}
                    </option>
                    )
                )
                };
            </select>
        </div>
    );
};
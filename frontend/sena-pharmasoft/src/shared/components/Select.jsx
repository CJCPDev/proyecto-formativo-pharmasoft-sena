import { useState } from "react";

export default function Select({
    label,
    name,
    options = [],
    value,
    error,
    OnChange,
    }
){

    return (


        <div className='font-main w-full'>

            {/* Label si el label tiene contenido es igual a truthy, si no es falsy y no muestra el label */}
            {label && (

            <label className='block  mb-1 px-2 text-info-medium
                    font-main
                    font-bold
                    text-brand-hover'>

                {label}
            </label>
            )}
            <select
                value={value}
                OnChange={OnChange}
                name={name}
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
              {error && <p className="text-red-700 text-sm mt-1">{error}</p>}
        </div>
    );
};

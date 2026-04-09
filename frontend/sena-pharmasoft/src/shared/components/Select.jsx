// export default function Select({
//     label,
//     name,
//     options = [],
//     value,
//     error,
//     onChange,
//     disabled, //agrego luchp
//     }
// ){

//       {/* Select */}
//       <select
//         name={name}
//         value={value}
//         onChange={onChange}
//         className={`
//           w-full h-10 px-4
//           rounded-xl
//           border
//           text-base
//           transition

//           bg-brand-soft/60

//         <div className='font-main w-full relative z-50'> 

//           focus:outline-none
//           focus:ring-1
//           focus:ring-brand-hover
//           focus:border-brand-hover
//           focus:bg-white

//           hover:bg-white
//           hover:border-brand-hover
//         `}
//       >
//         <option disabled value="">
//           Seleccione una opción
//         </option>

//                 {label}
//             </label>
//               )}
//             <select
//                 value={value}
//                 onChange={onChange}
//                 name={name}
//                 disabled={disabled} //agrego lucho
//                 className={`
//                     bg-brand-soft
//                     w-full
//                     h-10
//                     bg-brand-soft/60
//                     rounded-xl
//                     border
//                     border-brand
//                     px-4
//                     text-base
//                     focus:ring-2
//                     ${error ? 'border-red-600' : 'border border-border-strong'} 
//                     focus:ring-brand-hover
//                     focus:border-brand-hover
//                     focus:bg-white   
//                     hover:bg-white
//                     hover:border-brand-hover
//                 `}
//                 >

//       {/* 🔥 ESPACIO FIJO PARA ERROR */}
//       <p className="text-red-700 text-xs mt-1 h-4">{error || ""}</p>
//     </div>
//   );
// }





export default function Select({
    label,
    name,
    options = [],
    value,
    error,
    onChange,
    disabled,
    }
){
    return (
        <div className='font-main w-full relative z-50'>
            {label && (
            <label className={`
                    block mb-1 px-2 text-info-medium
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
                disabled={disabled}
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
                    ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
                    focus:ring-brand-hover
                    focus:border-brand-hover
                    focus:bg-white   
                    hover:bg-white
                    hover:border-brand-hover
                `}
            >
                <option disabled value="">
                    Seleccione una opción
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {/* Espacio fijo para error */}
            <p className="text-red-700 text-xs mt-1 h-4">{error || ""}</p>
        </div>
    );
};
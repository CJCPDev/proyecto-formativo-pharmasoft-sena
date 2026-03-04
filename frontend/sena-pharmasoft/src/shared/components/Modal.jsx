


export default function Modal({message, logo, ...props}){



    return(
        <div className="w-90 h-18 bg-brand-soft/50 border border-brand-hover/30 rounded-2xl z-10 absolute p-1 flex items-center justify-center font-light gap-3">

            { logo && (
                    <div                  
                    >
                        {logo}
                    </div>
            )}
            <p
            
            {...props}
            >
                {message}
            </p>
        </div>
    )
}
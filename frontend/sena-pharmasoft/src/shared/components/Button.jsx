export default function Button ({
    variant = 'primary', // Define el estilo visual
    size = 'md',  
    type = 'button',
    children, //Es el contenido que tiene el botón
    ...props
}){
    const variants = {
        primary: 'font-main text-brand-soft font-semibold text-base bg-brand-hover hover:bg-brand-soft hover:text-brand-hover',
        secondary: "font-main text-brand-hover font-semibold text-base bg-brand-soft hover:bg-brand-hover hover:text-brand-soft",
    };

    const sizes = {
        sm:
            `
            relative
            h-9 px-3
            before:absolute before:content-['']
            before:-inset-y-[10px] before:-inset-x-[0px]
            
            `,

        md: 
            `
            h-10 px-4
            before:absolute before:content-['']
            before:-inset-y-[4px] before:-inset-x-[0px]
            
            `
    }
    return (
        <button
        type = {type}
        className={`
            w-40
            relative
            inline-flex items-center justify-center
            rounded-xl
            transition-colors
            ${variants[variant]}
            ${sizes[size]}
            `}
            {...props}
            >
            {children}
            </button>
    )
}
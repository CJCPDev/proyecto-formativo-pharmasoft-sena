export default function Button ({
    variant = 'primary', // Define el la variante visual del button
    size = 'md',  // tamaño
    type = 'button', // tipo de button
    children, //Es el contenido que tiene el botón
    ...props
}){
    const variants = {

        // primary: 'border border-border  bg-brand text-inverse hover:bg-brand-hover',
        // secondary: 'border border-border bg-brand text-primary hover:bg-brand-soft',

        primary: 'font-main text-brand-soft font-semibold text-base bg-brand-hover hover:bg-brand-soft hover:text-brand-hover',
        secondary: "font-main text-brand-hover font-semibold text-base bg-brand-softv2 hover:bg-brand-hover hover:text-brand-soft",
        boton: "bg-red-800 hover:bg-red-950"
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
            
            `,
        b:
            `
            bg-red
            relative
            h-9 px-3
            before:absolute before:content-['']
            before:-inset-y-[10px] before:-inset-x-[0px]
            
            `,
            
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
            cursor-pointer
            ${variants[variant]}
            ${sizes[size]}
            `}
            {...props}
            >
            {children}
            </button>
    )
}
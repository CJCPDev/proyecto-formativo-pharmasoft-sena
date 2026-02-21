export default function Input({label, type = "text", ...props}){
    return (


      <div className="w-full">
        {/*Label */}
        {label && (
          <label
            className="
                    block
                    text-[8px]
                    mb-1           
                "
          >
            {label}
          </label>
        )}
        {/* EL contenedor del input */}
            <div className="relative h-12 flex items-center">
            {/* Area interactiva visible (48px)*/}

                <div className="absolute inset-0"
                        onMouseDown = {(e) => {
                            e.preventDefault();
                            e.currentTarget.nextSibling.focus();
                            }}  
                />

                <input
                    type={type}
                    className="w-full h-10 relative text-black rounded-xl bg-primary-500 border border-primary-950 px-4 text-base focus:ring-1 focus:ring-primary-950 focus:border-primary-950 focus:outline-none"
                    {...props}  
                />
            </div>
        </div>
    );
}
export default function Input({label, type = "text", ...props}){
    return (


      <div className="w-full">
        {/*Label */}
        {label && (
          <label
            className="
                    block
                    text-small-label
                    mb-1           
                "
          >
            {label}
          </label>
        )}
        {/* EL contenedor del input */}
            <div className="relative h-14 flex items-center">
            {/* Area interactiva visible (48px)*/}

                <div className="absolute inset-0"
                        onMouseDown = {(e) => {
                            e.preventDefault();
                            e.currentTarget.nextSibling.focus();
                            }}  
                />

                <input
                    type={type}
                    className="w-full h-12 relative text-black rounded-md bg-brand border border-brand px-4 text-base focus:ring-1 focus:ring-brand focus:border-brand focus:outline-none"
                    {...props}  
                />
            </div>
        </div>
    );
}
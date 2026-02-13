export default function Input({label, type = "text", ...props}){
    return (
      <div className="w-[320px]">
        {/*Label */}
        {label && (
          <label
            className="
                    block
                    text-[8px]
                    
                    text-gray-500
                    font-mono     
                    font-light
                    blur-

                "
          >
            {label}
          </label>
        )}
        {/* EL contenedor del input */}

        <div
            className="
            relative
            h-12
            flex
            items-center
            "
        >
          {/* Area interactiva visible (48px)*/}

          <div
                className="
                absolute
                inset-0
                "
                onMouseDown = {(e) => {
                    e.preventDefault();
                    e.currentTarget.nextSibling.focus();
                    }}  
          />

          <input
            type={type}
            className="
                    w-full
                    h-8
                    relative
                    text-black
                    rounded-xl
                    bg-[#DEFBDD]
                    border
                    border-[#F1FDF0]
                    px-4
                    text-base
                    focus:ring-2
                    focus:ring-[#062d08]
                    focus:border-[#062d08]
                    focus:outline-none   
                    "
            {...props}
          />
        </div>
      </div>
    );
}
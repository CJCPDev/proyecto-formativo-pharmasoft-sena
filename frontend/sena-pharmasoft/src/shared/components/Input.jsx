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
            w-full
            max-w-md
            mx-auto
            mt-2
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
            relative  
            w-full
            h-10
            rounded-b-md
            border
            border-gray-300
            px-4
            text-base

            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
          "
            {...props}
          />
        </div>
      </div>
    );
}
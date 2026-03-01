export default function Input({label, type = "text", ...props}){
    return (
      <div className="w-80">
        {/*Label */}
        {label && (
          <label
            className="
                    block
                    text-[8px]
                    font-mono     
                    font-light
                    px-2
                    text-info-medium
                    text-black
                    font-main
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
                    h-12
                    relative
                    text-text-muted
                    rounded-xl
                    bg-brand-soft
                    border
                    border-brand
                    px-4
                    text-base
                    focus:ring-2
                    focus:ring-brand-hover
                    focus:border-brand-hover
                    focus:outline-none
                    bg-brand
                    border-background
                    focus:bg-white   
                    hover:bg-white
                    hover:border-brand-hover
                    "
            {...props}
          />
        </div>
      </div>
    );
}
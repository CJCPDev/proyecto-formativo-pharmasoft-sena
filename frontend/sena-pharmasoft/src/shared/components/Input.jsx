import './../../styles/global.css'

export default function Input({label, type = "text", ...props}){
    return (
      <div className="w-full">
        {/*Label */}
        {label && (
          <label
            className="
                    block
                    text-[8px] 
                    text-text-muted
                    font-light
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
                    text-text-muted
                    rounded-xl
                    bg-(--color-primary-100)
                    border
                    border-(--color-primary-50)
                    px-4
                    text-base
                    focus:ring-2
                    focus:ring-(--color-primary-950)
                    focus:border-(--color-primary-950)
                    focus:outline-none   
                    "
            {...props}
          />
        </div>
      </div>
    );
}
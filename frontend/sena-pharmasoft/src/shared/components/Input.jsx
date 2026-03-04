import './../../styles/global.css'

export default function Input({label, type = "text", ...props}){
    return (
      <div className="w-full">
        {/*Label */}
        {label && (
          <label
            className="
                    block
                    px-2
                    text-info-medium
                    text-black
                    font-main
                    font-bold
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
                    h-10
                    relative
                    text-black
                    rounded-xl
                    bg-brand-soft/60
                    border
                    border-background
                    px-4
                    text-base
                    focus:ring-1
                    focus:ring-brand-hover
                    focus:border-brand-fort
                    focus:outline-none
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
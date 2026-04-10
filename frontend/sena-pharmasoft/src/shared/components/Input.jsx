import "./../../styles/global.css";

export default function Input({
  label,
  type = "text",
  error,
  className = "",
  ...props
}) {
  return (
    <div className="w-full flex flex-col">
      {/* Label */}
      {label && (
        <label
          className={`
            px-1 text-sm font-main
            ${error ? "text-red-600" : "text-brand-hover"}
          `}
        >
          {label}
        </label>
      )}

      {/* Contenedor */}
      <div className="relative h-12 flex items-center">
        {/* Área clickeable */}
        <div
          className="absolute inset-0 pointer-events-none"
          onMouseDown={(e) => {
            e.preventDefault();
            e.currentTarget.nextSibling.focus();
          }}
        />

        {/* Input */}
        <input
          type={type}
          className={`
            w-full h-10
            px-4
            text-base
            rounded-xl
            transition
            bg-brand-soft/60
            border
            ${error ? "border-red-600" : "border-border-strong"}
            focus:outline-none
            focus:ring-1
            focus:ring-brand-hover
            focus:border-brand-hover
            focus:bg-white
            hover:bg-white
            hover:border-brand-hover
            ${className}
          `}
          {...props}
        />
      </div>

      {/*  ESPACIO FIJO PARA ERROR */}
      <p className="text-red-700 text-xs mt-1 h-4">
        {error || ""}
      </p>
    </div>
  );
}

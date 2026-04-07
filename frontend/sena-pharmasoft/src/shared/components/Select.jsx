export default function Select({
  label,
  name,
  options = [],
  value,
  error,
  onChange,
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

      {/* Select */}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`
          w-full h-10 px-4
          rounded-xl
          border
          text-base
          transition

          bg-brand-soft/60

          ${error ? "border-red-600" : "border-border-strong"}

          focus:outline-none
          focus:ring-1
          focus:ring-brand-hover
          focus:border-brand-hover
          focus:bg-white

          hover:bg-white
          hover:border-brand-hover
        `}
      >
        <option disabled value="">
          Seleccione una opción
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* 🔥 ESPACIO FIJO PARA ERROR */}
      <p className="text-red-700 text-xs mt-1 h-4">{error || ""}</p>
    </div>
  );
}

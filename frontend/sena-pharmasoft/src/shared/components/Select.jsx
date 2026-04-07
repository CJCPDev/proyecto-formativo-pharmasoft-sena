export default function Select({
  label,
  name,
  options = [],
  value,
  error,
  onChange,
}) {
  return (
    <div className="w-full font-main flex flex-col gap-1">
      
      {/* Label */}
      {label && (
        <label
          className={`
            px-1 text-sm font-bold
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
          focus:ring-2
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

      {/* Error */}
      {error && (
        <p className="text-red-700 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
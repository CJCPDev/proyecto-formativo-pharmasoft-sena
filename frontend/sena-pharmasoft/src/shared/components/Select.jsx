export default function Select({
  label,
  name,
  options = [],
  value,
  disabled = false,
  error,
  onChange,
}) {

  return (
    <div className="font-main w-full">

      {label && (
        <label
          className={`
            block mb-1 px-2 text-info-medium
            font-main font-bold
            ${error ? "text-red-600" : "text-brand-hover"}
          `}
        >
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={onChange}
        name={name}
        disabled={disabled}
        className={`
          bg-brand-soft/60
          w-full h-10
          rounded-xl
          border px-4 text-base
          ${error ? "border-red-600" : "border-border-strong"}
          focus:ring-2 focus:ring-brand-hover
          focus:border-brand-hover
          focus:bg-white
          hover:bg-white hover:border-brand-hover
        `}
      >
        <option value="">
          Seleccione una opción
        </option>

        {options.map((option, index) => {
          return (
<option
  key={option.value ?? option.id ?? index}
  value={option.value ?? option.id}
>
  {option.label}
</option>
          );
        })}
      </select>

      {error && (
        <p className="text-red-700 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
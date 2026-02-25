export default function Select({
  label,
  name,
  options = [],
  placeholder = "Seleccione una opción", //Se agrega el prop para cada Select
  ...props
}) {
  return (
    <div className="w-[320px]">
      {label && (
        <label className="text-caption mb-1 text-text-secundary">{label}</label>
      )}

      <select
        name={name}
        className="
          w-full
          h-12
          rounded-md
          border
          border-border
          px-4
          bg-[#DEFBDD]
          text-black
          focus:outline-none
          focus:ring-2
          focus:ring-[#062d08]
          focus:border-[#062d08]
        "
        {...props}
      >
        {/* Aquí use la prop placeholder */}
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
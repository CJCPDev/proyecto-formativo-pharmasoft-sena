export default function Select({
  label,
  name,
  options = [],
  text,
  ...props
}) {
  return (
    <div className="w-[320px]">

      {/* Label */}
      {label && (
        <label
          className="
            block
            text-[8px]
            text-gray-500
            font-mono
            font-light
          "
        >
          {label}
        </label>
      )}

      {/* Contenedor igual al Input */}
      <div
        className="
          relative
          h-12
          flex
          items-center
        "
      >

        <select
          name={name}
          value=""
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
        >
          {/* Placeholder */}
          <option value="" disabled hidden>
            {text}
          </option>

          {/* Opciones dinámicas */}
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>

      </div>
    </div>
  );
}
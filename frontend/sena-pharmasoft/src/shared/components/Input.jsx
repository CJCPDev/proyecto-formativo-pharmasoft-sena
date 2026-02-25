export default function Input({ label, type = "text", ...props }) {
  return (
    <div className="w-[320px]">
      {label && (
        <label className="text-caption mb-1 text-text-secundary">{label}</label>
      )}

      <div className="relative h-12 flex items-center">
        {type !== "date" && (
          <div
            className="absolute inset-0"
            onMouseDown={(e) => {
              e.preventDefault();
              e.currentTarget.nextSibling.focus();
            }}
          />
        )}

        <input
          type={type}
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
            appearance-none
          "
          style={{ color: "--semantic-text-main" }}
          {...props}
        />
      </div>
    </div>
  );
}
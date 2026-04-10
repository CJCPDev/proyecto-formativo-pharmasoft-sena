export default function InputHome({ label, type, ...props }) {
  return (
    <div className="relative w-full">
      <input
        type={type}
       {...props}
        placeholder=" "
        className="
          peer
          w-full
          border border-border
          rounded-2xl
          p-3
          text-text-primary
          bg-surface
          focus:outline-none
          focus:border-brand-hover
        "
      />

      <label
        className={`
          absolute
          left-3
          top-3
          text-text-mute
          text-sm
          transition-all
          duration-200
          peer-not-placeholder-shown:-top-6
          peer-not-placeholder-show:text-xs
          peer-focus:-top-6
          peer-focus:text-xs
          peer-focus:text-brand-hover
        `}
      >
        {label}
      </label>
    </div>
  );
}
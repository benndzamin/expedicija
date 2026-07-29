export default function RadioGroup({ options, value, className = "" }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex items-center gap-1.5 text-[11px] text-win-text"
        >
          <input
            type="radio"
            readOnly
            checked={value === opt.value}
            className="h-[13px] w-[13px]"
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}

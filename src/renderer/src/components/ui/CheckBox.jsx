export default function CheckBox({ label, checked = false, className = "" }) {
  return (
    <label className={`flex shrink-0 items-center gap-1 text-[11px] text-win-text ${className}`}>
      <input type="checkbox" readOnly checked={checked} className="h-[13px] w-[13px]" />
      {label}
    </label>
  );
}

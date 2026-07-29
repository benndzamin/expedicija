export default function ToolButton({
  icon: Icon,
  label,
  selected = false,
  fullWidth = false,
  size = 14,
  className = "",
  onClick,
  disabled = false,
  title,
}) {
  return (
    <button
      type="button"
      tabIndex={onClick ? 0 : -1}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`flex items-center gap-1.5 border border-transparent px-2 py-1 text-[11px] ${
        fullWidth ? "w-full justify-start" : ""
      } ${disabled ? "cursor-default opacity-40" : ""} ${
        selected
          ? "bg-win-select text-win-white"
          : "text-win-text hover:border-win-border hover:bg-win-white"
      } ${className}`}
    >
      {Icon && <Icon size={size} strokeWidth={1.75} />}
      <span className="truncate">{label}</span>
    </button>
  );
}

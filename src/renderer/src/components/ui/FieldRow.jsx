export default function FieldRow({
  label,
  labelWidth = "w-28",
  tone = "normal",
  className = "",
  children,
}) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {label && (
        <span
          className={`win-label shrink-0 ${labelWidth} ${
            tone === "red" ? "text-win-red" : ""
          }`}
        >
          {label}
        </span>
      )}
      <div className="flex min-w-0 flex-1 items-center gap-1">{children}</div>
    </div>
  );
}

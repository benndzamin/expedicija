export default function GroupBox({ label, className = "", bodyClassName = "", children }) {
  return (
    <div className={`win-groupbox bg-win-panel ${className}`}>
      {label && (
        <span className="absolute -top-[7px] left-2 bg-win-panel px-1 text-[11px] text-win-text">
          {label}
        </span>
      )}
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

export default function ComboInput({ className = "", value = "", ...props }) {
  return (
    <div className={`flex h-[20px] flex-1 items-stretch ${className}`}>
      <input
        type="text"
        readOnly
        value={value}
        className="win-input flex-1 border-r-0"
        {...props}
      />
      <span className="flex w-[16px] items-center justify-center border border-win-input-border bg-win-panel text-[9px] leading-none">
        ▼
      </span>
    </div>
  );
}

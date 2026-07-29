export default function NumberSpinner({ className = "", value = 0, ...props }) {
  return (
    <div className={`flex h-[20px] items-stretch ${className}`}>
      <input
        type="text"
        readOnly
        value={value}
        className="win-input w-full border-r-0 text-right"
        {...props}
      />
      <div className="flex w-[16px] flex-col border border-win-input-border bg-win-panel leading-none">
        <span className="flex flex-1 items-center justify-center text-[8px]">▲</span>
        <span className="flex flex-1 items-center justify-center border-t border-win-input-border text-[8px]">
          ▼
        </span>
      </div>
    </div>
  );
}

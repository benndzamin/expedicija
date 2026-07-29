export default function ScaleReadout({ value = 0, className = "" }) {
  return (
    <div
      className={`flex h-full min-h-[60px] items-center justify-center border border-win-border-dark bg-win-white px-3 ${className}`}
    >
      <span className="text-4xl font-bold leading-none text-win-text">{value}</span>
    </div>
  );
}

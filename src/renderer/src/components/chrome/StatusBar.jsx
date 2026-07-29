import { FKEY_HINTS } from "../../data/mockNalog";

export default function StatusBar() {
  return (
    <div className="flex items-center border-t border-win-border bg-win-panel text-[11px] text-win-text">
      {FKEY_HINTS.map((hint, i) => (
        <span
          key={hint}
          className={`px-2 py-1 ${i > 0 ? "border-l border-win-border" : ""}`}
        >
          {hint}
        </span>
      ))}
    </div>
  );
}

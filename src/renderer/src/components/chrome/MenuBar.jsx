import { MENU_ITEMS } from "../../data/mockNalog";
import { MENU_ICONS } from "../../icons";

export default function MenuBar() {
  return (
    <div className="flex items-center gap-4 border-b border-win-border bg-win-face px-2 py-1">
      {MENU_ITEMS.map((item, i) => {
        const Icon = MENU_ICONS[i];
        return (
          <button
            key={item}
            type="button"
            tabIndex={-1}
            className="flex items-center gap-1 px-1 text-[11px] text-win-text hover:bg-win-white"
          >
            {Icon && <Icon size={12} strokeWidth={1.75} />}
            {item}
          </button>
        );
      })}
    </div>
  );
}

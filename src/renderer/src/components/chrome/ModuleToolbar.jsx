import { TOOLBAR_ITEMS } from "../../data/mockNalog";
import { ICONS } from "../../icons";
import ToolButton from "../ui/ToolButton";

export default function ModuleToolbar({ onRefreshNalog }) {
  return (
    <div className="flex items-center gap-1 border-b border-win-border bg-win-panel px-2 py-1">
      {TOOLBAR_ITEMS.map((item) => (
        <ToolButton
          key={item.key}
          icon={ICONS[item.icon]}
          label={item.label}
          selected={item.key === "nalog"}
          onClick={item.key === "nalog" ? onRefreshNalog : undefined}
        />
      ))}
    </div>
  );
}

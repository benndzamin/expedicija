import {
  SIDEBAR_NAV,
  SIDEBAR_ACTIONS,
  SIDEBAR_LINKS,
} from "../../data/mockNalog";
import { ICONS } from "../../icons";
import ToolButton from "../ui/ToolButton";
import Divider from "../ui/Divider";

export default function RightSidebar({ onSnimi, snimiEnabled, saving }) {
  return (
    <div className="flex w-[152px] shrink-0 flex-col border-l border-win-border bg-win-sidebar">
      <div className="truncate border-b border-win-border px-2 py-1.5 text-[12px] font-bold text-win-text">
        Otprema/O…
      </div>

      <div className="flex flex-col p-1">
        {SIDEBAR_NAV.map((item) => (
          <ToolButton
            key={item.key}
            icon={ICONS[item.icon]}
            label={item.label}
            selected={item.selected}
            fullWidth
          />
        ))}
      </div>

      <Divider className="mx-1 w-auto" />

      <div className="flex flex-col p-1">
        {SIDEBAR_ACTIONS.map((item) =>
          item.key === "snimi" ? (
            <ToolButton
              key={item.key}
              icon={ICONS[item.icon]}
              label={saving ? "Snimanje..." : item.label}
              fullWidth
              onClick={onSnimi}
              disabled={!snimiEnabled}
              title={
                !snimiEnabled
                  ? "Prvo izaberite najavu (dugme NAJAVE)"
                  : undefined
              }
            />
          ) : (
            <ToolButton
              key={item.key}
              icon={ICONS[item.icon]}
              label={item.label}
              fullWidth
            />
          ),
        )}
      </div>

      <div className="flex-1" />

      <div className="flex flex-col gap-1 p-2 text-[11px] text-win-heading underline">
        {SIDEBAR_LINKS.map((link) => (
          <span key={link} className="cursor-default">
            {link}
          </span>
        ))}
      </div>

      <button
        type="button"
        tabIndex={-1}
        className="w-full bg-win-select px-2 py-1.5 text-left text-[11px] font-bold text-win-white"
      >
        Otprema/Odvaga
      </button>
    </div>
  );
}

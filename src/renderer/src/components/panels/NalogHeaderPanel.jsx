import GroupBox from "../ui/GroupBox";
import FieldRow from "../ui/FieldRow";
import TextInput from "../ui/TextInput";
import ComboInput from "../ui/ComboInput";
import CheckBox from "../ui/CheckBox";
import ToolButton from "../ui/ToolButton";
import { ICONS } from "../../icons";

export default function NalogHeaderPanel({
  nalog,
  onOpenNajave,
  najaveEnabled,
  onFieldChange,
}) {
  return (
    <GroupBox label="Broj i datum naloga otpreme" className="h-full">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 flex-col gap-1">
          <FieldRow label="Broj naloga:" labelWidth="w-24">
            <TextInput variant="yellow" value={nalog.broj_naloga} className="w-32" />
          </FieldRow>
          <FieldRow label="Datum naloga:" labelWidth="w-24">
            <ComboInput
              value={nalog.datum_naloga}
              readOnly={false}
              onChange={(e) => onFieldChange("datum_naloga", e.target.value)}
              className="w-32 flex-none"
            />
            <CheckBox label="Proknjižen" checked={nalog.proknjizen} className="ml-3" />
          </FieldRow>
        </div>
        <div className="flex items-center gap-3 pr-2">
          <div className="text-[17px] font-bold leading-tight text-win-heading">
            OTPREMA CEMENTA
          </div>
          <ToolButton
            icon={ICONS.fileSearch}
            label="NAJAVE"
            onClick={onOpenNajave}
            disabled={!najaveEnabled}
          />
        </div>
      </div>
    </GroupBox>
  );
}

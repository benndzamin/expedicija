import GroupBox from "../ui/GroupBox";
import FieldRow from "../ui/FieldRow";
import ComboInput from "../ui/ComboInput";

export default function VrijemeOdvagePanel({ nalog, className = "" }) {
  return (
    <GroupBox
      label="Vrijeme odvage"
      className={className}
      bodyClassName="flex flex-col gap-1"
    >
      <FieldRow label="Ulazno:" labelWidth="w-14" tone="red">
        <ComboInput value={nalog.vrijeme_ulazno} />
      </FieldRow>
      <FieldRow label="Izlazno:" labelWidth="w-14" tone="red">
        <ComboInput value={nalog.vrijeme_izlazno} />
      </FieldRow>
    </GroupBox>
  );
}

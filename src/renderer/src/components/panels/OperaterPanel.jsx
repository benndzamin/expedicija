import GroupBox from "../ui/GroupBox";
import FieldRow from "../ui/FieldRow";
import TextInput from "../ui/TextInput";
import ComboInput from "../ui/ComboInput";

export default function OperaterPanel({ nalog }) {
  return (
    <GroupBox label="Operater i vrijeme">
      <div className="flex gap-6">
        <FieldRow label="Operater:" labelWidth="w-20" className="flex-1">
          <TextInput value={nalog.operater} />
        </FieldRow>
        <FieldRow label="Datum i vrijeme:" labelWidth="w-28" className="flex-1">
          <ComboInput value={nalog.datum_i_vrijeme} className="w-44 flex-none" />
        </FieldRow>
      </div>
    </GroupBox>
  );
}

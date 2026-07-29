import GroupBox from "../ui/GroupBox";
import FieldRow from "../ui/FieldRow";
import TextInput from "../ui/TextInput";

export default function TransportPanel({ nalog }) {
  return (
    <GroupBox label="Transport" className="h-full" bodyClassName="flex flex-col gap-1">
      <FieldRow label="Dest. code:" labelWidth="w-20">
        <TextInput value={nalog.dest_code_1} className="w-16" />
        <TextInput value={nalog.dest_code_2} />
      </FieldRow>
      <FieldRow label="Odobreno:" labelWidth="w-20">
        <TextInput value={nalog.odobreno} />
      </FieldRow>
      <FieldRow label="Odobrio:" labelWidth="w-20">
        <TextInput value={nalog.odobrio} />
      </FieldRow>
    </GroupBox>
  );
}

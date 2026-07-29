import GroupBox from "../ui/GroupBox";
import FieldRow from "../ui/FieldRow";
import TextInput from "../ui/TextInput";
import ComboInput from "../ui/ComboInput";

export default function KarticaPanel({ nalog }) {
  return (
    <GroupBox label="Kartica" className="h-full" bodyClassName="flex flex-col gap-1">
      <FieldRow label="Broj kartice:" labelWidth="w-24">
        <TextInput value={nalog.broj_kartice} />
      </FieldRow>
      <FieldRow label="ID kartice:" labelWidth="w-24">
        <TextInput value={nalog.id_kartice} />
      </FieldRow>
      <FieldRow label="Vrsta kartice:" labelWidth="w-24">
        <TextInput value={nalog.vrsta_kartice} />
      </FieldRow>
      <FieldRow label="Datum otpreme:" labelWidth="w-24" className="mt-1">
        <ComboInput value={nalog.datum_otpreme} />
      </FieldRow>
    </GroupBox>
  );
}

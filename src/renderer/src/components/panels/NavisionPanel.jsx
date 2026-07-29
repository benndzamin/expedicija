import GroupBox from "../ui/GroupBox";
import FieldRow from "../ui/FieldRow";
import ComboInput from "../ui/ComboInput";
import CheckBox from "../ui/CheckBox";

export default function NavisionPanel({ nalog }) {
  return (
    <GroupBox label="Prenešeno u Navision sistem" className="h-full">
      <div className="flex flex-col gap-1">
        <CheckBox
          label="Prenešeno u Navision sistem"
          checked={nalog.preneseno_u_navision}
        />
        <FieldRow label="Datum prenosa u Navision sistem:" labelWidth="w-[210px]">
          <ComboInput value={nalog.datum_prenosa_navision} />
        </FieldRow>
      </div>
    </GroupBox>
  );
}

import GroupBox from "../ui/GroupBox";
import RadioGroup from "../ui/RadioGroup";
import { NACIN_TRANSPORTA_OPTIONS } from "../../data/mockNalog";

export default function NacinTransportaPanel({ nalog }) {
  return (
    <GroupBox label="Način transporta" className="h-full">
      <RadioGroup options={NACIN_TRANSPORTA_OPTIONS} value={nalog.nacin_transporta} />
    </GroupBox>
  );
}

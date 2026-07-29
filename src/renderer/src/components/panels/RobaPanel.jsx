import GroupBox from "../ui/GroupBox";
import RobaRow from "./RobaRow";
import VagaBlock from "./VagaBlock";

export default function RobaPanel({ nalog, onRobaChange, allowedArtikli }) {
  return (
    <GroupBox label="Roba za otpremu">
      <div className="grid grid-cols-2 gap-x-6">
        <div className="flex flex-col gap-3">
          {nalog.stavke.map((stavka, i) => (
            <RobaRow
              key={i}
              stavka={stavka}
              index={i}
              onRobaChange={onRobaChange}
              allowedArtikli={i === 0 ? allowedArtikli : undefined}
            />
          ))}
        </div>
        <VagaBlock nalog={nalog} />
      </div>
    </GroupBox>
  );
}

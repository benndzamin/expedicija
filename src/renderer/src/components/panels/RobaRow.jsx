import FieldRow from "../ui/FieldRow";
import TextInput from "../ui/TextInput";
import BrowseButton from "../ui/BrowseButton";
import NumberSpinner from "../ui/NumberSpinner";

export default function RobaRow({ stavka, index, onRobaChange, allowedArtikli }) {
  const restricted = Array.isArray(allowedArtikli) && allowedArtikli.length > 1;
  return (
    <div className="flex flex-col gap-1">
      <FieldRow label="Roba:" labelWidth="w-24">
        {restricted ? (
          <select
            value={stavka.roba}
            onChange={(e) => onRobaChange(index, e.target.value)}
            className="win-input w-full"
          >
            {allowedArtikli.map((artikal) => (
              <option key={artikal} value={artikal}>
                {artikal}
              </option>
            ))}
          </select>
        ) : (
          <TextInput value={stavka.roba} />
        )}
        <BrowseButton />
      </FieldRow>
      <FieldRow label="Količina (t):" labelWidth="w-24">
        <NumberSpinner value={stavka.kolicina[0]} className="w-16" />
        <NumberSpinner value={stavka.kolicina[1]} className="w-16" />
        <NumberSpinner value={stavka.kolicina[2]} className="w-16" />
      </FieldRow>
      <FieldRow label="Palete (kom):" labelWidth="w-24">
        <NumberSpinner value={stavka.palete} className="w-16" />
      </FieldRow>
    </div>
  );
}

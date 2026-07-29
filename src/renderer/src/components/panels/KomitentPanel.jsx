import GroupBox from "../ui/GroupBox";
import FieldRow from "../ui/FieldRow";
import TextInput from "../ui/TextInput";
import BrowseButton from "../ui/BrowseButton";
import CheckBox from "../ui/CheckBox";
import ToolButton from "../ui/ToolButton";
import NajavaAutocompleteField from "../najave/NajavaAutocompleteField";
import { ICONS } from "../../icons";

export default function KomitentPanel({
  nalog,
  onSelectFirmaMatch,
  onHoverFirmaMatch,
  najaveEnabled,
  pendingNajave,
  najaveLoaded,
  kupci,
  kupciLoaded,
  onFieldChange,
}) {
  return (
    <GroupBox label="Komitent-kupac">
      <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.55fr)_minmax(0,1.3fr)_auto] gap-x-4 gap-y-1">
        {/* left column */}
        <div className="flex flex-col gap-1">
          <FieldRow label="Firma/kupac:" labelWidth="w-32">
            <NajavaAutocompleteField
              value={nalog.firma_kupac}
              onSelect={onSelectFirmaMatch}
              onHoverItem={onHoverFirmaMatch}
              enabled={najaveEnabled}
              najave={pendingNajave}
              najaveLoaded={najaveLoaded}
              kupci={kupci}
              kupciLoaded={kupciLoaded}
            />
            <BrowseButton />
          </FieldRow>
          <FieldRow label="Naziv firme:" labelWidth="w-32">
            <TextInput value={nalog.naziv_firme} />
          </FieldRow>
          <FieldRow label="Adresa i mjesto:" labelWidth="w-32">
            <TextInput value={nalog.adresa_i_mjesto} />
          </FieldRow>
          <FieldRow label="Registarski broj firme:" labelWidth="w-32">
            <TextInput value={nalog.registarski_broj_firme} className="w-28" />
            <CheckBox
              label="Prekoračen limit - transgressed"
              checked={nalog.prekoracen_limit}
              className="ml-2"
            />
          </FieldRow>
          <FieldRow label="Broj okvirnog ugovora:" labelWidth="w-32">
            <TextInput value={nalog.broj_okvirnog_ugovora} className="w-28" />
            <span className="win-label ml-2 w-20 shrink-0">Kreditni limit:</span>
            <TextInput variant="yellow" value={nalog.kreditni_limit} />
          </FieldRow>
          <CheckBox
            label="Isporuka za inostranstvo"
            checked={nalog.isporuka_inostranstvo}
          />
        </div>

        {/* middle column */}
        <div className="flex flex-col gap-1">
          <FieldRow label="Šifra u Navision-u:" labelWidth="w-28">
            <TextInput value={nalog.sifra_u_navisionu} />
          </FieldRow>
        </div>

        {/* right column */}
        <div className="flex flex-col gap-1">
          <FieldRow label="Prevoznik:" labelWidth="w-28">
            <TextInput value={nalog.prevoznik} className="w-28" />
            <BrowseButton />
            <TextInput value="" className="flex-1" />
          </FieldRow>
          <FieldRow label="Vozač:" labelWidth="w-28">
            <TextInput
              value={nalog.vozac}
              readOnly={false}
              onChange={(e) => onFieldChange("vozac", e.target.value)}
            />
          </FieldRow>
          <FieldRow label="Dokument (ID):" labelWidth="w-28">
            <TextInput value={nalog.dokument_id} />
          </FieldRow>
          <FieldRow label="Registarski broj:" labelWidth="w-28">
            <TextInput
              variant="yellow"
              value={nalog.registarski_broj}
              readOnly={false}
              onChange={(e) => onFieldChange("registarski_broj", e.target.value)}
            />
          </FieldRow>
          <FieldRow label="Adresa isporuke:" labelWidth="w-28">
            <TextInput value={nalog.adresa_isporuke} className="w-24" />
            <BrowseButton />
            <TextInput value="" className="flex-1" />
          </FieldRow>
          <FieldRow label="Isporuka na osnovu:" labelWidth="w-28">
            <TextInput
              value={nalog.isporuka_na_osnovu}
              readOnly={false}
              onChange={(e) => onFieldChange("isporuka_na_osnovu", e.target.value)}
            />
          </FieldRow>
        </div>

        {/* stacked action buttons */}
        <div className="flex flex-col justify-center gap-2 pl-2">
          <ToolButton icon={ICONS.arrowRightLeft} label="Prenos u fakt." />
          <ToolButton icon={ICONS.packagePlus} label="Nalog utovara" />
        </div>
      </div>
    </GroupBox>
  );
}

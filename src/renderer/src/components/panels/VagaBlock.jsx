import FieldRow from "../ui/FieldRow";
import NumberSpinner from "../ui/NumberSpinner";
import ScaleReadout from "../ui/ScaleReadout";
import VrijemeOdvagePanel from "./VrijemeOdvagePanel";

export default function VagaBlock({ nalog }) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1">
      <div className="flex flex-col gap-1">
        <FieldRow label="Vaga ulaz:" labelWidth="w-24">
          <NumberSpinner value={nalog.vaga_ulaz} className="w-20" />
        </FieldRow>
        <FieldRow label="Vaga izlaz:" labelWidth="w-24">
          <NumberSpinner value={nalog.vaga_izlaz} className="w-20" />
        </FieldRow>
      </div>
      <ScaleReadout value={nalog.vaga_display} className="row-span-2 w-28" />

      <div className="col-span-2 flex flex-col gap-1">
        <FieldRow label="KOLIČINA CEM:" labelWidth="w-24" tone="red">
          <NumberSpinner value={nalog.kolicina_cem} className="w-20" />
        </FieldRow>
        <FieldRow label="Palete ulaz:" labelWidth="w-24">
          <NumberSpinner value={nalog.palete_ulaz} className="w-20" />
        </FieldRow>
        <FieldRow label="Palete izlaz:" labelWidth="w-24">
          <NumberSpinner value={nalog.palete_izlaz} className="w-20" />
        </FieldRow>
        <FieldRow label="Folija - broj paleta:" labelWidth="w-24">
          <NumberSpinner value={nalog.folija_broj_paleta} className="w-20" />
        </FieldRow>
      </div>

      <VrijemeOdvagePanel nalog={nalog} className="col-span-2" />
    </div>
  );
}

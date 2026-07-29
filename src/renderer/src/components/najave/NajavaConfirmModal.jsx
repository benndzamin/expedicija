export default function NajavaConfirmModal({ najava, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg border border-win-border-dark bg-win-panel shadow-lg">
        <div className="border-b border-win-border-dark bg-win-select px-3 py-1.5">
          <span className="text-[12px] font-bold text-win-white">
            Potvrda izdavanja naloga
          </span>
        </div>

        <div className="p-3">
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 border border-win-border bg-win-white p-2 text-[11px]">
            <dt className="font-bold">Firma:</dt>
            <dd>{najava.firma}</dd>
            <dt className="font-bold">Vrsta cementa:</dt>
            <dd>{najava.vrsta_cementa}</dd>
            <dt className="font-bold">Planirani datum:</dt>
            <dd>{najava.datum_planiranja_odpreme}</dd>
            <dt className="font-bold">Vozač:</dt>
            <dd>
              {najava.ime_vozaca || "-"} {najava.prezime_vozaca || ""}
            </dd>
            <dt className="font-bold">Registracija:</dt>
            <dd>{najava.registarske_oznake || "-"}</dd>
          </dl>

          <p className="mt-3 text-[11px] text-win-text">
            Da li ste sigurni da želite izdati nalog za ovu najavu?
          </p>

          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="win-btn"
            >
              Odustani
            </button>
            <button
              type="button"
              onClick={() => onConfirm(najava)}
              className="border border-win-border bg-win-select px-3 py-0.5 text-[11px] font-bold text-win-white hover:opacity-90"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useMemo, useState } from "react";

export default function NajaveListModal({ najave, loaded, onSelect, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return najave;
    return najave.filter((item) =>
      [
        item.firma,
        item.vrsta_cementa,
        item.ime_vozaca,
        item.prezime_vozaca,
        item.registarske_oznake,
      ]
        .filter(Boolean)
        .some((val) => val.toLowerCase().includes(term)),
    );
  }, [najave, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const page = Math.min(currentPage, totalPages);
  const rangeStart = filtered.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, filtered.length);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
  );

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 p-4">
      <div className="flex max-h-[85vh] w-full max-w-4xl flex-col border border-win-border-dark bg-win-panel shadow-lg">
        <div className="flex items-center justify-between border-b border-win-border-dark bg-win-select px-3 py-1.5">
          <span className="text-[12px] font-bold text-win-white">
            Najave na čekanju
          </span>
          <button
            type="button"
            onClick={onClose}
            className="border border-win-white/60 px-2 text-[11px] text-win-white hover:bg-win-white/20"
          >
            ✕
          </button>
        </div>

        <div className="flex items-center justify-between gap-3 border-b border-win-border px-3 py-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Pretraži (firma, cement, vozač, registracija)..."
            className="win-input w-72"
          />
          <label className="flex items-center gap-2 text-[11px] text-win-text">
            Po stranici
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="win-input w-16"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </label>
        </div>

        <div className="overflow-auto px-3 py-3">
          {!loaded ? (
            <div className="py-6 text-center text-[11px] text-win-text">
              Učitavanje...
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-6 text-center text-[11px] text-win-text">
              {najave.length === 0
                ? "Nema najava na čekanju."
                : "Nema najava koje odgovaraju pretrazi."}
            </div>
          ) : (
            <table className="w-full border-collapse text-left text-[11px]">
              <thead>
                <tr className="bg-win-face">
                  <th className="border border-win-border px-3 py-1.5">Firma</th>
                  <th className="border border-win-border px-3 py-1.5">
                    Vrsta cementa
                  </th>
                  <th className="border border-win-border px-3 py-1.5">
                    Planirani datum
                  </th>
                  <th className="border border-win-border px-3 py-1.5">Vozač</th>
                  <th className="border border-win-border px-3 py-1.5">
                    Registracija
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((item) => (
                  <tr
                    key={item.id}
                    className="cursor-default bg-win-white hover:bg-win-select hover:text-win-white"
                    onClick={() => onSelect(item)}
                  >
                    <td className="border border-win-border px-3 py-1.5">
                      {item.firma}
                    </td>
                    <td className="border border-win-border px-3 py-1.5">
                      {item.vrsta_cementa}
                    </td>
                    <td className="border border-win-border px-3 py-1.5">
                      {item.datum_planiranja_odpreme}
                    </td>
                    <td className="border border-win-border px-3 py-1.5">
                      {item.ime_vozaca || "-"} {item.prezime_vozaca || ""}
                    </td>
                    <td className="border border-win-border px-3 py-1.5">
                      {item.registarske_oznake || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {loaded && filtered.length > 0 && (
          <div className="flex items-center justify-between gap-3 border-t border-win-border px-3 py-2">
            <span className="text-[11px] text-win-text">
              Prikazano {rangeStart}-{rangeEnd} od {filtered.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="win-btn disabled:cursor-default disabled:opacity-40"
              >
                ◀
              </button>
              {pageNumbers.map((p, idx) => (
                <span key={p} className="flex items-center">
                  {idx > 0 && p - pageNumbers[idx - 1] > 1 && (
                    <span className="px-1 text-[11px] text-win-text-dim">…</span>
                  )}
                  <button
                    type="button"
                    onClick={() => setCurrentPage(p)}
                    className={`border px-2 py-0.5 text-[11px] ${
                      p === page
                        ? "border-win-select bg-win-select text-win-white"
                        : "border-win-border bg-win-white text-win-text hover:bg-win-face"
                    }`}
                  >
                    {p}
                  </button>
                </span>
              ))}
              <button
                type="button"
                disabled={page === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="win-btn disabled:cursor-default disabled:opacity-40"
              >
                ▶
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

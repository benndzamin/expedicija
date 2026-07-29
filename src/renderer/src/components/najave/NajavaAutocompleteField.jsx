import { useState } from "react";

export default function NajavaAutocompleteField({
  value,
  onSelect,
  onHoverItem,
  enabled,
  najave,
  najaveLoaded,
  kupci,
  kupciLoaded,
}) {
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(false);

  const term = query.trim().toLowerCase();
  const bothLoaded = najaveLoaded && kupciLoaded;

  const najavaMatches = (
    term ? najave.filter((n) => n.firma?.toLowerCase().includes(term)) : najave
  ).map((n) => ({ ...n, _source: "najava" }));

  // Kupci se prikazuju tek kad korisnik nešto ukuca -- lista kupaca može biti
  // mnogo veća od liste čekajućih najava, pa se ne prikazuje sve na fokus.
  const kupacMatches = term
    ? kupci
        .filter((k) => k.naziv_firme?.toLowerCase().includes(term))
        .map((k) => ({ ...k, _source: "kupac" }))
    : [];

  const filtered = [...najavaMatches, ...kupacMatches];

  const handlePick = (item) => {
    onHoverItem?.(null);
    onSelect(item);
    setEditing(false);
    setQuery("");
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={editing ? query : value}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => {
          if (!enabled) return;
          setEditing(true);
          setQuery("");
        }}
        onBlur={() =>
          window.setTimeout(() => {
            setEditing(false);
            onHoverItem?.(null);
          }, 150)
        }
        disabled={!enabled}
        placeholder={enabled ? "Pretraži kupca/najavu po firmi..." : ""}
        className="win-input w-full disabled:opacity-60"
      />
      {editing && (
        <div className="absolute left-0 right-0 top-[21px] z-50 max-h-48 overflow-auto border border-win-border-dark bg-win-white shadow-md">
          {!bothLoaded ? (
            <div className="px-2 py-1.5 text-[11px] text-win-text">
              Učitavanje...
            </div>
          ) : filtered.length === 0 ? (
            <div className="px-2 py-1.5 text-[11px] text-win-text">
              {term ? "Nema rezultata." : "Nema najava na čekanju."}
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item._source + "-" + item.id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handlePick(item);
                }}
                onMouseEnter={() => onHoverItem?.(item)}
                onMouseLeave={() => onHoverItem?.(null)}
                className="group flex cursor-default items-center justify-between border-b border-win-border px-2 py-1 last:border-b-0 hover:bg-win-select"
              >
                <div>
                  <div className="text-[11px] font-bold text-win-text group-hover:text-win-white">
                    {item._source === "najava" ? item.firma : item.naziv_firme}
                  </div>
                  <div className="text-[10px] text-win-text-dim group-hover:text-win-white">
                    {item._source === "najava"
                      ? item.vrsta_cementa
                      : (item.dozvoljeni_artikli || []).join(", ") || "-"}
                  </div>
                </div>
                <span className="ml-2 shrink-0 text-[9px] uppercase tracking-wide text-win-text-dim group-hover:text-win-white">
                  {item._source === "najava" ? "Najava" : "Kupac"}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

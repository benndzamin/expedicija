import NalogHeaderPanel from "../components/panels/NalogHeaderPanel";
import NavisionPanel from "../components/panels/NavisionPanel";
import KomitentPanel from "../components/panels/KomitentPanel";
import RobaPanel from "../components/panels/RobaPanel";
import NacinTransportaPanel from "../components/panels/NacinTransportaPanel";
import TransportPanel from "../components/panels/TransportPanel";
import KarticaPanel from "../components/panels/KarticaPanel";
import OperaterPanel from "../components/panels/OperaterPanel";

export default function NalogZaOtpremuScreen({
  nalog,
  onOpenNajave,
  onSelectFirmaMatch,
  onHoverFirmaMatch,
  najaveEnabled,
  pendingNajave,
  najaveLoaded,
  kupci,
  kupciLoaded,
  onRobaChange,
  allowedArtikli,
  onFieldChange,
}) {
  return (
    <div className="grid grid-cols-12 gap-1.5 auto-rows-min">
      <div className="col-span-8">
        <NalogHeaderPanel
          nalog={nalog}
          onOpenNajave={onOpenNajave}
          najaveEnabled={najaveEnabled}
          onFieldChange={onFieldChange}
        />
      </div>
      <div className="col-span-4">
        <NavisionPanel nalog={nalog} />
      </div>

      <div className="col-span-12">
        <KomitentPanel
          nalog={nalog}
          onSelectFirmaMatch={onSelectFirmaMatch}
          onHoverFirmaMatch={onHoverFirmaMatch}
          najaveEnabled={najaveEnabled}
          pendingNajave={pendingNajave}
          najaveLoaded={najaveLoaded}
          kupci={kupci}
          kupciLoaded={kupciLoaded}
          onFieldChange={onFieldChange}
        />
      </div>

      <div className="col-span-12">
        <RobaPanel
          nalog={nalog}
          onRobaChange={onRobaChange}
          allowedArtikli={allowedArtikli}
        />
      </div>

      <div className="col-span-4">
        <NacinTransportaPanel nalog={nalog} />
      </div>
      <div className="col-span-4">
        <TransportPanel nalog={nalog} />
      </div>
      <div className="col-span-4">
        <KarticaPanel nalog={nalog} />
      </div>

      <div className="col-span-12">
        <OperaterPanel nalog={nalog} />
      </div>
    </div>
  );
}

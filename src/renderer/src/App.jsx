import { useCallback, useEffect, useState } from "react";
import MenuBar from "./components/chrome/MenuBar";
import ModuleToolbar from "./components/chrome/ModuleToolbar";
import RightSidebar from "./components/chrome/RightSidebar";
import StatusBar from "./components/chrome/StatusBar";
import NalogZaOtpremuScreen from "./screens/NalogZaOtpremuScreen";
import NajaveListModal from "./components/najave/NajaveListModal";
import NajavaConfirmModal from "./components/najave/NajavaConfirmModal";
import Toast from "./components/ui/Toast";
import { bootstrapSession } from "./lib/auth";
import { getNalog } from "./data/nalogRepository";
import { izdajNalogZaNajavu, mapNajavaToNalog } from "./data/najaveRepository";
import { usePendingNajave } from "./data/usePendingNajave";
import { mapKupacToNalog } from "./data/kupciRepository";
import { useKupciBezNajave } from "./data/useKupciBezNajave";
import { formatDatumDanas } from "./lib/date";

const REQUIRED_FIELD_LABELS = {
  vozac: "Vozač",
  registarski_broj: "Registarski broj",
  isporuka_na_osnovu: "Isporuka na osnovu",
};

function loadNalogSaDanasnjimDatumom() {
  return getNalog().then((data) => ({
    ...data,
    datum_naloga: formatDatumDanas(),
    isporuka_na_osnovu: formatDatumDanas(),
  }));
}

export default function App() {
  const [nalog, setNalog] = useState(null);
  const [authStatus, setAuthStatus] = useState("connecting");
  const [authError, setAuthError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const [selectedNajava, setSelectedNajava] = useState(null);
  const [selectedKupac, setSelectedKupac] = useState(null);
  const [najaveModalOpen, setNajaveModalOpen] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [hoverPreviewItem, setHoverPreviewItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const { najave: pendingNajave, loaded: najaveLoaded } = usePendingNajave(
    authStatus === "ready",
  );
  const { kupci, loaded: kupciLoaded } = useKupciBezNajave(
    authStatus === "ready",
  );

  const allowedArtikli =
    selectedKupac?.dozvoljeni_artikli?.length > 1
      ? selectedKupac.dozvoljeni_artikli
      : null;

  const showToast = (type, message) => {
    setToast({ type, message });
    window.setTimeout(() => setToast(null), 3000);
  };

  const connect = useCallback(async () => {
    setAuthStatus("connecting");
    setAuthError(null);
    try {
      const user = await bootstrapSession();
      setCurrentUser(user);
      setAuthStatus("ready");
    } catch (err) {
      setAuthError(err.message);
      setAuthStatus("error");
    }
  }, []);

  useEffect(() => {
    loadNalogSaDanasnjimDatumom().then(setNalog);
    connect();
  }, [connect]);

  if (!nalog) return null;

  const displayNalog = hoverPreviewItem
    ? hoverPreviewItem._source === "najava"
      ? mapNajavaToNalog(nalog, hoverPreviewItem)
      : mapKupacToNalog(nalog, hoverPreviewItem)
    : nalog;

  const handleSelectNajava = (najava) => {
    setNajaveModalOpen(false);
    setConfirmTarget(najava);
  };

  const handleConfirmNajava = (najava) => {
    setNalog((prev) => mapNajavaToNalog(prev, najava));
    setSelectedNajava(najava);
    setSelectedKupac(null);
    setConfirmTarget(null);
  };

  const handleSelectFirmaMatch = (item) => {
    if (item._source === "najava") {
      setNalog((prev) => mapNajavaToNalog(prev, item));
      setSelectedNajava(item);
      setSelectedKupac(null);
    } else {
      setNalog((prev) => mapKupacToNalog(prev, item));
      setSelectedKupac(item);
      setSelectedNajava(null);
    }
    setHoverPreviewItem(null);
  };

  const handleHoverFirmaMatch = (item) => {
    setHoverPreviewItem(item);
  };

  const handleRobaChange = (index, value) => {
    setNalog((prev) => ({
      ...prev,
      stavke: prev.stavke.map((s, i) => (i === index ? { ...s, roba: value } : s)),
    }));
  };

  const handleFieldChange = (field, value) => {
    setNalog((prev) => ({ ...prev, [field]: value }));
  };

  const handleSnimi = async () => {
    if (saving || (!selectedNajava && !selectedKupac)) return;

    const missingFields = Object.keys(REQUIRED_FIELD_LABELS).filter(
      (field) => !nalog[field]?.trim(),
    );
    if (missingFields.length > 0) {
      showToast(
        "error",
        "Popunite polja: " +
          missingFields.map((field) => REQUIRED_FIELD_LABELS[field]).join(", "),
      );
      return;
    }

    setSaving(true);
    try {
      if (selectedNajava) {
        await izdajNalogZaNajavu(selectedNajava, currentUser.id);
      }
      showToast("success", "Nalog uspješno kreiran");
      setSelectedNajava(null);
      setSelectedKupac(null);
      loadNalogSaDanasnjimDatumom().then(setNalog);
    } catch (err) {
      showToast("error", "Greška: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleRefreshNalog = () => {
    setSelectedNajava(null);
    setSelectedKupac(null);
    loadNalogSaDanasnjimDatumom().then(setNalog);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-win-face text-win-text">
      {authStatus === "error" && (
        <div className="flex items-center justify-between border-b border-red-900 bg-win-red px-3 py-1 text-[11px] font-bold text-win-white">
          <span>
            Nije moguće povezati se na server{authError ? ` (${authError})` : ""}
          </span>
          <button
            type="button"
            onClick={connect}
            className="border border-win-white/60 px-2 py-0.5 hover:bg-win-white/20"
          >
            Ponovi
          </button>
        </div>
      )}

      <MenuBar />
      <ModuleToolbar onRefreshNalog={handleRefreshNalog} />
      <div className="flex min-h-0 flex-1">
        <main className="flex-1 overflow-auto p-2">
          <NalogZaOtpremuScreen
            nalog={displayNalog}
            onOpenNajave={() => setNajaveModalOpen(true)}
            onSelectFirmaMatch={handleSelectFirmaMatch}
            onHoverFirmaMatch={handleHoverFirmaMatch}
            najaveEnabled={authStatus === "ready"}
            pendingNajave={pendingNajave}
            najaveLoaded={najaveLoaded}
            kupci={kupci}
            kupciLoaded={kupciLoaded}
            onRobaChange={handleRobaChange}
            allowedArtikli={allowedArtikli}
            onFieldChange={handleFieldChange}
          />
        </main>
        <RightSidebar
          onSnimi={handleSnimi}
          snimiEnabled={
            authStatus === "ready" &&
            (!!selectedNajava || !!selectedKupac) &&
            !saving
          }
          saving={saving}
        />
      </div>
      <StatusBar />

      {najaveModalOpen && (
        <NajaveListModal
          najave={pendingNajave}
          loaded={najaveLoaded}
          onSelect={handleSelectNajava}
          onClose={() => setNajaveModalOpen(false)}
        />
      )}

      {confirmTarget && (
        <NajavaConfirmModal
          najava={confirmTarget}
          onConfirm={handleConfirmNajava}
          onCancel={() => setConfirmTarget(null)}
        />
      )}

      <Toast toast={toast} />
    </div>
  );
}

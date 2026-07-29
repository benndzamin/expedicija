export const MOCK_NALOG = {
  broj_naloga: "26015934",
  datum_naloga: "17.07.2026",
  proknjizen: false,

  preneseno_u_navision: false,
  datum_prenosa_navision: "",

  firma_kupac: "",
  sifra_u_navisionu: "",
  naziv_firme: "",
  adresa_i_mjesto: "",
  registarski_broj_firme: "",
  prekoracen_limit: false,
  broj_okvirnog_ugovora: "",
  kreditni_limit: "",
  isporuka_inostranstvo: false,

  prevoznik: "",
  vozac: "",
  dokument_id: "",
  registarski_broj: "",
  adresa_isporuke: "",
  isporuka_na_osnovu: "",

  stavke: [
    { roba: "", kolicina: [0, 0, 0], palete: 0 },
    { roba: "", kolicina: [0, 0, 0], palete: 0 },
  ],

  vaga_ulaz: 0,
  vaga_izlaz: 0,
  vaga_display: 0,
  kolicina_cem: 0,
  palete_ulaz: 0,
  palete_izlaz: 0,
  folija_broj_paleta: 0,
  vrijeme_ulazno: "",
  vrijeme_izlazno: "",

  nacin_transporta: "V",
  dest_code_1: "",
  dest_code_2: "",
  odobreno: "",
  odobrio: "",

  broj_kartice: "",
  id_kartice: "",
  vrsta_kartice: "",
  datum_otpreme: "",

  operater: "",
  datum_i_vrijeme: "17.07.2026 11:34:34",
};

export const NACIN_TRANSPORTA_OPTIONS = [
  { value: "V", label: "V (Vlastiti prevoz)" },
  { value: "P", label: "P (Privatni prevoz)" },
  { value: "FCL_BULK", label: "FCL Bulk (FCL Rinfuza)" },
  { value: "FCL_SACK", label: "FCL Sack (FCL Vreće)" },
];

export const APP_TITLE =
  "Expedicija, Baza podataka: EXPEDICIJA, Firma: 1, Naziv firme: LUKAVAC CEMENT d.o.o., Radna godina: 2026 - [Nalog expedicije]";

export const MENU_ITEMS = [
  "Registri",
  "Dnevne obrade",
  "Izvještaji",
  "Sistemske opcije",
];

export const TOOLBAR_ITEMS = [
  { key: "kupci", label: "Kupci", icon: "users" },
  { key: "nalog", label: "Nalog za otpremu", icon: "fileText" },
  { key: "kamioni", label: "Kamioni za istovar", icon: "truck" },
];

export const SIDEBAR_NAV = [
  { key: "cement", label: "CEMENT", icon: "folder", selected: true },
  { key: "sirovine", label: "SIROVINE", icon: "folder" },
  { key: "sirovine_rdf", label: "SIROVINE RDF", icon: "folder" },
];

export const SIDEBAR_ACTIONS = [
  { key: "snimi", label: "Snimi", icon: "save" },
  { key: "brisi", label: "Briši", icon: "eraser" },
  { key: "pregled", label: "Pregled", icon: "fileSearch" },
  { key: "stampa", label: "Štampa", icon: "printer" },
  { key: "trazi", label: "Traži", icon: "search" },
];

export const SIDEBAR_LINKS = ["Vage", "DP, istorija", "Storniranje"];

export const FKEY_HINTS = [
  "<F2>-Novi",
  "<F3>-Snimi",
  "<F4>-Briši",
  "<F5>-Pregled",
  "<F6>-Štampa",
  "<F7>-Traži",
  "<F8>-Izlaz",
  "<Ctrl-F2>-Nova ODV",
];

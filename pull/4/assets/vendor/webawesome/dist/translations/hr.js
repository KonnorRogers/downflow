/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import "../chunks/chunk.7VGCIHDG.js";

// src/translations/hr.ts
import { registerTranslation } from "@shoelace-style/localize";
var translation = {
  $code: "hr",
  $name: "Hrvatski",
  $dir: "ltr",
  am: "AM",
  carousel: "Vrtuljak",
  captions: "Titlovi",
  chooseDate: "Odaberi datum",
  chooseTime: "Odaberi vrijeme",
  chooseDecade: "Odaberi desetlje\u0107e",
  chooseMonth: "Odaberi mjesec",
  chooseYear: "Odaberi godinu",
  clearEntry: "O\u010Disti unos",
  createOption: (value) => `Stvori "${value}"`,
  close: "Zatvori",
  closeCalendar: "Zatvori kalendar",
  closeTimeInput: "Zatvori bira\u010D vremena",
  copied: "Kopirano",
  copy: "Kopiraj",
  currentValue: "Trenutna vrijednost",
  date: "Datum",
  datePickerKeyboardHelp: "Strelicama mijenjajte vrijednosti; pritisnite Alt+Strelica dolje za otvaranje kalendara.",
  day: "Dan",
  dayPeriod: "AM/PM",
  decrement: "Smanji",
  dropFileHere: "Drop file here or click to browse",
  dropFilesHere: "Drop files here or click to browse",
  empty: "Prazno",
  error: "Gre\u0161ka",
  enterFullscreen: "U\u0111i u cijeli zaslon",
  endDate: "Datum zavr\u0161etka",
  exitFullscreen: "Iza\u0111i iz cijelog zaslona",
  goToSlide: (slide, count) => `Idi na slajd ${slide} od ${count}`,
  hidePassword: "Sakrij lozinku",
  hour: "Sat",
  incompleteDate: "Unesite valjani datum.",
  increment: "Pove\u0107aj",
  loading: "U\u010Ditavanje",
  minute: "Minuta",
  moreOptions: "Vi\u0161e opcija",
  month: "Mjesec",
  mute: "Uti\u0161aj",
  nextDecade: "Sljede\u0107e desetlje\u0107e",
  nextMonth: "Sljede\u0107i mjesec",
  nextSlide: "Sljede\u0107i slajd",
  nextVideo: "Sljede\u0107i video",
  nextYear: "Sljede\u0107a godina",
  now: "Sada",
  numCharacters: (num) => {
    if (num === 1) return "1 znak";
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `${num} znaka`;
    return `${num} znakova`;
  },
  numCharactersRemaining: (num) => {
    if (num === 1) return "1 preostali znak";
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `${num} preostala znaka`;
    return `${num} preostalih znakova`;
  },
  numOptionsSelected: (num) => {
    if (num === 0) return "Nije odabrana nijedna opcija";
    if (num === 1) return "1 opcija je odabrana";
    return `${num} odabranih opcija`;
  },
  pause: "Pauziraj",
  pauseAnimation: "Pauziraj animaciju",
  pictureInPicture: "Slika u slici",
  pm: "PM",
  play: "Reproduciraj",
  playbackSpeed: "Brzina reprodukcije",
  playlist: "Popis za reprodukciju",
  playAnimation: "Reproduciraj animaciju",
  previousDecade: "Prethodno desetlje\u0107e",
  previousMonth: "Prethodni mjesec",
  previousSlide: "Prethodni slajd",
  previousVideo: "Prethodni video",
  previousYear: "Prethodna godina",
  progress: "Napredak",
  rangeTooLong: (max) => {
    if (max === 1) return "Odaberite raspon ne dulji od 1 dana";
    const mod10 = max % 10;
    const mod100 = max % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Odaberite raspon ne dulji od ${max} dana`;
    return `Odaberite raspon ne dulji od ${max} dana`;
  },
  rangeTooShort: (min) => {
    if (min === 1) return "Odaberite raspon dug najmanje 1 dan";
    const mod10 = min % 10;
    const mod100 = min % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Odaberite raspon dug najmanje ${min} dana`;
    return `Odaberite raspon dug najmanje ${min} dana`;
  },
  readonly: "Samo za \u010Ditanje",
  remove: "Makni",
  resize: "Promijeni veli\u010Dinu",
  scrollableRegion: "Podru\u010Dje s mogu\u0107no\u0161\u0107u pomicanja",
  scrollToEnd: "Skrolaj do kraja",
  scrollToStart: "Skrolaj na po\u010Detak",
  second: "Sekunda",
  selectAColorFromTheScreen: "Odaberi boju sa ekrana",
  selected: "Odabrano",
  selectedDateLabel: (date) => `Odabrano: ${date}`,
  selectedRangeLabel: (range) => `Odabrani raspon: ${range}`,
  selectionCleared: "Odabir poni\u0161ten",
  showPassword: "Poka\u017Ei lozinku",
  slideNum: (slide) => `Slajd ${slide}`,
  startDate: "Datum po\u010Detka",
  time: "Vrijeme",
  timeInputKeyboardHelp: "Strelicama mijenjajte vrijednosti; pritisnite Alt+Strelica dolje za otvaranje bira\u010Da vremena.",
  today: "Danas",
  toggleColorFormat: "Zamijeni format boje",
  seek: "Tra\u017Ei",
  seekProgress: (current, duration) => `${current} od ${duration}`,
  currentlyPlaying: "trenutno se reproducira",
  unmute: "Uklju\u010Di zvuk",
  videoPlayer: "Video player",
  volume: "Glasno\u0107a",
  year: "Godina",
  zoomIn: "Pove\u0107aj",
  zoomOut: "Smanji"
};
registerTranslation(translation);
var hr_default = translation;
export {
  hr_default as default
};

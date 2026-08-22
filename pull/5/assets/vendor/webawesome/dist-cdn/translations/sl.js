/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  registerTranslation
} from "../chunks/chunk.CZ2YL77F.js";
import "../chunks/chunk.JHZRD2LV.js";

// src/translations/sl.ts
var translation = {
  $code: "sl",
  $name: "Slovenski",
  $dir: "ltr",
  am: "AM",
  carousel: "Vrtiljak",
  captions: "Podnapisi",
  chooseDate: "Izberite datum",
  chooseDecade: "Izberite desetletje",
  chooseMonth: "Izberite mesec",
  chooseYear: "Izberite leto",
  chooseTime: "Izberite \u010Das",
  clearEntry: "Po\u010Disti vnos",
  createOption: (value) => `Ustvari "${value}"`,
  close: "Zapri",
  closeCalendar: "Zapri koledar",
  closeTimeInput: "Zapri izbirnik \u010Dasa",
  copied: "Kopirano",
  copy: "Kopiraj",
  currentValue: "Trenutna vrednost",
  date: "Datum",
  dayPeriod: "AM/PM",
  datePickerKeyboardHelp: "S pu\u0161\u010Di\u010Dnimi tipkami spreminjajte vrednosti; pritisnite Alt+Pu\u0161\u010Dica navzdol za odpiranje koledarja.",
  day: "Dan",
  decrement: "Zmanj\u0161aj",
  dropFileHere: "Drop file here or click to browse",
  dropFilesHere: "Drop files here or click to browse",
  empty: "Prazno",
  error: "Napaka",
  enterFullscreen: "Vstopi v celozaslonski na\u010Din",
  endDate: "Kon\u010Dni datum",
  exitFullscreen: "Zapusti celozaslonski na\u010Din",
  goToSlide: (slide, count) => `Pojdi na diapozitiv ${slide} od ${count}`,
  hidePassword: "Skrij geslo",
  hour: "Ura",
  incompleteDate: "Vnesite veljaven datum.",
  increment: "Pove\u010Daj",
  loading: "Nalaganje",
  minute: "Minuta",
  moreOptions: "Ve\u010D mo\u017Enosti",
  month: "Mesec",
  mute: "Uti\u0161aj",
  nextDecade: "Naslednje desetletje",
  nextMonth: "Naslednji mesec",
  nextSlide: "Naslednji diapozitiv",
  nextVideo: "Naslednji videoposnetek",
  nextYear: "Naslednje leto",
  now: "Zdaj",
  numCharacters: (num) => {
    const mod100 = num % 100;
    if (mod100 === 1) return `${num} znak`;
    if (mod100 === 2) return `${num} znaka`;
    if (mod100 === 3 || mod100 === 4) return `${num} znaki`;
    return `${num} znakov`;
  },
  numCharactersRemaining: (num) => {
    const mod100 = num % 100;
    if (mod100 === 1) return `Preostane ${num} znak`;
    if (mod100 === 2) return `Preostaneta ${num} znaka`;
    if (mod100 === 3 || mod100 === 4) return `Preostanejo ${num} znaki`;
    return `Preostane ${num} znakov`;
  },
  numOptionsSelected: (num) => {
    if (num === 0) return "Nobena mo\u017Enost ni izbrana";
    if (num === 1) return "1 mo\u017Enost izbrana";
    if (num === 2) return "2 mo\u017Enosti izbrani";
    if (num === 3 || num === 4) return `${num} mo\u017Enosti izbrane`;
    return `${num} mo\u017Enosti izbranih`;
  },
  pause: "Premor",
  pauseAnimation: "Zaustavi animacijo",
  pictureInPicture: "Slika v sliki",
  play: "Predvajaj",
  playbackSpeed: "Hitrost predvajanja",
  playlist: "Seznam predvajanja",
  playAnimation: "Predvajaj animacijo",
  pm: "PM",
  previousDecade: "Prej\u0161nje desetletje",
  previousMonth: "Prej\u0161nji mesec",
  previousSlide: "Prej\u0161nji diapozitiv",
  previousVideo: "Prej\u0161nji videoposnetek",
  previousYear: "Prej\u0161nje leto",
  progress: "Napredek",
  rangeTooLong: (max) => {
    const mod100 = max % 100;
    if (mod100 === 1) return `Izberite obdobje, ki ni dalj\u0161e od ${max} dneva`;
    if (mod100 === 2) return `Izberite obdobje, ki ni dalj\u0161e od ${max} dni`;
    if (mod100 === 3 || mod100 === 4) return `Izberite obdobje, ki ni dalj\u0161e od ${max} dni`;
    return `Izberite obdobje, ki ni dalj\u0161e od ${max} dni`;
  },
  rangeTooShort: (min) => {
    const mod100 = min % 100;
    if (mod100 === 1) return `Izberite obdobje, dolgo vsaj ${min} dan`;
    if (mod100 === 2) return `Izberite obdobje, dolgo vsaj ${min} dneva`;
    if (mod100 === 3 || mod100 === 4) return `Izberite obdobje, dolgo vsaj ${min} dni`;
    return `Izberite obdobje, dolgo vsaj ${min} dni`;
  },
  readonly: "Samo za branje",
  remove: "Odstrani",
  resize: "Spremeni velikost",
  scrollableRegion: "Podro\u010Dje za drsenje",
  scrollToEnd: "Pomakni se na konec",
  scrollToStart: "Pomakni se na za\u010Detek",
  second: "Sekunda",
  selectAColorFromTheScreen: "Izberite barvo z zaslona",
  selected: "Izbrano",
  selectedDateLabel: (date) => `Izbrano: ${date}`,
  selectedRangeLabel: (range) => `Izbrano obdobje: ${range}`,
  selectionCleared: "Izbira po\u010Di\u0161\u010Dena",
  showPassword: "Prika\u017Ei geslo",
  slideNum: (slide) => `Diapozitiv ${slide}`,
  startDate: "Za\u010Detni datum",
  time: "\u010Cas",
  timeInputKeyboardHelp: "S pu\u0161\u010Di\u010Dnimi tipkami spreminjajte vrednosti; pritisnite Alt+Pu\u0161\u010Dica navzdol za odpiranje izbirnika \u010Dasa.",
  today: "Danes",
  toggleColorFormat: "Preklopi format barve",
  seek: "I\u0161\u010Di",
  seekProgress: (current, duration) => `${current} od ${duration}`,
  currentlyPlaying: "se trenutno predvaja",
  unmute: "Vklopi zvok",
  videoPlayer: "Videopredvajalnik",
  volume: "Glasnost",
  year: "Leto",
  zoomIn: "Pove\u010Daj",
  zoomOut: "Pomanj\u0161aj"
};
registerTranslation(translation);
var sl_default = translation;
export {
  sl_default as default
};

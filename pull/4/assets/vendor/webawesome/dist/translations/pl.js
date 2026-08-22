/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  registerTranslation
} from "../chunks/chunk.CDGKIW7Y.js";
import "../chunks/chunk.HK4J654O.js";
import "../chunks/chunk.7VGCIHDG.js";

// src/translations/pl.ts
var translation = {
  $code: "pl",
  $name: "Polski",
  $dir: "ltr",
  am: "AM",
  carousel: "Karuzela",
  captions: "Napisy",
  chooseDate: "Wybierz dat\u0119",
  chooseDecade: "Wybierz dekad\u0119",
  chooseMonth: "Wybierz miesi\u0105c",
  chooseTime: "Wybierz godzin\u0119",
  chooseYear: "Wybierz rok",
  clearEntry: "Wyczy\u015B\u0107 wpis",
  createOption: (value) => `Utw\xF3rz "${value}"`,
  close: "Zamknij",
  closeCalendar: "Zamknij kalendarz",
  closeTimeInput: "Zamknij selektor godziny",
  copied: "Skopiowane",
  copy: "Kopiuj",
  currentValue: "Aktualna warto\u015B\u0107",
  date: "Data",
  datePickerKeyboardHelp: "U\u017Cyj klawiszy strza\u0142ek, aby zmieni\u0107 warto\u015Bci; naci\u015Bnij Alt+Strza\u0142ka w d\xF3\u0142, aby otworzy\u0107 kalendarz.",
  day: "Dzie\u0144",
  dayPeriod: "AM/PM",
  decrement: "Zmniejsz",
  dropFileHere: "Drop file here or click to browse",
  dropFilesHere: "Drop files here or click to browse",
  empty: "Puste",
  error: "B\u0142\u0105d",
  enterFullscreen: "W\u0142\u0105cz pe\u0142ny ekran",
  endDate: "Data ko\u0144cowa",
  exitFullscreen: "Wy\u0142\u0105cz pe\u0142ny ekran",
  goToSlide: (slide, count) => `Przejd\u017A do slajdu ${slide} z ${count}`,
  hidePassword: "Ukryj has\u0142o",
  hour: "Godzina",
  incompleteDate: "Wprowad\u017A prawid\u0142ow\u0105 dat\u0119.",
  increment: "Zwi\u0119ksz",
  loading: "\u0141adowanie",
  minute: "Minuta",
  moreOptions: "Wi\u0119cej opcji",
  month: "Miesi\u0105c",
  mute: "Wycisz",
  nextDecade: "Nast\u0119pna dekada",
  nextMonth: "Nast\u0119pny miesi\u0105c",
  nextSlide: "Nast\u0119pny slajd",
  nextVideo: "Nast\u0119pny film",
  nextYear: "Nast\u0119pny rok",
  now: "Teraz",
  numCharacters: (num) => {
    if (num === 1) return "1 znak";
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `${num} znaki`;
    return `${num} znak\xF3w`;
  },
  numCharactersRemaining: (num) => {
    if (num === 1) return "Pozosta\u0142 1 znak";
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Pozosta\u0142y ${num} znaki`;
    return `Pozosta\u0142o ${num} znak\xF3w`;
  },
  numOptionsSelected: (num) => {
    if (num === 0) return "Nie wybrano opcji";
    if (num === 1) return "Wybrano 1\xA0opcj\u0119";
    return `Wybrano ${num} opcje`;
  },
  pause: "Wstrzymaj",
  pauseAnimation: "Wstrzymaj animacj\u0119",
  pictureInPicture: "Obraz w obrazie",
  pm: "PM",
  play: "Odtw\xF3rz",
  playbackSpeed: "Pr\u0119dko\u015B\u0107 odtwarzania",
  playlist: "Lista odtwarzania",
  playAnimation: "Odtw\xF3rz animacj\u0119",
  previousDecade: "Poprzednia dekada",
  previousMonth: "Poprzedni miesi\u0105c",
  previousSlide: "Poprzedni slajd",
  previousVideo: "Poprzedni film",
  previousYear: "Poprzedni rok",
  progress: "Post\u0119p",
  rangeTooLong: (max) => {
    if (max === 1) return "Wybierz zakres nie d\u0142u\u017Cszy ni\u017C 1 dzie\u0144";
    const mod10 = max % 10;
    const mod100 = max % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Wybierz zakres nie d\u0142u\u017Cszy ni\u017C ${max} dni`;
    return `Wybierz zakres nie d\u0142u\u017Cszy ni\u017C ${max} dni`;
  },
  rangeTooShort: (min) => {
    if (min === 1) return "Wybierz zakres o d\u0142ugo\u015Bci co najmniej 1 dnia";
    const mod10 = min % 10;
    const mod100 = min % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14))
      return `Wybierz zakres o d\u0142ugo\u015Bci co najmniej ${min} dni`;
    return `Wybierz zakres o d\u0142ugo\u015Bci co najmniej ${min} dni`;
  },
  readonly: "Tylko do odczytu",
  remove: "Usun\u0105\u0107",
  resize: "Zmie\u0144 rozmiar",
  scrollableRegion: "Obszar przewijalny",
  scrollToEnd: "Przewi\u0144 do ko\u0144ca",
  scrollToStart: "Przewi\u0144 do pocz\u0105tku",
  second: "Sekunda",
  selectAColorFromTheScreen: "Pr\xF3bkuj z ekranu",
  selected: "Wybrano",
  selectedDateLabel: (date) => `Wybrano: ${date}`,
  selectedRangeLabel: (range) => `Wybrany zakres: ${range}`,
  selectionCleared: "Wyczyszczono wyb\xF3r",
  showPassword: "Poka\u017C has\u0142o",
  slideNum: (slide) => `Slajd ${slide}`,
  startDate: "Data pocz\u0105tkowa",
  time: "Godzina",
  timeInputKeyboardHelp: "U\u017Cyj klawiszy strza\u0142ek, aby zmieni\u0107 warto\u015Bci; naci\u015Bnij Alt+Strza\u0142ka w d\xF3\u0142, aby otworzy\u0107 selektor godziny.",
  today: "Dzisiaj",
  toggleColorFormat: "Prze\u0142\u0105cz format",
  seek: "Szukaj",
  seekProgress: (current, duration) => `${current} z ${duration}`,
  currentlyPlaying: "aktualnie odtwarzane",
  unmute: "W\u0142\u0105cz d\u017Awi\u0119k",
  videoPlayer: "Odtwarzacz wideo",
  volume: "G\u0142o\u015Bno\u015B\u0107",
  year: "Rok",
  zoomIn: "Powi\u0119ksz",
  zoomOut: "Pomniejsz"
};
registerTranslation(translation);
var pl_default = translation;
export {
  pl_default as default
};

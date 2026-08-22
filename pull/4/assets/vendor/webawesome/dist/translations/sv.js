/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  registerTranslation
} from "../chunks/chunk.CDGKIW7Y.js";
import "../chunks/chunk.HK4J654O.js";
import "../chunks/chunk.7VGCIHDG.js";

// src/translations/sv.ts
var translation = {
  $code: "sv",
  $name: "Svenska",
  $dir: "ltr",
  am: "FM",
  carousel: "Karusell",
  captions: "Undertexter",
  chooseDate: "V\xE4lj datum",
  chooseDecade: "V\xE4lj decennium",
  chooseMonth: "V\xE4lj m\xE5nad",
  chooseYear: "V\xE4lj \xE5r",
  chooseTime: "V\xE4lj tid",
  clearEntry: "\xC5terst\xE4ll val",
  createOption: (value) => `Skapa "${value}"`,
  close: "St\xE4ng",
  closeCalendar: "St\xE4ng kalender",
  closeTimeInput: "St\xE4ng tidsv\xE4ljare",
  copied: "Kopierade",
  copy: "Kopiera",
  currentValue: "Nuvarande v\xE4rde",
  date: "Datum",
  datePickerKeyboardHelp: "Anv\xE4nd piltangenterna f\xF6r att \xE4ndra v\xE4rden; tryck Alt+Pil ned f\xF6r att \xF6ppna kalendern.",
  day: "Dag",
  dayPeriod: "FM/EM",
  decrement: "Minska",
  dropFileHere: "Drop file here or click to browse",
  dropFilesHere: "Drop files here or click to browse",
  empty: "Tom",
  endDate: "Slutdatum",
  error: "Fel",
  enterFullscreen: "G\xE5 till helsk\xE4rm",
  exitFullscreen: "Avsluta helsk\xE4rm",
  goToSlide: (slide, count) => `G\xE5 till bild ${slide} av ${count}`,
  hidePassword: "D\xF6lj l\xF6senord",
  hour: "Timme",
  incompleteDate: "Ange ett giltigt datum.",
  increment: "\xD6ka",
  loading: "L\xE4ser in",
  minute: "Minut",
  month: "M\xE5nad",
  moreOptions: "Fler alternativ",
  mute: "St\xE4ng av ljud",
  nextDecade: "N\xE4sta decennium",
  nextMonth: "N\xE4sta m\xE5nad",
  nextSlide: "N\xE4sta bild",
  nextVideo: "N\xE4sta video",
  nextYear: "N\xE4sta \xE5r",
  now: "Nu",
  numCharacters: (num) => {
    if (num === 1) return "1 tecken";
    return `${num} tecken`;
  },
  numCharactersRemaining: (num) => {
    if (num === 1) return "1 tecken kvar";
    return `${num} tecken kvar`;
  },
  numOptionsSelected: (num) => {
    if (num === 0) return "Inga alternativ har valts";
    if (num === 1) return "1 alternativ valt";
    return `${num} alternativ valda`;
  },
  pause: "Pausa",
  pauseAnimation: "Pausa animation",
  pm: "EM",
  pictureInPicture: "Bild i bild",
  play: "Spela",
  playbackSpeed: "Uppspelningshastighet",
  playlist: "Spellista",
  playAnimation: "Spela upp animation",
  previousDecade: "F\xF6reg\xE5ende decennium",
  previousMonth: "F\xF6reg\xE5ende m\xE5nad",
  previousSlide: "F\xF6reg\xE5ende bild",
  previousVideo: "F\xF6reg\xE5ende video",
  previousYear: "F\xF6reg\xE5ende \xE5r",
  progress: "Framsteg",
  rangeTooLong: (max) => {
    if (max === 1) return "V\xE4lj ett intervall som inte \xE4r l\xE4ngre \xE4n 1 dag";
    return `V\xE4lj ett intervall som inte \xE4r l\xE4ngre \xE4n ${max} dagar`;
  },
  rangeTooShort: (min) => {
    if (min === 1) return "V\xE4lj ett intervall som \xE4r minst 1 dag l\xE5ngt";
    return `V\xE4lj ett intervall som \xE4r minst ${min} dagar l\xE5ngt`;
  },
  readonly: "Skrivskyddad",
  remove: "Ta bort",
  resize: "\xC4ndra storlek",
  scrollableRegion: "Scrollbart omr\xE5de",
  scrollToEnd: "Skrolla till slutet",
  scrollToStart: "Skrolla till b\xF6rjan",
  second: "Sekund",
  selectAColorFromTheScreen: "V\xE4lj en f\xE4rg fr\xE5n sk\xE4rmen",
  selected: "Vald",
  selectedDateLabel: (date) => `Valt: ${date}`,
  selectedRangeLabel: (range) => `Valt intervall: ${range}`,
  selectionCleared: "Valet rensat",
  showPassword: "Visa l\xF6senord",
  slideNum: (slide) => `Bild ${slide}`,
  startDate: "Startdatum",
  time: "Tid",
  timeInputKeyboardHelp: "Anv\xE4nd piltangenterna f\xF6r att \xE4ndra v\xE4rden; tryck Alt+Pil ned f\xF6r att \xF6ppna tidsv\xE4ljaren.",
  today: "Idag",
  toggleColorFormat: "V\xE4xla f\xE4rgformat",
  seek: "S\xF6k",
  seekProgress: (current, duration) => `${current} av ${duration}`,
  currentlyPlaying: "spelas nu",
  unmute: "Sl\xE5 p\xE5 ljud",
  videoPlayer: "Videospelare",
  volume: "Volym",
  year: "\xC5r",
  zoomIn: "Zooma in",
  zoomOut: "Zooma ut"
};
registerTranslation(translation);
var sv_default = translation;
export {
  sv_default as default
};

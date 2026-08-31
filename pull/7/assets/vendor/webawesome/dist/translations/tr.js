/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  registerTranslation
} from "../chunks/chunk.CDGKIW7Y.js";
import "../chunks/chunk.HK4J654O.js";
import "../chunks/chunk.7VGCIHDG.js";

// src/translations/tr.ts
var translation = {
  $code: "tr",
  $name: "T\xFCrk\xE7e",
  $dir: "ltr",
  am: "\xD6\xD6",
  carousel: "Atl\u0131kar\u0131nca",
  captions: "Altyaz\u0131lar",
  chooseDate: "Tarih se\xE7in",
  chooseDecade: "On y\u0131l se\xE7in",
  chooseMonth: "Ay se\xE7in",
  chooseTime: "Saat se\xE7in",
  chooseYear: "Y\u0131l se\xE7in",
  clearEntry: "Giri\u015Fi sil",
  createOption: (value) => `"${value}" olu\u015Ftur`,
  close: "Kapat",
  closeCalendar: "Takvimi kapat",
  closeTimeInput: "Saat se\xE7iciyi kapat",
  copied: "Kopyaland\u0131",
  copy: "Kopya",
  currentValue: "Mevcut de\u011Fer",
  date: "Tarih",
  datePickerKeyboardHelp: "De\u011Ferleri de\u011Fi\u015Ftirmek i\xE7in ok tu\u015Flar\u0131n\u0131 kullan\u0131n; takvimi a\xE7mak i\xE7in Alt+A\u015Fa\u011F\u0131 Ok tu\u015Funa bas\u0131n.",
  day: "G\xFCn",
  dayPeriod: "\xD6\xD6/\xD6S",
  decrement: "Azalt",
  dropFileHere: "Drop file here or click to browse",
  dropFilesHere: "Drop files here or click to browse",
  empty: "Bo\u015F",
  endDate: "Biti\u015F tarihi",
  error: "Hata",
  enterFullscreen: "Tam ekrana gir",
  exitFullscreen: "Tam ekrandan \xE7\u0131k",
  goToSlide: (slide, count) => `${count} slayttan ${slide} slayta gidin`,
  hidePassword: "\u015Eifreyi sakla",
  hour: "Saat",
  incompleteDate: "Ge\xE7erli bir tarih girin.",
  increment: "Art\u0131r",
  loading: "Y\xFCkleme",
  minute: "Dakika",
  moreOptions: "Daha fazla se\xE7enek",
  month: "Ay",
  mute: "Sesi kapat",
  nextDecade: "Sonraki on y\u0131l",
  nextMonth: "Sonraki ay",
  nextSlide: "Sonraki slayt",
  nextVideo: "Sonraki video",
  nextYear: "Sonraki y\u0131l",
  now: "\u015Eimdi",
  numCharacters: (num) => {
    if (num === 1) return "1 karakter";
    return `${num} karakter`;
  },
  numCharactersRemaining: (num) => {
    if (num === 1) return "1 karakter kald\u0131";
    return `${num} karakter kald\u0131`;
  },
  numOptionsSelected: (num) => {
    if (num === 0) return "Hi\xE7bir se\xE7enek se\xE7ilmedi";
    if (num === 1) return "1 se\xE7enek se\xE7ildi";
    return `${num} se\xE7enek se\xE7ildi`;
  },
  pause: "Duraklat",
  pauseAnimation: "Animasyonu duraklat",
  pictureInPicture: "G\xF6r\xFCnt\xFC i\xE7inde g\xF6r\xFCnt\xFC",
  play: "Oynat",
  playbackSpeed: "Oynatma h\u0131z\u0131",
  playlist: "Oynatma listesi",
  playAnimation: "Animasyonu oynat",
  pm: "\xD6S",
  previousDecade: "\xD6nceki on y\u0131l",
  previousMonth: "\xD6nceki ay",
  previousSlide: "Bir onceki slayt",
  previousVideo: "\xD6nceki video",
  previousYear: "\xD6nceki y\u0131l",
  progress: "\u0130lerleme",
  readonly: "Salt okunur",
  rangeTooLong: (max) => {
    if (max === 1) return "1 g\xFCnden uzun olmayan bir aral\u0131k se\xE7in";
    return `${max} g\xFCnden uzun olmayan bir aral\u0131k se\xE7in`;
  },
  rangeTooShort: (min) => {
    if (min === 1) return "En az 1 g\xFCn uzunlu\u011Funda bir aral\u0131k se\xE7in";
    return `En az ${min} g\xFCn uzunlu\u011Funda bir aral\u0131k se\xE7in`;
  },
  remove: "Kald\u0131r",
  resize: "Yeniden boyutland\u0131r",
  scrollableRegion: "Kayd\u0131r\u0131labilir alan",
  scrollToEnd: "Sona kay",
  scrollToStart: "Ba\u015Fa kay",
  second: "Saniye",
  selectAColorFromTheScreen: "Ekrandan bir renk se\xE7in",
  selected: "Se\xE7ildi",
  selectedDateLabel: (date) => `Se\xE7ilen: ${date}`,
  selectedRangeLabel: (range) => `Se\xE7ilen aral\u0131k: ${range}`,
  selectionCleared: "Se\xE7im temizlendi",
  showPassword: "\u015Eifreyi g\xF6ster",
  slideNum: (slide) => `Slayt ${slide}`,
  startDate: "Ba\u015Flang\u0131\xE7 tarihi",
  time: "Saat",
  timeInputKeyboardHelp: "De\u011Ferleri de\u011Fi\u015Ftirmek i\xE7in ok tu\u015Flar\u0131n\u0131 kullan\u0131n; saat se\xE7iciyi a\xE7mak i\xE7in Alt+A\u015Fa\u011F\u0131 Ok tu\u015Funa bas\u0131n.",
  today: "Bug\xFCn",
  toggleColorFormat: "Renk bi\xE7imini de\u011Fi\u015Ftir",
  seek: "Ara",
  seekProgress: (current, duration) => `${current} / ${duration}`,
  currentlyPlaying: "\u015Fu an oynat\u0131l\u0131yor",
  unmute: "Sesi a\xE7",
  videoPlayer: "Video oynat\u0131c\u0131",
  volume: "Ses seviyesi",
  year: "Y\u0131l",
  zoomIn: "Yak\u0131nla\u015Ft\u0131r",
  zoomOut: "Uzakla\u015Ft\u0131r"
};
registerTranslation(translation);
var tr_default = translation;
export {
  tr_default as default
};

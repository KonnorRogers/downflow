/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  registerTranslation
} from "../chunks/chunk.CDGKIW7Y.js";
import "../chunks/chunk.HK4J654O.js";
import "../chunks/chunk.7VGCIHDG.js";

// src/translations/ja.ts
var translation = {
  $code: "ja",
  $name: "\u65E5\u672C\u8A9E",
  $dir: "ltr",
  am: "\u5348\u524D",
  carousel: "\u30AB\u30EB\u30FC\u30BB\u30EB",
  captions: "\u5B57\u5E55",
  chooseDate: "\u65E5\u4ED8\u3092\u9078\u629E",
  chooseTime: "\u6642\u523B\u3092\u9078\u629E",
  chooseDecade: "\u5E74\u4EE3\u3092\u9078\u629E",
  chooseMonth: "\u6708\u3092\u9078\u629E",
  chooseYear: "\u5E74\u3092\u9078\u629E",
  clearEntry: "\u30AF\u30EA\u30A2",
  createOption: (value) => `\u300C${value}\u300D\u3092\u4F5C\u6210`,
  close: "\u9589\u3058\u308B",
  closeCalendar: "\u30AB\u30EC\u30F3\u30C0\u30FC\u3092\u9589\u3058\u308B",
  closeTimeInput: "\u6642\u523B\u9078\u629E\u3092\u9589\u3058\u308B",
  copied: "\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F",
  copy: "\u30B3\u30D4\u30FC",
  currentValue: "\u73FE\u5728\u306E\u5024",
  date: "\u65E5\u4ED8",
  datePickerKeyboardHelp: "\u77E2\u5370\u30AD\u30FC\u3067\u5024\u3092\u5909\u66F4\u3057\u3001Alt+\u4E0B\u77E2\u5370\u30AD\u30FC\u3067\u30AB\u30EC\u30F3\u30C0\u30FC\u3092\u958B\u304D\u307E\u3059\u3002",
  day: "\u65E5",
  dayPeriod: "\u5348\u524D/\u5348\u5F8C",
  decrement: "\u6E1B\u3089\u3059",
  dropFileHere: "Drop file here or click to browse",
  dropFilesHere: "Drop files here or click to browse",
  empty: "\u7A7A",
  endDate: "\u7D42\u4E86\u65E5",
  error: "\u30A8\u30E9\u30FC",
  enterFullscreen: "\u5168\u753B\u9762\u8868\u793A",
  exitFullscreen: "\u5168\u753B\u9762\u8868\u793A\u3092\u7D42\u4E86",
  goToSlide: (slide, count) => `${count} \u679A\u4E2D ${slide} \u679A\u306E\u30B9\u30E9\u30A4\u30C9\u306B\u79FB\u52D5`,
  hidePassword: "\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u96A0\u3059",
  hour: "\u6642",
  incompleteDate: "\u6709\u52B9\u306A\u65E5\u4ED8\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  increment: "\u5897\u3084\u3059",
  loading: "\u8AAD\u307F\u8FBC\u307F\u4E2D",
  minute: "\u5206",
  moreOptions: "\u305D\u306E\u4ED6\u306E\u30AA\u30D7\u30B7\u30E7\u30F3",
  month: "\u6708",
  mute: "\u30DF\u30E5\u30FC\u30C8",
  nextDecade: "\u6B21\u306E\u5E74\u4EE3",
  nextMonth: "\u7FCC\u6708",
  nextSlide: "\u6B21\u306E\u30B9\u30E9\u30A4\u30C9",
  nextVideo: "\u6B21\u306E\u52D5\u753B",
  nextYear: "\u7FCC\u5E74",
  now: "\u73FE\u5728",
  numCharacters: (num) => `${num}\u6587\u5B57`,
  numCharactersRemaining: (num) => `\u6B8B\u308A${num}\u6587\u5B57`,
  numOptionsSelected: (num) => {
    if (num === 0) return "\u9805\u76EE\u304C\u9078\u629E\u3055\u308C\u3066\u3044\u307E\u305B\u3093";
    return `${num} \u500B\u306E\u9805\u76EE\u304C\u9078\u629E\u3055\u308C\u307E\u3057\u305F`;
  },
  pause: "\u4E00\u6642\u505C\u6B62",
  pauseAnimation: "\u30A2\u30CB\u30E1\u30FC\u30B7\u30E7\u30F3\u3092\u4E00\u6642\u505C\u6B62",
  pm: "\u5348\u5F8C",
  pictureInPicture: "\u30D4\u30AF\u30C1\u30E3\u30FC\u30FB\u30A4\u30F3\u30FB\u30D4\u30AF\u30C1\u30E3\u30FC",
  play: "\u518D\u751F",
  playbackSpeed: "\u518D\u751F\u901F\u5EA6",
  playlist: "\u30D7\u30EC\u30A4\u30EA\u30B9\u30C8",
  playAnimation: "\u30A2\u30CB\u30E1\u30FC\u30B7\u30E7\u30F3\u3092\u518D\u751F",
  previousDecade: "\u524D\u306E\u5E74\u4EE3",
  previousMonth: "\u524D\u6708",
  previousSlide: "\u524D\u306E\u30B9\u30E9\u30A4\u30C9",
  previousVideo: "\u524D\u306E\u52D5\u753B",
  previousYear: "\u524D\u5E74",
  progress: "\u9032\u884C",
  rangeTooLong: (max) => {
    if (max === 1) return "1\u65E5\u4EE5\u5185\u306E\u7BC4\u56F2\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044";
    return `${max}\u65E5\u4EE5\u5185\u306E\u7BC4\u56F2\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044`;
  },
  rangeTooShort: (min) => {
    if (min === 1) return "1\u65E5\u4EE5\u4E0A\u306E\u7BC4\u56F2\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044";
    return `${min}\u65E5\u4EE5\u4E0A\u306E\u7BC4\u56F2\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044`;
  },
  readonly: "\u8AAD\u307F\u53D6\u308A\u5C02\u7528",
  remove: "\u524A\u9664",
  resize: "\u30B5\u30A4\u30BA\u5909\u66F4",
  scrollableRegion: "\u30B9\u30AF\u30ED\u30FC\u30EB\u53EF\u80FD\u9818\u57DF",
  scrollToEnd: "\u6700\u5F8C\u306B\u30B9\u30AF\u30ED\u30FC\u30EB\u3059\u308B",
  scrollToStart: "\u6700\u521D\u306B\u30B9\u30AF\u30ED\u30FC\u30EB\u3059\u308B",
  second: "\u79D2",
  selectAColorFromTheScreen: "\u753B\u9762\u304B\u3089\u8272\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044",
  selected: "\u9078\u629E\u6E08\u307F",
  selectedDateLabel: (date) => `\u9078\u629E\u6E08\u307F\uFF1A${date}`,
  selectedRangeLabel: (range) => `\u9078\u629E\u6E08\u307F\u306E\u7BC4\u56F2\uFF1A${range}`,
  selectionCleared: "\u9078\u629E\u3092\u89E3\u9664\u3057\u307E\u3057\u305F",
  showPassword: "\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u8868\u793A",
  slideNum: (slide) => `\u30B9\u30E9\u30A4\u30C9 ${slide}`,
  startDate: "\u958B\u59CB\u65E5",
  time: "\u6642\u523B",
  timeInputKeyboardHelp: "\u77E2\u5370\u30AD\u30FC\u3067\u5024\u3092\u5909\u66F4\u3057\u3001Alt+\u4E0B\u77E2\u5370\u30AD\u30FC\u3067\u6642\u523B\u9078\u629E\u3092\u958B\u304D\u307E\u3059\u3002",
  today: "\u4ECA\u65E5",
  toggleColorFormat: "\u8272\u306E\u30D5\u30A9\u30FC\u30DE\u30C3\u30C8\u3092\u5207\u308A\u66FF\u3048\u308B",
  seek: "\u30B7\u30FC\u30AF",
  seekProgress: (current, duration) => `${current} / ${duration}`,
  currentlyPlaying: "\u518D\u751F\u4E2D",
  unmute: "\u30DF\u30E5\u30FC\u30C8\u89E3\u9664",
  videoPlayer: "\u30D3\u30C7\u30AA\u30D7\u30EC\u30FC\u30E4\u30FC",
  volume: "\u97F3\u91CF",
  year: "\u5E74",
  zoomIn: "\u30BA\u30FC\u30E0\u30A4\u30F3",
  zoomOut: "\u30BA\u30FC\u30E0\u30A2\u30A6\u30C8"
};
registerTranslation(translation);
var ja_default = translation;
export {
  ja_default as default
};

/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import "../chunks/chunk.FA3XZ7H6.js";
import "../chunks/chunk.V7SU5PYA.js";
import {
  registerTranslation
} from "../chunks/chunk.CZ2YL77F.js";
import "../chunks/chunk.JHZRD2LV.js";

// src/translations/zh-tw.ts
var translation = {
  $code: "zh-tw",
  $name: "\u6B63\u9AD4\u4E2D\u6587",
  $dir: "ltr",
  am: "\u4E0A\u5348",
  carousel: "\u5E7B\u71C8\u7247",
  captions: "\u5B57\u5E55",
  chooseDate: "\u9078\u64C7\u65E5\u671F",
  chooseDecade: "\u9078\u64C7\u5E74\u4EE3",
  chooseMonth: "\u9078\u64C7\u6708\u4EFD",
  chooseTime: "\u9078\u64C7\u6642\u9593",
  chooseYear: "\u9078\u64C7\u5E74\u4EFD",
  clearEntry: "\u6E05\u7A7A",
  createOption: (value) => `\u5EFA\u7ACB\u300C${value}\u300D`,
  close: "\u95DC\u9589",
  closeCalendar: "\u95DC\u9589\u65E5\u66C6",
  closeTimeInput: "\u95DC\u9589\u6642\u9593\u9078\u64C7\u5668",
  copied: "\u5DF2\u8907\u88FD",
  copy: "\u8907\u88FD",
  currentValue: "\u7576\u524D\u503C",
  date: "\u65E5\u671F",
  datePickerKeyboardHelp: "\u4F7F\u7528\u65B9\u5411\u9375\u8B8A\u66F4\u6578\u503C\uFF1B\u6309 Alt+\u4E0B\u65B9\u5411\u9375\u958B\u555F\u65E5\u66C6\u3002",
  day: "\u65E5",
  dayPeriod: "\u4E0A\u5348/\u4E0B\u5348",
  decrement: "\u6E1B\u5C11",
  dropFileHere: "Drop file here or click to browse",
  dropFilesHere: "Drop files here or click to browse",
  empty: "\u7A7A",
  endDate: "\u7D50\u675F\u65E5\u671F",
  error: "\u932F\u8AA4",
  enterFullscreen: "\u9032\u5165\u5168\u87A2\u5E55",
  exitFullscreen: "\u9000\u51FA\u5168\u87A2\u5E55",
  goToSlide: (slide, count) => `\u8F49\u5230\u7B2C ${slide} \u5F35\u5E7B\u71C8\u7247\uFF0C\u5171 ${count} \u5F35`,
  hidePassword: "\u96B1\u85CF\u5BC6\u78BC",
  hour: "\u5C0F\u6642",
  incompleteDate: "\u8ACB\u8F38\u5165\u6709\u6548\u7684\u65E5\u671F\u3002",
  increment: "\u589E\u52A0",
  loading: "\u8F09\u5165\u4E2D",
  minute: "\u5206\u9418",
  moreOptions: "\u66F4\u591A\u9078\u9805",
  month: "\u6708",
  mute: "\u975C\u97F3",
  nextDecade: "\u4E0B\u4E00\u500B\u5E74\u4EE3",
  nextMonth: "\u4E0B\u500B\u6708",
  nextSlide: "\u4E0B\u4E00\u5F35\u5E7B\u71C8\u7247",
  nextVideo: "\u4E0B\u4E00\u500B\u5F71\u7247",
  nextYear: "\u4E0B\u4E00\u5E74",
  now: "\u73FE\u5728",
  numCharacters: (num) => `${num}\u500B\u5B57\u5143`,
  numCharactersRemaining: (num) => `\u5269\u9918${num}\u500B\u5B57\u5143`,
  numOptionsSelected: (num) => {
    if (num === 0) return "\u672A\u9078\u64C7\u4EFB\u4F55\u9805\u76EE";
    if (num === 1) return "\u5DF2\u9078\u64C7 1 \u500B\u9805\u76EE";
    return `${num} \u9078\u64C7\u9805\u76EE`;
  },
  pause: "\u66AB\u505C",
  pauseAnimation: "\u66AB\u505C\u52D5\u756B",
  pictureInPicture: "\u5B50\u6BCD\u756B\u9762",
  play: "\u64AD\u653E",
  playbackSpeed: "\u64AD\u653E\u901F\u5EA6",
  playlist: "\u64AD\u653E\u6E05\u55AE",
  playAnimation: "\u64AD\u653E\u52D5\u756B",
  pm: "\u4E0B\u5348",
  previousDecade: "\u4E0A\u4E00\u500B\u5E74\u4EE3",
  previousMonth: "\u4E0A\u500B\u6708",
  previousSlide: "\u4E0A\u4E00\u5F35\u5E7B\u71C8\u7247",
  previousVideo: "\u4E0A\u4E00\u500B\u5F71\u7247",
  previousYear: "\u4E0A\u4E00\u5E74",
  progress: "\u9032\u5EA6",
  rangeTooLong: (max) => {
    if (max === 1) return "\u8ACB\u9078\u64C7\u4E0D\u8D85\u904E 1 \u5929\u7684\u7BC4\u570D";
    return `\u8ACB\u9078\u64C7\u4E0D\u8D85\u904E ${max} \u5929\u7684\u7BC4\u570D`;
  },
  rangeTooShort: (min) => {
    if (min === 1) return "\u8ACB\u9078\u64C7\u81F3\u5C11 1 \u5929\u7684\u7BC4\u570D";
    return `\u8ACB\u9078\u64C7\u81F3\u5C11 ${min} \u5929\u7684\u7BC4\u570D`;
  },
  readonly: "\u552F\u8B80",
  remove: "\u79FB\u9664",
  resize: "\u8ABF\u6574\u5927\u5C0F",
  scrollableRegion: "\u53EF\u6372\u52D5\u533A\u57DF",
  scrollToEnd: "\u6372\u81F3\u9801\u5C3E",
  scrollToStart: "\u6372\u81F3\u9801\u9996",
  second: "\u79D2",
  selectAColorFromTheScreen: "\u5F9E\u87A2\u5E55\u4E2D\u9078\u64C7\u4E00\u7A2E\u984F\u8272",
  selected: "\u5DF2\u9078\u64C7",
  selectedDateLabel: (date) => `\u5DF2\u9078\u64C7\uFF1A${date}`,
  selectedRangeLabel: (range) => `\u5DF2\u9078\u64C7\u7BC4\u570D\uFF1A${range}`,
  selectionCleared: "\u5DF2\u6E05\u9664\u9078\u64C7",
  showPassword: "\u986F\u793A\u5BC6\u78BC",
  slideNum: (slide) => `\u5E7B\u71C8\u7247 ${slide}`,
  startDate: "\u958B\u59CB\u65E5\u671F",
  time: "\u6642\u9593",
  timeInputKeyboardHelp: "\u4F7F\u7528\u65B9\u5411\u9375\u8B8A\u66F4\u6578\u503C\uFF1B\u6309 Alt+\u4E0B\u65B9\u5411\u9375\u958B\u555F\u6642\u9593\u9078\u64C7\u5668\u3002",
  today: "\u4ECA\u5929",
  toggleColorFormat: "\u5207\u63DB\u984F\u8272\u683C\u5F0F",
  seek: "\u8DF3\u8F49",
  seekProgress: (current, duration) => `${current} / ${duration}`,
  currentlyPlaying: "\u6B63\u5728\u64AD\u653E",
  unmute: "\u53D6\u6D88\u975C\u97F3",
  videoPlayer: "\u5F71\u7247\u64AD\u653E\u5668",
  volume: "\u97F3\u91CF",
  year: "\u5E74",
  zoomIn: "\u653E\u5927",
  zoomOut: "\u7E2E\u5C0F"
};
registerTranslation(translation);
var zh_tw_default = translation;
export {
  zh_tw_default as default
};

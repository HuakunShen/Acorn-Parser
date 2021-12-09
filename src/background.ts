import { Semester, AcademicHistory } from './core/lib';
import { log, warn, error } from './core/utils';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ history: null, parsed: false }, () => {});
});

chrome.runtime.onMessage.addListener(function (message, sender, reply) {
  switch (message.action) {
    case 'log':
      console.log(message.message);
      break;
    default:
      console.error('unhandled message type');
      console.error(message.message);
  }
});

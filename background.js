chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ course_table: [], parsed: false }, () => {});
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

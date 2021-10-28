chrome.runtime.onInstalled.addListener(() => {
  console.log('hello from background');
  chrome.storage.sync.set({ course_table: [] }, () => {
    console.log('course_table set');
  });
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

chrome.webRequest.onCompleted.addListener(
  function (details) {
    console.log(details);
    console.log('on completed request bg');
    // return { cancel: true };
  },
  { urls: ['https://acorn.utoronto.ca/sws/rest/history/academic/complete'] },
  ['responseHeaders']
);

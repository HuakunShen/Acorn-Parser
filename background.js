chrome.runtime.onInstalled.addListener(() => {
  console.log('hello from background');
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

const log = (message) => {
  chrome.runtime.sendMessage({
    action: 'log',
    message: message,
  });
};

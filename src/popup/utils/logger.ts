export const log = (message: any) => {
  chrome.runtime.sendMessage({ action: 'log', message: message });
};

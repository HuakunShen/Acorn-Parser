export const log = (message: string) => {
  chrome.runtime.sendMessage({ action: 'log', message: message });
};

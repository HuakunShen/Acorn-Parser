import { log, warn } from '../../core/utils';
import { ParseTableResponse, ErrorType } from '../../core/types';
import { AcademicHistory } from '../../core/lib';
import { academicPageUrl, optionsURL } from '../../core/constants';

export const chromeExists = (): boolean => {
  return chrome != undefined && chrome.tabs != undefined && chrome.storage != undefined;
};

/**
 * execute parse, the result will be saved to chrome storage (only if in chrome ext mode)
 */
export const executeParse = (callback: () => void) => {
  if (!chromeExists()) {
    warn('Chrome Not Available, cannot parse page');
  } else {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, 'parse', (res: ParseTableResponse) => {
        const academicHistory = new AcademicHistory(res.data.semesters);
        chrome.storage.local.set({ history: academicHistory, parsed: true }, () => {
          const error = chrome.runtime.lastError;
          if (error) alert(error);
          callback();
        });
      });
    });
  }
};

export const newTab = (url: string): void => {
  if (!chromeExists()) console.warn('Chrome Not Available, Cannot Create New Tab');
  chrome?.tabs?.create({ url });
};

export const toToOptions = (): void => {
  newTab(optionsURL);
};

export const updateTabUrl = (url: string): void => {
  if (!chromeExists()) console.warn('Chrome Not Available, Cannot Change Tag URL');
  chrome?.tabs?.update(undefined, { url });
};

export const getCurrentTabURL = () => {
  return new Promise<string>((resolve, reject) => {
    if (!chromeExists()) {
      const message = 'Chrome Not Available, Cannot Get Current URL';
      reject({ message } as ErrorType);
    } else {
      chrome?.tabs?.query({ currentWindow: true, active: true }, function (tabs) {
        resolve(tabs[0].url);
      });
    }
  });
};

export const checkOnAcademicHistory = (callback: (bool) => void) => {
  if (!chromeExists()) {
    warn('Chrome Not Available, Cannot Check if you are on Academic History Page');
    callback(false);
  } else {
    chrome?.tabs?.query({ currentWindow: true, active: true }, (tabs) => {
      callback(tabs[0].url === academicPageUrl);
    });
  }
};

export const checkOnCompleteAcademicHistory = (callback: (bool) => void) => {
  if (!chromeExists()) {
    warn('Chrome Not Available, Cannot Check if you are on Complete Academic History Page');
    callback(false);
  } else {
    checkOnAcademicHistory((res: boolean) => {
      if (!res) {
        callback(false);
      } else {
        chrome?.tabs?.query({ currentWindow: true, active: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, 'check_if_in_complete', (result: boolean) => {
            callback(result);
          });
        });
      }
    });
  }
};

export const clickCompleteHistory = (callback?: (bool) => void) => {
  if (!chromeExists()) {
    warn('Chrome Not Available, cannot click complete history button');
    callback(false);
  } else {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, 'click_complete', () => {
        callback(true);
      });
    });
  }
};

export const clearChromeStorage = (callback?: (bool) => void) => {
  if (!chromeExists()) {
    warn('Chrome Not Available, cannot clear chrome storage');
    callback(false);
  } else {
    chrome?.storage?.local?.set({ history: null, parsed: false }, () => {
      callback(true);
    });
  }
};

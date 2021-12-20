import { log, warn } from '@/core/utils';
import { ParseTableResponse, ErrorType } from '@/core/types';
import { AcademicHistory } from '@/core/lib';
import { academicPageUrl, optionsURL } from '@/core/constants';

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
      chrome.tabs.sendMessage(tabs[0].id as number, 'parse', (res: ParseTableResponse) => {
        const academicHistory = new AcademicHistory((res.data as AcademicHistory)?.semesters);
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
  chrome.tabs.getCurrent(function (tab) {
    tab && tab.id && chrome.tabs.update(tab.id, { url });
  });
};

export const getCurrentTabURL = () => {
  return new Promise<string>((resolve, reject) => {
    if (!chromeExists()) {
      const message = 'Chrome Not Available, Cannot Get Current URL';
      reject({ message } as ErrorType);
    } else {
      chrome?.tabs?.query({ currentWindow: true, active: true }, function (tabs) {
        resolve(tabs[0].url as string);
      });
    }
  });
};

export const checkOnAcademicHistory = (callback: (isAcademicHistory: boolean) => void) => {
  if (!chromeExists()) {
    warn('Chrome Not Available, Cannot Check if you are on Academic History Page');
    callback(false);
  } else {
    chrome?.tabs?.query({ currentWindow: true, active: true }, (tabs) => {
      callback(tabs[0].url === academicPageUrl);
    });
  }
};

export const checkOnCompleteAcademicHistory = (callback: (isOnComplete: boolean) => void) => {
  if (!chromeExists()) {
    warn('Chrome Not Available, Cannot Check if you are on Complete Academic History Page');
    callback(false);
  } else {
    checkOnAcademicHistory((res: boolean) => {
      if (!res) {
        callback(false);
      } else {
        chrome?.tabs?.query({ currentWindow: true, active: true }, (tabs) => {
          chrome.tabs.sendMessage(
            tabs[0].id as number,
            'check_if_in_complete',
            (result: boolean) => {
              callback(result);
            }
          );
        });
      }
    });
  }
};

export const clickCompleteHistory = (callback?: (success: boolean) => void) => {
  if (!chromeExists()) {
    warn('Chrome Not Available, cannot click complete history button');
    if (callback) callback(false);
  } else {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id as number, 'click_complete', () => {
        if (callback) callback(true);
      });
    });
  }
};

export const clearChromeStorage = (callback?: (success: boolean) => void) => {
  if (!chromeExists()) {
    warn('Chrome Not Available, cannot clear chrome storage');
    if (callback) callback(false);
  } else {
    chrome?.storage?.local?.set({ history: null, parsed: false }, () => {
      if (callback) callback(true);
    });
  }
};

export const chromeDownload = (
  url: string,
  filename: string,
  conflictAction: chrome.downloads.FilenameConflictAction = 'overwrite',
  saveAs: boolean
): void => {
  chrome?.downloads?.download({
    url,
    filename,
    conflictAction,
    saveAs,
  });
};

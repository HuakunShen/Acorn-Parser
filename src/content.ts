import { getColumnHeaderInfo, sessionTableStr2Obj } from './core/utils';
import { ParseTableResponse } from './core/types';
import { Semester, AcademicHistory } from './core/lib';

const isInCompleteHistory = () => {
  const isCompleteHistory =
    document.getElementsByClassName('history-academic-complete').length === 1;
  const isRecentHistory = document.getElementsByClassName('academic-history-recent').length === 1;
  return isCompleteHistory;
};

const goToCompleteHistory = () => {
  const isCompleteHistory =
    document.getElementsByClassName('history-academic-complete').length === 1;
  const isRecentHistory = document.getElementsByClassName('academic-history-recent').length === 1;
  if (isRecentHistory && !isCompleteHistory) {
    let ele: HTMLElement | null = document.querySelector('[data-ng-click="$ctrl.getComplete()"');
    if (ele) ele.click();
  }
};

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  switch (req) {
    case 'parse':
      const res = parseTables();
      sendResponse(res);
      break;
    case 'click_complete':
      goToCompleteHistory();
      sendResponse();
      break;
    case 'check_if_in_complete':
      sendResponse(isInCompleteHistory());
      break;
    default:
  }
});

const parseTables = (): ParseTableResponse => {
  const isRecentHistory = document.getElementsByClassName('academic-history-recent').length === 1;
  const isCompleteHistory =
    document.getElementsByClassName('history-academic-complete').length === 1;
  if (isRecentHistory || !isCompleteHistory) {
    return {
      success: false,
      message: 'This is not complete history, I parse only complete academic history.',
      data: null,
    };
  }
  const tables = document.querySelectorAll('.courses.blok.pre-elem');
  const semesters: Semester[] = [];
  Array.from(tables).map((table) => {
    let prevEle = table.previousElementSibling;
    let gpaStr, coursesHdrStr;
    let limit = 0;
    while (prevEle && !prevEle.classList.contains('sessionHeader') && limit < 5) {
      if (prevEle.classList.contains('gpa-listing')) {
        gpaStr = prevEle.textContent;
      } else if (prevEle.classList.contains('coursesHeader')) {
        coursesHdrStr = prevEle.textContent;
      }
      prevEle = prevEle.previousElementSibling;
      if (limit === 5) alert('loop limit exceeded');
      limit += 1; // prevent infinite loop just in case, there should not be infinite loop
    }
    const sessionHdrStr = prevEle ? prevEle.textContent : null;
    if (coursesHdrStr && table.textContent) {
      const colHeaderInfo = getColumnHeaderInfo(coursesHdrStr);
      const sessionObj: Semester = sessionTableStr2Obj(
        table.textContent,
        sessionHdrStr,
        gpaStr ? gpaStr : null,
        colHeaderInfo
      );
      semesters.push(sessionObj);
    }
  });
  return {
    success: true,
    message: 'parsed',
    data: new AcademicHistory(semesters),
  };
};

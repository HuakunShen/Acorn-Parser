import { log, getColumnHeaderInfo, sessionTableStr2Obj } from './core/utils';
// import { sampleTables, sampleGpaStr, sampleSessionStr, sampleHeaderStr } from './core/sample_data';
import { Semester, AcademicHistory } from './core/lib';
const is_in_complete_history = () => {
  const is_complete_history = $('.history-academic-complete').length === 1;
  const is_recent_history = $('.academic-history-recent').length === 1;
  return is_complete_history;
};

const go_to_complete_history = () => {
  const is_complete_history = $('.history-academic-complete').length === 1;
  console.log(is_complete_history);
  const is_recent_history = $('.academic-history-recent').length === 1;
  console.log(is_recent_history);
  if (is_recent_history && !is_complete_history) {
    let ele: HTMLElement | null = document.querySelector('[data-ng-click="$ctrl.getComplete()"');
    ele?.click();
  }
};

log('content.ts');
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  switch (req) {
    case 'parse':
      const res = parse_tables();
      console.log(res);
      sendResponse(res);
      break;
    case 'click_complete':
      go_to_complete_history();
      sendResponse();
      break;
    case 'check_if_in_complete':
      sendResponse(is_in_complete_history());
      break;
    default:
  }
});

type tableResponse = {
  success: boolean;
  message: string;
  data: AcademicHistory | null;
};

const parse_tables = (): tableResponse => {
  const is_recent_history = $('.academic-history-recent').length === 1;
  const is_complete_history = $('.history-academic-complete').length === 1;

  if (is_recent_history) {
    const tables = $('[data-ng-repeat="session in $ctrl.data.academicData"]');
    return {
      success: false,
      message: 'This is recent academic history, I parse only complete academic history.',
      data: null,
    };
  } else if (is_complete_history) {
    const tables: NodeListOf<HTMLElement> =
      document.querySelectorAll<HTMLElement>('.courses.blok.pre-elem');
    const semesters: Semester[] = [];
    tables.forEach((table, idx) => {
      const tableHdr = table?.previousElementSibling as HTMLElement;
      const tableHdrStr = tableHdr.innerText;
      // TODO: sessions not finished may not have this line. Fix this case
      const sessionGPA = table?.previousElementSibling?.previousElementSibling as HTMLElement;
      const sessionGPAStr =
        sessionGPA.className == 'emph gpa-listing pre-elem' ? sessionGPA.innerText : null;
      // TODO: sessions not finished may not have this line. Fix this case
      const session: HTMLElement = sessionGPA?.previousElementSibling as HTMLElement;
      const sessionStr = session.innerText;
      const tableStr = table.innerText;
      const colHeaderInfo = getColumnHeaderInfo(tableHdrStr);
      const sessionObj: Semester = sessionTableStr2Obj(
        tableStr,
        sessionStr,
        sessionGPAStr,
        colHeaderInfo
      );
      semesters.push(sessionObj);
    });

    return {
      success: true,
      message: 'parsed',
      data: new AcademicHistory(semesters),
    };
  } else {
    return {
      success: false,
      message: 'No Academic History Found, please go to the correct web page and click parse.',
      data: null,
    };
  }
};

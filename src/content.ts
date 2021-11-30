import {
  log,
  getColumnHeaderInfo,
  sessionTableStr2Obj,
  warn,
} from './core/utils';
import {
  sampleTables,
  sampleGpaStr,
  sampleSessionStr,
  sampleHeaderStr,
} from './core/sample_data';

const colHeaderInfo = getColumnHeaderInfo(sampleHeaderStr);
log(
  sessionTableStr2Obj(
    sampleTables[1],
    sampleSessionStr,
    sampleGpaStr,
    colHeaderInfo
  )
);

export const main = () => {
  console.log('main');
};

warn('warning from content.ts');

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  switch (req) {
    case 'parse':
      console.warn('parse');
      console.log('parse');
      sendResponse();
      // const res = parse_tables();
      // sendResponse(res);
      break;
    case 'click_complete':
      // go_to_complete_history();
      break;
    case 'check_if_in_complete':
      // sendResponse(is_in_complete_history());
      break;
    default:
  }
});

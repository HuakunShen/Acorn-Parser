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

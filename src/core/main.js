import { log, getColumnHeaderInfo, sessionTableStr2Obj } from './utils';
import { sampleTables, sampleGpaStr, sampleSessionStr, sampleHeaderStr, } from './sample_data';
const colHeaderInfo = getColumnHeaderInfo(sampleHeaderStr);
log(sessionTableStr2Obj(sampleTables[1], sampleSessionStr, sampleGpaStr, colHeaderInfo));
export const main = () => {
    console.log('main');
};
//# sourceMappingURL=main.js.map
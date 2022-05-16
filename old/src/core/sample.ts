import { sampleTables, sampleGpaStr, sampleSessionStr, sampleHeaderStr } from './sample_data';
import { sessionTableStr2Obj, getColumnHeaderInfo } from './utils';
import { AcademicHistory } from './lib';
export const getSampleData = () => {
  const colHeaderInfo = getColumnHeaderInfo(sampleHeaderStr);
  const sessionTables = sampleTables.map((tableStr) =>
    sessionTableStr2Obj(tableStr, sampleSessionStr, sampleGpaStr, colHeaderInfo)
  );
  return new AcademicHistory(sessionTables);
};

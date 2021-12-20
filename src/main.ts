import { log, getColumnHeaderInfo, sessionTableStr2Obj } from "./core/utils";
import {
  sampleTables,
  sampleGpaStr,
  sampleSessionStr,
  sampleHeaderStr,
} from "./core/sample_data";
import { AcademicHistory, Semester, Course } from "./core/lib";
const colHeaderInfo = getColumnHeaderInfo(sampleHeaderStr);
const sessionTables = sampleTables.map((tableStr) =>
  sessionTableStr2Obj(tableStr, sampleSessionStr, sampleGpaStr, colHeaderInfo)
);
// log(sessionTables[0]);
const ah = new AcademicHistory(sessionTables);
const jsonStr = JSON.stringify(ah, null, 4);
// log(ah);

// save to fs
// fs.writeFileSync(path.resolve("history.json"), jsonStr);

let rawdata = jsonStr;
// load from fs
// let rawdata = fs.readFileSync('history.json');

const newAH = AcademicHistory.loadFromJson(rawdata);
log(newAH);

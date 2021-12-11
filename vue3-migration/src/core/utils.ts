import {
  Courses,
  ColHeaderInfo,
  Letter2NumGpaMap,
  Num2LetterGpaMap,
} from './types';
import { Course, Semester } from './lib';

export const log = console.log,
  error = console.error,
  warn = console.warn;

export const calCoursesWeightSum = (courses: Courses): number => {
  return courses
    .map((course: Course) => course.weight)
    .reduce((a: number, b: number) => a + b, 0);
};

export const calWeightedCoursesGPASum = (courses: Courses): number => {
  return courses
    .map((course: Course) => course.weight * course.numberGrade)
    .reduce((a: number, b: number) => a + b, 0);
};

export const calWeightedCoursesMarkSum = (courses: Courses): number => {
  return courses
    .map((course: Course) => course.weight * course.mark)
    .reduce((a: number, b: number) => a + b, 0);
};

export const calAvgCoursesWeightedMark = (courses: Courses): number => {
  const totalWeight: number = calCoursesWeightSum(courses);
  const weightedMarkSum: number = calWeightedCoursesMarkSum(courses);
  return weightedMarkSum / totalWeight;
};

export const calAvgCoursesWeightedGPA = (courses: Courses): number => {
  const totalWeight: number = calCoursesWeightSum(courses);
  const weightedGPASum: number = calWeightedCoursesGPASum(courses);
  return weightedGPASum / totalWeight;
};
/**
 * Dictionary mapping Letter grade to GPA in number, out of 4.0
 */
export const letter2numberGpaMap: Letter2NumGpaMap = {
  'A+': 4.0,
  A: 4.0,
  'A-': 3.7,
  'B+': 3.3,
  B: 3.0,
  'B-': 2.7,
  'C+': 2.3,
  C: 2.0,
  'C-': 1.7,
  'D+': 1.3,
  D: 1.0,
  'D-': 0.7,
  F: 0.0,
};

/**
 * Dictionary mapping number GPA out of 4.0 to letter grade
 * Reverse letter2numberGpaMap dictionary.
 */
export const number2letterGpaMap: Num2LetterGpaMap = Object.fromEntries(
  Object.entries(letter2numberGpaMap).map((a: [string, number]) => a.reverse())
);

export const getColumnHeaderInfo = (headerStr: string): ColHeaderInfo => {
  const colNames = headerStr
    .split('  ')
    .map((col: string) => col.trim())
    .filter((col: string) => col.length != 0);
  const colIndices = colNames.map((col: string) => headerStr.indexOf(col));
  colIndices.push(headerStr.length);
  return { colNames, colIndices };
};

/**
 * sample rowStr: [ 'MAT223H1', 'Linear Algebra I', '0.50', '87', 'A', 'C+', '' ]
 * @param rowStr: array of string to represent a single course
 */
export const courseRowStr2CourseObj = (rowStr: string[]) => {
  const courseObj = new Course(
    rowStr[0],
    rowStr[1],
    parseFloat(rowStr[2]),
    parseFloat(rowStr[3]),
    letter2numberGpaMap[rowStr[4]],
    letter2numberGpaMap[rowStr[5]],
    rowStr[6],
    rowStr[4] !== 'IPR'
  );
  console.log(courseObj);
  return courseObj;
};

export const sessionTableStr2Obj = (
  table_str: string,
  sessionStr: string | null,
  gpaStr: string | null,
  colHeaderInfo: ColHeaderInfo
): Semester => {
  const tableRows: string[] = table_str.split('\n'); // split table string
  const { colIndices } = colHeaderInfo;
  // Column 2, title, can have multiple lines, need to merge the lines into a single line
  const validRowIdx: Array<number> = [];
  tableRows.forEach((row, index) => {
    const first_col = row.substring(colIndices[0], colIndices[1]);
    if (first_col.trim().length !== 0) {
      validRowIdx.push(index);
    }
  });
  // row_list should contain a 2D array of strings, each cell is a cell of the table, multiline not merged yet
  let rowList: string[][] = [];
  for (const row of tableRows) {
    const col_list: string[] = [];
    for (let i = 1; i < colIndices.length; i++) {
      const val = row.substring(colIndices[i - 1], colIndices[i]).trim();
      col_list.push(val);
    }
    rowList.push(col_list);
  }

  let prevValidRow = 0;

  for (const validIdx of validRowIdx) {
    if (validIdx > 1 + prevValidRow) {
      for (let i = prevValidRow + 1; i < validIdx; i++) {
        // iterate columns
        const colList = rowList[i];
        for (const [col_idx, col_content] of colList.entries()) {
          rowList[prevValidRow][col_idx] += ` ${col_content}`;
        }
      }
    }
    prevValidRow = validIdx;
  }
  rowList = validRowIdx.map((idx: number) => rowList[idx]);

  // multiline handled (merged)
  // try to parse extra column, there may be EXT option
  const newRowList: string[][] = [];
  for (const col_list of rowList) {
    const newColList = col_list.splice(0, col_list.length - 1);
    const lastCol = col_list[col_list.length - 1];
    const colSplit = lastCol.split('  ');
    let [grade, opt] = [lastCol, ''];
    if (colSplit.length != 1) {
      [grade, opt] = colSplit;
      grade = grade.trim();
      opt = opt.trim();
    }
    newColList.push(grade);
    newColList.push(opt);
    newRowList.push(newColList);
  }

  // sample rowStr: [ 'MAT223H1', 'Linear Algebra I', '0.50', '87', 'A', 'C+', '' ]
  const courses: Course[] = newRowList.map(
    (rowStr: string[]) =>
      new Course(
        rowStr[0],
        rowStr[1],
        parseFloat(rowStr[2]),
        parseFloat(rowStr[3]),
        letter2numberGpaMap[rowStr[4]],
        letter2numberGpaMap[rowStr[5]],
        rowStr[6],
        rowStr[3] !== '' &&
          rowStr[4] !== 'IPR' &&
          letter2numberGpaMap[rowStr[4]] !== undefined
      )
  );
  return new Semester(
    courses,
    sessionStr === null ? '' : sessionStr,
    gpaStr === null ? '' : gpaStr
  );
};

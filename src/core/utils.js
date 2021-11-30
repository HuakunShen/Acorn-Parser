import { Course, Semester } from './lib';
export const log = console.log, error = console.error, warn = console.warn;
export const calCoursesWeightSum = (courses) => {
    return courses
        .map((course) => course.weight)
        .reduce((a, b) => a + b, 0);
};
export const calWeightedCoursesGPASum = (courses) => {
    return courses
        .map((course) => course.weight * course.numberGrade)
        .reduce((a, b) => a + b, 0);
};
export const calWeightedCoursesMarkSum = (courses) => {
    return courses
        .map((course) => course.weight * course.mark)
        .reduce((a, b) => a + b, 0);
};
export const calAvgCoursesWeightedMark = (courses) => {
    const totalWeight = calCoursesWeightSum(courses);
    const weightedMarkSum = calWeightedCoursesMarkSum(courses);
    return weightedMarkSum / totalWeight;
};
export const calAvgCoursesWeightedGPA = (courses) => {
    const totalWeight = calCoursesWeightSum(courses);
    const weightedGPASum = calWeightedCoursesGPASum(courses);
    return weightedGPASum / totalWeight;
};
/**
 * Dictionary mapping Letter grade to GPA in number, out of 4.0
 */
export const letter2numberGpaMap = {
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
export const number2letterGpaMap = Object.fromEntries(Object.entries(letter2numberGpaMap).map((a) => a.reverse()));
export const getColumnHeaderInfo = (headerStr) => {
    const colNames = headerStr
        .split('  ')
        .map((col) => col.trim())
        .filter((col) => col.length != 0);
    const colIndices = colNames.map((col) => headerStr.indexOf(col));
    colIndices.push(headerStr.length);
    return { colNames, colIndices };
};
/**
 * sample rowStr: [ 'MAT223H1', 'Linear Algebra I', '0.50', '87', 'A', 'C+', '' ]
 * @param rowStr: array of string to represent a single course
 */
export const courseRowStr2CourseObj = (rowStr) => {
    const courseObj = new Course(rowStr[0], rowStr[1], parseFloat(rowStr[2]), parseFloat(rowStr[3]), letter2numberGpaMap[rowStr[4]], letter2numberGpaMap[rowStr[5]], rowStr[6], false);
    return courseObj;
};
export const sessionTableStr2Obj = (table_str, sessionStr, gpaStr, colHeaderInfo) => {
    const tableRows = table_str.split('\n'); // split table string
    const { colIndices } = colHeaderInfo;
    // Column 2, title, can have multiple lines, need to merge the lines into a single line
    const validRowIdx = [];
    log(colHeaderInfo.colIndices[0]);
    tableRows.forEach((row, index) => {
        const first_col = row.substring(colIndices[0], colIndices[1]);
        if (first_col.trim().length !== 0) {
            validRowIdx.push(index);
        }
    });
    // row_list should contain a 2D array of strings, each cell is a cell of the table, multiline not merged yet
    let rowList = [];
    for (const row of tableRows) {
        const col_list = new Array();
        for (let i = 1; i < colIndices.length; i++) {
            const val = row.substring(colIndices[i - 1], colIndices[i]).trim();
            col_list.push(val);
        }
        rowList.push(col_list);
    }
    let prevValidRow = 0;
    const curValid = true;
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
    rowList = validRowIdx.map((idx) => rowList[idx]);
    // multiline handled (merged)
    // try to parse extra column, there may be EXT option
    const newRowList = [];
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
    const courses = newRowList.map((rowStr) => new Course(rowStr[0], rowStr[1], parseFloat(rowStr[2]), parseFloat(rowStr[3]), letter2numberGpaMap[rowStr[4]], letter2numberGpaMap[rowStr[5]], rowStr[6], false));
    return new Semester(courses, sessionStr, gpaStr);
};
export const test = () => 'test';
//# sourceMappingURL=utils.js.map
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/content.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/content.ts":
/*!************************!*\
  !*** ./src/content.ts ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/utils */ "./src/core/utils.ts");
/* harmony import */ var _core_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/lib */ "./src/core/lib.ts");

// import { sampleTables, sampleGpaStr, sampleSessionStr, sampleHeaderStr } from './core/sample_data';

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
        let ele = document.querySelector('[data-ng-click="$ctrl.getComplete()"');
        if (ele)
            ele.click();
    }
};
Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["log"])('content.ts');
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
const parse_tables = () => {
    const is_recent_history = $('.academic-history-recent').length === 1;
    const is_complete_history = $('.history-academic-complete').length === 1;
    if (is_recent_history) {
        const tables = $('[data-ng-repeat="session in $ctrl.data.academicData"]');
        return {
            success: false,
            message: 'This is recent academic history, I parse only complete academic history.',
            data: null,
        };
    }
    else if (is_complete_history) {
        const tables = document.querySelectorAll('.courses.blok.pre-elem');
        const semesters = [];
        tables.forEach((table, idx) => {
            var _a;
            const tableHdr = table === null || table === void 0 ? void 0 : table.previousElementSibling;
            const tableHdrStr = tableHdr.innerText;
            // TODO: sessions not finished may not have this line. Fix this case
            const sessionGPA = (_a = table === null || table === void 0 ? void 0 : table.previousElementSibling) === null || _a === void 0 ? void 0 : _a.previousElementSibling;
            const sessionGPAStr = sessionGPA.className == 'emph gpa-listing pre-elem'
                ? sessionGPA.innerText
                : null;
            // TODO: sessions not finished may not have this line. Fix this case
            const session = sessionGPA === null || sessionGPA === void 0 ? void 0 : sessionGPA.previousElementSibling;
            const sessionStr = session.innerText;
            const tableStr = table.innerText;
            const colHeaderInfo = Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["getColumnHeaderInfo"])(tableHdrStr);
            const sessionObj = Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["sessionTableStr2Obj"])(tableStr, sessionStr, sessionGPAStr, colHeaderInfo);
            semesters.push(sessionObj);
        });
        return {
            success: true,
            message: 'parsed',
            data: new _core_lib__WEBPACK_IMPORTED_MODULE_1__["AcademicHistory"](semesters),
        };
    }
    else {
        return {
            success: false,
            message: 'No Academic History Found, please go to the correct web page and click parse.',
            data: null,
        };
    }
};


/***/ }),

/***/ "./src/core/lib.ts":
/*!*************************!*\
  !*** ./src/core/lib.ts ***!
  \*************************/
/*! exports provided: Course, Semester, AcademicHistory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Course", function() { return Course; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Semester", function() { return Semester; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AcademicHistory", function() { return AcademicHistory; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/core/utils.ts");

class Course {
    constructor(courseCode, title, weight, mark, numberGrade, numberCourseAvg, opt, complete) {
        this.courseCode = '';
        this.title = '';
        this.weight = 0;
        this.mark = 0; // integer mark (percentage)
        this.numberGrade = 0; // GPA in number
        this.numberCourseAvg = 0; // course average GPA in number
        this.complete = false; // complete when letterGrade !== 'IPR' and have a value
        this.courseCode = courseCode;
        this.title = title;
        this.weight = weight;
        this.mark = mark;
        this.numberGrade = numberGrade;
        this.numberCourseAvg = numberCourseAvg;
        this.opt = opt;
        this.complete = complete;
    }
    completed() {
        return this.complete;
    }
}
class Semester {
    constructor(courses, sessionHdr, gpaHdr) {
        this.courses = [];
        this.sessionHdr = '';
        this.gpaHdr = '';
        this.courses = courses;
        this.sessionHdr = sessionHdr;
        this.gpaHdr = gpaHdr;
        let [year, season] = sessionHdr.split('-')[0].trim().split(' ');
        this.year = parseInt(year);
        this.season = season;
        const gpaStrList = gpaHdr
            .split('  ')
            .map((x) => x.trim())
            .filter((x) => x.length !== 0);
        this.gpaSummary = {};
        let i = 0;
        while (i < gpaStrList.length) {
            if (gpaStrList[i].includes('GPA') && i !== gpaStrList.length) {
                this.gpaSummary[gpaStrList[i]] = parseFloat(gpaStrList[i + 1]);
                i++; // next value should be a GPA and is processed, skip the next
            }
            else if (gpaStrList[i].includes('Status:')) {
                this.gpaSummary.Status = gpaStrList[i].split(':')[1].trim();
            }
            else {
                Object(_utils__WEBPACK_IMPORTED_MODULE_0__["error"])(`ERROR: not handled, ${gpaStrList[i]}`);
            }
            i++;
        }
    }
    /**
     * @returns total weight of all courses
     */
    getTotalWeight() {
        return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["calCoursesWeightSum"])(this.courses);
    }
    /**
     * @returns total weight of completed courses
     */
    getCompletedWeight() {
        return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["calCoursesWeightSum"])(this.courses.filter((course) => course.complete));
    }
    getCompletedCourses() {
        return this.courses.filter((course) => course.completed());
    }
    getAvgNumberGPA() {
        return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["calAvgCoursesWeightedGPA"])(this.getCompletedCourses());
    }
    getAvgLetterGPA() {
        return _utils__WEBPACK_IMPORTED_MODULE_0__["number2letterGpaMap"][this.getAvgNumberGPA()];
    }
    getAvgMark() {
        return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["calAvgCoursesWeightedMark"])(this.getCompletedCourses());
    }
}
class AcademicHistory {
    constructor(semesters) {
        this.semesters = [];
        this.semesters = semesters;
    }
    /**
     * @returns flattened semesters, all courses, no matter if it's completed
     */
    getAllCourses() {
        return this.semesters.map((semester) => semester.courses).flat();
    }
    /**
     * @returns flattened semesters, only completed courses
     */
    getCompletedCourses() {
        return this.getAllCourses().filter((course) => course.complete);
    }
    /**
     * @returns total weight of all courses
     */
    getTotalWeight() {
        return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["calCoursesWeightSum"])(this.getAllCourses());
    }
    /**
     * @returns total weight of completed courses
     */
    getCompletedWeight() {
        return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["calCoursesWeightSum"])(this.getCompletedCourses());
    }
    /**
     * @returns average percentage mark
     */
    getAvgMark() {
        return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["calAvgCoursesWeightedMark"])(this.getCompletedCourses());
    }
    /**
     * @returns average GPA in number
     */
    getNumberCGPA() {
        return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["calAvgCoursesWeightedGPA"])(this.getCompletedCourses());
    }
    getLetterCGPA() {
        return _utils__WEBPACK_IMPORTED_MODULE_0__["number2letterGpaMap"][this.getNumberCGPA()];
    }
}


/***/ }),

/***/ "./src/core/utils.ts":
/*!***************************!*\
  !*** ./src/core/utils.ts ***!
  \***************************/
/*! exports provided: log, error, warn, calCoursesWeightSum, calWeightedCoursesGPASum, calWeightedCoursesMarkSum, calAvgCoursesWeightedMark, calAvgCoursesWeightedGPA, letter2numberGpaMap, number2letterGpaMap, getColumnHeaderInfo, courseRowStr2CourseObj, sessionTableStr2Obj */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log", function() { return log; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "error", function() { return error; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "warn", function() { return warn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calCoursesWeightSum", function() { return calCoursesWeightSum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calWeightedCoursesGPASum", function() { return calWeightedCoursesGPASum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calWeightedCoursesMarkSum", function() { return calWeightedCoursesMarkSum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calAvgCoursesWeightedMark", function() { return calAvgCoursesWeightedMark; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calAvgCoursesWeightedGPA", function() { return calAvgCoursesWeightedGPA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "letter2numberGpaMap", function() { return letter2numberGpaMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "number2letterGpaMap", function() { return number2letterGpaMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getColumnHeaderInfo", function() { return getColumnHeaderInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "courseRowStr2CourseObj", function() { return courseRowStr2CourseObj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sessionTableStr2Obj", function() { return sessionTableStr2Obj; });
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib */ "./src/core/lib.ts");

const log = console.log, error = console.error, warn = console.warn;
const calCoursesWeightSum = (courses) => {
    return courses.map((course) => course.weight).reduce((a, b) => a + b, 0);
};
const calWeightedCoursesGPASum = (courses) => {
    return courses
        .map((course) => course.weight * course.numberGrade)
        .reduce((a, b) => a + b, 0);
};
const calWeightedCoursesMarkSum = (courses) => {
    return courses
        .map((course) => course.weight * course.mark)
        .reduce((a, b) => a + b, 0);
};
const calAvgCoursesWeightedMark = (courses) => {
    const totalWeight = calCoursesWeightSum(courses);
    const weightedMarkSum = calWeightedCoursesMarkSum(courses);
    return weightedMarkSum / totalWeight;
};
const calAvgCoursesWeightedGPA = (courses) => {
    const totalWeight = calCoursesWeightSum(courses);
    const weightedGPASum = calWeightedCoursesGPASum(courses);
    return weightedGPASum / totalWeight;
};
/**
 * Dictionary mapping Letter grade to GPA in number, out of 4.0
 */
const letter2numberGpaMap = {
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
const number2letterGpaMap = Object.fromEntries(Object.entries(letter2numberGpaMap).map((a) => a.reverse()));
const getColumnHeaderInfo = (headerStr) => {
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
const courseRowStr2CourseObj = (rowStr) => {
    const courseObj = new _lib__WEBPACK_IMPORTED_MODULE_0__["Course"](rowStr[0], rowStr[1], parseFloat(rowStr[2]), parseFloat(rowStr[3]), letter2numberGpaMap[rowStr[4]], letter2numberGpaMap[rowStr[5]], rowStr[6], false);
    return courseObj;
};
const sessionTableStr2Obj = (table_str, sessionStr, gpaStr, colHeaderInfo) => {
    const tableRows = table_str.split('\n'); // split table string
    const { colIndices } = colHeaderInfo;
    // Column 2, title, can have multiple lines, need to merge the lines into a single line
    const validRowIdx = [];
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
    const courses = newRowList.map((rowStr) => new _lib__WEBPACK_IMPORTED_MODULE_0__["Course"](rowStr[0], rowStr[1], parseFloat(rowStr[2]), parseFloat(rowStr[3]), letter2numberGpaMap[rowStr[4]], letter2numberGpaMap[rowStr[5]], rowStr[6], false));
    return new _lib__WEBPACK_IMPORTED_MODULE_0__["Semester"](courses, sessionStr === null ? '' : sessionStr, gpaStr === null ? '' : gpaStr);
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvbGliLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQTZFO0FBQzdFLHNHQUFzRztBQUMvQztBQUN2RCxNQUFNLHNCQUFzQixHQUFHLEdBQUcsRUFBRTtJQUNsQyxNQUFNLG1CQUFtQixHQUFHLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7SUFDekUsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0lBQ3JFLE9BQU8sbUJBQW1CLENBQUM7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QUMsQ0FBQyxVQUFVLEVBQ3JDLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUM5QixDQUFDO0FBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6ImNvbnRlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9jb250ZW50LnRzXCIpO1xuIiwiaW1wb3J0IHsgbG9nLCBnZXRDb2x1bW5IZWFkZXJJbmZvLCBzZXNzaW9uVGFibGVTdHIyT2JqIH0gZnJvbSAnLi9jb3JlL3V0aWxzJztcbi8vIGltcG9ydCB7IHNhbXBsZVRhYmxlcywgc2FtcGxlR3BhU3RyLCBzYW1wbGVTZXNzaW9uU3RyLCBzYW1wbGVIZWFkZXJTdHIgfSBmcm9tICcuL2NvcmUvc2FtcGxlX2RhdGEnO1xuaW1wb3J0IHsgU2VtZXN0ZXIsIEFjYWRlbWljSGlzdG9yeSB9IGZyb20gJy4vY29yZS9saWInO1xuY29uc3QgaXNfaW5fY29tcGxldGVfaGlzdG9yeSA9ICgpID0+IHtcbiAgY29uc3QgaXNfY29tcGxldGVfaGlzdG9yeSA9ICQoJy5oaXN0b3J5LWFjYWRlbWljLWNvbXBsZXRlJykubGVuZ3RoID09PSAxO1xuICBjb25zdCBpc19yZWNlbnRfaGlzdG9yeSA9ICQoJy5hY2FkZW1pYy1oaXN0b3J5LXJlY2VudCcpLmxlbmd0aCA9PT0gMTtcbiAgcmV0dXJuIGlzX2NvbXBsZXRlX2hpc3Rvcnk7XG59O1xuXG5jb25zdCBnb190b19jb21wbGV0ZV9oaXN0b3J5ID0gKCkgPT4ge1xuICBjb25zdCBpc19jb21wbGV0ZV9oaXN0b3J5ID0gJCgnLmhpc3RvcnktYWNhZGVtaWMtY29tcGxldGUnKS5sZW5ndGggPT09IDE7XG4gIGNvbnNvbGUubG9nKGlzX2NvbXBsZXRlX2hpc3RvcnkpO1xuICBjb25zdCBpc19yZWNlbnRfaGlzdG9yeSA9ICQoJy5hY2FkZW1pYy1oaXN0b3J5LXJlY2VudCcpLmxlbmd0aCA9PT0gMTtcbiAgY29uc29sZS5sb2coaXNfcmVjZW50X2hpc3RvcnkpO1xuICBpZiAoaXNfcmVjZW50X2hpc3RvcnkgJiYgIWlzX2NvbXBsZXRlX2hpc3RvcnkpIHtcbiAgICBsZXQgZWxlOiBIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgJ1tkYXRhLW5nLWNsaWNrPVwiJGN0cmwuZ2V0Q29tcGxldGUoKVwiJ1xuICAgICk7XG4gICAgaWYgKGVsZSkgZWxlLmNsaWNrKCk7XG4gIH1cbn07XG5cbmxvZygnY29udGVudC50cycpO1xuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChyZXEsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gIHN3aXRjaCAocmVxKSB7XG4gICAgY2FzZSAncGFyc2UnOlxuICAgICAgY29uc3QgcmVzID0gcGFyc2VfdGFibGVzKCk7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgc2VuZFJlc3BvbnNlKHJlcyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdjbGlja19jb21wbGV0ZSc6XG4gICAgICBnb190b19jb21wbGV0ZV9oaXN0b3J5KCk7XG4gICAgICBzZW5kUmVzcG9uc2UoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2NoZWNrX2lmX2luX2NvbXBsZXRlJzpcbiAgICAgIHNlbmRSZXNwb25zZShpc19pbl9jb21wbGV0ZV9oaXN0b3J5KCkpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgfVxufSk7XG5cbnR5cGUgdGFibGVSZXNwb25zZSA9IHtcbiAgc3VjY2VzczogYm9vbGVhbjtcbiAgbWVzc2FnZTogc3RyaW5nO1xuICBkYXRhOiBBY2FkZW1pY0hpc3RvcnkgfCBudWxsO1xufTtcblxuY29uc3QgcGFyc2VfdGFibGVzID0gKCk6IHRhYmxlUmVzcG9uc2UgPT4ge1xuICBjb25zdCBpc19yZWNlbnRfaGlzdG9yeSA9ICQoJy5hY2FkZW1pYy1oaXN0b3J5LXJlY2VudCcpLmxlbmd0aCA9PT0gMTtcbiAgY29uc3QgaXNfY29tcGxldGVfaGlzdG9yeSA9ICQoJy5oaXN0b3J5LWFjYWRlbWljLWNvbXBsZXRlJykubGVuZ3RoID09PSAxO1xuXG4gIGlmIChpc19yZWNlbnRfaGlzdG9yeSkge1xuICAgIGNvbnN0IHRhYmxlcyA9ICQoJ1tkYXRhLW5nLXJlcGVhdD1cInNlc3Npb24gaW4gJGN0cmwuZGF0YS5hY2FkZW1pY0RhdGFcIl0nKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICBtZXNzYWdlOlxuICAgICAgICAnVGhpcyBpcyByZWNlbnQgYWNhZGVtaWMgaGlzdG9yeSwgSSBwYXJzZSBvbmx5IGNvbXBsZXRlIGFjYWRlbWljIGhpc3RvcnkuJyxcbiAgICAgIGRhdGE6IG51bGwsXG4gICAgfTtcbiAgfSBlbHNlIGlmIChpc19jb21wbGV0ZV9oaXN0b3J5KSB7XG4gICAgY29uc3QgdGFibGVzOiBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PiA9XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PignLmNvdXJzZXMuYmxvay5wcmUtZWxlbScpO1xuICAgIGNvbnN0IHNlbWVzdGVyczogU2VtZXN0ZXJbXSA9IFtdO1xuICAgIHRhYmxlcy5mb3JFYWNoKCh0YWJsZSwgaWR4KSA9PiB7XG4gICAgICBjb25zdCB0YWJsZUhkciA9IHRhYmxlPy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIGFzIEhUTUxFbGVtZW50O1xuICAgICAgY29uc3QgdGFibGVIZHJTdHIgPSB0YWJsZUhkci5pbm5lclRleHQ7XG4gICAgICAvLyBUT0RPOiBzZXNzaW9ucyBub3QgZmluaXNoZWQgbWF5IG5vdCBoYXZlIHRoaXMgbGluZS4gRml4IHRoaXMgY2FzZVxuICAgICAgY29uc3Qgc2Vzc2lvbkdQQSA9IHRhYmxlPy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nXG4gICAgICAgID8ucHJldmlvdXNFbGVtZW50U2libGluZyBhcyBIVE1MRWxlbWVudDtcbiAgICAgIGNvbnN0IHNlc3Npb25HUEFTdHIgPVxuICAgICAgICBzZXNzaW9uR1BBLmNsYXNzTmFtZSA9PSAnZW1waCBncGEtbGlzdGluZyBwcmUtZWxlbSdcbiAgICAgICAgICA/IHNlc3Npb25HUEEuaW5uZXJUZXh0XG4gICAgICAgICAgOiBudWxsO1xuICAgICAgLy8gVE9ETzogc2Vzc2lvbnMgbm90IGZpbmlzaGVkIG1heSBub3QgaGF2ZSB0aGlzIGxpbmUuIEZpeCB0aGlzIGNhc2VcbiAgICAgIGNvbnN0IHNlc3Npb246IEhUTUxFbGVtZW50ID1cbiAgICAgICAgc2Vzc2lvbkdQQT8ucHJldmlvdXNFbGVtZW50U2libGluZyBhcyBIVE1MRWxlbWVudDtcbiAgICAgIGNvbnN0IHNlc3Npb25TdHIgPSBzZXNzaW9uLmlubmVyVGV4dDtcbiAgICAgIGNvbnN0IHRhYmxlU3RyID0gdGFibGUuaW5uZXJUZXh0O1xuICAgICAgY29uc3QgY29sSGVhZGVySW5mbyA9IGdldENvbHVtbkhlYWRlckluZm8odGFibGVIZHJTdHIpO1xuICAgICAgY29uc3Qgc2Vzc2lvbk9iajogU2VtZXN0ZXIgPSBzZXNzaW9uVGFibGVTdHIyT2JqKFxuICAgICAgICB0YWJsZVN0cixcbiAgICAgICAgc2Vzc2lvblN0cixcbiAgICAgICAgc2Vzc2lvbkdQQVN0cixcbiAgICAgICAgY29sSGVhZGVySW5mb1xuICAgICAgKTtcbiAgICAgIHNlbWVzdGVycy5wdXNoKHNlc3Npb25PYmopO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICBtZXNzYWdlOiAncGFyc2VkJyxcbiAgICAgIGRhdGE6IG5ldyBBY2FkZW1pY0hpc3Rvcnkoc2VtZXN0ZXJzKSxcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIG1lc3NhZ2U6XG4gICAgICAgICdObyBBY2FkZW1pYyBIaXN0b3J5IEZvdW5kLCBwbGVhc2UgZ28gdG8gdGhlIGNvcnJlY3Qgd2ViIHBhZ2UgYW5kIGNsaWNrIHBhcnNlLicsXG4gICAgICBkYXRhOiBudWxsLFxuICAgIH07XG4gIH1cbn07XG4iLCJpbXBvcnQge1xuICBjYWxDb3Vyc2VzV2VpZ2h0U3VtLFxuICBudW1iZXIybGV0dGVyR3BhTWFwLFxuICBjYWxBdmdDb3Vyc2VzV2VpZ2h0ZWRHUEEsXG4gIGNhbEF2Z0NvdXJzZXNXZWlnaHRlZE1hcmssXG4gIGVycm9yLFxuICB3YXJuLFxufSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IENvdXJzZXMsIFNlc3Npb25HcGFIZHIgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGNsYXNzIENvdXJzZSB7XG4gIGNvdXJzZUNvZGU6IHN0cmluZyA9ICcnO1xuICB0aXRsZTogc3RyaW5nID0gJyc7XG4gIHdlaWdodDogbnVtYmVyID0gMDtcbiAgbWFyazogbnVtYmVyID0gMDsgLy8gaW50ZWdlciBtYXJrIChwZXJjZW50YWdlKVxuICBudW1iZXJHcmFkZTogbnVtYmVyID0gMDsgLy8gR1BBIGluIG51bWJlclxuICBudW1iZXJDb3Vyc2VBdmc6IG51bWJlciA9IDA7IC8vIGNvdXJzZSBhdmVyYWdlIEdQQSBpbiBudW1iZXJcbiAgb3B0ITogc3RyaW5nO1xuICBjb3Vyc2VIZHIhOiBzdHJpbmc7XG4gIGNvbXBsZXRlOiBib29sZWFuID0gZmFsc2U7IC8vIGNvbXBsZXRlIHdoZW4gbGV0dGVyR3JhZGUgIT09ICdJUFInIGFuZCBoYXZlIGEgdmFsdWVcbiAgY29uc3RydWN0b3IoXG4gICAgY291cnNlQ29kZTogc3RyaW5nLFxuICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgd2VpZ2h0OiBudW1iZXIsXG4gICAgbWFyazogbnVtYmVyLFxuICAgIG51bWJlckdyYWRlOiBudW1iZXIsXG4gICAgbnVtYmVyQ291cnNlQXZnOiBudW1iZXIsXG4gICAgb3B0OiBzdHJpbmcsXG4gICAgY29tcGxldGU6IGJvb2xlYW5cbiAgKSB7XG4gICAgdGhpcy5jb3Vyc2VDb2RlID0gY291cnNlQ29kZTtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy53ZWlnaHQgPSB3ZWlnaHQ7XG4gICAgdGhpcy5tYXJrID0gbWFyaztcbiAgICB0aGlzLm51bWJlckdyYWRlID0gbnVtYmVyR3JhZGU7XG4gICAgdGhpcy5udW1iZXJDb3Vyc2VBdmcgPSBudW1iZXJDb3Vyc2VBdmc7XG4gICAgdGhpcy5vcHQgPSBvcHQ7XG4gICAgdGhpcy5jb21wbGV0ZSA9IGNvbXBsZXRlO1xuICB9XG4gIGNvbXBsZXRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb21wbGV0ZTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2VtZXN0ZXIge1xuICBjb3Vyc2VzOiBDb3Vyc2VzID0gW107XG4gIHNlc3Npb25IZHI6IHN0cmluZyA9ICcnO1xuICBncGFIZHI6IHN0cmluZyA9ICcnO1xuICB5ZWFyOiBudW1iZXI7XG4gIHNlYXNvbjogc3RyaW5nO1xuICBncGFTdW1tYXJ5OiBTZXNzaW9uR3BhSGRyOyAvLyBwYXJzZWQgZnJvbSBHUEEgaGVhZGVyXG5cbiAgY29uc3RydWN0b3IoY291cnNlczogQ291cnNlcywgc2Vzc2lvbkhkcjogc3RyaW5nLCBncGFIZHI6IHN0cmluZykge1xuICAgIHRoaXMuY291cnNlcyA9IGNvdXJzZXM7XG4gICAgdGhpcy5zZXNzaW9uSGRyID0gc2Vzc2lvbkhkcjtcbiAgICB0aGlzLmdwYUhkciA9IGdwYUhkcjtcbiAgICBsZXQgW3llYXIsIHNlYXNvbl0gPSBzZXNzaW9uSGRyLnNwbGl0KCctJylbMF0udHJpbSgpLnNwbGl0KCcgJyk7XG4gICAgdGhpcy55ZWFyID0gcGFyc2VJbnQoeWVhcik7XG4gICAgdGhpcy5zZWFzb24gPSBzZWFzb247XG4gICAgY29uc3QgZ3BhU3RyTGlzdCA9IGdwYUhkclxuICAgICAgLnNwbGl0KCcgICcpXG4gICAgICAubWFwKCh4KSA9PiB4LnRyaW0oKSlcbiAgICAgIC5maWx0ZXIoKHgpID0+IHgubGVuZ3RoICE9PSAwKTtcbiAgICB0aGlzLmdwYVN1bW1hcnkgPSB7fTtcbiAgICBsZXQgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBncGFTdHJMaXN0Lmxlbmd0aCkge1xuICAgICAgaWYgKGdwYVN0ckxpc3RbaV0uaW5jbHVkZXMoJ0dQQScpICYmIGkgIT09IGdwYVN0ckxpc3QubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuZ3BhU3VtbWFyeVtncGFTdHJMaXN0W2ldXSA9IHBhcnNlRmxvYXQoZ3BhU3RyTGlzdFtpICsgMV0pO1xuICAgICAgICBpKys7IC8vIG5leHQgdmFsdWUgc2hvdWxkIGJlIGEgR1BBIGFuZCBpcyBwcm9jZXNzZWQsIHNraXAgdGhlIG5leHRcbiAgICAgIH0gZWxzZSBpZiAoZ3BhU3RyTGlzdFtpXS5pbmNsdWRlcygnU3RhdHVzOicpKSB7XG4gICAgICAgIHRoaXMuZ3BhU3VtbWFyeS5TdGF0dXMgPSBncGFTdHJMaXN0W2ldLnNwbGl0KCc6JylbMV0udHJpbSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXJyb3IoYEVSUk9SOiBub3QgaGFuZGxlZCwgJHtncGFTdHJMaXN0W2ldfWApO1xuICAgICAgfVxuICAgICAgaSsrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB0b3RhbCB3ZWlnaHQgb2YgYWxsIGNvdXJzZXNcbiAgICovXG4gIGdldFRvdGFsV2VpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGNhbENvdXJzZXNXZWlnaHRTdW0odGhpcy5jb3Vyc2VzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB0b3RhbCB3ZWlnaHQgb2YgY29tcGxldGVkIGNvdXJzZXNcbiAgICovXG4gIGdldENvbXBsZXRlZFdlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiBjYWxDb3Vyc2VzV2VpZ2h0U3VtKHRoaXMuY291cnNlcy5maWx0ZXIoKGNvdXJzZSkgPT4gY291cnNlLmNvbXBsZXRlKSk7XG4gIH1cblxuICBnZXRDb21wbGV0ZWRDb3Vyc2VzKCk6IENvdXJzZXMge1xuICAgIHJldHVybiB0aGlzLmNvdXJzZXMuZmlsdGVyKChjb3Vyc2U6IENvdXJzZSkgPT4gY291cnNlLmNvbXBsZXRlZCgpKTtcbiAgfVxuXG4gIGdldEF2Z051bWJlckdQQSgpOiBudW1iZXIge1xuICAgIHJldHVybiBjYWxBdmdDb3Vyc2VzV2VpZ2h0ZWRHUEEodGhpcy5nZXRDb21wbGV0ZWRDb3Vyc2VzKCkpO1xuICB9XG5cbiAgZ2V0QXZnTGV0dGVyR1BBKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG51bWJlcjJsZXR0ZXJHcGFNYXBbdGhpcy5nZXRBdmdOdW1iZXJHUEEoKV07XG4gIH1cblxuICBnZXRBdmdNYXJrKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGNhbEF2Z0NvdXJzZXNXZWlnaHRlZE1hcmsodGhpcy5nZXRDb21wbGV0ZWRDb3Vyc2VzKCkpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBY2FkZW1pY0hpc3Rvcnkge1xuICBzZW1lc3RlcnM6IFNlbWVzdGVyW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihzZW1lc3RlcnM6IFNlbWVzdGVyW10pIHtcbiAgICB0aGlzLnNlbWVzdGVycyA9IHNlbWVzdGVycztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyBmbGF0dGVuZWQgc2VtZXN0ZXJzLCBhbGwgY291cnNlcywgbm8gbWF0dGVyIGlmIGl0J3MgY29tcGxldGVkXG4gICAqL1xuICBnZXRBbGxDb3Vyc2VzKCk6IENvdXJzZXMge1xuICAgIHJldHVybiB0aGlzLnNlbWVzdGVycy5tYXAoKHNlbWVzdGVyOiBTZW1lc3RlcikgPT4gc2VtZXN0ZXIuY291cnNlcykuZmxhdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIGZsYXR0ZW5lZCBzZW1lc3RlcnMsIG9ubHkgY29tcGxldGVkIGNvdXJzZXNcbiAgICovXG4gIGdldENvbXBsZXRlZENvdXJzZXMoKTogQ291cnNlcyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QWxsQ291cnNlcygpLmZpbHRlcigoY291cnNlOiBDb3Vyc2UpID0+IGNvdXJzZS5jb21wbGV0ZSk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMgdG90YWwgd2VpZ2h0IG9mIGFsbCBjb3Vyc2VzXG4gICAqL1xuICBnZXRUb3RhbFdlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiBjYWxDb3Vyc2VzV2VpZ2h0U3VtKHRoaXMuZ2V0QWxsQ291cnNlcygpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB0b3RhbCB3ZWlnaHQgb2YgY29tcGxldGVkIGNvdXJzZXNcbiAgICovXG4gIGdldENvbXBsZXRlZFdlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiBjYWxDb3Vyc2VzV2VpZ2h0U3VtKHRoaXMuZ2V0Q29tcGxldGVkQ291cnNlcygpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyBhdmVyYWdlIHBlcmNlbnRhZ2UgbWFya1xuICAgKi9cbiAgZ2V0QXZnTWFyaygpOiBudW1iZXIge1xuICAgIHJldHVybiBjYWxBdmdDb3Vyc2VzV2VpZ2h0ZWRNYXJrKHRoaXMuZ2V0Q29tcGxldGVkQ291cnNlcygpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyBhdmVyYWdlIEdQQSBpbiBudW1iZXJcbiAgICovXG4gIGdldE51bWJlckNHUEEoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gY2FsQXZnQ291cnNlc1dlaWdodGVkR1BBKHRoaXMuZ2V0Q29tcGxldGVkQ291cnNlcygpKTtcbiAgfVxuXG4gIGdldExldHRlckNHUEEoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbnVtYmVyMmxldHRlckdwYU1hcFt0aGlzLmdldE51bWJlckNHUEEoKV07XG4gIH1cbn1cbiIsImltcG9ydCB7IENvdXJzZXMsIENvbEhlYWRlckluZm8sIExldHRlcjJOdW1HcGFNYXAsIE51bTJMZXR0ZXJHcGFNYXAgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IENvdXJzZSwgU2VtZXN0ZXIgfSBmcm9tICcuL2xpYic7XG5cbmV4cG9ydCBjb25zdCBsb2cgPSBjb25zb2xlLmxvZyxcbiAgZXJyb3IgPSBjb25zb2xlLmVycm9yLFxuICB3YXJuID0gY29uc29sZS53YXJuO1xuXG5leHBvcnQgY29uc3QgY2FsQ291cnNlc1dlaWdodFN1bSA9IChjb3Vyc2VzOiBDb3Vyc2VzKTogbnVtYmVyID0+IHtcbiAgcmV0dXJuIGNvdXJzZXMubWFwKChjb3Vyc2U6IENvdXJzZSkgPT4gY291cnNlLndlaWdodCkucmVkdWNlKChhOiBudW1iZXIsIGI6IG51bWJlcikgPT4gYSArIGIsIDApO1xufTtcblxuZXhwb3J0IGNvbnN0IGNhbFdlaWdodGVkQ291cnNlc0dQQVN1bSA9IChjb3Vyc2VzOiBDb3Vyc2VzKTogbnVtYmVyID0+IHtcbiAgcmV0dXJuIGNvdXJzZXNcbiAgICAubWFwKChjb3Vyc2U6IENvdXJzZSkgPT4gY291cnNlLndlaWdodCAqIGNvdXJzZS5udW1iZXJHcmFkZSlcbiAgICAucmVkdWNlKChhOiBudW1iZXIsIGI6IG51bWJlcikgPT4gYSArIGIsIDApO1xufTtcblxuZXhwb3J0IGNvbnN0IGNhbFdlaWdodGVkQ291cnNlc01hcmtTdW0gPSAoY291cnNlczogQ291cnNlcyk6IG51bWJlciA9PiB7XG4gIHJldHVybiBjb3Vyc2VzXG4gICAgLm1hcCgoY291cnNlOiBDb3Vyc2UpID0+IGNvdXJzZS53ZWlnaHQgKiBjb3Vyc2UubWFyaylcbiAgICAucmVkdWNlKChhOiBudW1iZXIsIGI6IG51bWJlcikgPT4gYSArIGIsIDApO1xufTtcblxuZXhwb3J0IGNvbnN0IGNhbEF2Z0NvdXJzZXNXZWlnaHRlZE1hcmsgPSAoY291cnNlczogQ291cnNlcyk6IG51bWJlciA9PiB7XG4gIGNvbnN0IHRvdGFsV2VpZ2h0OiBudW1iZXIgPSBjYWxDb3Vyc2VzV2VpZ2h0U3VtKGNvdXJzZXMpO1xuICBjb25zdCB3ZWlnaHRlZE1hcmtTdW06IG51bWJlciA9IGNhbFdlaWdodGVkQ291cnNlc01hcmtTdW0oY291cnNlcyk7XG4gIHJldHVybiB3ZWlnaHRlZE1hcmtTdW0gLyB0b3RhbFdlaWdodDtcbn07XG5cbmV4cG9ydCBjb25zdCBjYWxBdmdDb3Vyc2VzV2VpZ2h0ZWRHUEEgPSAoY291cnNlczogQ291cnNlcyk6IG51bWJlciA9PiB7XG4gIGNvbnN0IHRvdGFsV2VpZ2h0OiBudW1iZXIgPSBjYWxDb3Vyc2VzV2VpZ2h0U3VtKGNvdXJzZXMpO1xuICBjb25zdCB3ZWlnaHRlZEdQQVN1bTogbnVtYmVyID0gY2FsV2VpZ2h0ZWRDb3Vyc2VzR1BBU3VtKGNvdXJzZXMpO1xuICByZXR1cm4gd2VpZ2h0ZWRHUEFTdW0gLyB0b3RhbFdlaWdodDtcbn07XG4vKipcbiAqIERpY3Rpb25hcnkgbWFwcGluZyBMZXR0ZXIgZ3JhZGUgdG8gR1BBIGluIG51bWJlciwgb3V0IG9mIDQuMFxuICovXG5leHBvcnQgY29uc3QgbGV0dGVyMm51bWJlckdwYU1hcDogTGV0dGVyMk51bUdwYU1hcCA9IHtcbiAgJ0ErJzogNC4wLFxuICBBOiA0LjAsXG4gICdBLSc6IDMuNyxcbiAgJ0IrJzogMy4zLFxuICBCOiAzLjAsXG4gICdCLSc6IDIuNyxcbiAgJ0MrJzogMi4zLFxuICBDOiAyLjAsXG4gICdDLSc6IDEuNyxcbiAgJ0QrJzogMS4zLFxuICBEOiAxLjAsXG4gICdELSc6IDAuNyxcbiAgRjogMC4wLFxufTtcblxuLyoqXG4gKiBEaWN0aW9uYXJ5IG1hcHBpbmcgbnVtYmVyIEdQQSBvdXQgb2YgNC4wIHRvIGxldHRlciBncmFkZVxuICogUmV2ZXJzZSBsZXR0ZXIybnVtYmVyR3BhTWFwIGRpY3Rpb25hcnkuXG4gKi9cbmV4cG9ydCBjb25zdCBudW1iZXIybGV0dGVyR3BhTWFwOiBOdW0yTGV0dGVyR3BhTWFwID0gT2JqZWN0LmZyb21FbnRyaWVzKFxuICBPYmplY3QuZW50cmllcyhsZXR0ZXIybnVtYmVyR3BhTWFwKS5tYXAoKGE6IFtzdHJpbmcsIG51bWJlcl0pID0+IGEucmV2ZXJzZSgpKVxuKTtcblxuZXhwb3J0IGNvbnN0IGdldENvbHVtbkhlYWRlckluZm8gPSAoaGVhZGVyU3RyOiBzdHJpbmcpOiBDb2xIZWFkZXJJbmZvID0+IHtcbiAgY29uc3QgY29sTmFtZXMgPSBoZWFkZXJTdHJcbiAgICAuc3BsaXQoJyAgJylcbiAgICAubWFwKChjb2w6IHN0cmluZykgPT4gY29sLnRyaW0oKSlcbiAgICAuZmlsdGVyKChjb2w6IHN0cmluZykgPT4gY29sLmxlbmd0aCAhPSAwKTtcbiAgY29uc3QgY29sSW5kaWNlcyA9IGNvbE5hbWVzLm1hcCgoY29sOiBzdHJpbmcpID0+IGhlYWRlclN0ci5pbmRleE9mKGNvbCkpO1xuICBjb2xJbmRpY2VzLnB1c2goaGVhZGVyU3RyLmxlbmd0aCk7XG4gIHJldHVybiB7IGNvbE5hbWVzLCBjb2xJbmRpY2VzIH07XG59O1xuXG4vKipcbiAqIHNhbXBsZSByb3dTdHI6IFsgJ01BVDIyM0gxJywgJ0xpbmVhciBBbGdlYnJhIEknLCAnMC41MCcsICc4NycsICdBJywgJ0MrJywgJycgXVxuICogQHBhcmFtIHJvd1N0cjogYXJyYXkgb2Ygc3RyaW5nIHRvIHJlcHJlc2VudCBhIHNpbmdsZSBjb3Vyc2VcbiAqL1xuZXhwb3J0IGNvbnN0IGNvdXJzZVJvd1N0cjJDb3Vyc2VPYmogPSAocm93U3RyOiBzdHJpbmdbXSkgPT4ge1xuICBjb25zdCBjb3Vyc2VPYmogPSBuZXcgQ291cnNlKFxuICAgIHJvd1N0clswXSxcbiAgICByb3dTdHJbMV0sXG4gICAgcGFyc2VGbG9hdChyb3dTdHJbMl0pLFxuICAgIHBhcnNlRmxvYXQocm93U3RyWzNdKSxcbiAgICBsZXR0ZXIybnVtYmVyR3BhTWFwW3Jvd1N0cls0XV0sXG4gICAgbGV0dGVyMm51bWJlckdwYU1hcFtyb3dTdHJbNV1dLFxuICAgIHJvd1N0cls2XSxcbiAgICBmYWxzZVxuICApO1xuICByZXR1cm4gY291cnNlT2JqO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlc3Npb25UYWJsZVN0cjJPYmogPSAoXG4gIHRhYmxlX3N0cjogc3RyaW5nLFxuICBzZXNzaW9uU3RyOiBzdHJpbmcgfCBudWxsLFxuICBncGFTdHI6IHN0cmluZyB8IG51bGwsXG4gIGNvbEhlYWRlckluZm86IENvbEhlYWRlckluZm9cbik6IFNlbWVzdGVyID0+IHtcbiAgY29uc3QgdGFibGVSb3dzOiBzdHJpbmdbXSA9IHRhYmxlX3N0ci5zcGxpdCgnXFxuJyk7IC8vIHNwbGl0IHRhYmxlIHN0cmluZ1xuICBjb25zdCB7IGNvbEluZGljZXMgfSA9IGNvbEhlYWRlckluZm87XG4gIC8vIENvbHVtbiAyLCB0aXRsZSwgY2FuIGhhdmUgbXVsdGlwbGUgbGluZXMsIG5lZWQgdG8gbWVyZ2UgdGhlIGxpbmVzIGludG8gYSBzaW5nbGUgbGluZVxuICBjb25zdCB2YWxpZFJvd0lkeDogQXJyYXk8bnVtYmVyPiA9IFtdO1xuICB0YWJsZVJvd3MuZm9yRWFjaCgocm93LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IGZpcnN0X2NvbCA9IHJvdy5zdWJzdHJpbmcoY29sSW5kaWNlc1swXSwgY29sSW5kaWNlc1sxXSk7XG4gICAgaWYgKGZpcnN0X2NvbC50cmltKCkubGVuZ3RoICE9PSAwKSB7XG4gICAgICB2YWxpZFJvd0lkeC5wdXNoKGluZGV4KTtcbiAgICB9XG4gIH0pO1xuICAvLyByb3dfbGlzdCBzaG91bGQgY29udGFpbiBhIDJEIGFycmF5IG9mIHN0cmluZ3MsIGVhY2ggY2VsbCBpcyBhIGNlbGwgb2YgdGhlIHRhYmxlLCBtdWx0aWxpbmUgbm90IG1lcmdlZCB5ZXRcbiAgbGV0IHJvd0xpc3Q6IHN0cmluZ1tdW10gPSBbXTtcbiAgZm9yIChjb25zdCByb3cgb2YgdGFibGVSb3dzKSB7XG4gICAgY29uc3QgY29sX2xpc3Q6IHN0cmluZ1tdID0gbmV3IEFycmF5KCk7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBjb2xJbmRpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB2YWwgPSByb3cuc3Vic3RyaW5nKGNvbEluZGljZXNbaSAtIDFdLCBjb2xJbmRpY2VzW2ldKS50cmltKCk7XG4gICAgICBjb2xfbGlzdC5wdXNoKHZhbCk7XG4gICAgfVxuICAgIHJvd0xpc3QucHVzaChjb2xfbGlzdCk7XG4gIH1cblxuICBsZXQgcHJldlZhbGlkUm93ID0gMDtcbiAgY29uc3QgY3VyVmFsaWQgPSB0cnVlO1xuXG4gIGZvciAoY29uc3QgdmFsaWRJZHggb2YgdmFsaWRSb3dJZHgpIHtcbiAgICBpZiAodmFsaWRJZHggPiAxICsgcHJldlZhbGlkUm93KSB7XG4gICAgICBmb3IgKGxldCBpID0gcHJldlZhbGlkUm93ICsgMTsgaSA8IHZhbGlkSWR4OyBpKyspIHtcbiAgICAgICAgLy8gaXRlcmF0ZSBjb2x1bW5zXG4gICAgICAgIGNvbnN0IGNvbExpc3QgPSByb3dMaXN0W2ldO1xuICAgICAgICBmb3IgKGNvbnN0IFtjb2xfaWR4LCBjb2xfY29udGVudF0gb2YgY29sTGlzdC5lbnRyaWVzKCkpIHtcbiAgICAgICAgICByb3dMaXN0W3ByZXZWYWxpZFJvd11bY29sX2lkeF0gKz0gYCAke2NvbF9jb250ZW50fWA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcHJldlZhbGlkUm93ID0gdmFsaWRJZHg7XG4gIH1cbiAgcm93TGlzdCA9IHZhbGlkUm93SWR4Lm1hcCgoaWR4OiBudW1iZXIpID0+IHJvd0xpc3RbaWR4XSk7XG5cbiAgLy8gbXVsdGlsaW5lIGhhbmRsZWQgKG1lcmdlZClcbiAgLy8gdHJ5IHRvIHBhcnNlIGV4dHJhIGNvbHVtbiwgdGhlcmUgbWF5IGJlIEVYVCBvcHRpb25cbiAgY29uc3QgbmV3Um93TGlzdDogc3RyaW5nW11bXSA9IFtdO1xuICBmb3IgKGNvbnN0IGNvbF9saXN0IG9mIHJvd0xpc3QpIHtcbiAgICBjb25zdCBuZXdDb2xMaXN0ID0gY29sX2xpc3Quc3BsaWNlKDAsIGNvbF9saXN0Lmxlbmd0aCAtIDEpO1xuICAgIGNvbnN0IGxhc3RDb2wgPSBjb2xfbGlzdFtjb2xfbGlzdC5sZW5ndGggLSAxXTtcbiAgICBjb25zdCBjb2xTcGxpdCA9IGxhc3RDb2wuc3BsaXQoJyAgJyk7XG4gICAgbGV0IFtncmFkZSwgb3B0XSA9IFtsYXN0Q29sLCAnJ107XG4gICAgaWYgKGNvbFNwbGl0Lmxlbmd0aCAhPSAxKSB7XG4gICAgICBbZ3JhZGUsIG9wdF0gPSBjb2xTcGxpdDtcbiAgICAgIGdyYWRlID0gZ3JhZGUudHJpbSgpO1xuICAgICAgb3B0ID0gb3B0LnRyaW0oKTtcbiAgICB9XG4gICAgbmV3Q29sTGlzdC5wdXNoKGdyYWRlKTtcbiAgICBuZXdDb2xMaXN0LnB1c2gob3B0KTtcbiAgICBuZXdSb3dMaXN0LnB1c2gobmV3Q29sTGlzdCk7XG4gIH1cbiAgY29uc3QgY291cnNlczogQ291cnNlW10gPSBuZXdSb3dMaXN0Lm1hcChcbiAgICAocm93U3RyOiBzdHJpbmdbXSkgPT5cbiAgICAgIG5ldyBDb3Vyc2UoXG4gICAgICAgIHJvd1N0clswXSxcbiAgICAgICAgcm93U3RyWzFdLFxuICAgICAgICBwYXJzZUZsb2F0KHJvd1N0clsyXSksXG4gICAgICAgIHBhcnNlRmxvYXQocm93U3RyWzNdKSxcbiAgICAgICAgbGV0dGVyMm51bWJlckdwYU1hcFtyb3dTdHJbNF1dLFxuICAgICAgICBsZXR0ZXIybnVtYmVyR3BhTWFwW3Jvd1N0cls1XV0sXG4gICAgICAgIHJvd1N0cls2XSxcbiAgICAgICAgZmFsc2VcbiAgICAgIClcbiAgKTtcbiAgcmV0dXJuIG5ldyBTZW1lc3RlcihcbiAgICBjb3Vyc2VzLFxuICAgIHNlc3Npb25TdHIgPT09IG51bGwgPyAnJyA6IHNlc3Npb25TdHIsXG4gICAgZ3BhU3RyID09PSBudWxsID8gJycgOiBncGFTdHJcbiAgKTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9
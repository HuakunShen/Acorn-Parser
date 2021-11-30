import { calCoursesWeightSum, number2letterGpaMap, calAvgCoursesWeightedGPA, calAvgCoursesWeightedMark, error, } from './utils';
export class Course {
    courseCode = '';
    title = '';
    weight = 0;
    mark = 0; // integer mark (percentage)
    numberGrade = 0; // GPA in number
    numberCourseAvg = 0; // course average GPA in number
    opt;
    courseHdr;
    complete = false; // complete when letterGrade !== 'IPR' and have a value
    constructor(courseCode, title, weight, mark, numberGrade, numberCourseAvg, opt, complete) {
        this.courseCode = courseCode;
        this.title = title;
        this.weight = weight;
        this.mark = mark;
        this.numberGrade = numberGrade;
        this.numberCourseAvg = numberCourseAvg;
        this.opt = opt;
        this.complete = complete;
    }
}
export class Semester {
    courses = [];
    sessionHdr = '';
    gpaHdr = '';
    year;
    season;
    gpaSummary; // parsed from GPA header
    constructor(courses, sessionHdr, gpaHdr) {
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
                error(`ERROR: not handled, ${gpaStrList[i]}`);
            }
            i++;
        }
    }
    /**
     * @returns total weight of all courses
     */
    getTotalWeight() {
        return calCoursesWeightSum(this.courses);
    }
    /**
     * @returns total weight of completed courses
     */
    getCompletedWeight() {
        return calCoursesWeightSum(this.courses.filter((course) => course.complete));
    }
    getCompletedCourses() {
        return this.courses.filter((course) => course.complete);
    }
    getAvgNumberGPA() {
        return calAvgCoursesWeightedGPA(this.getCompletedCourses());
    }
    getAvgLetterGPA() {
        return number2letterGpaMap[this.getAvgNumberGPA()];
    }
    getAvgMark() {
        return calAvgCoursesWeightedMark(this.getCompletedCourses());
    }
}
export class AcademicHistory {
    semesters = [];
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
        return calCoursesWeightSum(this.getAllCourses());
    }
    /**
     * @returns total weight of completed courses
     */
    getCompletedWeight() {
        return calCoursesWeightSum(this.getCompletedCourses());
    }
    /**
     * @returns average percentage mark
     */
    getAvgMark() {
        return calAvgCoursesWeightedMark(this.getCompletedCourses());
    }
    /**
     * @returns average GPA in number
     */
    getNumberCGPA() {
        return calAvgCoursesWeightedGPA(this.getCompletedCourses());
    }
    getLetterCGPA() {
        return number2letterGpaMap[this.getNumberCGPA()];
    }
}
//# sourceMappingURL=lib.js.map
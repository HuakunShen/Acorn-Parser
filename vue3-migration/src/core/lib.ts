import {
  calCoursesWeightSum,
  number2letterGpaMap,
  calAvgCoursesWeightedGPA,
  calAvgCoursesWeightedMark,
  error,
  warn,
} from './utils';
import { Courses, SessionGpaHdr } from './types';

export class Course {
  courseCode: string;
  title: string;
  weight: number;
  mark: number; // integer mark (percentage)
  numberGrade: number; // GPA in number
  numberCourseAvg: number; // course average GPA in number
  opt!: string;
  courseHdr!: string;
  complete: boolean; // complete when letterGrade !== 'IPR' and have a value
  constructor(
    courseCode: string,
    title: string,
    weight: number,
    mark: number,
    numberGrade: number,
    numberCourseAvg: number,
    opt: string,
    complete: boolean
  ) {
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

export class Semester {
  courses: Courses = [];
  sessionHdr: string;
  gpaHdr: string;
  year: number;
  season: string;
  gpaSummary: SessionGpaHdr; // parsed from GPA header

  constructor(courses: Courses, sessionHdr: string, gpaHdr: string) {
    this.courses = courses;
    this.sessionHdr = sessionHdr;
    this.gpaHdr = gpaHdr;
    const [year, season] = sessionHdr.split('-')[0].trim().split(' ');
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
      } else if (gpaStrList[i].includes('Status:')) {
        this.gpaSummary.Status = gpaStrList[i].split(':')[1].trim();
      } else {
        error(`ERROR: not handled, ${gpaStrList[i]}`);
      }
      i++;
    }
  }

  /**
   * @returns total weight of all courses
   */
  getTotalWeight(): number {
    return calCoursesWeightSum(this.courses);
  }

  /**
   * @returns total weight of completed courses
   */
  getCompletedWeight(): number {
    return calCoursesWeightSum(this.courses.filter((course) => course.complete));
  }

  getCompletedCourses(): Courses {
    return this.courses.filter((course: Course) => course.completed());
  }

  getAvgNumberGPA(): number {
    return calAvgCoursesWeightedGPA(this.getCompletedCourses());
  }

  getAvgLetterGPA(): string {
    return number2letterGpaMap[this.getAvgNumberGPA()];
  }

  getAvgMark(): number {
    return calAvgCoursesWeightedMark(this.getCompletedCourses());
  }
}

export class AcademicHistory {
  semesters: Semester[] = [];

  constructor(semesters: Semester[]) {
    this.semesters = semesters;
  }

  /**
   * @returns flattened semesters, all courses, no matter if it's completed
   */
  getAllCourses(): Courses {
    return this.semesters.map((semester: Semester) => semester.courses).flat();
  }

  /**
   * @returns flattened semesters, only completed courses
   */
  getCompletedCourses(): Courses {
    return this.getAllCourses().filter((course: Course) => course.complete);
  }

  /**
   * @returns total weight of all courses
   */
  getTotalWeight(): number {
    return calCoursesWeightSum(this.getAllCourses());
  }

  /**
   * @returns total weight of completed courses
   */
  getCompletedWeight(): number {
    return calCoursesWeightSum(this.getCompletedCourses());
  }

  /**
   * @returns average percentage mark
   */
  getAvgMark(): number {
    return calAvgCoursesWeightedMark(this.getCompletedCourses());
  }

  /**
   * @returns average GPA in number
   */
  getNumberCGPA(): number {
    return calAvgCoursesWeightedGPA(this.getCompletedCourses());
  }

  getLetterCGPA(): string {
    return number2letterGpaMap[this.getNumberCGPA()];
  }

  static loadFromJson(rawJson: string): AcademicHistory {
    const parsedData = JSON.parse(rawJson);
    const semesters = parsedData.semesters.map((semester: Semester) => {
      semester.courses = semester.courses.map((course: Course) =>
        Object.setPrototypeOf(course, Course.prototype)
      );
      return Object.setPrototypeOf(semester, Semester.prototype);
    });
    return new AcademicHistory(semesters);
  }
}

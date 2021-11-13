import {
  calCoursesWeightSum,
  number2letterGpaMap,
  calAvgCoursesWeightedGPA,
  calAvgCoursesWeightedMark,
} from './utils';
import { Course, Courses } from './types';

export class Semester {
  courses: Courses = [];
  sessionHdr: string = '';
  gpaListing: string = '';

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
    return calCoursesWeightSum(
      this.courses.filter((course) => course.complete)
    );
  }

  getCompletedCourses(): Courses {
    return this.courses.filter((course: Course) => course.complete);
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
}

export interface courseObject {
  courseCode: string;
  title: string;
  weight: string;
  mark: string;
  grade: string;
  courseAvg: string;
  opt: string;
}
export type coursesType = courseObject[];
export type sessionType = {
  courses: coursesType;
  year: number;
  season: string;
};

// OOP Design
import { calCoursesWeightSum } from './utils';

export class Course {
  courseCode: string = '';
  title: string = '';
  weight: number = 0;
  mark: number = 0; // integer mark (percentage)
  letterGrade: string = ''; // letter grade (GPA)
  numberGrade: number = 0; // GPA
  letterCourseAvg: string = ''; // letter grade (GPA)
  numberCourseAvg: string = ''; // GPA
  opt!: string;
  courseHdr!: string;
  complete: boolean = false; // complete when letterGrade !== 'IPR' and have a value
}

export type Courses = Course[];

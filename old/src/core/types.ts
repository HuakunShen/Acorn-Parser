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
import { AcademicHistory } from './lib';

// OOP Design

import { Course } from './lib';
export type Courses = Course[];

export type ColHeaderInfo = {
  colNames: string[];
  colIndices: number[];
};
// export type SessionGpaHdr = {
//   'Sessional GPA'?: number;
//   'Annual GPA'?: number;
//   'Cumulative GPA '?: number;
//   Status?: string;
// };
export type Letter2NumGpaMap = { [key: string]: number };
export type Num2LetterGpaMap = { [key: string]: string }; // object keys must be string
export type SessionGpaHdr = { [key: string]: string | number };
export type DeptCountType = {
  [key: string]: {
    gpaSum: number;
    markSum: number;
    weightSum: number;
    courseCodes: string[];
    gpaAvg: number;
    markAvg: number;
  };
};

export type ParseTableResponse = {
  success: boolean;
  message: string;
  data: AcademicHistory | null;
};

export type ErrorType = {
  message: string;
  data: any;
};

export type DeptTableRow = {
  dept: string;
  gpaAvg: number;
  markAvg: number;
  numCourses: number;
  weight: number;
};

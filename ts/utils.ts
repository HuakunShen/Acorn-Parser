import { Course, Courses } from './types';
type Letter2NumGpaMap = { [key: string]: number };
type Num2LetterGpaMap = { [key: string]: string }; // object keys must be string

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

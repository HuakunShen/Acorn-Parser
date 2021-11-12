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

export class CourseHistory {
  courseCode!: string;
  title!: string;
  weight!: string;
  mark!: string;
  grade!: string;
  courseAvg!: string;
  opt!: string;
  complete: boolean;
  constructor() {
    this.complete = false;
  }
}

export class SemesterHistory {
  constructor() {}
}
export class AcademicHistory {
  constructor() {}
}

const log = console.log;
const course = new CourseHistory();
course['courseCode'] = 'lla';
log(course.courseCode);

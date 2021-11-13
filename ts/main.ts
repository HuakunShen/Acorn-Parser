import { Course } from './types';
import { Semester, AcademicHistory } from './lib';
import { log, warn, error } from './utils';

const course = <Course>{ title: 'csc458', letterGrade: 'A+', weight: 1.4 };
const semester: Semester = new Semester();

semester.courses = [course, course];

log(semester.getTotalWeight());
const AH = new AcademicHistory();
AH.semesters.push(semester);
AH.semesters.push(semester);
log(AH);
log(AH.getAllCourses());

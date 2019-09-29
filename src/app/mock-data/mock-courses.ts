import { Course } from '../objects/course';
import { STASKO } from './mock-professors';
import { STUDENTS } from './mock-students';

export const CS1331: Course = {
    id: 1,
    name: 'CS1331',
    professor: STASKO,
    roster: STUDENTS
};

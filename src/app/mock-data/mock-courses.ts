import { Course } from '../objects/course';
import { STASKO } from './mock-professors';
import { STUDENTS } from './mock-students';
import { SURVEYS } from './mock-surveys';

export const COURSES: Course[] = [
    {
        id: 1,
        name: 'CS1301',
        professor: STASKO,
        roster: STUDENTS,
        surveys: [SURVEYS[0], SURVEYS[1]]
    },
    {
        id: 2,
        name: 'CS1331',
        professor: STASKO,
        roster: STUDENTS,
        surveys: [SURVEYS[0], SURVEYS[1]]
    },
    {
        id: 3,
        name: 'CS1332',
        professor: STASKO,
        roster: STUDENTS,
        surveys: [SURVEYS[0], SURVEYS[1]]
    }
];

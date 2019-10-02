import { Professor } from './professor';
import { Student } from './student';

export class Course {
    id: number;
    name: string;
    professor: Professor;
    roster: Student[];
    // other properties?
}

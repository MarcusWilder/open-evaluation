import { Professor } from './professor';
import { Student } from './student';
import { Survey } from './survey';

export class Course {
    id: number;
    name: string;
    professor: Professor;
    roster: Student[];
    surveys: Survey[];
}

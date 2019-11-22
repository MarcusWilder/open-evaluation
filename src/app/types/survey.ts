import { Question } from './question';

export interface Survey {
    _id: number;
    name: string;
    template: string;
    questions: Question[];
    active: boolean;
}

export interface CourseWithSurveys {
    courseId: number,
    courseName: string,
    surveys: Survey[];
}

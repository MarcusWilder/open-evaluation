import { Question } from './question';

export class Survey {
    _id: number;
    name: string;
    template: string;
    questionList: Question[];
    active: boolean;
    // other properties?
}

export interface CourseWithSurveys {
    courseId: number,
    courseName: string,
    surveys: Survey[];
}

import { Question } from './question';

export class Survey {
    surveyId: number;
    name: string;
    template: 'DEFAULT' | 'CTL';
    questionList: Question[];
    active: boolean;
    // other properties?
}

export interface CourseWithSurveys {
    courseId: number,
    courseName: string,
    surveys: Survey[];
}
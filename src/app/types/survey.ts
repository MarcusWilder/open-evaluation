import { Question, QuestionWithResponses } from './question';

export interface Survey {
    _id?: string;
    name: string;
    template: string;
    questions: Question[];
    active: boolean;
    completed?: boolean;
}

export interface SurveyResults {
    _id?: string;
    name: string;
    template: string;
    questions: QuestionWithResponses[];
}

export interface CourseWithSurveys {
    courseId: number,
    courseName: string,
    surveys: Survey[];
}

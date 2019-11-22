import { QuestionType } from './question';
export interface ResponseData {
    questionId: number,
    questionType: QuestionType,
    studentResponse: string | number
};

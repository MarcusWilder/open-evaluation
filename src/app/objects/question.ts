import { QuestionType } from './question-type';

export class Question {
    id: number;
    type: QuestionType;
    baseQuestion: string;
    options?: unknown[];
}

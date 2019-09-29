import { QuestionType } from './QuestionType';

export class Question {
    id: number;
    type: QuestionType;
    baseQuestion: string;
    options: string[];
}

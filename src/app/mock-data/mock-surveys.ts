import { Survey } from '../objects/survey';
import { QUESTIONS } from './mock-questions';

export const SURVEYS: Survey[] = [
    {
        id: 1,
        name: 'Sample Survey 1',
        questionList: QUESTIONS
    },
    {
        id: 2,
        name: 'Sample Survey 2',
        questionList: QUESTIONS
    }
];

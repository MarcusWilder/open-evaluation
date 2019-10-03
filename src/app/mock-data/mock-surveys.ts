import { Survey } from '../objects/survey';
import { QUESTIONS } from './mock-questions';

export const SURVEYS: Survey[] = [
    {
        id: 1,
        name: 'Sample Midterm Survey',
        questionList: QUESTIONS
    },
    {
        id: 2,
        name: 'Sample Midterm Survey2',
        questionList: QUESTIONS
    }
];

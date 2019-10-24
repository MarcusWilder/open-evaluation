import { Survey } from '../objects/survey';
import { DEFAULT_QUESTIONS, CTL_QUESTIONS } from './mock-questions';

export const SURVEYS: Survey[] = [
    {
        id: 1,
        name: 'Default Survey',
        questionList: DEFAULT_QUESTIONS
    },
    {
        id: 2,
        name: 'CTL Survey',
        questionList: CTL_QUESTIONS
    }
];

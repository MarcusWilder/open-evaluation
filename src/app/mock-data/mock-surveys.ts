import { Survey } from '../objects/survey';
import { DEFAULT_QUESTIONS, CTL_QUESTIONS } from './mock-questions';

export const SURVEYS: Survey[] = [
    {
        _id: 1,
        name: 'Default Survey',
        template: 'DEFAULT',
        questionList: DEFAULT_QUESTIONS,
        active: true
    },
    {
        _id: 2,
        name: 'CTL Survey',
        template: 'CTL',
        questionList: CTL_QUESTIONS,
        active: true
    }
];

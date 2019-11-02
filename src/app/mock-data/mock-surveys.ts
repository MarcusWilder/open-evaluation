import { Survey } from '../objects/survey';
import { DEFAULT_QUESTIONS, CTL_QUESTIONS } from './mock-questions';

export const SURVEYS: Survey[] = [
    {
        surveyId: 1,
        name: 'Default Survey',
        template: 'DEFAULT',
        questionList: DEFAULT_QUESTIONS,
        active: true
    },
    {
        surveyId: 2,
        name: 'CTL Survey',
        template: 'CTL',
        questionList: CTL_QUESTIONS,
        active: true
    }
];

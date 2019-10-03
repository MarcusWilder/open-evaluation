import { Question } from '../objects/question';
import { QuestionType } from '../objects/QuestionType';

export const QUESTIONS: Question[] = [
    {
        id: 1,
        type: QuestionType.multipleChoice,
        baseQuestion: 'The pace of the course is:',
        options: [
            'too slow',
            'about right',
            'too fast'
        ]
    },
    {
        id: 2,
        type: QuestionType.multipleChoice,
        baseQuestion: 'The instructor and/or TA are reachable for questions and feedback:',
        options: [
            'Yes',
            'Sometimes, but not enough',
            'No'
        ]
    },
    {
        id: 3,
        type: QuestionType.freeResponse,
        baseQuestion: 'If I am to succeed in this course, I will need to do more of (a), do less of (b), and do the same amount of (c).',
        options: null
    },
    {
        id: 4,
        type: QuestionType.freeResponse,
        baseQuestion: 'If I am to succeed in this course, the instructor will need to do more of (a), do less of (b),'
                    + 'and do the same amount of (c).',
        options: null
    },
    {
        id: 5,
        type: QuestionType.freeResponse,
        baseQuestion: 'Any additional comments about this course:',
        options: null
    }
];

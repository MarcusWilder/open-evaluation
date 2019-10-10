import { Question } from '../objects/question';
import { QuestionType } from '../objects/question-type';

export const DEFAULT_QUESTIONS: Question[] = [
    {
        id: 1,
        type: QuestionType.multipleChoice,
        baseQuestion: 'The pace of the course is:',
        options: [
            'Too slow',
            'About right',
            'Too fast'
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
        baseQuestion: 'If I am to succeed in this course, I will need to do more of (a), do less of (b), and do the same amount of (c).'
    },
    {
        id: 4,
        type: QuestionType.freeResponse,
        baseQuestion: 'If I am to succeed in this course, the instructor will need to do more of (a), do less of (b),'
                    + 'and do the same amount of (c).'
    },
    {
        id: 5,
        type: QuestionType.freeResponse,
        baseQuestion: 'Any additional comments about this course:'
    }
];

export const CTL_QUESTIONS: Question[] = [
    {
        id: 1,
        type: QuestionType.ranking,
        baseQuestion: 'Class sessions are interesting'
    },
    {
        id: 2,
        type: QuestionType.ranking,
        baseQuestion: 'The workload is reasonable'
    },
    {
        id: 3,
        type: QuestionType.ranking,
        baseQuestion: 'I know what I need to do to succeed in this course'
    },
    {
        id: 4,
        type: QuestionType.ranking,
        baseQuestion: 'I am satisfied with my decision to take this course'
    },
    {
        id: 5,
        type: QuestionType.ranking,
        baseQuestion: 'I am comfortable approaching the instructor to talk about this course'
    },
    {
        id: 6,
        type: QuestionType.ranking,
        baseQuestion: 'I would recommend this class to a friend'
    },
    {
        id: 7,
        type: QuestionType.freeResponse,
        baseQuestion: 'What are the strongest features of this course and of my teaching? In other words, what contributes most to your learning?'
    },
    {
        id: 8,
        type: QuestionType.freeResponse,
        baseQuestion: 'What specific suggestions do you have for changes that I can make to improve the course and/or how it is taught?'
    }
]

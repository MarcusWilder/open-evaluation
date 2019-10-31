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
        id: 6,
        type: QuestionType.ranking,
        baseQuestion: 'Class sessions are interesting'
    },
    {
        id: 7,
        type: QuestionType.ranking,
        baseQuestion: 'The workload is reasonable'
    },
    {
        id: 8,
        type: QuestionType.ranking,
        baseQuestion: 'I know what I need to do to succeed in this course'
    },
    {
        id: 9,
        type: QuestionType.ranking,
        baseQuestion: 'I am satisfied with my decision to take this course'
    },
    {
        id: 10,
        type: QuestionType.ranking,
        baseQuestion: 'I am comfortable approaching the instructor to talk about this course'
    },
    {
        id: 11,
        type: QuestionType.ranking,
        baseQuestion: 'I would recommend this class to a friend'
    },
    {
        id: 12,
        type: QuestionType.freeResponse,
        baseQuestion: 'What are the strongest features of this course and of my teaching?' +
                      'In other words, what contributes most to your learning?'
    },
    {
        id: 13,
        type: QuestionType.freeResponse,
        baseQuestion: 'What specific suggestions do you have for changes that I can make to improve the course and/or how it is taught?'
    }
];

export const CIOS_QUESTIONS: Question[] = [
    {
        id: 14,
        type: QuestionType.ranking,
        baseQuestion: 'Instructor’s clarity in discussing or presenting course material:',
        options: [
            'Very Poor',
            'Poor',
            'Average',
            'Good',
            'Exceptional'
        ]
    },
    {
        id: 15,
        type: QuestionType.ranking,
        baseQuestion: 'Helpfulness of feedback on assignments:',
        options: [
            'Not Helpful',
            'Barely Helpful',
            'Sometimes Helpful',
            'Very Helpful',
            'Extremely Helpful'
        ]
    }
];

export const GENERAL_QUESTIONS: Question[] = [
    {
        id: 16,
        type: QuestionType.ranking,
        baseQuestion: 'The format of this class (lecture, discussion, problem-solving) helps me learn.',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    },
    {
        id: 17,
        type: QuestionType.ranking,
        baseQuestion: 'The format of this class engages my interest.',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    },
    {
        id: 18,
        type: QuestionType.ranking,
        baseQuestion: 'I feel comfortable speaking in this class.',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    },
    {
        id: 19,
        type: QuestionType.ranking,
        baseQuestion: 'I learn better when the instructor summarizes key ideas from a class session.',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    },
    {
        id: 20,
        type: QuestionType.ranking,
        baseQuestion: 'The comments on exams or other written work help me understand class content.',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    },
    {
        id: 21,
        type: QuestionType.ranking,
        baseQuestion: 'This class stimulates my interest in reading about this subject outside of class.',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    },
    {
        id: 22,
        type: QuestionType.ranking,
        baseQuestion: 'I feel comfortable approaching the instructor with questions or comments.',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    },
    {
        id: 23,
        type: QuestionType.ranking,
        baseQuestion: 'I would learn more if a different format were used for this class (suggested below).',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    },
    {
        id: 24,
        type: QuestionType.freeResponse,
        baseQuestion: 'Format suggestions'
    }
];

export const LAB_PROBLEM_SOLVE_QUESTIONS: Question[] = [
    {
        id: 25,
        type: QuestionType.ranking,
        baseQuestion: 'The problems worked through in this class help me work other problems on my own.',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    },
    {
        id: 26,
        type: QuestionType.ranking,
        baseQuestion: 'The problems worked through in this class help me learn the content for this class.',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    },
    {
        id: 27,
        type: QuestionType.ranking,
        baseQuestion: 'I learn how to solve problems more easily when I work with a group of students.',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    },
    {
        id: 28,
        type: QuestionType.ranking,
        baseQuestion: 'Laboratory lectures help me understand the purpose of the experiment.',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    },
    {
        id: 29,
        type: QuestionType.ranking,
        baseQuestion: 'The instructor’s comments during laboratory help me understand key steps in the experiment.',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    },
    {
        id: 30,
        type: QuestionType.ranking,
        baseQuestion: 'The comments on my written laboratory reports help me understand the experiment.',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    },
    {
        id: 31,
        type: QuestionType.ranking,
        baseQuestion: 'I learn more from the laboratory when I have relevant questions to think about first.',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    },
    {
        id: 32,
        type: QuestionType.ranking,
        baseQuestion: 'I learn more from the laboratory when I have relevant questions to write about first.',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    }
];

export const DISCUSSION_QUESTIONS: Question[] = [
    {
        id: 33,
        type: QuestionType.ranking,
        baseQuestion: 'Class discussions help me understand the readings.',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    },
    {
        id: 34,
        type: QuestionType.ranking,
        baseQuestion: 'Class discussions help me understand key ideas in the course.',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    },
    {
        id: 35,
        type: QuestionType.ranking,
        baseQuestion: 'I learn more if class discussions are more structured.',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    },
    {
        id: 36,
        type: QuestionType.ranking,
        baseQuestion: 'Class discussions are dominated by one or a few people.',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    },
    {
        id: 37,
        type: QuestionType.ranking,
        baseQuestion: 'I learn better when I have more of a chance to speak.',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    },
    {
        id: 38,
        type: QuestionType.ranking,
        baseQuestion: 'I learn more from discussions when I am given a question to think about first.',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    },
    {
        id: 39,
        type: QuestionType.ranking,
        baseQuestion: 'I learn more from discussions when I am given a question to write about first.',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    }
];

export const TEAM_QUESTIONS: Question[] = [
    {
        id: 40,
        type: QuestionType.ranking,
        baseQuestion: 'I learn more when I work with a group.',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    },
    {
        id: 41,
        type: QuestionType.ranking,
        baseQuestion: 'My group works well together.',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    },
    {
        id: 42,
        type: QuestionType.ranking,
        baseQuestion: 'I need more guidance for our group work.',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    },
    {
        id: 43,
        type: QuestionType.ranking,
        baseQuestion: 'Working in a group confuses me.',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    },
    {
        id: 44,
        type: QuestionType.ranking,
        baseQuestion: 'I find it helpful if the instructor summarizes results obtained as part of group work.',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    },
    {
        id: 45,
        type: QuestionType.ranking,
        baseQuestion: 'I find it helpful to get feedback from my group on my own performance in the',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    },
    {
        id: 46,
        type: QuestionType.ranking,
        baseQuestion: 'Groups work better when each person has an assigned role in the group',
        options: [
            'Strongly Disagree',
            'Disagree',
            'Neither Agree or Disagree',
            'Agree',
            'Strongly Agree'
        ]
    }
];
